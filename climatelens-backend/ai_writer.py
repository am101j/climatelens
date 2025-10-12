import logging
import json
import os
from groq import Groq

logging.basicConfig(level=logging.INFO)

DEFAULT_MODEL = "qwen/qwen3-32b"

SYSTEM_PROMPT = """
You are a world-class climate-risk and ESG consultant producing reports for high-value residential properties.
You should use plain language and NOT any links or reference URLs.
STRICT SCHEMA (MUST FOLLOW EXACTLY):
{
  "executive_summary": {
    "title": "Executive Summary",
    "subsections": [
      {
        "subtitle": "Subsection Title",
        "paragraphs": ["Paragraph text..."],  # 2–3 short paragraphs
        "bullets": ["Bullet point..."],       # optional, 3–5 bullets
        "charts": []
      }
    ]
  },
  "market_analysis": {
    "title": "Market Analysis",
    "subsections": [
      {
        "subtitle": "Subsection Title",
        "paragraphs": ["Paragraph text..."],  # 2–3 short paragraphs
        "bullets": ["Bullet point..."],       # optional, 3–5 bullets
        "charts": ["wildfire_ts", "heatwind_scen"]
      }
    ]
  },
  "climate_and_esg_risks": {
    "title": "Climate and ESG Risks",
    "subsections": [
      {
        "subtitle": "Subsection Title",
        "paragraphs": ["Paragraph text..."],  # 2–3 short paragraphs
        "bullets": ["Bullet point..."],       # optional, 3–5 bullets
        "charts": ["risk_bar", "aq_gauges", "recent_daily"]
      }
    ]
  },
  "final_verdict": {
    "title": "Final Verdict",
    "subsections": [
      {
        "subtitle": "Subsection Title",
        "paragraphs": ["Paragraph text..."],
        "bullets": ["Bullet point..."],
        "charts": []
      }
    ]
  }
}

For 'market_analysis', include:
- Average property prices in the area
- Typical rental/valuation trends
- Liquidity, insurance, and resilience premiums
Do NOT output URLs or any links. Use plain language.

RULES:
1. **MUST FOLLOW SCHEMA EXACTLY**.
2. NO extra keys, fields, or URLs.
3. Paragraphs: 2–3 short paragraphs per subsection.
4. Bullets: optional, 3–5 bullets if present.
5. Charts: choose from ["risk_bar","aq_gauges","wildfire_ts","heatwind_scen","recent_daily"] and no repeats.
6. Output ONLY JSON. DO NOT add any explanation or text outside the JSON.
"""

AVAILABLE_CHARTS = ["risk_bar", "aq_gauges", "wildfire_ts", "heatwind_scen", "recent_daily"]

def _build_prompt(lat, lon, address, risk_score, flood_zone, wildfire_now, **kwargs):
    chart_info = []
    for chart in AVAILABLE_CHARTS:
        if kwargs.get(chart):
            chart_info.append(f"- '{chart}': include if relevant")

    chart_text = "Charts guidance:\n" + "\n".join(chart_info) if chart_info else ""

    return f"""
{SYSTEM_PROMPT}

Generate a report for the property at:
Address: {address}
Latitude: {lat}
Longitude: {lon}

Key Data:
- Air Quality Risk: {risk_score.get("scores", {}).get("air_quality")}
- Flood Risk: {risk_score.get("scores", {}).get("flood_risk")}
- Wildfire Risk: {risk_score.get("scores", {}).get("wildfire_risk")}
- Flood Zone: {flood_zone.get("flood_zone")}
- Wildfire Risk (1km radius): {wildfire_now.get("properties", {}).get("fire_risk_class")}

{chart_text}

**CRITICAL:** Output must be a single valid JSON object strictly following the schema above, with no extra text, no URLs, and no deviations.
"""

class AIWriter:
    def __init__(self, groq_api_key: str = None):
        self.client = Groq(api_key=groq_api_key or os.environ.get("GROQ_API_KEY"))

    def _call_groq(self, prompt: str) -> str:
        logging.info("Calling Groq API...")
        try:
            response = self.client.chat.completions.create(
                model=DEFAULT_MODEL,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1
            )
            output_text = response.choices[0].message.content.strip()
            
            # Handle Groq's thinking tags
            if '<think>' in output_text and '</think>' in output_text:
                # Extract content after </think>
                think_end = output_text.find('</think>')
                output_text = output_text[think_end + 8:].strip()
            
            # Find the JSON object (starts with { and ends with })
            start_idx = output_text.find('{')
            if start_idx != -1:
                # Find the matching closing brace
                brace_count = 0
                end_idx = -1
                for i in range(start_idx, len(output_text)):
                    if output_text[i] == '{':
                        brace_count += 1
                    elif output_text[i] == '}':
                        brace_count -= 1
                        if brace_count == 0:
                            end_idx = i
                            break
                if end_idx != -1:
                    output_text = output_text[start_idx:end_idx + 1]
            
            logging.info("Groq response received.")
            return output_text.strip()
        except Exception as e:
            logging.error(f"Groq API call failed: {e}")
            raise

    def generate_sections(self, lat, lon, address, risk_score, flood_zone, wildfire_now, **kwargs) -> dict:
      prompt = _build_prompt(lat, lon, address, risk_score, flood_zone, wildfire_now, **kwargs)
      raw_output = self._call_groq(prompt)

      try:
          parsed_json = json.loads(raw_output)
          logging.info("Groq JSON parsed successfully.")
      except json.JSONDecodeError as e:
          logging.error(f"Failed to parse JSON: {e}\nRaw output:\n{raw_output}")
          raise ValueError("Groq returned invalid JSON") from e

      # Validate top-level sections and subsections
      required_sections = ["executive_summary", "market_analysis", "climate_and_esg_risks", "final_verdict"]
      for sec in required_sections:
          if sec not in parsed_json:
              raise ValueError(f"Missing required top-level section: {sec}")
          if "title" not in parsed_json[sec] or "subsections" not in parsed_json[sec]:
              raise ValueError(f"Section '{sec}' missing 'title' or 'subsections'")

      # Deduplicate charts globally across all subsections
      used_charts = set()
      for sec in required_sections:
          for sub in parsed_json[sec]["subsections"]:
              if "subtitle" not in sub or "paragraphs" not in sub:
                  raise ValueError(f"A subsection in '{sec}' is missing 'subtitle' or 'paragraphs'")
              
              if "charts" in sub:
                  # Keep only allowed charts
                  sub["charts"] = [c for c in sub["charts"] if c in AVAILABLE_CHARTS]
                  # Keep charts not already used in other subsections
                  new_charts = []
                  for c in sub["charts"]:
                      if c not in used_charts:
                          new_charts.append(c)
                          used_charts.add(c)
                  sub["charts"] = new_charts

      logging.info("Groq JSON validated successfully with unique charts across subsections.")
      return parsed_json
