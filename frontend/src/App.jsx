import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./pages/context/AuthContext.jsx";

// Home & Auth
import Home from "./pages/home/Home.jsx";
import DoctorLogin from "./pages/auth/DoctorLogin.jsx";
import DoctorRegister from "./pages/auth/DoctorRegister.jsx";
import PatientLogin from "./pages/auth/PatientLogin.jsx";
import PatientRegister from "./pages/auth/PatientRegister.jsx";

// Layouts
import DoctorLayout from "./layouts/DoctorLayout.jsx";
import PatientLayout from "./layouts/PatientLayout.jsx";

// Doctor Pages
import DoctorDashboard from "./pages/doctor/Dashobard.jsx";
import DoctorProfile from "./pages/doctor/Profile.jsx";
import ConsultationList from "./pages/doctor/ConsultationList.jsx";
import WritePrescription from "./pages/doctor/WritePrescription.jsx";
import EditPrescription from "./pages/doctor/EditPrescription.jsx";

// Patient Pages
import PatientDashboard from "./pages/patient/Dashboard.jsx";
import PatientProfile from "./pages/patient/Profile.jsx";
import DoctorsList from "./pages/patient/Doctors.jsx";
import ConsultationForm from "./pages/patient/Consultation.jsx";
import PrescriptionsList from "./pages/patient/Prescription.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor/login" element={<DoctorLogin />} />
          <Route path="/doctor/register" element={<DoctorRegister />} />
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegister />} />

          <Route path="/doctor" element={<DoctorLayout />}>
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="consultations" element={<ConsultationList />} />
            <Route path="prescription/write/:consultationId" element={<WritePrescription />} />
            <Route path="prescription/edit/:consultationId" element={<EditPrescription />} />
          </Route>

          <Route path="/patient" element={<PatientLayout />}>
            <Route path="dashboard" element={<PatientDashboard />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="doctors" element={<DoctorsList />} />
            <Route path="consult/:doctorId" element={<ConsultationForm />} />
            <Route path="prescriptions" element={<PrescriptionsList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
