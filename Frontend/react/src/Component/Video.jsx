import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaSearch } from 'react-icons/fa';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logout from "../Auth/Logout";
import galaxy from '../assets/galaxy.png';
import physics from '../assets/phy.png';
import chemistry from '../assets/chy.png';
import py from '../assets/py.png';
import java from '../assets/java.png';
import js from '../assets/js.png';
import eng from '../assets/eng.png';
import dsa from '../assets/dsa.png';
import ai from '../assets/ai.png';
import Evs from '../Video/Evs.mp4';
import Physics from '../Video/Physics.mp4';
import Chemistry from '../Video/Chemistry.mp4';
import Python from '../Video/Python.mp4';
import Java from '../Video/Java.mp4';
import Javascript from '../Video/JavaScript.mp4';
import AI from '../Video/AI.mp4';
import Dsa from '../Video/DSA.mp4';
import English from '../Video/English.mp4';

gsap.registerPlugin(TextPlugin);

const Video = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navRef = useRef(null);
  const cardRefs = useRef([]);
  const navigation = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigation('/login');
    }
  }, [token, navigation]);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserPaymentStatus = async () => {
      if (!token) {
        navigation('/login'); // Redirect if user is not logged in
        return;
      }

      try {
        const response = await axios.get("https://education-1mov.onrender.com/api/pay/payment-status", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setIsPaymentDone(response.data.isPaid); // Update payment status for logged-in user
      } catch (error) {
        console.error("Error fetching payment status:", error);
        navigation('/login'); // Redirect on error
      }
    };

    fetchUserPaymentStatus();
  }, [token, navigation]); // Runs when token changes

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("https://education-1mov.onrender.com/api/pay/create-order", {
        amount: 20, // INR
        currency: "INR",
      });

      if (!data.success) {
        alert("Error creating order");
        return;
      }

      const options = {
        key: "rzp_test_5fOFzd2Txaz6fT",
        amount: data.amount,
        currency: data.currency,
        name: "Smart Learning",
        description: "Video Purchase",
        order_id: data.orderId,
        handler: async function (response) {
          alert("Payment successful: " + response.razorpay_payment_id);
          setIsPaymentDone(true);

          // Update payment status in the database for the logged-in user
          await axios.post("https://education-1mov.onrender.com/api/user/update-payment", {}, {
            headers: { Authorization: `Bearer ${token}` }
          });

          // Store payment status in localStorage for this user only
          localStorage.setItem(`isPaid_${token}`, "true");
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed.");
    }
  };

  const topics = [
    { title: "Physics", videoSrc: Physics, imgSrc: physics },
    { title: "Chemistry", videoSrc: Chemistry, imgSrc: chemistry },
    { title: "Python Programming", videoSrc: Python, imgSrc: py },
    { title: "Java Programming", videoSrc: Java, imgSrc: java },
    { title: "Professional English", videoSrc: English, imgSrc: eng },
    { title: "DSA", videoSrc: Dsa, imgSrc: dsa },
    { title: "JavaScript", videoSrc: Javascript, imgSrc: js },
    { title: "Artificial Intelligence", videoSrc: AI, imgSrc: ai },
    { title: "General Knowledge", videoSrc: Evs, imgSrc: gk },
  ];

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleVideoClick = (videoSrc) => {
    if (!isPaymentDone) {
      alert("Please complete the payment first!");
      navigation('/payment');
      return;
    }
    setSelectedVideo(videoSrc);
  };

  return (
    <div className="container mx-auto my-10 px-6">
      <div
        className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-white rounded-[40px] bg-black mt-5"
        ref={navRef}
      >
        <div className="flex justify-between w-full md:w-auto">
          <img src={galaxy} alt="Galaxy Icon" className="h-10 w-10 animate-spin" />
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div className={`flex-1 md:flex ${isOpen ? "block" : "hidden"} md:block justify-center`}>
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 text-lg">
            <li><Link to="/home" className="text-white hover:text-gray-400">Home</Link></li>
            <li><Link to="/quiz" className="text-white hover:text-gray-400">Quiz</Link></li>
            <li><Link to="/docs" className="text-white hover:text-gray-400">Docs</Link></li>
            <li><Link to="/video" className="text-white hover:text-gray-400">Video</Link></li>
            <li><Link to="/about" className="text-white hover:text-gray-400">About</Link></li>
          </ul>
        </div>

        <Logout />
      </div>

      {/* Search Bar */}
      <div className="flex justify-center items-center mt-10 mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter the Topic.."
            className="shadow-xl shadow-black px-16 py-4 rounded-[50px] w-full sm:w-[400px] md:w-[500px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Payment Section */}
      {!isPaymentDone ? (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold mb-4">Complete Payment to Access Videos</h2>
          <button onClick={handlePayment} className="bg-green-500 text-white px-6 py-3 rounded-lg">Pay Now</button>
        </div>
      ) : !selectedVideo ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-20 mt-20">
          {filteredTopics.map((topic, index) => (
            <div
              key={index}
              className="shadow-lg p-6 rounded-lg bg-black text-white cursor-pointer"
              onClick={() => handleVideoClick(topic.videoSrc)}
              ref={(el) => (cardRefs.current[index] = el)}
            >
              <img
                src={topic.imgSrc}
                className="h-[150px] md:h-[180px] mx-auto"
                alt={topic.title}
              />
              <h1 className="text-center mt-6 text-lg">{topic.title}</h1>
              <p className="text-center mt-2">Click to View Video</p>
            </div>
          ))}
        </div>
      ) : (
        // Video Viewer Section
        <div className="flex flex-col items-center">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-full mb-6"
            onClick={() => setSelectedVideo(null)}
          >
            Back to List
          </button>
          <div className="w-full flex flex-col items-center">
            {/* Video Player */}
            <video
              src={selectedVideo}
              title="Video Viewer"
              controls
              className="w-full h-[80vh] shadow-lg rounded-[35px] bg-white mb-4"
            ></video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
