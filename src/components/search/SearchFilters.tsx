
import React from 'react';
import { SearchFilters as SearchFiltersType } from '../../utils/searchLogic';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { X, Filter } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const { t } = useLanguage();

  const updateFilter = (key: keyof SearchFiltersType, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const removeFilter = (key: keyof SearchFiltersType) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <Filter size={20} />
          Advanced Filters
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X size={16} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Role
          </label>
          <Select value={filters.role || ''} onValueChange={(value) => updateFilter('role', value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="moderator">Moderator</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Gender
          </label>
          <Select value={filters.gender || ''} onValueChange={(value) => updateFilter('gender', value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Genders</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Religion Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Religion
          </label>
          <Select value={filters.religion || ''} onValueChange={(value) => updateFilter('religion', value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All Religions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Religions</SelectItem>
              <SelectItem value="Islam">Islam</SelectItem>
              <SelectItem value="Christianity">Christianity</SelectItem>
              <SelectItem value="Hinduism">Hinduism</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Marital Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Marital Status
          </label>
          <Select value={filters.maritalStatus || ''} onValueChange={(value) => updateFilter('maritalStatus', value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Married">Married</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Profession Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Profession
          </label>
          <Select value={filters.professionType || ''} onValueChange={(value) => updateFilter('professionType', value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All Professions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Professions</SelectItem>
              <SelectItem value="Government Officer">Government Officer</SelectItem>
              <SelectItem value="Software Engineer">Software Engineer</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Teacher">Teacher</SelectItem>
              <SelectItem value="Business Executive">Business Executive</SelectItem>
              <SelectItem value="Civil Engineer">Civil Engineer</SelectItem>
              <SelectItem value="Banker">Banker</SelectItem>
              <SelectItem value="Lawyer">Lawyer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Location
          </label>
          <Select value={filters.location || ''} onValueChange={(value) => updateFilter('location', value || undefined)}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Locations</SelectItem>
              <SelectItem value="Dhaka">Dhaka</SelectItem>
              <SelectItem value="Chittagong">Chittagong</SelectItem>
              <SelectItem value="Sylhet">Sylhet</SelectItem>
              <SelectItem value="Rajshahi">Rajshahi</SelectItem>
              <SelectItem value="Rangpur">Rangpur</SelectItem>
              <SelectItem value="Barisal">Barisal</SelectItem>
              <SelectItem value="Khulna">Khulna</SelectItem>
              <SelectItem value="Mymensingh">Mymensingh</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Min Age
          </label>
          <Input
            type="number"
            placeholder="Min Age"
            value={filters.ageRange?.min || ''}
            onChange={(e) => {
              const min = parseInt(e.target.value) || undefined;
              updateFilter('ageRange', min ? { ...filters.ageRange, min } : undefined);
            }}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Max Age
          </label>
          <Input
            type="number"
            placeholder="Max Age"
            value={filters.ageRange?.max || ''}
            onChange={(e) => {
              const max = parseInt(e.target.value) || undefined;
              updateFilter('ageRange', max ? { ...filters.ageRange, max } : undefined);
            }}
            className="w-full"
          />
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            
            let displayValue = value;
            if (key === 'ageRange' && typeof value === 'object') {
              displayValue = `Age: ${value.min || 0}-${value.max || 100}`;
            }
            
            return (
              <div
                key={key}
                className="flex items-center gap-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm"
              >
                <span>{displayValue}</span>
                <button
                  onClick={() => removeFilter(key as keyof SearchFiltersType)}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
