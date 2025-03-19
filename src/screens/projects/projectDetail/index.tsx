'use client'

import { Tab, Tabs } from '@/src/components/tabs'
import React from 'react'
import { ProjectForm } from '../sales/form'
// import { InstallationForm } from '../installation/form'
// import { ServiceEngineerForm } from '../service-engineer/form'
// import { MeteringForm } from '../metering/form'
// import { SubsidyForm } from '../subsidy/form'
// import { GodownForm } from '../godown/form'
import { SupportForm } from '../support/form'





const assigneeOptions = [
  { value: "john_doe", title: "John Doe" },
  { value: "jane_smith", title: "Jane Smith" },
  { value: "alex_johnson", title: "Alex Johnson" }
];

const priorityOptions = [
  { value: "low", title: "Low" },
  { value: "medium", title: "Medium" },
  { value: "high", title: "High" },
  { value: "critical", title: "Critical" }
];
export const ProjectDetails = () => {
  return (
    <div className=''>
       <Tabs defaultTab="Sales">
        <Tab label="Sales">
          <div className="  rounded-md text-gray-800 ">
            <ProjectForm onFormSubmit={(data) => {console.log("data", data)}}/>
          </div>
        </Tab>
        {/* <Tab label="Installation">
          <div className=" rounded-md  text-gray-800">
            <InstallationForm onFormSubmit={(data) => {console.log('data',data)}}/>
          </div>
        </Tab>
        <Tab label="Service-Engineer">
          <div className=" rounded-md  text-gray-800">
            <ServiceEngineerForm onFormSubmit={() => {}}/>
          </div>
        </Tab>
        <Tab label="Godown">
          <div className=" rounded-md  text-gray-800">
            <GodownForm onFormSubmit={() => {}}/>
          </div>
        </Tab>
        <Tab label="Metering">
          <div className=" rounded-md  text-gray-800">
            <MeteringForm onFormSubmit={() => {}}/>
          </div>
        </Tab>
        <Tab label="Subsidy">
          <div className=" rounded-md  text-gray-800">
            <SubsidyForm onFormSubmit={() => {}}/>
          </div>
        </Tab> */}
        <Tab label="Support">
          <div className=" rounded-md  text-gray-800">
            <SupportForm onFormSubmit={()=> {} }  assigneeOptions={assigneeOptions}
        priorityOptions={priorityOptions}/>
          </div>
        </Tab>
      </Tabs>
        </div>
  )
}

