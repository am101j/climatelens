import httpx
from fpdf import FPDF
from io import BytesIO
import logging
import os
import asyncio
from models import ClimatePreview, RiskItem
import api_client
import visualization
from ai_writer import AIWriter

# Configure logging
logging.basicConfig(level=logging.INFO)

# Colors
COLOR_BLUE = (0, 102, 204)
COLOR_DARK_GREEN = (0, 100, 0)
COLOR_GREY = (128, 128, 128)

# --- PDF Generation ---
class PDF(FPDF):
    def header(self):
        self.set_font("DejaVu", "B", 10)
        self.set_text_color(*COLOR_GREY)
        self.cell(0, 10, "ClimateLens – Climate & ESG Report", 0, 0, "C")
        self.ln(15)

    def footer(self):
        self.set_y(-15)
        self.set_font("DejaVu", "I", 8)
        self.set_text_color(*COLOR_GREY)
        self.cell(0, 10, f"Page {self.page_no()}", 0, 0, "C")

def safe_multi_cell(pdf, text, w=0, h=8, align='J'):
    if text is None:
        text = ""
    text = text.replace("–", "-").replace("—", "-")
    words = text.split(" ")
    lines = []
    current_line = ""
    for word in words:
        test_line = f"{current_line} {word}".strip()
        if pdf.get_string_width(test_line) > pdf.w - pdf.l_margin - pdf.r_margin:
            if current_line:
                lines.append(current_line)
            current_line = word
        else:
            current_line = test_line
    if current_line:
        lines.append(current_line)
    for line in lines:
        pdf.multi_cell(w, h, line, align=align)
        pdf.ln(0)

def build_pdf(lat, lon, address, overall_risk_value, risks: list, charts: dict, narrative: dict) -> BytesIO:
    """
    Builds a PDF report for a given property including charts and AI-generated narrative.
    Returns a BytesIO object containing the PDF.
    """
    logging.info("Starting PDF build process...")
    pdf = PDF()
    pdf.set_auto_page_break(auto=True, margin=25)

    assets_dir = os.path.join(os.path.dirname(__file__), "assets")
    pdf.add_font("DejaVu", "", os.path.join(assets_dir, "DejaVuSans.ttf"), uni=True)
    pdf.add_font("DejaVu", "B", os.path.join(assets_dir, "DejaVuSans-Bold.ttf"), uni=True)
    pdf.add_font("DejaVu", "I", os.path.join(assets_dir, "DejaVuSans-Oblique.ttf"), uni=True)
    pdf.add_font("DejaVu", "BI", os.path.join(assets_dir, "DejaVuSans-BoldOblique.ttf"), uni=True)

    pdf.add_page()

    # Cover
    pdf.set_font("DejaVu", "B", 36)
    pdf.set_text_color(*COLOR_BLUE)
    safe_multi_cell(pdf, "Climate & ESG Risk Report", h=12, align="C")
    pdf.ln(10)

    logo_path = os.path.join(assets_dir, "ClimateLens Logo.png")
    if os.path.exists(logo_path):
        pdf.image(logo_path, x=85, w=40)
    else:
        logging.warning("Logo not found, using placeholder box.")
        pdf.set_fill_color(230, 230, 230)
        pdf.rect(x=85, y=pdf.get_y(), w=40, h=40, style="F")
    pdf.ln(50)

    # Property address
    pdf.set_font("DejaVu", "", 14)
    pdf.set_text_color(0, 0, 0)
    safe_multi_cell(pdf, f"Property at: {address}", h=10, align="C")
    pdf.ln(20)

    section_order = ["executive_summary", "market_analysis", "climate_and_esg_risks", "final_verdict"]
    chart_labels = {
        "risk_bar": "Composite Climate Risk Scores",
        "aq_gauges": "Air Quality Snapshot",
        "wildfire_ts": "Wildfire Danger Trends",
        "heatwind_scen": "Heat & Wind Climate Scenarios",
        "recent_daily": "Recent Daily Weather",
    }

    # Sections
    for section_key in section_order:
        section = narrative.get(section_key, {})
        if not section:
            continue

        pdf.add_page()
        pdf.set_font("DejaVu", "B", 24)
        pdf.set_text_color(*COLOR_BLUE)
        safe_multi_cell(pdf, section.get("title", ""), h=10)
        pdf.set_draw_color(*COLOR_BLUE)
        pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
        pdf.ln(10)

        for subsection in section.get("subsections", []):
            pdf.set_font("DejaVu", "B", 16)
            pdf.set_text_color(*COLOR_DARK_GREEN)
            safe_multi_cell(pdf, subsection.get("subtitle", ""), h=8)
            pdf.ln(2)

            pdf.set_font("DejaVu", "", 11)
            pdf.set_text_color(0, 0, 0)
            for p in subsection.get("paragraphs", []):
                safe_multi_cell(pdf, p, h=6)
                pdf.ln(1)

            if subsection.get("bullets"):
                for bullet in subsection.get("bullets", []):
                    safe_multi_cell(pdf, f"  • {bullet}", h=6)
                pdf.ln(2)

            if subsection.get("charts"):
                used_charts = set()
                for chart_ref in subsection.get("charts", []):
                    if chart_ref in charts and chart_ref not in used_charts:
                        used_charts.add(chart_ref)
                        pdf.add_page()
                        pdf.set_font("DejaVu", "B", 12)
                        pdf.set_text_color(0, 0, 0)
                        safe_multi_cell(pdf, chart_labels.get(chart_ref, "Chart"), h=8, align="C")
                        page_width = pdf.w - pdf.l_margin - pdf.r_margin
                        chart_width = min(180, page_width)
                        x = (pdf.w - chart_width) / 2
                        pdf.image(charts[chart_ref], x=x, w=chart_width)
                        pdf.ln(5)

    logging.info("Encoding PDF to bytes...")
    try:
        pdf_bytes = pdf.output(dest='S').encode('latin1')
        buf = BytesIO(pdf_bytes)
        buf.seek(0)
        logging.info("PDF built successfully.")
        return buf
    except Exception as e:
        logging.error(f"Failed to build PDF: {e}")
        raise

