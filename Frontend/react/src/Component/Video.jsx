import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import helmet from '../assets/profile.png';
import galaxy from '../assets/galaxy.png';
import Java from '../Video/Java.mp4';
import Javascript from '../Video/JavaScript.mp4';
import Python from '../Video/Python.mp4';
import Dsa from '../Video/DSA.mp4';
import Evs from '../Video/Evs.mp4';
import Physics from '../Video/Physics.mp4';
import Chemistry from '../Video/Chemistry.mp4';
import AI from '../Video/AI.mp4';
import English from '../Video/English.mp4';
import java from '../assets/java.png';
import js from '../assets/js.png';
import eng from '../assets/eng.png';
import gk from '../assets/gk.png';
import dsa from '../assets/dsa.png';
import physics from '../assets/phy.png';
import chemistry from '../assets/chy.png';
import ai from '../assets/ai.png';
import py from '../assets/py.png';
import { FaSearch } from 'react-icons/fa';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Logout from "../Auth/Logout";
import axios from "axios";

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
    // Redirect to login if there's no token
    if (!token) {
      navigation('/login');
    }
  }, [token, navigation]);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(max-width: 1023px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => {
        const { isDesktop, isTablet, isMobile } = context.conditions;

        const timeline = gsap.timeline();
        if (navRef.current) {
          timeline.from(navRef.current, {
            x: isMobile ? 0 : isTablet ? -100 : -200,
            opacity: 0,
            duration: 1.5,
            ease: "power2.out",
          });
        }

        const validCardRefs = cardRefs.current.filter(Boolean);
        if (validCardRefs.length > 0) {
          gsap.from(validCardRefs, {
            y: isMobile ? 100 : 200,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            stagger: 0.3,
          });
        }

        return () => {
          timeline.kill();
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

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

  useEffect(() => {
    const paidVideos = JSON.parse(localStorage.getItem("paidVideos")) || [];
    if (paidVideos.includes(selectedVideo)) {
      setIsPaymentDone(true);
    }
  }, [selectedVideo]);

  const handlePayment = async (pdfSrc) => {
    setIsPaymentDone(false);
    try {
      const { data } = await axios.post("http://localhost:1300/api/pay/create-order", {
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
        handler: function (response) {
          alert("Payment successful: " + response.razorpay_payment_id);
          setIsPaymentDone(true);
          setSelectedVideo(pdfSrc); // Set the selected video here

          // Save to localStorage
          const paidVideos = JSON.parse(localStorage.getItem("paidVideos")) || [];
          if (!paidVideos.includes(pdfSrc)) {
            paidVideos.push(pdfSrc);
            localStorage.setItem("paidVideos", JSON.stringify(paidVideos)); // Save paid video
          }
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

  const handlePdfClick = (pdfSrc) => {
    const paidVideos = JSON.parse(localStorage.getItem("paidVideos")) || [];

    if (paidVideos.includes(pdfSrc)) {
      setSelectedVideo(pdfSrc);
      setIsPaymentDone(true);
    } else {
      if (token) {
        handlePayment(pdfSrc); // Only initiate payment if the user is logged in
      } else {
        navigation("/signup"); // Redirect to signup page if not logged in
      }
    }
  };

  // Check for stored paid videos on page load
  useEffect(() => {
    const storedVideo = localStorage.getItem("selectedVideo");
    if (storedVideo) {
      setSelectedVideo(storedVideo);
      setIsPaymentDone(true); // Assuming the video is paid for
    }
  }, []);

  return (
    <>
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

        {/* List of Topics */}
        {!selectedVideo ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-20">
            {filteredTopics.map((topic, index) => (
              <div
                key={index}
                className="shadow-lg shadow-black p-6 rounded-[35px] bg-black text-white cursor-pointer"
                onClick={() => handlePdfClick(topic.videoSrc)}
                ref={(el) => (cardRefs.current[index] = el)}
              >
                <img
                  src={topic.imgSrc}
                  className="h-[150px] md:h-[180px] mx-auto"
                  alt={topic.title}
                />
                <h1 className="text-center mt-6 text-lg md:text-xl">{topic.title}</h1>
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

      <footer className="bg-black text-white py-10">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
          <div className="flex space-x-6 mb-6 lg:mb-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-3xl hover:text-blue-500 transition duration-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-3xl hover:text-blue-400 transition duration-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl hover:text-pink-500 transition duration-300" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-3xl hover:text-blue-700 transition duration-300" />
            </a>
          </div>

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10 mb-6 lg:mb-0">
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="text-xl font-bold mb-3">Quick Links</h2>
              <ul className="space-y-2 text-lg">
                <li>
                  <Link to="/contact" className="hover:text-gray-300 transition duration-300">Contact Us</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gray-300 transition duration-300">About Us</Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-gray-300 transition duration-300">Terms & Conditions</Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="text-xl font-bold mb-3">Follow Us</h2>
              <ul className="space-y-2 text-lg">
                <li>
                  <Link to="/privacy" className="hover:text-gray-300 transition duration-300">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/careers" className="hover:text-gray-300 transition duration-300">Careers</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Video;
