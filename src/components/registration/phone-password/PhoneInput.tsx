
import React from 'react';
import { Phone } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';
import LiquidGlassInput from '../../ui/LiquidGlassInput';

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
      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-600 dark:text-cyan-400 z-10" size={18} />
      <LiquidGlassInput
        id="phone"
        type="tel"
        value={value}
        onChange={(e) => handlePhoneChange(e.target.value)}
        placeholder="+88 01XXXXXXXXX"
        maxLength={11}
        className={`pl-10 h-12 w-full font-medium transition-all duration-200 ${error ? 'border-red-500 focus:border-red-500 dark:focus:border-red-400' : ''}`}
        autoFocus
        autoComplete="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        aria-label={t('register.step1.phone')}
        error={error}
        style={{
          // Ensures fluid responsive glass effect
          minWidth: 0,
          width: '100%',
        }}
      />
    </div>
  );
};

export default PhoneInput;
