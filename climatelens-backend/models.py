from pydantic import BaseModel
from typing import List

class RiskItem(BaseModel):
    name: str
    value: int
    level: str

class ClimatePreview(BaseModel):
    address: str
    overallRisk: str
    summary: str
    risks: List[RiskItem]
