import React, { useEffect, useRef, useState } from 'react';
import helmet from '../assets/profile.png';
import galaxy from '../assets/galaxy.png';
import Study from '../assets/Study.png';
import learn from '../assets/learn.png';
import anytime from '../assets/online-class.png';
import available from '../assets/online.png';
import Tesla from '../assets/Tesla.png';
import Elon from '../assets/Elon.png';
import vadivel from '../assets/vadi.jpg';
import apj from '../assets/apj.png';
import ratan from '../assets/rata.png';
import ignite from '../assets/Ignite.jpg';
import learm from '../assets/Learm.png';
import { Link, useNavigate } from 'react-router-dom';
import { TextPlugin } from 'gsap/TextPlugin';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import gsap from 'gsap';
import Logout from '../Auth/Logout';

gsap.registerPlugin(TextPlugin);

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const imageref = useRef(null);
  const imagerefCard1 = useRef(null);
  const imagerefCard2 = useRef(null);
  const imagerefCard3 = useRef(null);
  const textRef = useRef(null);
  const h1Ref = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Responsive animations with GSAP matchMedia
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
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
    <div className="container mx-auto my-10 px-6">
      
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

<div className="container flex justify-evenly items-center mt-12 flex-col md:flex-row mx-auto p-6 md:p-10 rounded-[50px] mb-12 md:mb-24">
  <div ref={textRef} className="mb-5 md:mb-0 border border-white bg-black p-10 md:p-16 rounded-3xl mt-5 md:mt-0">
    <h1 ref={h1Ref} className="text-7xl text-white mb-2"></h1>
    <p className="text-2xl text-white">Education Matters and Important to Everyone</p>
  </div>
  <div className="mb-5 md:mb-0">
    <img
      ref={imageref}
      src={vadivel}
      className="h-[490px] md:w-[470px] w-[420px] mt-5 rounded-3xl"
      alt="David Shalom"
    />
  </div>
</div>

<div className="flex flex-col md:flex-row mt-12 mb-20 justify-between border border-black p-6 md:p-10 mx-4 md:mx-auto rounded-xl shadow-lg max-w-7xl" ref={imagerefCard1}>
  {/* Image Section */}
  <div className="flex justify-center mb-6 md:mb-0">
    <img src={learm} className="h-[300px] md:h-[440px] w-auto mx-auto rounded-lg " alt="Learn" />
  </div>

  {/* Text Section */}
  <div className="flex flex-col justify-center md:w-[50%] bg-black p-10 ">
    <h2 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left mb-4">
      Learn What Matters
    </h2>
    <p className='text-base md:text-lg text-white leading-relaxed'>
      Education is not just about acquiring knowledge; it is about learning what truly matters in life. Whether you're exploring new skills or diving deeper into your passions, the journey of learning shapes the future. Focus on what excites you, what sparks curiosity, and what has the power to impact your life and the world around you. With the right tools and mindset, anything is possible. Start learning today and discover the true power of education.
    </p>
  </div>

</div>

<div className="p-6 sm:p-10 w-full sm:w-3/4 md:w-1/2 mx-auto mb-5 rounded-[40px]">
  <h1 className=" text-center text-lg sm:text-2xl font-bold italic leading-relaxed">
    Our Works
  </h1>
</div>
<div className="flex flex-col md:flex-row space-x-0 md:space-x-5 justify-center mt-5 mb-20 px-5 md:px-10">

  <div
    className="shadow-lg shadow-black p-10 md:p-24 mb-10 rounded-lg bg-black"
    ref={imagerefCard1}
  >
    <img src={learn} className="h-[200px] md:h-[260px] mx-auto" alt="Learn" />
  </div>

  <div
    className="shadow-lg shadow-black p-10 md:p-24 mb-10 rounded-lg"
    ref={imagerefCard2}
  >
    <img
      src={anytime}
      className="h-[200px] md:h-[260px] w-[230px] md:w-[340px] mx-auto"
      alt="Anytime"
    />
  </div>

  <div
    className="shadow-lg shadow-black p-10 md:p-24 mb-10 rounded-lg bg-black"
    ref={imagerefCard3}
  >
    <img src={available} className="h-[200px] md:h-[300px] mx-auto" alt="Available" />
  </div>

