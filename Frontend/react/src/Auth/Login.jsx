import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edu from '../assets/Edu.jpg';

const SignIn = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const navigate = useNavigate();

  const url = 'https://education-1-9tut.onrender.com/api/auth/login';

  const signIn = async () => {
    try {
      if (!Email || !Password) {
        toast.error('Please fill in both fields');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        toast.success('Logged in successfully!');
        navigate('/home');
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error in login');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signIn();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${Edu})`,
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="flex justify-center items-center"
    >
      <div className="flex flex-col items-center w-full max-w-md p-6 md:p-10 bg-opacity-20 bg-white backdrop-blur-lg rounded-lg shadow-lg mx-4">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-5xl text-white font-bold">E-Learning</h1>
          <h4 className="text-lg md:text-xl text-white mt-2">(Simplified Way to Learn)</h4>
        </div>
        <div className="w-full" style={glassStyle}>
          <h1 className="text-center text-2xl md:text-4xl text-white mb-6">Login In</h1>
          <form className="flex flex-col w-full" onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Enter the email"
              className="w-full px-4 py-3 rounded-lg mb-4 text-black focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter the password"
              className="w-full px-4 py-3 rounded-lg mb-4 text-black focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};




const glassStyle = { 
  
  background: 'rgba(255, 255, 255, 0.1)', 
  borderRadius: '16px', 
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', 
  backdropFilter: 'blur(5px)',
   WebkitBackdropFilter: 'blur(5px)', 
  border: '1px solid rgba(255, 255, 255, 0.3)', 
  textAlign: 'center', 
  paddingTop: '70px', 
  paddingBottom: '70px', 
  paddingLeft: '20px', 
  paddingRight: '20px', 
  margin: '20px', }; 


  const titleStyle = { 
    borderRadius: '25px', 
    padding: '15px 45px', 
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
     margin: '20px', };

export default SignIn;
