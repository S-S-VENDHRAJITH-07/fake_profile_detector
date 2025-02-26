'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';

const SignUpModal = ({ showSignUp, setShowSignUp, setShowSignIn }) => {
  const [mounted, setMounted] = useState(false);
  const [localCaptcha, setLocalCaptcha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    password: '',
    confirmPassword: '',
    captchaInput: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const generateCaptcha = useCallback(() => {
    if (!mounted) return;
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setLocalCaptcha(result);
  }, [mounted]);

  useEffect(() => {
    if (mounted) {
      generateCaptcha();
      setErrors({});
      setSignUpData({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        password: '',
        confirmPassword: '',
        captchaInput: '',
        acceptTerms: false
      });
    }
  }, [mounted, generateCaptcha]);

  const handleSignUpChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different input types
    let newValue = type === 'checkbox' ? checked : value;

    // Validation for full name (only letters and spaces)
    if (name === 'firstName' && value) {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }
    if (name === 'lastName' && value) {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    setSignUpData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error when user starts typing
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
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    // Full Name validation
    if (!signUpData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!signUpData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    // Date of Birth validation
    if (!signUpData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    // Email validation
    if (!signUpData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(signUpData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!signUpData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(signUpData.password)) {
      newErrors.password = 'Password must be at least 8 characters with one uppercase letter and one number';
    }

    // Confirm Password validation
    if (!signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signUpData.password !== signUpData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Captcha validation
    if (!signUpData.captchaInput) {
      newErrors.captcha = 'Please enter the captcha';
    } else if (signUpData.captchaInput !== localCaptcha) {
      newErrors.captcha = 'Incorrect captcha';
    }

    // Terms validation
    if (!signUpData.acceptTerms) {
      newErrors.terms = 'You must accept the Terms and Conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          dateOfBirth: signUpData.dateOfBirth,
          email: signUpData.email,
          password: signUpData.password,
        }),
      });
      console.log("idhfidsubfdsiufbsdiufbsdiuf")

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign up failed. Please try again.');
      }

      toast.success('Account created successfully!');
      setShowSignUp(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const switchToSignIn = () => {
    setShowSignUp(false);
    setShowSignIn(true);
  };

  const TermsModal = () => {
    if (!showTerms) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
        <div className="bg-[#111111] w-full max-w-2xl rounded-xl border border-[#333333] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-white">Terms and Conditions</h3>
            <button 
              onClick={() => setShowTerms(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="prose prose-invert max-w-none">
            <h4>1. Acceptance of Terms</h4>
            <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h4>2. User Data</h4>
            <p>We collect and process your data in accordance with our privacy policy.</p>
            
            <h4>3. Account Security</h4>
            <p>You are responsible for maintaining the confidentiality of your account information.</p>
            
            {/* Add more terms as needed */}
          </div>
          <button
            onClick={() => setShowTerms(false)}
            className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            I Understand
          </button>
        </div>
      </div>
    );
  };

  if (!mounted || !showSignUp) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-[#111111] w-full max-w-md rounded-xl border border-[#333333] p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Create Account</h2>
            <button 
              onClick={() => setShowSignUp(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={signUpData.firstName}
                onChange={handleSignUpChange}
                className={`w-full p-3 bg-black text-white rounded-lg border ${
                  errors.firstName ? 'border-red-500' : 'border-[#333333]'
                } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
                placeholder="Enter your first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={signUpData.lastName}
                onChange={handleSignUpChange}
                className={`w-full p-3 bg-black text-white rounded-lg border ${
                  errors.lastName ? 'border-red-500' : 'border-[#333333]'
                } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
                placeholder="Enter your last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
              )}
            </div>

            {/* Date of Birth Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={signUpData.dateOfBirth}
                onChange={handleSignUpChange}
                className={`w-full p-3 bg-black text-white rounded-lg border ${
                  errors.dateOfBirth ? 'border-red-500' : 'border-[#333333]'
                } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
              />
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={signUpData.email}
                onChange={handleSignUpChange}
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
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  className={`w-full p-3 bg-black text-white rounded-lg border ${
                    errors.password ? 'border-red-500' : 'border-[#333333]'
                  } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
                  placeholder="Create a password"
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
                  className={`w-full p-3 bg-black text-white rounded-lg border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#333333]'
                  } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
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
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
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
                value={signUpData.captchaInput}
                onChange={handleSignUpChange}
                className={`w-full p-3 bg-black text-white rounded-lg border ${
                  errors.captcha ? 'border-red-500' : 'border-[#333333]'
                } focus:outline-none focus:border-cyan-500 placeholder:text-gray-500`}
                placeholder="Enter captcha text"
              />
              {errors.captcha && (
                <p className="mt-1 text-sm text-red-500">{errors.captcha}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={signUpData.acceptTerms}
                  onChange={handleSignUpChange}
                  className="w-4 h-4 border border-[#333333] rounded bg-black text-cyan-500 focus:ring-0 focus:ring-offset-0"
                />
              </div>
              <div className="ml-3">
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
                {errors.terms && (
                  <p className="mt-1 text-sm text-red-500">{errors.terms}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={switchToSignIn}
              className="text-cyan-500 hover:text-cyan-400 underline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
      <TermsModal />
    </>
  );
};

export default SignUpModal; 