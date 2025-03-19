import { Tab, Tabs } from '@/src/components/tabs'
import React from 'react'
import UserList from './userList'


export const UsersScreen = () => {
  return (
    <div className='mt-[112px]'>
       
       <Tabs defaultTab="Active">
        <Tab label="Active">
          <div className="  rounded-md text-gray-800 pt-2 ">
           <UserList/>
          </div>
        </Tab>
        <Tab label="Inactive">
          <div className=" p-4 rounded-md  text-gray-800">
            <h2 className="text-lg font-semibold mb-2">Analytics Content</h2>
            <p>This is the analytics tab content.</p>
          </div>
        </Tab>
        {/* <Tab label="Cancelled">
          <div className=" p-4 rounded-md  text-gray-800">
            <h2 className="text-lg font-semibold mb-2">Settings Content</h2>
            <p>This is the settings tab content.</p>
          </div>
        </Tab> */}
      </Tabs>
        </div>
  )
}

