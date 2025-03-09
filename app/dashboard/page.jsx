'use client';
import React, { useState, useEffect, Suspense, useRef, useContext, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import CountUp from 'react-countup';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import {
  ChartBarIcon,
  UserGroupIcon,
  Cog6ToothIcon as CogIcon,
  QuestionMarkCircleIcon,
  ClipboardDocumentListIcon as DocumentReportIcon,
  HomeIcon,
  UserIcon,
  FolderIcon,
  BellIcon,
  ArrowPathIcon as RefreshIcon,
  ChartPieIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import { Scene3D } from '../../components/3d/Scene';
import { EnhancedPieChart } from '../../components/charts/EnhancedPieChart';
import { DetectionTrends } from '../../components/charts/DetectionTrends';
import FakeProfileForm from '../../components/FakeProfileForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Add these animation variants at the top of your component
const hoverGlow = {
  whileHover: { 
    boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)",
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

const hoverRotate = {
  whileHover: { 
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

const hover3D = {
  whileHover: { 
    scale: 1.05,
    rotateX: 5,
    rotateY: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  whileTap: { scale: 0.95 }
};

// Floating Animation Component
function FloatingAnimation({ children }) {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

// Add these variants for section animations
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Add this gradient animation component
const MovingGradient = () => (
  <>
    {/* Enhanced Floating Elements */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.8, 1] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      className="absolute top-20 right-40 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl"
    />
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.5, 1] }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      className="absolute bottom-20 left-40 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full blur-xl"
    />
  </>
);

const glowingCard = {
  whileHover: {
    boxShadow: [
      "0 0 20px rgba(168, 85, 247, 0.2)",
      "0 0 30px rgba(168, 85, 247, 0.4)",
      "0 0 40px rgba(168, 85, 247, 0.2)"
    ],
    transition: {
      boxShadow: {
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  }
};

const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default function Dashboard() {
  // State to hold user input and prediction result
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    statuses_count: '',
    followers_count: '',
    friends_count: '',
    favourites_count: '',
    listed_count: '',
    geo_enabled: '',
    profile_use_background_image: '',
    lang: ''
  });
  const [predictionResult, setPredictionResult] = useState(null);
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Other state variables
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredCard, setHoveredCard] = useState(null);

  // Hooks for scroll and animations
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Effect for loading and notifications
  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `New suspicious activity detected at ${new Date().toLocaleTimeString()}`,
        type: 'warning'
      };
      setNotifications(prev => [newNotification, ...prev]);

      // Remove this notification after 4 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 4000);
    }, 10000);

    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = element.offsetTop - 20;
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const features = [
    {
      icon: "🔍",
      title: "Real-time Analysis",
      description: "Instantly analyze profiles with our advanced AI detection system",
      stat: "+99.9%",
      statLabel: "Accuracy",
      value: "99.9%",
      increase: "+0.5%",
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: "📊",
      title: "Detailed Insights",
      description: "Get comprehensive statistics and distribution analysis",
      stat: "+85%",
      statLabel: "Detection Rate",
      value: "85%",
      increase: "+2.3%",
      color: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: "⚡",
      title: "Quick Detection",
      description: "Rapid bulk profile scanning and verification",
      stat: "0.5s",
      statLabel: "Response Time",
      value: "0.5s",
      increase: "-0.1s",
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      icon: "🛡️",
      title: "Reliable Results",
      description: "High accuracy rate in detecting fake profiles",
      stat: "+95%",
      statLabel: "Reliability",
      value: "95%",
      increase: "+1.2%",
      color: "from-green-500/20 to-emerald-500/20"
    }
  ];

  // Update the pie chart data and options
  const pieData = {
    labels: ['Real Profiles', 'Fake Profiles', 'Suspicious Profiles'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: ['#2DD4BF', '#A855F7', '#FB923C'],
      borderWidth: 0,
      hoverBorderWidth: 0,
      hoverOffset: 0,
      spacing: 0
    }]
  };

  const pieOptions = {
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    elements: {
      arc: {
        borderWidth: 0,
        hoverOffset: 0,
        hoverBorderWidth: 0
      }
    },
    cutout: '75%',
    maintainAspectRatio: true,
    responsive: true,
    hover: { mode: null },
    events: [],
    animation: false
  };

  const textCenter = {
    id: 'textCenter',
    beforeDraw(chart) {
      const { ctx, width, height } = chart;
      
      ctx.save();
      ctx.fillStyle = '#1E1E1E';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, chart.getDatasetMeta(0).data[0].innerRadius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.font = '600 40px Inter';
      ctx.fillStyle = 'white';
      ctx.fillText('65%', width / 2, height / 2);

      ctx.font = '400 14px Inter';
      ctx.fillStyle = '#94A3B8';
      ctx.fillText('Real Profiles', width / 2, height / 2 + 25);

      ctx.restore();
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const handleAnalyzeUser = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsAnalyzing(true); // Set loading state
    try {
        console.log('User Data:', userData); // Log the user data being sent
        const response = await fetch('http://localhost:3000/api/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Server error: ' + response.statusText);
        }

        const result = await response.json();
        console.log('API Response:', result); // Log the response

        // Check if result is an array and has the expected structure
        if (Array.isArray(result) && result.length > 0) {
            const prediction = result[0]; // Get the first object in the array
            if (prediction.Predicted_isFake) {
                const isFake = prediction.Predicted_isFake[0]; // Access the first element of the array
                setPredictionResult(isFake === 1 ? 'The profile is likely fake.' : 'The profile is likely real.');
            } else {
                throw new Error('Predicted_isFake not found in response');
            }
        } else {
            throw new Error('Unexpected response format');
        }

        setError(null); // Clear any previous errors
    } catch (error) {
        setError('Error analyzing user: ' + error.message);
        setPredictionResult(null); // Clear previous prediction result
    } finally {
        setIsAnalyzing(false); // Reset loading state
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'distribution', label: 'Profile Distribution', icon: ChartPieIcon },
    { id: 'analyze', label: 'Analyse Profile', icon: UserIcon },
    { id: 'trends', label: 'Detection Trends', icon: ChartBarIcon },
    { id: 'features', label: "What's the use?", icon: QuestionMarkCircleIcon },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <Scene3D />
        </div>
      </div>

      {/* Animated Gradient Border */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>

      {/* Notification Bell */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        whileHover={{ scale: 1.1 }}
      >
        <div className="relative">
          <BellIcon className="h-6 w-6 text-white cursor-pointer" />
          {notifications.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center">
              {notifications.length}
            </span>
          )}
        </div>
      </motion.div>

      {/* Notifications Panel */}
      <AnimatePresence mode="popLayout">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: "rgba(168, 85, 247, 0.1)"
            }}
            transition={{ duration: 0.3 }}
            className="fixed top-12 right-4 bg-zinc-900 p-4 rounded-lg border border-purple-500 shadow-lg z-40 w-80
              cursor-pointer"
          >
            {notification.message}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Content Wrapper with Glass Effect */}
      <div className="relative z-10">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="fixed left-0 top-0 h-full w-64 bg-zinc-900/70 backdrop-blur-xl border-r border-zinc-800/50"
        >
          <FloatingAnimation>
            <div className="p-4">
              <motion.h2
                animate={{ 
                  backgroundPosition: ["0%", "100%"],
                  color: ["#06b6d4", "#a855f7"]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="text-xl font-bold mb-8 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent"
              >
                Fake Profile Detector
              </motion.h2>
              <nav className="space-y-3">
                {navItems.map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                      activeSection === id
                        ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-l-4 border-purple-500 text-white font-medium'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    whileHover={{ 
                      x: 5, 
                      backgroundColor: activeSection === id ? "" : "rgba(255, 255, 255, 0.1)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    variants={childVariants}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className={`w-5 h-5 ${activeSection === id ? 'text-purple-500' : ''}`} />
                    </motion.div>
                    <span>{label}</span>
                    {activeSection === id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute right-0 w-1 h-full bg-gradient-to-b from-purple-500 to-cyan-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>
          </FloatingAnimation>
        </motion.div>

        {/* Main Content Area */}
        <div className="ml-64 p-8">
          {/* Home Section */}
          <motion.section 
            id="home" 
            className="min-h-[70vh] p-8 relative overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MovingGradient />
            {/* White Gradient Animation */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse" />
              <div className="absolute inset-0 backdrop-blur-[100px]" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto relative z-10"
            >
              {/* Welcome Text */}
              <motion.h2 
                className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Welcome to Your Dashboard!
              </motion.h2>

              {/* Main Feature Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative mt-8"
              >
                <motion.div
                  className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-8 border border-zinc-800/50 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-purple-500/10"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />

                  {/* Floating Particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white/20 rounded-full"
                      animate={{
                        y: [-20, -40, -20],
                        x: [-10, 10, -10],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                    />
                  ))}

                  {/* Content Container */}
                  <div className="relative z-10">
                    {/* AI Icon with Pulse Effect */}
                    <motion.div
                      className="mb-6 inline-block"
                      animate={{
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="relative">
                        <span className="text-4xl">🤖</span>
                        <motion.div
                          className="absolute inset-0 bg-purple-500/20 rounded-full -z-10"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </div>
                    </motion.div>

                    {/* Main Text with Typing Effect */}
                    <motion.p
                      className="text-lg text-gray-300 leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    >
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ staggerChildren: 0.1 }}
                        className="inline-block"
                      >
                        Explore the power of AI-driven fake profile detection. Analyze social media accounts from{' '}
                        <span className="text-blue-400">Facebook</span>,{' '}
                        <span className="text-pink-400">Instagram</span>, and{' '}
                        <span className="text-cyan-400">Twitter</span> to determine their authenticity. Get real-time insights, track detection history, and enhance online safety with our advanced detection algorithms. Start analyzing now and stay protected from online fraud!{' '}
                        <motion.span
                          animate={{
                            rotate: [0, 20, 0],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="inline-block"
                        >
                          🚀
                        </motion.span>
                      </motion.span>
                    </motion.p>

                    {/* Interactive Elements */}
                    <motion.div
                      className="mt-6 flex gap-4 items-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.button
                        onClick={() => scrollToSection('analyze')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full font-medium text-white shadow-lg flex items-center gap-2"
                      >
                        <span>Start Analysis</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          →
                        </motion.span>
                      </motion.button>

                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-sm text-gray-400 flex items-center gap-2 cursor-pointer"
                      >
                        <QuestionMarkCircleIcon className="w-5 h-5" />
                        <span>Learn More</span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Corner Decorations */}
                  <motion.div
                    className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"
                    animate={{
                      scale: [1.2, 1, 1.2],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Profile Distribution Section */}
          <motion.section 
            id="distribution" 
            className="min-h-screen bg-zinc-900/30 p-8 relative overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MovingGradient />
            {/* White Gradient Animation */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse" />
              <div className="absolute inset-0 backdrop-blur-[100px]" />
            </div>
            <div className="relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Profile Distribution</h2>
                <div className="mt-4">
                  <EnhancedPieChart />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Try & Analyse Section */}
          <motion.section 
            id="analyze" 
            className="min-h-screen bg-zinc-900/30 p-8 relative overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MovingGradient />
            <div className="relative z-10">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
                  Try & Analyse a Profile
                </h2>

                <form onSubmit={handleAnalyzeUser} className="space-y-6">
                  <input
                    type="number"
                    name="id"
                    placeholder="ID"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    name="statuses_count"
                    placeholder="Statuses Count"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    name="followers_count"
                    placeholder="Followers Count"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    name="friends_count"
                    placeholder="Friends Count"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    name="favourites_count"
                    placeholder="Favourites Count"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    name="listed_count"
                    placeholder="Listed Count"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    name="geo_enabled"
                    placeholder="Geo Enabled (0 or 1)"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="number"
                    name="profile_use_background_image"
                    placeholder="Background Image (0 or 1)"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <input
                    type="text"
                    name="lang"
                    placeholder="Language"
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/50 text-white rounded-lg border border-[#333333] focus:outline-none focus:border-cyan-500"
                  />
                  <button type="submit" className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                    Analyze ⚡
                  </button>
                </form>

                {error && <div style={{ color: 'red' }}>{error}</div>}
                {predictionResult && <div>{predictionResult}</div>}
              </div>
            </div>
          </motion.section>

          {/* Detection Trends Section */}
          <motion.section 
            id="trends" 
            className="min-h-screen bg-zinc-900/30 p-8 relative overflow-hidden"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MovingGradient />
            {/* White Gradient Animation */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse" />
              <div className="absolute inset-0 backdrop-blur-[100px]" />
            </div>
            <div className="relative z-10">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">Detection Trends</h2>
                <div className="mt-4">
                  <DetectionTrends />
                </div>
              </div>
            </div>
          </motion.section>

          {/* What's the use Section */}
          <motion.section 
            id="features" 
            className="min-h-screen p-8 relative overflow-hidden bg-zinc-900/40 perspective-1000"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <MovingGradient />
            {/* Enhanced 3D Background Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-purple-500/15 animate-pulse transform rotate-3" />
              <div className="absolute inset-0 backdrop-blur-[30px]" />
              {/* Animated Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] bg-[size:100px_100px] [transform-style:preserve-3d] [perspective:1000px] rotate-x-12" />
            </div>

            <div className="relative z-10 [transform-style:preserve-3d]">
              <div className="max-w-6xl mx-auto">
                <motion.h2 
                  className="text-5xl font-extrabold mb-12 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg text-center"
                  variants={floatingAnimation}
                  animate="animate"
                >
                  What's the use?
                </motion.h2>

                {/* Features Grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-10 [transform-style:preserve-3d]"
                  variants={{
                    visible: {
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                >
                  {[
                    {
                      icon: <ShieldCheckIcon className="w-10 h-10 text-green-400" />,
                      title: "Enhanced Security",
                      description: "Protect your community with real-time threat detection and automated profile verification.",
                      color: "green",
                      gradientColors: "from-green-400 to-green-300"
                    },
                    {
                      icon: <ChartBarIcon className="w-10 h-10 text-cyan-400" />,
                      title: "Advanced Analytics",
                      description: "Gain valuable insights through comprehensive reporting and trend analysis.",
                      color: "cyan",
                      gradientColors: "from-cyan-300 to-blue-400",
                      titleClass: "text-cyan-300 font-extrabold",
                      descriptionClass: "text-gray-200 font-medium"
                    },
                    {
                      icon: <CogIcon className="w-10 h-10 text-purple-400" />,
                      title: "Intelligent Processing",
                      description: "Process thousands of profiles simultaneously with our scalable AI architecture.",
                      color: "purple",
                      gradientColors: "from-purple-400 to-purple-300"
                    },
                    {
                      icon: <UserIcon className="w-10 h-10 text-amber-400" />,
                      title: "User Experience",
                      description: "Intuitive interface with comprehensive reporting tools and easy integration options.",
                      color: "amber",
                      gradientColors: "from-amber-400 to-amber-300"
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 
                        shadow-[0_8px_32px_rgba(0,0,0,0.37)] [transform-style:preserve-3d]"
                      variants={{
                        hidden: { opacity: 0, y: 50, rotateX: -15 },
                        visible: { 
                          opacity: 1, 
                          y: 0, 
                          rotateX: 0,
                          transition: {
                            type: "spring",
                            damping: 20,
                            stiffness: 100
                          }
                        }
                      }}
                      {...hover3D}
                      {...glowingCard}
                    >
                      <motion.div
                        className="flex items-start gap-6 group [transform-style:preserve-3d]"
                        whileHover={{ z: 20 }}
                      >
                        <motion.div
                          className={`p-4 rounded-xl bg-${feature.color}-500/20 shadow-lg 
                            ring-1 ring-${feature.color}-500/30 [transform-style:preserve-3d]`}
                          whileHover={{ 
                            rotate: 360,
                            scale: 1.2,
                            boxShadow: `0 0 20px ${feature.color}40`
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {feature.icon}
                        </motion.div>
                        <div>
                          <motion.h3 
                            className={`text-2xl font-bold mb-4 drop-shadow-lg
                              ${feature.titleClass || `text-${feature.color}-400`} 
                              bg-gradient-to-r ${feature.gradientColors} bg-clip-text text-transparent`}
                          >
                            {feature.title}
                          </motion.h3>
                          <p className={`${feature.descriptionClass || 'text-gray-300'} font-medium text-lg leading-relaxed
                            group-hover:text-white transition-all duration-300 group-hover:translate-x-2`}>
                            {feature.description}
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced Call to Action */}
                <motion.div
                  className="mt-20 text-center"
                  variants={floatingAnimation}
                  animate="animate"
                >
                  <motion.button
                    className="px-12 py-5 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full 
                      font-bold text-xl text-white shadow-xl hover:shadow-purple-500/30
                      ring-2 ring-purple-500/30 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 10
                    }}
                  >
                    Explore Features
                    <motion.span
                      className="ml-2 inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* Add scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 z-50"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%"
        }}
      />
      <ToastContainer position="top-right" theme="dark" />
    </div>
  );
}

// Enhanced MetricCard Component
const MetricCard = ({ title, value, icon, increment = 0, suffix = '', isTime = false }) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    if (increment > 0) {
      const timer = setInterval(() => {
        setCurrentValue(prev => prev + increment);
      }, 30000); // Increment every 30 seconds
      return () => clearInterval(timer);
    }
  }, [increment]);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-zinc-900 p-6 rounded-lg border border-zinc-800 hover:border-purple-500 transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <motion.span
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          {icon}
        </motion.span>
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
        {isTime ? (
          value
        ) : (
          <CountUp
            end={currentValue}
            duration={2}
            separator=","
            suffix={suffix}
            decimals={suffix === '%' ? 1 : 0}
          />
        )}
      </div>
    </motion.div>
  );
};

// Sample data for charts
const barData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Fake Profiles Detected',
    data: [12, 19, 15, 25, 22, 30],
    backgroundColor: '#6366F1',
  }]
}; 