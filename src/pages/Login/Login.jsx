import React, { useState, useEffect } from "react";
import { useAuthStore } from "../../store/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { login, loading, error, status, message, token } = useAuthStore();
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(value && !validateEmail(value) ? "Please enter a valid email address" : "");
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(value && value.length < 6 ? "Password must be at least 6 characters" : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    setEmailError("");
    setPasswordError("");
    await login({ email, password });
  };

  // Redirect on successful login
  useEffect(() => {
    if (status === 200 && token) {
      navigate("/admin/dashboards"); // Change to your route
    }
  }, [status, token, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-2">
          <h1 className="text-3xl font-bold text-indigo-600">Admin Portal Login</h1>
          <p className="text-gray-500 text-sm">Sign in to manage your dashboard and settings</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-400 text-sm"></i>
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all duration-200 ${
                  emailError
                    ? "border-red-500"
                    : email && validateEmail(email)
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your email address"
              />
            </div>
            {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400 text-sm"></i>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all duration-200 ${
                  passwordError
                    ? "border-red-500"
                    : password && password.length >= 6
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                <i
                  className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 text-sm hover:text-gray-600`}
                ></i>
              </button>
            </div>
            {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {message && !error && <p className="text-sm text-green-600 text-center">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 font-medium rounded-lg shadow-md text-white transition-all duration-200 focus:ring-2 focus:ring-offset-1 
              ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"}`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
