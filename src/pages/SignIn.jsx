import { useState } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail, MdLock, MdPhone } from "react-icons/md";

const SignIn = () => {
  const [mode, setMode] = useState("login"); // login | signup | phone
  const [form, setForm] = useState({ email: "", password: "", phone: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEmailAuth = async () => {
    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      }
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const setupRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible", callback: () => sendOtp() },
      auth
    );
  };

  const sendOtp = async () => {
    if (!form.phone || form.phone.length < 10) return alert("Enter valid phone number");
    setupRecaptcha();

    try {
      const confirmation = await signInWithPhoneNumber(auth, "+91" + form.phone, window.recaptchaVerifier);
      window.confirmationResult = confirmation;
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await window.confirmationResult.confirm(form.otp);
      navigate("/");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-white to-purple-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-blue-600">Welcome to SimiPhy 🛍️</h2>

        {/* Email Login / Signup Toggle */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setMode("login");
              setOtpSent(false);
            }}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
              mode === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            Email Login
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setOtpSent(false);
            }}
            className={`px-4 py-1.5 rounded-md text-sm font-semibold ${
              mode === "signup"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Email Login/Signup Form */}
        {(mode === "login" || mode === "signup") && (
          <div className="space-y-3">
            <div className="relative">
              <MdOutlineEmail className="absolute top-2.5 left-3 text-gray-400 text-lg" />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="relative">
              <MdLock className="absolute top-2.5 left-3 text-gray-400 text-lg" />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-md focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <button
              onClick={handleEmailAuth}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {mode === "signup" ? "Create Account" : "Login"}
            </button>
          </div>
        )}

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-sm text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-md transition duration-300"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>

        {/* Phone Login */}
        <button
  onClick={() => {
    setMode("phone");
    setOtpSent(false);
  }}
  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 rounded-md transition duration-300"
>
  <MdPhone className="text-xl" />
  Continue with Phone
</button>


        {/* Phone Login Form */}
        {mode === "phone" && (
          <div className="space-y-3 pt-4">
            {!otpSent ? (
              <>
                <div className="relative">
                  <MdPhone className="absolute top-2.5 left-3 text-gray-400 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter Phone Number"
                    className="w-full pl-10 border border-gray-300 px-4 py-2 rounded-md"
                  />
                </div>
                <button
                  onClick={sendOtp}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Send OTP
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  name="otp"
                  value={form.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
                <button
                  onClick={verifyOtp}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                >
                  Verify OTP
                </button>
              </>
            )}
          </div>
        )}

        {/* reCAPTCHA container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default SignIn;
