import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import College from '../assets/College.jpg';

const SignUp = () => {
  const [Name, SetName] = useState('');
  const [Email, SetEmail] = useState('');
  const [Password, SetPassword] = useState('');
  const navigate = useNavigate();

  const url = 'https://education-1-9tut.onrender.com/api/auth/register';

  const signUp = async () => {
    try {
      if (!Name || !Email || !Password) {
        toast.error('Please fill in all fields');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name, Email, Password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Account created successfully!');
        navigate('/home');
      } else {
        toast.error('Failed to create account');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error in sign-up');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signUp();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${College})`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="flex flex-col justify-center items-center h-full" style={containerStyle}>
        <div className="text-center mb-10 p-5 rounded-lg" style={titleStyle}>
          <h1 className="text-5xl text-white">Arunai Engineering College</h1>
          <h4 className="mt-2 text-xl text-white">(Autonomous Institution)</h4>
        </div>
        <div className="flex flex-col items-center px-20 py-36" style={glassStyle}>
          <h1 className="mb-24 text-5xl text-white">Sign Up</h1>
          <form className="flex flex-col" onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Enter the name"
              className="px-20 py-4 rounded-full mb-5"
              onChange={(e) => SetName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter the email"
              className="px-20 py-4 rounded-full mb-5"
              onChange={(e) => SetEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter the password"
              className="px-20 py-4 rounded-full mb-5"
              onChange={(e) => SetPassword(e.target.value)}
            />
            <button className="bg-black rounded-full w-40 py-4 text-white hover:bg-gray-800 transition duration-300 ease-in-out mx-auto">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  padding: '20px',
};

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  textAlign: 'center',
  paddingTop: '70px',
  paddingBottom: '70px',
  paddingLeft: '20px',
  paddingRight: '20px',
  margin: '20px',
};

const titleStyle = {
  borderRadius: '25px',
  padding: '15px 45px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  margin: '20px',
};

export default SignUp;
