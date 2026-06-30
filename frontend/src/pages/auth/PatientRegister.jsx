import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { patientRegister } from "../../services/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../../components/Input.jsx";

function PatientRegister() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    password: "",
    historyOfSurgery: "",
    historyOfIllness: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const illnessArray = form.historyOfIllness
    .split(",")
    .map((s) => s.trim())
    .filter((s) => s);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    formData.append("historyOfSurgery", form.historyOfSurgery);
    formData.append("historyOfIllness", form.historyOfIllness);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    try {
      const res = await patientRegister(formData);
      loginUser(res.data.user, res.data.token);
      navigate("/patient/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-96">
        <h2 className="text-xl font-bold text-center mb-6">Patient Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0])}
              className="w-full text-sm"
            />
          </div>
          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Age" type="number" name="age" value={form.age} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
          <Input
            label="History of Surgery (comma separated)"
            name="historyOfSurgery"
            value={form.historyOfSurgery}
            onChange={handleChange}
            placeholder="e.g. Knee Surgery, Appendix"
          />
          <Input
            label="History of Illness (comma separated)"
            name="historyOfIllness"
            value={form.historyOfIllness}
            onChange={handleChange}
            placeholder="e.g. Diabetes, Asthma"
          />
          {illnessArray.length > 0 && (
            <div className="mb-3 bg-gray-50 border border-gray-200 rounded p-3">
              <p className="text-xs text-gray-500 mb-1">Illness History</p>
              <div className="flex flex-wrap gap-1">
                {illnessArray.map((item, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded mt-3 hover:bg-green-600">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/patient/login" className="text-green-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default PatientRegister;
