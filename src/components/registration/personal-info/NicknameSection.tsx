
import React from 'react';
import LiquidGlassInput from '../../ui/LiquidGlassInput';
import { Label } from '../../ui/label';

interface NicknameSectionProps {
  nickNames: string[];
  onUpdate: (nickNames: string[]) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const NicknameSection = ({
  nickNames,
  onUpdate,
  labelColor = 'text-[rgb(145,153,165)]',
  t,
}: NicknameSectionProps) => {
  // Handle change for just the first nickname only
  const handleChange = (value: string) => {
    const updated = [...(nickNames ?? [''])];
    updated[0] = value;
    onUpdate(updated);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-2">
        <Label htmlFor="nickname1" className={labelColor}>
          {t('register.step2.nickname')}
        </Label>
        <LiquidGlassInput
          id="nickname1"
          value={nickNames?.[0] || ''}
          onChange={e => handleChange(e.target.value)}
          placeholder={t('register.step2.nickname_placeholder')}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default NicknameSection;
