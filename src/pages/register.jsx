import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        firstName,
        lastName,
        email,
        password,
      });

      toast.success("Registration Successful");
      navigate("/login");
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration Failed");
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Register form */}
      <div className="w-1/2 flex flex-col justify-center items-center px-12 bg-white">
        {/* Logo */}
        <div className="flex items-center mb-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
            alt="logo"
            className="w-8 h-8 mr-2"
          />
          <h1 className="text-2xl font-bold text-blue-600">Adlisting</h1>
        </div>

        {/* Form */}
        <div className="w-full max-w-sm">
          <h2 className="text-center text-gray-700 mb-6">
            Create your account
          </h2>
          <form className="space-y-4" onSubmit={handleRegister}>
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">👤</span>
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">👥</span>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="your@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Register →
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* Right side - Background image */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
        }}
      ></div>
    </div>
  );
}
