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

// Generate 150 diverse user profiles
const generateUsers = (): User[] => {
  const bangladeshiNames = {
    male: ['Abdur Rahman', 'Mohammad Ali', 'Shahidul Islam', 'Rezaul Karim', 'Aminul Haque', 'Mominul Islam', 'Rafiqul Islam', 'Saiful Islam', 'Mahbubul Alam', 'Nurul Islam'],
    female: ['Fatema Begum', 'Rashida Khatun', 'Nasreen Akter', 'Ruma Begum', 'Salma Khatun', 'Rahima Begum', 'Kulsum Begum', 'Rahela Khatun', 'Farida Begum', 'Rozina Akter']
  };

  const internationalNames = {
    male: ['John Smith', 'David Johnson', 'Michael Brown', 'James Wilson', 'Robert Davis', 'William Miller', 'Richard Garcia', 'Joseph Rodriguez', 'Thomas Anderson', 'Charles Taylor'],
    female: ['Sarah Johnson', 'Emily Davis', 'Jessica Wilson', 'Ashley Brown', 'Amanda Miller', 'Jennifer Garcia', 'Lisa Rodriguez', 'Mary Anderson', 'Karen Taylor', 'Susan Moore']
  };

  const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh'];
  const professions = ['Government Officer', 'Software Engineer', 'Doctor', 'Teacher', 'Business Executive', 'Civil Engineer', 'Banker', 'Lawyer', 'Researcher', 'Consultant'];
  const institutions = ['BUET', 'DU', 'CUET', 'RU', 'JU', 'CU', 'SUST', 'RUET', 'Ministry of Education', 'Ministry of Health'];
  const bcsBatches = ['35th', '36th', '37th', '38th', '39th', '40th', '41st', '42nd', '43rd', '44th'];
  const bcsCadres = ['Admin', 'Police', 'Foreign Affairs', 'Taxation', 'Customs', 'Audit', 'Education', 'Health', 'Engineering', 'Agriculture'];

  const users: User[] = [];

  // Generate Admin profiles (50)
  for (let i = 1; i <= 50; i++) {
    const gender = Math.random() > 0.6 ? 'Male' : 'Female';
    const namePool = Math.random() > 0.7 ? bangladeshiNames : internationalNames;
    const nameArray = gender === 'Male' ? namePool.male : namePool.female;
    const name = nameArray[Math.floor(Math.random() * nameArray.length)];
    
    users.push({
      id: `admin_${i}`,
      name: name + ` A${i}`,
      email: `admin${i}@onnorokom.com`,
      role: 'admin',
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1649972904349-6e44c42644a7' : '1581091226825-a6a2a5aee158'}`,
      phone: `+880 17${Math.floor(Math.random() * 90000000 + 10000000)}`,
      address: `${divisions[Math.floor(Math.random() * divisions.length)]}, Bangladesh`,
      joinDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: Math.random() > 0.1,
      gender,
      dateOfBirth: new Date(1970 + Math.floor(Math.random() * 30), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      religion: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'Christianity' : 'Hinduism') : 'Islam',
      maritalStatus: Math.random() > 0.3 ? 'Married' : 'Single',
      professionType: 'Government',
      institution: 'Government of Bangladesh',
      designation: 'System Administrator',
      bcsBatch: bcsBatches[Math.floor(Math.random() * bcsBatches.length)],
      bcsCadre: bcsCadres[Math.floor(Math.random() * bcsCadres.length)],
      currentlyWorking: true
    });
  }

  // Generate Moderator profiles (50)
  for (let i = 1; i <= 50; i++) {
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const namePool = Math.random() > 0.6 ? bangladeshiNames : internationalNames;
    const nameArray = gender === 'Male' ? namePool.male : namePool.female;
    const name = nameArray[Math.floor(Math.random() * nameArray.length)];
    
    users.push({
      id: `mod_${i}`,
      name: name + ` M${i}`,
      email: `moderator${i}@onnorokom.com`,
      role: 'moderator',
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1518770660439-4636190af475' : '1486312338219-ce68d2c6f44d'}`,
      phone: `+880 15${Math.floor(Math.random() * 90000000 + 10000000)}`,
      address: `${divisions[Math.floor(Math.random() * divisions.length)]}, Bangladesh`,
      joinDate: new Date(2021 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      lastLogin: new Date().toISOString(),
      isActive: Math.random() > 0.05,
      gender,
      dateOfBirth: new Date(1975 + Math.floor(Math.random() * 25), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      religion: Math.random() > 0.85 ? (Math.random() > 0.5 ? 'Christianity' : 'Hinduism') : 'Islam',
      maritalStatus: Math.random() > 0.4 ? 'Married' : 'Single',
      professionType: professions[Math.floor(Math.random() * professions.length)],
      institution: institutions[Math.floor(Math.random() * institutions.length)],
      designation: 'Content Moderator',
      currentlyWorking: true
    });
  }

  // Generate User profiles (50)
  for (let i = 1; i <= 50; i++) {
    const gender = Math.random() > 0.5 ? 'Male' : 'Female';
    const namePool = Math.random() > 0.5 ? bangladeshiNames : internationalNames;
    const nameArray = gender === 'Male' ? namePool.male : namePool.female;
    const name = nameArray[Math.floor(Math.random() * nameArray.length)];
    
    users.push({
      id: `user_${i}`,
      name: name + ` U${i}`,
      email: `user${i}@example.com`,
      role: 'user',
      avatar: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1581092795360-fd1ca04f0952' : '1649972904349-6e44c42644a7'}`,
      phone: `+880 13${Math.floor(Math.random() * 90000000 + 10000000)}`,
      address: `${divisions[Math.floor(Math.random() * divisions.length)]}, Bangladesh`,
      joinDate: new Date(2022 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString(),
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
      isActive: Math.random() > 0.02,
      gender,
      dateOfBirth: new Date(1980 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      religion: Math.random() > 0.9 ? (Math.random() > 0.5 ? 'Christianity' : 'Hinduism') : 'Islam',
      maritalStatus: Math.random() > 0.5 ? 'Married' : 'Single',
      professionType: professions[Math.floor(Math.random() * professions.length)],
      institution: institutions[Math.floor(Math.random() * institutions.length)],
      designation: 'Regular User',
      currentlyWorking: Math.random() > 0.1
    });
  }

  return users;
};

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
  },
  ...generateUsers()
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
