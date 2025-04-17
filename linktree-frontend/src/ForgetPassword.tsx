import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>(""); // State for recipient's email
  const [message, setMessage] = useState<string>(""); // State for success/error message
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    setMessage(""); // Clear previous messages
    setIsLoading(true); // Set loading to true

    try {
      // Send a request to the backend for password reset
      const response = await fetch("http://localhost:5000/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("✅ Password reset link sent to your email.");

        // Navigate to ResetPasswordScreen and optionally pass the email
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 2000); // Redirect after 2 seconds to allow user to see the success message
      } else {
        setMessage("❌ Failed to send reset link. Please check the email address.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setMessage("❌ Error connecting to the server.");
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-500 to-blue-900 -mt-4">
      <div className="bg-gradient-to-br from-blue-400 to-blue-200 p-8 rounded-xl shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center text-white mb-6">Reset Password</h1>
        <p className="text-center text-gray-200 text-sm mb-6">
          Enter your email to receive a password reset link.
        </p>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            aria-label="Email address"
          />
        </div>
        {message && (
          <p
            className={`text-sm text-center mb-4 ${
              message.startsWith("✅")
                ? "text-green-600 bg-green-50 border border-green-200 p-2 rounded"
                : "text-red-600 bg-red-50 border border-red-200 p-2 rounded"
            }`}
          >
            {message}
          </p>
        )}
        <div className="flex flex-col gap-4">
          <button
            onClick={handlePasswordReset}
            disabled={isLoading}
            className={`w-full px-4 py-2 rounded-lg ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 hover:text-gray-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
