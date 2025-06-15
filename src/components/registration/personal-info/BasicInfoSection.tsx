
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface BasicInfoSectionProps {
  fullName: string;
  fullNameError?: string;
  onFullNameChange: (value: string) => void;
  // Ignore nickname fields for this version
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const fullNameLabelRed = '!text-[#ff4545]'; // Cartoonish red, force override
const redHighlight = 'text-red-500';

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  fullName,
  fullNameError,
  onFullNameChange,
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}) => {

  return (
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
      {/* No nickname fields, no buttons */}
    </div>
  );
};

export default BasicInfoSection;
