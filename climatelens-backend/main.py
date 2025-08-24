from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from services import fetch_climate_preview, generate_pdf_report_service
from models import ClimatePreview
import io
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="ClimateLens API")

# ------------------- CORS Setup -------------------
origins = [
    "http://localhost:5173",  # Vite frontend
    "https://climatelens.vercel.app",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    # Using the new function that calls the real API
    return await fetch_climate_preview(request.address)

# ------------------- Download PDF -------------------
@app.get("/report/download")
async def download_report(address: str):
    try:
        pdf_buffer = await generate_pdf_report_service(address)
    except Exception as e:
        # Catch *real* cause and forward it to frontend
        raise HTTPException(status_code=500, detail=str(e))
    
    headers = {
        'Content-Disposition': f'attachment; filename="{address}_ClimateReport.pdf"'
    }
    
    return StreamingResponse(pdf_buffer, media_type="application/pdf", headers=headers)

# ------------------- Contact Form -------------------
@app.post("/contact")
async def send_contact(request: ContactRequest):
    print(f"Contact Form Submission:\nName: {request.name}\nEmail: {request.email}\nMessage: {request.message}")
    return {"status": "success", "message": "Thank you for contacting us!"}
