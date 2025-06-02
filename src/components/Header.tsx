
import React, { useState } from 'react';
import { Home, User, BarChart3, Settings, LogIn, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeControls from './ThemeControls';

const Header = () => {
  const [isEnglish, setIsEnglish] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <header className="bg-white dark:bg-[rgb(39,113,150)] shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-[rgb(129,130,135)]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-[rgb(39,113,150)] dark:text-white">OnnoRokom Community</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-[rgb(39,113,150)]/10 dark:bg-white/10 text-[rgb(39,113,150)] dark:text-white border border-[rgb(39,113,150)]/30' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/profile') 
                  ? 'bg-[rgb(39,113,150)]/10 dark:bg-white/10 text-[rgb(39,113,150)] dark:text-white border border-[rgb(39,113,150)]/30' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5'
              }`}
            >
              <User size={18} />
              <span>View and Edit Profile</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/dashboard') 
                  ? 'bg-[rgb(39,113,150)]/10 dark:bg-white/10 text-[rgb(39,113,150)] dark:text-white border border-[rgb(39,113,150)]/30' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5'
              }`}
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/admin') 
                  ? 'bg-[rgb(39,113,150)]/10 dark:bg-white/10 text-[rgb(39,113,150)] dark:text-white border border-[rgb(39,113,150)]/30' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5'
              }`}
            >
              <Settings size={18} />
              <span>Administration and Properties</span>
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] rounded-full p-1 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-8 h-6 rounded-full transition-all duration-300 ${isEnglish ? 'translate-x-0 bg-white' : 'translate-x-6 bg-white'} shadow-md`}>
                  <span className="text-xs font-bold text-[rgb(39,113,150)] flex items-center justify-center h-full">
                    {isEnglish ? 'EN' : 'বাং'}
                  </span>
                </div>
                <div className={`w-8 h-6 rounded-full transition-all duration-300 ${!isEnglish ? 'translate-x-0' : '-translate-x-6'} flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white">
                    {!isEnglish ? 'EN' : 'বাং'}
                  </span>
                </div>
              </button>
            </div>

            {/* Theme Controls */}
            <ThemeControls />

            {/* Login */}
            <Link
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <LogIn size={18} />
              <span>Log in</span>
            </Link>

            {/* Profile Icon */}
            <button className="p-2 rounded-lg hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5 transition-all duration-200">
              <UserCircle className="text-[rgb(129,130,135)] dark:text-gray-300" size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
