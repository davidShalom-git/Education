import React, { useEffect, useRef, useState } from 'react';
import helmet from '../assets/profile.png';
import galaxy from '../assets/galaxy.png';
import java from '../assets/java.png';
import js from '../assets/js.png';
import eng from '../assets/eng.png';
import gk from '../assets/gk.png';
import dsa from '../assets/dsa.png';
import physics from '../assets/phy.png';
import chemistry from '../assets/chy.png';
import ai from '../assets/ai.png';
import py from '../assets/py.png';
import { Link, useNavigate } from 'react-router-dom';
import { TextPlugin } from 'gsap/TextPlugin';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaSearch } from 'react-icons/fa';
import gsap from 'gsap';
import Logout from '../Auth/Logout';

gsap.registerPlugin(TextPlugin);

const Quiz = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const imageref = useRef(null);
  const textRef = useRef(null);
  const h1Ref = useRef(null);
  const cardRefs = useRef([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => setIsOpen(!isOpen);

  const topics = [
    { title: 'Physics', imgSrc: physics, direc: "/physics" },
    { title: 'Chemistry', imgSrc: chemistry, direc: "/chemistry" },
    { title: 'Python Programming', imgSrc: eng, direc: "/python" },
    { title: 'Java Programming', imgSrc: java, direc: "/java" },
    { title: 'Professional English', imgSrc: js, direc: "/eng" },
    { title: 'DSA', imgSrc: ai, direc: "/dsa" },
    { title: 'JavaScript', imgSrc: py, direc: "/javascript" },
    { title: 'Artificial Intelligence', imgSrc: gk, direc: "/ai" },
    { title: 'General Knowledge', imgSrc: dsa, direc: "/gk" },
  ];

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  return (
    <>
    
    <div className="container mx-auto my-10 px-6">
      <div
        className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center text-white rounded-[40px] bg-black mt-5"
        ref={navRef}
      >
        <div className="flex justify-between w-full md:w-auto">
          <img src={galaxy} alt="Galaxy Icon" className="h-10 w-10 animate-spin" />
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

        <div
          className={`flex-1 md:flex ${isOpen ? "block" : "hidden"} md:block justify-center mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 text-lg">
            <li>
              <Link to="/home" className="text-white hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/quiz" className="text-white hover:text-gray-400">
                Quiz
              </Link>
            </li>
            <li>
              <Link to="/docs" className="text-white hover:text-gray-400">
                Docs
              </Link>
            </li>
            <li>
              <Link to="/video" className="text-white hover:text-gray-400">
                Video
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-400">
                About
              </Link>
            </li>
          </ul>
        </div>

       <Logout />
      </div>

      <div className="flex justify-center items-center mt-10 mb-20">
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

      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-10 mb-20">
        {filteredTopics.map((topic, index) => (
          <div
            key={index}
            className="shadow-lg shadow-black p-6 md:p-8 mb-10 rounded-[35px] bg-black"
            ref={(el) => (cardRefs.current[index] = el)}
          >
            <img
              src={topic.imgSrc}
              className="h-[150px] md:h-[180px] mx-auto"
              alt={topic.title}
            />
            <h1 className="text-center mt-6 text-lg md:text-xl text-white"><Link to={topic.direc} className="text-white hover:text-gray-400">
              {topic.title}
            </Link></h1>
          </div>
        ))}
      </div>

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
                  <Link to="/contact" className="hover:text-gray-400">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-gray-400">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="hover:text-gray-400">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Quiz;
