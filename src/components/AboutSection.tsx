
import React from 'react';
import { Target, Heart, Lightbulb, Rocket } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LiquidGlassButton from "./ui/LiquidGlassButton";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {t('about.description1')}
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('about.description2')}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Target className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white">{t('about.mission')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {t('about.mission.desc')}
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <Heart className="w-12 h-12 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 dark:text-white">{t('about.values')}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {t('about.values.desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('about.innovation')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.innovation.desc')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
              <div className="flex items-center space-x-4 mb-6">
                <Rocket className="w-8 h-8 text-purple-500" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('about.growth')}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {t('about.growth.desc')}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-orange-500 p-8 rounded-xl text-white">
              <h3 className="text-xl font-semibold mb-4">{t('about.journey')}</h3>
              <p className="mb-6">
                {t('about.journey.desc')}
              </p>
              <LiquidGlassButton
                className="bg-white/90 text-blue-700 dark:text-cyan-100 font-semibold hover:bg-white/95 transition-colors px-6 py-2 rounded-lg"
              >
                {t('about.getstarted')}
              </LiquidGlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
