// src/App.js
import React, { useState } from 'react';
import UserForm from './components/UserForm';
import AdminDashboard from './components/AdminDashboard';
import SuccessPage from './components/SuccessPage'; // Import the new SuccessPage component
import './App.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('form'); // State to track the current page

  const handleFormSubmit = () => {
    setCurrentPage('success'); // Navigate to success page after form submission
  };

  const goToDashboard = () => {
    setCurrentPage('dashboard'); // Navigate to the admin dashboard
  };

  return (
    <div className="app-container">
      <h1>Social Media Task</h1>
      {currentPage === 'form' && <UserForm onSubmit={handleFormSubmit} />}
      {currentPage === 'dashboard' && <AdminDashboard />}
      {currentPage === 'success' && <SuccessPage onGoToDashboard={goToDashboard} />}
      <button className="toggle-button" onClick={() => setCurrentPage(currentPage === 'dashboard' ? 'form' : 'dashboard')}>
        {currentPage === 'dashboard' ? 'Go to User Form' : 'Go to Admin Dashboard'}
      </button>
    </div>
  );
};

export default App;
