// Docs.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Logout from "../Auth/Logout";
import galaxy from "../assets/galaxy.png";
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

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
   const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navRef = useRef(null);
    const imageref = useRef(null);
    const imagerefCard1 = useRef(null);
    const imagerefCard2 = useRef(null); 
    const imagerefCard3 = useRef(null);
    const textRef = useRef(null);
    const h1Ref = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const toggleMenu = () => setIsOpen(!isOpen);

  const topics = [
    { title: "Physics", pdfSrc: Physics },
    { title: "Chemistry", pdfSrc: Chemistry },
    { title: "Python Programming", pdfSrc: Python },
    { title: "Java Programming", pdfSrc: Java },
    { title: "Professional English", pdfSrc: English },
    { title: "DSA", pdfSrc: DSA },
    { title: "JavaScript", pdfSrc: JavaScript },
    { title: "Artificial Intelligence", pdfSrc: AI },
    { title: "General Knowledge", pdfSrc: Evs },
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
        key: "rzp_test_5fOFzd2Txaz6fT",
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
              alert("Payment successful! You can now access all PDFs.");
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
        const { isDesktop, isTablet, isMobile } = context.conditions;

        // Navigation animation
        gsap.fromTo(
          navRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Hero section animations
        const timeline = gsap.timeline();
        timeline
          .from(
            imageref.current,
            {
              x: isMobile ? 0 : isTablet ? -100 : -200,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            0.5
          )
          .from(
            textRef.current,
            {
              y: isMobile ? 50 : 200,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
            },
            "-=1"
          )
          .to(
            h1Ref.current,
            {
              text: "Smart Learning...",
              duration: 2,
              ease: "power2.inOut",
            },
            "-=1"
          );

        // Cards animation
        const cardRefs = [
          imagerefCard1.current,
          imagerefCard2.current,
          imagerefCard3.current,
        ];

        gsap.from(cardRefs, {
          y: isMobile ? 100 : 200,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.3,
        });

        // Return cleanup function for this matchMedia context
        return () => {
          timeline.revert();
        };
      }
    );

    return () => {
      mm.revert(); // Ensure all animations and matchMedia instances are cleaned up
    };
  }, []); // Empty dependency array ensures this runs only 

  
  const handlePdfClick = (pdfSrc) => {
    if (!isPaymentDone) {
      alert("Please complete the payment to access the PDFs!");
      handlePayment();
      return;
    }
    setSelectedPdf(pdfSrc);
  };

  if (loading) {
    return (
      <div className="container mx-auto my-10 px-6 flex justify-center items-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 px-6">
      {/* Navigation Bar */}
      <div
  className="container flex flex-col md:flex-row justify-between items-center text-white px-6 py-5 rounded-[40px] mx-auto bg-black mt-5"
  ref={navRef}
>
  {/* Left Section */}
  <div className="flex justify-between w-full md:w-auto">
    <img
      src={galaxy}
      alt="Galaxy Icon"
      className="h-10 w-10 animate-spin"
    />
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
    className={`flex-1 md:flex ${isOpen ? "block" : "hidden"
      } md:block justify-center mt-4 md:mt-0`}
  >
    <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
      <li>
        <Link to="/home" className="text-xl text-white hover:text-gray-400">
          Home
        </Link>
      </li>
      <li>
        <Link to="/quiz" className="text-xl text-white hover:text-gray-400">
          Quiz
        </Link>
      </li>
      <li>
        <Link to="/docs" className="text-xl text-white hover:text-gray-400">
          Docs
        </Link>
      </li>
      <li>
        <Link to="/video" className="text-xl text-white hover:text-gray-400">
          Video
        </Link>
      </li>
      <li>
        <Link to="/about" className="text-xl text-white hover:text-gray-400">
          About
        </Link>
      </li>
    </ul>
  </div>
  {/* Right Section (Profile Icon) */}
  <Logout />
</div>

      {/* Search Bar */}
      <div className="flex justify-center items-center mt-10 mb-10">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Enter the Topic.."
            className="shadow-xl pl-16 pr-4 py-4 rounded-[50px] w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Payment Status Message */}
      {!isPaymentDone && (
        <div className="text-center mb-8 bg-blue-50 p-6 rounded-lg">
          <p className="text-lg mb-4">Complete the payment to access all PDFs</p>
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Make Payment (₹50 only)
          </button>
        </div>
      )}

      {/* PDF Grid or Viewer */}
      {!selectedPdf ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-20">
          {topics
            .filter(topic =>
              topic.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((topic, index) => (
              <div
                key={index}
                className={`shadow-lg p-6 rounded-[35px] ${
                  isPaymentDone ? 'bg-black hover:bg-gray-800' : 'bg-gray-500'
                } text-white cursor-pointer transition-colors`}
                onClick={() => handlePdfClick(topic.pdfSrc)}
              >
                <h1 className="text-center mt-6 text-lg md:text-xl">
                  {topic.title}
                </h1>
                <p className="text-center mt-2">
                  {isPaymentDone ? 'Click to View PDF' : 'Payment Required'}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() => setSelectedPdf(null)}
            className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Topics
          </button>
          <iframe
            src={selectedPdf}
            className="w-full h-screen rounded-[35px] shadow-lg bg-white"
            title="PDF Viewer"
          />
        </div>
      )}
    </div>
  );
};

export default Docs;
