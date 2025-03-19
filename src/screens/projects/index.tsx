'use client'

import { Tab, Tabs } from '@/src/components/tabs'
import React, { Suspense } from 'react'
import { ProjectList } from './projectList'
import FilterChips from '@/src/components/chipFilter'

export const ProjectsScreen = () => {
  return (
    <div className='mt-[112px]'>
      <Suspense fallback={<div>Loading...</div>}>

 <FilterChips  onFilterChange={(filter)=>{console.log(filter)}}/>  
  </Suspense> 
       <Tabs defaultTab="Ongoing">
        <Tab label="Ongoing">
          <div className="  rounded-md text-gray-800 pt-2 ">
           <ProjectList/>
          </div>
        </Tab>
        <Tab label="Completed">
          <div className=" p-4 rounded-md  text-gray-800">
            <h2 className="text-lg font-semibold mb-2">Analytics Content</h2>
            <p>This is the analytics tab content.</p>
          </div>
        </Tab>
        <Tab label="Cancelled">
          <div className=" p-4 rounded-md  text-gray-800">
            <h2 className="text-lg font-semibold mb-2">Settings Content</h2>
            <p>This is the settings tab content.</p>
          </div>
        </Tab>
      </Tabs>
        </div>
  )
}

