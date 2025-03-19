"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AlignLeft,  Search } from "lucide-react";
import Sidebar from "../sidebar";

interface LayoutProps {
  children: React.ReactNode;
  disabledRoutes?: string[];
  hiddenHeaderRoutes?: string[];
}

const Layout: React.FC<LayoutProps> = ({
  children,
  disabledRoutes = [],
  hiddenHeaderRoutes = [],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Toggle mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Function to detect dynamic routes (with brackets like [id], [slug])
  const isDynamicRoute = (route: string) => /\/\[[^/]+?\](\/|$)/.test(route);

  const isSidebarDisabled =
    isDynamicRoute(pathname) || disabledRoutes.includes(pathname);
  const isSearchBarDisabled = hiddenHeaderRoutes.includes(pathname);

  // Render layout for disabled routes (no sidebar and header)
  if (isSidebarDisabled) {
    return <div className="min-h-screen">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />
      <div
        className={`flex-1 flex flex-col overflow-hidden ${
          mobileMenuOpen ? "md:overflow-auto" : ""
        }`}
      >
        {/* Header Section */}
        {(
          <header className="bg-white border-b z-20 fixed w-full">
            <div className="max-w-7xl mr-auto min-h-[63px] px-4 flex justify-between items-center">
              <button
                className="md:hidden py-2 pr-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 "
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">
                  {mobileMenuOpen ? "Close menu" : "Open menu"}
                </span>
                {mobileMenuOpen ? (
                ""
                ) : (
                  <AlignLeft className="h-7 w-7" aria-hidden="true" />
                )}
              </button>

              {/* Search Input */}
              <div className="relative w-full max-w-xl">
                <input
                  placeholder="Search..."
                  className="input border focus:border-2 focus:border-gray-300 w-full px-5 py-1.5 sm:py-2 rounded-xl transition-all outline-none"
                  name="search"
                  type="search"
                  disabled={isSearchBarDisabled}
                />
                <Search className="size-5 absolute top-2 sm:top-3 right-3 text-gray-400" />
              </div>
            </div>
          </header>
        )}

        {/* Main Content Section */}
        <main
          className={`flex-1 overflow-x-hidden bg-[#F5F6FF] transition-all duration-300 ease-in-out
          ${
            mobileMenuOpen
              ? "md:overflow-y-auto overflow-y-hidden blur-sm sm:blur-none"
              : "overflow-y-auto"
          }`}
        >
          <div className="max-w-full ">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
