
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Plus, X } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface AdditionalPhonesSectionProps {
  additionalPhones: string[];
  onUpdate: (phones: string[]) => void;
}

const AdditionalPhonesSection = ({ additionalPhones, onUpdate }: AdditionalPhonesSectionProps) => {
  const { t } = useLanguage();

  const addAdditionalPhone = () => {
    if (additionalPhones.length < 3) {
      onUpdate([...additionalPhones, '']);
    }
  };

  const removeAdditionalPhone = (index: number) => {
    const newPhones = additionalPhones.filter((_, i) => i !== index);
    onUpdate(newPhones);
  };

  const updateAdditionalPhone = (index: number, value: string) => {
    const newPhones = [...additionalPhones];
    newPhones[index] = value;
    onUpdate(newPhones);
  };

  return (
    <div className="md:col-span-2">
      <Label>{t('register.step2.phone.additional')}</Label>
      {additionalPhones.map((phone, index) => (
        <div key={index} className="flex items-center space-x-2 mt-2">
          <Input
            value={phone}
            onChange={(e) => updateAdditionalPhone(index, e.target.value)}
            placeholder={t('register.step2.phone.additional.placeholder')}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => removeAdditionalPhone(index)}
          >
            <X size={16} />
          </Button>
        </div>
      ))}
      {additionalPhones.length < 3 && (
        <Button
          type="button"
          variant="outline"
          onClick={addAdditionalPhone}
          className="mt-2"
        >
          <Plus size={16} className="mr-2" />
          {t('register.step2.phone.additional.add')}
        </Button>
      )}
    </div>
  );
};

export default AdditionalPhonesSection;
