import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      const accessToken = response.access_token;
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login/google", {
          accessToken: accessToken,
        })
        .then((response) => {
          toast.success("Login Successful");
          const token = response.data.token;
          localStorage.setItem("token", token);
          if (response.data.role === "admin") {
            navigate("/admin/");
          } else {
            navigate("/");
          }
        });
    },
  });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      // alert("Login Successful")
      toast.success("Login Successful");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);

      if (response.data.role === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (e) {
      //alert(e.response.data.message)
      toast.error(e.response.data.message);
    }
  }

  return (
    <div className="flex h-screen">
      {/* Left side - Login form */}
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
            Sign in to start your session
          </h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="admin@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
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
                required
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔒</span>
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-blue-600" />
                <span>Remember Me</span>
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                I forgot my password
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Sign In →
            </button>
          </form>

          {/* Footer Quote */}
          <p className="text-center text-xs text-gray-500 mt-6">
            “ Be present above all else. ” — Naval Ravikant
          </p>
        </div>
      </div>

      {/* Right side - Background image */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
        }}
      ></div>
    </div>
  );
}
