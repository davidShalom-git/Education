import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBook, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import Logout from "../Auth/Logout";
import galaxy from "../assets/galaxy.png";

// PDF imports
import Java from "../assets/Java.pdf";
import JavaScript from "../assets/Javascript.pdf";
import Python from "../assets/Python.pdf";
import AI from "../assets/AI.pdf";
import DSA from "../assets/DSA.pdf";
import Evs from "../assets/Evs.pdf";
import English from "../assets/English.pdf";
import Physics from "../assets/Physics.pdf";
import Chemistry from "../assets/Chemistry.pdf";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navRef = useRef(null);
  const topicsRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const toggleMenu = () => setIsOpen(!isOpen);

  const topics = [
    { 
      title: "Physics", 
      pdfSrc: Physics,
      icon: "🔭",
      description: "Fundamental principles of matter and energy"
    },
    { 
      title: "Chemistry", 
      pdfSrc: Chemistry,
      icon: "⚗️",
      description: "Study of composition, properties and behavior of matter"
    },
    { 
      title: "Python Programming", 
      pdfSrc: Python,
      icon: "🐍",
      description: "Versatile programming language for beginners and experts"
    },
    { 
      title: "Java Programming", 
      pdfSrc: Java,
      icon: "☕",
      description: "Object-oriented language for enterprise applications"
    },
    { 
      title: "Professional English", 
      pdfSrc: English,
      icon: "📝",
      description: "Business communication and writing skills"
    },
    { 
      title: "Data Structures & Algorithms", 
      pdfSrc: DSA,
      icon: "🧮",
      description: "Efficient data organization and problem-solving techniques"
    },
    { 
      title: "JavaScript", 
      pdfSrc: JavaScript,
      icon: "🌐",
      description: "Language of the web for interactive applications"
    },
    { 
      title: "Artificial Intelligence", 
      pdfSrc: AI,
      icon: "🤖",
      description: "Machine learning and cognitive computing fundamentals"
    },
    { 
      title: "General Knowledge", 
      pdfSrc: Evs,
      icon: "🌍",
      description: "Essential information about our world and society"
    },
  ];

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
            headers: { "x-auth-token": token }
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
        {}, // No body needed
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
        description: "PDF Access Payment",
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
              
              // Use GSAP for a success animation
              const successMessage = document.createElement("div");
              successMessage.className = "fixed top-0 left-0 w-full bg-green-500 text-white text-center py-4 z-50";
              successMessage.textContent = "Payment successful! You now have access to all resources.";
              document.body.appendChild(successMessage);
              
              gsap.fromTo(successMessage, 
                { y: -100, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
              );
              
              setTimeout(() => {
                gsap.to(successMessage, { 
                  y: -100, 
                  opacity: 0, 
                  duration: 0.5, 
                  ease: "power2.in",
                  onComplete: () => successMessage.remove()
                });
              }, 3000);
              
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
        theme: { color: "#6366F1" },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment initiation failed. Please try again.");
    }
  };
  
  // Set up GSAP animations
  useEffect(() => {
    // Initial navbar animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    
    // Search bar animation
    gsap.fromTo(
      searchRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.5 }
    );
    
    // Topic cards staggered animation
    if (topicsRef.current) {
      const cards = topicsRef.current.querySelectorAll('.topic-card');
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: "power2.out", 
          delay: 0.7 
        }
      );
    }
    
    // Set up scroll animations
    if (topicsRef.current) {
      ScrollTrigger.batch(".topic-card", {
        onEnter: batch => gsap.to(batch, { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.1, 
          overwrite: true 
        }),
        onLeave: batch => gsap.set(batch, { 
          scale: 0.95, 
          opacity: 0.8, 
          overwrite: true 
        }),
        onEnterBack: batch => gsap.to(batch, { 
          scale: 1, 
          opacity: 1, 
          stagger: 0.1, 
          overwrite: true 
        }),
        onLeaveBack: batch => gsap.set(batch, { 
          scale: 0.95, 
          opacity: 0.8, 
          overwrite: true 
        })
      });
    }
    
    return () => {
      // Clean up scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loading, selectedPdf]);

  const handlePdfClick = (pdfSrc) => {
    if (!isPaymentDone) {
      // Payment required animation
      const elem = document.getElementById("payment-alert");
      gsap.fromTo(
        elem,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
      
      setTimeout(() => {
        handlePayment();
      }, 500);
      return;
    }
    
    // Transition to PDF view
    gsap.to(".docs-container", { 
      opacity: 0, 
      y: 20, 
      duration: 0.5,
      onComplete: () => setSelectedPdf(pdfSrc)
    });
  };

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-xl font-medium">Loading your learning journey...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-20">
      {/* Navigation Bar */}
      <div
        className="flex flex-col md:flex-row justify-between items-center text-white px-6 py-4 rounded-2xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg mt-5 sticky top-4 z-50"
        ref={navRef}
      >
        {/* Left Section */}
        <div className="flex justify-between w-full md:w-auto items-center">
          <div className="flex items-center gap-3">
            <img
              src={galaxy}
              alt="Galaxy Icon"
              className="h-10 w-10 animate-spin-slow"
            />
            <span className="font-bold text-xl">EduSpace</span>
          </div>
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
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
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Center Section (Links) */}
        <div
          className={`flex-1 md:flex ${isOpen ? "block" : "hidden"} md:block justify-center mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <Link to="/home" className="text-lg font-medium text-white hover:text-indigo-200 transition-colors flex items-center gap-2">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/quiz" className="text-lg font-medium text-white hover:text-indigo-200 transition-colors flex items-center gap-2">
                <span>Quiz</span>
              </Link>
            </li>
            <li>
              <Link to="/docs" className="text-lg font-medium text-white hover:text-indigo-200 transition-colors flex items-center gap-2 border-b-2 border-white">
                <span>Docs</span>
              </Link>
            </li>
            <li>
              <Link to="/video" className="text-lg font-medium text-white hover:text-indigo-200 transition-colors flex items-center gap-2">
                <span>Video</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-lg font-medium text-white hover:text-indigo-200 transition-colors flex items-center gap-2">
                <span>About</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* Right Section (Profile Icon) */}
        <Logout />
      </div>

      {/* Content Section */}
      <motion.div 
        className="docs-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!selectedPdf ? (
          <>
            {/* Hero Section */}
            <motion.div 
              className="text-center mt-12 mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Discover Learning Resources
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our curated collection of educational materials to enhance your knowledge and skills.
              </p>
            </motion.div>

            {/* Search Bar */}
            <div className="flex justify-center items-center mb-12" ref={searchRef}>
              <motion.div 
                className="relative w-full max-w-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <input
                  type="text"
                  placeholder="Search for topics..."
                  className="shadow-xl pl-16 pr-4 py-5 rounded-full w-full text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              </motion.div>
            </div>

            {/* Payment Status Message */}
            {!isPaymentDone && (
              <motion.div 
                id="payment-alert"
                className="text-center mb-10 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-md max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-2xl font-semibold text-indigo-700 mb-3">Premium Access Required</h3>
                <p className="text-lg mb-6 text-gray-700">Unlock all educational resources with our affordable one-time payment</p>
                <motion.button
                  onClick={handlePayment}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Unlock All Resources (₹50 only)
                </motion.button>
              </motion.div>
            )}

            {/* PDF Grid */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
              ref={topicsRef}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {topics
                .filter(topic =>
                  topic.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((topic, index) => (
                  <motion.div
                    key={index}
                    className={`topic-card p-6 rounded-xl shadow-lg transition-all ${
                      isPaymentDone 
                        ? 'bg-white hover:shadow-xl cursor-pointer transform hover:-translate-y-1' 
                        : 'bg-gray-100 cursor-pointer'
                    }`}
                    onClick={() => handlePdfClick(topic.pdfSrc)}
                    variants={itemVariants}
                    whileHover={{ scale: isPaymentDone ? 1.03 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{topic.icon}</span>
                      <span className={`${
                        isPaymentDone 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                        } px-3 py-1 rounded-full text-sm font-medium`}
                      >
                        {isPaymentDone ? 'Available' : 'Locked'}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mt-2">{topic.title}</h2>
                    <p className="text-gray-600 mt-2 mb-4">{topic.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-indigo-600 font-medium flex items-center gap-1">
                        <FaBook className="inline-block" /> View PDF
                      </span>
                      <motion.div 
                        className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"
                        whileHover={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </>
        ) : (
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.button
              onClick={() => {
                gsap.to(".pdf-viewer", { 
                  opacity: 0, 
                  y: 20, 
                  duration: 0.3,
                  onComplete: () => setSelectedPdf(null)
                });
              }}
              className="absolute top-4 left-4 bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition-colors z-10 flex items-center gap-2 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaArrowLeft /> Back to Topics
            </motion.button>
            <div className="pdf-viewer">
              <iframe
                src={selectedPdf}
                className="w-full h-screen rounded-xl shadow-xl bg-white"
                title="PDF Viewer"
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Docs;