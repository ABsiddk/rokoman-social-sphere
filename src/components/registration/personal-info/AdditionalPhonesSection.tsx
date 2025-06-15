
import React from 'react';
import LiquidGlassInput from '../../ui/LiquidGlassInput';
import { Label } from '../../ui/label';

interface AdditionalPhonesSectionProps {
  additionalPhones: string[];
  onUpdate: (phones: string[]) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const AdditionalPhonesSection = ({
  additionalPhones,
  onUpdate,
  labelColor = 'text-[rgb(145,153,165)]',
  t,
}: AdditionalPhonesSectionProps) => {
  // Only one additional phone field allowed
  const updateAdditionalPhone = (value: string) => {
    onUpdate([value]);
  };

  return (
    <div className="animate-fade-in rounded-2xl shadow-md p-[1.5px] bg-gradient-to-br from-white/60 via-teal-100/60 to-blue-200/60 dark:from-[rgb(55,65,81)] dark:to-[#29383A] dark:via-[#18303c]/50">
      <div className="w-full h-full rounded-[19px] p-4 bg-white/85 dark:bg-[rgb(34,43,60)] transition-colors duration-300 backdrop-blur-xl">
        <Label htmlFor="addPhone1" className={`${labelColor} font-medium dark:text-cyan-100`}>
          {t('register.step2.additional_phone')}
        </Label>
        <LiquidGlassInput
          id="addPhone1"
          value={additionalPhones?.[0] || ''}
          onChange={(e) => updateAdditionalPhone(e.target.value)}
          placeholder={t('register.step2.additional_phone_placeholder')}
          autoComplete="off"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default AdditionalPhonesSection;
