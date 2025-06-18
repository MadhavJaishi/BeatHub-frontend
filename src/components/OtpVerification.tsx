import { useState } from 'react'
import axios from 'axios'
// Removed duplicate import
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux/store';
import { setUser } from '../redux/userSlice';

const OtpVerification = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [verified, setVerified] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const sendOtp = async () => {
        try {
            const resp = await axios.post('http://localhost:8090/v1/otps/sendotp', { name: formData.name, email: formData.email });
            alert(`OTP sent to ${formData.email} ${resp.status}`);
            setStep(2);
        } catch (err) {
            console.error('Failed to send OTP', err);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await fetch('http://localhost:8090/v1/otps/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp }),
            });

            const data = await response.json();

            if (data.verified) {
                dispatch(setUser({ name: data.name, email: formData.email }));
                setVerified(true);
                alert('OTP verified successfully!');
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <div
            style={{
                maxWidth: 360,
                margin: "40px auto",
                padding: 20,
                border: "1px solid #ccc",
                borderRadius: 8,
                fontFamily: "Arial, sans-serif",
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h2 style={{ textAlign: "center", paddingBottom: "20px", color: "teal", fontSize: "25px" }}>Verify Your Email</h2>

            <div style={{ marginBottom: 12 }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    style={{
                        width: "100%",
                        padding: 8,
                        border: "1px solid #007bff",
                        borderRadius: 4,
                        fontSize: 16,
                    }}
                    disabled={step > 1}
                />
            </div>

            <div style={{ marginBottom: 12 }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: 4 }}>
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    style={{
                        width: "100%",
                        padding: 8,
                        border: "1px solid #007bff",
                        borderRadius: 4,
                        fontSize: 16,
                    }}
                    disabled={step > 1}
                />
            </div>

            {step === 1 && (
                <button
                    onClick={sendOtp}
                    style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: "#007bff",
                        color: "white",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 16,
                    }}
                >
                    Send OTP
                </button>
            )}

            {step === 2 && (
                <>
                    <div style={{ marginTop: 20, marginBottom: 12 }}>
                        <label htmlFor="otp" style={{ display: "block", marginBottom: 4 }}>
                            Enter OTP
                        </label>
                        <input
                            id="otp"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter the OTP"
                            style={{
                                width: "100%",
                                padding: 8,
                                border: "1px solid #007bff",
                                borderRadius: 4,
                                fontSize: 16,
                            }}
                        />
                    </div>
                    <button
                        onClick={verifyOtp}
                        style={{
                            width: "100%",
                            padding: 10,
                            backgroundColor: "#28a745",
                            color: "white",
                            fontWeight: "bold",
                            border: "none",
                            borderRadius: 4,
                            cursor: "pointer",
                            fontSize: 16,
                        }}
                    >
                        Verify
                    </button>
                </>
            )}

            {verified && (
                <h3 style={{ marginTop: 20, color: "green", textAlign: "center" }}>
                    Email Verified ✅
                </h3>
            )}
        </div>
    );
}

export default OtpVerification