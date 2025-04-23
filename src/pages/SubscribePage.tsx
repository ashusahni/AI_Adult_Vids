import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export const SubscribePage: React.FC = () => {
  const navigate = useNavigate();
  const { authState, subscribe } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const features = [
    'Unlimited access to premium AI-generated content',
    'Early access to new releases',
    'No ads or interruptions',
    'Download videos for offline viewing',
    'Access to exclusive AI generation tools',
  ];

  const handleSubscribe = async () => {
    try {
      setIsProcessing(true);
      setError('');
      
      // In a real app, this would integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate payment processing
      
      await subscribe();
      navigate('/');
    } catch (err) {
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!authState.isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-black/95 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Upgrade to AI Vision Pro</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock premium AI-generated content and exclusive features
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-800">
          <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Pro Membership</h2>
                <p className="text-purple-200 mt-1">Full access to all premium content</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <span className="text-white text-3xl font-bold">$14.99</span>
                <span className="text-purple-200 ml-1">/month</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 sm:p-10">
            <h3 className="text-lg font-medium text-white mb-6">What's included:</h3>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <Check className="h-6 w-6 text-purple-500" />
                  </div>
                  <span className="ml-3 text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            
            {error && (
              <div className="bg-red-900/50 text-red-200 p-4 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <Button
              onClick={handleSubscribe}
              fullWidth
              isLoading={isProcessing}
              className="bg-purple-600 hover:bg-purple-700 py-3 text-lg"
            >
              Subscribe Now
            </Button>
            
            <p className="text-gray-400 text-sm mt-4 text-center">
              Cancel anytime. No long-term commitment required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePage;