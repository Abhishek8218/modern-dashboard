import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { DynamicInput } from "@/src/components/input"

// Interface for the form data
export interface SupportTicketData {
  title: string;
  description: string;
  assignedTo: string;
  priority: string;
}

// Validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  assignedTo: yup.string().required("Assigned to field is required"),
  priority: yup.string().required("Priority is required")
})

// Props interface
interface ISupportFormProps {
  onFormSubmit: (data: SupportTicketData) => void;
  assigneeOptions: Array<{ value: string, title: string }>;
  priorityOptions: Array<{ value: string, title: string }>;
}

export const SupportForm: React.FC<ISupportFormProps> = ({
  onFormSubmit,
  assigneeOptions,
  priorityOptions
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<SupportTicketData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      assignedTo: '',
      priority: 'medium'
    }
  })

  const onSubmit = (data: SupportTicketData) => {
    console.log(data)
    onFormSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white min-h-screen  mt-28 sm:mt-24  shadow-xl  rounded-lg py-6 px-4 space-y-8 mx-auto">
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Support Ticket</h2>

      <div className="space-y-6">
        {/* Ticket Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Ticket Details</h3>
          <div className="grid grid-cols-1 gap-3">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Title"
                  error={errors.title?.message}
                
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    {...field}
                    rows={4}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                    placeholder="Describe the issue in detail..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        {/* Assignment and Priority */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Ticket Assignment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="assignedTo"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Assigned To"
                  type="select"
                  options={assigneeOptions}
                  error={errors.assignedTo?.message}
                />
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Priority"
                  type="select"
                  options={priorityOptions}
                  error={errors.priority?.message}
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