'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Define the type for the filter state
interface FilterState {
  projectType: 'domestic' | 'commercial';
  location: 'ground' | 'rooftop';
}

// Define the type for the props
interface FilterChipsProps {
  onFilterChange: (filter: FilterState) => void;
}

// Define the ChipButton props
interface ChipButtonProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ onFilterChange }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters or defaults
  const [projectType, setProjectType] = useState<FilterState['projectType']>(
    (searchParams.get('projectType') as FilterState['projectType']) || 'domestic'
  );
  const [location, setLocation] = useState<FilterState['location']>(
    (searchParams.get('location') as FilterState['location']) || 'ground'
  );

  // Update URL parameters and trigger onFilterChange
  const updateFilters = (newProjectType: FilterState['projectType'], newLocation: FilterState['location']) => {
    const params = new URLSearchParams(searchParams);
    params.set('projectType', newProjectType);
    params.set('location', newLocation);
    
    // Update URL without refresh
    router.push(`${pathname}?${params.toString()}`);
    
    // Notify parent component
    onFilterChange({
      projectType: newProjectType,
      location: newLocation
    });
  };

  // Initialize filters on component mount
  useEffect(() => {
    updateFilters(projectType, location);
  }, []);

  const handleProjectTypeChange = (type: FilterState['projectType']) => {
    setProjectType(type);
    updateFilters(type, location);
  };

  

  const handleLocationChange = (loc: FilterState['location']) => {
    setLocation(loc);
    updateFilters(projectType, loc);
  };

  const ChipButton: React.FC<ChipButtonProps> = ({ label, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded-full mr-2 mb-2 transition-colors ${
        isSelected 
          ? 'bg-green-300 text-white'
          : 'bg-gray-100 border text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col sm:flex-row p-4 pb-3 gap-x-4 ">
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-2">Project Type</h3>
        <div className="flex flex-wrap">
          <ChipButton
            label="Domestic"
            isSelected={projectType === 'domestic'}
            onClick={() => handleProjectTypeChange('domestic')}
          />
          <ChipButton
            label="Commercial"
            isSelected={projectType === 'commercial'}
            onClick={() => handleProjectTypeChange('commercial')}
          />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-2">Location</h3>
        <div className="flex flex-wrap">
          <ChipButton
            label="Ground"
            isSelected={location === 'ground'}
            onClick={() => handleLocationChange('ground')}
          />
          <ChipButton
            label="Rooftop"
            isSelected={location === 'rooftop'}
            onClick={() => handleLocationChange('rooftop')}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterChips;