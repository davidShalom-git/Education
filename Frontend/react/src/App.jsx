import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Component/Home';
import GK from './Quiz/GK';
import English from './Quiz/English';
import SignIn from './Auth/Login';
import SignUp from './Auth/Sign';
import Logout from './Auth/Logout';
import Quiz from './Component/Quiz';
import Docs from './Component/Docs';
import Video from './Component/Video';
import About from './Component/About';
import Physics from './Quiz/Physics';
import Chemistry from './Quiz/Chemistry';
import Python from './Quiz/Python';
import AI from './Quiz/AI';
import Java from './Quiz/Java';
import JavaScript from './Quiz/JavaScript';
import DSA from './Quiz/DSA';
import PrivateRoute from './Auth/Private';
import { isAuthenticated } from './Auth/isAuth';

function App() {
  const { token } = isAuthenticated();

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="/video" element={<Video />} />
        <Route path="/about" element={<About />} />
        <Route path="/physics" element={<Physics />} />
        <Route path="/chemistry" element={<Chemistry />} />
        <Route path="/python" element={<Python />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/java" element={<Java />} />
        <Route path="/javascript" element={<JavaScript />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/gk" element={<GK />} />
        <Route path="/eng" element={<English />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;