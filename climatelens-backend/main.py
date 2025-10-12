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

# ------------------- Root Endpoint -------------------
@app.get("/")
async def root():
    return {"status": "ok", "message": "Welcome to ClimateLens API"}

# ------------------- CORS Setup -------------------
origins = [
    "http://localhost:5173",  # Vite frontend
    "https://climatelens.vercel.app",
    "http://localhost:8080",
    "http://localhost:8081",  # Current frontend port
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
    print(f"[PREVIEW] Starting preview for address: {request.address}")
    try:
        result = await fetch_climate_preview(request.address)
        print(f"[PREVIEW] Preview generated successfully for: {request.address}")
        return result
    except Exception as e:
        print(f"[PREVIEW ERROR] Failed to generate preview: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

# ------------------- Download PDF -------------------
@app.get("/report/download")
async def download_report(address: str):
    print(f"[DOWNLOAD] Starting download for address: {address}")
    try:
        pdf_buffer = await generate_pdf_report_service(address)
        print(f"[DOWNLOAD] PDF generated successfully for: {address}")
    except Exception as e:
        print(f"[DOWNLOAD ERROR] Failed to generate PDF: {str(e)}")
        import traceback
        traceback.print_exc()
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
