import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-black/95 border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <img 
                  src="/logo.jpg"
                  alt="Company Logo"
                  className="h-12 w-12 object-contain"
                />
                <span className="ml-3 text-2xl font-bold text-white tracking-wider">PornLabAi</span>
              </div>
              <div className="hidden md:flex items-center ml-12 space-x-8">
                <Link to="/" className="text-purple-500 font-medium">Home</Link>
                <Link to="/features" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Features</Link>
                <Link to="/how-it-works" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">How It Works</Link>
                <Link to="/pricing" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Pricing</Link>
                <Link to="/contact" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Contact Us</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/signup" 
                className="text-purple-500 border border-purple-500 px-4 py-1 rounded hover:bg-purple-500 hover:text-white transition-all duration-200 font-medium"
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 transition-colors duration-200 font-medium"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info Column */}
            <div className="space-y-4">
              <div className="flex items-center">
                <img 
                  src="/logo.jpg"
                  alt="PornLabAI Logo"
                  className="h-12 w-12 object-contain"
                />
                <span className="ml-3 text-xl font-bold text-white">PornLabAI</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-300">
                  <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email: Pornlabai@contact.com</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-purple-400">Home</Link></li>
                <li><Link to="/how-it-works" className="text-gray-300 hover:text-purple-400">How it Works</Link></li>
                <li><Link to="/pricing" className="text-gray-300 hover:text-purple-400">Pricing</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-300 hover:text-purple-400">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Payment Methods</h3>
              <div className="flex items-center space-x-4">
                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="Visa" className="h-8" />
                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png" alt="Mastercard" className="h-8" />
                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/maestro.png" alt="Maestro" className="h-8" />
                <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/amex.png" alt="American Express" className="h-8" />
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">&copy; 2025, All rights reserved</p>
              
              {/* Social Media Icons */}
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </a>
                <a href="#" className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}; 