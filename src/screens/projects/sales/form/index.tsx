// components/DashboardForm.tsx

"use client"

import { useForm, Controller, useFieldArray } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

import {Plus, Trash2, } from 'lucide-react'
import { DynamicInput } from "@/src/components/input"
import toast from "react-hot-toast"
// import FileUploader from "@/src/components/fileUploader"



// interfaces/FormData.ts

export interface PaymentDetail {
    sno?: number;
    date?: string;
    paymentType?: string;
    chequeNo?: string;
    amount?: number;
    depositBankDetail?: string;
    remark?: string;
  }
  
  export interface FormData {
    customerName?: string;
    address?: string;
    sanctionedLoad?: number;
    phoneNumber?: string;
    billConnectionNumber?: string;
    billAccountNumber?: string;
    appliedKW?: number;
    structureType?: string;
    needVisit?: string;
    date?: string;
    managerName?: string;
    projectCost?: number;
    paymentMode?: string;
    financingType?:string;
    managerSignatureDate?: string;
    bookingAmount?: number;
    bookingDate?: string;
    paymentDetails?: PaymentDetail[];
    agreementPPAMakeDate?: string;
    agreementPPASignatureDate?: string;
  }
// ... (schema remains the same)
const schema = yup.object().shape({
  customerName: yup.string(),
  address: yup.string(),
  sanctionedLoad: yup.number().positive(),
  phoneNumber: yup.string(),
  billConnectionNumber: yup.string(),
  billAccountNumber: yup.string(),
  appliedKW: yup.number().positive(),
  structureType: yup.string(),
  needVisit: yup.string(),
  date: yup.string(),
  managerName: yup.string(),
  projectCost: yup.number(),
  paymentMode: yup.string(),
  financingType: yup.string(),
  managerSignatureDate: yup.string(),
  bookingAmount: yup.number(),
  bookingDate: yup.string(),
  paymentDetails: yup.array().of(
    yup.object().shape({
      sno: yup.number(),
      date: yup.string(),
      paymentType: yup.string(),
      chequeNo: yup.string().when('paymentType', {
        is: (val: string) => val === 'cheque',
        then: (schema) => schema,
        otherwise: (schema) => schema.notRequired()
      }),
      amount: yup.number().positive(),
      depositBankDetail: yup.string(),
      remark: yup.string()
    })
  ),
  agreementPPAMakeDate: yup.string(),
  agreementPPASignatureDate: yup.string()
})



interface IProjectFormProps {
  onFormSubmit: (data: FormData) => void  
}

