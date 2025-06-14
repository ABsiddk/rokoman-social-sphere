
import React from 'react';
import { Input } from '../../ui/input';
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
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}: NicknameSectionProps) => {

  const updateNickname = (idx: number, value: string) => {
    const updated = [...nickNames];
    updated[idx] = value;
    onUpdate(updated);
  };

  // Renders nicknames 2–5
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={i + 1}>
          <Label htmlFor={`nickname${i + 2}`} className={labelColor}>{t('register.step2.nickname')} {i + 2}</Label>
          <Input
            id={`nickname${i + 2}`}
            value={nickNames?.[i + 1] || ''}
            onChange={(e) => updateNickname(i + 1, e.target.value)}
            placeholder={t('register.step2.nickname_placeholder')}
            className={inputBgColor}
          />
        </div>
      ))}
    </>
  );
};

export default NicknameSection;
