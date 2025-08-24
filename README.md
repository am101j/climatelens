# ClimateLens

![ClimateLens Logo](climatelens-backend/assets/ClimateLens%20Logo.png)

> AI-powered climate risk analysis and reporting.

ClimateLens is a full-stack web application designed to provide users with detailed climate risk reports for any location. It leverages AI to analyze data and generate insightful summaries, accompanied by clear data visualizations.

## Features

-   **AI-Powered Reporting**: Utilizes an AI writer (OpenAI) to generate comprehensive climate risk narratives.
-   **Data Visualization**: Displays climate data through charts and graphs for easy interpretation.
-   **Location-Based Analysis**: Enter any location to receive a tailored climate risk assessment.
-   **PDF Report Generation**: Creates and downloads detailed reports in PDF format.
-   **Modern Web Interface**: A responsive and user-friendly interface built with React and shadcn/ui.

## Tech Stack

The project is a monorepo composed of a Python backend and a React frontend.

### Backend (`climatelens-backend`)

-   **Framework**: FastAPI
-   **Language**: Python 3.12+
-   **Package Manager**: Poetry
-   **API Communication**: Uvicorn, HTTPX, Requests
-   **AI**: OpenAI API
-   **Data & Visualization**: Pandas, Matplotlib, Seaborn
-   **PDF Generation**: fpdf2
-   **Environment Variables**: python-dotenv

### Frontend (`climatelens-frontend`)

-   **Framework**: React
-   **Build Tool**: Vite
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **UI Components**: shadcn/ui, Radix UI
-   **Routing**: React Router
-   **State Management/Fetching**: TanStack Query
-   **HTTP Client**: Axios

## Project Structure

```
climatelens/
├── climatelens-backend/   # FastAPI application
├── climatelens-frontend/  # React application
└── README.md              # This file
```

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   **Node.js**: v18 or later
-   **Python**: v3.12 or later
-   **Poetry**: Python dependency manager. ([Installation Guide](https://python-poetry.org/docs/#installation))

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd climatelens-backend
    ```

2.  **Create the environment file:**
    Create a file named `.env` in the `climatelens-backend` directory. The application requires an OpenAI API key to function.
    ```
    OPENAI_API_KEY='your-openai-api-key'
    ```

3.  **Install dependencies:**
    ```bash
    poetry install
    ```

4.  **Run the development server:**
    The server will start on `http://127.0.0.1:8000`.
    ```bash
    poetry run uvicorn main:app --reload
    ```

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd climatelens-frontend
    ```

2.  **Install dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    Or using bun (if `bun.lockb` is preferred):
    ```bash
    bun install
    ```

3.  **Run the development server:**
    The application will be available at `http://localhost:5173`.
    ```bash
    npm run dev
    ```

## License

This project is licensed under the MIT License. Consider adding a `LICENSE` file to the repository.