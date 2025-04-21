import React from 'react';
import { pricingPlans } from '../data/sampleContent';
import { Check } from 'lucide-react';

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-b from-purple-900/20 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Choose the perfect plan for your needs
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-gray-900/50 rounded-lg p-8 ${
                plan.isPopular ? 'ring-2 ring-purple-500' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex justify-center items-baseline mb-4">
                  <span className="text-5xl font-extrabold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">/{plan.interval}</span>
                </div>
                <button
                  className={`w-full py-3 px-6 rounded-lg mb-8 ${
                    plan.isPopular
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white'
                  } transition-colors duration-200`}
                >
                  Get Started
                </button>
              </div>
              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-purple-500 mr-3" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-black/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Can I change plans later?
              </h3>
              <p className="text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-black/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-400">
                We accept all major credit cards, PayPal, and cryptocurrency payments.
              </p>
            </div>
            <div className="bg-black/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Is there a free trial?
              </h3>
              <p className="text-gray-400">
                Yes, all plans come with a 7-day free trial. No credit card required.
              </p>
            </div>
            <div className="bg-black/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-400">
                Yes, you can cancel your subscription at any time with no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 