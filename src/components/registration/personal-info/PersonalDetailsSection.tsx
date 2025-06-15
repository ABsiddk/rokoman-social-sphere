
import React from 'react';
import { Label } from '../../ui/label';
import LiquidGlassSelect from '../../ui/LiquidGlassSelect';
import LiquidGlassInput from '../../ui/LiquidGlassInput';
import { useSelectOptions } from './SelectOptions';

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
  t,
}) => {
  const { genderOptions, religionOptions, maritalStatusOptions } = useSelectOptions();

  const glassWrap = "rounded-2xl shadow-md p-[1.5px] bg-gradient-to-br from-white/60 via-teal-100/60 to-blue-200/60 dark:from-[rgb(55,65,81)] dark:to-[#29383A] dark:via-[#18303c]/50 mb-2";
  const inner = "w-full h-full rounded-[19px] p-4 bg-white/85 dark:bg-[rgb(34,43,60)] transition-colors duration-300 backdrop-blur-xl";

  return (
    <>
      <div className={glassWrap + " animate-fade-in"}>
        <div className={inner}>
          <Label htmlFor="dateOfBirth" className={`${labelColor} dark:text-cyan-100`}>
            {t('register.step2.date_of_birth')}
          </Label>
          <LiquidGlassInput
            id="dateOfBirth"
            type="date"
            value={dateOfBirth || ''}
            onChange={e => onDateOfBirthChange(e.target.value)}
            placeholder={t('register.step2.date_of_birth_placeholder')}
            autoComplete="off"
            className="w-full"
          />
        </div>
      </div>
      <div className={glassWrap + " animate-fade-in"}>
        <div className={inner}>
          <Label htmlFor="gender" className={`${labelColor} dark:text-cyan-100`}>
            {t('register.step2.gender')}
          </Label>
          <LiquidGlassSelect
            value={gender}
            onValueChange={onGenderChange}
            options={genderOptions}
            placeholder={t('register.step2.gender_placeholder')}
            id="gender"
          />
        </div>
      </div>
      <div className={glassWrap + " animate-fade-in"}>
        <div className={inner}>
          <Label htmlFor="religion" className={`${labelColor} dark:text-cyan-100`}>
            {t('register.step2.religion')}
          </Label>
          <LiquidGlassSelect
            value={religion}
            onValueChange={onReligionChange}
            options={religionOptions}
            placeholder={t('register.step2.religion_placeholder')}
            id="religion"
          />
        </div>
      </div>
      <div className={glassWrap + " animate-fade-in"}>
        <div className={inner}>
          <Label htmlFor="maritalStatus" className={`${labelColor} dark:text-cyan-100`}>
            {t('register.step2.marital_status')}
          </Label>
          <LiquidGlassSelect
            value={maritalStatus}
            onValueChange={onMaritalStatusChange}
            options={maritalStatusOptions}
            placeholder={t('register.step2.marital_placeholder')}
            id="maritalStatus"
          />
        </div>
      </div>
    </>
  );
};

export default PersonalDetailsSection;
