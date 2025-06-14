
import React, { useState } from 'react';
import { Phone, Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import OTPVerification from './OTPVerification';

interface PhonePasswordStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const PhonePasswordStep = ({ data, updateData, onComplete }: PhonePasswordStepProps) => {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showOTPStep, setShowOTPStep] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const countryCodes = [
    { code: '+88', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+1', country: 'USA', flag: '🇺🇸' },
    { code: '+44', country: 'UK', flag: '🇬🇧' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
  ];

  const validatePhone = (phone: string, countryCode: string) => {
    if (countryCode === '+88') {
      // Bangladesh validation
      if (!phone.startsWith('01')) {
        return t('registration.phone.error.bangladesh');
      }
      if (phone.length !== 11) {
        return t('registration.phone.error.length');
      }
    }
    if (!/^\d+$/.test(phone)) {
      return t('registration.phone.error.numbers');
    }
    return '';
  };

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push(t('registration.password.error.length'));
    if (!/[A-Z]/.test(password)) errors.push(t('registration.password.error.uppercase'));
    if (!/[a-z]/.test(password)) errors.push(t('registration.password.error.lowercase'));
    if (!/\d/.test(password)) errors.push(t('registration.password.error.number'));
    if (!/[!@#$%^&*]/.test(password)) errors.push(t('registration.password.error.special'));
    return errors;
  };

  const getPasswordStrength = (password: string) => {
    const errors = validatePassword(password);
    if (errors.length === 0) return 'strong';
    if (errors.length <= 2) return 'medium';
    return 'weak';
  };

  const handlePhoneChange = (value: string) => {
    // Only allow numbers and limit to 11 digits for Bangladesh
    const numbers = value.replace(/\D/g, '');
    if (data.countryCode === '+88' && numbers.length <= 11) {
      updateData({ phone: numbers });
    } else if (data.countryCode !== '+88') {
      updateData({ phone: numbers });
    }
    
    // Clear phone error when user types
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleSendOTP = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate phone
    const phoneError = validatePhone(data.phone, data.countryCode);
    if (phoneError) newErrors.phone = phoneError;
    
    // Validate passwords
    const passwordErrors = validatePassword(data.password);
    if (passwordErrors.length > 0) newErrors.password = passwordErrors.join(', ');
    
    if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = t('registration.password.error.match');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmPhone = () => {
    setShowConfirmModal(false);
    setShowOTPStep(true);
  };

  const handleOTPVerified = () => {
    onComplete();
  };

  if (showOTPStep) {
    return (
      <OTPVerification
        phoneNumber={`${data.countryCode} ${data.phone}`}
        onVerified={handleOTPVerified}
        onBack={() => setShowOTPStep(false)}
      />
    );
  }

  const passwordStrength = getPasswordStrength(data.password);
  const passwordErrors = validatePassword(data.password);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('registration.step1.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('registration.step1.subtitle')}
        </p>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('registration.phone.label')}
        </label>
        <div className="flex space-x-2">
          <Select value={data.countryCode} onValueChange={(value) => updateData({ countryCode: value })}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {countryCodes.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="tel"
              value={data.phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder={data.countryCode === '+88' ? '01XXXXXXXXX' : t('registration.phone.placeholder')}
              className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
            />
          </div>
        </div>
        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('registration.password.new')}
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type={showPassword ? 'text' : 'password'}
            value={data.password}
            onChange={(e) => updateData({ password: e.target.value })}
            placeholder={t('registration.password.placeholder')}
            className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        
        {/* Password Strength Indicator */}
        {data.password && (
          <div className="space-y-2">
            <div className="flex space-x-1">
              <div className={`h-2 flex-1 rounded ${passwordStrength === 'weak' ? 'bg-red-500' : passwordStrength === 'medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
              <div className={`h-2 flex-1 rounded ${passwordStrength === 'medium' || passwordStrength === 'strong' ? 'bg-yellow-500' : 'bg-gray-200'}`} />
              <div className={`h-2 flex-1 rounded ${passwordStrength === 'strong' ? 'bg-green-500' : 'bg-gray-200'}`} />
            </div>
            <div className="space-y-1">
              {passwordErrors.map((error, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <X size={12} className="text-red-500" />
                  <span className="text-red-500">{error}</span>
                </div>
              ))}
              {passwordErrors.length === 0 && data.password && (
                <div className="flex items-center space-x-2 text-sm">
                  <Check size={12} className="text-green-500" />
                  <span className="text-green-500">{t('registration.password.strong')}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('registration.password.confirm')}
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type={showConfirmPassword ? 'text' : 'password'}
            value={data.confirmPassword}
            onChange={(e) => updateData({ confirmPassword: e.target.value })}
            placeholder={t('registration.password.confirm.placeholder')}
            className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>

      <Button 
        onClick={handleSendOTP}
        className="w-full bg-green-600 hover:bg-green-700"
        size="lg"
      >
        {t('registration.send.otp')}
      </Button>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">{t('registration.confirm.phone.title')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{t('registration.confirm.phone.message')}</p>
            <p className="font-semibold text-lg mb-6">{data.countryCode} {data.phone}</p>
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowConfirmModal(false)}
                variant="outline"
                className="flex-1"
              >
                {t('registration.edit')}
              </Button>
              <Button
                onClick={handleConfirmPhone}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {t('registration.confirm')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhonePasswordStep;
