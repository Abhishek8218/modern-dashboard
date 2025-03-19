import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { DynamicInput } from "@/src/components/input"

// Interface for the form data
export interface MeteringData {
  meterNumber?: string;
  meterIssueDate?: string;
  meterReceiptingDate?: string;
  meterSubmitDate?: string;
  meterInstallationDate?: string;
  sealingReceivingDate?: string;
  jirSubmissionDate?: string;
  jirReceivedPerson?: string;
  jirReceivedPersonDate?: string;
  jirReceivedOfficeDate?: string;
  status?: string;
}

// Validation schema
const schema = yup.object().shape({
  meterNumber: yup.string(),
  meterIssueDate: yup.string(),
  meterReceiptingDate: yup.string(),
  meterSubmitDate: yup.string(),
  meterInstallationDate: yup.string(),
  sealingReceivingDate: yup.string(),
  jirSubmissionDate: yup.string(),
  jirReceivedPerson: yup.string(),
  jirReceivedPersonDate: yup.string(),
  jirReceivedOfficeDate: yup.string(),
  status: yup.string()
})

interface IMeteringFormProps {
  onFormSubmit: (data: MeteringData) => void
}

export const MeteringForm: React.FC<IMeteringFormProps> = ({
  onFormSubmit
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<MeteringData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: MeteringData) => {
    console.log(data)
    onFormSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white min-h-screen   mt-28 sm:mt-24  rounded-lg py-6 px-4 space-y-8 mx-auto">
      <h2 className="text-2xl font-medium  text-gray-800 mb-6">Metering Details</h2>

      <div className="space-y-6">
        {/* Meter Information */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Meter Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="meterNumber"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Meter Number"
                  error={errors.meterNumber?.message}
                />
              )}
            />

            <Controller
              name="meterIssueDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Meter Issue Date"
                  type="date"
                  error={errors.meterIssueDate?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Meter Processing Dates */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Meter Processing Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="meterReceiptingDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Meter Receipting Date"
                  type="date"
                  error={errors.meterReceiptingDate?.message}
                />
              )}
            />

            <Controller
              name="meterSubmitDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Meter Submit Date"
                  type="date"
                  error={errors.meterSubmitDate?.message}
                />
              )}
            />

            <Controller
              name="meterInstallationDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Meter Installation Date"
                  type="date"
                  error={errors.meterInstallationDate?.message}
                />
              )}
            />

            <Controller
              name="sealingReceivingDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Sealing Receiving Date"
                  type="date"
                  error={errors.sealingReceivingDate?.message}
                />
              )}
            />
          </div>
        </div>

        {/* JIR Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">JIR Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="jirSubmissionDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="JIR Submission Date"
                  type="date"
                  error={errors.jirSubmissionDate?.message}
                />
              )}
            />

            <Controller
              name="jirReceivedPerson"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="JIR Received Person"
                  error={errors.jirReceivedPerson?.message}
                />
              )}
            />

            <Controller
              name="jirReceivedPersonDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="JIR Received Person Date"
                  type="date"
                  error={errors.jirReceivedPersonDate?.message}
                />
              )}
            />

            <Controller
              name="jirReceivedOfficeDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="JIR Received at Office Date (After SDO Signature)"
                  type="date"
                  error={errors.jirReceivedOfficeDate?.message}
                />
              )}
            />
          </div>
        </div>



         {/* JIR Details */}
         <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Status"
                  type="select"
                  options = {[
                    { value: 'application_submitted', title: 'Application Submitted' },
  { value: 'feasibility_check', title: 'Feasibility Check' },
  { value: 'approval_in_principle', title: 'Approval in Principle' },
  { value: 'installation_started', title: 'Installation Started' },
  { value: 'inspection_testing', title: 'Inspection & Testing' },
  { value: 'net_meter_installed', title: 'Net Meter Installed' },
  { value: 'final_activation', title: 'Final Activation' },
  { value: 'billing_monitoring', title: 'Billing & Monitoring' },
  { value: 'completed', title: 'Completed' },
  { value: 'rejected', title: 'Rejected' },
  { value: 'cancelled', title: 'Cancelled' }
                  ]}


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