</div>
<div className="bg-black p-6 sm:p-10 w-full sm:w-3/4 md:w-1/2 mx-auto mb-10 rounded-[40px]">
  <h1 className="text-white text-center text-lg sm:text-2xl font-bold italic leading-relaxed">
    Our Students
  </h1>
</div>

<div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto mt-10">
  <div className="text-white p-8 sm:p-10 md:p-12 flex justify-center items-center bg-black rounded-[40px] mx-auto">
    <img src={Tesla} className="h-[150px] sm:h-[180px] md:h-[300px] w-[150px] sm:w-[180px] md:w-[220px] mx-auto" alt="React" />
  </div>

  <div className="text-white p-8 sm:p-10 md:p-12 flex justify-center items-center bg-black rounded-[40px] mx-auto">
    <img src={apj} className="h-[150px] sm:h-[180px] md:h-[300px] w-[150px] sm:w-[180px] md:w-[240px] mx-auto" alt="HTML" />
  </div>

  <div className="text-white p-8 sm:p-10 md:p-12 flex justify-center items-center bg-black rounded-[40px] mx-auto">
    <img src={Elon} className="h-[150px] sm:h-[180px] md:h-[340px] w-[150px] sm:w-[180px] md:w-[250px] mx-auto" alt="Node.js" />
  </div>

  <div className="text-white p-8 sm:p-10 md:p-12 flex justify-center items-center bg-black rounded-[40px]  mx-auto">
    <img src={ratan} className="h-[150px] sm:h-[180px] md:h-[300px] w-[150px] sm:w-[180px] md:w-[270px] mx-auto" alt="Express.js" />
  </div>

  <div className="text-white p-8 sm:p-10 md:p-12 flex justify-center items-center bg-black rounded-[40px] mx-auto">
    <img src={Elon} className="h-[150px] sm:h-[180px] md:h-[340px] w-[150px] sm:w-[180px] md:w-[250px] mx-auto" alt="Node.js" />
  </div>

  <div className="text-white p-8 sm:p-10 md:p-12 flex justify-center items-center bg-black rounded-[40px] mx-auto">
    <img src={Tesla} className="h-[150px] sm:h-[180px] md:h-[300px] w-[150px] sm:w-[180px] md:w-[220px] mx-auto" alt="React" />
  </div>
</div>

<div className='flex flex-col md:flex-row mt-20 mb-20 justify-between p-6 md:p-10 mx-4 md:mx-auto rounded-xl max-w-7xl' ref={imagerefCard1}>
  {/* Image Section */}
  <div className='flex justify-center items-center mb-6 md:mb-0'>
    <h1 className='text-7xl'>Let's <br></br> Learn <br></br> Together.....</h1>
  </div>

  {/* Text Section */}
  <div className='flex flex-col justify-center md:w-[50%] bg-black p-10 '>
    <h2 className="text-2xl md:text-3xl font-bold text-white text-center md:text-left mb-4">
      Contact Us
    </h2>
    <h1 className='text-2xl text-white mb-2'>Mr.Maths Vaathiyaar</h1>
    <h1 className='text-2xl text-white mb-2'>364/4, White Field, North Street, Texas</h1>
    <h1 className='text-2xl text-white mb-2'>United States of America</h1>
    <h1 className='text-2xl text-white mb-2'>+91 1234567890</h1>
  </div>

</div>
    </div>


      <footer className="bg-black text-white py-10">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
          {/* Left Section - Social Media Links */}
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

          {/* Center Section - Quick Links */}
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-10 mb-6 lg:mb-0">
            <div className="flex flex-col items-center lg:items-start">
              <h2 className="text-xl font-bold mb-3">Quick Links</h2>
              <ul className="space-y-2 text-lg">
                <li>
                  <Link to="/home" className="hover:text-gray-400 transition duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/quiz" className="hover:text-gray-400 transition duration-300">
                    Quiz
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="hover:text-gray-400 transition duration-300">
                    Docs
                  </Link>
                </li>
                <li>
                  <Link to="/video" className="hover:text-gray-400 transition duration-300">
                    Video
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-gray-400 transition duration-300">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Copyright */}
          <div className="text-center text-sm mt-6 lg:mt-0">
            <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </>
  );
};

export default Nav;
