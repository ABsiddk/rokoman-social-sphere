
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
    <div>
      <Label htmlFor="addPhone1" className={labelColor}>
        {t('register.step2.additional_phone')}
      </Label>
      <LiquidGlassInput
        id="addPhone1"
        value={additionalPhones?.[0] || ''}
        onChange={(e) => updateAdditionalPhone(e.target.value)}
        placeholder={t('register.step2.additional_phone_placeholder')}
        autoComplete="off"
      />
    </div>
  );
};

export default AdditionalPhonesSection;
