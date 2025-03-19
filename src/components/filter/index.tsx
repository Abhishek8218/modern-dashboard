import React, { useState } from 'react';
import { X, ChevronDown, Calendar, Tag } from 'lucide-react';

interface FilterPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({ isOpen, onClose }) => {
  const [expandedSections, setExpandedSections] = useState({
    date: false,
    status: false,
    category: false,
    team: false,
  });

  interface ExpandedSections {
    date: boolean;
    status: boolean;
    category: boolean;
    team: boolean;
  }

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="relative">
      {/* Backdrop */}
      <div 
        className="fixed   transition-opacity z-[100]"
        onClick={onClose}
      />
      
      {/* Popover */}
      <div className="absolute right-[-15px] sm:right-0 top-2 w-80 z-[100]  transform transition-all duration-200 ease-out animate-in fade-in slide-in-from-top-2">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="p-4 space-y-4">
            {/* Date Filter */}
            <div className="space-y-2">
              <button 
                onClick={() => toggleSection('date')}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Date Range</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    expandedSections.date ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.date && (
                <div className="pl-6 space-y-2 animate-in slide-in-from-top-1">
                  <div className="space-y-2">
                    {/* From Date */}
                    <label className="text-sm text-gray-600">From</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
                    />

                    {/* To Date */}
                    <label className="text-sm text-gray-600">To</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-blue-300 focus:ring-1 focus:ring-blue-300 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Status Filter */}
            <div className="space-y-2">
              <button 
                onClick={() => toggleSection('status')}
                className="w-full flex items-center justify-between text-left text-gray-700 hover:text-gray-900"
              >
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span>Status</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    expandedSections.status ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.status && (
                <div className="pl-6 space-y-2 animate-in slide-in-from-top-1">
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm hover:bg-blue-100 transition-colors">
                      Active
                    </button>
                    <button className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-sm hover:bg-gray-100 transition-colors">
                      Pending
                    </button>
                    <button className="px-3 py-1 rounded-full bg-gray-50 text-gray-600 text-sm hover:bg-gray-100 transition-colors">
                      Completed
                    </button>
                  </div>
                </div>
              )}
            </div>

        
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-sm">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopover;
