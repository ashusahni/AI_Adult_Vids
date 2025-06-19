import React from 'react';
import { Wand2, Sparkles, Zap, Crown, Shield, Clock, Video, Image as ImageIcon, Check, Heart, Eye, Star } from 'lucide-react';

const features = [
  {
    icon: <Wand2 className="w-6 h-6" />,
    title: 'AI-Enhanced Adult Content',
    description: 'Access our exclusive library of AI-generated adult content with stunning realism and high-quality visuals that push the boundaries of imagination.',
    mobileDescription: 'Exclusive AI-generated adult content with stunning realism.',
    benefits: [
      'Ultra-realistic AI enhancements',
      'Exclusive content library',
      'Regular new releases',
      'Custom fantasy scenarios'
    ],
    mobileBenefits: [
      'Ultra-realistic AI',
      'Exclusive library',
      'Regular updates'
    ]
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Premium Video Collection',
    description: 'Explore our growing collection of AI-generated adult videos with lifelike movements and expressions. New content added weekly.',
    mobileDescription: 'Lifelike AI videos with weekly updates.',
    benefits: [
      'High-definition videos',
      'Various length options',
      'Diverse scenarios',
      'Consistent quality standards'
    ],
    mobileBenefits: [
      'HD videos',
      'Diverse scenarios',
      'Weekly updates'
    ]
  },
  {
    icon: <ImageIcon className="w-6 h-6" />,
    title: 'Stunning Image Gallery',
    description: 'Browse thousands of AI-generated adult images created with cutting-edge technology. From artistic to ultra-realistic styles.',
    mobileDescription: 'Thousands of AI-generated images in multiple styles.',
    benefits: [
      '4K resolution images',
      'Multiple artistic styles',
      'Categorized collections',
      'Regular updates'
    ],
    mobileBenefits: [
      '4K images',
      'Multiple styles',
      'Categorized collections'
    ]
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'Personalized Experience',
    description: 'Our AI learns your preferences over time, delivering content recommendations tailored to your unique tastes and viewing habits.',
    mobileDescription: 'AI-driven recommendations tailored to your tastes.',
    benefits: [
      'Smart recommendation system',
      'Preference tracking',
      'Personalized content feed',
      'Favorite collections'
    ],
    mobileBenefits: [
      'Smart recommendations',
      'Personalized feed',
      'Favorites collection'
    ]
  },
  {
    icon: <Crown className="w-6 h-6" />,
    title: 'Premium Subscription Benefits',
    description: 'Unlock exclusive content and features with our tiered subscription plans. Higher tiers provide more content and advanced features.',
    mobileDescription: 'Exclusive content with tiered subscription plans.',
    benefits: [
      'No advertisements',
      'Unlimited viewing',
      'Early access to new content',
      'Higher resolution options'
    ],
    mobileBenefits: [
      'Ad-free experience',
      'Unlimited viewing',
      'Early access'
    ]
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: 'Exclusive Content',
    description: 'Gain access to premium content only available to subscribers. Our most unique and high-quality AI creations are reserved for members.',
    mobileDescription: 'Premium content exclusive to subscribers.',
    benefits: [
      'Premium-only collections',
      'Themed releases',
      'Special series access',
      'Member-exclusive events'
    ],
    mobileBenefits: [
      'Premium collections',
      'Themed releases',
      'Exclusive events'
    ]
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Private and Secure',
    description: 'Your privacy is our priority. Enjoy complete anonymity with our secure platform designed to protect your personal information.',
    mobileDescription: 'Complete anonymity and secure browsing.',
    benefits: [
      'Anonymous browsing',
      'Secure payment processing',
      'No personally identifiable logs',
      'Discreet billing statements'
    ],
    mobileBenefits: [
      'Anonymous browsing',
      'Secure payments',
      'Discreet billing'
    ]
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: 'New Weekly Content',
    description: 'Never run out of content to explore with our regular updates. We add new AI-generated videos and images every week.',
    mobileDescription: 'Fresh AI content added weekly.',
    benefits: [
      'Weekly content drops',
      'Themed collections',
      'Seasonal specials',
      'Trending categories'
    ],
    mobileBenefits: [
      'Weekly updates',
      'Themed collections',
      'Trending content'
    ]
  }
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12">
      {/* Hero Section */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white sm:text-5xl md:text-6xl">
            <span className="block">Premium Features for</span>
            <span className="block text-purple-500">AI-Enhanced Adult Content</span>
          </h1>
          <p className="mt-3 max-w-3xl mx-auto text-sm text-gray-300 sm:text-lg md:mt-5 md:text-xl">
            Discover our extensive library of AI-generated adult content with features designed to provide the ultimate viewing experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-12 sm:mt-20">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative group bg-gray-800 p-4 sm:p-6 rounded-xl hover:bg-gray-700 transition-all duration-300"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur"></div>
                <div className="relative bg-gray-800 p-3 sm:p-6 rounded-xl">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 mr-3 sm:mr-0 sm:mb-0">
                      {feature.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-white sm:hidden">{feature.title}</h3>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 hidden sm:block">{feature.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 hidden sm:block">{feature.description}</p>
                  <p className="text-gray-400 text-sm mb-3 sm:hidden">{feature.mobileDescription}</p>
                  <ul className="space-y-1 sm:space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-300 hidden sm:flex">
                        <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                    {feature.mobileBenefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-gray-300 text-sm sm:hidden">
                        <Check className="w-3 h-3 text-purple-500 mr-1 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mt-16 sm:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">Subscription Plans</h2>
          <div className="grid grid-cols-1 gap-6 sm:gap-8 mx-auto md:grid-cols-3 max-w-6xl">
            <div className="bg-gray-800 p-5 sm:p-6 rounded-xl border border-gray-700">
              <div className="text-xl font-bold text-white mb-1 sm:mb-2">Basic</div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">$9.99<span className="text-sm text-gray-400">/month</span></div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Access to standard content
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  HD quality videos
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Basic recommendation system
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Limited new releases
                </li>
              </ul>
              <a
                href="/subscribe"
                className="block text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition-colors duration-200"
              >
                Subscribe Now
              </a>
            </div>
            
            <div className="bg-gray-800 p-5 sm:p-6 rounded-xl border-2 border-purple-500 transform sm:scale-105 relative">
              <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg font-bold">POPULAR</div>
              <div className="text-xl font-bold text-white mb-1 sm:mb-2">Premium</div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">$19.99<span className="text-sm text-gray-400">/month</span></div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Access to all standard & premium content
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  HD quality videos
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Advanced recommendation system
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Full access to new releases
                </li>
              </ul>
              <a
                href="/subscribe"
                className="block text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition-colors duration-200"
              >
                Subscribe Now
              </a>
            </div>
            
            <div className="bg-gray-800 p-5 sm:p-6 rounded-xl border border-gray-700">
              <div className="text-xl font-bold text-white mb-1 sm:mb-2">VIP</div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">$29.99<span className="text-sm text-gray-400">/month</span></div>
              <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Access to all content including exclusives
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  4K quality videos
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Priority access to new content
                </li>
                <li className="flex items-center text-gray-300 text-sm sm:text-base">
                  <Check className="w-4 h-4 text-purple-500 mr-2 flex-shrink-0" />
                  Unlimited downloads
                </li>
              </ul>
              <a
                href="/subscribe"
                className="block text-center py-2 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white transition-colors duration-200"
              >
                Subscribe Now
              </a>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 sm:mt-20">
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Ready to Explore Premium AI Content?</h2>
              <p className="text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base max-w-4xl">
                Join thousands of members already enjoying our exclusive AI-generated adult content. Start with a subscription today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="/signup"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200"
                >
                  Sign Up Now
                </a>
                <a
                  href="/login"
                  className="inline-flex items-center justify-center px-6 sm:px-8 py-2 sm:py-3 border border-purple-500 text-sm sm:text-base font-medium rounded-md text-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-200"
                >
                  Log In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage; 
