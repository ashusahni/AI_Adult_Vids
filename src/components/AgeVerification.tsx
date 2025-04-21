import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export const AgeVerification: React.FC = () => {
  const { authState, verifyAge } = useAuth();
  const { isAgeVerified } = authState;
  const [isOpen, setIsOpen] = useState(!isAgeVerified);

  const handleVerify = () => {
    verifyAge();
    setIsOpen(false);
  };

  const handleReject = () => {
    window.location.href = 'https://www.google.com'; // Redirect away from site
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="absolute inset-0 bg-black bg-opacity-80 backdrop-blur-sm"></div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-md z-10 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Age Verification</h2>
        
        <p className="text-gray-300 mb-6">
          This site contains AI-generated visual content that requires viewers to be 18 years or older.
          Are you at least 18 years old?
        </p>
        
        <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
          <Button
            variant="primary"
            onClick={handleVerify}
            className="w-full sm:w-auto"
          >
            Yes, I am 18 or older
          </Button>
          
          <Button
            variant="outline"
            onClick={handleReject}
            className="w-full sm:w-auto text-gray-300 border-gray-700 hover:bg-gray-800"
          >
            No, I am under 18
          </Button>
        </div>
      </div>
    </div>
  );
};