import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Phone, Eye, EyeOff } from 'lucide-react';
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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

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

    setShowConfirmation(true);
  };

  const handleConfirmPhone = () => {
    setShowConfirmation(false);
    setShowOTP(true);
  };

  const handleOTPVerified = () => {
    onComplete();
  };

  if (showOTP) {
    return (
      <OTPVerification
        phoneNumber={`${data.countryCode} ${data.phone}`}
        onVerified={onComplete}
        onBack={() => setShowOTP(false)}
      />
    );
  }

  if (showConfirmation) {
    return (
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          {t('register.step1.phone_confirmation')}
        </h2>
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
            {data.countryCode} {data.phone}
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setShowConfirmation(false)}
            variant="outline"
            className="bg-white dark:bg-gray-700 border-[rgb(39,113,150)] text-[rgb(39,113,150)] dark:text-white hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-gray-600"
          >
            {t('register.step1.edit_phone')}
          </Button>
          <Button
            onClick={() => setShowOTP(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            {t('register.step1.confirm_phone')}
          </Button>
        </div>
      </div>
    );
  }

  const passwordStrength = getPasswordStrength(data.password);
  const passwordErrors = validatePassword(data.password);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.step1.title')}
        </h2>
      </div>

      <div className="space-y-4">
        {/* Country Code and Phone Number */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
            {t('register.step1.phone')}
          </Label>
          <div className="flex gap-2">
            <Select value={data.countryCode} onValueChange={(value) => updateData({ countryCode: value })}>
              <SelectTrigger className="w-32 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                <SelectItem value="+88" className="text-gray-900 dark:text-white">+88 Bangladesh</SelectItem>
                <SelectItem value="+1" className="text-gray-900 dark:text-white">+1 USA</SelectItem>
                <SelectItem value="+91" className="text-gray-900 dark:text-white">+91 India</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => updateData({ phone: e.target.value })}
                placeholder={t('register.step1.phone_placeholder')}
                className={`pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${errors.phone ? 'border-red-500' : ''}`}
              />
            </div>
          </div>
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
        </div>

        {/* Password Fields */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 dark:text-gray-300">
            {t('register.step1.password')}
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => updateData({ password: e.target.value })}
              placeholder={t('register.step1.password_placeholder')}
              className={`pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${errors.password ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-700 dark:text-gray-300">
            {t('register.step1.confirm_password')}
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={data.confirmPassword}
              onChange={(e) => updateData({ confirmPassword: e.target.value })}
              placeholder={t('register.step1.confirm_placeholder')}
              className={`pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : ''}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            {t('register.step1.password_requirements')}
          </p>
        </div>

        <Button
          onClick={handleSendOTP}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          size="lg"
        >
          {t('register.step1.send_otp')}
        </Button>
      </div>
    </div>
  );
};

export default PhonePasswordStep;
