'use client'

import React, { ReactNode } from 'react';

// Types
interface AnalyticsData {
  title: string;
  value: string;
  percentageChange: number;
  icon: ReactNode;
  bgColor: string;
  iconBgColor: string;
}

// Analytics Card Component
export const AnalyticsCard = ({
  title,
  value,
//   percentageChange,
  icon: Icon,
}: AnalyticsData) => {
//   const isPositive = percentageChange > 0;

  return (
    <div
      className={`rounded-2xl p-6 bg-white shadow-lg transition-transform transform hover:scale-105`}
      style={{ minHeight: '140px' }} // Ensure it has a nice height for mobile
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full bg-gray-100`}>
            {Icon}
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-700 ">{title}</h3>
            <p className="text-3xl font-bold mt-1">{value}</p>
          </div>
        </div>
        {/* <div
          className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}
        >
          <span className="text-lg font-medium">
            {isPositive ? '+' : ''}
            {percentageChange}%
          </span>
          <svg
            className={`w-5 h-5 ml-1 ${!isPositive ? 'rotate-180' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 15l7-7 7 7" />
          </svg>
        </div> */}
      </div>
    </div>
  );
};
