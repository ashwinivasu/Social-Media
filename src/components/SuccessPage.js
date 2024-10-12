// src/components/SuccessPage.js
import React from 'react';
import './SuccessPage.css'; // Importing CSS for styling

const SuccessPage = ({ onGoToDashboard }) => {
  return (
    <div className="success-page">
      <h2>Submission Successful!</h2>
      <p>Your information has been submitted successfully.</p>
      <button onClick={onGoToDashboard}>Go to Admin Dashboard</button>
    </div>
  );
};

export default SuccessPage;
