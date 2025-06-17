
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { 
  Search, 
  Mic, 
  Camera, 
  X, 
  Play, 
  Download,
  Grid3X3,
  List,
  MoreHorizontal,
  Filter
} from 'lucide-react';
import LiquidGlassInput from '../components/ui/LiquidGlassInput';
import LiquidGlassButton from '../components/ui/LiquidGlassButton';
import LiquidGlassSelect from '../components/ui/LiquidGlassSelect';

const DeepSearch = () => {
  const { t } = useLanguage();
  const { users } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [viewMode, setViewMode] = useState('details');
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState(users);
  const [imageSearchMode, setImageSearchMode] = useState<'face' | 'text' | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setImageSearchMode(null);
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedAudio(file);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    // Voice recording implementation would go here
  };

  const handleSearch = () => {
    // Search implementation
    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.phone && user.phone.includes(searchQuery))
    );
    setSearchResults(filtered);
  };

  const handleImageSearch = (mode: 'face' | 'text') => {
    setImageSearchMode(mode);
    // Image search implementation would go here
  };

  const handleDownloadResults = () => {
    // CSV download implementation
    const csvContent = searchResults.map(user => ({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role
    }));
    
    const csv = [
      Object.keys(csvContent[0]).join(','),
      ...csvContent.map(row => Object.values(row).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'search-results.csv';
    a.click();
  };

  const viewOptions = [
    { value: 'extra-large', label: t('search.view.extra.large') },
    { value: 'large', label: t('search.view.large') },
    { value: 'medium', label: t('search.view.medium') },
    { value: 'small', label: t('search.view.small') },
    { value: 'list', label: t('search.view.list') },
    { value: 'details', label: t('search.view.details') },
    { value: 'tiles', label: t('search.view.tiles') },
    { value: 'contents', label: t('search.view.contents') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <DashboardSidebar />
      
      <main className="ml-0 md:ml-20 lg:ml-20 transition-all duration-300 pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {t('search.deep.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('search.deep.description')}
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative max-w-4xl mx-auto">
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                  <Search className="text-gray-400 ml-4" size={20} />
                  
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('search.placeholder')}
                    className="flex-1 px-4 py-3 bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />

                  {/* Voice Search Button */}
                  <LiquidGlassButton
                    onClick={handleVoiceRecord}
                    className={`mr-2 p-3 rounded-full ${isRecording ? 'bg-red-500' : ''}`}
                  >
                    <Mic size={20} />
                  </LiquidGlassButton>

                  {/* Image Search Button */}
                  <LiquidGlassButton
                    onClick={() => fileInputRef.current?.click()}
                    className="mr-2 p-3 rounded-full"
                  >
                    <Camera size={20} />
                  </LiquidGlassButton>

                  {/* Search Button */}
                  <LiquidGlassButton
                    onClick={handleSearch}
                    className="px-6 py-3 rounded-full"
                  >
                    {t('common.search')}
                  </LiquidGlassButton>
                </div>

                {/* Hidden file inputs */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <input
                  ref={audioInputRef}
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="hidden"
                />
              </div>

              {/* Image Preview and Options */}
              {uploadedImage && (
                <div className="max-w-4xl mx-auto mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Uploaded"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {t('search.image.uploaded')}
                      </p>
                      <div className="flex gap-2">
                        <LiquidGlassButton
                          onClick={() => handleImageSearch('text')}
                          className="px-4 py-2 text-sm"
                        >
                          {t('search.image.text')}
                        </LiquidGlassButton>
                        <LiquidGlassButton
                          onClick={() => handleImageSearch('face')}
                          className="px-4 py-2 text-sm"
                        >
                          {t('search.image.face')}
                        </LiquidGlassButton>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* Audio Preview */}
              {uploadedAudio && (
                <div className="max-w-4xl mx-auto mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                  <div className="flex items-center gap-4">
                    <Play size={20} className="text-gray-400" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {uploadedAudio.name}
                      </p>
                    </div>
                    <button
                      onClick={() => setUploadedAudio(null)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-4">
                <LiquidGlassButton
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <Filter size={16} />
                  {t('search.filters')}
                </LiquidGlassButton>
                
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {searchResults.length} {t('search.results.found')}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <LiquidGlassSelect
                  value={viewMode}
                  onValueChange={setViewMode}
                  options={viewOptions}
                  placeholder={t('search.view.select')}
                />
                
                <LiquidGlassButton
                  onClick={handleDownloadResults}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <Download size={16} />
                  {t('common.download')}
                </LiquidGlassButton>
              </div>
            </div>

            {/* Search Results */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {searchResults.length === 0 ? (
                <div className="text-center py-12">
                  <Search size={48} className="text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                    {t('search.no.results')}
                  </h3>
                  <p className="text-gray-500">
                    {t('search.try.different.terms')}
                  </p>
                </div>
              ) : (
                <div className={`grid gap-4 ${
                  viewMode === 'details' ? 'grid-cols-1' :
                  viewMode === 'large' ? 'grid-cols-1 md:grid-cols-2' :
                  viewMode === 'medium' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                  'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }`}>
                  {searchResults.map((user) => (
                    <div
                      key={user.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 dark:text-white">
                            {user.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-500 capitalize">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DeepSearch;
