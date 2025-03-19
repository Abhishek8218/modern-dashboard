'use client'

import { useState } from "react"
import { CirclePlus, FolderUp, ListFilter } from "lucide-react"
import FilterPopover from "@/src/components/filter"
import UserCard from "@/src/components/cards/userCard"
import { CreateUserForm } from "@/src/components/administrator/form"
import { EditUserForm } from "@/src/components/administrator/form/editForm"

// Sample user data
const users = [
  {
    name: "John Doe",
   role: "admin",
    bgColor: "bg-yellow-100",

  },
  {
    name: "Sarah Smith",
   role: "manager",
    totalSpent: 45000,
    bgColor: "bg-green-100",
   
  },
  {
    name: "Michael Johnson",
    role: "manager",
    totalSpent: 32000,
    bgColor: "bg-orange-100",
  
  },
]

export const UserList = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)

  return (
    <div className="">
      <div className="w-full bg-[#F5F6FF] flex justify-end items-end px-8 gap-2.5 pb-4">
        <button onClick={() => setIsCreateUserOpen(true)} title="Add New">
          <CirclePlus 
            className="h-6 w-6 text-gray-500 hover:text-gray-600 transition-colors" 
          />
        </button>

        <button title="Export">

            <FolderUp className="h-6 w-6 text-gray-500 hover:text-gray-600 transition-colors" />
        </button>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="text-gray-500  hover:text-gray-600 transition-colors"
          title="Filters"
        >
          <ListFilter className="h-6 w-6" />
        </button>
        <FilterPopover
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20 px-4">
        {users.map((user, index) => (
          <UserCard key={index} {...user} onEditClick={ ()=> setIsEditUserOpen(true)} />
        ))}
      </div>

      <CreateUserForm 
               isOpen={isCreateUserOpen}
               onClose={() => setIsCreateUserOpen(false)}
               onSubmit={(data) => console.log(data)}
             />
             <EditUserForm
             isOpen={isEditUserOpen}
              onClose={() => setIsEditUserOpen(false)}
              onSubmit={(data) => console.log(data)}

             />
    </div>
  )
}

export default UserList