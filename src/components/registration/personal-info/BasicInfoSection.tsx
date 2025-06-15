
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import styles from '../../registration/phone-password/LiquidGlassButton.module.css';

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
        // Add both the glass-effect class and entry animation
        className={`
          ${styles.liquidGlassButton}
          text-white
          px-5 py-3 rounded-xl font-semibold text-base
          shadow-md
          focus:outline-none
          transition-all duration-200
          animate-fade-in
          hover:scale-105 
          active:scale-100
          backdrop-blur-sm
          ${fullNameError ? 'border-red-500' : ''}
        `}
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

