'use client'

import ProjectCard from "@/src/components/cards/projectCard"
import FilterPopover from "@/src/components/filter"
import { CreateProjectForm } from "@/src/components/project/createProjectForm"
import { CirclePlus,  FolderUp,  ListFilter, } from "lucide-react"
import { useRouter } from "next/navigation"
import {  useState } from "react"


const projects = [
  {
    name: "Rooftop Solar",
    location: "Mumbai, India",
    budget: 35000,
    status: "In Progress" as const,
    progress: 45,
    startDate: "20-07-2025",
    bgColor: "bg-orange-50",
    progressBarColor: "bg-orange-400",
  },
  {
    name: "Commercial Solar",
    location: "New Delhi, India",
    budget: 85000,
    status: "Completed" as const,
    progress: 100,
    startDate: "01-05-2025",
    bgColor: "bg-blue-50",
    progressBarColor: "bg-blue-400",
  },
  {
    name: "Solar Backup",
    location: "Bangalore, India",
    budget: 50000,
    status: "On Hold" as const,
    progress: 35,
    startDate: "10-06-2025",
    bgColor: "bg-green-50",
    progressBarColor: "bg-green-400",
  },
]

export const ProjectList = () => {
  const router = useRouter()
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)
  return (
    <div className="">
      
      <div className="w-full bg-[#F5F6FF] flex justify-end items-end px-8 gap-2.5 pb-3">

      <button onClick={() => setIsCreateProjectOpen(true)} title="Add New">
          <CirclePlus className="h-6 w-6 text-gray-500 hover:text-gray-600 transition-colors" />
        </button>
        <button title="Export">

<FolderUp className="h-6 w-6 text-gray-500 hover:text-gray-600 transition-colors" />
</button>
  <button 
    onClick={() => setIsFilterOpen(true)}
    className="text-gray-500  hover:text-gray-600 transition-colors"
    title="Filters"
  >
    <ListFilter className="h-6 w-6"  />
  </button>
  <FilterPopover 
    isOpen={isFilterOpen} 
    onClose={() => setIsFilterOpen(false)}
  />


</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4   px-4 text-gray-800">
      {projects.map((project, index) => (
        <ProjectCard key={index} {...project} onClick={()=> {router.push("/project/nkhjhsi3929")}} />
      ))}
    </div>
    {isCreateProjectOpen && (
         <CreateProjectForm 
         isOpen={isCreateProjectOpen}
         onClose={() => setIsCreateProjectOpen(false)}
         onSubmit={(data) => console.log(data)}
       />
      )}
    </div>
 
  )
}

