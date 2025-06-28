
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
    // Convert "all" back to undefined for filtering logic
    const filterValue = value === "all" ? undefined : value;
    onFiltersChange({ ...filters, [key]: filterValue });
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
          {t('deepSearch.filters.title')}
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-red-600 hover:text-red-700"
          >
            <X size={16} className="mr-1" />
            {t('deepSearch.filters.clearAll')}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t('deepSearch.filters.role')}
          </label>
          <Select value={filters.role || 'all'} onValueChange={(value) => updateFilter('role', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('deepSearch.filters.placeholders.allRoles')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('deepSearch.filters.placeholders.allRoles')}</SelectItem>
              <SelectItem value="admin">{t('deepSearch.filters.values.admin')}</SelectItem>
              <SelectItem value="moderator">{t('deepSearch.filters.values.moderator')}</SelectItem>
              <SelectItem value="user">{t('deepSearch.filters.values.user')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t('deepSearch.filters.gender')}
          </label>
          <Select value={filters.gender || 'all'} onValueChange={(value) => updateFilter('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('deepSearch.filters.placeholders.allGenders')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('deepSearch.filters.placeholders.allGenders')}</SelectItem>
              <SelectItem value="Male">{t('deepSearch.filters.values.male')}</SelectItem>
              <SelectItem value="Female">{t('deepSearch.filters.values.female')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Religion Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t('deepSearch.filters.religion')}
          </label>
          <Select value={filters.religion || 'all'} onValueChange={(value) => updateFilter('religion', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('deepSearch.filters.placeholders.allReligions')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('deepSearch.filters.placeholders.allReligions')}</SelectItem>
              <SelectItem value="Islam">{t('deepSearch.filters.values.islam')}</SelectItem>
              <SelectItem value="Christianity">{t('deepSearch.filters.values.christianity')}</SelectItem>
              <SelectItem value="Hinduism">{t('deepSearch.filters.values.hinduism')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Marital Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t('deepSearch.filters.maritalStatus')}
          </label>
          <Select value={filters.maritalStatus || 'all'} onValueChange={(value) => updateFilter('maritalStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('deepSearch.filters.placeholders.allStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('deepSearch.filters.placeholders.allStatus')}</SelectItem>
              <SelectItem value="Single">{t('deepSearch.filters.values.single')}</SelectItem>
              <SelectItem value="Married">{t('deepSearch.filters.values.married')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Profession Filter */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            {t('deepSearch.filters.profession')}
          </label>
          <Select value={filters.professionType || 'all'} onValueChange={(value) => updateFilter('professionType', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('deepSearch.filters.placeholders.allProfessions')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('deepSearch.filters.placeholders.allProfessions')}</SelectItem>
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
            {t('deepSearch.filters.location')}
          </label>
          <Select value={filters.location || 'all'} onValueChange={(value) => updateFilter('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder={t('deepSearch.filters.placeholders.allLocations')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('deepSearch.filters.placeholders.allLocations')}</SelectItem>
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
            {t('deepSearch.filters.minAge')}
          </label>
          <Input
            type="number"
            placeholder={t('deepSearch.filters.placeholders.minAge')}
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
            {t('deepSearch.filters.maxAge')}
          </label>
          <Input
            type="number"
            placeholder={t('deepSearch.filters.placeholders.maxAge')}
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
