
import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PasswordFieldsProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (password: string) => void;
  onConfirmPasswordChange: (confirmPassword: string) => void;
  passwordError?: string;
  confirmPasswordError?: string;
}

const PasswordFields = ({ 
  password, 
  confirmPassword, 
  onPasswordChange, 
  onConfirmPasswordChange, 
  passwordError, 
  confirmPasswordError 
}: PasswordFieldsProps) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium text-sm">
          {t('register.step1.password')} <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            placeholder={t('register.step1.password_placeholder')}
            className={`pr-10 h-10 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-sm text-base ${passwordError ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {passwordError && <p className="text-red-500 text-xs font-medium mt-1">{passwordError}</p>}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300 font-medium text-sm">
          {t('register.step1.confirm_password')} <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => onConfirmPasswordChange(e.target.value)}
            placeholder={t('register.step1.confirm_placeholder')}
            className={`pr-10 h-10 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-sm text-base ${confirmPasswordError ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {confirmPasswordError && <p className="text-red-500 text-xs font-medium mt-1">{confirmPasswordError}</p>}
      </div>

      <div className="mt-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 px-3 py-2 rounded-md border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-800 dark:text-blue-200 font-medium">
          {t('register.step1.password_requirements')}
        </p>
      </div>
    </>
  );
};

export default PasswordFields;
