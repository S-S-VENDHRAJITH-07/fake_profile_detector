"use client";
import { motion, AnimatePresence } from "framer-motion";


import { useState, useEffect, useCallback, memo } from 'react';


import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link'; 

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent';

const Navbar = ({ darkMode, setDarkMode }) => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className={`fixed w-full top-0 z-50 ${
      darkMode ? 'bg-slate-900/80' : 'bg-white/80'
    } backdrop-blur-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              FPD
            </span>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className={`${
              darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            } px-3 py-2 text-sm font-medium`}>
              Home
            </Link>
            <Link href="/features" className={`${
              darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            } px-3 py-2 text-sm font-medium`}>
              Features
            </Link>
            <Link href="#faq" className={`${
              darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
            } px-3 py-2 text-sm font-medium`}>
              FAQ
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${
                darkMode 
                  ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Add the TestimonialsSection component
const TestimonialsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Social Media Manager",
      quote: "This tool has completely transformed how we verify profiles. The AI detection is incredibly accurate and has saved us countless hours of manual verification."
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Security Analyst",
      quote: "The accuracy and speed of detection are impressive. A must-have tool for anyone serious about profile verification."
    },
    {
      id: 3,
      name: "Emma Watson",
      role: "Digital Marketing Lead",
      quote: "Simple to use yet powerful. It has helped us maintain the integrity of our online community effectively."
    }
  ];

  useEffect(() => {
    if (!isAnimating) {
      const timer = setInterval(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAnimating]);

  return (
    <section className="w-full py-24 bg-black border-t border-[#333333] relative overflow-hidden flex justify-center">
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden rounded-xl border border-[#333333] p-8"
        >
          {/* Title with white color */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center">
              What our Users Think
            </h2>
            <span className="hidden md:inline text-gray-500 mx-2">—</span>
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-white text-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Real Stories, Real Impact
            </motion.h3>
          </div>

          <div className="relative h-[400px]">
            <AnimatePresence mode='wait'>
              <motion.div 
                key={currentReview}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="max-w-3xl mx-auto text-center relative">
                  {/* Decorative Background Elements */}
                  <motion.div 
                    className="absolute -top-8 -left-8 w-full h-full border-2 border-cyan-500/20 rounded-xl"
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
                    className="absolute -top-4 -left-4 w-full h-full border-2 border-purple-500/20 rounded-xl"
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
                    {/* Avatar and Name Section */}
                    <div className="mb-8">
                      <motion.div 
                        className="relative w-20 h-20 mx-auto mb-6"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        {/* Rotating Border */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 p-[2px]">
                          <div className="w-full h-full rounded-full bg-[#111111] flex items-center justify-center">
                            <motion.span 
                              className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent"
                              animate={{
                                scale: [1, 1.1, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              {reviews[currentReview].name.charAt(0)}
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h3 className="text-2xl font-bold text-white mb-2">{reviews[currentReview].name}</h3>
                        <p className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent font-medium">
                          {reviews[currentReview].role}
                        </p>
                      </motion.div>
                    </div>

                    {/* Quote */}
                    <motion.blockquote 
                      className="text-xl text-gray-300 italic mb-8 relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.span
                        className="absolute -top-6 -left-4 text-4xl text-cyan-500/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        "
                      </motion.span>
                      {reviews[currentReview].quote}
                      <motion.span
                        className="absolute -bottom-6 -right-4 text-4xl text-purple-500/20"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        "
                      </motion.span>
                    </motion.blockquote>

                    {/* Navigation Dots */}
                    <div className="flex justify-center space-x-2">
                      {reviews.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentReview(index)}
                          className={`transition-all duration-500 ${
                            currentReview === index 
                              ? 'w-12 h-2 bg-gradient-to-r from-cyan-500 to-purple-500' 
                              : 'w-2 h-2 bg-gray-600 hover:bg-gray-500 hover:w-4'
                          } rounded-full`}
                          aria-label={`View review ${index + 1}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userCaptchaInput, setUserCaptchaInput] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [signUpCaptcha, setSignUpCaptcha] = useState('');
  const [userSignUpCaptcha, setUserSignUpCaptcha] = useState('');
  const [currentFaq, setCurrentFaq] = useState(0);
  const [showSignIn, setShowSignIn] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    captchaInput: ''
  });
  const [captcha, setCaptcha] = useState('');
  const [errors, setErrors] = useState({});
  const [mounted, setMounted] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [age, setAge] = useState(0);
  const [showSignUp, setShowSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    password: '',
    confirmPassword: '',
    captchaInput: '',
    acceptTerms: false
  });

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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userCaptchaInput !== captcha) {
      alert('Invalid captcha!');
      setUserCaptchaInput('');
      return;
    }
    // Handle sign in logic here
    console.log('Signing in with:', { username, password });
    // Reset form
    setUsername('');
    setPassword('');
    setUserCaptchaInput('');
    setShowSignIn(false);
  };

  // Add handleGoogleSignIn function
  const handleGoogleSignIn = async () => {
    try {
      // Here you would implement Google Sign In logic
      console.log('Google sign in attempted');
      alert("Google Sign In feature coming soon!");
    } catch (error) {
      console.error('Google sign in error:', error);
      alert("Failed to sign in with Google. Please try again.");
    }
  };

  // Update your handleSignIn function
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Your existing validation logic here
      if (signInData.captchaInput === localCaptcha) {
        // Open dashboard in new tab
        window.open('/dashboard', '_blank', 'noopener,noreferrer');
        
        // Close the modal
        setShowSignIn(false);
        
        // Reset form
        setSignInData({
          email: '',
          password: '',
          captchaInput: ''
        });
      } else {
        toast.error('Invalid captcha!');
      }
    } catch (error) {
      toast.error('Sign in failed');
    }
  };

  // Add handleSignUp function
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Your existing validation logic
      
      // Open dashboard in new tab
      window.open('/dashboard', '_blank');
      
      // Close the modal
      setShowSignUp(false);
    } catch (error) {
      toast.error('Sign up failed');
    }
  };

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

  // Add this function to calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Add this function to generate captcha
  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  // Add the SignInModal component
  const SignInModal = () => {
    const [mounted, setMounted] = useState(false);
    const [localCaptcha, setLocalCaptcha] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signInData, setSignInData] = useState({
      email: '',
      password: '',
      captchaInput: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);

    const generateCaptcha = useCallback(() => {
      const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setLocalCaptcha(result);
    }, []);

    useEffect(() => {
      if (mounted && showSignIn) {
        generateCaptcha();
        setErrors({});
        setSignInData({
          email: '',
          password: '',
          captchaInput: ''
        });
      }
    }, [showSignIn, generateCaptcha, mounted]);

    const togglePasswordVisibility = (e) => {
      e.preventDefault();
      setShowPassword(prev => !prev);
    };

    const handleSignInChange = (e) => {
      const { name, value } = e.target;
      setSignInData(prev => ({
        ...prev,
        [name]: value
      }));
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };

    const validateForm = () => {
      const newErrors = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!signInData.email) {
        newErrors.email = 'Email is required';
      } else if (!emailRegex.test(signInData.email)) {
        newErrors.email = 'Please enter a valid email';
      }

      if (!signInData.password) {
        newErrors.password = 'Password is required';
      } else if (signInData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }

      if (!signInData.captchaInput) {
        newErrors.captcha = 'Please enter the captcha';
      } else if (signInData.captchaInput !== localCaptcha) {
        newErrors.captcha = 'Incorrect captcha';
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;

      try {
        // Add your sign-in logic here
        if (signInData.captchaInput === localCaptcha) {
          // Open dashboard in new tab
          window.open('/dashboard', '_blank', 'noopener,noreferrer');
          
          // Close the modal
          setShowSignIn(false);
          
          // Reset form
          setSignInData({
            email: '',
            password: '',
            captchaInput: ''
          });
        } else {
          toast.error('Invalid captcha!');
        }
      } catch (error) {
        toast.error('Sign in failed');
      }
    };

    if (!mounted || !showSignIn) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#111111] w-full max-w-md rounded-xl border border-[#333333] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Sign In</h2>
            <button 
              onClick={() => setShowSignIn(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signInData.email}
                onChange={handleSignInChange}
                className={`w-full p-3 bg-black text-white rounded-lg border ${
                  errors.email ? 'border-red-500' : 'border-[#333333]'
                } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  className={`w-full p-3 bg-black text-white rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-[#333333]'
                  } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Captcha */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Verify Captcha
              </label>
              <div className="flex gap-2 mb-3">
                <div className="flex-1 p-3 bg-black text-white rounded-lg border border-[#333333] font-mono text-center tracking-wider">
                  {localCaptcha}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="px-4 py-2 text-gray-400 hover:text-white border border-[#333333] rounded-lg transition-colors"
                  aria-label="Reload captcha"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                name="captchaInput"
                value={signInData.captchaInput}
                onChange={handleSignInChange}
                className={`w-full p-3 bg-black text-white rounded-lg border ${
                  errors.captcha ? 'border-red-500' : 'border-[#333333]'
                } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
                placeholder="Enter captcha text"
              />
              {errors.captcha && (
                <p className="mt-1 text-sm text-red-500">{errors.captcha}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-black">
      {/* Keep your existing header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-[#333333]">
        {/* Your existing navigation */}
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-2xl font-bold text-white">
              Debug Thugs
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                <Link href="/" className="text-white hover:text-cyan-500 transition-colors">
                  Home
                </Link>
                <Link href="#features" className="text-white hover:text-cyan-500 transition-colors">
                  Features
                </Link>
                <Link href="#faq" className="text-white hover:text-cyan-500 transition-colors">
                  FAQ
                </Link>
              </nav>
              
              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowSignIn(true)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowSignUp(true)}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

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

      {/* Add the SignInModal component */}
      <SignInModal />
      <ToastContainer position="top-right" theme="dark" />
      {showSignUp && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {/* Added max-height and overflow-y-auto to make content scrollable */}
          <div className="bg-[#111111] w-full max-w-md rounded-xl border border-[#333333] p-6 max-h-[90vh] overflow-y-auto">
            {/* Keep header fixed at top */}
            <div className="sticky top-0 bg-[#111111] pb-4 mb-6 border-b border-[#333333] z-10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Create Account</h2>
                <button
                  onClick={() => setShowSignUp(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Rest of your form content remains the same */}
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                // Your validation logic here
                if (signUpData.captchaInput === signUpCaptcha) {
                  // Open dashboard in new tab
                  window.open('/dashboard', '_blank', 'noopener,noreferrer');
                  
                  // Close the modal
                  setShowSignUp(false);
                  
                  // Reset form
                  setSignUpData({
                    firstName: '',
                    lastName: '',
                    dob: '',
                    password: '',
                    confirmPassword: '',
                    captchaInput: '',
                    acceptTerms: false
                  });
                } else {
                  toast.error('Invalid captcha!');
                }
              } catch (error) {
                toast.error('Sign up failed');
              }
            }} className="space-y-4">
              {/* First Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <input
                  type="text"
                  value={signUpData.firstName}
                  onChange={(e) => setSignUpData({...signUpData, firstName: e.target.value})}
                  className="w-full p-3 bg-black text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <input
                  type="text"
                  value={signUpData.lastName}
                  onChange={(e) => setSignUpData({...signUpData, lastName: e.target.value})}
                  className="w-full p-3 bg-black text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  placeholder="Enter your last name"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={signUpData.dob}
                  onChange={(e) => {
                    setSignUpData({...signUpData, dob: e.target.value});
                    setAge(calculateAge(e.target.value));
                  }}
                  className="w-full p-3 bg-black text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  required
                />
                {age > 0 && (
                  <p className="mt-1 text-sm text-gray-400">Age: {age} years</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <input
                  type="password"
                  value={signUpData.password}
                  onChange={(e) => setSignUpData({...signUpData, password: e.target.value})}
                  className="w-full p-3 bg-black text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  placeholder="Create a password"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={signUpData.confirmPassword}
                  onChange={(e) => setSignUpData({...signUpData, confirmPassword: e.target.value})}
                  className="w-full p-3 bg-black text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              {/* Captcha */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Verify Captcha</label>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 p-3 bg-black text-white rounded-lg border border-[#333333] font-mono text-center">
                    {signUpCaptcha}
                  </div>
                  <button
                    type="button"
                    onClick={generateSignUpCaptcha}
                    className="px-3 text-gray-400 hover:text-white border border-[#333333] rounded-lg"
                  >
                    ↻
                  </button>
                </div>
                <input
                  type="text"
                  value={signUpData.captchaInput}
                  onChange={(e) => setSignUpData({...signUpData, captchaInput: e.target.value})}
                  className="w-full p-3 bg-black text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  placeholder="Enter captcha text"
                  required
                />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={signUpData.acceptTerms}
                  onChange={(e) => setSignUpData({...signUpData, acceptTerms: e.target.checked})}
                  className="mt-1 mr-2"
                  required
                />
                <label className="text-sm text-gray-300">
                  I agree to the{' '}
                  <button
                    type="button"
                    onClick={() => setShowTerms(true)}
                    className="text-cyan-500 hover:text-cyan-400 underline"
                  >
                    Terms and Conditions
                  </button>
                </label>
              </div>

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}