
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { UserPlus, Upload, Save } from 'lucide-react';

const NewProfile = () => {
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
                {t('newProfile.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('newProfile.subtitle')}
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="text-center py-20">
                <UserPlus size={64} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Create New Profile
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Enhanced profile creation interface coming soon
                </p>
                <div className="flex justify-center gap-4">
                  <Button className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90">
                    <Upload size={16} className="mr-2" />
                    Import Data
                  </Button>
                  <Button variant="outline">
                    <Save size={16} className="mr-2" />
                    Manual Entry
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default NewProfile;
