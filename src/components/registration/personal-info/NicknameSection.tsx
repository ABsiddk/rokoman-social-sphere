
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
    <div className="animate-fade-in rounded-2xl shadow-md p-[1.5px] bg-gradient-to-br from-white/60 via-teal-100/60 to-blue-200/60 dark:from-[rgb(55,65,81)] dark:to-[#29383A] dark:via-[#18303c]/50 mb-2">
      <div className="w-full h-full rounded-[19px] p-4 bg-white/85 dark:bg-[rgb(34,43,60)] transition-colors duration-300 backdrop-blur-xl">
        <Label htmlFor="nickname1" className={`font-medium ${labelColor} dark:text-cyan-100`}>
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
