'use client'

import MetaCard from "@/src/components/cards/metaCard"
import FilterPopover from "@/src/components/filter"
import { CirclePlus, FolderUp, ListFilter } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Sample meta data
const metas = [
  {
    type: "meta",
    value: "SEO Description",
    createdAt: "20-01-2024",
    description: "Main website SEO description for better search engine visibility",
    status: "Active" as const,
    bgColor: "bg-yellow-100",
  },
  {
    type: "meta",
    value: "Page Keywords",
    createdAt: "15-01-2024",
    description: "Keywords for product pages optimization",
    status: "Active" as const,
    bgColor: "bg-green-50",
  },
  {
    type: "meta",
    value: "Social Media Tags",
    createdAt: "10-01-2024",
    description: "Meta tags for social media sharing and previews",
    status: "Inactive" as const,
    bgColor: "bg-purple-100",
  },
]

export const MetaList = () => {
  const router = useRouter()
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  return (
    <div className="pt-20">
      <div className="w-full bg-[#F5F6FF] flex justify-end items-end px-8 gap-2.5 pb-3">
        <Link href="/meta/add" >
          <CirclePlus className="h-6 w-6 text-gray-500 hover:text-gray-600 transition-colors" />
        </Link>
        <button>
          <FolderUp className="h-6 w-6 text-gray-500 hover:text-gray-600 transition-colors" />
        </button>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="text-gray-500 hover:text-gray-600 transition-colors"
        >
          <ListFilter className="h-6 w-6" />
        </button>
        <FilterPopover 
          isOpen={isFilterOpen} 
          onClose={() => setIsFilterOpen(false)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 pb-4 text-gray-800">
        {metas.map((meta, index) => (
          <MetaCard 
            key={index} 
            {...meta} 
            onClick={() => {router.push(`/meta/${index}`)}} 
          />
        ))}
      </div>

    </div>
  )
}