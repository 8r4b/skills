import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link">Home</Link>

      {!token && (
        <>
          <Link to="/login" className="navbar-link">Login</Link>
          <Link to="/signup" className="navbar-link">Signup</Link>
          <Link to="/resend-verification" className="navbar-link">Resend Verification</Link> {/* Add Resend Verification link */}
        </>
      )}

      {token && (
        <>
          <Link to="/upload" className="navbar-link">Upload Resume</Link>
          <Link to="/skills" className="navbar-link">My Skills</Link>
          <button onClick={handleLogout} className="navbar-button">Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
