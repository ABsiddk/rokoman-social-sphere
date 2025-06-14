
import React from 'react';
import { Input } from '../../ui/input';
import { Phone } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  countryCode: string;
  error?: string;
}

const PhoneInput = ({ value, onChange, countryCode, error }: PhoneInputProps) => {
  const { t } = useLanguage();

  const handlePhoneChange = (inputValue: string) => {
    const numbers = inputValue.replace(/\D/g, '');
    if (countryCode === '+88' && numbers.length <= 11) {
      onChange(numbers);
    } else if (countryCode !== '+88') {
      onChange(numbers);
    }
  };

  return (
    <div className="relative flex-1">
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
      <Input
        id="phone"
        type="tel"
        value={value}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder={t('register.step1.phone_placeholder')}
        className={`pl-10 h-12 bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium hover:border-blue-300 dark:hover:border-blue-500 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 shadow-sm ${error ? 'border-red-500 focus:border-red-500' : ''}`}
      />
    </div>
  );
};

export default PhoneInput;
