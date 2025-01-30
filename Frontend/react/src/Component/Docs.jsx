import React, { useState, useRef, useEffect } from "react";
import Java from "../assets/Java.pdf";
import JavaScript from "../assets/Javascript.pdf";
import Python from "../assets/Python.pdf";
import AI from "../assets/AI.pdf";
import DSA from "../assets/DSA.pdf";
import Evs from "../assets/Evs.pdf";
import English from "../assets/English.pdf";
import Physics from "../assets/Physics.pdf";
import Chemistry from "../assets/Chemistry.pdf";
import galaxy from '../assets/galaxy.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSearch } from 'react-icons/fa';
import gsap from 'gsap';
import Logout from "../Auth/Logout";
import axios from 'axios';

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const navRef = useRef(null);
  const imageref = useRef(null);
  const textRef = useRef(null);
  const h1Ref = useRef(null);
  const cardRefs = useRef([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
        if (imageref.current && textRef.current && h1Ref.current) {
          timeline
            .from(imageref.current, {
              x: isMobile ? 0 : isTablet ? -100 : -200,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
            })
            .from(textRef.current, {
              y: isMobile ? 50 : 200,
              opacity: 0,
              duration: 1.5,
              ease: "power2.out",
            }, "-=1")
            .to(h1Ref.current, {
              text: "Smart Learning...",
              duration: 2,
              ease: "power2.inOut",
            }, "-=1");
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


  // Load paid PDFs from localStorage
  useEffect(() => {
    const paidDocs = JSON.parse(localStorage.getItem("paidDocs")) || [];
    if (selectedPdf && paidDocs.includes(selectedPdf)) {
      setIsPaymentDone(true);
    }
  }, [selectedPdf]);

  // Function to handle payment
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
        description: "PDF Purchase",
        order_id: data.orderId,
        handler: function (response) {
          alert("Payment successful: " + response.razorpay_payment_id);
          setIsPaymentDone(true);
          setSelectedPdf(pdfSrc);

          // Save to localStorage
          const paidDocs = JSON.parse(localStorage.getItem("paidDocs")) || [];
          if (!paidDocs.includes(pdfSrc)) {
            paidDocs.push(pdfSrc);
            localStorage.setItem("paidDocs", JSON.stringify(paidDocs));
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

  // Function to check payment status before opening PDF
  const handlePdfClick = (pdfSrc) => {
    const paidDocs = JSON.parse(localStorage.getItem("paidDocs")) || [];

    if (paidDocs.includes(pdfSrc)) {
      setSelectedPdf(pdfSrc);
      setIsPaymentDone(true);
    } else {
      if (token) {
        handlePayment(pdfSrc);
      } else {
        navigate("/signup");
      }
    }
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
          <input type="text" placeholder="Enter the Topic.." className="shadow-xl shadow-black px-16 py-4 rounded-[50px] w-full sm:w-[400px] md:w-[500px]"
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {/* Topic List */}
      {!selectedPdf ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-20">
          {topics.filter((topic) => topic.title.toLowerCase().includes(searchQuery.toLowerCase())).map((topic, index) => (
            <div key={index} className="shadow-lg shadow-black p-6 rounded-[35px] bg-black text-white cursor-pointer"
              onClick={() => handlePdfClick(topic.pdfSrc)} ref={(el) => (cardRefs.current[index] = el)}>
              <h1 className="text-center mt-6 text-lg md:text-xl">{topic.title}</h1>
              <p className="text-center mt-2">Click to View PDF</p>
            </div>
          ))}
        </div>
      ) : (
        <iframe src={selectedPdf} className="w-full h-screen rounded-[35px] shadow-lg bg-white"></iframe>
      )}
    </div>
  );
};

export default Docs;
