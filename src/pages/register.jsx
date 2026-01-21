import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      // Validate fields
      if (
        !firstName.trim() ||
        !lastName.trim() ||
        !email.trim() ||
        !password.trim()
      ) {
        toast.error("All fields are required");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      // Validate password length
      if (password.length < 6) {
        toast.error("Password must be at least 6 characters long");
        return;
      }

      // Validate password confirmation
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      setLoading(true);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/register",
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          password: password,
        },
      );

      toast.success("Registration Successful! Redirecting to login...");
      console.log(response.data);

      // Clear form
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
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
          <h2 className="text-center text-gray-700 mb-6 text-xl font-semibold">
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
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
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
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
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
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">📧</span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔐</span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-md font-semibold transition-colors"
            >
              {loading ? "Registering..." : "Register →"}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline cursor-pointer font-semibold"
            >
              Sign in
            </Link>
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
