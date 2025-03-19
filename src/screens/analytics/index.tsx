'use client'
import { AnalyticsCard } from "@/src/components/cards/analyticsCard";
import { ProjectCharts } from "@/src/components/charts/projectCharts";
import { SalesCharts } from "@/src/components/charts/salesChart";
import { TicketCharts } from "@/src/components/charts/ticketChart";
import AnalyticsFilter from "@/src/components/filter/analyticsFilter";
import {
  Clock,
  Package,
  IndianRupee,
  Check,
  Ticket,
  ListFilter,
} from "lucide-react";
import React, { ReactNode, useState } from "react";

// Types
interface AnalyticsData {
  title: string;
  value: string;
  percentageChange: number;
  icon: ReactNode;
  bgColor: string;
  iconBgColor: string;
}

const salesAnalyticsData: AnalyticsData[] = [
  {
    title: "Total Sales",
    value: "₹1,204,500",
    percentageChange: 18.5,
    icon: <IndianRupee />,
    bgColor: "bg-green-100",
    iconBgColor: "bg-green-200",
  },
];

// Sample Data for Solar Project Dashboard
const ProjectsAnalyticsData: AnalyticsData[] = [
  {
    title: "Total Active Projects",
    value: "120",
    percentageChange: 6.2,
    icon: <Package />,
    bgColor: "bg-blue-100",
    iconBgColor: "bg-blue-200",
  },
  {
    title: "Total Completed Projects",
    value: "120",
    percentageChange: 6.2,
    icon: <Check />,
    bgColor: "bg-blue-100",
    iconBgColor: "bg-blue-200",
  },
  {
    title: "Total Pending Projects",
    value: "15",
    percentageChange: -10.2,
    icon: <Clock />,
    bgColor: "bg-yellow-100",
    iconBgColor: "bg-yellow-200",
  },
];

const TicketData: AnalyticsData[] = [
  {
    title: "Opened",
    value: "3,204",
    percentageChange: 4.8,
    icon: <Ticket />,
    bgColor: "bg-purple-100",
    iconBgColor: "bg-purple-200",
  },
  {
    title: "Assigned",
    value: "3,204",
    percentageChange: 4.8,
    icon: <Ticket />,
    bgColor: "bg-purple-100",
    iconBgColor: "bg-purple-200",
  },
  {
    title: "In Progress",
    value: "3,204",
    percentageChange: 4.8,
    icon: <Ticket />,
    bgColor: "bg-purple-100",
    iconBgColor: "bg-purple-200",
  },
  {
    title: "Pending",
    value: "3,204",
    percentageChange: 4.8,
    icon: <Ticket />,
    bgColor: "bg-purple-100",
    iconBgColor: "bg-purple-200",
  },
  {
    title: "Resolved",
    value: "3,204",
    percentageChange: 4.8,
    icon: <Ticket />,
    bgColor: "bg-purple-100",
    iconBgColor: "bg-purple-200",
  },
];

export const AnalyticsScreen = () => {
  const [openFilterId, setOpenFilterId] = useState<string | null>(null);

  const toggleFilter = (id: string) => {
    if (openFilterId === id) {
      setOpenFilterId(null); // Close the filter if it's already open
    } else {
      setOpenFilterId(id); // Open the new filter
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-4">
      <div className="pt-16 flex flex-col gap-y-10">
        <div>
          <div className="flex justify-between items-center pr-4">
            <h2 className="text-2xl font-semibold text-gray-800 px-4 py-3">
              Sales
            </h2>
            <button
              onClick={() => toggleFilter('sales')}
              className="text-gray-500 hover:text-gray-600 transition-colors"
            >
              <ListFilter className="h-6 w-6" />
            </button>
          </div>
          <AnalyticsFilter
            isOpen={openFilterId === 'sales'}
            onClose={() => setOpenFilterId(null)}
            id="sales"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 text-gray-800">
            {salesAnalyticsData.map((data, index) => (
              <AnalyticsCard key={index} {...data} />
            ))}
          </div>
          <SalesCharts />
        </div>

        <div>
          <div className="flex justify-between items-center pr-4">
            <h2 className="text-2xl font-semibold text-gray-800 px-4 py-3">
              Projects
            </h2>
            <button
              onClick={() => toggleFilter('project')}
              className="text-gray-500 hover:text-gray-600 transition-colors"
            >
              <ListFilter className="h-6 w-6" />
            </button>
          </div>
          <AnalyticsFilter
            isOpen={openFilterId === 'project'}
            onClose={() => setOpenFilterId(null)}
            id="project"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 text-gray-800">
            {ProjectsAnalyticsData.map((data, index) => (
              <AnalyticsCard key={index} {...data} />
            ))}
          </div>
          <ProjectCharts />
        </div>

        <div>
          <div className="flex justify-between items-center pr-4">
            <h2 className="text-2xl font-semibold text-gray-800 px-4 py-3">
              Ticket
            </h2>
            <button
              onClick={() => toggleFilter('ticket')}
              className="text-gray-500 hover:text-gray-600 transition-colors"
            >
              <ListFilter className="h-6 w-6" />
            </button>
          </div>
          <AnalyticsFilter
            isOpen={openFilterId === 'ticket'}
            onClose={() => setOpenFilterId(null)}
            id="ticket"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 text-gray-800">
            {TicketData.map((data, index) => (
              <AnalyticsCard key={index} {...data} />
            ))}
          </div>
          <TicketCharts />
        </div>
      </div>
    </div>
  );
};
