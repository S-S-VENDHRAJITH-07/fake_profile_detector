
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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
  export default TestimonialsSection;