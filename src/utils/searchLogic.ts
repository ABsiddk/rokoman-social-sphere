
import { User } from '../contexts/UserContext';

export interface SearchFilters {
  role?: string;
  gender?: string;
  religion?: string;
  maritalStatus?: string;
  professionType?: string;
  location?: string;
  ageRange?: { min: number; max: number };
  isActive?: boolean;
  bcsBatch?: string;
  bcsCadre?: string;
}

export interface SearchOptions {
  query: string;
  filters: SearchFilters;
  sortBy: 'name' | 'joinDate' | 'role' | 'lastLogin';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export const searchUsers = (users: User[], options: SearchOptions) => {
  let filteredUsers = [...users];

  // Text search across multiple fields
  if (options.query.trim()) {
    const query = options.query.toLowerCase().trim();
    filteredUsers = filteredUsers.filter(user => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query) ||
        user.address?.toLowerCase().includes(query) ||
        user.professionType?.toLowerCase().includes(query) ||
        user.institution?.toLowerCase().includes(query) ||
        user.designation?.toLowerCase().includes(query) ||
        user.department?.toLowerCase().includes(query)
      );
    });
  }

  // Apply filters
  if (options.filters.role) {
    filteredUsers = filteredUsers.filter(user => user.role === options.filters.role);
  }

  if (options.filters.gender) {
    filteredUsers = filteredUsers.filter(user => user.gender === options.filters.gender);
  }

  if (options.filters.religion) {
    filteredUsers = filteredUsers.filter(user => user.religion === options.filters.religion);
  }

  if (options.filters.maritalStatus) {
    filteredUsers = filteredUsers.filter(user => user.maritalStatus === options.filters.maritalStatus);
  }

  if (options.filters.professionType) {
    filteredUsers = filteredUsers.filter(user => user.professionType === options.filters.professionType);
  }

  if (options.filters.location) {
    filteredUsers = filteredUsers.filter(user => 
      user.address?.toLowerCase().includes(options.filters.location!.toLowerCase())
    );
  }

  if (options.filters.ageRange) {
    const currentYear = new Date().getFullYear();
    filteredUsers = filteredUsers.filter(user => {
      if (!user.dateOfBirth) return false;
      const birthYear = new Date(user.dateOfBirth).getFullYear();
      const age = currentYear - birthYear;
      return age >= options.filters.ageRange!.min && age <= options.filters.ageRange!.max;
    });
  }

  if (options.filters.isActive !== undefined) {
    filteredUsers = filteredUsers.filter(user => user.isActive === options.filters.isActive);
  }

  if (options.filters.bcsBatch) {
    filteredUsers = filteredUsers.filter(user => user.bcsBatch === options.filters.bcsBatch);
  }

  if (options.filters.bcsCadre) {
    filteredUsers = filteredUsers.filter(user => user.bcsCadre === options.filters.bcsCadre);
  }

  // Sort results
  filteredUsers.sort((a, b) => {
    let aValue: any, bValue: any;
    
    switch (options.sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'joinDate':
        aValue = new Date(a.joinDate);
        bValue = new Date(b.joinDate);
        break;
      case 'role':
        aValue = a.role;
        bValue = b.role;
        break;
      case 'lastLogin':
        aValue = new Date(a.lastLogin);
        bValue = new Date(b.lastLogin);
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }

    if (aValue < bValue) return options.sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return options.sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const startIndex = (options.page - 1) * options.limit;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + options.limit);

  return {
    users: paginatedUsers,
    total: filteredUsers.length,
    totalPages: Math.ceil(filteredUsers.length / options.limit),
    currentPage: options.page,
    hasNextPage: options.page < Math.ceil(filteredUsers.length / options.limit),
    hasPrevPage: options.page > 1
  };
};

export const exportUsersToCSV = (users: User[]) => {
  const headers = [
    'Name', 'Email', 'Phone', 'Role', 'Gender', 'Religion', 'Marital Status',
    'Profession', 'Institution', 'Designation', 'Location', 'Join Date', 'Active'
  ];

  const csvContent = [
    headers.join(','),
    ...users.map(user => [
      user.name,
      user.email,
      user.phone || '',
      user.role,
      user.gender || '',
      user.religion || '',
      user.maritalStatus || '',
      user.professionType || '',
      user.institution || '',
      user.designation || '',
      user.address || '',
      user.joinDate,
      user.isActive ? 'Yes' : 'No'
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `users_export_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};
