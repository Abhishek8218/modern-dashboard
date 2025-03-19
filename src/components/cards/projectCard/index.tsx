"use client"

import { MapPin, IndianRupee, Calendar } from "lucide-react"

interface ProjectCardProps {
  name: string
  location: string
  startDate: string
  budget: number
  status: "In Progress" | "Completed" | "On Hold" | "Cancelled"
  progress: number
  bgColor?: string
  progressBarColor?: string,
  onClick?: () => void
}

export default function ProjectCard({
  name,
  location,
  startDate,
  budget,
  status,
  progress,
  onClick
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Completed":
        return "bg-green-100 text-green-700"
      case "On Hold":
        return "bg-yellow-100 text-yellow-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div onClick={onClick} className={`rounded-md p-3 bg-white relative shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all hover:cursor-pointer duration-500 ease-in-out `}>
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-semibold">
            {name[0]}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 max-w-fit text-wrap">{name}</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 gap-y-1">
              <div className="flex items-center text-gray-600 text-sm text-nowrap">
                <MapPin className="h-4 w-4 mr-1" />
                {location}
              </div>
              <div className="flex items-center text-gray-600 text-sm text-nowrap">
                <Calendar className="h-4 w-4 mr-1" />
                {startDate}
              </div>
            </div>
          </div>
        </div>
        {/* <button className="hover:bg-black/5 p-2 rounded-full transition-colors">
          <MoreVertical className="h-5 w-5 text-gray-600" />
        </button> */}
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <IndianRupee className="h-4 w-4 text-gray-600" />
          <span className="font-semibold">{budget.toLocaleString()}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>{status}</span>
      </div>

      <div className="space-y-2  pb-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full  bg-black/5 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gray-600 transition-all duration-500 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}