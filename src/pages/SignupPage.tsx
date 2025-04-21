import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const SignupPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
          alt="AI Technology"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-900 to-black p-8 lg:p-24 flex items-center">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create Your Free PronLab AI Account</h1>
            <p className="text-gray-400">Improve your pronunciation with real-time AI feedback and personalized practice.</p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter Your Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
              />
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
              If you have already Account?{' '}
              <Link to="/login" className="text-purple-500 hover:text-purple-400">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};