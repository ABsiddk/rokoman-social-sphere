
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { FileText, Upload, Download, Database } from 'lucide-react';

const CSVManagement = () => {
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
                {t('csvManagement.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('csvManagement.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <div className="text-center">
                  <Upload size={48} className="mx-auto text-[rgb(39,113,150)] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Import CSV
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Upload CSV files to import user data
                  </p>
                  <Button className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90">
                    <Upload size={16} className="mr-2" />
                    Choose File
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <div className="text-center">
                  <Download size={48} className="mx-auto text-[rgb(39,113,150)] mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    Export CSV
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Download user data as CSV files
                  </p>
                  <Button variant="outline">
                    <Download size={16} className="mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <Database className="text-[rgb(39,113,150)] mr-3" size={24} />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Data Management
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
                  <h4 className="font-medium text-gray-800 dark:text-white">Total Records</h4>
                  <p className="text-2xl font-bold text-[rgb(39,113,150)]">1,247</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
                  <h4 className="font-medium text-gray-800 dark:text-white">Last Import</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">2 days ago</p>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded">
                  <h4 className="font-medium text-gray-800 dark:text-white">File Size</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">2.4 MB</p>
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

export default CSVManagement;
