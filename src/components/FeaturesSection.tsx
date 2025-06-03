
import React from 'react';
import { Shield, Users, MessageCircle, Settings, Globe, Lock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: 'features.privacy.title',
      descKey: 'features.privacy.desc'
    },
    {
      icon: Users,
      titleKey: 'features.network.title',
      descKey: 'features.network.desc'
    },
    {
      icon: MessageCircle,
      titleKey: 'features.communication.title',
      descKey: 'features.communication.desc'
    },
    {
      icon: Settings,
      titleKey: 'features.customizable.title',
      descKey: 'features.customizable.desc'
    },
    {
      icon: Globe,
      titleKey: 'features.global.title',
      descKey: 'features.global.desc'
    },
    {
      icon: Lock,
      titleKey: 'features.invite.title',
      descKey: 'features.invite.desc'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('features.subtitle')}
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
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(feature.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