export const ProjectForm: React.FC<IProjectFormProps> = ({
onFormSubmit
}) => {
  const { control, handleSubmit, formState: { errors }, watch ,reset} = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
    customerName: '',
    address: '',
    phoneNumber: '',
    billConnectionNumber: '',
    billAccountNumber: '',
    
    structureType: '',
    needVisit: 'No',
    date: '',
    managerName: '',
    
    paymentMode: '',
    financingType:'',
    managerSignatureDate: '',
    
    bookingDate: '',

      paymentDetails: [{ sno: 1, date: '', paymentType: 'cash',  depositBankDetail: '', remark: '' }],
      agreementPPAMakeDate: '',
        agreementPPASignatureDate: ''
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "paymentDetails"
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
   onFormSubmit(data)
   toast.success('Form Data Submitted Successfully')
   reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-xl  rounded-lg  mt-28 sm:mt-24  p-6 space-y-8 mx-auto">
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Project Details</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Customer Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="customerName"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Customer Name"
                  error={errors.customerName?.message}
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
                />
              )}
            />

            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Phone Number"
                  error={errors.phoneNumber?.message}
                />
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Billing and Connection Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="billConnectionNumber"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Bill Connection Number"
                  error={errors.billConnectionNumber?.message}
                />
              )}
            />

            <Controller
              name="billAccountNumber"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Bill Account Number"
                  error={errors.billAccountNumber?.message}
                />
              )}
            />

            <Controller
              name="sanctionedLoad"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Sanctioned Load"
                  type="number"
                  error={errors.sanctionedLoad?.message}
                />
              )}
            />

            <Controller
              name="appliedKW"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Applied KW"
                  type="number"
                  error={errors.appliedKW?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Structure Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Structure Details</h3>
          <div className="space-y-4">
            <Controller
              name="structureType"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Type/Size of Structure"
                  error={errors.structureType?.message}
                />
              )}
            />

            <div className="flex items-center space-x-2">
              <Controller
                name="needVisit"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <input
                    type="checkbox"
                    checked={value === 'Yes'}
                    onChange={(e) => onChange(e.target.checked ? 'Yes' : 'No')}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                )}
              />
              <label className="text-sm text-gray-700">Check if need visit</label>
            </div>
          </div>
        </div>

        {/* Project Management */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Project Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Date"
                  type="date"
                  error={errors.date?.message}
                />
              )}
            />

            <Controller
              name="managerName"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Manager Name"
                  error={errors.managerName?.message}
                />
              )}
            />

            <Controller
              name="projectCost"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Project Cost"
                  type="number"
                  error={errors.projectCost?.message}
                />
              )}
            />

            <Controller
              name="paymentMode"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Payment Mode"
                  error={errors.paymentMode?.message}
                />
              )}
            />
          </div>
        </div>

        {/* Continue with the same pattern for remaining sections */}
        {/* Payment Details section */}
        <div>
          <div className="flex justify-start items-center mb-4 gap-x-3">
            <h3 className="text-lg font-medium text-gray-800">Payment Details</h3>
            <button
              type="button"
              onClick={() => append({ 
                sno: fields.length + 1, 
                date: '', 
                paymentType: 'cash', 
                amount: 0, 
                depositBankDetail: '', 
                remark: '' 
              })}
              className="flex items-center justify-center  rounded-full shadow-sm text-sm font-medium text-white border hover:border-2 border-green-500 hover:bg-green-500 focus:outline-none transition-colors duration-200"
            >
              <Plus className="h-7 w-7 p-1 text-green-500 hover:text-white" />
            </button>
          </div>

          {fields.map((field, index) => (
  <div key={field.id} className="p-4 border rounded-lg space-y-4 mb-4">
    <div className="flex justify-between items-center">
      <h4 className="text-md font-medium text-gray-700">Payment {index + 1}</h4>
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
        name={`paymentDetails.${index}.date`}
        control={control}
        render={({ field }) => (
          <DynamicInput
            {...field}
            label="Date"
            type="date"
            error={errors.paymentDetails?.[index]?.date?.message}
          />
        )}
      />

      <Controller
        name={`paymentDetails.${index}.paymentType`}
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
          <DynamicInput {...field} label="Payment Type" error={errors.paymentDetails?.[index]?.paymentType?.message}/>
          </div>
        )}
      />

      {watch(`paymentDetails.${index}.paymentType`) === 'cheque' && (
        <Controller
          name={`paymentDetails.${index}.chequeNo`}
          control={control}
          render={({ field }) => (
            <DynamicInput
              {...field}
              label="Cheque Number"
              error={errors.paymentDetails?.[index]?.chequeNo?.message}
            />
          )}
        />
      )}

      <Controller
        name={`paymentDetails.${index}.amount`}
        control={control}
        render={({ field }) => (
          <DynamicInput
            {...field}
            label="Amount"
            type="number"
            error={errors.paymentDetails?.[index]?.amount?.message}
          />
        )}
      />

      <Controller
        name={`paymentDetails.${index}.depositBankDetail`}
        control={control}
        render={({ field }) => (
          <DynamicInput
            {...field}
            label="Deposit Bank Detail"
            error={errors.paymentDetails?.[index]?.depositBankDetail?.message}
          />
        )}
      />

      <Controller
        name={`paymentDetails.${index}.remark`}
        control={control}
        render={({ field }) => (
          <DynamicInput
            {...field}
            label="Remark"
            error={errors.paymentDetails?.[index]?.remark?.message}
          />
        )}
      />
    </div>
  </div>
))}
        </div>

        {/* Agreement Details */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Agreement Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="agreementPPAMakeDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Agreement & PPA Make Date"
                  type="date"
                  error={errors.agreementPPAMakeDate?.message}
                />
              )}
            />

            <Controller
              name="agreementPPASignatureDate"
              control={control}
              render={({ field }) => (
                <DynamicInput
                  {...field}
                  label="Agreement & PPA Signature Date"
                  type="date"
                  error={errors.agreementPPASignatureDate?.message}
                />
              )}
            />
          </div>
        </div>
      </div>

      {/* <FileUploader id="aadhar" acceptedFileTypes={[]} onUploadSuccess={() => {}}/> */}

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