
import React from 'react';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';

interface PersonalDetailsSectionProps {
  dateOfBirth: string;
  onDateOfBirthChange: (value: string) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  religion: string;
  onReligionChange: (value: string) => void;
  maritalStatus: string;
  onMaritalStatusChange: (value: string) => void;
  labelColor?: string;
  inputBgColor?: string;
  t: (key: string) => string;
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  dateOfBirth,
  onDateOfBirthChange,
  gender,
  onGenderChange,
  religion,
  onReligionChange,
  maritalStatus,
  onMaritalStatusChange,
  labelColor = 'text-[rgb(145,153,165)]',
  inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary',
  t,
}) => (
  <>
    <div>
      <Label htmlFor="dateOfBirth" className={labelColor}>
        {t('register.step2.date_of_birth')}
      </Label>
      <Input
        id="dateOfBirth"
        value={dateOfBirth}
        onChange={(e) => onDateOfBirthChange(e.target.value)}
        placeholder={t('register.step2.date_of_birth_placeholder')}
        className={inputBgColor}
      />
    </div>
    <div>
      <Label htmlFor="gender" className={labelColor}>
        {t('register.step2.gender')}
      </Label>
      <Input
        id="gender"
        value={gender}
        onChange={(e) => onGenderChange(e.target.value)}
        placeholder={t('register.step2.gender')}
        className={inputBgColor}
      />
    </div>
    <div>
      <Label htmlFor="religion" className={labelColor}>
        {t('register.step2.religion')}
      </Label>
      <Input
        id="religion"
        value={religion}
        onChange={(e) => onReligionChange(e.target.value)}
        placeholder={t('register.step2.religion')}
        className={inputBgColor}
      />
    </div>
    <div>
      <Label htmlFor="maritalStatus" className={labelColor}>
        {t('register.step2.marital_status')}
      </Label>
      <Input
        id="maritalStatus"
        value={maritalStatus}
        onChange={(e) => onMaritalStatusChange(e.target.value)}
        placeholder={t('register.step2.marital_status')}
        className={inputBgColor}
      />
    </div>
  </>
);

export default PersonalDetailsSection;
