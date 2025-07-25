import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ResumeUpload from './components/ResumeUpload';
import SkillDisplay from './components/SkillDisplay';
import Dashboard from './components/Dashboard';
import VerifyEmail from './components/VerifyEmail'; // Import VerifyEmail component
import ResetPassword from './components/ResetPassword'; // Import ResetPassword component
import ResendVerificationEmail from './components/ResendVerificationEmail'; // Import ResendVerificationEmail component

function App() {
  const [skills, setSkills] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  const handleResumeUpload = (uploadedSkills, uploadedFeedback) => {
      setSkills(uploadedSkills);
      setFeedback(uploadedFeedback);
      setIsUploaded(true); // Hide ResumeUpload and show SkillDisplay
  };

  const token = localStorage.getItem('token');
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route 
          path="/" 
          element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
        
          <Route path="/upload" element={token ? <ResumeUpload onUpload={handleResumeUpload} /> : <Navigate to="/login" />} />

          <Route path="/skills" element={token ? <SkillDisplay skills={skills} feedback={feedback} /> : <Navigate to="/login" />} />

          <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

          <Route path="/verify-email" element={<VerifyEmail />} /> {/* Add VerifyEmail route */}
           <Route path="/forgot-password" element={<ResetPassword />} /> {/* Add Forgot Password route */}
           <Route path="/resend-verification" element={<ResendVerificationEmail />} /> {/* Add Resend Verification route */}

        </Routes>
      
      </div>
    </BrowserRouter>
  );
}
export default App;
