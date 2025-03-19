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
import {  Doughnut, Line } from 'react-chartjs-2';
import { PieChart, TrendingUp } from 'lucide-react';

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

const TicketData = {
  labels: ['open', 'In Progress', 'Pending','Resolved','Closed'],
  datasets: [
    {
      data: [45, 30, 15, 5, 5],
      backgroundColor: [
        '#D66B00',
        '#1a2cf0',
        '#FFD700',
        '#008000',
        '#FF0000'

        
      ],
      borderWidth: 0,
    },
  ],
};



const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];


const TicketLineData = {
  labels: months,
  datasets: [
    {
      label: 'Open',
      data: [45, 50, 40, 35, 30, 25], // Decreasing as some tickets are closed
      borderColor: '#D66B00',
      backgroundColor: 'rgba(214, 107, 0, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'In Progress',
      data: [30, 25, 20, 25, 30, 35], // Some tickets move to in-progress over time
      borderColor: '#1a2cf0',
      backgroundColor: 'rgba(26, 44, 240, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Pending',
      data: [15, 10, 8, 12, 10, 5], // Fewer pending tickets over time
      borderColor: '#FFD700',
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Resolved',
      data: [5, 8, 12, 15, 20, 25], // More tickets are resolved
      borderColor: '#008000',
      backgroundColor: 'rgba(0, 128, 0, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'Closed',
      data: [5, 7, 10, 15, 20, 25], // Closed tickets increase
      borderColor: '#FF0000',
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

export  const ChartCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
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

export const TicketCharts = () => {
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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Project Distribution */}
      <ChartCard title="Project Distribution" icon={<PieChart className="w-5 h-5 text-orange-600" />}>
        <div className="h-[300px]">
          <Doughnut 
            data={TicketData} 
            options={{
              ...chartOptions,
              cutout: '60%',
            }} 
          />
        </div>

      </ChartCard>
         {/* Revenue Trend */}
      <ChartCard title="Ticket" icon={<TrendingUp className="w-5 h-5 text-purple-600" />}>
        <div className="h-[300px]">
          <Line 
            data={TicketLineData} 
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
  
    </div>
  );
};