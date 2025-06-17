
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { Settings, Palette, Shield, Bell } from 'lucide-react';

const PropertiesSettings = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex w-full">
        <DashboardSidebar />
        <main className="flex-1 ml-16 transition-all duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {t('propertiesSettings.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('propertiesSettings.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Palette className="text-[rgb(39,113,150)] mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Theme Settings
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Customize appearance and color schemes
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Shield className="text-[rgb(39,113,150)] mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Security Settings
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Manage privacy and security preferences
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Bell className="text-[rgb(39,113,150)] mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Notifications
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Configure notification preferences
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default PropertiesSettings;
