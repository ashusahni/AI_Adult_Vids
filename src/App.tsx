import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import { checkAndSeedDatabase } from './firebase/seed';
import './index.css';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import Users from './components/admin/Users';
import ContentManagement from './components/admin/ContentManagement';
import SubscriptionPlans from './components/admin/SubscriptionPlans';
import Payments from './components/admin/Payments';
import Analytics from './components/admin/Analytics';

const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const SubscribePage = lazy(() => import('./pages/SubscribePage'));
const VideoPage = lazy(() => import('./pages/VideoPage'));
const ImagePage = lazy(() => import('./pages/ImagePage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const UserAccount = lazy(() => import('./pages/UserAccount'));

function App() {
  const [ageVerified, setAgeVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setAgeVerified(true);
    }

    // Check and seed the database if needed
    const initializeDatabase = async () => {
      try {
        await checkAndSeedDatabase();
      } catch (error) {
        console.error('Error initializing database:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeDatabase();
  }, []);

  const handleAgeVerification = () => {
    localStorage.setItem('ageVerified', 'true');
    setAgeVerified(true);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <Layout>
          {!ageVerified && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-bold mb-4 text-white">Age Verification</h2>
                <p className="mb-6 text-gray-300">You must be 18 years or older to enter this site.</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={handleAgeVerification}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200"
                  >
                    I am 18 or older
                  </button>
                  <button
                    onClick={() => {
                      alert('You are not eligible to access this website.');
                      window.location.href = 'https://www.google.com';
                    }}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
                  >
                    I am not 18
                  </button>
                </div>
              </div>
            </div>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/subscribe" element={<SubscribePage />} />
              <Route path="/video" element={<VideoPage />} />
              <Route path="/video/:id" element={<VideoPage />} />
              <Route path="/image/:id" element={<ImagePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="content" element={<ContentManagement />} />
                <Route path="subscriptions" element={<SubscriptionPlans />} />
                <Route path="payments" element={<Payments />} />
                <Route path="analytics" element={<Analytics />} />
              </Route>
              <Route path="/account" element={<UserAccount />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;