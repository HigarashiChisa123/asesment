'use client'

import React from 'react';
import { Eye, TrendingUp, Award } from 'lucide-react';

const StatsBanner = () => {
  const stats = [
    {
      icon: Eye,
      title: "Views Today",
      value: "3.4K",
      progress: 75,
      color: "from-yellow-300 to-orange-400"
    },
    {
      icon: TrendingUp,
      title: "Trending Rank",
      value: "#12",
      change: "+3 spots",
      timeFrame: "this week"
    },
    {
      icon: Award,
      title: "Awards",
      value: "Best Seller",
      description: "Education Category • 2023"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 rounded-2xl p-6 mb-8 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full -mr-36 -mt-36"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32"></div>
      
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, progress, change, timeFrame, description, color }) => (
  <div className="bg-white/15 backdrop-blur-sm rounded-xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
    <div className="flex items-center gap-3 mb-3">
      <Icon className="w-6 h-6" />
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
    
    <p className="text-3xl font-bold mb-1">{value}</p>
    
    {progress !== undefined && (
      <div className="w-full bg-white/30 rounded-full h-2">
        <div 
          className={`bg-gradient-to-r ${color} h-2 rounded-full`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    )}
    
    {change && timeFrame && (
      <div className="flex items-center gap-1 text-sm">
        <span className="text-green-300">{change}</span>
        <span className="text-white/80">{timeFrame}</span>
      </div>
    )}
    
    {description && (
      <p className="text-sm text-blue-100">{description}</p>
    )}
  </div>
);

export default StatsBanner;