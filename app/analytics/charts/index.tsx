// DashboardCharts.tsx
'use client'

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line,  Doughnut } from 'react-chartjs-2';
import { TrendingUp, Calendar, PieChart } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const revenueData = {
  labels: months,
  datasets: [
    {
      label: 'Revenue',
      data: [65000, 78000, 92000, 85000, 105000, 115000],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Revenue',
      data: [65000, 7000, 9000, 8000, 105000, 115000],
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

// const energyData = {
//   labels: months,
//   datasets: [
//     {
//       label: 'Energy Generation (GWh)',
//       data: [2.8, 3.2, 3.5, 3.1, 3.8, 4.2],
//       backgroundColor: '#10b981',
//       borderRadius: 8,
//     },
//   ],
// };

const projectDistributionData = {
  labels: ['Domestic', 'Commercial'],
  datasets: [
    {
      data: [45, 30],
      backgroundColor: [
        '#D66B00',
        '#1a2cf0',
        
      ],
      borderWidth: 0,
    },
  ],
};


const panelTypeData = {
  labels: ['Ground', 'Rooftop'],
  datasets: [
    {
      data: [45, 30],
      backgroundColor: [
        '#93c750',
        '#3f9bd9',
        
      ],
      borderWidth: 0,
    },
  ],
};

const ChartCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl p-4 shadow-lg">
    <div className="flex items-center gap-2 mb-4">
      <div className="p-2 rounded-lg bg-purple-100">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    </div>
    {children}
  </div>
);

export const DashboardCharts = () => {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Project Distribution */}
      <ChartCard title="Project Distribution" icon={<PieChart className="w-5 h-5 text-orange-600" />}>
        <div className="h-[300px]">
          <Doughnut 
            data={projectDistributionData} 
            options={{
              ...chartOptions,
              cutout: '60%',
            }} 
          />
        </div>

      </ChartCard>
        {/* Project Distribution */}
        <ChartCard title="Panel Distribution" icon={<PieChart className="w-5 h-5 text-orange-600" />}>
        <div className="h-[300px]">
          <Doughnut 
            data={panelTypeData} 
            options={{
              ...chartOptions,
              cutout: '60%',
            }} 
          />
        </div>
      </ChartCard>

      {/* Revenue Trend */}
      <ChartCard title="Revenue Trend" icon={<TrendingUp className="w-5 h-5 text-purple-600" />}>
        <div className="h-[300px]">
          <Line 
            data={revenueData} 
            options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: true,
                   
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }} 
          />
        </div>
      </ChartCard>

      {/* Energy Generation */}
      {/* <ChartCard title="Energy Generation" icon={<Battery className="w-5 h-5 text-green-600" />}>
        <div className="h-[300px]">
          <Bar 
            data={energyData} 
            options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    display: true,
                    // drawBorder: false,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }} 
          />
        </div>
      </ChartCard> */}

      {/* Monthly Performance */}
      <ChartCard title="Monthly Performance" icon={<Calendar className="w-5 h-5 text-blue-600" />}>
        <div className="h-[300px]">
          <Line 
            data={{
              labels: months,
              datasets: [{
                label: 'Performance',
                data: [88, 92, 95, 89, 96, 94],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
              }],
            }} 
            options={{
              ...chartOptions,
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100,
                  grid: {
                    display: true,
                    // drawBorder: false,
                  },
                },
                x: {
                  grid: {
                    display: false,
                  },
                },
              },
            }} 
          />
        </div>
      </ChartCard>
    </div>
  );
};