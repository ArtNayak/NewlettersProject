import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/auth/register", form);
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Faculty Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" className="border p-2 w-full mb-3 rounded" onChange={handleChange} />
        <input name="email" placeholder="Email" className="border p-2 w-full mb-3 rounded" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" className="border p-2 w-full mb-3 rounded" onChange={handleChange} />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
