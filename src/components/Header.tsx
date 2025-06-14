
import React from 'react';
import { Home, User, BarChart3, Settings, LogIn, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeControls from './ThemeControls';
import { useLanguage } from '../contexts/LanguageContext';
import { useUser } from '../contexts/UserContext';
import { LogOut } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const { currentUser, logout, isAuthenticated } = useUser();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    // Optionally navigate to home page after logout
    window.location.href = '/';
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
            <span className="text-xl font-bold text-[rgb(39,113,150)] dark:text-white">{t('brand.name')}</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') 
                  ? 'bg-[rgb(39,113,150)]/10 dark:bg-white/10 text-[rgb(39,113,150)] dark:text-white border border-[rgb(39,113,150)]/30' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5 hover:text-[rgb(39,113,150)] dark:hover:text-white'
              }`}
            >
              <Home size={18} />
              <span className="font-medium">{t('nav.home')}</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/profile') 
                  ? 'bg-[rgb(39,113,150)]/10 dark:bg-white/10 text-[rgb(39,113,150)] dark:text-white border border-[rgb(39,113,150)]/30' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5 hover:text-[rgb(39,113,150)] dark:hover:text-white'
              }`}
            >
              <User size={18} />
              <span className="font-medium">{t('nav.profile')}</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/dashboard') 
                  ? 'bg-[rgb(39,113,150)]/10 dark:bg-white/10 text-[rgb(39,113,150)] dark:text-white border border-[rgb(39,113,150)]/30' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5 hover:text-[rgb(39,113,150)] dark:hover:text-white'
              }`}
            >
              <BarChart3 size={18} />
              <span className="font-medium">{t('nav.dashboard')}</span>
            </Link>

            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive('/admin') 
                  ? 'bg-[rgb(39,113,150)]/10 dark:bg-white/10 text-[rgb(39,113,150)] dark:text-white border border-[rgb(39,113,150)]/30' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5 hover:text-[rgb(39,113,150)] dark:hover:text-white'
              }`}
            >
              <Settings size={18} />
              <span className="font-medium">{t('nav.admin')}</span>
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] rounded-full p-1 transition-all duration-300 hover:shadow-lg hover:scale-105 w-16 h-8 focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)]/50"
                aria-label="Toggle Language"
              >
                <div className={`w-8 h-6 rounded-full transition-all duration-300 ${language === 'en' ? 'translate-x-0 bg-white' : 'translate-x-6 bg-white'} shadow-md flex items-center justify-center`}>
                  <span className="text-xs font-bold text-[rgb(39,113,150)]">
                    {language === 'en' ? 'EN' : 'বাং'}
                  </span>
                </div>
              </button>
            </div>

            {/* Theme Controls */}
            <ThemeControls />

            {/* Login/Logout */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[rgb(129,130,135)] dark:text-gray-300 hidden md:block font-medium">
                  {currentUser?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  <LogOut size={18} />
                  <span className="hidden md:block">{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
              >
                <LogIn size={18} />
                <span>{t('nav.login')}</span>
              </Link>
            )}

            {/* Profile Icon */}
            {isAuthenticated && (
              <Link to="/profile">
                <button className="p-2 rounded-lg hover:bg-[rgb(39,113,150)]/5 dark:hover:bg-white/5 transition-all duration-200 hover:scale-110">
                  <UserCircle className="text-[rgb(129,130,135)] dark:text-gray-300 hover:text-[rgb(39,113,150)] dark:hover:text-white transition-colors duration-200" size={24} />
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
