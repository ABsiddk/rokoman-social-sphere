
import React, { useState, useRef, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Search } from 'lucide-react';

interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  countries: CountryOption[];
}

const CountryCodeSelect = ({ value, onChange, countries }: CountryCodeSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isSelectOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSelectOpen]);

  const filteredCountries = countries.filter(country => {
    const searchLower = searchTerm.toLowerCase().trim();
    if (!searchLower) return true;
    
    return (
      country.name.toLowerCase().includes(searchLower) ||
      country.code.toLowerCase().includes(searchLower) ||
      country.code.replace('+', '').includes(searchLower) ||
      // Search by country short forms (ISO codes)
      country.name.toLowerCase().substring(0, 3).includes(searchLower) ||
      // Search by first letters of country name
      country.name.toLowerCase().split(' ').some(word => word.startsWith(searchLower))
    );
  });

  return (
    <div className="w-full sm:w-80 lg:w-96">
      <Select 
        value={value} 
        onValueChange={onChange}
        onOpenChange={setIsSelectOpen}
      >
        <SelectTrigger className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 h-12 shadow-sm">
          <SelectValue className="text-sm font-medium" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 max-h-80 w-full min-w-[320px] sm:min-w-[380px] lg:min-w-[420px] z-[9999] shadow-2xl rounded-lg overflow-hidden">
          <div className="sticky top-0 p-4 border-b-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <Input
                ref={searchInputRef}
                placeholder="Search by country, code, or name..."
                value={searchTerm}
                onChange={(e) => {
                  e.stopPropagation();
                  setSearchTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                onFocus={(e) => {
                  e.stopPropagation();
                }}
                className="pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md font-medium transition-all duration-200"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <SelectItem 
                  key={country.code} 
                  value={country.code} 
                  className="text-gray-900 dark:text-white font-medium hover:bg-blue-50 dark:hover:bg-gray-700 focus:bg-blue-100 dark:focus:bg-gray-600 cursor-pointer px-4 py-3 transition-all duration-150 border-b border-gray-50 dark:border-gray-700 last:border-b-0"
                  onSelect={() => setSearchTerm('')}
                >
                  <div className="flex items-center gap-3 w-full">
                    <span className="text-xl flex-shrink-0">{country.flag}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 min-w-[65px] flex-shrink-0 text-sm">{country.code}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1 font-medium">{country.name}</span>
                  </div>
                </SelectItem>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                <Search className="mx-auto mb-3 h-8 w-8 opacity-50" />
                <p className="text-sm font-medium">No countries found</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try searching by name or code</p>
              </div>
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CountryCodeSelect;
