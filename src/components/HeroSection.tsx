
import React from 'react';
import { Play, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import LiquidGlassButton from "./ui/LiquidGlassButton";

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
                <span className="block bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] bg-clip-text text-transparent drop-shadow-lg">
                  {t('hero.community')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <LiquidGlassButton className="flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold w-full sm:w-auto text-white dark:text-cyan-100 bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] hover:from-[rgb(45,125,165)] hover:via-[rgb(85,155,195)] hover:to-[rgb(139,140,145)] transition-all duration-300">
                  <Users size={24} />
                  <span>{t('hero.join')}</span>
                </LiquidGlassButton>
              </Link>
              <LiquidGlassButton
                className="flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold w-full sm:w-auto transition-all duration-300 border-2 border-transparent text-white bg-gray-800 hover:bg-gray-900 hover:text-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-950 shadow-md"
              >
                <span>{t('hero.learn')}</span>
              </LiquidGlassButton>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] bg-clip-text text-transparent">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">{t('hero.members')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-[rgb(129,130,135)] via-[rgb(75,145,185)] to-[rgb(39,113,150)] bg-clip-text text-transparent">500+</div>
                <div className="text-gray-600 dark:text-gray-400">{t('hero.connections')}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 bg-clip-text text-transparent">99%</div>
                <div className="text-gray-600 dark:text-gray-400">{t('hero.satisfaction')}</div>
              </div>
            </div>
          </div>

          {/* Video Section */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
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
