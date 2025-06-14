
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
  const updateAdditionalPhone = (idx: number, value: string) => {
    const updated = [...additionalPhones];
    updated[idx] = value;
    onUpdate(updated);
  };

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i}>
          <Label htmlFor={`addPhone${i + 1}`} className={labelColor}>
            {t('register.step2.additional_phone')} {i + 1}
          </Label>
          <Input
            id={`addPhone${i + 1}`}
            value={additionalPhones?.[i] || ''}
            onChange={(e) => updateAdditionalPhone(i, e.target.value)}
            placeholder={t('register.step2.additional_phone_placeholder')}
            className={inputBgColor}
          />
        </div>
      ))}
    </>
  );
};

export default AdditionalPhonesSection;
