# MedCare - Online Prescription Platform

This is a comprehensive online prescription platform built with the MERN stack (MongoDB, Express, React, Node.js). 
It allows patients to book consultations with doctors, and doctors to write and generate PDF prescriptions.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router, Axios, QRCode.react
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Multer (file upload), PDFKit (PDF generation)

## Project Structure
- `frontend/`: Contains the React application
- `backend/`: Contains the Express API server

## How to Run Locally

### Prerequisites
1. Node.js (v18+)
2. MongoDB running locally on `mongodb://localhost:27017`

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server (runs on port 5500):
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend (runs on port 5173/5174):
   ```bash
   npm run dev
   ```

## Routes / Links

### Frontend Routes
- `/`: Home Page (Login/Signup portals)
- `/doctor/login`: Doctor Login Form
- `/doctor/register`: Doctor Signup Form
- `/patient/login`: Patient Login Form
- `/patient/register`: Patient Signup Form

**Protected Doctor Routes**
- `/doctor/dashboard`: Doctor Dashboard
- `/doctor/profile`: Doctor Profile
- `/doctor/consultations`: List of Consultations assigned to Doctor
- `/doctor/prescription/write/:id`: Write Prescription Form
- `/doctor/prescription/edit/:id`: Edit Prescription Form

**Protected Patient Routes**
- `/patient/dashboard`: Patient Dashboard
- `/patient/profile`: Patient Profile (including history of surgery/illness)
- `/patient/doctors`: List of all Doctors
- `/patient/consult/:id`: Consultation Booking Multi-step Form
- `/patient/prescriptions`: List of all Prescriptions received

### Backend API Endpoints
**Auth (Base: `/api/auth`)**
- `POST /doctor/register`: Register doctor (multipart/form-data for image)
- `POST /doctor/login`: Login doctor
- `POST /patient/register`: Register patient (multipart/form-data for image)
- `POST /patient/login`: Login patient
- `GET /me`: Get current logged-in user profile
- `GET /logout`: Logout user

**Doctors (Base: `/api/doctors`)**
- `GET /`: Get all doctors
- `GET /:id`: Get doctor by ID

**Patients (Base: `/api/patients`)**
- `GET /:id`: Get patient by ID

**Consultations (Base: `/api/consultations`)**
- `POST /`: Submit new consultation (Patient only)
- `GET /doctor`: Get assigned consultations (Doctor only)
- `GET /patient`: Get submitted consultations (Patient only)

**Prescriptions (Base: `/api/prescriptions`)**
- `POST /`: Create prescription and generate PDF (Doctor only)
- `PUT /:id`: Edit prescription and regenerate PDF (Doctor only)
- `PUT /:id/send`: Send prescription to patient (Doctor only)
- `GET /doctor`: Get all prescriptions written (Doctor only)
- `GET /patient`: Get all prescriptions received (Patient only)
- `GET /:id/pdf`: Download PDF file

## Default Server Credentials (for hosting)
*(Replace these with your actual hosted URLs when deployed)*
- **Frontend URL**: `http://localhost:5173`
- **Backend URL**: `http://localhost:5500`
