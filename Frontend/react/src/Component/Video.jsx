// Video.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowLeft, FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import galaxy from '../assets/galaxy.png';
import Logout from "../Auth/Logout";

// Import videos
import Evs from "../Video/Evs.mp4";
import Physics from "../Video/Physics.mp4";
import Chemistry from "../Video/Chemistry.mp4";
import Python from "../Video/Python.mp4";
import Java from "../Video/Java.mp4";
import Javascript from "../Video/JavaScript.mp4";
import AI from "../Video/AI.mp4";
import Dsa from "../Video/DSA.mp4";
import English from "../Video/English.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const videoGridRef = useRef(null);
  const videoCards = useRef([]);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Topic cards with images and descriptions
  const topics = [
    { 
      title: "Physics", 
      videoSrc: Physics,
      description: "Explore the fundamental laws of nature and understand how our universe works.",
      color: "from-blue-500 to-purple-600"
    },
    { 
      title: "Chemistry", 
      videoSrc: Chemistry,
      description: "Discover the building blocks of matter and chemical reactions.",
      color: "from-green-500 to-teal-600"
    },
    { 
      title: "Python Programming", 
      videoSrc: Python,
      description: "Learn one of the most versatile and beginner-friendly programming languages.",
      color: "from-yellow-400 to-orange-500"
    },
    { 
      title: "Java Programming", 
      videoSrc: Java,
      description: "Master object-oriented programming with this popular language.",
      color: "from-red-500 to-pink-600"
    },
    { 
      title: "Professional English", 
      videoSrc: English,
      description: "Enhance your communication skills for academic and professional success.",
      color: "from-indigo-500 to-purple-500"
    },
    { 
      title: "Data Structures & Algorithms", 
      videoSrc: Dsa,
      description: "Build a strong foundation in computer science fundamentals.",
      color: "from-blue-600 to-cyan-500"
    },
    { 
      title: "JavaScript", 
      videoSrc: Javascript,
      description: "Create interactive web applications with the language of the web.",
      color: "from-yellow-500 to-amber-600"
    },
    { 
      title: "Artificial Intelligence", 
      videoSrc: AI,
      description: "Explore the cutting-edge field of AI and machine learning.",
      color: "from-purple-500 to-pink-500"
    },
    { 
      title: "General Knowledge", 
      videoSrc: Evs,
      description: "Broaden your understanding of the world with essential knowledge.",
      color: "from-green-400 to-emerald-500"
    },
  ];

  // Animation setup
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        // Define breakpoints for responsive animations
        isDesktop: "(min-width: 1024px)",
        isTablet: "(max-width: 1023px)",
        isMobile: "(max-width: 768px)",
      },
      (context) => {
        // Navigation animation
        gsap.fromTo(
          navRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Search bar animation
        gsap.fromTo(
          searchRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
        );

        // Staggered animations for video cards
        if (videoCards.current.length > 0) {
          gsap.fromTo(
            videoCards.current,
            { y: 50, opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.6, 
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: videoGridRef.current,
                start: "top 80%",
              }
            }
          );
        }
      }
    );

    return () => {
      mm.revert(); // Ensure all animations and matchMedia instances are cleaned up
    };
  }, [loading]); // Run when loading state changes to ensure refs are populated

  // Check payment status on mount and after refresh
  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "https://education-1-9tut.onrender.com/api/pay/payment-status",
          {
            headers: { "x-auth-token": token },
          }
        );

        setIsPaymentDone(response.data.isPaid);
        setLoading(false);
      } catch (error) {
        console.error("Error checking payment status:", error);
        setLoading(false);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    checkPaymentStatus();
  }, [token, navigate]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    try {
      // Create order
      const orderResponse = await axios.post(
        "https://education-1-9tut.onrender.com/api/pay/create-order",
        {},
        {
          headers: { "x-auth-token": token },
        }
      );

      if (!orderResponse.data.success) {
        alert("Error creating order");
        return;
      }

      const options = {
        key: "rzp_live_LODynINQB1J1t5",
        amount: orderResponse.data.amount,
        currency: orderResponse.data.currency,
        name: "Smart Learning",
        description: "Video Access Payment",
        order_id: orderResponse.data.orderId,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post(
              "https://education-1-9tut.onrender.com/api/pay/verify-payment",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: { "x-auth-token": token },
              }
            );

            if (verifyResponse.data.success) {
              setIsPaymentDone(true);
              alert("Payment successful! You can now access all videos.");
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert("Payment verification failed. Please try again or contact support.");
          }
        },
        prefill: {
          name: "User",
          email: "user@example.com",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };

  const handleVideoClick = (videoSrc) => {
    if (!isPaymentDone) {
      alert("Please complete the payment to access the Videos!");
      handlePayment();
      return;
    }

    // Animate out content before showing video
    gsap.to([searchRef.current, videoGridRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => setSelectedVideo(videoSrc)
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-900 to-black text-white">
        <motion.div 
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16"
        >
          <img src={galaxy} alt="Loading" className="w-full h-full" />
        </motion.div>
        <p className="ml-4 text-xl font-light">Loading your learning journey...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation Bar */}
      <nav 
        ref={navRef}
        className="container mx-auto px-6 py-4"
      >
        <div className="bg-opacity-20 backdrop-filter backdrop-blur-lg bg-gray-900 rounded-2xl shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-center py-4 px-6">
            {/* Logo Section */}
            <div className="flex justify-between w-full md:w-auto items-center">
              <motion.div 
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={galaxy}
                  alt="Galaxy Icon"
                  className="h-10 w-10"
                />
              </motion.div>
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Smart Learning
              </span>
              <button
                className="md:hidden"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                <motion.svg
                  whileTap={{ scale: 0.9 }}
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                  ></path>
                </motion.svg>
              </button>
            </div>

            {/* Center Section (Links) */}
            <motion.div
              className={`flex-1 md:flex ${isOpen ? "block" : "hidden"} md:block justify-center mt-4 md:mt-0`}
              initial={false}
              animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0, transitionEnd: { display: "none" } }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                {["Home", "Quiz", "Docs", "Video", "About"].map((item, index) => (
                  <motion.li key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                    <Link 
                      to={`/${item.toLowerCase()}`} 
                      className={`text-lg font-medium transition-colors ${item.toLowerCase() === "video" ? "text-blue-400" : "text-white hover:text-blue-400"}`}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Right Section (Profile Icon) */}
            <Logout />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 pb-20">
        {/* Page Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-bold text-center mt-16 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          Video Learning Center
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-lg text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Expand your knowledge with our curated collection of educational videos across various subjects
        </motion.p>

        {/* Search Bar */}
        <div className="flex justify-center items-center mb-16" ref={searchRef}>
          <motion.div 
            className="relative w-full max-w-2xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <input
              type="text"
              placeholder="Search for topics..."
              className="w-full px-6 py-4 pl-12 rounded-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg border border-gray-700 focus:border-blue-500 outline-none text-white text-lg shadow-lg transition-all duration-300 focus:shadow-blue-500/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          </motion.div>
        </div>

        {/* Payment Status Message */}
        {!isPaymentDone && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-8 rounded-2xl backdrop-filter backdrop-blur-sm border border-blue-800/30 shadow-xl"
          >
            <h3 className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Unlock Premium Learning
            </h3>
            <p className="text-lg mb-6 text-gray-300">Complete a one-time payment to access our entire video library</p>
            <motion.button
              onClick={handlePayment}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Unlimited Access for ₹50 only
            </motion.button>
          </motion.div>
        )}

        {/* Video Grid or Video Player */}
        {!selectedVideo ? (
          <div 
            ref={videoGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {topics
              .filter((topic) =>
                topic.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((topic, index) => (
                <motion.div
                  key={index}
                  ref={el => videoCards.current[index] = el}
                  className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 ${
                    isPaymentDone ? "cursor-pointer transform hover:-translate-y-2" : "opacity-80"
                  }`}
                  whileHover={isPaymentDone ? { scale: 1.03 } : {}}
                  whileTap={isPaymentDone ? { scale: 0.98 } : {}}
                  onClick={() => handleVideoClick(topic.videoSrc)}
                >
                  <div className={`h-48 bg-gradient-to-br ${topic.color} flex items-center justify-center p-6`}>
                    <div className="relative w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                      <FaPlay className="text-white ml-1" />
                      {!isPaymentDone && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6 bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-lg">
                    <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                    <p className="text-gray-300 text-sm mb-4">{topic.description}</p>
                    <div className="flex items-center text-sm">
                      {isPaymentDone ? (
                        <span className="text-blue-400 font-medium">Click to watch now</span>
                      ) : (
                        <span className="text-gray-400">Requires payment to unlock</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedVideo(null);
                // Reset animation for grid elements
                setTimeout(() => {
                  gsap.fromTo(
                    [searchRef.current, videoGridRef.current],
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.5 }
                  );
                }, 100);
              }}
              className="absolute top-4 left-4 z-10 bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2"
            >
              <FaArrowLeft />
              <span>Back to Topics</span>
            </motion.button>
            <video
              src={selectedVideo}
              controls
              className="w-full aspect-video rounded-2xl bg-black shadow-lg"
              title="Video Viewer"
              autoPlay
            />
            <div className="p-6 bg-gray-800 bg-opacity-70 backdrop-filter backdrop-blur-lg">
              <h2 className="text-2xl font-semibold mb-2">
                {topics.find(t => t.videoSrc === selectedVideo)?.title || "Educational Video"}
              </h2>
              <p className="text-gray-300">
                {topics.find(t => t.videoSrc === selectedVideo)?.description || "Expand your knowledge with this educational content."}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Video;