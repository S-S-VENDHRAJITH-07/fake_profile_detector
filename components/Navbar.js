"use client";

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <span className="text-xl font-bold text-white">
              Debug Thugs
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gray-300 text-sm">
              Home
            </Link>
            <Link href="/features" className="text-white hover:text-gray-300 text-sm">
              Features
            </Link>
            <Link href="/faq" className="text-white hover:text-gray-300 text-sm">
              FAQ
            </Link>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm cursor-default">
                Sign In
              </div>
              <div className="bg-[#00B4D8] text-white px-4 py-2 rounded-lg text-sm cursor-default">
                Sign Up
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
