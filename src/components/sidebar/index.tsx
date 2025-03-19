"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, BarChart2, User, LogOut, PencilRuler } from "lucide-react"

interface SidebarProps {
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const pathname = usePathname()

  const menuItems = [
    { name: "Projects", icon: Home, href: "/project" },
    { name: "Analytics", icon: BarChart2, href: "/analytics" },
    { name: "Administrator", icon: User, href: "/administrator" },
    { name: "Meta", icon: PencilRuler, href: "/meta" }
  ]

  const closeMobileMenu = () => {
    setMobileOpen(false)
  }

  return (
    <>
      {/* Mobile menu backdrop */}
      <div
        className={`fixed inset-0 transition-opacity ease-linear duration-300 md:hidden ${
          mobileOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobileMenu}
      />

      {/* Sidebar component */}
      <div
        className={`fixed z-50 inset-y-0 left-0 flex flex-col w-[80%] sm:w-72 bg-white border-r transition-transform ease-in-out duration-300 transform md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:h-screen`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="text-xl font-semibold text-gray-800">Hi, Abhishek</div>
        </div>

        <nav className="flex-1 flex flex-col px-2 py-4 bg-white overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={closeMobileMenu}
                >
                  <item.icon
                    className={`mr-4 flex-shrink-0 h-6 w-6 ${isActive ? "text-gray-500" : "text-gray-400"}`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Spacer to push the logout button to the bottom */}
          <div className="mt-auto pt-4 border-t">
            <button
              className="flex items-center w-full px-2 py-2 text-base font-medium rounded-md text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors"
              onClick={() => {
                // Perform your logout logic here
                console.log("Logging out...")
              }}
            >
              <LogOut className="mr-4 flex-shrink-0 h-6 w-6 text-red-400" aria-hidden="true" />
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Sidebar
