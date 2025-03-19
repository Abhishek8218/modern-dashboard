'use client'

import { useState } from 'react'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MapPin, Building2, AlertTriangle } from 'lucide-react'
import { DynamicInput } from '../../input'


// Validation Schema
const projectSchema = yup.object({
  projectName: yup.string(),
  address: yup.string()
})

interface ProjectFormInputs {
  projectName?: string
  address?: string
}

interface CreateProjectFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProjectFormInputs & { location?: { lat: number; lng: number }}) => void
}

export const CreateProjectForm = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}: CreateProjectFormProps) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  const { 
    handleSubmit, 
    formState: { errors }, 
    control 
  } = useForm<ProjectFormInputs>({
    resolver: yupResolver(projectSchema)
  })

  const handleGetLocation = () => {
    // Reset previous states
    setLocation(null)
    setLocationError(null)
    setIsLocating(true)

    // Check if geolocation is supported
    if (!("geolocation" in navigator)) {
      setLocationError("Geolocation is not supported by your browser")
      setIsLocating(false)
      return
    }

    // Request location with improved error handling
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setIsLocating(false)
      },
      (error) => {
        setIsLocating(false)
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location access denied. Please enable location permissions.")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setLocationError("Location request timed out.")
            break
          default:
            setLocationError("An unknown error occurred while getting location.")
        }
      },
      {
        // Improved accuracy options
        enableHighAccuracy: true,
        timeout: 10000,  // 10 seconds
        maximumAge: 0    // Don't use cached location
      }
    )
  }

  const submitHandler: SubmitHandler<ProjectFormInputs> = (data) => {
    // Include location if available
    const submissionData = location 
      ? { ...data, location } 
      : data
    onSubmit(submissionData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center 
      animate-fade-in px-4"
    >
      <div 
        className="bg-white w-96 p-6 px-4 rounded-2xl shadow-2xl 
        transform transition-all duration-300 scale-100 
        animate-slide-up"
      >
        <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">
          Create New Project
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <Controller
            name="projectName"
            control={control}
            render={({ field }) => (
              <DynamicInput 
                {...field}
                label="Project Name"
                error={errors.projectName?.message}
                icon={<Building2 className="h-5 w-5" />}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <DynamicInput 
                {...field}
                label="Address"
                error={errors.address?.message}
                icon={<MapPin className="h-5 w-5" />}
              />
            )}
          />

          {!location && (
            <button 
              type="button"
              onClick={handleGetLocation}
              disabled={isLocating}
              className={`
                w-full py-2 rounded-lg flex items-center justify-center gap-2 
                transition-colors
                ${isLocating 
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
            >
              <MapPin className="h-5 w-5" />
              {isLocating ? 'Locating...' : 'Get Location'}
            </button>
          )}

          {locationError && (
            <div className="flex items-center text-red-500 text-sm">
              <AlertTriangle className="mr-2 h-5 w-5" />
              {locationError}
            </div>
          )}

          {location && (
            <div className="text-sm flex flex-col text-gray-600 text-center items-center justify-center bg-green-50 p-2 rounded-lg">
              <div className='flex flex-col items-start'>
                <p className="font-semibold text-green-600">Location Captured</p>
                <p className='max-w-fit text-start'>Latitude: {location.lat.toFixed(4)}</p>
                <p className='max-w-fit'>Longitude: {location.lng.toFixed(4)}</p>
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <button 
              type="button"
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg 
              hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg 
              flex items-center justify-center gap-2 
              hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
