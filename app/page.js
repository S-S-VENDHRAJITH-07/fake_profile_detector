"use client";
import { motion, AnimatePresence } from "framer-motion";


import { useState, useEffect, useCallback, memo } from 'react';

import TestimonialsSection from '../components/TestimonialSection';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent';

// Add the TestimonialsSection component


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
 
  const [currentFaq, setCurrentFaq] = useState(0);
  
  
  const [showSignUp, setShowSignUp] = useState(false);
  

  // Add the faqs data
  const faqs = [
    {
      question: "What is Fake Profile Detection?",
      answer: "Fake Profile Detection is an AI-powered system that helps identify and verify the authenticity of social media profiles using advanced machine learning algorithms."
    },
    {
      question: "How accurate is the detection system?",
      answer: "Our system maintains a 95%+ accuracy rate in detecting fake profiles, thanks to continuous learning from our vast database and regular algorithm updates."
    },
    {
      question: "How long does the verification process take?",
      answer: "The verification process typically takes less than 30 seconds for a single profile, with bulk verification options available for larger scale needs."
    },
    {
      question: "What platforms do you support?",
      answer: "We currently support major social media platforms including Facebook, Twitter, Instagram, LinkedIn, and are continuously expanding our coverage."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we employ enterprise-grade encryption and follow strict data protection protocols. Your data is never shared with third parties."
    }
  ];

  

  // Add handleGoogleSignIn function
 


  

  // Add generateSignUpCaptcha function
  const generateSignUpCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSignUpCaptcha(captcha);
  };

  // Generate sign-up captcha on initial render
  useEffect(() => {
    if (showSignUp) {
      generateSignUpCaptcha();
    }
  }, [showSignUp]);

 

  //


  return (
    <main className="min-h-screen bg-black">
      {/* Navbar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* 1. Title Section */}
      {/* Move your existing title/hero section here */}
      <section className="w-full min-h-screen flex flex-col items-center justify-start pt-40 md:pt-48 p-4 bg-black">
        <div className="max-w-[1400px] w-full text-center">
          <motion.div 
            className={`space-y-8 relative overflow-hidden rounded-xl border border-[#333333] p-8 ${shimmer}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1>
              <span className="block text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white">
                Fake Profile Detector
              </span>
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Used by some of the world's largest companies, our AI-powered system enables you to detect
              <span className="font-medium"> high-quality fake profiles </span> 
              across social media platforms.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={() => setShowSignUp(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity text-lg font-semibold"
              >
                Get Started
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 text-base rounded-lg font-medium transition-all duration-300 
                  bg-[#111111] text-white hover:bg-[#222222] border border-[#333333]"
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-6 text-gray-400 font-mono text-sm"
            >
              npx detect-fake-profile@latest
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. What's the Use Section */}
      {/* Move your existing 'What's the Use' section here */}
      <section id="features-section" className="w-full py-24 bg-black border-t border-[#333333]">
        <div className="max-w-[1400px] mx-auto px-4">
          <motion.div className={`relative overflow-hidden rounded-xl border border-[#333333] p-8 ${shimmer}`}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
                What's the use?
              </h2>
              <span className="hidden md:inline text-gray-500 mx-2">—</span>
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center">
                Monitor any Profile Behaviour
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Real-time Analysis Card */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Add your SVG or image here */}
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 opacity-20 blur-xl" />
                    <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500" />
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Real-time Analysis</h4>
                <p className="text-gray-400">Advanced AI algorithms analyze profile behavior patterns in real-time</p>
              </motion.div>

              {/* Threat Detection Card */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      rotate: [0, 360],
                      borderRadius: ["25%", "50%", "25%"]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="w-32 h-32 border-4 border-cyan-500/30 rounded-xl" />
                    <div className="absolute w-24 h-24 border-4 border-teal-500/30 rounded-xl" 
                         style={{ transform: 'rotate(45deg)' }} />
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Threat Detection</h4>
                <p className="text-gray-400">Instantly identify and flag suspicious profile activities</p>
              </motion.div>

              {/* Profile Insights Card */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="grid grid-cols-2 gap-2">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-teal-500/20"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Profile Insights</h4>
                <p className="text-gray-400">Detailed analytics and behavioral patterns visualization</p>
              </motion.div>

              {/* Machine Learning Integration Card */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      rotateY: [0, 360],
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="relative">
                      <div className="w-32 h-32 rounded-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20" />
                      <motion.div 
                        className="absolute inset-0 border-2 border-cyan-500/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Machine Learning Integration</h4>
                <p className="text-gray-400">Advanced algorithms that learn and adapt to new deception patterns</p>
              </motion.div>

              {/* Cross-Platform Monitoring Card */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {[...Array(9)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500/30 to-teal-500/30"
                          animate={{
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 2,
                            delay: i * 0.1,
                            repeat: Infinity,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Cross-Platform Monitoring</h4>
                <p className="text-gray-400">Track profiles across multiple social media platforms simultaneously</p>
              </motion.div>

              {/* Automated Reports Card - Updated */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Document Stack Animation */}
                    <div className="relative">
                      {/* Background Document */}
                      <motion.div
                        className="absolute -right-4 -bottom-4 w-32 h-40 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/20"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />
                      
                      {/* Middle Document */}
                      <motion.div
                        className="absolute -right-2 -bottom-2 w-32 h-40 rounded-lg bg-gradient-to-br from-cyan-500/30 to-teal-500/30 border border-cyan-500/30"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.6, 0.9, 0.6],
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.3,
                          repeat: Infinity,
                        }}
                      />
                      
                      {/* Front Document with Lines */}
                      <motion.div
                        className="relative w-32 h-40 rounded-lg bg-gradient-to-br from-cyan-500/40 to-teal-500/40 border border-cyan-500/40 p-3"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.6,
                          repeat: Infinity,
                        }}
                      >
                        {/* Document Lines */}
                        <motion.div
                          className="space-y-2"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <div className="h-1.5 w-full bg-cyan-500/40 rounded" />
                          <div className="h-1.5 w-3/4 bg-cyan-500/40 rounded" />
                          <div className="h-1.5 w-1/2 bg-cyan-500/40 rounded" />
                          <div className="h-1.5 w-3/4 bg-cyan-500/40 rounded" />
                          <div className="h-1.5 w-2/3 bg-cyan-500/40 rounded" />
                        </motion.div>
                        
                        {/* Animated Checkmark */}
                        <motion.div
                          className="absolute bottom-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <svg 
                            className="w-4 h-4 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M5 13l4 4L19 7" 
                            />
                          </svg>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Automated Reports</h4>
                <p className="text-gray-400">Generate comprehensive analysis reports with one click</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Built with Future */}
      {/* Move your existing 'Built with Future' section here */}
      <section className="w-full py-24 bg-black">
        <div className="max-w-[1400px] mx-auto px-4">
          <motion.div className={`relative overflow-hidden rounded-xl border border-[#333333] p-8 ${shimmer}`}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">
              Built with Future-Ready Tools for Maximum Efficiency
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* React Card with Official Logo */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      rotateY: [0, 360],
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    <div className="text-[#61DAFB] w-32 h-32">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348">
                        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
                        <g stroke="currentColor" strokeWidth="1" fill="none">
                          <ellipse rx="11" ry="4.2"/>
                          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
                          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
                        </g>
                      </svg>
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">React</h4>
                <p className="text-gray-400">The library for web and native user interfaces</p>
              </motion.div>

              {/* Tailwind Card */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="text-cyan-500 w-32 h-32">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">Tailwind CSS</h4>
                <p className="text-gray-400">A utility-first CSS framework for rapid UI development</p>
              </motion.div>

              {/* MongoDB Card */}
              <motion.div 
                className="relative p-6 rounded-xl border border-[#333333] bg-[#111111] overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="h-48 mb-6 relative">
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.8, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="text-green-500 w-32 h-32">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.394-.394-.53-.53-.53-.95-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"/>
                      </svg>
                    </div>
                  </motion.div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">MongoDB</h4>
                <p className="text-gray-400">Flexible and scalable document database solution</p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. FAQ */}
      <section className="w-full pt-8 pb-24 bg-black border-t border-[#333333] relative overflow-hidden flex justify-center">
        {/* Single Moving White Gradient Effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"
          />
        </div>

        <div className="w-full max-w-[1400px] px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-xl border border-[#333333] p-8"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-16">
              Frequently Asked Questions
            </h2>

            <div className="relative h-[300px]">
              <AnimatePresence mode='wait'>
                <motion.div 
                  key={currentFaq}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="max-w-3xl mx-auto text-center relative">
                    {/* Decorative Elements */}
                    <motion.div 
                      className="absolute -top-4 -left-4 w-full h-full border-2 border-cyan-500/20 rounded-xl"
                      animate={{
                        rotate: [0, 5, 0],
                        scale: [1, 1.02, 1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <motion.div 
                      className="absolute -top-2 -left-2 w-full h-full border-2 border-teal-500/20 rounded-xl"
                      animate={{
                        rotate: [0, -5, 0],
                        scale: [1, 1.01, 1],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.2
                      }}
                    />
                    
                    {/* Content Container */}
                    <motion.div 
                      className="relative p-8 rounded-xl bg-[#111111] border border-[#333333]"
                      animate={{
                        boxShadow: [
                          "0 0 0 0 rgba(6, 182, 212, 0)",
                          "0 0 20px 2px rgba(6, 182, 212, 0.1)",
                          "0 0 0 0 rgba(6, 182, 212, 0)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {/* Question Number */}
                      <motion.div
                        className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          scale: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          },
                          rotate: {
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                          }
                        }}
                      >
                        {currentFaq + 1}
                      </motion.div>

                      <motion.h3 
                        className="text-2xl font-semibold text-white mb-6"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {faqs[currentFaq].question}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-400 text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {faqs[currentFaq].answer}
                      </motion.p>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 mt-12">
              {faqs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFaq(index)}
                  className={`transition-all duration-500 ${
                    currentFaq === index 
                      ? 'w-12 h-2 bg-gradient-to-r from-cyan-500 to-purple-500' 
                      : 'w-2 h-2 bg-gray-600 hover:bg-gray-500 hover:w-4'
                  } rounded-full`}
                  aria-label={`View FAQ ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. What Users Think */}
      <TestimonialsSection />

      {/* 6. Contact Details */}
      {/* Move your existing contact section here */}
      <footer className="w-full py-16 bg-black border-t border-[#333333]">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Debug Thugs</h3>
              <p className="text-gray-400">Protecting your digital presence with advanced AI technology.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 1 23 3z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02c0-1.5-.47-2.7-1.3-3.54a4.82 4.82 0 0 0-3.54-1.25zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.98 3.98 0 1 0 0 7.96 3.98 3.98 0 0 0 0-7.96z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.972-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.065 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Contact</h3>
              <div className="space-y-3">
                <a href="mailto:ajithpandian0703@gmail.com" className="flex items-center space-x-2 text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>ajithpandian0703@gmail.com</span>
                </a>
                <a href="mailto:vimalmathi8870@gmail.com" className="flex items-center space-x-2 text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <span>vimalmathi8870@gmail.com</span>
                </a>
                <a href="tel:+919360283837" className="flex items-center space-x-2 text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>+91 93602 83837</span>
                </a>
                <a href="tel:+917418741199" className="flex items-center space-x-2 text-gray-400 hover:text-cyan-500 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>+91 74187 41199</span>
                </a>
                <div className="flex items-center space-x-2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <span>123 AI Street, Tech Valley<br />Silicon City, SC 12345</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">About Us</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">Features</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">FAQ</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-500 transition-colors">Terms of Service</a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Stay Updated</h3>
              <p className="text-gray-400">Subscribe to our newsletter for the latest updates.</p>
              <form className="flex flex-col space-y-2">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-[#111111] border border-[#333333] rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-[#333333] text-center text-gray-400">
            <p>© 2024 Debug Thugs. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast Container */}
      <ToastContainer position="top-right" theme="dark" />
    </main>
  );
}