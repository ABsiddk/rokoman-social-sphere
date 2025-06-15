import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'moderator' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  joinDate: string;
  lastLogin: string;
  isActive: boolean;

  // extended fields
  nickNames?: string[];
  personalEmail?: string;
  additionalPhones?: string[];
  dateOfBirth?: string;
  gender?: string;
  religion?: string;
  maritalStatus?: string;
  presentAddress?: Record<string, string>;
  permanentAddress?: Record<string, string>;
  professionType?: string;
  institution?: string;
  department?: string;
  designation?: string;
  jobLocation?: string;
  startDate?: string;
  endDate?: string;
  bcsBatch?: string;
  bcsCadre?: string;
  currentlyWorking?: boolean;
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

const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@onnorokom.com',
    role: 'admin',
    phone: '+880 1234-567890',
    address: 'Dhaka, Bangladesh',
    joinDate: '2023-01-01',
    lastLogin: new Date().toISOString(),
    isActive: true
  },
  {
    id: '2',
    name: 'Content Moderator',
    email: 'moderator@onnorokom.com',
    role: 'moderator',
    phone: '+880 1234-567891',
    address: 'Dhaka, Bangladesh',
    joinDate: '2023-02-01',
    lastLogin: new Date().toISOString(),
    isActive: true
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'user@onnorokom.com',
    role: 'user',
    phone: '+880 1234-567892',
    address: 'Dhaka, Bangladesh',
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
    const user = users.find(u => u.email === email);
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
