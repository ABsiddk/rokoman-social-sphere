
import React from 'react';
import { User } from '../../contexts/UserContext';
import UserCard from './UserCard';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SearchResultsProps {
  users: User[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  viewMode: string;
  onPageChange: (page: number) => void;
  onViewProfile: (user: User) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  users,
  total,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
  viewMode,
  onPageChange,
  onViewProfile
}) => {
  const getGridClasses = () => {
    switch (viewMode) {
      case 'extra-large':
        return 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6';
      case 'large':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6';
      case 'medium':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4';
      case 'small':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3';
      case 'tiles':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
      case 'list':
      case 'details':
        return 'space-y-2';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4';
    }
  };

  if (users.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            No Results Found
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Try adjusting your search query or filters to find more results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {/* Results Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Showing {users.length} of {total} results
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </div>
      </div>

      {/* Results Grid */}
      <div className={getGridClasses()}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            viewMode={viewMode}
            onViewProfile={onViewProfile}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage}
          >
            <ChevronLeft size={16} />
            Previous
          </Button>
          
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = Math.max(1, currentPage - 2) + i;
              if (page > totalPages) return null;
              
              return (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
          >
            Next
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
