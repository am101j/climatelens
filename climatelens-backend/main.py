from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
from services import fetch_preview_mock  # Mock for now
from models import ClimatePreview
from utils import generate_pdf_from_preview  # PDF generation function

app = FastAPI(title="ClimateLens API")

# ------------------- CORS Setup -------------------
origins = [
    "http://localhost:8080",  # Frontend URL
    "http://127.0.0.1:8080",  # Frontend URL (with 127)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # allows POST, GET, OPTIONS, etc.
    allow_headers=["*"],  # allows Content-Type and other headers
)

# ------------------- Models -------------------
class AddressRequest(BaseModel):
    address: str

class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

# ------------------- Report Preview -------------------
@app.post("/report/preview", response_model=ClimatePreview)
async def get_preview(request: AddressRequest):
    """
    Fetch climate risk preview for a given address.
    Currently uses mock data.
    TODO: Replace `fetch_preview_mock` with real GPT-5 API call.
    """
    return await fetch_preview_mock(request.address)

# ------------------- Download PDF -------------------
@app.get("/report/download")
async def download_report(address: str):
    """
    Generate PDF dynamically from preview data.
    Currently uses mock data.
    """
    preview = await fetch_preview_mock(address)
    filename = generate_pdf_from_preview(preview)
    return FileResponse(filename, filename=f"{address}_ClimateReport.pdf")

# ------------------- Contact Form -------------------
@app.post("/contact")
async def send_contact(request: ContactRequest):
    """
    Save or send contact form submission.
    Currently just prints data (no DB).
    """
    print(f"Contact Form Submission:\nName: {request.name}\nEmail: {request.email}\nMessage: {request.message}")
    return {"status": "success", "message": "Thank you for contacting us!"}
