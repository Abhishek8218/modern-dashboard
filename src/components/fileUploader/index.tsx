import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Upload, File, X } from 'lucide-react'
import Image from 'next/image'

interface FileUploaderProps {
  disabled?: boolean
  acceptedFileTypes: string[]
  showPreview?: boolean
  onUploadSuccess: (key: string) => void
  maxSizeInBytes?: number
  dimension?: { width: number; height: number }
  id: string
}

export const FileUploader = ({
  disabled = false,
  acceptedFileTypes,
  showPreview = true,
  dimension,
  maxSizeInBytes = 5 * 1024 * 1024,
  id,
}: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const [isUploaded, setIsUploaded] = useState<boolean>(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [updatedFileName, setUpdatedFileName] = useState<string>("")

  const checkImageDimensions = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = document.createElement('img') as HTMLImageElement
      img.onload = () => {
        if (dimension) {
          resolve(img.width === dimension.width && img.height === dimension.height)
        } else {
          resolve(true)
        }
      }
      img.src = URL.createObjectURL(file)
    })
  }
console.log('updatedFileName', updatedFileName)
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null
    await processFile(selectedFile)
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const selectedFile = event.dataTransfer.files[0]
    await processFile(selectedFile)
  }

  const processFile = async (selectedFile: File | null) => {
    if (selectedFile) {
      if (selectedFile.size > maxSizeInBytes) {
        setUploadError(`File size exceeds the limit of ${maxSizeInBytes / 1024 / 1024} MB`)
        return
      }

      if (dimension && selectedFile.type.startsWith('image/')) {
        const dimensionsMatch = await checkImageDimensions(selectedFile)
        if (!dimensionsMatch) {
          setUploadError(`Image dimensions must be exactly ${dimension.width}x${dimension.height} pixels`)
          return
        }
      }

      setFile(selectedFile)
      const fileExtension = selectedFile.name.split('.').pop()
      const fileNameWithoutExtension = selectedFile.name.replace(/\s+/g, '-').split('.').slice(0, -1).join('.')
      const uniqueFileName = `${fileNameWithoutExtension}-${Date.now()}.${fileExtension}`
      setUpdatedFileName(uniqueFileName)

      setIsUploaded(false)
      setUploadError(null)

      if (showPreview) {
        const reader = new FileReader()
        reader.onload = (e) => setPreview(e.target?.result as string)
        reader.readAsDataURL(selectedFile)
      } else {
        setPreview(null)
      }
    }
  }

//   const fileUploadMutation = useMutation({
//     mutationFn: FileUpload,
//     onSuccess: (data) => {
//       removeFile()
//       setIsUploading(false)
//       if (data.data.url) {
//         onUploadSuccess(data.data.url)
//       } else {
//         setUploadError('Failed to upload file. URL is undefined.')
//       }
//       setUploadProgress(100)
//       setIsUploaded(true)
//     },
//     onError: (error) => {
//       setUploadError('Failed to upload file. Please try again.')
//       setUploadProgress(0)
//       setIsUploaded(false)
//     }
//   })

  const uploadFile = async () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    setUploadError(null)
    // fileUploadMutation.mutateAsync(file)
  }

  const removeFile = () => {
    setFile(null)
    setPreview(null)
    setUploadProgress(0)
    setUploadError(null)
    setIsUploaded(false)
  }

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div
        className={`relative transition-all duration-300 ease-in-out 
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          border-2 border-dashed rounded-lg p-6 shadow-sm hover:border-blue-400 hover:shadow-md`}
        onDragOver={(e) => {
          e.preventDefault()
          if (!disabled) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          disabled={isUploading || disabled}
          accept={acceptedFileTypes.join(',')}
          onChange={handleFileChange}
          className="hidden"
          id={`file-input-${id}`}
        />
        <label
          htmlFor={`file-input-${id}`}
          className={`block text-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          {file ? (
            <div className="space-y-4">
              <div className="relative mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                {isUploaded ? (
                  <CheckCircle className="w-12 h-12 text-green-500 transition-all duration-300" />
                ) : (
                  <File className="w-12 h-12 text-blue-500 transition-all duration-300" />
                )}
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium text-gray-800 line-clamp-1">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <Upload className="w-12 h-12 text-blue-500" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-800">
                  Drag & drop or click to upload
                </p>
                <p className="text-sm text-gray-500">
                  Accepted types: {acceptedFileTypes.join(', ')}
                </p>
                <p className="text-sm text-gray-500">
                  Max size: {(maxSizeInBytes / 1024 / 1024).toFixed(2)} MB
                  {dimension ? ` • ${dimension.width}x${dimension.height} px` : ''}
                </p>
              </div>
            </div>
          )}
        </label>

        {showPreview && preview && (
          <div className="mt-6 relative">
            <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-lg">
              <Image
                src={preview}
                alt="File preview"
                fill
                className="object-cover"
              />
              <button
                onClick={removeFile}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        )}

        {file && !isUploaded && (
          <div className="mt-6 flex justify-center space-x-3">
            <button
              onClick={uploadFile}
              disabled={isUploading || isUploaded}
              className="px-6 py-2 bg-blue-500 text-white rounded-full font-medium 
                shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 
                focus:ring-blue-500 focus:ring-opacity-50 
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>
            <button
              onClick={removeFile}
              disabled={isUploading}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium 
                shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 
                focus:ring-gray-500 focus:ring-opacity-50 
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
            <div
              className="bg-blue-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {uploadError && (
        <div className="mt-4 flex items-center text-red-500 bg-red-50 p-3 rounded-lg transition-all duration-300">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
          <p className="text-sm font-medium">{uploadError}</p>
        </div>
      )}
    </div>
  )
}

export default FileUploader