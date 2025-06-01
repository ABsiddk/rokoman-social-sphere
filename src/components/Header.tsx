
import React, { useState } from 'react';
import { Home, User, BarChart3, Settings, LogIn, UserCircle, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">OnnoRokom Community</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 ${
                isActive('/') ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <Home size={18} />
              <span>Home</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 ${
                isActive('/profile') ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <User size={18} />
              <span>View and Edit Profile</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 ${
                isActive('/dashboard') ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 ${
                isActive('/admin') ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
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
                className="flex items-center bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-1 transition-all duration-300 hover:shadow-lg"
              >
                <div className={`w-8 h-6 rounded-full transition-all duration-300 ${isEnglish ? 'translate-x-0 bg-white' : 'translate-x-6 bg-white'} shadow-md`}>
                  <span className="text-xs font-bold text-gray-800 flex items-center justify-center h-full">
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {isDark ? <Sun className="text-yellow-500" size={20} /> : <Moon className="text-gray-600" size={20} />}
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              <LogIn size={18} />
              <span>Log in</span>
            </Link>

            {/* Profile Icon */}
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
              <UserCircle className="text-gray-600 dark:text-gray-300" size={24} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
