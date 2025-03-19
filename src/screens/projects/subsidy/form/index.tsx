import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { DynamicInput } from "@/src/components/input"

// Interface for the form data
export interface SubsidyData {
  centerSubsidyAppliedDate?: string;
  centerSubsidyReceiveDate?: string;
  centerStatus?: string;
  stateSubsidyAppliedDate?: string;
  stateSubsidyReceiveDate?: string;
  stateStatus?: string;
  finalSubmissionDate?: string;
  finalStatusForSite?: string; // New field
}

// Validation schema
const schema = yup.object().shape({
  centerSubsidyAppliedDate: yup.string(),
  centerSubsidyReceiveDate: yup.string(),
  stateSubsidyAppliedDate: yup.string(),
  stateSubsidyReceiveDate: yup.string(),
  finalSubmissionDate: yup.string(),
  finalStatusForSite: yup.string() // Validation for the new field
})

interface ISubsidyFormProps {
  onFormSubmit: (data: SubsidyData) => void
}

export const SubsidyForm: React.FC<ISubsidyFormProps> = ({
  onFormSubmit
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<SubsidyData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: SubsidyData) => {
    console.log(data)
    onFormSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white min-h-screen  mt-28 sm:mt-24   rounded-lg py-6 px-4 space-y-8 mx-auto">
      <h2 className="text-2xl font-medium  text-gray-800 mb-6">Subsidy Details</h2>

      <div className="space-y-6">
        {/* Center Subsidy */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Center Subsidy Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="centerSubsidyAppliedDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Center Subsidy Applied Date"
                  type="date"
                  error={errors.centerSubsidyAppliedDate?.message}
                />
              )}
            />

            <Controller
              name="centerSubsidyReceiveDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Center Subsidy Receive Date"
                  type="date"
                  error={errors.centerSubsidyReceiveDate?.message}
                />
              )}
            />
               <Controller
              name="centerStatus"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Status"
                  type="select"
                  options = {[
                    { value: 'application_submitted', title: 'Application Submitted' },
                    { value: 'under_review', title: 'Under Review' },
                    { value: 'approval_in_principle', title: 'Approval in Principle' },
                    { value: 'installation_started', title: 'Installation Started' },
                    { value: 'inspection_net_metering', title: 'Inspection & Net Metering' },
                    { value: 'subsidy_disbursed', title: 'Subsidy Disbursed' },
                    { value: 'monitoring_closure', title: 'Monitoring & Closure' },
                    { value: 'rejected', title: 'Rejected' },
                    { value: 'cancelled', title: 'Cancelled' }
                  ]}


                  error={errors.centerStatus?.message}
                />
              )}
            />
          </div>
        </div>

        {/* State Subsidy */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">State Subsidy Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="stateSubsidyAppliedDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="State Subsidy Applied Date"
                  type="date"
                  error={errors.stateStatus?.message}
                />
              )}
            />

            <Controller
              name="stateSubsidyReceiveDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="State Subsidy Receive Date"
                  type="date"
                  error={errors.stateSubsidyReceiveDate?.message}
                />
              )}
            />
             <Controller
              name="stateStatus"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Status"
                  type="select"
                 options = {[
                    { value: 'application_submitted', title: 'Application Submitted' },
                    { value: 'under_review', title: 'Under Review' },
                    { value: 'approval_in_principle', title: 'Approval in Principle' },
                    { value: 'installation_started', title: 'Installation Started' },
                    { value: 'inspection_net_metering', title: 'Inspection & Net Metering' },
                    { value: 'subsidy_disbursed', title: 'Subsidy Disbursed' },
                    { value: 'monitoring_closure', title: 'Monitoring & Closure' },
                    { value: 'rejected', title: 'Rejected' },
                    { value: 'cancelled', title: 'Cancelled' }
                  ]}

                  error={errors.centerSubsidyReceiveDate?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Final Submission */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Final Submission</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="finalSubmissionDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Date of Final Submission"
                  type="date"
                  error={errors.finalSubmissionDate?.message}
                />
              )}
            />
         
            <Controller
              name="finalStatusForSite"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Final Status for Site"
                  type="text"
                  error={errors.finalStatusForSite?.message}
                />
              )}
            />
         
          </div>
        </div>

        {/* Final Status for Site */}
  
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
