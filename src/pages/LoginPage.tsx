import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="/img/sign/IMG-20250422-WA0014.jpg"
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-gray-300">
            Continue your journey with our AI-powered content creation tools.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-900 to-black p-8 lg:p-24 flex items-center">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Login to PronLab AI</h1>
            <p className="text-gray-400">Welcome back! Continue your pronunciation journey.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/forgot-password" className="text-purple-500 hover:text-purple-400">
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Continue
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-gray-500">
                <span className="px-2 bg-gradient-to-br from-purple-900 to-black">or</span>
              </div>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors">
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>
              
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors">
                <FaFacebook className="w-5 h-5 text-blue-500" />
                Continue with Facebook
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors">
                <FaTwitter className="w-5 h-5 text-blue-400" />
                Continue with Twitter
              </button>
            </div>

            <p className="text-center text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-500 hover:text-purple-400">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;