# ClimateLens Backend – Quick Overview

This backend is built with **FastAPI** and currently uses **mock data** for climate risk previews, PDF reports, and a simple contact form. GPT-5 API integration will be added by another developer.
 

---

## Setup

## 1. Clone the repository: 

```bash
git clone <https://github.com/Aroobmushtaq/climatelens>
cd climatelens-backend
```

## 2.  Install dependencies with Poetry:

```bash
poetry install
```

## 3. Run the server:

```bash
 poetry run uvicorn main:app --reload
 ```

### Server runs at:

```bash 
http://127.0.0.1:8000

```
---
# Endpoints

## 1. Climate Risk Preview

**POST** /report/preview
Body:

{ "address": "" }

Response: Mock data for climate risk summary and levels.

## 2. Download PDF Report

**GET** /report/download?address=123 Main St

Returns a PDF report generated from mock data.

## 3. Contact Form

**POST** /contact
Body:

{ "name":"Aroob","email":"aroob@example.com","message":"Hello!" }

Response: Confirmation message. Currently prints to console.

---

# Notes for GPT-5 Integration

Replace fetch_preview_mock() in services.py with real GPT-5 API function.

PDF generation will automatically use GPT-5 response when integrated.

---

# Testing

## Use Postman or cURL:

## Preview:

```bash
POST http://127.0.0.1:8000/report/preview
Body JSON: { "address": "123 Main St" }
```

## Download PDF:

```bash
GET http://127.0.0.1:8000/report/download?address=123 Main St
```

## Contact Form:
```bash
POST http://127.0.0.1:8000/contact
Body JSON: { "name":"Aroob","email":"aroob@example.com","message":"Hello!" }
```


