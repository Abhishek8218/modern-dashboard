import { Line } from "react-chartjs-2";
import { ChartCard } from "../ticketChart";
import { TrendingUp } from "lucide-react";











const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const SalesLineData = {
  labels: months,
  datasets: [
    {
      label: 'Sales',
      data: [12000, 16000, 18000, 22000, 24000, 30000], // Example revenue data in dollars
      borderColor: '#8b5cf6',
      backgroundColor: 'rgba(139, 92, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

export const SalesCharts = () => {
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
        
        {/* Monthly Revenue */}
        <ChartCard title="Monthly Sales" icon={<TrendingUp className="w-5 h-5 text-purple-600" />}>
          <div className="h-[300px]">
            <Line 
              data={SalesLineData} 
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
  