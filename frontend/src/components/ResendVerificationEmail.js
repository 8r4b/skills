import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resendVerificationEmail } from "../api/api";

function ResendVerificationEmail() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleResendEmail = async () => {
        try {
            const response = await resendVerificationEmail(email);
            setMessage(response.data.message);
            navigate("/verify-email"); // Navigate to verify-email page
        } catch (error) {
            if (error.response) {
                const errorMsg = error.response.data.msg || "An error occurred.";
                setMessage(errorMsg);
            } else {
                setMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="resend-verification-container">
            <h2 className="resend-verification-title">Resend Verification Email</h2>
            <input
                type="email"
                className="resend-verification-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button className="resend-verification-button" onClick={handleResendEmail}>Resend Email</button>
            {message && <p>{typeof message === "string" ? message : "An error occurred."}</p>}
        </div>
    );
}

export default ResendVerificationEmail;