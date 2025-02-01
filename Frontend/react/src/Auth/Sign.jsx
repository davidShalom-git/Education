import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edu from '../assets/Edu.jpg';

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
        backgroundImage: `url(${Edu})`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <div className="flex flex-col items-center w-full max-w-md px-8 py-12" style={glassStyle}>
        <div className="text-center mb-8 p-4 rounded-lg w-full" style={titleStyle}>
          <h1 className="text-3xl text-white">E-Learning</h1>
          <h4 className="mt-2 text-lg text-white">(Simplified Way to Learn)</h4>
        </div>
        <h1 className="mb-8 text-3xl text-white">Sign Up</h1>
        <form className="flex flex-col w-full" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enter the name"
            className="px-4 py-3 rounded-2xl mb-4 w-full"
            onChange={(e) => SetName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter the email"
            className="px-4 py-3 rounded-2xl mb-4 w-full"
            onChange={(e) => SetEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter the password"
            className="px-4 py-3 rounded-2xl mb-4 w-full"
            onChange={(e) => SetPassword(e.target.value)}
          />
          <button className="bg-black rounded-full py-3 text-white hover:bg-gray-800 transition duration-300 ease-in-out w-full">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

const glassStyle = {
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  textAlign: 'center',
};

const titleStyle = {
  borderRadius: '12px',
  padding: '10px 20px',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
};

export default SignUp;