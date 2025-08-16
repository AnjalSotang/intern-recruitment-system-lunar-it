import { useAuthStore } from "../../../store/Auth";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Form = ({ type, token: resetToken }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const successMessage = location.state?.message;

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // NEW: 2FA related state
    const [otpCode, setOtpCode] = useState("");
    const [otpError, setOtpError] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const { 
        login, 
        loading, 
        error, 
        token, 
        status, 
        message, 
        forgotPassword, 
        resetPassword,
        // NEW: 2FA related store functions
        requires2FA,
        tempUserId,
        verify2FALogin,
        clear2FAState
    } = useAuthStore();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Clear success message from location state after displaying
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                navigate(location.pathname, { replace: true, state: {} });
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, location.pathname, navigate]);

    // Clear fields based on type
    useEffect(() => {
        if (type === "forgot") {
            setPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } else if (type === "reset") {
            setEmail("");
            setPassword("");
        }

        // Clear all errors when type changes
        setEmailError("");
        setPasswordError("");
        setNewPasswordError("");
        setConfirmPasswordError("");
        setOtpError("");
        setShowSuccess(false);
        
        // NEW: Clear 2FA state when component unmounts or type changes
        clear2FAState();
    }, [type, clear2FAState]);

    // NEW: Cleanup 2FA state on component unmount
    useEffect(() => {
        return () => {
            if (requires2FA) {
                clear2FAState();
            }
        };
    }, [requires2FA, clear2FAState]);

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

    const handleNewPasswordChange = (e) => {
        const value = e.target.value;
        setNewPassword(value);
        setNewPasswordError(value && value.length < 6 ? "New password must be at least 6 characters" : "");

        if (confirmPassword && value !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        } else if (confirmPassword && value === confirmPassword) {
            setConfirmPasswordError("");
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value && value !== newPassword ? "Passwords do not match" : "");
    };

    // NEW: Handle OTP code input
    const handleOtpChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        if (value.length <= 6) {
            setOtpCode(value);
            setOtpError("");
        }
    };

    // NEW: Handle 2FA verification submission
    const handle2FASubmit = async (e) => {
        e.preventDefault();
        
        if (!otpCode || otpCode.length !== 6) {
            setOtpError("Please enter a 6-digit verification code");
            return;
        }

        setOtpError("");
        await verify2FALogin(otpCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type === "forgot") {
            if (!validateEmail(email)) {
                setEmailError("Please enter a valid email address");
                return;
            }
            setEmailError("");
            forgotPassword(email);
            
        } else if (type === "reset" && resetToken) {
            let hasErrors = false;

            if (newPassword.length < 6) {
                setNewPasswordError("New password must be at least 6 characters");
                hasErrors = true;
            }

            if (confirmPassword !== newPassword) {
                setConfirmPasswordError("Passwords do not match");
                hasErrors = true;
            }

            if (hasErrors) return;

            setNewPasswordError("");
            setConfirmPasswordError("");

            const resetData = { newPassword, confirmPassword, token: resetToken };
            resetPassword(resetData);

        } else {
            // Normal login validation
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
            login({ email, password });
        }
    };

    // Redirect on successful login (including 2FA completion)
    useEffect(() => {
        if (status === 200 && token && (type === "login" || !type)) {
            navigate("/admin/dashboards");
        }
    }, [status, token, navigate, type]);

    // Handle successful password reset
    useEffect(() => {
        if (status === 200 && type === "reset" && !error) {
            setShowSuccess(true);

            setNewPassword("");
            setConfirmPassword("");
            setNewPasswordError("");
            setConfirmPasswordError("");

            const timer = setTimeout(() => {
                navigate("/login", {
                    replace: true,
                    state: {
                        message: "Password successfully reset! Please log in with your new password."
                    }
                });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [status, type, error, navigate]);

    const getTitle = () => {
        if (requires2FA && tempUserId) {
            return 'Two-Factor Authentication';
        }
        switch (type) {
            case 'forgot':
                return 'Enter your email';
            case 'reset':
                return 'Reset Password';
            default:
                return 'Admin Portal Login';
        }
    };

    const getDescription = () => {
        if (requires2FA && tempUserId) {
            return 'Enter the 6-digit verification code from your authenticator app.';
        }
        switch (type) {
            case 'forgot':
                return 'We will send a password reset link to your email.';
            case 'reset':
                return 'Enter your new password below.';
            default:
                return 'Sign in to manage your dashboard and settings';
        }
    };

    // NEW: If 2FA is required, show 2FA verification form
    if (requires2FA && tempUserId && (type === "login" || !type)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                            <i className="fas fa-shield-alt text-indigo-600 text-2xl"></i>
                        </div>
                        <h1 className="text-3xl font-bold text-indigo-600">{getTitle()}</h1>
                        <p className="text-gray-500 text-sm">{getDescription()}</p>
                    </div>

                    <form onSubmit={handle2FASubmit} className="space-y-5">
                        <div>
                            <label htmlFor="otpCode" className="block text-sm font-medium text-gray-700 mb-1">
                                Verification Code
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-mobile-alt text-gray-400 text-sm"></i>
                                </div>
                                <input
                                    type="text"
                                    id="otpCode"
                                    value={otpCode}
                                    onChange={handleOtpChange}
                                    maxLength={6}
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-lg text-center tracking-widest transition-all duration-200 ${otpError
                                        ? "border-red-500"
                                        : otpCode && otpCode.length === 6
                                            ? "border-green-500"
                                            : "border-gray-300"
                                        }`}
                                    placeholder="000000"
                                    autoComplete="one-time-code"
                                />
                            </div>
                            {otpError && <p className="mt-1 text-sm text-red-600">{otpError}</p>}
                            <p className="mt-2 text-xs text-gray-500 text-center">
                                Enter the 6-digit code from your authenticator app
                            </p>
                        </div>

                        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading || otpCode.length !== 6}
                            className={`w-full py-3 px-4 font-medium rounded-lg shadow-md text-white transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${loading || otpCode.length !== 6
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                                }`}
                        >
                            {loading ? "Verifying..." : "Verify & Sign In"}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    clear2FAState();
                                    setEmail("");
                                    setPassword("");
                                }}
                                className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
                            >
                                ← Back to login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="flex flex-col items-center text-center space-y-2">
                    <h1 className="text-3xl font-bold text-indigo-600">{getTitle()}</h1>
                    <p className="text-gray-500 text-sm">{getDescription()}</p>
                </div>

                {/* Display success message from navigation state */}
                {successMessage && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                            <p className="text-sm text-green-600">{successMessage}</p>
                        </div>
                    </div>
                )}

                {/* Show success state before redirect */}
                {showSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="flex items-center">
                            <i className="fas fa-check-circle text-green-500 mr-2"></i>
                            <p className="text-sm text-green-700">
                                Password successfully updated! Redirecting to login...
                            </p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email field - only for login and forgot */}
                    {(type === "login" || type === "forgot" || !type) && (
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
                                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all duration-200 ${emailError
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
                    )}

                    {/* Password field - only for login */}
                    {type !== 'forgot' && type !== 'reset' && (
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
                                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all duration-200 ${passwordError
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
                    )}

                    {/* Reset password fields */}
                    {type === 'reset' && (
                        <>
                            {/* New Password */}
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-key text-gray-400 text-sm"></i>
                                    </div>
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={handleNewPasswordChange}
                                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all duration-200 ${newPasswordError
                                            ? "border-red-500"
                                            : newPassword && newPassword.length >= 6
                                                ? "border-green-500"
                                                : "border-gray-300"
                                            }`}
                                        placeholder="Enter your new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    >
                                        <i
                                            className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 text-sm hover:text-gray-600`}
                                        ></i>
                                    </button>
                                </div>
                                {newPasswordError && <p className="mt-1 text-sm text-red-600">{newPasswordError}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <i className="fas fa-check-circle text-gray-400 text-sm"></i>
                                    </div>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all duration-200 ${confirmPasswordError
                                            ? "border-red-500"
                                            : confirmPassword && confirmPassword === newPassword && newPassword.length >= 6
                                                ? "border-green-500"
                                                : "border-gray-300"
                                            }`}
                                        placeholder="Confirm your new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    >
                                        <i
                                            className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-gray-400 text-sm hover:text-gray-600`}
                                        ></i>
                                    </button>
                                </div>
                                {confirmPasswordError && <p className="mt-1 text-sm text-red-600">{confirmPasswordError}</p>}
                            </div>
                        </>
                    )}

                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    {message && !error && <p className="text-sm text-green-600 text-center">{message}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || showSuccess}
                        className={`w-full py-3 px-4 font-medium rounded-lg shadow-md text-white transition-all duration-200 focus:ring-2 focus:ring-offset-1 ${loading || showSuccess
                            ? "bg-indigo-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
                            }`}
                    >
                        {loading
                            ? type === "forgot"
                                ? "Sending..."
                                : type === "reset"
                                    ? "Updating Password..."
                                    : "Signing In..."
                            : type === "forgot"
                                ? "Send Reset Link"
                                : type === "reset"
                                    ? "Update Password"
                                    : "Sign In"}
                    </button>

                    {/* Forgot Password Link - only for login */}
                    {type !== "forgot" && type !== "reset" && (
                        <div className="text-center">
                            <Link to="/forgot" className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                                Forgot your password?
                            </Link>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Form;