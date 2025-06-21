import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import API from "../config/API";
import { authActions } from "../redux/authSlice";

const OtpVerification = () => {
  const [formData, setFormData] = useState({ name: "", email: "", otp: "" });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const verifyUserAndSendOtp = async () => {
    try {
      setLoading(true);
      const resp1 = await API.post("/v1/users/addUser", {
        name: formData.name,
        email: formData.email,
      });

      if (resp1.status != 201) {
        alert(resp1.data.message);
        return;
      }

      await API.post("/v1/otps/sendotp", {
        name: formData.name,
        email: formData.email,
      });

      alert(`OTP sent to ${formData.email}`);
      setStep(2);
    } catch (err) {
      console.error("Failed to send OTP", err);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const response = await API.post("/v1/otps/verify-otp", {
        name: formData.name,
        email: formData.email,
        otp: formData.otp,
      });

      if (response.data.verified) {
        const { token, userId, role, message } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(role));
        setVerified(true);
        setStep(3);
        alert(message);
      } else {
        alert(response.data.message);
      }
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      if (error.response) {
        const { message } = error.response.data;
        alert(message || "An error occurred during OTP verification.");
      } else {
        alert("Network error. Please check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-body rounded-xl shadow-lg font-sans">
      <div className="min-w-max mb-10 flex justify-center">
        <li className="list-none inline-block">
          <a
            className={`px-6 py-2 rounded-sm outline-none relative border 
         dark:bg-blue-400 transform transition duration-300`}
          >
            <span className="relative z-10 text-white text-center">
              Verify Your Email
            </span>
          </a>
        </li>
      </div>
      {/* <h2 className="text-2xl font-semibold text-center mb-6 text-heading-1">
        Verify Your Email
      </h2> */}

      <div className="mb-4">
        <label htmlFor="name" className="block text-heading-1 font-medium mb-1">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border text-heading-1 border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          autoComplete="off"
          disabled={step > 1}
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-heading-1 font-medium mb-1"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full px-4 py-2 text-heading-1 border border-blue-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          autoComplete="off"
          disabled={step > 1}
        />
      </div>

      {step === 1 && (
        <button
          onClick={verifyUserAndSendOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200 mt-4"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>
      )}

      {step === 2 && (
        <>
          <div className="mb-4 mt-4">
            <label
              htmlFor="otp"
              className="block text-heading-1 font-medium mb-1"
            >
              Enter OTP
            </label>
            <input
              id="otp"
              type="text"
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
              placeholder="Enter the OTP"
              className="w-full px-4 py-2 text-heading-1 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              autoComplete="off"
            />
          </div>
          <button
            onClick={verifyOtp}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </>
      )}

      {verified && (
        <p className="mt-6 text-center text-heading-1 font-medium text-lg">
          ✅ Email Verified Successfully!
        </p>
      )}
    </div>
  );
};

export default OtpVerification;
