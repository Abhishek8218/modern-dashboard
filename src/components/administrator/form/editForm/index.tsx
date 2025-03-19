'use client'

import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Building2, MapPin, User, Mail } from 'lucide-react'
import { DynamicInput } from '@/src/components/input'


// Validation Schema
const projectSchema = yup.object({
  userName: yup.string().required('Project name is required'),
  address: yup.string().required('Address is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  role: yup.string().required('Role is required')
})

interface ProjectFormInputs {
  userName: string
  address: string
  email: string
  role: string
}

interface CreateProjectFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ProjectFormInputs) => void
}

export const EditUserForm = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}: CreateProjectFormProps) => {

  const { 
    handleSubmit, 
    formState: { errors },
    control,
  } = useForm<ProjectFormInputs>({
    resolver: yupResolver(projectSchema)
  })

  const submitHandler: SubmitHandler<ProjectFormInputs> = (data) => {
    onSubmit(data)
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
          Edit User
        </h2>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <Controller 
            name="userName"
            control={control}
            render={({ field }) => (
              <DynamicInput 
                label="user Name"
                error={errors.userName?.message}
                icon={<Building2 className="h-5 w-5" />}
                {...field}
              />
            )}
          />

          <Controller 
            name="address"
            control={control}
            render={({ field }) => (
              <DynamicInput 
                label="Address"
                error={errors.address?.message}
                icon={<MapPin className="h-5 w-5" />}
                {...field}
              />
            )}
          />

          <Controller 
            name="email"
            control={control}
            render={({ field }) => (
              <DynamicInput 
                label="Email"
                error={errors.email?.message}
                icon={<Mail className="h-5 w-5" />}
                {...field}
              />
            )}
          />

          <Controller 
            name="role"
            control={control}
            render={({ field }) => (
                <DynamicInput 
                label="Role"
                type='select'
                options={
                  [
                    {
                      value: 'Admin',
                      title: 'Admin'
                    },
                    {
                      value: 'Sales Person',
                      title: 'Sales Person'
                    },
                    {
                      value: 'Installer',
                      title: 'Installer'
                    },
                    {
                      value:"Service Engineer",
                      title:"Service Engineer"
                    }
                  ]
                }
                error={errors.role?.message}
                icon={<User className="h-5 w-5" />}
                {...field}
              />
            )}
          />

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
            
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
