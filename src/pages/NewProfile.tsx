
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { UserPlus } from 'lucide-react';
import LiquidGlassButton from '../components/ui/LiquidGlassButton';

const NewProfile = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <DashboardSidebar />
      
      <main className="ml-0 md:ml-20 lg:ml-20 transition-all duration-300 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {t('profile.new.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('profile.new.description')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LiquidGlassButton className="p-6 h-auto flex flex-col items-center text-center">
                  <UserPlus size={24} className="mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{t('profile.create.individual')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('profile.create.individual.desc')}
                  </p>
                </LiquidGlassButton>

                <LiquidGlassButton className="p-6 h-auto flex flex-col items-center text-center">
                  <UserPlus size={24} className="mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{t('profile.create.bulk')}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {t('profile.create.bulk.desc')}
                  </p>
                </LiquidGlassButton>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewProfile;
