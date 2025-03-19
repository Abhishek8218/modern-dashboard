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
import {  Doughnut } from 'react-chartjs-2';
import { PieChart } from 'lucide-react';

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

export const ProjectCharts = () => {
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

  
    </div>
  );
};