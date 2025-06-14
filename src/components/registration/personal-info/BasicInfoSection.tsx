
import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';

interface BasicInfoSectionProps {
  fullName: string;
  fullNameError?: string;
  onFullNameChange: (value: string) => void;
  nickname1: string;
  onNickname1Change: (value: string) => void;
  nickname2?: string;
  onNickname2Change?: (value: string) => void;
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
  nickname2 = '',
  onNickname2Change,
  labelColor = 'text-[rgb(145,153,165)]',
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}) => {
  // Local state to control the visibility of Nickname 2 input
  const [showNickname2, setShowNickname2] = useState(!!nickname2);

  const handleAddNickname2 = () => setShowNickname2(true);

  return (
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
        <div className="text-xs mt-1 text-[rgb(145,153,165)]">
          {/* Updated help text */}
          {t('register.step2.nickname1_hint') ?? 'The name you are known by in your family and friends.'}
        </div>
      </div>

      <div>
        {!showNickname2 ? (
          <div className="flex items-center gap-2 mt-2">
            <Button
              type="button"
              variant="outline"
              disabled
              className="border-[rgb(145,153,165)] text-[rgb(145,153,165)] cursor-default"
            >
              {t('register.step2.nickname')} 2
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-[rgb(145,153,165)] text-[rgb(145,153,165)]"
              onClick={handleAddNickname2}
            >
              + {t('register.step2.add_nickname') ?? 'Add Nickname'}
            </Button>
          </div>
        ) : (
          <div className="mt-2">
            <Label htmlFor="nickname2" className={labelColor}>
              {t('register.step2.nickname')} 2
            </Label>
            <Input
              id="nickname2"
              value={nickname2}
              onChange={e => onNickname2Change?.(e.target.value)}
              placeholder={t('register.step2.nickname_placeholder')}
              className={inputBgColor}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default BasicInfoSection;
