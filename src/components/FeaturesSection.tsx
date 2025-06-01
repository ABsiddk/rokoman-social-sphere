
import React from 'react';
import { Shield, Users, MessageCircle, Settings, Globe, Lock } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data is protected with end-to-end encryption and advanced security protocols."
    },
    {
      icon: Users,
      title: "Exclusive Network",
      description: "Connect with like-minded individuals in a curated, private community environment."
    },
    {
      icon: MessageCircle,
      title: "Real-time Communication",
      description: "Instant messaging, video calls, and group discussions to stay connected 24/7."
    },
    {
      icon: Settings,
      title: "Customizable Experience",
      description: "Personalize your profile, preferences, and notifications to suit your needs."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with members from around the world while maintaining local community feel."
    },
    {
      icon: Lock,
      title: "Invite-Only Access",
      description: "Carefully moderated community ensuring quality interactions and meaningful connections."
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Facilities of Our Private Network
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience premium networking features designed to foster meaningful connections 
            and collaborative opportunities in a secure environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
