'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

interface TabProps {
  label: string
  children: React.ReactNode
}

interface TabsProps {
  children: React.ReactElement<TabProps>[]
  defaultTab?: string
}

const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>

const Tabs: React.FC<TabsProps> = ({ children, defaultTab }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>('')
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    } else if (defaultTab) {
      setActiveTab(defaultTab)
      router.push(`?tab=${defaultTab}`)
    } else if (children.length > 0) {
      setActiveTab(children[0].props.label)
      router.push(`?tab=${children[0].props.label}`)
    }
  }, [searchParams, defaultTab, children, router])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    router.push(`?tab=${tab}`)
  }

  const tabContent = children.find(child => child.props.label === activeTab)?.props.children

  return (
    <div className="w-full">
      {isMobile && children.length > 3  ? (
        <div className="relative">
          <select
            value={activeTab}
            onChange={(e) => handleTabChange(e.target.value)}
            className="w-full z-20 fixed top-[63px] sm:top-[65px]  p-3 pr-8 text-gray-600  bg-green-50  shadow-sm focus:outline-none focus:border-transparent appearance-none"
          >
            {children.map((child) => (
              <option key={child.props.label} value={child.props.label}>
                {child.props.label}
              </option>
            ))}
          </select>
          <ChevronDown className="fixed top-[88px] z-[100] right-4  transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
        </div>
      ) : (
        <div className="flex border-b border-t sm:border-t-0 border-gray-200  fixed top-[63px] sm:top-[64px] h-12 w-full bg-white z-50">
          {children.map((child) => (
            <button
              key={child.props.label}
              onClick={() => handleTabChange(child.props.label)}
              className={`px-4 py-2 font-medium text-sm transition-colors duration-200 ${
                activeTab === child.props.label
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {child.props.label}
            </button>
          ))}
        </div>
      )}
      <div className="">{tabContent}</div>
    </div>
  )
}

const TabsWrapper: React.FC<TabsProps> = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tabs {...props} />
    </Suspense>
  )
}

export { TabsWrapper as Tabs, Tab }
