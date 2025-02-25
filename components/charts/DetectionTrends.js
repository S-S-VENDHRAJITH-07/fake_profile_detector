'use client';
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function DetectionTrends() {
  const [hoveredStat, setHoveredStat] = useState(null);
  const [hoveredChart, setHoveredChart] = useState(false);

  const stats = [
    { label: 'Real', value: '72%', color: 'rgb(20, 184, 166)' },
    { label: 'Fake', value: '24%', color: 'rgb(168, 85, 247)' },
    { label: 'Suspicious', value: '4%', color: 'rgb(249, 115, 22)' }
  ];

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Real Profiles',
        data: [65, 70, 60, 75, 68, 72],
        backgroundColor: 'rgb(20, 184, 166)',
        borderRadius: 6,
      },
      {
        label: 'Fake Profiles',
        data: [25, 20, 30, 22, 28, 24],
        backgroundColor: 'rgb(168, 85, 247)',
        borderRadius: 6,
      },
      {
        label: 'Suspicious',
        data: [10, 10, 10, 3, 4, 4],
        backgroundColor: 'rgb(249, 115, 22)',
        borderRadius: 6,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: 'rgb(156, 163, 175)',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 12,
            family: 'system-ui'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: {
          size: 13,
        },
        bodyFont: {
          size: 12,
        },
        cornerRadius: 4,
        displayColors: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
          drawBorder: false,
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12,
          },
          callback: (value) => `${value}%`,
          stepSize: 20,
        },
        border: {
          dash: [4, 4],
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    barPercentage: 0.7,
    categoryPercentage: 0.8,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative h-[300px] w-full bg-[#1a1a1a] rounded-xl p-6"
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setHoveredChart(true)}
      onHoverEnd={() => setHoveredChart(false)}
    >
      {/* Gradient Background with Animation */}
      <motion.div
        className="absolute inset-0 rounded-xl overflow-hidden"
        animate={hoveredChart ? {
          opacity: [0.3, 0.5, 0.3],
          transition: { duration: 2, repeat: Infinity }
        } : {}}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 via-purple-500/5 to-orange-500/5" />
      </motion.div>

      {/* Title Section */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          animate={hoveredChart ? {
            x: [0, 5, 0],
            transition: { duration: 2, repeat: Infinity }
          } : {}}
        >
          <h3 className="text-lg font-semibold text-white mb-1">Detection Trends</h3>
          <p className="text-sm text-gray-400">Monthly profile analysis breakdown</p>
        </motion.div>
        
        {/* Stats Summary */}
        <div className="flex gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center cursor-pointer"
              whileHover={{ scale: 1.1, y: -5 }}
              onHoverStart={() => setHoveredStat(index)}
              onHoverEnd={() => setHoveredStat(null)}
            >
              <motion.p 
                className="text-sm text-gray-400"
                animate={hoveredStat === index ? {
                  color: '#ffffff',
                  transition: { duration: 0.2 }
                } : {}}
              >
                {stat.label}
              </motion.p>
              <motion.p 
                className="text-lg font-semibold"
                style={{ color: stat.color }}
                animate={hoveredStat === index ? {
                  scale: [1, 1.2, 1],
                  transition: { duration: 0.5 }
                } : {}}
              >
                {stat.value}
              </motion.p>

              {/* Sparkle Effect */}
              <AnimatePresence>
                {hoveredStat === index && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute text-yellow-300 text-sm"
                  >
                    ✨
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chart with Container Animation */}
      <motion.div 
        className="h-[calc(100%-80px)]"
        animate={hoveredChart ? {
          y: [0, -5, 0],
          transition: { duration: 3, repeat: Infinity }
        } : {}}
      >
        <Bar data={data} options={options} />
      </motion.div>
    </motion.div>
  );
} 