
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
    window.location.href = '/';
  };

  return (
    <header className="bg-white dark:bg-gradient-to-r dark:from-[rgb(39,113,150)] dark:via-[rgb(54,128,165)] dark:to-[rgb(39,113,150)] shadow-lg sticky top-0 z-50 transition-all duration-300 border-b border-[rgb(129,130,135)]/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-white font-bold text-lg drop-shadow-md">O</span>
            </div>
            <span className="text-xl font-bold">
              <span className="text-white drop-shadow-sm">OnnoRokom</span>
              <span className="bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] bg-clip-text text-transparent dark:text-[rgb(129,130,135)]"> Community</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive('/') 
                  ? 'bg-[rgb(39,113,150)] text-white dark:bg-white/10 dark:text-white border border-[rgb(39,113,150)]' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-white/5 hover:text-[rgb(39,113,150)] dark:hover:text-white'
              }`}
            >
              <Home size={18} />
              <span>{t('nav.home')}</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive('/profile') 
                  ? 'bg-[rgb(39,113,150)] text-white dark:bg-white/10 dark:text-white border border-[rgb(39,113,150)]' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-white/5 hover:text-[rgb(39,113,150)] dark:hover:text-white'
              }`}
            >
              <User size={18} />
              <span>{t('nav.profile')}</span>
            </Link>

            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive('/dashboard') 
                  ? 'bg-[rgb(39,113,150)] text-white dark:bg-white/10 dark:text-white border border-[rgb(39,113,150)]' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-white/5 hover:text-[rgb(39,113,150)] dark:hover:text-white'
              }`}
            >
              <BarChart3 size={18} />
              <span>{t('nav.dashboard')}</span>
            </Link>

            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                isActive('/admin') 
                  ? 'bg-[rgb(39,113,150)] text-white dark:bg-white/10 dark:text-white border border-[rgb(39,113,150)]' 
                  : 'text-[rgb(129,130,135)] dark:text-gray-300 hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-white/5 hover:text-[rgb(39,113,150)] dark:hover:text-white'
              }`}
            >
              <Settings size={18} />
              <span>{t('nav.admin')}</span>
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="relative">
              <button
                onClick={toggleLanguage}
                className="flex items-center bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] rounded-full p-1 transition-all duration-300 hover:shadow-lg hover:scale-105 w-16 h-8 focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)]/50 hover:from-[rgb(45,125,165)] hover:via-[rgb(85,155,195)] hover:to-[rgb(139,140,145)]"
                aria-label="Toggle Language"
              >
                <div className={`w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-md flex items-center justify-center ${
                  language === 'en' ? 'translate-x-0' : 'translate-x-8'
                }`}>
                  <span className="text-xs font-bold bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] bg-clip-text text-transparent">
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
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 dark:from-red-600 dark:via-red-700 dark:to-red-800 dark:hover:from-red-700 dark:hover:via-red-800 dark:hover:to-red-900 text-white rounded-lg transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  <LogOut size={18} />
                  <span className="hidden md:block">{t('nav.logout')}</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-[rgb(39,113,150)] via-[rgb(75,145,185)] to-[rgb(129,130,135)] text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium hover:from-[rgb(45,125,165)] hover:via-[rgb(85,155,195)] hover:to-[rgb(139,140,145)]"
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
