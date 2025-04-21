import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Braces, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { authState, logout } = useAuth();
  const { isAuthenticated, user, isSubscribed } = authState;

  return (
    <nav className="bg-black/95 border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Braces className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-white text-xl font-bold tracking-wider">PornLabAI</span>
            </div>
            
            <div className="hidden md:flex items-center ml-12 space-x-8">
              <a href="/" className="text-purple-500 font-medium">Home</a>
              <a href="/features" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Features</a>
              <a href="/how-it-works" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">How It Works</a>
              <a href="/pricing" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Pricing</a>
              <a href="/contact" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Contact</a>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {isSubscribed ? (
                  <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full">PRO</span>
                ) : (
                  <Button 
                    variant="primary" 
                    size="sm" 
                    onClick={() => navigate('/subscribe')}
                  >
                    Upgrade to Pro
                  </Button>
                )}
                
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-800 rounded-full p-1">
                    <User className="h-6 w-6 text-gray-300" />
                  </div>
                  <span className="text-gray-300 text-sm hidden md:block">
                    {user?.email || 'User'}
                  </span>
                </div>
                
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-purple-500 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => navigate('/signup')}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};