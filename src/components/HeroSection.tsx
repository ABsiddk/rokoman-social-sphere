
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
                <span className="block bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] bg-clip-text text-transparent">
                  {t('hero.community')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <button className="flex items-center justify-center space-x-3 bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                  <Users size={24} />
                  <span>{t('hero.join')}</span>
                </button>
              </Link>
              <button className="flex items-center justify-center space-x-3 border-2 border-[rgb(39,113,150)] dark:border-[rgb(129,130,135)] text-[rgb(39,113,150)] dark:text-[rgb(129,130,135)] px-8 py-4 rounded-xl font-semibold hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-[rgb(129,130,135)]/10 transition-all duration-300">
                <span>{t('hero.learn')}</span>
              </button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[rgb(39,113,150)] dark:text-[rgb(39,113,150)]">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">{t('hero.members')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[rgb(129,130,135)] dark:text-[rgb(129,130,135)]">500+</div>
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
              <div className="aspect-video">
                <iframe
                  src="https://www.youtube.com/embed/-ihuECJ29T8"
                  title={t('hero.overview')}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
