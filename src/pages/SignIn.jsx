import { useState, useEffect } from "react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [mode, setMode] = useState("google"); // google | login | signup | phone
  const [form, setForm] = useState({ email: "", password: "", phone: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      {
        size: "invisible",
        callback: () => sendOtp()
      },
      auth
    );
  };

  const sendOtp = async () => {
    if (!form.phone || form.phone.length < 10) return alert("Enter valid phone number");
    setupRecaptcha();

    const appVerifier = window.recaptchaVerifier;
    try {
      const confirmation = await signInWithPhoneNumber(auth, "+91" + form.phone, appVerifier);
      window.confirmationResult = confirmation;
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const result = await window.confirmationResult.confirm(form.otp);
      console.log("User signed in:", result.user.phoneNumber);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-600">SimiPhy Store</h2>

        {/* Toggle buttons */}
        <div className="flex justify-center flex-wrap gap-2">
          {["google", "login", "signup", "phone"].map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                setOtpSent(false);
              }}
              className={`px-3 py-1 rounded-md text-sm font-semibold ${
                mode === m ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {m === "google"
                ? "Google"
                : m === "login"
                ? "Email Login"
                : m === "signup"
                ? "Sign Up"
                : "Phone Login"}
            </button>
          ))}
        </div>

        {/* Google */}
        {mode === "google" && (
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition duration-300"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        )}

        {/* Email Login/Signup */}
        {(mode === "login" || mode === "signup") && (
          <div className="space-y-3">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 px-4 py-2 rounded-md"
            />
            <button
              onClick={handleEmailAuth}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              {mode === "signup" ? "Create Account" : "Login"}
            </button>
          </div>
        )}

        {/* Phone Login */}
        {mode === "phone" && (
          <div className="space-y-3">
            {!otpSent ? (
              <>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Enter Phone Number"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md"
                />
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