# --- Data Fetching and Processing ---

async def get_coordinates_for_address(address: str) -> dict:
    """Geocodes an address using the Nominatim OpenStreetMap API."""
    url = "https://nominatim.openstreetmap.org/search"
    params = {"q": address, "format": "json", "limit": 1}
    headers = {"User-Agent": "ClimateLensApp/1.0"}
    async with httpx.AsyncClient() as client:
        try:
            logging.info(f"Geocoding address: {address}")
            response = await client.get(url, params=params, headers=headers)
            response.raise_for_status()
            data = response.json()
            if data:
                return {"lat": float(data[0]["lat"]), "lon": float(data[0]["lon"])}
            else:
                raise ValueError("Could not find coordinates for the given address.")
        except (httpx.RequestError, httpx.HTTPStatusError, ValueError) as e:
            logging.error(f"Geocoding failed: {e}")
            raise RuntimeError(f"Geocoding failed for address '{address}'.") from e

def _map_risk_to_level(value: float, thresholds: list) -> str:
    """Map a numeric score to a qualitative level."""
    if value < thresholds[0]:
        return "Low"
    if value < thresholds[1]:
        return "Medium"
    if value < thresholds[2]:
        return "Moderate"
    return "High"

async def fetch_climate_preview(address: str) -> ClimatePreview:
    """
    Mock data to simulate climate risk preview.
    Replace this with GPT-5 API call later.
    """
    return ClimatePreview(
        address=address,
        overallRisk="Moderate",
        summary=f"Based on our analysis of {address}, this location shows moderate climate risks.",
        risks=[
            RiskItem(name="Flood Risk", value=20, level="High"),
            RiskItem(name="Air Quality", value=20, level="Moderate"),
            RiskItem(name="Heat Risk", value=20, level="Medium"),
            RiskItem(name="Wildfire Hazard", value=20, level="Low"),
            RiskItem(name="Wind Damage", value=20, level="Medium")
        ]
    )

async def generate_pdf_report_service(address: str) -> BytesIO:
    """Fetches all data, generates charts, AI narrative, and PDF."""
    logging.info(f"[{address}] Starting generate_pdf_report_service...")
    coords = await get_coordinates_for_address(address)
    lat, lon = coords["lat"], coords["lon"]

    results = await asyncio.gather(
        api_client.get_risk_score(lat, lon),
        api_client.get_wildfire_timeseries(lat, lon),
        api_client.get_heat_wind_timeseries(lat, lon),
        api_client.get_heat_wind_daily(lat, lon),
        api_client.get_air_quality_daily(lat, lon),
        api_client.get_flood_zone_current(lat, lon),
        api_client.get_wildfire_current(lat, lon),
        return_exceptions=True
    )
    risk_score_data, wildfire_ts_data, heat_wind_ts_data, heat_wind_daily_data, aq_daily_data, flood_zone_data, wildfire_now_data = results

    # Calculate overall risk
    overall_risk_value = 0
    if isinstance(risk_score_data, dict) and "scores" in risk_score_data:
        scores = risk_score_data["scores"]
        overall_risk_value = sum(scores.values()) / len(scores) if scores else 0

    chart_paths = {}
    try:
        # Generate charts
        if isinstance(risk_score_data, dict):
            chart_paths["risk_bar"] = visualization.plot_risk_score_bar(risk_score_data)
        if isinstance(wildfire_ts_data, dict):
            chart_paths["wildfire_ts"] = visualization.plot_wildfire_timeseries(wildfire_ts_data)
        if isinstance(heat_wind_ts_data, dict):
            chart_paths["heatwind_scen"] = visualization.plot_heat_wind_scenarios(heat_wind_ts_data)
        if isinstance(heat_wind_daily_data, dict):
            chart_paths["recent_daily"] = visualization.plot_recent_daily_weather(heat_wind_daily_data)
        if isinstance(aq_daily_data, dict):
            chart_paths["aq_gauges"] = visualization.plot_air_quality_gauges(aq_daily_data)

        # AI narrative
        ai_writer = AIWriter()
        narrative = ai_writer.generate_sections(
            lat=lat, lon=lon, address=address,
            risk_score=risk_score_data if isinstance(risk_score_data, dict) else {},
            flood_zone=flood_zone_data if isinstance(flood_zone_data, dict) else {},
            wildfire_now=wildfire_now_data if isinstance(wildfire_now_data, dict) else {},
            **chart_paths
        )

        # Build PDF
        pdf_buffer = build_pdf(
            lat=lat,
            lon=lon,
            address=address,
            overall_risk_value=overall_risk_value,
            risks=[],  # Risks are now inside narrative & charts
            charts=chart_paths,
            narrative=narrative
        )
        return pdf_buffer

    finally:
        # Cleanup
        for path in chart_paths.values():
            try:
                os.remove(path)
            except OSError as e:
                logging.error(f"Error removing temporary file {path}: {e}")
