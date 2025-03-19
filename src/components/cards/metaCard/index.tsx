"use client"

import { Tag, FileText, Calendar } from "lucide-react"

interface MetaCardProps {
  type: string
  value: string
  createdAt: string
  description: string
  status: "Active" | "Inactive" | "Pending" | "Archived"
  bgColor?: string
  onClick?: () => void
}

export default function MetaCard({
  type,
  value,
  createdAt,
  description,
  status,
  onClick
}: MetaCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700"
      case "Inactive":
        return "bg-red-100 text-red-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Archived":
        return "bg-gray-100 text-gray-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div 
      onClick={onClick} 
      className={`rounded-md p-3 bg-white relative shadow-sm hover:shadow-lg hover:scale-[1.03] transition-all hover:cursor-pointer duration-500 ease-in-out`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center text-lg font-semibold">
            <Tag className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 max-w-fit text-wrap">{value}</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 gap-y-1">
              <div className="flex items-center text-gray-600 text-sm text-nowrap">
                <FileText className="h-4 w-4 mr-1" />
                {type}
              </div>
              <div className="flex items-center text-gray-600 text-sm text-nowrap">
                <Calendar className="h-4 w-4 mr-1" />
                {createdAt}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      </div>

      <div className="flex justify-end">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>
    </div>
  )
}