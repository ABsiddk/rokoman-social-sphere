
import React from 'react';
import LiquidGlassInput from '../../ui/LiquidGlassInput';
import { Label } from '../../ui/label';

interface BasicInfoSectionProps {
  fullName: string;
  fullNameError?: string;
  onFullNameChange: (value: string) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  fullName,
  fullNameError,
  onFullNameChange,
  labelColor = 'text-[rgb(145,153,165)]',
  t,
}) => {
  return (
    <div className="animate-fade-in rounded-2xl shadow-md p-[1.5px] bg-gradient-to-br from-white/60 via-teal-100/60 to-blue-200/60 dark:from-[rgb(55,65,81)] dark:to-[#29383A] dark:via-[#18303c]/50 mb-2">
      <div className="w-full h-full rounded-[19px] p-4 bg-white/85 dark:bg-[rgb(34,43,60)] transition-colors duration-300 backdrop-blur-xl">
        <Label
          htmlFor="fullName"
          className={`font-medium ${labelColor} dark:text-cyan-100`}
        >
          {t('register.step2.full_name')}
        </Label>
        <LiquidGlassInput
          id="fullName"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          placeholder={t('register.step2.full_name_placeholder')}
          autoComplete="off"
          error={fullNameError}
        />
        {fullNameError && (
          <p className="text-red-500 text-sm mt-1">
            {fullNameError}
          </p>
        )}
      </div>
    </div>
  );
};

export default BasicInfoSection;
