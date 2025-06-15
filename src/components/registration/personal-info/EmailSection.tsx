
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface EmailSectionProps {
  personalEmail: string;
  personalEmailError?: string;
  onPersonalEmailChange: (value: string) => void;
  officialEmail: string;
  officialEmailError?: string;
  onOfficialEmailChange: (value: string) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const EmailSection: React.FC<EmailSectionProps> = ({
  personalEmail,
  personalEmailError,
  onPersonalEmailChange,
  officialEmail,
  officialEmailError,
  onOfficialEmailChange,
  labelColor = 'text-[rgb(145,153,165)]',
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}) => (
  <>
    <div>
      <Label htmlFor="personalEmail" className={labelColor}>{t('register.step2.personal_email')}</Label>
      <Input
        id="personalEmail"
        type="email"
        value={personalEmail}
        onChange={(e) => onPersonalEmailChange(e.target.value)}
        placeholder={t('register.step2.personal_email_placeholder')}
        className={`${inputBgColor} placeholder-white dark:placeholder-white ${personalEmailError ? 'border-red-500' : ''}`}
        autoComplete="off"
      />
      {personalEmailError && <p className="text-red-500 text-sm mt-1">{personalEmailError}</p>}
    </div>
    <div>
      <Label htmlFor="officialEmail" className={labelColor}>{t('register.step2.official_email')}</Label>
      <Input
        id="officialEmail"
        type="email"
        value={officialEmail}
        onChange={(e) => onOfficialEmailChange(e.target.value)}
        placeholder={t('register.step2.official_email_placeholder')}
        className={`${inputBgColor} placeholder-white dark:placeholder-white ${officialEmailError ? 'border-red-500' : ''}`}
        autoComplete="off"
      />
      {officialEmailError && <p className="text-red-500 text-sm mt-1">{officialEmailError}</p>}
    </div>
  </>
);

export default EmailSection;
