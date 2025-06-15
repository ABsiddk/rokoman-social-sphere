
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
      {/* Changed label as requested */}
      <Label
        htmlFor="fullName"
        className="font-semibold"
        style={{ color: "#fff" }}
      >
        Enter your full name as per certificate
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
  );
};

export default BasicInfoSection;
