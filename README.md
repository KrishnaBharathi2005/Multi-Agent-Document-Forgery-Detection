Multi-Agent Document Forgery Detection

An AI-powered multi-agent system designed to help identify potentially
forged or tampered documents by combining document image analysis, OCR,
image-forensics techniques, and AI-assisted reasoning.

Important: This project is a decision-support tool. Its output
should be treated as an indication for further review, not as
definitive proof that a document is genuine or forged.

Overview

Documents can be manipulated by changing text, replacing values, editing
images, or combining content from different sources. Reviewing these
changes manually can be time-consuming.

The Multi-Agent Document Forgery Detection project brings multiple
analysis steps together in one workflow. A user uploads a document
image, the system analyzes it, and the interface presents the findings
in a readable result view.

Key Features

Document upload: Submit a document image for analysis through
the user interface.

OCR-based text extraction: Extract visible text to support
document inspection.

Image-forensics analysis: Examine image characteristics and
potential signs of editing, such as inconsistencies that may be
highlighted by Error Level Analysis (ELA).

Multi-agent workflow: Separate analysis responsibilities into
components that can contribute findings to an overall assessment.

AI-assisted analysis: Use AI models to help interpret extracted
text and analysis results, where configured.

Results interface: Present the analysis outcome in a clear,
user-friendly format.

Modular design: Keep frontend and backend responsibilities
separate to support development and maintenance.

High-Level Workflow

Upload --- The user submits a document image.

Pre-process --- The backend prepares the file for analysis.

Extract text --- The OCR component extracts readable document
content.

Analyze the image --- Image-forensics components inspect visual
or compression-related inconsistencies.

Coordinate findings --- The multi-agent workflow combines the
outputs of the configured analysis components.

Present results --- The frontend displays the findings for human
review.

User
  |
  v
Frontend: Upload and Results
  |
  v
Backend API
  |
  +--> OCR / Text Extraction
  |
  +--> Image Forensics / ELA
  |
  +--> AI-Assisted Analysis
  |
  v
Combine Findings
  |
  v
Results for Human Review

Technology

The repository contains separate frontend and backend directories.

Component                           Purpose

Frontend                            Document upload, analysis status,
and results display

Backend                             API endpoints and coordination of
document analysis

OCR                                 Text extraction from document
images

Computer vision / image forensics   Inspection of visual
inconsistencies and potential
tampering

Check the dependency files in each directory for the exact libraries and
versions used by your checkout.

Repository Structure

Multi-Agent-Document-Forgery-Detection/
├── backend/       # API and document-analysis logic
├── frontend/      # User interface
├── .vscode/       # Editor configuration
├── .gitignore
└── package-lock.json

The exact files may change as the project develops.

Getting Started

Prerequisites

Install the tools required by the project's dependency files. The
backend uses Python and FastAPI in the current development setup. The
frontend's exact framework and commands should be confirmed from the
files inside frontend.

Python 3.12 or a compatible version supported by the backend
dependencies

Node.js and npm, if required by the frontend

Any API credentials required by AI services configured in your local
environment

1. Clone the repository

git clone https://github.com/KrishnaBharathi2005/Multi-Agent-Document-Forgery-Detection.git
cd Multi-Agent-Document-Forgery-Detection

2. Set up the backend

Open a terminal in the project directory:

cd backend
python -m venv venv

Activate the virtual environment.

Windows PowerShell

.\venv\Scripts\Activate.ps1

Windows Command Prompt

venv\Scripts\activate.bat

Install the dependencies if requirements.txt is present:

python -m pip install --upgrade pip
python -m pip install -r requirements.txt

If the project has a FastAPI application exposed as app in main.py,
start the development server with:

python -m uvicorn main:app --reload

The local API is typically available at http://127.0.0.1:8000. FastAPI
applications commonly expose interactive API documentation at
http://127.0.0.1:8000/docs.

If your entry-point filename or ASGI application variable differs,
adjust the Uvicorn command accordingly.

3. Set up the frontend

Open a second terminal and inspect the frontend directory. If it
contains a package.json, install the dependencies:

cd frontend
npm install

Use the script defined in frontend/package.json to start the
development server. For example, if the project defines a dev script:

npm run dev

If it defines a start script instead, use:

npm start

The exact command and local URL depend on the frontend configuration.

Configuration

Keep API keys and other secrets in local environment variables or an
ignored .env file. Never commit credentials, access tokens, private
documents, or production secrets to GitHub.

Document any required environment variables in a .env.example file
using placeholder values only.

Responsible Use and Limitations

An anomaly does not automatically prove forgery; legitimate
scanning, compression, resizing, or editing can also create
artifacts.

A lack of detected anomalies does not guarantee that a document is
authentic.

OCR can misread text, especially in low-resolution, rotated, or
handwritten documents.

Results should be reviewed by a qualified person before
consequential decisions are made.

Use only documents you are authorized to process, and protect
uploaded files and extracted personal information.

Future Improvements

Potential improvements include:

Confidence scores and explanations for individual findings

Side-by-side display of original documents and highlighted
suspicious regions

Support for more document formats

Audit logs and secure file-retention controls

Evaluation against labeled genuine and tampered document datasets

Automated tests for API endpoints and analysis components

Contributing

Contributions and suggestions are welcome. For substantial changes, open
an issue first to discuss the proposed improvement. Keep pull requests
focused, document configuration changes, and avoid including sensitive
sample documents.

Author

Koduru Krishna Bharathi

GitHub: KrishnaBharathi2005

Disclaimer

This project is intended for educational and research purposes. It does
not replace forensic examination, legal review, or other professional
verification procedures.
