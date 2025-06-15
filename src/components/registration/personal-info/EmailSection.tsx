
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
  <>
    <div>
      <Label htmlFor="personalEmail" className={labelColor}>{t('register.step2.personal_email')}</Label>
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
  </>
);

export default EmailSection;
