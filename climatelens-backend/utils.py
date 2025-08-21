from fpdf import FPDF
from models import ClimatePreview

def generate_pdf_from_preview(preview: ClimatePreview) -> str:
    """
    Generate a simple PDF report from ClimatePreview data.
    """
    filename = f"{preview.address.replace(' ', '_')}_ClimateReport.pdf"
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)
    
    pdf.cell(0, 10, f"Climate Risk Report for {preview.address}", ln=True)
    pdf.ln(5)
    
    pdf.set_font("Arial", "", 12)
    pdf.multi_cell(0, 8, f"Overall Risk: {preview.overallRisk}")
    pdf.ln(2)
    pdf.multi_cell(0, 8, f"Summary: {preview.summary}")
    pdf.ln(5)
    
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 8, "Risk Levels:", ln=True)
    pdf.set_font("Arial", "", 12)
    for risk in preview.risks:
        pdf.cell(0, 8, f"{risk.name}: {risk.value}% - {risk.level}", ln=True)
    
    pdf.output(filename)
    return filename
