import React from 'react';
import { Wand2, MessageSquare, Image, Download, Sparkles, User, CreditCard, Film, Star, Heart } from 'lucide-react';

const steps = [
  {
    title: 'Sign Up for an Account',
    description: 'Create your free account in seconds. All you need is an email address to get started exploring our platform.',
    icon: User,
  },
  {
    title: 'Browse Our Content Library',
    description: 'Explore our extensive collection of AI-generated adult content. Browse by category, style, or popularity to find exactly what you\'re looking for.',
    icon: Film,
  },
  {
    title: 'Choose Your Subscription Plan',
    description: 'Select the subscription tier that best fits your needs. We offer Basic, Premium, and VIP plans with increasing levels of access and quality.',
    icon: CreditCard,
  },
  {
    title: 'Enjoy Premium Adult Content',
    description: 'Gain instant access to our growing library of AI-generated videos and images. New content is added weekly to keep your experience fresh and exciting.',
    icon: Star,
  },
  {
    title: 'Discover Personalized Recommendations',
    description: 'Our AI learns your preferences over time, suggesting content tailored to your tastes. The more you watch, the better your recommendations will become.',
    icon: Heart,
  },
  {
    title: 'Access Across All Devices',
    description: 'Enjoy our content on any device with a web browser. Our responsive platform works seamlessly on desktop, tablet, and mobile devices.',
    icon: Download,
  },
];

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">How It Works</h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Experience the future of adult entertainment with our AI-generated content. Getting started is simple and straightforward.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col md:flex-row items-start gap-6 bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="bg-purple-500/20 rounded-lg p-3">
                      <Icon className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-purple-500 font-bold">Step {index + 1}</span>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subscription Benefits */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Subscription Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6 md:col-span-1 xl:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Premium Content Access</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Unlimited streaming of all videos
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    High-definition and 4K resolution options
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Weekly content updates
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Exclusive subscriber-only content
                  </li>
                </ul>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6 md:col-span-1 xl:col-span-2">
                <h3 className="text-xl font-semibold mb-4">Enhanced Experience</h3>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    No advertisements or interruptions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Personalized content recommendations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Favorites and watch later collections
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    Complete privacy and security
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">How is the content created?</h3>
                <p className="text-gray-400">
                  Our content is generated using advanced AI models specifically trained to create realistic adult imagery and videos. We use state-of-the-art techniques to ensure high quality and realism.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">How often is new content added?</h3>
                <p className="text-gray-400">
                  We add new content weekly, including both videos and images. Premium and VIP subscribers get early access to new releases before they're available to other tiers.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-gray-400">
                  Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period, and you won't be charged again.
                </p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-2">Is my payment information secure?</h3>
                <p className="text-gray-400">
                  Absolutely. We use industry-standard encryption and secure payment processors. Your billing statement will show a discreet company name for privacy.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-gray-400 mb-8 max-w-4xl mx-auto">
              Join thousands of satisfied members already enjoying our exclusive AI-generated adult content.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition-colors duration-200"
              >
                Sign Up Now
              </a>
              <a
                href="/features"
                className="px-8 py-3 border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white rounded-md transition-colors duration-200"
              >
                View All Features
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage; 
