import React, { useState } from "react";
import api from "../api"; // your Axios instance
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Use api.js but override headers to skip Authorization
      const res = await api.post(
        "/auth/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "", // override interceptor for this request
          },
        }
      );

      console.log("Login response:", res);
        console.log("Login data:", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      if(res.data.role === "ROLE_ADMIN"){
    navigate("/admin-dashboard");
    }else{
        navigate("/todos");
    }
    } catch (err) {
      console.log("ERR =>", err);
      console.log("ERR Response =>", err.response);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Username</label>
            <input
              className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-2 rounded-xl shadow-md"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer font-semibold hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
