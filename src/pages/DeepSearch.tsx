
import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import SearchFilters from '../components/search/SearchFilters';
import SearchResults from '../components/search/SearchResults';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { Button } from '../components/ui/button';
import { Search, Mic, Image, Download, Eye } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { searchUsers, exportUsersToCSV, SearchFilters as SearchFiltersType, SearchOptions } from '../utils/searchLogic';

const DeepSearch = () => {
  const { t } = useLanguage();
  const { users } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('medium');
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [sortBy, setSortBy] = useState<'name' | 'joinDate' | 'role' | 'lastLogin'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const viewOptions = [
    { value: 'extra-large', label: 'Extra Large Icons' },
    { value: 'large', label: 'Large Icons' },
    { value: 'medium', label: 'Medium Icons' },
    { value: 'small', label: 'Small Icons' },
    { value: 'list', label: 'List' },
    { value: 'details', label: 'Details' },
    { value: 'tiles', label: 'Tiles' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'joinDate', label: 'Join Date' },
    { value: 'role', label: 'Role' },
    { value: 'lastLogin', label: 'Last Login' },
  ];

  // Search results using the search logic
  const searchResults = useMemo(() => {
    const options: SearchOptions = {
      query: searchQuery,
      filters,
      sortBy,
      sortOrder,
      page: currentPage,
      limit: 20
    };
    
    return searchUsers(users, options);
  }, [users, searchQuery, filters, sortBy, sortOrder, currentPage]);

  // Reset page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewProfile = (user: any) => {
    console.log('View profile:', user);
    // TODO: Navigate to user profile or open modal
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      console.log('Image uploaded for search:', file.name);
      // TODO: Implement image search logic
    }
  };

  const handleVoiceSearch = () => {
    if (isRecording) {
      setIsRecording(false);
      console.log('Stopped recording');
      // TODO: Stop recording and process audio
    } else {
      setIsRecording(true);
      console.log('Started recording');
      // TODO: Start recording audio
    }
  };

  const handleExportResults = () => {
    if (searchResults.users.length > 0) {
      exportUsersToCSV(searchResults.users);
    }
  };

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

            {/* Search Bar */}
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
                    onClick={handleVoiceSearch}
                    className={`rounded-full p-2 ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90'} text-white`}
                  >
                    <Mic size={16} />
                  </Button>
                  <label htmlFor="image-upload">
                    <Button
                      size="sm"
                      className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90 text-white rounded-full p-2"
                      asChild
                    >
                      <span>
                        <Image size={16} />
                      </span>
                    </Button>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Upload indicators */}
              <div className="mt-4 flex gap-4">
                {uploadedImage && (
                  <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">
                    <span className="text-sm">Image: {uploadedImage.name}</span>
                    <button onClick={() => setUploadedImage(null)} className="text-red-500">×</button>
                  </div>
                )}
                {isRecording && (
                  <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900 px-3 py-1 rounded-full">
                    <span className="text-sm animate-pulse">Recording...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Search Filters */}
            <SearchFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />

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

                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </Button>
              </div>

              <Button 
                className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90"
                onClick={handleExportResults}
                disabled={searchResults.users.length === 0}
              >
                <Download size={16} className="mr-2" />
                Download Results ({searchResults.total})
              </Button>
            </div>

            {/* Search Results */}
            <SearchResults
              users={searchResults.users}
              total={searchResults.total}
              currentPage={searchResults.currentPage}
              totalPages={searchResults.totalPages}
              hasNextPage={searchResults.hasNextPage}
              hasPrevPage={searchResults.hasPrevPage}
              viewMode={viewMode}
              onPageChange={handlePageChange}
              onViewProfile={handleViewProfile}
            />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DeepSearch;
