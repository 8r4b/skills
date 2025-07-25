import React, { useState } from 'react';
import { login } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
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
            const res = await login({ username: email, password });
            localStorage.setItem('token', res.data.access_token);
            console.log('Token saved:', res.data.access_token);

            setSuccess('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            const errorDetail = err.response?.data?.detail;

            if (Array.isArray(errorDetail)) {
                const messages = errorDetail.map((e) => e.msg).join(', ');
                setError(messages);
            } else if (typeof errorDetail === 'string') {
                setError(errorDetail);
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {error && <p className="login-error">{error}</p>}
            {success && <p className="login-success">{success}</p>}
            <Link to="/signup" className="login-link">Don't have an account? Signup</Link>
        </div>
    );
}

export default Login;
