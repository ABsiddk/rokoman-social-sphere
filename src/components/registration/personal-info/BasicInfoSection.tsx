
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface BasicInfoSectionProps {
  fullName: string;
  fullNameError?: string;
  onFullNameChange: (value: string) => void;
  nickname1: string;
  onNickname1Change: (value: string) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  fullName,
  fullNameError,
  onFullNameChange,
  nickname1,
  onNickname1Change,
  labelColor = 'text-[rgb(145,153,165)]',
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}) => (
  <>
    <div className="md:col-span-2">
      <Label htmlFor="fullName" className={labelColor}>
        {t('register.step2.full_name')} *
      </Label>
      <Input
        id="fullName"
        value={fullName}
        onChange={(e) => onFullNameChange(e.target.value)}
        placeholder={t('register.step2.full_name_placeholder')}
        className={`${inputBgColor} ${fullNameError ? 'border-red-500' : ''}`}
        autoComplete="off"
      />
      {fullNameError && <p className="text-red-500 text-sm mt-1">{fullNameError}</p>}
    </div>
    <div>
      <Label htmlFor="nickname1" className={labelColor}>
        {t('register.step2.nickname')} 1
      </Label>
      <Input
        id="nickname1"
        value={nickname1}
        onChange={(e) => onNickname1Change(e.target.value)}
        placeholder={t('register.step2.nickname_placeholder')}
        className={inputBgColor}
      />
    </div>
  </>
);

export default BasicInfoSection;
