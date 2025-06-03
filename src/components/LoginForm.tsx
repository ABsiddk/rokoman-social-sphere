
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const LoginForm = () => {
  const { login } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        toast({
          title: t('login.success.title'),
          description: t('login.success.message')
        });
        navigate('/dashboard');
      } else {
        toast({
          title: t('login.error.title'),
          description: t('login.error.message'),
          variant: 'destructive'
        });
      }
    } catch (error) {
      toast({
        title: t('login.error.title'),
        description: t('login.error.unexpected'),
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@onnorokom.com', role: 'Admin', password: 'admin123' },
    { email: 'moderator@onnorokom.com', role: 'Moderator', password: 'password' },
    { email: 'user@onnorokom.com', role: 'User', password: 'password' }
  ];

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {t('login.welcome.back')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('login.subtitle')}
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <Mail size={16} className="mr-2" />
              {t('login.email')}
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder={t('login.email.placeholder')}
              className="border-[rgb(129,130,135)]/30 focus:border-[rgb(39,113,150)]"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <Lock size={16} className="mr-2" />
              {t('login.password')}
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                placeholder={t('login.password.placeholder')}
                className="border-[rgb(129,130,135)]/30 focus:border-[rgb(39,113,150)] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] hover:from-[rgb(39,113,150)]/90 hover:to-[rgb(129,130,135)]/90"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('login.signing.in')}
              </div>
            ) : (
              <>
                <LogIn size={16} className="mr-2" />
                {t('login.sign.in')}
              </>
            )}
          </Button>
        </form>

        {/* Demo Accounts */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
            {t('login.demo.accounts')}
          </h3>
          <div className="space-y-2">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => setFormData({ email: account.email, password: account.password })}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-600"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {account.role}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {account.email}
                    </div>
                  </div>
                  <UserPlus size={16} className="text-[rgb(39,113,150)]" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
