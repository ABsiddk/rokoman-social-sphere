
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'moderator' | 'user';

export interface UserEmail {
  id: string;
  email: string;
  type: 'personal' | 'office';
}

export interface UserPhone {
  id: string;
  phone: string;
  type: 'personal' | 'office';
}

export interface UserExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate?: string;
  isCurrent: boolean;
  location: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  nickNames: string[];
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  religion?: string;
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed';
  emails: UserEmail[];
  phones: UserPhone[];
  presentAddress: {
    district: string;
    address: string;
  };
  permanentAddress: {
    district: string;
    address: string;
  };
  experiences: UserExperience[];
  profileHeadline?: string;
  role: UserRole;
  avatar?: string;
  joinDate: string;
  lastLogin: string;
  isActive: boolean;
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => void;
  createUser: (userData: Omit<User, 'id' | 'joinDate' | 'lastLogin'>) => void;
  updateUser: (userId: string, userData: Partial<User>) => void;
  deleteUser: (userId: string) => void;
  isAuthenticated: boolean;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const bangladeshDistricts = [
  'Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh',
  'Comilla', 'Gazipur', 'Narayanganj', 'Jessore', 'Bogra', 'Dinajpur', 'Pabna', 'Tangail',
  'Jamalpur', 'Kishoreganj', 'Munshiganj', 'Manikganj', 'Gopalganj', 'Faridpur', 'Madaripur',
  'Shariatpur', 'Rajbari', 'Narsingdi', 'Brahmanbaria', 'Chandpur', 'Lakshmipur', 'Feni',
  'Noakhali', 'Coxs Bazar', 'Rangamati', 'Bandarban', 'Khagrachhari', 'Bagerhat', 'Chuadanga',
  'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira', 'Barguna', 'Bhola',
  'Jhalokati', 'Patuakhali', 'Pirojpur', 'Panchagarh', 'Thakurgaon', 'Nilphamari', 'Lalmonirhat',
  'Kurigram', 'Gaibandha', 'Sherpur', 'Netrokona', 'Habiganj', 'Moulvibazar', 'Sunamganj'
];

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    nickNames: ['Admin'],
    emails: [{ id: '1', email: 'admin@onnorokom.com', type: 'office' }],
    phones: [{ id: '1', phone: '+880 1234-567890', type: 'office' }],
    presentAddress: { district: 'Dhaka', address: 'Dhanmondi, Dhaka' },
    permanentAddress: { district: 'Dhaka', address: 'Dhanmondi, Dhaka' },
    experiences: [],
    role: 'admin',
    joinDate: '2023-01-01',
    lastLogin: new Date().toISOString(),
    isActive: true
  },
  {
    id: '2',
    name: 'Content Moderator',
    nickNames: ['Moderator'],
    emails: [{ id: '1', email: 'moderator@onnorokom.com', type: 'office' }],
    phones: [{ id: '1', phone: '+880 1234-567891', type: 'office' }],
    presentAddress: { district: 'Dhaka', address: 'Uttara, Dhaka' },
    permanentAddress: { district: 'Dhaka', address: 'Uttara, Dhaka' },
    experiences: [],
    role: 'moderator',
    joinDate: '2023-02-01',
    lastLogin: new Date().toISOString(),
    isActive: true
  },
  {
    id: '3',
    name: 'John Doe',
    nickNames: ['John'],
    emails: [{ id: '1', email: 'user@onnorokom.com', type: 'personal' }],
    phones: [{ id: '1', phone: '+880 1234-567892', type: 'personal' }],
    presentAddress: { district: 'Dhaka', address: 'Mirpur, Dhaka' },
    permanentAddress: { district: 'Dhaka', address: 'Mirpur, Dhaka' },
    experiences: [],
    role: 'user',
    joinDate: '2023-03-01',
    lastLogin: new Date().toISOString(),
    isActive: true
  }
];

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load users from localStorage or set defaults
    const storedUsers = localStorage.getItem('onnorokom_users');
    const storedCurrentUser = localStorage.getItem('onnorokom_current_user');
    
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(defaultUsers);
      localStorage.setItem('onnorokom_users', JSON.stringify(defaultUsers));
    }

    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple authentication - in real app, this would be API call
    const user = users.find(u => u.emails.some(e => e.email === email));
    if (user && (password === 'admin123' || password === 'password')) {
      const updatedUser = { ...user, lastLogin: new Date().toISOString() };
      setCurrentUser(updatedUser);
      localStorage.setItem('onnorokom_current_user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('onnorokom_current_user');
  };

  const updateProfile = (userData: Partial<User>) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem('onnorokom_current_user', JSON.stringify(updatedUser));
      
      // Update in users list
      const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
      setUsers(updatedUsers);
      localStorage.setItem('onnorokom_users', JSON.stringify(updatedUsers));
    }
  };

  const createUser = (userData: Omit<User, 'id' | 'joinDate' | 'lastLogin'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('onnorokom_users', JSON.stringify(updatedUsers));
  };

  const updateUser = (userId: string, userData: Partial<User>) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, ...userData } : u);
    setUsers(updatedUsers);
    localStorage.setItem('onnorokom_users', JSON.stringify(updatedUsers));
    
    // Update current user if it's the same user
    if (currentUser && currentUser.id === userId) {
      const updatedCurrentUser = { ...currentUser, ...userData };
      setCurrentUser(updatedCurrentUser);
      localStorage.setItem('onnorokom_current_user', JSON.stringify(updatedCurrentUser));
    }
  };

  const deleteUser = (userId: string) => {
    const updatedUsers = users.filter(u => u.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('onnorokom_users', JSON.stringify(updatedUsers));
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!currentUser) return false;
    
    const roleHierarchy = { admin: 3, moderator: 2, user: 1 };
    return roleHierarchy[currentUser.role] >= roleHierarchy[requiredRole];
  };

  return (
    <UserContext.Provider value={{
      currentUser,
      users,
      login,
      logout,
      updateProfile,
      createUser,
      updateUser,
      deleteUser,
      isAuthenticated: !!currentUser,
      hasPermission
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { bangladeshDistricts };
