
import React from 'react';
import LiquidGlassInput from '../../ui/LiquidGlassInput';
import { Label } from '../../ui/label';

interface EmailSectionProps {
  personalEmail: string;
  personalEmailError?: string;
  onPersonalEmailChange: (value: string) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const EmailSection: React.FC<EmailSectionProps> = ({
  personalEmail,
  personalEmailError,
  onPersonalEmailChange,
  labelColor = 'text-[rgb(145,153,165)]',
  t,
}) => (
  <div className="animate-fade-in rounded-2xl shadow-md p-[1.5px] bg-gradient-to-br from-white/60 via-teal-100/60 to-blue-200/60 dark:from-[rgb(55,65,81)] dark:to-[#29383A] dark:via-[#18303c]/50">
    <div className="w-full h-full rounded-[19px] p-4 bg-white/85 dark:bg-[rgb(34,43,60)] transition-colors duration-300 backdrop-blur-xl">
      <Label htmlFor="personalEmail" className={`${labelColor} font-medium dark:text-cyan-100`}>
        {t('register.step2.personal_email')}
      </Label>
      <LiquidGlassInput
        id="personalEmail"
        type="email"
        value={personalEmail}
        onChange={(e) => onPersonalEmailChange(e.target.value)}
        placeholder={t('register.step2.personal_email_placeholder')}
        autoComplete="off"
        error={personalEmailError}
      />
      {personalEmailError && <p className="text-red-500 text-sm mt-1">{personalEmailError}</p>}
    </div>
  </div>
);

export default EmailSection;
