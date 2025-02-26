"use client";

import Link from 'next/link';
import { useState } from 'react';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
const Navbar = ({ darkMode, setDarkMode }) => {
  
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

 

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 ${
        darkMode ? 'bg-black/80' : 'bg-white/80'
      } backdrop-blur-sm border-b ${darkMode ? 'border-[#333333]' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Debug Thugs
              </span>
            </div>

            {/* Navigation Links - Hidden on mobile */}
            <div className="hidden md:flex md:items-center md:space-x-8">
              <Link href="/" className={`${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } px-3 py-2 text-sm font-medium`}>
                Home
              </Link>
              <Link href="/features" className={`${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              } px-3 py-2 text-sm font-medium`}>
                Features
              </Link>
              <Link href="#faq" className={`${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
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
                    ? 'bg-gray-800 text-yellow-300 hover:bg-gray-700' 
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

              {/* Sign In/Sign Up Buttons */}
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

              {/* Mobile menu button */}
              <button className={`md:hidden p-2 rounded-lg ${
                darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-600'
              }`}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Add the Modals */}
      <SignInModal 
        showSignIn={showSignIn} 
        setShowSignIn={setShowSignIn}
        setShowSignUp={setShowSignUp}
      />
      <SignUpModal 
        showSignUp={showSignUp} 
        setShowSignUp={setShowSignUp}
        setShowSignIn={setShowSignIn}
      />
    </>
  );
};


export default Navbar;
