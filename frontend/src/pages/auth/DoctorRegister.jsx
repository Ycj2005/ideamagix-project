import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doctorRegister } from "../../services/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../../components/Input.jsx";

function DoctorRegister() {
  const [form, setForm] = useState({
    name: "",
    speciality: "",
    email: "",
    phone: "",
    experience: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("speciality", form.speciality);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("experience", form.experience);
    formData.append("password", form.password);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    try {
      const res = await doctorRegister(formData);
      loginUser(res.data.user, res.data.token);
      navigate("/doctor/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-96">
        <h2 className="text-xl font-bold text-center mb-6">Doctor Sign Up</h2>
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
          <Input label="Specialty" name="speciality" value={form.speciality} onChange={handleChange} />
          <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
          <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} required />
          <Input label="Years of Experience" type="number" name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 1.5" />
          <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-3 hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Already have an account?{" "}
          <Link to="/doctor/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default DoctorRegister;
