import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDoctorById } from "../../services/doctorApi.js";
import { submitConsultation } from "../../services/patientApi.js";
import Stepper from "../../components/Stepper.jsx";
import Input from "../../components/Input.jsx";
import { QRCodeSVG } from "qrcode.react";

function Consultation() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    illnessHistory: "",
    recentSurgery: "",
    surgeryTime: "",
    diabetic: "false",
    allergies: "",
    others: "",
    transactionId: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoc = async () => {
      try {
        const res = await getDoctorById(doctorId);
        setDoctor(res.data.doctor);
      } catch (err) {
        setError("Doctor not found");
      }
    };
    fetchDoc();
  }, [doctorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitConsultation({ ...form, DoctorId: doctorId });
      alert("Consultation submitted successfully!");
      navigate("/patient/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to submit consultation");
    }
  };

  if (!doctor && !error) return <p>Loading doctor details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold mb-2">Consultation Form</h2>
      <p className="text-gray-600 mb-6">Doctor: {doctor.name} ({doctor.speciality})</p>

      <Stepper currentStep={step} steps={["History", "Family Medical", "Payment"]} />

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        {step === 1 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Step 1: Current & Past History</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Current illness history</label>
              <textarea
                name="illnessHistory"
                value={form.illnessHistory}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                rows="3"
                required
              ></textarea>
            </div>
            <Input label="Recent surgery" name="recentSurgery" value={form.recentSurgery} onChange={handleChange} />
            <Input label="Surgery time span (e.g. 2 months ago)" name="surgeryTime" value={form.surgeryTime} onChange={handleChange} />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Step 2: Family Medical History</h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Diabetic or Non-Diabetic</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="diabetic" value="true" checked={form.diabetic === "true"} onChange={handleChange} />
                  Diabetic
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input type="radio" name="diabetic" value="false" checked={form.diabetic === "false"} onChange={handleChange} />
                  Non-Diabetic
                </label>
              </div>
            </div>
            <Input label="Any Allergies" name="allergies" value={form.allergies} onChange={handleChange} />
            <Input label="Others" name="others" value={form.others} onChange={handleChange} />
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Step 3: Payment</h3>
            <div className="flex flex-col items-center mb-6">
              <p className="text-sm text-gray-600 mb-3">Scan QR code to make payment (Dummy)</p>
              <QRCodeSVG value="upi://pay?pa=dummy@upi&pn=MedCare&am=500" size={150} />
            </div>
            <Input label="Transaction ID" name="transactionId" value={form.transactionId} onChange={handleChange} required />
          </div>
        )}

        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button type="button" onClick={prevStep} className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-300">
              Back
            </button>
          )}
          {step < 3 ? (
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 ml-auto">
              Next
            </button>
          ) : (
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 ml-auto">
              Submit Consultation
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Consultation;
