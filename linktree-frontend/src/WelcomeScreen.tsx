import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Button } from "./components/button"; // Ensure the path is correct

const googleClientId = "933843214399-0s1v2olmikuspgr7peu9g4915mit9a2q.apps.googleusercontent.com";

const WelcomeScreen: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:5000/users/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("userId", data.id);
        navigate("/linktree");
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Error connecting to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);

    try {
      const token = credentialResponse.credential;

      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("userId", data.id);
        navigate("/linktree");
      } else {
        setErrorMessage("Google login failed.");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      setErrorMessage("Error connecting to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleFailure = () => {
    setErrorMessage("Google login failed. Please try again.");
  };

  const handleRegister = () => {
    navigate("/create-user");
  };

  const handleForgotPassword = () => {
    navigate("/forget-password");
  };

  return (
    <GoogleOAuthProvider clientId={googleClientId || ""}>
      <div className="flex justify-between items-center h-screen bg-gradient-to-b from-gray-100 to-gray-300 px-16 relative">
        {/* Login Card */}
        <div className="bg-gray-50 p-8 rounded-lg shadow-md max-w-sm w-full absolute left-10 top-20">
          <h1 className="text-xl font-bold text-center mb-6 text-gray-800">
            Login to Your Account
          </h1>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username (Email)
            </label>
            <input
              id="username"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="Email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              aria-label="Password"
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
          <div className="flex flex-col gap-4">
            <Button variant="default" onClick={handleLogin} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Button variant="outline" onClick={handleRegister}>
              Register
            </Button>
          </div>
          <p
            className="text-sm text-center text-blue-600 underline mt-4 cursor-pointer"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </p>

          {/* Divider for Google Login */}
          <div className="flex items-center mt-6">
            <div className="border-t border-gray-300 flex-grow"></div>
            <span className="mx-3 text-sm text-gray-500">Or login with</span>
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>

          {/* Google Login */}
          <div className="mt-6 flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              theme="filled_blue"
            />
          </div>
        </div>

        {/* Motivational Text */}
        <div className="absolute top-20 left-[calc(10rem+320px)] max-w-lg space-y-4">
          <h2 className="text-4xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">Your Company’s Linktree</span>
          </h2>
          <p className="mt-2 text-gray-700 text-lg">
            Make it <span className="font-semibold text-blue-500">effortless</span> for your audience to find you online and connect with your business. 
            Our platform helps you bring all your essential links into one convenient place.
          </p>
          <p className="mt-4 text-gray-600 italic">
            "Grow your reach, drive engagement, and make every click count."
          </p>
        </div>

        {/* Promotional Thumbnails */}
        <div className="absolute right-10 top-20 flex flex-col items-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-blue-400 flex justify-center items-center text-white font-bold text-lg animate-spin-slow">
            Link 1
          </div>
          <div className="w-24 h-24 rounded-full bg-green-400 flex justify-center items-center text-white font-bold text-lg animate-spin-slow-reverse">
            Link 2
          </div>
          <div className="w-24 h-24 rounded-full bg-orange-400 flex justify-center items-center text-white font-bold text-lg animate-spin-slow">
            Link 3
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-reverse 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
      `}</style>
    </GoogleOAuthProvider>
  );
};

export default WelcomeScreen;
