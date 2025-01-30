import React, { useState, useEffect } from "react";
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

const Docs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [isPaymentDone, setIsPaymentDone] = useState(false);
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
    const fetchUserPaymentStatus = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("https://education-1mov.onrender.com/api/pay/payment-status", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setIsPaymentDone(response.data.isPaid);
      } catch (error) {
        console.error("Error checking payment status:", error);
        navigate("/login");
      }
    };

    fetchUserPaymentStatus();
  }, [token, navigate]);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("https://education-1mov.onrender.com/api/pay/create-order", {
        amount: 50, // INR
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
        description: "PDF Access Payment",
        order_id: data.orderId,
        handler: async function (response) {
          alert("Payment successful: " + response.razorpay_payment_id);
          setIsPaymentDone(true);

          await axios.post("https://education-1mov.onrender.com/api/user/update-payment", {}, {
            headers: { Authorization: `Bearer ${token}` }
          });
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
    if (!isPaymentDone) {
      alert("Please complete the payment first!");
      handlePayment();
      return;
    }
    setSelectedPdf(pdfSrc);
  };

  return (
    <div className="container mx-auto my-10 px-6">
      <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-white rounded-[40px] bg-black mt-5">
        <img src={galaxy} alt="Galaxy Icon" className="h-10 w-10 animate-spin" />
        <ul className="flex space-x-6 text-lg">
          <li><Link to="/home" className="text-white hover:text-gray-400">Home</Link></li>
          <li><Link to="/quiz" className="text-white hover:text-gray-400">Quiz</Link></li>
          <li><Link to="/docs" className="text-white hover:text-gray-400">Docs</Link></li>
          <li><Link to="/video" className="text-white hover:text-gray-400">Video</Link></li>
          <li><Link to="/about" className="text-white hover:text-gray-400">About</Link></li>
        </ul>
        <Logout />
      </div>

      <div className="flex justify-center items-center mt-10 mb-10">
        <div className="relative">
          <input type="text" placeholder="Enter the Topic.." className="shadow-xl px-16 py-4 rounded-[50px] w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {!selectedPdf ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 mt-20">
          {topics.filter(topic => topic.title.toLowerCase().includes(searchQuery.toLowerCase())).map((topic, index) => (
            <div key={index} className="shadow-lg p-6 rounded-[35px] bg-black text-white cursor-pointer" onClick={() => handlePdfClick(topic.pdfSrc)}>
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
