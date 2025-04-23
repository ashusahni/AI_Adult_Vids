import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import './index.css';

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/subscribe" element={<SubscribePage />} />
              <Route path="/video/:id" element={<VideoPage />} />
              <Route path="/image/:id" element={<ImagePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;