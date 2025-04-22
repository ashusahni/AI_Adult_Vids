import React from 'react';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Basic',
    price: '$9.99',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      'Access to basic content',
      'Standard quality downloads',
      'Basic support',
      'Limited storage',
    ],
    buttonText: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19.99',
    period: '/month',
    description: 'Best for professionals',
    features: [
      'Access to all content',
      'High quality downloads',
      'Priority support',
      '1TB storage',
      'Advanced analytics',
    ],
    buttonText: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '$49.99',
    period: '/month',
    description: 'For large organizations',
    features: [
      'Unlimited access',
      'Highest quality downloads',
      '24/7 support',
      'Unlimited storage',
      'Custom integrations',
      'Dedicated account manager',
    ],
    buttonText: 'Contact Sales',
    popular: false,
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-400 text-lg">Choose the perfect plan for your needs</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-lg p-8 ${
                  plan.popular
                    ? 'bg-purple-900/20 border-2 border-purple-500'
                    : 'bg-gray-900/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-purple-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 rounded-lg font-medium ${
                    plan.popular
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Can I change plans later?</h3>
              <p className="text-gray-400">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">What payment methods do you accept?</h3>
              <p className="text-gray-400">
                We accept all major credit cards, PayPal, and cryptocurrency payments.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Is there a free trial?</h3>
              <p className="text-gray-400">
                Yes, all plans come with a 7-day free trial. No credit card required.
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Can I cancel anytime?</h3>
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

export default PricingPage; 