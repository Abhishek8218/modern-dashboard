import { useForm, Controller, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Plus, Trash2 } from 'lucide-react'
import { DynamicInput } from "@/src/components/input"
import toast from "react-hot-toast"

// Interface for the form data
export interface MaterialDetail {
  materialName?: string;
  materialType?: string;
  quantity?: number;
  unit?: string;
  remarks?: string;
}

export interface GodownData {
  materials?: MaterialDetail[];
}

// Validation schema
const schema = yup.object().shape({
  materials: yup.array().of(
    yup.object().shape({
      materialName: yup.string(),
      materialType: yup.string(),
      quantity: yup.number(),
      unit: yup.string(),
      remarks: yup.string()
    })
  )
})

interface IGodownFormProps {
  onFormSubmit: (data: GodownData) => void
}

export const GodownForm: React.FC<IGodownFormProps> = ({
  onFormSubmit
}) => {
  const { control, handleSubmit, formState: { errors },reset } = useForm<GodownData>({
    resolver: yupResolver(schema),
    defaultValues: {
      materials: [{ 
        materialName: '',
        materialType: '',
        remarks: ''
      }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materials"
  })

  const onSubmit = (data: GodownData) => {
    console.log(data)
    onFormSubmit(data)
    toast.success('Form Data Submitted Successfully')
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white min-h-screen shadow-xl mt-28 sm:mt-24 rounded-lg py-6 px-4 space-y-8 mx-auto">
      <h2 className="text-2xl font-medium  text-gray-800 mb-6">Godown Material Details</h2>

      <div className="space-y-6">
        {/* Material List */}
        <div>
          <div className="flex justify-start items-center mb-4 gap-x-3">
            <h3 className="text-lg font-medium text-gray-800">Pending Materials</h3>
            <button
              type="button"
              onClick={() => append({ 
                materialName: '',
                materialType: '',
                quantity: 0,
                unit: '',
                
                remarks: ''
              })}
              className="flex items-center justify-center rounded-full shadow-sm text-sm font-medium text-white border hover:border-2 border-green-500 hover:bg-green-500 focus:outline-none transition-colors duration-200"
            >
              <Plus className="h-7 w-7 p-1 text-green-500 hover:text-white" />
            </button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-lg space-y-4 mb-4">
              <div className="flex justify-between items-center">
                <h4 className="text-md font-medium text-gray-700">Material {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name={`materials.${index}.materialName`}
                  control={control}
                  render={({ field }) => (
                    <DynamicInput
                      {...field}
                      label="Material Name"
                      error={errors.materials?.[index]?.materialName?.message}
                    />
                  )}
                />

                <Controller
                  name={`materials.${index}.materialType`}
                  control={control}
                  render={({ field }) => (
                    <DynamicInput
                      {...field}
                      label="Material Type"
                      error={errors.materials?.[index]?.materialType?.message}
                    />
                  )}
                />

                <Controller
                  name={`materials.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <DynamicInput
                      {...field}
                      label="Quantity"
                      type="number"
                      error={errors.materials?.[index]?.quantity?.message}
                    />
                  )}
                />

                <Controller
                  name={`materials.${index}.unit`}
                  control={control}
                  render={({ field }) => (
                    <DynamicInput
                      {...field}
                      label="Unit"
                      error={errors.materials?.[index]?.unit?.message}
                    />
                  )}
                />


             
                <Controller
                  name={`materials.${index}.remarks`}
                  control={control}
                  render={({ field }) => (
                    <DynamicInput
                      {...field}
                      label="Remarks"
                      error={errors.materials?.[index]?.remarks?.message}
                    />
                  )}
                />
              </div>
            </div>
          ))}
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