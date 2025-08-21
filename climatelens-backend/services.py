from models import ClimatePreview, RiskItem

# ------------------- Mock for GPT-5 / Groq -------------------
async def fetch_preview_mock(address: str) -> ClimatePreview:
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
