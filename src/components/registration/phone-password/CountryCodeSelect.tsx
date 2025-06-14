
import React, { useState, useRef, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Search } from 'lucide-react';
import { CountryOption } from './countryOptions';

// Helper: get the ISO short form from country name, e.g. 'Bangladesh' -> 'BD'
const getShortForm = (country: CountryOption) => {
  const base = country.name.split(' ')[0];
  return base.length > 3 ? base.slice(0, 2).toUpperCase() : base.toUpperCase();
};

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  countries: CountryOption[];
}

const getMatchScore = (country: CountryOption, search: string) => {
  // Lower is better; -1 means exact match
  if (!search) return 999;
  const { name, code } = country;
  const short = getShortForm(country);
  const searchLower = search.toLowerCase();
  if (name.toLowerCase() === searchLower || code.toLowerCase() === searchLower || short.toLowerCase() === searchLower) {
    return -1;
  }
  if (name.toLowerCase().startsWith(searchLower) || code.toLowerCase().startsWith(searchLower) || short.toLowerCase().startsWith(searchLower)) {
    return 0;
  }
  if (name.toLowerCase().includes(searchLower) || code.toLowerCase().includes(searchLower) || short.toLowerCase().includes(searchLower)) {
    return 1;
  }
  // Simple distance: number of chars different from start
  return 2;
};

const CountryCodeSelect = ({ value, onChange, countries }: CountryCodeSelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSelectOpen && searchInputRef.current) {
      // Focus right on open and any re-renders
      searchInputRef.current.focus();
    }
  }, [isSelectOpen, searchTerm]);

  const selected = countries.find(c => c.code === value);

  // Only short form + code for display in trigger
  const triggerDisplay = selected
    ? `${getShortForm(selected)} ${selected.code}`
    : value;

  const filteredCountries = [...countries]
    .filter(country => {
      const searchLower = searchTerm.toLowerCase().trim();
      if (!searchLower) return true;
      return (
        country.name.toLowerCase().includes(searchLower) ||
        country.code.toLowerCase().includes(searchLower) ||
        getShortForm(country).toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      // Sort by match score, then alphabetically
      const aScore = getMatchScore(a, searchTerm);
      const bScore = getMatchScore(b, searchTerm);
      if (aScore === bScore) {
        // Alphabetical fallback
        return a.name.localeCompare(b.name);
      }
      return aScore - bScore;
    });

  // Prevent scroll/focus jump by forcing focus to search box if dropdown is open
  const handleMouseDownInput = (e: React.MouseEvent) => {
    // Prevents closing from trigger click
    e.stopPropagation();
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  return (
    <div
      className="w-full sm:w-auto"
      style={{ minWidth: 150, maxWidth: 200 }}
    >
      <Select
        value={value}
        onValueChange={(v) => {
          setSearchTerm('');
          onChange(v);
        }}
        onOpenChange={setIsSelectOpen}
        open={isSelectOpen}
      >
        <SelectTrigger
          className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 h-10 rounded-lg px-2 w-full min-w-[150px] max-w-[200px] text-sm"
          style={{ minWidth: 150, maxWidth: 200 }}
        >
          <SelectValue asChild>
            <span className="flex items-center gap-2">
              {selected && <span className="text-xl">{selected.flag}</span>}
              <span className="font-semibold">{triggerDisplay}</span>
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent
          className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 max-h-80 w-full min-w-[220px] z-[9999] shadow-2xl rounded-lg overflow-hidden p-0"
        >
          <div className="sticky top-0 px-4 py-2 border-b-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <Input
                ref={searchInputRef}
                placeholder="Search country/code..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                onMouseDown={handleMouseDownInput}
                onKeyDown={e => e.stopPropagation()}
                onFocus={e => e.stopPropagation()}
                className="pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm rounded-md font-medium transition-all duration-200"
                autoComplete="off"
              />
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <SelectItem
                  key={country.code}
                  value={country.code}
                  className="text-gray-900 dark:text-white font-medium hover:bg-blue-50 dark:hover:bg-gray-700 focus:bg-blue-100 dark:focus:bg-gray-600 cursor-pointer px-4 py-2 text-sm flex gap-2"
                >
                  <span className="text-xl">{country.flag}</span>
                  <span className="font-bold min-w-[40px]">{getShortForm(country)} {country.code}</span>
                  <span className="text-gray-500 dark:text-gray-400 flex-1 text-xs">{country.name}</span>
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
