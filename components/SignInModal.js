'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const SignInModal = ({ showSignIn, setShowSignIn, setShowSignUp }) => {
  const [mounted, setMounted] = useState(false);
  const [localCaptcha, setLocalCaptcha] = useState('');
  // ... rest of your state declarations

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  // Rest of your SignInModal component code...
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111111] w-full max-w-md rounded-xl border border-[#333333] p-6">
        {/* ... existing form code ... */}
        
        {/* Add this at the bottom of the form */}
        <div className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={switchToSignUp}
            className="text-cyan-500 hover:text-cyan-400 underline"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignInModal; 