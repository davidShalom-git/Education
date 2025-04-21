import React, { useEffect, useRef,useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGraduationCap, FaBook, FaUsers, FaLightbulb } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

// Import your images
import galaxy from '../assets/galaxy.png';
import foundersImage from '../assets/vadi.jpg';
import teamMember1 from '../assets/Elon.png';
import teamMember2 from '../assets/apj.png';
import teamMember3 from '../assets/rata.png';
import campusImage from '../assets/Study.png';
import historyImage from '../assets/Ignite.jpg';
import Logout from '../Auth/Logout';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const AboutPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);
  const missionRef = useRef(null);
  const historyRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const ctaRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Stats data
  const stats = [
    { value: 15, label: "Years Experience", icon: FaGraduationCap },
    { value: 50, label: "Expert Educators", icon: FaUsers },
    { value: 200, label: "Courses Available", icon: FaBook },
    { value: 10000, label: "Students Educated", icon: FaLightbulb }
  ];

  // Team members data
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & Principal",
      image: teamMember1,
      description: "Ph.D in Educational Psychology with 20+ years of experience transforming learning environments.",
      socials: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Prof. Abdul Rahman",
      role: "Head of Sciences",
      image: teamMember2,
      description: "Award-winning physicist dedicated to making complex scientific concepts accessible to all learners.",
      socials: { twitter: "#", linkedin: "#" }
    },
    {
      name: "Ms. Rajni Tata",
      role: "Head of Innovation",
      image: teamMember3,
      description: "Former tech industry executive bringing cutting-edge educational technology to our curriculum.",
      socials: { twitter: "#", linkedin: "#" }
    }
  ];

  // Core values data
  const values = [
    { 
      title: "Excellence", 
      description: "We strive for excellence in everything we do, from curriculum design to student support." 
    },
    { 
      title: "Innovation", 
      description: "We embrace new ideas and technologies to provide the most effective learning experiences." 
    },
    { 
      title: "Inclusivity", 
      description: "We believe quality education should be accessible to everyone, regardless of background." 
    },
    { 
      title: "Community", 
      description: "We foster a supportive community where students learn from each other as well as educators." 
    }
  ];

  // GSAP Animations setup
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

        // Header animation
        gsap.fromTo(
          headerRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );

        // Setup section animations triggered by scroll
        const sections = [
          missionRef.current,
          historyRef.current,
          statsRef.current,
          teamRef.current,
          valuesRef.current,
          ctaRef.current
        ];

        sections.forEach((section, index) => {
          gsap.fromTo(
            section,
            { 
              y: 50, 
              opacity: 0 
            },
            { 
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
              },
              y: 0,
              opacity: 1,
              duration: 1,
              delay: isMobile ? 0 : 0.2,
              ease: "power2.out"
            }
          );
        });

        // Numbers counter animation
        const statElements = document.querySelectorAll('.stat-number');
        statElements.forEach(stat => {
          const targetValue = parseInt(stat.getAttribute('data-target'), 10);
          
          gsap.fromTo(
            stat,
            { innerText: 0 },
            {
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
              },
              innerText: targetValue,
              duration: 2,
              snap: { innerText: 1 },
              ease: "power2.out"
            }
          );
        });

        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
      }
    );

    return () => {
      mm.revert(); // Clean up
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50"
      >
        <div 
          className="container flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-indigo-900 to-purple-900 text-white px-6 py-4 rounded-b-3xl mx-auto shadow-lg backdrop-blur-md bg-opacity-90"
        >
          {/* Logo Section */}
          <div className="flex justify-between w-full md:w-auto items-center">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.img
                src={galaxy}
                alt="Galaxy Icon"
                className="h-10 w-10"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">EduSpace</span>
            </motion.div>
            <button
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
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
              </motion.div>
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`flex-1 md:flex ${isOpen ? "block" : "hidden"} md:block justify-center mt-4 md:mt-0`}
          >
            <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/home" className="text-lg text-white hover:text-blue-300 transition-colors duration-300">
                  Home
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/quiz" className="text-lg text-white hover:text-blue-300 transition-colors duration-300">
                  Quiz
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/docs" className="text-lg text-white hover:text-blue-300 transition-colors duration-300">
                  Docs
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/video" className="text-lg text-white hover:text-blue-300 transition-colors duration-300">
                  Video
                </Link>
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <Link to="/about" className="text-lg font-bold text-blue-300 hover:text-blue-200 transition-colors duration-300">
                  About
                </Link>
              </motion.li>
            </ul>
          </div>

          {/* Profile/Logout Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="hidden md:block"
          >
            <Logout />
          </motion.div>
        </div>
      </motion.header>

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 text-white" ref={headerRef}>
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About EduSpace
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transforming education through innovation, excellence, and accessibility since 2010
            </motion.p>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg className="relative block w-full h-16 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50"></path>
            </svg>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24" ref={missionRef}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <motion.div 
                className="md:w-1/2"
                whileInView={{ opacity: [0, 1], x: [-50, 0] }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Our <span className="text-indigo-600">Mission</span>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  At EduSpace, our mission is to provide accessible, high-quality education that empowers students to reach their full potential. We believe that education is a transformative force that can change lives and communities.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                  By combining innovative teaching methods, cutting-edge technology, and passionate educators, we create a learning environment where curiosity flourishes and knowledge becomes a tool for positive change.
                </p>
                <div className="flex space-x-4">
                  <motion.div 
                    className="h-2 w-20 bg-indigo-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 80 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  ></motion.div>
                  <motion.div 
                    className="h-2 w-12 bg-purple-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                  ></motion.div>
                  <motion.div 
                    className="h-2 w-8 bg-pink-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: 32 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-1/2 mt-10 md:mt-0"
                whileInView={{ opacity: [0, 1], x: [50, 0] }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 transform rotate-6 rounded-3xl"></div>
                  <img 
                    src={campusImage} 
                    alt="Our Campus" 
                    className="relative z-10 rounded-3xl shadow-xl object-cover w-full h-96"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-indigo-900 to-purple-900 text-white" ref={statsRef}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileInView={{ opacity: [0, 1], y: [50, 0] }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="bg-white/20 p-5 rounded-full">
                      <stat.icon className="text-4xl" />
                    </div>
                  </div>
                  <h3 className="text-5xl font-bold mb-2">
                    <span className="stat-number" data-target={stat.value}>0</span>
                    {stat.value >= 1000 ? "+" : ""}
                  </h3>
                  <p className="text-lg text-indigo-200">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* History Section */}
        <section className="py-16 md:py-24 bg-white" ref={historyRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our <span className="text-indigo-600">Journey</span>
              </h2>
              <p className="text-gray-600 text-lg">From a small tutoring service to a comprehensive educational platform</p>
            </div>
            
            <div className="flex flex-col items-center">
              {/* Timeline item 1 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-8 mb-16"
                whileInView={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/3 text-center md:text-right">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-2">2010</h3>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">The Beginning</h4>
                  <p className="text-gray-600">Founded as a small tutoring service with just 5 educators and a passion for transforming education.</p>
                </div>
                <div className="hidden md:block w-px h-full bg-indigo-600 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-indigo-600 shadow-lg"></div>
                </div>
                <div className="md:w-1/3">
                  <img 
                    src={foundersImage} 
                    alt="Founding Team" 
                    className="rounded-xl shadow-md w-full h-48 object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Timeline item 2 */}
              <motion.div 
                className="flex flex-col md:flex-row-reverse items-center gap-8 mb-16"
                whileInView={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/3 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-2">2015</h3>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Digital Expansion</h4>
                  <p className="text-gray-600">Launched our first online courses, reaching students beyond geographical boundaries.</p>
                </div>
                <div className="hidden md:block w-px h-full bg-indigo-600 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-indigo-600 shadow-lg"></div>
                </div>
                <div className="md:w-1/3">
                  <img 
                    src={historyImage} 
                    alt="Digital Expansion" 
                    className="rounded-xl shadow-md w-full h-48 object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Timeline item 3 */}
              <motion.div 
                className="flex flex-col md:flex-row items-center gap-8"
                whileInView={{ opacity: [0, 1], y: [50, 0] }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/3 text-center md:text-right">
                  <h3 className="text-2xl font-bold text-indigo-600 mb-2">2022</h3>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Global Impact</h4>
                  <p className="text-gray-600">Recognized as a leading educational platform with students from over 50 countries.</p>
                </div>
                <div className="hidden md:block w-px h-full bg-indigo-600 relative">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-indigo-600 shadow-lg"></div>
                </div>
                <div className="md:w-1/3">
                  <img 
                    src={campusImage} 
                    alt="Global Reach" 
                    className="rounded-xl shadow-md w-full h-48 object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-gray-50" ref={valuesRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our <span className="text-indigo-600">Values</span>
              </h2>
              <p className="text-gray-600 text-lg">The core principles that guide everything we do</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all"
                  whileInView={{ opacity: [0, 1], y: [50, 0] }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
                    <span className="text-white text-3xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-white" ref={teamRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Meet Our <span className="text-indigo-600">Team</span>
              </h2>
              <p className="text-gray-600 text-lg">Passionate educators and innovators dedicated to transforming learning</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div 
                  key={index}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden"
                  whileInView={{ opacity: [0, 1], y: [50, 0] }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="h-80 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-indigo-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 mb-6">{member.description}</p>
                    <div className="flex space-x-4">
                      {member.socials.twitter && (
                        <a href={member.socials.twitter} className="text-gray-500 hover:text-indigo-600 transition-colors">
                          <FaTwitter className="text-xl" />
                        </a>
                      )}
                      {member.socials.linkedin && (
                        <a href={member.socials.linkedin} className="text-gray-500 hover:text-indigo-600 transition-colors">
                          <FaLinkedin className="text-xl" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <motion.button 
                className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet the Full Team
              </motion.button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-900 to-purple-900 text-white" ref={ctaRef}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Educational Journey</h2>
              <p className="text-xl text-indigo-200 mb-10">
                Whether you're a student, educator, or lifelong learner, there's a place for you in our community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-medium shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Courses
                </motion.button>
                <motion.button 
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact Us
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-8">
            <div className="mb-8 lg:mb-0">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <motion.img
                  src={galaxy}
                  alt="Galaxy Icon"
                  className="h-10 w-10"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">EduSpace</span>
              </div>
              <p className="text-gray-400 max-w-xs text-center lg:text-left">
                Transforming education through innovation, excellence, and accessibility.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-4">Navigation</h3>
                <ul className="space-y-2">
                  <li><Link to="/home" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                  <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                  <li><Link to="/courses" className="text-gray-400 hover:text-white transition-colors">Courses</Link></li>
                  <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><Link to="/docs" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
                  <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                  <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Use</Link></li>
                  <li><Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg mb-4">Connect</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaFacebook className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaTwitter className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaInstagram className="text-xl" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <FaLinkedin className="text-xl" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center lg:flex lg:justify-between lg:items-center">
            <p className="text-gray-400 mb-4 lg:mb-0">
              &copy; {new Date().getFullYear()} EduSpace. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AboutPage;