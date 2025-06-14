
import React from 'react';
import { Play, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
                {t('hero.welcome')}
                <span className="block bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
                  {t('hero.community')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <Users size={24} />
                  <span>{t('hero.join')}</span>
                </button>
              </Link>
              <button className="flex items-center justify-center space-x-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                <span>{t('hero.learn')}</span>
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">{t('hero.members')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">500+</div>
                <div className="text-gray-600 dark:text-gray-400">{t('hero.connections')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">99%</div>
                <div className="text-gray-600 dark:text-gray-400">{t('hero.satisfaction')}</div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative">
            <div className="relative bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-blue-200 to-orange-200 dark:from-blue-800 dark:to-orange-800 flex items-center justify-center">
                <button className="flex items-center justify-center w-20 h-20 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-all duration-300">
                  <Play className="text-blue-600 dark:text-blue-400 ml-1" size={32} />
                </button>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-center">
                  <h3 className="text-xl font-semibold mb-2">{t('hero.overview')}</h3>
                  <p className="text-sm">{t('hero.discover')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
