import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { doctorLogin } from "../../services/authApi.js";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../../components/Input.jsx";

function DoctorLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await doctorLogin(form);
      loginUser(res.data.user);
      navigate("/doctor/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white border border-gray-200 rounded-lg p-8 w-96">
        <h2 className="text-xl font-bold text-center mb-6">Doctor Login</h2>
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input label="Email" type="email" name="email" value={form.email} onChange={handleChange} required />
          <Input label="Password" type="password" name="password" value={form.password} onChange={handleChange} required />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded mt-3 hover:bg-blue-600">
            Login
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <Link to="/doctor/register" className="text-blue-500">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default DoctorLogin;
