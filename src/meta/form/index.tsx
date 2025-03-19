"use client";

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { DynamicInput } from "@/src/components/input"

// Interface for the form data
export interface MetaData {
  type: string;
  value: string;
  description: string;
  status: string;
}

// Validation schema
const schema = yup.object().shape({
  type: yup.string().required("Type is required"),
  value: yup.string().required("Value is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required")
})

interface IMetaFormProps {
  onFormSubmit: (data: MetaData) => void
}

export const MetaForm: React.FC<IMetaFormProps> = ({
  onFormSubmit
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<MetaData>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'meta' // Setting default value for type
    }
  })

  const onSubmit = (data: MetaData) => {
    console.log(data)
    onFormSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white min-h-screen font-serif rounded-lg py-6 px-4 space-y-8 mx-auto">
      <h2 className="text-2xl font-medium font-serif text-gray-800 mb-6">Meta Information</h2>

      <div className="space-y-6">
        {/* Meta Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Meta Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <DynamicInput
                label="Type"
                type="select"
                {...field}
                options={[
                    { value: "meta", title: "Meta" },
                    { value: "other", title: "Other" },
                    ]}
                />
                // <div className="flex flex-col">
                //   <label className="block text-sm font-medium text-gray-700 mb-1">
                //     Type
                //   </label>
                //   <select
                //     {...field}
                //     className="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                //   >
                //     <option value="meta">Meta</option>
                //   </select>
                //   {errors.type && (
                //     <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
                //   )}
                // </div>
              )}
            />
<div className="">
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Value"
                  type="text"
                
                  error={errors.value?.message}
                />

              )}
            />
            </div>
          </div>
        </div>

        {/* Description and Status */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Description"
                  type="text"
                  error={errors.description?.message}
                />
              )}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Status"
                  type="text"
                  error={errors.status?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className=" flex justify-center sm:justify-end">
        <button
          type="submit"
          className="py-2 max-sm:w-full  px-6 border border-transparent rounded-md shadow-sm text-md sm:text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
        >
          Save Details
        </button>
      </div>
    </form>
  )
}