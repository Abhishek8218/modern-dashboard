// components/DynamicInput.tsx
'use client'

import { useState, useEffect } from 'react'
import { forwardRef, InputHTMLAttributes} from "react"
import { AlertCircle, ChevronDown, Calendar } from 'lucide-react'

interface OptionType {
  value: string | number
  title: string
}

interface DynamicInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  type?: string
  placeholder?: string
  value?: string | number
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement>
  error?: string | undefined
  icon?: React.ReactNode
  options?: OptionType[]
}

export const DynamicInput = forwardRef<HTMLInputElement | HTMLSelectElement, DynamicInputProps>(
  ({ label, type, placeholder, value, onChange, error, icon, options, ...inputProps }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [internalValue, setInternalValue] = useState(value)

    useEffect(() => {
      setInternalValue(value)
    }, [value])

    const handleBlur = () => {
      setIsFocused(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const inputValue = e.target.value
      setInternalValue(inputValue)
      onChange?.(e)
    }

    return (
      <div className="relative w-full">
        <div className={`
          relative transition-all duration-300 
          ${error ? 'mb-6' : 'mb-4'}
        `}>
          <label 
            className={`
              absolute left-3 transition-all duration-300 
              ${isFocused || internalValue
                ? 'text-xs top-[-8px] bg-white z-10 text-gray-600' 
                : 'top-2.5 left-9 text-gray-500'}
              pointer-events-none
              ${!icon && "!left-4"}
              ${(type === 'date' || type === 'select') && "text-xs top-[-8px] z-10 left-[16px] bg-white text--600"}
            `}
          >
            {label}
          </label>
          <div className={`flex items-center relative border rounded-lg ${isFocused ? 'border-blue-500' : 'border-gray-300'}`}>
            {icon && (
              <div className="pl-2 text-gray-500">
                {icon}
              </div>
            )}


            {type === 'select' ? (
              <>
                <select
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ref={ref as any}
                  value={internalValue}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleBlur}
                  className={`
                    w-full py-2 px-3 rounded-lg 
                    bg-transparent outline-none 
                    transition-all duration-300
                    appearance-none
                    ${error 
                      ? 'border-red-500 text-red-600' 
                      : 'border-gray-300 focus:border-blue-500'}
                  `}
                >
                  <option value="">Select {label}</option>
                  {options?.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.title}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
              </>
            ) : type === 'date' ? (
              <>
                <input
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ref={ref as any}
                  {...inputProps}
                  type={type}
                  value={internalValue}
                  placeholder={placeholder}
                  onFocus={() => setIsFocused(true)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className={`
                    w-full py-2 px-3 rounded-lg 
                    bg-transparent outline-none 
                    transition-all duration-300
                    appearance-none
                    ${error 
                      ? 'border-red-500 text-red-600' 
                      : 'border-gray-300 focus:border-blue-500'}
                  `}
                />
                <div className="absolute right-3 pointer-events-none">
                  <Calendar className="h-4 w-4 sm:hidden  text-gray-500" />
                </div>
              </>
            ) : (
              <input
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={ref as any}
                {...inputProps}
                type={type}
                value={internalValue}
                placeholder={placeholder}
                onFocus={() => setIsFocused(true)}
                onBlur={handleBlur}
                onChange={handleChange}
                className={`
                  w-full py-2 px-3 rounded-lg 
                  bg-transparent outline-none 
                  transition-all duration-300
                  ${error 
                    ? 'border-red-500 text-red-600' 
                    : 'border-gray-300 focus:border-blue-500'}
                `}
              />
            )}
          </div>
          {error && (
            <div className="absolute bottom-[-18px] left-0 flex items-center text-red-500 text-xs">
              <AlertCircle className="mr-1 h-4 w-4" />
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }
)

DynamicInput.displayName = 'DynamicInput'