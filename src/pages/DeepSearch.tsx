
import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DashboardSidebar from '../components/sidebar/DashboardSidebar';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, Microphone, Image, Download, ChevronDown, X, Play, Pause } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const DeepSearch = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchType, setSearchType] = useState<'text' | 'face'>('text');
  const [viewMode, setViewMode] = useState('details');
  const [showPreview, setShowPreview] = useState(false);
  const [filters, setFilters] = useState({
    division: '',
    district: '',
    profession: '',
    gender: '',
    ageRange: '',
    dateRange: ''
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
    }
  };

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedAudio(file);
    }
  };

  const handleVoiceSearch = () => {
    if (isRecording) {
      setIsRecording(false);
      // Stop recording logic here
    } else {
      setIsRecording(true);
      // Start recording logic here
    }
  };

  const handleImageSearch = (type: 'text' | 'face') => {
    setSearchType(type);
    if (type === 'text') {
      // OCR processing logic here
      setSearchQuery('Extracted text from image');
    } else {
      // Face recognition logic here
      setSearchQuery('Face recognition search');
    }
  };

  const mockResults = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    profession: ['Engineer', 'Doctor', 'Teacher', 'Designer'][i % 4],
    location: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi'][i % 4],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
  }));

  const viewModes = [
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
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {t('deepSearch.title')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {t('deepSearch.subtitle')}
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-4xl mx-auto">
                <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2">
                  <Search className="ml-4 text-gray-400" size={20} />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('deepSearch.searchPlaceholder')}
                    className="flex-1 border-none bg-transparent text-lg px-4 focus:ring-0"
                  />
                  
                  {/* Voice Search Button */}
                  <Button
                    onClick={handleVoiceSearch}
                    variant="ghost"
                    size="icon"
                    className={`mx-2 rounded-full ${isRecording ? 'bg-red-100 text-red-600' : 'hover:bg-blue-100'}`}
                  >
                    <Microphone size={20} />
                  </Button>

                  {/* Image Search Button */}
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    variant="ghost"
                    size="icon"
                    className="mx-2 rounded-full hover:bg-green-100"
                  >
                    <Image size={20} />
                  </Button>

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

                {/* Image Upload Preview */}
                {uploadedImage && (
                  <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800 dark:text-white">Uploaded Image</h3>
                      <Button
                        onClick={() => setUploadedImage(null)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-100"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <img
                        src={URL.createObjectURL(uploadedImage)}
                        alt="Uploaded"
                        className="w-20 h-20 object-cover rounded cursor-pointer"
                        onClick={() => setShowPreview(true)}
                      />
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleImageSearch('text')}
                          size="sm"
                          variant={searchType === 'text' ? 'default' : 'outline'}
                          className="rounded-full"
                        >
                          Text
                        </Button>
                        <Button
                          onClick={() => handleImageSearch('face')}
                          size="sm"
                          variant={searchType === 'face' ? 'default' : 'outline'}
                          className="rounded-full"
                        >
                          Face
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Audio Upload Preview */}
                {uploadedAudio && (
                  <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-800 dark:text-white">Uploaded Audio</h3>
                      <Button
                        onClick={() => setUploadedAudio(null)}
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:bg-red-100"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        variant="outline"
                        size="icon"
                        className="rounded-full"
                      >
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </Button>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {uploadedAudio.name}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
              <h3 className="font-medium text-gray-800 dark:text-white mb-4">Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Select value={filters.division} onValueChange={(value) => setFilters({...filters, division: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Division" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dhaka">Dhaka</SelectItem>
                    <SelectItem value="chittagong">Chittagong</SelectItem>
                    <SelectItem value="sylhet">Sylhet</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.profession} onValueChange={(value) => setFilters({...filters, profession: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Profession" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="engineer">Engineer</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.gender} onValueChange={(value) => setFilters({...filters, gender: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  placeholder="Age Range"
                  value={filters.ageRange}
                  onChange={(e) => setFilters({...filters, ageRange: e.target.value})}
                />

                <Input
                  placeholder="Date Range"
                  value={filters.dateRange}
                  onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                />

                <Button className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90">
                  Apply Filters
                </Button>
              </div>
            </div>

            {/* View Controls */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Select value={viewMode} onValueChange={setViewMode}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {viewModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showPreview}
                    onChange={(e) => setShowPreview(e.target.checked)}
                    className="rounded"
                  />
                  Preview Pane
                </label>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {mockResults.length} results found
                </span>
                <Button className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90">
                  <Download size={16} className="mr-2" />
                  Download Results
                </Button>
              </div>
            </div>

            {/* Search Results */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className={`grid gap-4 ${
                viewMode === 'extra-large' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                viewMode === 'large' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
                viewMode === 'medium' ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6' :
                viewMode === 'small' ? 'grid-cols-4 md:grid-cols-6 lg:grid-cols-8' :
                viewMode === 'list' ? 'grid-cols-1' :
                viewMode === 'details' ? 'grid-cols-1' :
                viewMode === 'tiles' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' :
                'grid-cols-1 md:grid-cols-2'
              }`}>
                {mockResults.slice(0, 20).map((result) => (
                  <div
                    key={result.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {viewMode === 'details' ? (
                      <div className="flex items-center gap-4">
                        <img
                          src={result.avatar}
                          alt={result.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800 dark:text-white">{result.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{result.email}</p>
                          <p className="text-sm text-gray-500">{result.profession} • {result.location}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <img
                          src={result.avatar}
                          alt={result.name}
                          className={`mx-auto rounded-full mb-2 ${
                            viewMode === 'extra-large' ? 'w-24 h-24' :
                            viewMode === 'large' ? 'w-16 h-16' :
                            viewMode === 'medium' ? 'w-12 h-12' :
                            'w-8 h-8'
                          }`}
                        />
                        <h3 className="font-medium text-gray-800 dark:text-white text-sm">
                          {result.name}
                        </h3>
                        {(viewMode === 'extra-large' || viewMode === 'large') && (
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {result.profession}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
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
