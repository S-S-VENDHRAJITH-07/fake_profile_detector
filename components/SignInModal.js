'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const SignInModal = ({ showSignIn, setShowSignIn, setShowSignUp }) => {
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
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: signInData.email,
          password: signInData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Invalid email or password');
        } else if (response.status === 400) {
          toast.error(data.error || 'Please check your input');
        } else {
          toast.error('An error occurred during sign in');
        }
        
        generateCaptcha();
        setSignInData(prev => ({
          ...prev,
          captchaInput: ''
        }));
        return;
      }

      if (data.message === 'Sign in successful!') {
        toast.success('Signed in successfully!');
        setShowSignIn(false);
        
        window.open('/dashboard', '_blank', 'noopener,noreferrer');
        
        setSignInData({
          email: '',
          password: '',
          captchaInput: ''
        });
      } else {
        toast.error('Unexpected response from server');
        generateCaptcha();
        setSignInData(prev => ({
          ...prev,
          captchaInput: ''
        }));
      }
      
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error('Failed to connect to the server. Please try again later.');
      
      generateCaptcha();
      setSignInData(prev => ({
        ...prev,
        captchaInput: ''
      }));
    }
  };

  const switchToSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
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
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
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