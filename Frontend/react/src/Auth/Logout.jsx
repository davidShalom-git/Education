import React from 'react';
import { useNavigate } from 'react-router-dom';
import helmet from '../assets/profile.png';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    
    if (confirmLogout) {
      localStorage.removeItem('token'); // Remove the token from localStorage
      navigate('/login'); // Redirect to the login page
      window.dispatchEvent(new Event('storage')); // Trigger the 'storage' event manually
    }
  };

  return (
    <div className="hidden md:flex items-center mt-4 md:mt-0 p-1">
      <button onClick={handleLogout}>
        <img
          src={helmet}
          alt="Profile Icon"
          className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14"
        />
      </button>
    </div>
  );
};

export default Logout;
