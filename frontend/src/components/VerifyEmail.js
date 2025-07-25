import React, { useState } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setToken(e.target.value);
    };

    const handleVerify = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8000/verify-email?token=${token}`);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.detail || 'Verification failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-email-container">
            <h1 className="verify-email-title">Verify Your Email</h1>
            <p className="verify-email-message">Enter the token sent to your email to verify your account.</p>
            <div className="verify-email-box">
                <input
                    type="text"
                    placeholder="Enter token"
                    value={token}
                    onChange={handleChange}
                    className="verify-email-input"
                />
                <button
                    onClick={handleVerify}
                    className="verify-email-button"
                    disabled={loading}
                >
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>
            </div>
            {message && (
                <p className="verify-email-message">{message}</p>
            )}
        </div>
    );
};

export default VerifyEmail;
