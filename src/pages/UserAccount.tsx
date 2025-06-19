import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const UserAccount: React.FC = () => {
  const { authState } = useAuth();
  const { user, isAuthenticated } = authState;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-8">My Account</h1>
          
          <div className="space-y-6">
            <div className="border-b border-gray-700 pb-6">
              <h2 className="text-xl font-semibold text-purple-500 mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Email</label>
                  <p className="mt-1 text-lg text-white">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Account Status</label>
                  <p className="mt-1 text-lg text-white">
                    {user?.isSubscribed ? 'Premium Member' : 'Free Member'}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Member Since</label>
                  <p className="mt-1 text-lg text-white">
                    {new Date().toLocaleDateString()} {/* You can replace this with actual join date if available */}
                  </p>
                </div>
              </div>
            </div>

            {!user?.isSubscribed && (
              <div className="border-b border-gray-700 pb-6">
                <h2 className="text-xl font-semibold text-purple-500 mb-4">Subscription</h2>
                <p className="text-gray-300 mb-4">Upgrade to Premium to access exclusive content!</p>
                <button 
                  className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
                  onClick={() => {/* Add subscription handling */}}
                >
                  Upgrade to Premium! 
                </button>
              </div>
            )}

            <div>
              <h2 className="text-xl font-semibold text-purple-500 mb-4">Account Settings</h2>
              <div className="space-y-4">
                <button 
                  className="w-full bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => {/* Add password change handling */}}
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccount; 
