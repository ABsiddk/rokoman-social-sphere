
import React, { useState } from 'react';
import { User, Camera, Mail, Phone, MapPin, Calendar, Shield, Save, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useUser } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const ProfileForm = () => {
  const { currentUser, updateProfile } = useUser();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: t('profile.update.success.title'),
      description: t('profile.update.success.message')
    });
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      address: currentUser?.address || ''
    });
    setIsEditing(false);
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[rgb(39,113,150)] to-[rgb(129,130,135)] p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User size={40} />
            </div>
            <button className="absolute -bottom-1 -right-1 bg-white text-[rgb(39,113,150)] p-1 rounded-full">
              <Camera size={16} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{currentUser.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Shield size={16} />
              <span className="capitalize">{currentUser.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {t('profile.personal.info')}
          </h3>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90">
              <User size={16} className="mr-2" />
              {t('profile.edit')}
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} size="sm" className="bg-green-600 hover:bg-green-700">
                <Save size={16} className="mr-1" />
                {t('common.save')}
              </Button>
              <Button onClick={handleCancel} size="sm" variant="outline">
                <X size={16} className="mr-1" />
                {t('common.cancel')}
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <User size={16} className="mr-2" />
              {t('profile.name')}
            </label>
            {isEditing ? (
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="border-[rgb(129,130,135)]/30 focus:border-[rgb(39,113,150)]"
              />
            ) : (
              <p className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-2 rounded">
                {currentUser.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <Mail size={16} className="mr-2" />
              {t('profile.email')}
            </label>
            {isEditing ? (
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="border-[rgb(129,130,135)]/30 focus:border-[rgb(39,113,150)]"
              />
            ) : (
              <p className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-2 rounded">
                {currentUser.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <Phone size={16} className="mr-2" />
              {t('profile.phone')}
            </label>
            {isEditing ? (
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="border-[rgb(129,130,135)]/30 focus:border-[rgb(39,113,150)]"
              />
            ) : (
              <p className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-2 rounded">
                {currentUser.phone || t('profile.not.provided')}
              </p>
            )}
          </div>

          {/* Address Field */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
              <MapPin size={16} className="mr-2" />
              {t('profile.address')}
            </label>
            {isEditing ? (
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="border-[rgb(129,130,135)]/30 focus:border-[rgb(39,113,150)]"
              />
            ) : (
              <p className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-2 rounded">
                {currentUser.address || t('profile.not.provided')}
              </p>
            )}
          </div>
        </div>

        {/* Account Information */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            {t('profile.account.info')}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-[rgb(129,130,135)]" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('profile.join.date')}: {new Date(currentUser.joinDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-[rgb(129,130,135)]" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {t('profile.last.login')}: {new Date(currentUser.lastLogin).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
