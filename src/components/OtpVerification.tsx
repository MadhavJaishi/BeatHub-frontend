import { useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../redux/store';
import API from '../config/API';
import { authActions } from '../redux/authSlice';

const OtpVerification = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        otp: '',
    });
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const verifyUserAndSendOtp = async () => {
        try {
            setLoading(true);
            const resp1 = await API.post('/v1/users/addUser', {
                name: formData.name,
                email: formData.email,
            });

            if (resp1.status == 205) {
                alert(resp1.data.message);
                return;
            }
            await API.post('/v1/otps/sendotp', { name: formData.name, email: formData.email });
            alert(`OTP sent to ${formData.email}`);
            setStep(2);
        } catch (err) {
            console.error('Failed to send OTP', err);
            alert('Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async () => {
        try {
            setLoading(true); // Show loading state

            const response = await API.post('/v1/otps/verify-otp', { name: formData.name, email: formData.email, otp: formData.otp });

            if (response.data.verified) {
                const { token, userId, role, message } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                localStorage.setItem('role', role);
                dispatch(authActions.login());
                dispatch(authActions.changeRole(role));
                setVerified(true);
                setStep(3);
                alert(message);
            } else {
                alert(response.data.message);
            }
        } catch (error: any) {
            console.error('Error verifying OTP:', error);
            if (error.response) {
                const { message } = error.response.data;
                alert(message || 'An error occurred during OTP verification.');
            } else {
                alert('Network error. Please check your connection and try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: 600,
                height: 400,
                margin: "40px auto",
                padding: 20,
                border: "1px solid #ccc",
                borderRadius: 8,
                fontFamily: "Arial, sans-serif",
                justifyContent: 'center',
                alignItems: 'center',
            }}
            className='bg-body'
        >
            <h2 className='text-heading-1' style={{ textAlign: "center", paddingBottom: "20px", fontSize: "25px" }}>Verify Your Email</h2>

            <div style={{ marginBottom: 18 }}>
                <label htmlFor="name" style={{ display: "block", marginBottom: 4 }} className='text-heading-1'>
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
                    className='bg-input-box text-heading-1'
                    autoComplete='off'
                    disabled={step > 1}
                />
            </div>

            <div style={{ marginBottom: 18 }}>
                <label htmlFor="email" style={{ display: "block", marginBottom: 4 }} className='text-heading-1'>
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
                    className='bg-input-box text-heading-1'
                    autoComplete='off'
                    disabled={step > 1}
                />
            </div>

            {step === 1 && (
                <button
                    onClick={verifyUserAndSendOtp}
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
                        marginTop: 18,
                    }}
                >
                    {loading ? "Sending OTP..." : "Send OTP"}
                </button>
            )}

            {step === 2 && (
                <>
                    <div style={{ marginTop: 20, marginBottom: 18 }}>
                        <label htmlFor="otp" style={{ display: "block", marginBottom: 4 }} className='text-heading-1'>
                            Enter OTP
                        </label>
                        <input
                            id="otp"
                            type="text"
                            value={formData.otp}
                            onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                            placeholder="Enter the OTP"
                            style={{
                                width: "100%",
                                padding: 8,
                                border: "1px solid #007bff",
                                borderRadius: 4,
                                fontSize: 16,
                            }}
                            autoComplete='off'
                            className='bg-input-box text-heading-1'
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