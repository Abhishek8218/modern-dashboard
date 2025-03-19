import { useForm, Controller, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Plus, Trash2 } from 'lucide-react'
import { DynamicInput } from "@/src/components/input"

// Interface for the form data
export interface ServiceEngineerData {
  siteVisitDate?: string;
  installationFeedback?: string;
  panelSerialNumbers?: { serialNumber: string }[];
  inverterSerialNumber?: string;
  geotagPhotoDate?: string;
}

// Validation schema
const schema = yup.object().shape({
  siteVisitDate: yup.string(),
  installationFeedback: yup.string(),
  panelSerialNumbers: yup.array().of(
    yup.object().shape({
      serialNumber: yup.string().required()
    })
  ),
  inverterSerialNumber: yup.string(),
  geotagPhotoDate: yup.string()
})

interface IServiceEngineerFormProps {
  onFormSubmit: (data: ServiceEngineerData) => void
}

export const ServiceEngineerForm: React.FC<IServiceEngineerFormProps> = ({
  onFormSubmit
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<ServiceEngineerData>({
    resolver: yupResolver(schema),
    defaultValues: {
      panelSerialNumbers: [{ serialNumber: '' }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "panelSerialNumbers"
  })

  const onSubmit = (data: ServiceEngineerData) => {
    console.log(data)
    onFormSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl  mt-28 sm:mt-24  rounded-lg py-6 px-4 space-y-8 mx-auto">
      <h2 className="text-2xl font-medium  text-gray-800 mb-6">Service Engineer Report</h2>

      <div className="space-y-6">
        {/* Visit Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Visit Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="siteVisitDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Site Visit Date"
                  type="date"
                  error={errors.siteVisitDate?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Installation Feedback */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Installation Feedback</h3>
          <div className="grid grid-cols-1 gap-3">
            <Controller
              name="installationFeedback"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Feedback for Installation Team
                  </label>
                  <textarea
                    {...field}
                    rows={4}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                    placeholder="Enter your feedback here..."
                  />
                  {errors.installationFeedback && (
                    <p className="text-red-500 text-sm">{errors.installationFeedback.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Panel Serial Numbers */}
        <div>
          <div className="flex justify-start items-center mb-4 gap-x-3">
            <h3 className="text-lg font-medium text-gray-800">Panel Serial Numbers</h3>
            <button
  type="button"
  onClick={() => append({ serialNumber: '' })}
  className="flex items-center justify-center  rounded-full shadow-sm text-sm font-medium text-white border border-green-500 hover:bg-green-500 hover:border-green-500 hover:text-white focus:outline-none transition-colors duration-200"
>
  <Plus className="h-7 w-7 p-1 text-green-500 transition-colors duration-200 hover:text-white" />
</button>

          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4 mb-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-medium text-gray-700">Panel {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <Controller
                  name={`panelSerialNumbers.${index}.serialNumber`}
                  control={control}
                  render={({ field }) => (
                    <DynamicInput
                      {...field}
                      label="Serial Number"
                      error={errors.panelSerialNumbers?.[index]?.serialNumber?.message}
                    />
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Additional Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="inverterSerialNumber"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Inverter Serial Number"
                  error={errors.inverterSerialNumber?.message}
                />
              )}
            />

            <Controller
              name="geotagPhotoDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Geotag Photo Date"
                  type="date"
                  error={errors.geotagPhotoDate?.message}
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