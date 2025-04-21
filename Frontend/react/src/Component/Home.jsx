import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import gsap from 'gsap';
import { TextPlugin, ScrollTrigger } from 'gsap/all';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaArrowRight } from 'react-icons/fa';

// Import assets (keep the same imports)
import galaxy from '../assets/galaxy.png';
import Study from '../assets/Study.png';
import learn from '../assets/learn.png';
import anytime from '../assets/online-class.png';
import available from '../assets/online.png';
import Tesla from '../assets/Tesla.png';
import Elon from '../assets/Elon.png';
import apj from '../assets/apj.png';
import ratan from '../assets/rata.png';
import ignite from '../assets/Ignite.jpg';
import learm from '../assets/Learm.png';
import Logout from '../Auth/Logout';

// Register GSAP plugins
gsap.registerPlugin(TextPlugin, ScrollTrigger);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  
  // Refs for animations
  const navRef = useRef(null);
  const imageRef = useRef(null);
  const heroTextRef = useRef(null);
  const h1Ref = useRef(null);
  const cardsRef = useRef([]);
  const featuresRef = useRef([]);
  const quoteRef = useRef(null);
  const pricingRef = useRef(null);
  const influencersRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Payment handling function
  const handlePayment = async (price) => {
    setLoading(true);
    try {
      const amount = price;
      const currency = "INR";

      const { data } = await axios.post("http://localhost:5000/create-order", {
        amount: amount,
        currency: currency,
      });

      if (!data.success) {
        alert("Error creating order");
        setLoading(false);
        return;
      }

      // Initialize Razorpay Checkout
      const options = {
        key: "rzp_test_TVjSKuv8KsSr9Z",
        amount: data.amount,
        currency: data.currency,
        name: "EduSmart Learning",
        description: `Premium Plan - ₹${price}`,
        order_id: data.orderId,
        handler: function (response) {
          alert("Payment successful: " + response.razorpay_payment_id);
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
          contact: "+919876543210",
        },
        theme: {
          color: "#6366F1",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Payment initiation failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Animations setup with GSAP
  useEffect(() => {
    // Main timeline
    const mainTl = gsap.timeline();
    
    // Navbar animation
    mainTl.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );
    
    // Hero section animation
    mainTl.to(
      h1Ref.current,
      { text: "Smart Learning for the Future", duration: 1.2, ease: "power2.inOut" },
      "-=0.3"
    );
    
    mainTl.fromTo(
      heroTextRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );
    
    // Setup ScrollTrigger for features cards
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );
    });
    
    // Setup ScrollTrigger for feature sections
    featuresRef.current.forEach((feature) => {
      gsap.fromTo(
        feature,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: feature,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
    
    // Quote animation
    gsap.fromTo(
      quoteRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: quoteRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Pricing animation
    gsap.fromTo(
      pricingRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Influencers grid animation
    gsap.fromTo(
      influencersRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: influencersRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      // Clean up all animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      mainTl.kill();
    };
  }, []);

  // Navigation menu items
  const navItems = [
    { name: 'Home', path: '/home', id: 'home' },
    { name: 'Quiz', path: '/quiz', id: 'quiz' },
    { name: 'Docs', path: '/docs', id: 'docs' },
    { name: 'Video', path: '/video', id: 'video' },
    { name: 'About', path: '/about', id: 'about' }
  ];

  // Feature cards data
  const featureCards = [
    { 
      image: learn, 
      title: "Interactive Learning",
      description: "Engage with content that adapts to your learning style"
    },
    { 
      image: anytime, 
      title: "Learn Anytime",
      description: "Access courses 24/7 from any device, anywhere"
    },
    { 
      image: available, 
      title: "Expert Support",
      description: "Get help from qualified educators whenever you need it"
    }
  ];

  // Pricing plans data
  const pricingPlans = [
    {
      price: 100,
      features: [
        { text: "Access to Videos", included: true },
        { text: "Access to PDF's", included: true },
        { text: "Access to Courses", included: false },
        { text: "Download PDF's", included: false },
        { text: "Download Certificates", included: false }
      ]
    },
    {
      price: 300,
      features: [
        { text: "Access to Videos", included: true },
        { text: "Access to PDF's", included: true },
        { text: "Download PDF's", included: true },
        { text: "Access to Courses", included: false },
        { text: "Download Certificates", included: false }
      ]
    },
    {
      price: 500,
      recommended: true,
      features: [
        { text: "Access to Videos", included: true },
        { text: "Access to PDF's", included: true },
        { text: "Download PDF's", included: true },
        { text: "Access to Courses", included: true },
        { text: "Download Certificates", included: true }
      ]
    }
  ];

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        {/* Navigation Bar */}
        <motion.nav
          ref={navRef}
          className="flex flex-col md:flex-row justify-between items-center text-white px-6 py-5 rounded-2xl mx-auto bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 mt-5 shadow-lg"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo Section */}
          <div className="flex justify-between w-full md:w-auto">
            <div className="flex items-center space-x-2">
              <motion.img
                src={galaxy}
                alt="EduSmart Logo"
                className="h-10 w-10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
              <span className="text-xl font-bold">EduSmart</span>
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
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <motion.div
            className={`flex-1 md:flex ${isOpen ? "block" : "hidden"} md:block justify-center mt-4 md:mt-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : [null, 1] }}
            transition={{ duration: 0.3 }}
          >
            <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link 
                    to={item.path} 
                    className={`text-lg font-medium transition-all duration-300 hover:text-indigo-300 ${activeLink === item.id ? 'text-indigo-300 border-b-2 border-indigo-300' : 'text-white'}`}
                    onClick={() => setActiveLink(item.id)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Profile Section */}
          <Logout />
        </motion.nav>

        {/* Hero Section */}
        <motion.div 
          className="flex flex-col items-center justify-center mt-20 mb-28 px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div ref={heroTextRef} className="text-center max-w-4xl">
            <h1 ref={h1Ref} className="text-5xl md:text-7xl text-indigo-900 font-bold mb-6"></h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">Education that empowers your future and transforms your potential</p>
            <motion.button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center space-x-2 mx-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Learning</span>
              <FaArrowRight />
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featureCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-8 shadow-xl text-white flex flex-col items-center transform transition-all duration-300 hover:scale-105"
              ref={el => cardsRef.current[index] = el}
              variants={itemVariants}
            >
              <div className="bg-white/10 p-4 rounded-full mb-6">
                <img src={card.image} className="h-32 w-32" alt={card.title} />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center">{card.title}</h2>
              <p className="text-center text-indigo-100">{card.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Section 1 */}
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-12 mb-24 px-4"
          ref={el => featuresRef.current[0] = el}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:w-1/2">
            <img 
              src={learm} 
              className="rounded-2xl shadow-2xl w-full max-h-[500px] object-cover" 
              alt="Student learning" 
            />
          </div>
          
          <div className="lg:w-1/2 bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-2xl text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Learn What Matters</h2>
            <p className="text-lg leading-relaxed">
              Education is not just about acquiring knowledge; it is about learning what truly matters in life. 
              Whether you're exploring new skills or diving deeper into your passions, the journey of learning shapes the future. 
              Focus on what excites you, what sparks curiosity, and what has the power to impact your life and the world around you. 
              With the right tools and mindset, anything is possible. Start learning today and discover the true power of education.
            </p>
            <motion.button 
              className="mt-8 bg-white text-indigo-900 font-bold py-3 px-6 rounded-full hover:bg-indigo-100 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Courses</span>
              <FaArrowRight />
            </motion.button>
          </div>
        </motion.div>

        {/* Feature Section 2 */}
        <motion.div 
          className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24 px-4"
          ref={el => featuresRef.current[1] = el}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="lg:w-1/2">
            <img 
              src={ignite} 
              className="rounded-2xl shadow-2xl w-full max-h-[500px] object-cover" 
              alt="Ignite learning" 
            />
          </div>
          
          <div className="lg:w-1/2 bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Learning Makes Perfect</h2>
            <p className="text-lg leading-relaxed">
              Consistent practice and learning creates mastery. Our adaptive learning platform recognizes your strengths and areas for improvement,
              customizing content to maximize your learning potential. With interactive exercises, real-time feedback, and expert guidance,
              you'll build confidence and competence in any subject. Challenge yourself, embrace the journey, and discover how
              continuous learning transforms possibilities into achievements.
            </p>
            <motion.button 
              className="mt-8 bg-white text-purple-900 font-bold py-3 px-6 rounded-full hover:bg-indigo-100 transition-all duration-300 flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Start Practice</span>
              <FaArrowRight />
            </motion.button>
          </div>
        </motion.div>

        {/* Quote Section */}
        <motion.div 
          ref={quoteRef}
          className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-12 sm:p-16 w-full mx-auto mb-24 rounded-2xl shadow-xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white text-2xl sm:text-3xl font-bold italic leading-relaxed max-w-4xl mx-auto">
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </h1>
          <p className="text-indigo-200 mt-4 text-lg">— Malcolm X</p>
        </motion.div>

        {/* Influencers Grid */}
        <motion.div 
          ref={influencersRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {[Tesla, apj, Elon, ratan].map((image, index) => (
            <motion.div 
              key={index}
              className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 flex justify-center items-center shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img 
                src={image} 
                className="h-[200px] w-auto object-contain" 
                alt={`Influencer ${index + 1}`} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Second Quote */}
        <motion.div 
          className="bg-gradient-to-r from-purple-900 via-indigo-800 to-indigo-900 p-12 sm:p-16 w-full mx-auto mb-24 rounded-2xl shadow-xl text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-white text-2xl sm:text-3xl font-bold italic leading-relaxed max-w-4xl mx-auto">
            "The world is changing. Every time we lose, we damage ourselves. No more waiting, let's rock."
          </h1>
          <p className="text-indigo-200 mt-4 text-lg">— EduSmart Motto</p>
        </motion.div>

        {/* Pricing Section */}
        <div className="mb-24">
          <motion.div 
            className="bg-gradient-to-r from-indigo-900 to-purple-900 p-8 rounded-2xl shadow-xl text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-3xl font-bold">Our Services</h1>
            <p className="text-indigo-200 mt-4">Choose the plan that fits your learning journey</p>
          </motion.div>

          <motion.div 
            ref={pricingRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`bg-gradient-to-br ${plan.recommended ? 'from-indigo-700 to-purple-700 ring-4 ring-indigo-500' : 'from-indigo-900 to-purple-900'} rounded-2xl p-8 shadow-xl text-white relative transform transition-all duration-300 hover:scale-105`}
                variants={itemVariants}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold py-1 px-4 rounded-full text-sm shadow-lg">
                    MOST POPULAR
                  </div>
                )}
                <h1 className="text-center text-4xl font-bold mb-8">₹{plan.price}</h1>
                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center space-x-3 text-lg ${!feature.included && 'text-gray-400'}`}>
                      <span>{feature.included ? '✓' : '✗'}</span>
                      <span className={feature.included ? '' : 'line-through'}>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-center">
                  <motion.button
                    className={`border-2 border-white p-3 rounded-lg text-white text-xl hover:bg-white hover:text-indigo-900 transition-all duration-300 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    onClick={() => handlePayment(plan.price)}
                    disabled={loading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {loading ? 'Processing...' : 'Buy Now'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer 
        className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
          {/* Logo and Description */}
          <div className="mb-8 lg:mb-0 text-center lg:text-left lg:w-1/3">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-4">
              <motion.img
                src={galaxy}
                alt="EduSmart Logo"
                className="h-10 w-10"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              />
              <span className="text-2xl font-bold">EduSmart</span>
            </div>
            <p className="text-indigo-200 max-w-sm">
              Transforming education for the digital age. Learn anywhere, anytime with our premium courses and expert instructors.
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="mb-8 lg:mb-0">
            <h2 className="text-xl font-bold mb-6 text-center lg:text-left">Quick Links</h2>
            <ul className="space-y-3 text-center lg:text-left">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link 
                    to={item.path} 
                    className="hover:text-indigo-300 transition duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Links */}
          <div className="text-center lg:text-right">
            <h2 className="text-xl font-bold mb-6">Connect With Us</h2>
            <div className="flex space-x-6 justify-center lg:justify-end">
              <motion.a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#4267B2" }}
              >
                <FaFacebook className="text-3xl transition duration-300" />
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#1DA1F2" }}
              >
                <FaTwitter className="text-3xl transition duration-300" />
              </motion.a>
              <motion.a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#E1306C" }}
              >
                <FaInstagram className="text-3xl transition duration-300" />
              </motion.a>
              <motion.a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: "#0077B5" }}
              >
                <FaLinkedin className="text-3xl transition duration-300" />
              </motion.a>
            </div>
            <p className="mt-6 text-indigo-200">
              &copy; {new Date().getFullYear()} EduSmart Learning. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Nav;