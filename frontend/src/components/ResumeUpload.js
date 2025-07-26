import React, { useState } from 'react';
import axios from 'axios';
import SkillDisplay from './SkillDisplay';

const ResumeUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [skills, setSkills] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && !['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'].includes(selectedFile.type)) {
            setMessage('Invalid file type. Please upload a PDF, DOC, DOCX, PNG, or JPEG file.');
            setFile(null);
            return;
        }
        if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
            setMessage('File size exceeds the limit of 5MB.');
            setFile(null);
            return;
        }
        setFile(selectedFile);
        setMessage('');
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('https://skills-tpzr.onrender.com/api/upload-resume/', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('API Response:', response.data); // Debug log for API response
            const sanitizedSkills = response.data.skills.map(skill => skill.trim()); // Sanitize skills array
            setSkills(sanitizedSkills);
            setFeedback(response.data.feedback);
            setMessage('Resume uploaded successfully!');
        } catch (error) {
            console.error('Error uploading resume:', error); // Debug log for error
            setMessage(error.response?.data?.detail || 'Failed to upload resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="resume-upload-container">
            <h1 className="resume-upload-title">Upload Your Resume</h1>
            <div className="resume-upload-box">
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="resume-upload-input"
                />
                <button
                    onClick={handleUpload}
                    className="resume-upload-button"
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload Resume'}
                </button>
            </div>
            {message && <p className="resume-upload-message">{message}</p>}
            <SkillDisplay key={`${skills.length}-${feedback.length}`} skills={skills} feedback={feedback} />
        </div>
    );
};

export default ResumeUpload;
