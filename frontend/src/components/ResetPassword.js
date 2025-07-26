import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
    const [formData, setFormData] = useState({ email: '', token: '', newPassword: '' });
    const [message, setMessage] = useState('');
    const [step, setStep] = useState('email');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSendToken = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://skills-tpzr.onrender.com/api/forgot-password', { email: formData.email }); // Updated URL
            setMessage(response.data.message);
            setStep('reset');
        } catch (error) {
            setMessage(error.response?.data?.detail || 'Failed to send reset token. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://skills-tpzr.onrender.com/api/reset-password', {
                token: formData.token,
                new_password: formData.newPassword,
            }); // Updated URL
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.detail || 'Password reset failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reset-password-container">
            {step === 'email' ? (
                <>
                    <h1 className="reset-password-title">Forgot Your Password?</h1>
                    <p className="reset-password-message">Enter your email to receive a reset token.</p>
                    <div className="reset-password-box">
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="reset-password-input"
                        />
                        <button
                            onClick={handleSendToken}
                            className="reset-password-button"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Token'}
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="reset-password-title">Reset Your Password</h1>
                    <p className="reset-password-message">Enter the token sent to your email and your new password.</p>
                    <div className="reset-password-box">
                        <input
                            name="token"
                            type="text"
                            placeholder="Enter token"
                            value={formData.token}
                            onChange={handleChange}
                            className="reset-password-input"
                        />
                        <input
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="reset-password-input"
                        />
                        <button
                            onClick={handleReset}
                            className="reset-password-button"
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>
                </>
            )}
            {message && (
                <p className="reset-password-message">{message}</p>
            )}
        </div>
    );
};

export default ResetPassword;
