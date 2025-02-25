'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

export function EnhancedPieChart() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredChart, setHoveredChart] = useState(false);

  const stats = [
    { label: 'Real Profiles', value: '65%', color: 'rgb(20, 184, 166)' },
    { label: 'Fake Profiles', value: '25%', color: 'rgb(168, 85, 247)' },
    { label: 'Suspicious Profiles', value: '10%', color: 'rgb(249, 115, 22)' }
  ];

  const data = {
    labels: stats.map(s => s.label),
    datasets: [{
      data: stats.map(s => parseInt(s.value)),
      backgroundColor: stats.map(s => s.color),
      borderWidth: 0,
      hoverOffset: 15
    }]
  };

  const options = {
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    cutout: '60%',
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="relative h-[400px] w-full">
      <div className="flex items-center h-full">
        {/* Left side - Pie Chart */}
        <div className="flex-1 flex justify-center ml-[15%]">
          <motion.div
            className="relative w-[350px] h-[350px]"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setHoveredChart(true)}
            onHoverEnd={() => setHoveredChart(false)}
          >
            {/* Animated Background Glow */}
            <AnimatePresence>
              {hoveredChart && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2), transparent)',
                    filter: 'blur(20px)',
                    zIndex: 0
                  }}
                />
              )}
            </AnimatePresence>

            <Pie data={data} options={options} />
            
            {/* Center Text with Animation */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
              animate={hoveredChart ? {
                scale: [1, 1.1, 1],
                transition: { duration: 1, repeat: Infinity }
              } : {}}
            >
              <motion.div 
                className="text-4xl font-bold text-[rgb(20, 184, 166)]"
                animate={hoveredChart ? {
                  y: [0, -5, 0],
                  transition: { duration: 2, repeat: Infinity }
                } : {}}
              >
                65%
              </motion.div>
              <motion.div 
                className="text-sm text-gray-400"
                animate={hoveredChart ? { color: '#ffffff' } : {}}
              >
                Real Profiles
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Stats */}
        <div className="flex flex-col gap-6 pr-8 w-[300px]">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ 
                scale: 1.05,
                x: 10,
                transition: { duration: 0.2 }
              }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
              className="flex items-center gap-4 bg-[#1a1a1a] rounded-lg px-6 py-4 cursor-pointer relative overflow-hidden"
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  backgroundColor: hoveredStat === index ? `${stat.color}20` : 'transparent',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Animated Dot */}
              <motion.div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: stat.color }}
                animate={hoveredStat === index ? {
                  scale: [1, 1.3, 1],
                  transition: { duration: 0.5, repeat: Infinity }
                } : {}}
              />

              {/* Content */}
              <div className="flex items-center justify-between flex-1 relative z-10">
                <motion.div 
                  className="text-gray-400"
                  animate={hoveredStat === index ? {
                    color: '#ffffff',
                    x: 5,
                    transition: { duration: 0.2 }
                  } : {}}
                >
                  {stat.label}
                </motion.div>
                <motion.div 
                  className="text-xl font-semibold"
                  style={{ color: stat.color }}
                  animate={hoveredStat === index ? {
                    scale: [1, 1.2, 1],
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  {stat.value}
                </motion.div>
              </div>

              {/* Sparkle Effect */}
              <AnimatePresence>
                {hoveredStat === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-2 right-2 text-yellow-300 text-sm"
                  >
                    ✨
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}