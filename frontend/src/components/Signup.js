import React, { useState } from 'react';
import { signup } from '../api/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const res = await signup({ email, password });
            setSuccess(res.data.message);
            setEmail('');
            setPassword('');
            navigate('/verify-email'); // Redirect to VerifyEmail page
        } catch (err) {
            const errorDetail = err.response?.data?.detail;

            if (Array.isArray(errorDetail)) {
                // Handles list of validation errors (Pydantic)
                const messages = errorDetail.map((e) => e.msg).join(', ');
                setError(messages);
            } else if (typeof errorDetail === 'string') {
                // Handles plain string error message
                setError(errorDetail);
            } else {
                // Fallback
                setError('Signup failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <h1 className="signup-title">Signup</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input"
                />
                <button type="submit" className="signup-button" disabled={loading}>
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
            </form>
            {error && <p className="signup-error">{error}</p>}
            {success && <p className="signup-success">{success}</p>}
        </div>
    );
}

export default Signup;
