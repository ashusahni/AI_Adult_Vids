import React from 'react';
import { AgeVerification } from './AgeVerification';

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
                <a href="/" className="text-purple-500 font-medium">Home</a>
                <a href="/features" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Features</a>
                <a href="/how-it-works" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">How It Works</a>
                <a href="/pricing" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Pricing</a>
                <a href="/contact" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Contact</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="/signup" 
                className="text-purple-500 border border-purple-500 px-4 py-1 rounded hover:bg-purple-500 hover:text-white transition-all duration-200 font-medium"
              >
                Sign Up
              </a>
              <a 
                href="/login" 
                className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600 transition-colors duration-200 font-medium"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </nav>

      <AgeVerification />
      
      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Address: 1762 example 1233 Road</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call Us: 1233-777</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Email: Pornlabai@contact.com</span>
                </div>
              </div>
            </div>

            {/* Account Column */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Account</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-purple-500 hover:text-purple-400">Home</a></li>
                <li><a href="/features" className="text-gray-300 hover:text-purple-400">Features</a></li>
                <li><a href="/how-it-works" className="text-gray-300 hover:text-purple-400">How it Works</a></li>
                <li><a href="/pricing" className="text-gray-300 hover:text-purple-400">Pricing</a></li>
              </ul>
            </div>

            {/* Useful Links Column */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Useful links</h3>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-300 hover:text-purple-400">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-purple-400">Contact</a></li>
                <li><a href="/hot-deals" className="text-gray-300 hover:text-purple-400">Hot deals</a></li>
                <li><a href="/promotions" className="text-gray-300 hover:text-purple-400">Promotions</a></li>
              </ul>
            </div>

            {/* Help Center Column */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Help Center</h3>
              <ul className="space-y-2">
                <li><a href="/payments" className="text-gray-300 hover:text-purple-400">Payments</a></li>
                <li><a href="/refund" className="text-gray-300 hover:text-purple-400">Refund</a></li>
                <li><a href="/checkout" className="text-gray-300 hover:text-purple-400">Checkout</a></li>
                <li><a href="/qa" className="text-gray-300 hover:text-purple-400">Q&A</a></li>
                <li><a href="/privacy-policy" className="text-gray-300 hover:text-purple-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">&copy; 2025, All rights reserved</p>
              
              {/* Payment Methods */}
              <div className="flex items-center space-x-4 my-4 md:my-0">
                <img src="/visa.png" alt="Visa" className="h-8" />
                <img src="/mastercard.png" alt="Mastercard" className="h-8" />
                <img src="/maestro.png" alt="Maestro" className="h-8" />
                <img src="/amex.png" alt="American Express" className="h-8" />
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4">
                <a href="#" className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </a>
                <a href="#" className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="bg-purple-600 p-2 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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