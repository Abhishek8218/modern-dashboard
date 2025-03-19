import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { DynamicInput } from "@/src/components/input"

// Interface for the form data
export interface InstallationData {
  panelType?: string;
  expectedInstallationDate?: string;
  structureDeliveryDate?: string;
  pendingMaterialState?: string;
  wireDetails: {
    acWire?: number;
    dcWire?: number;
    earthingWire?: number;
  };
  transportationRounds?: number;
  extraMaterial?: string;
  panelDeliveryDate?: string;
  installationDate?: string;
  inverterDeliveryDate?: string;
  inverterInstallationDate?: string;
  installationTeamName?: string;
  verifiedBy?: string;
}

// Validation schema
const schema = yup.object().shape({
  panelType: yup.string(),
  expectedInstallationDate: yup.string(),
  structureDeliveryDate: yup.string(),
  pendingMaterialState: yup.string(),
  wireDetails: yup.object().shape({
    acWire: yup.number(),
    dcWire: yup.number(),
    earthingWire: yup.number()
  }),
  transportationRounds: yup.number(),
  extraMaterial: yup.string(),
  panelDeliveryDate: yup.string(),
  installationDate: yup.string(),
  inverterDeliveryDate: yup.string(),
  inverterInstallationDate: yup.string(),
  installationTeamName: yup.string(),
  verifiedBy: yup.string()
})

interface IInstallationFormProps {
  onFormSubmit: (data: InstallationData) => void
}

export const InstallationForm: React.FC<IInstallationFormProps> = ({
  onFormSubmit
}) => {
  const { control, handleSubmit, formState: { errors },reset } = useForm<InstallationData>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: InstallationData) => {
    //   toast.success('Form Data Submitted Successfully')
    console.log(data)
    onFormSubmit(data)
   reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl  mt-28 sm:mt-24  rounded-lg py-6 px-4 space-y-8 mx-auto">
      <h2 className="text-2xl font-medium  text-gray-800 mb-6">Installation Details</h2>

      <div className="space-y-6">
        {/* Panel and Installation Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Panel Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="panelType"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Panel Type"
                  error={errors.panelType?.message}
                />
              )}
            />

            <Controller
              name="expectedInstallationDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Expected Installation Date"
                  type="date"
                  error={errors.expectedInstallationDate?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Delivery Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Delivery Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="structureDeliveryDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Structure Delivery Date"
                  type="date"
                  error={errors.structureDeliveryDate?.message}
                />
              )}
            />

            <Controller
              name="pendingMaterialState"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Pending Material State"
                  error={errors.pendingMaterialState?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Wire Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Wire Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Controller
              name="wireDetails.acWire"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="AC Wire (in mtr)"
                  type="number"
                  error={errors.wireDetails?.acWire?.message}
                />
              )}
            />

            <Controller
              name="wireDetails.dcWire"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="DC Wire (in mtr)"
                  type="number"
                  error={errors.wireDetails?.dcWire?.message}
                />
              )}
            />

            <Controller
              name="wireDetails.earthingWire"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Earthing Wire (in mtr)"
                  type="number"
                  error={errors.wireDetails?.earthingWire?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="transportationRounds"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Transportation Rounds"
                  type="number"
                  error={errors.transportationRounds?.message}
                />
              )}
            />

            <Controller
              name="extraMaterial"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Extra Material"
                  error={errors.extraMaterial?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Installation Dates */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Installation Timeline</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="panelDeliveryDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Panel Delivery Date"
                  type="date"
                  error={errors.panelDeliveryDate?.message}
                />
              )}
            />

            <Controller
              name="installationDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Installation Date"
                  type="date"
                  error={errors.installationDate?.message}
                />
              )}
            />

            <Controller
              name="inverterDeliveryDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Inverter Delivery Date"
                  type="date"
                  error={errors.inverterDeliveryDate?.message}
                />
              )}
            />

            <Controller
              name="inverterInstallationDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Inverter Installation Date"
                  type="date"
                  error={errors.inverterInstallationDate?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Verification Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Verification Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name="installationTeamName"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Installation Team Name"
                  error={errors.installationTeamName?.message}
                />
              )}
            />

            <Controller
              name="verifiedBy"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Verified By"
                  error={errors.verifiedBy?.message}
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