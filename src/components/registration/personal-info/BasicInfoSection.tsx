import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import LiquidGlassButton from '../../ui/LiquidGlassButton';

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

const teamCream = 'text-[#ffe6b2]'; // Cream color for main label
const redHighlight = 'text-red-500'; // For error/highlight
const fullNameLabelRed = '!text-[#ff4545]'; // Cartoonish red, force override

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  fullName,
  fullNameError,
  onFullNameChange,
  nickname1,
  onNickname1Change,
  nickname2 = '',
  onNickname2Change,
  labelColor = teamCream,
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}) => {
  // REMOVE all nickname button logic – only show Nickname 1 as requested

  return (
    <>
      <div className="md:col-span-2 animate-fade-in">
        {/* Force label text and color for full name */}
        <Label
          htmlFor="fullName"
          className="font-semibold"
          style={{ color: "#ff4545" }}
        >
          সনদ অনুযায়ী আপনার পূর্ণ নাম লিখুন *
        </Label>
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => onFullNameChange(e.target.value)}
          placeholder={t('register.step2.full_name_placeholder')}
          className={`${inputBgColor} ${fullNameError ? 'border-red-500' : ''}`}
          autoComplete="off"
        />
        {fullNameError && (
          <p className={`${redHighlight} text-sm mt-1`}>
            {fullNameError}
          </p>
        )}
      </div>

      <div className="animate-fade-in">
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
        <div className={`text-xs mt-1 ${teamCream}`}>
          {t('register.step2.nickname1_hint') ?? 'The name you are known by in your family and friends.'}
        </div>
      </div>
      {/* No more nickname-related buttons */}
    </>
  );
};

export default BasicInfoSection;
