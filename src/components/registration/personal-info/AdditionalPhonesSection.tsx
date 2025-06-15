
import React from 'react';
import { Input } from '../../ui/input';
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
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
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
      <Input
        id="addPhone1"
        value={additionalPhones?.[0] || ''}
        onChange={(e) => updateAdditionalPhone(e.target.value)}
        placeholder={t('register.step2.additional_phone_placeholder')}
        className={`${inputBgColor} placeholder-white dark:placeholder-white`}
      />
    </div>
  );
};

export default AdditionalPhonesSection;
