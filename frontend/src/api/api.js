// api.js

import axios from 'axios';

// Set your backend URL
const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// -------------------- AUTH APIs --------------------

export const signup = (userData) => api.post('/signup', userData);

export const login = (loginData) => {
  const formData = new URLSearchParams();
  formData.append('username', loginData.username);
  formData.append('password', loginData.password);

  return api.post('/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const verifyEmail = (token) => api.get(`/verify-email?token=${token}`);

export const forgotPassword = (emailData) =>
  api.post('/forgot-password', emailData);

export const resetPassword = (resetData) =>
  api.post('/reset-password', resetData);

export const resendVerificationEmail = (email) => api.post('/resend-verification-email', { user_email: email });

// -------------------- RESUME APIs --------------------

export const uploadResume = (formData, token) =>
  api.post('/upload-resume/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
