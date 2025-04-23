import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Navigation */}
      <nav className="bg-black/95 backdrop-blur-sm border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/logo.jpg"
                  alt="Company Logo"
                  className="h-10 w-10 object-contain rounded-lg"
                />
                <span className="ml-3 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">PornLabAi</span>
              </Link>
              <div className="hidden md:flex items-center ml-12 space-x-8">
                <Link to="/" className="text-purple-500 font-medium hover:text-purple-400 transition-colors duration-200">Home</Link>
                <Link to="/features" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Features</Link>
                <Link to="/how-it-works" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">How It Works</Link>
                <Link to="/pricing" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Pricing</Link>
                <Link to="/contact" className="text-gray-300 hover:text-purple-500 transition-colors duration-200 font-medium">Contact Us</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                to="/signup" 
                className="text-purple-500 border-2 border-purple-500/50 px-5 py-2 rounded-lg hover:bg-purple-500 hover:text-white transition-all duration-200 font-medium transform hover:scale-105"
              >
                Sign Up
              </Link>
              <Link 
                to="/login" 
                className="bg-purple-500 text-white px-5 py-2 rounded-lg hover:bg-purple-600 transition-all duration-200 font-medium shadow-lg shadow-purple-500/25 transform hover:scale-105"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black/80 backdrop-blur-sm border-t border-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-6">
              <Link to="/" className="flex items-center">
                <img 
                  src="/logo.jpg"
                  alt="PornLabAI Logo"
                  className="h-10 w-10 object-contain rounded-lg"
                />
                <span className="ml-3 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">PornLabAI</span>
              </Link>
              <p className="text-gray-400 leading-relaxed">
                Transform your content with cutting-edge AI technology. Create stunning visuals and explore creative possibilities.
              </p>
              <div className="flex items-center text-gray-300">
                <svg className="h-5 w-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@pornlabai.com</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li><Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Home</Link></li>
                <li><Link to="/features" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Features</Link></li>
                <li><Link to="/how-it-works" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">How it Works</Link></li>
                <li><Link to="/pricing" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Pricing</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Legal</h3>
              <ul className="space-y-4">
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Terms of Service</Link></li>
                <li><Link to="/dmca" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">DMCA</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors duration-200">Contact Us</Link></li>
              </ul>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Payment Methods</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-center">
                  <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/visa.png" alt="Visa" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-center">
                  <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/mastercard.png" alt="Mastercard" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-center">
                  <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/maestro.png" alt="Maestro" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                </div>
                <div className="bg-gray-800/50 rounded-lg p-4 flex items-center justify-center">
                  <img src="https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/amex.png" alt="American Express" className="h-8 opacity-75 hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-400">&copy; 2025 PornLabAI. All rights reserved.</p>
              
              {/* Social Media */}
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800/50 p-2 rounded-lg hover:bg-purple-500/20 transition-colors group">
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800/50 p-2 rounded-lg hover:bg-purple-500/20 transition-colors group">
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800/50 p-2 rounded-lg hover:bg-purple-500/20 transition-colors group">
                  <svg className="h-5 w-5 text-gray-400 group-hover:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
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