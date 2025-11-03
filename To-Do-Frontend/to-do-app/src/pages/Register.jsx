import { useState } from "react";
import api from "../api"; // <---- IMPORTANT USING AXIOS INSTANCE
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const userData = {
        ...form,
        role: "ROLE_USER"    // <---- ALWAYS USER
      };

      await api.post("/auth/register", userData);

      alert("Registration Successful! Login now.");
      navigate("/login");

    } catch (error) {
      console.log(error);
      setError("Registration Failed! Username or Email already exists.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300">
      <div className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-[90%] max-w-md border border-white/50">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-indigo-800">
          Create Account
        </h1>
        <p className="text-center text-indigo-600 mb-6">Join your personal To-Do Space</p>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded-lg text-center mb-3 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition transform hover:scale-[1.02]"
          >
            Register
          </button>
        </form>

        <div className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-700 cursor-pointer font-semibold hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
