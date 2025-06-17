
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/button';
import { Search, Mic, Image, Download, Eye } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

const DeepSearch = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('details');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);

  const viewOptions = [
    { value: 'extra-large', label: 'Extra Large Icons' },
    { value: 'large', label: 'Large Icons' },
    { value: 'medium', label: 'Medium Icons' },
    { value: 'small', label: 'Small Icons' },
    { value: 'list', label: 'List' },
    { value: 'details', label: 'Details' },
    { value: 'tiles', label: 'Tiles' },
    { value: 'contents', label: 'Contents' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex w-full">
        <DashboardSidebar />
        <main className="flex-1 ml-16 transition-all duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {t('deepSearch.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('deepSearch.subtitle')}
              </p>
            </div>

            {/* Google-style Search Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <div className="relative flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-full p-3 focus-within:border-[rgb(39,113,150)]">
                <Search className="text-gray-400 mr-3" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('deepSearch.searchPlaceholder')}
                  className="flex-1 outline-none bg-transparent text-gray-800 dark:text-white"
                />
                <div className="flex items-center gap-2 ml-3">
                  <Button
                    size="sm"
                    className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90 text-white rounded-full p-2"
                  >
                    <Mic size={16} />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90 text-white rounded-full p-2"
                  >
                    <Image size={16} />
                  </Button>
                </div>
              </div>

              {/* Image Upload Section */}
              {uploadedImage && (
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="rounded-full">
                    Face Recognition
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full">
                    Text Extraction
                  </Button>
                </div>
              )}
            </div>

            {/* Advanced Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Advanced Filters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option>All Professions</option>
                  <option>Engineer</option>
                  <option>Doctor</option>
                  <option>Teacher</option>
                </select>
                <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option>All Locations</option>
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                </select>
                <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option>All Ages</option>
                  <option>18-25</option>
                  <option>26-35</option>
                  <option>36-50</option>
                </select>
                <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option>All Genders</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <select className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600">
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>Moderator</option>
                  <option>User</option>
                </select>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select view" />
                  </SelectTrigger>
                  <SelectContent>
                    {viewOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Eye size={16} className="mr-2" />
                  Preview Pane
                </Button>
              </div>
              <Button className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90">
                <Download size={16} className="mr-2" />
                Download Results
              </Button>
            </div>

            {/* Search Results */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="text-center py-20">
                <Search size={64} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Start Your Search
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use the search bar above to find profiles with advanced filtering options
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

export default DeepSearch;
