
import React from 'react';
import { Input } from '../../ui/input';
import { Phone } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const PhoneInput = ({ value, onChange, error }: PhoneInputProps) => {
  const { t } = useLanguage();

  const handlePhoneChange = (inputValue: string) => {
    // Bangladesh only (max 11 digits, must start with 01)
    const numbers = inputValue.replace(/\D/g, '');
    if (numbers.length <= 11) {
      onChange(numbers);
    }
  };

  return (
    <div className="relative flex-1">
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-600 dark:text-cyan-400" size={18} />
      <Input
        id="phone"
        type="tel"
        value={value}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder="+88 01XXXXXXXXX"
        maxLength={11}
        className={`pl-10 h-12 rounded-xl
          bg-white dark:bg-[#102C32]/80
          text-gray-900 dark:text-cyan-100
          placeholder-gray-500 dark:placeholder-cyan-200
          font-medium
          border-2 border-cyan-200 dark:border-cyan-800
          shadow-sm
          focus:border-cyan-500 dark:focus:border-cyan-400
          focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-800
          transition-all duration-200
          ${error ? 'border-red-500 focus:border-red-500 dark:focus:border-red-400' : ''}
        `}
        autoFocus
        autoComplete="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={t('register.step1.phone')}
      />
    </div>
  );
};

export default PhoneInput;
