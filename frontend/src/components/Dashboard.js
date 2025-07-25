import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome to your Dashboard!</h1>
      <button
        onClick={handleUploadClick}
        className="dashboard-button"
      >
        Upload Resume
      </button>
    </div>
  );
};

export default Dashboard;