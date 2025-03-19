'use client'

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Validation schema using Yup
const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  // react-hook-form setup
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log('Form submitted:', data);
    router.push('/project')
  };

  return (
    <div className="max-h-screen bg-white flex items-start sm:items-center pt-32 justify-center p-4">
      <div className="bg-white  sm:border border-gray-300  rounded-lg  w-full max-w-md sm:p-8">
        <div className="flex justify-center mb-2">
          {/* <div className="rounded-lg">
         <img src="/agp-logo.png" alt="logo" className="h-20 w-20" />
          </div> */}
        </div>

        <h2 className="text-2xl font-medium text-center text-gray-900 mb-8">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <div className="relative">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    {...field}
                    className={`w-full px-4 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Email"
                  />
                )}
              />
              <Mail className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="relative">
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    className={`w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Password"
                  />
                )}
              />
              {/* <Lock className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" /> */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div> */}

          <button
            type="submit"
            className="w-full bg-[#3E7845] text-white py-2 rounded-lg hover:bg-[#3e9949] transition-colors"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};


