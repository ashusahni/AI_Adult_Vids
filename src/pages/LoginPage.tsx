import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState(process.env.NODE_ENV === 'development' ? 'pornlabai@gmail.com' : '');
  const [password, setPassword] = useState(process.env.NODE_ENV === 'development' ? 'pornlabai' : '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Function to quickly set admin credentials for testing
  const setAdminCredentials = () => {
    setEmail('pornlabai@gmail.com');
    setPassword('pornlabai');
  };

  // Google login handler
  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
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
            <h1 className="text-3xl font-bold text-white mb-2">Login to PornLab AI</h1>
            <p className="text-gray-400">Welcome back! Continue your content creation journey.</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-70"
            >
              {loading ? 'Logging in...' : 'Continue'}
            </button>

            {/* Dev Mode: Quick Admin Login */}
            {process.env.NODE_ENV === 'development' && (
              <button
                type="button"
                onClick={setAdminCredentials}
                className="w-full bg-gray-700 text-white py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors text-sm"
              >
                Set Admin Credentials
              </button>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-gray-500">
                <span className="px-2 bg-gradient-to-br from-purple-900 to-black">or</span>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors disabled:opacity-70"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>

              <button 
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors"
              >
                <FaFacebook className="w-5 h-5 text-blue-500" />
                Continue with Facebook
              </button>

              <button 
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800 transition-colors"
              >
                <FaTwitter className="w-5 h-5 text-blue-400" />
                Continue with Twitter
              </button>
            </div>

            <p className="text-center text-gray-400">
              Don't have an account?{' '}
              <Link to="/signup" className="text-purple-500 hover:text-purple-400">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;