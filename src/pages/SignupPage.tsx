import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setIsLoading(true);
      await signup(formData.email, formData.password);
      navigate('/'); // Redirect to home page after successful signup
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Image Section */}
      <div className="flex w-full lg:w-1/2 relative">
        <img 
          src="/img/sign/IMG-20250422-WA0001.jpg"
          alt="Sign Up Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-300">
            Get access to premium AI-powered content creation tools and join thousands of satisfied users.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-purple-900 to-black p-8 lg:p-24 flex items-center">
        <div className="w-full max-w-md mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
            <p className="text-gray-400">Join us to start creating amazing content with AI</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-purple-900 to-black text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center py-2 px-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
              <FcGoogle className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center py-2 px-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
              <FaFacebook className="w-5 h-5 text-blue-500" />
            </button>
            <button className="flex items-center justify-center py-2 px-4 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
              <FaTwitter className="w-5 h-5 text-blue-400" />
            </button>
          </div>

          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-500 hover:text-purple-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;