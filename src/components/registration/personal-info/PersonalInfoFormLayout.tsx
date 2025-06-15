
import React from 'react';
import BasicInfoSection from './BasicInfoSection';
import NicknameSection from './NicknameSection';
import PersonalDetailsSection from './PersonalDetailsSection';
import EmailSection from './EmailSection';
import AdditionalPhonesSection from './AdditionalPhonesSection';
import LiquidGlassSiennaButton from '../../ui/LiquidGlassSiennaButton';
import { useLanguage } from '../../../contexts/LanguageContext';

const labelColor = 'text-[rgb(145,153,165)]';
const inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary';

interface PersonalInfoFormLayoutProps {
  data: {
    fullName: string;
    nickNames: string[];
    dateOfBirth: string;
    gender: string;
    religion: string;
    maritalStatus: string;
    personalEmail: string;
    additionalPhones: string[];
  };
  errors: Record<string, string>;
  updateData: (data: Partial<PersonalInfoFormLayoutProps['data']>) => void;
  onSubmit: () => void;
}

const PersonalInfoFormLayout: React.FC<PersonalInfoFormLayoutProps> = ({
  data,
  errors,
  updateData,
  onSubmit,
}) => {
  const { t } = useLanguage();

  return (
    <form
      className="space-y-6 relative z-10 animate-fade-in"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
      autoComplete="off"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-lg animate-fade-in">
          {t('register.step2.title')}
        </h2>
      </div>
      {/* Full Name and Nickname side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <BasicInfoSection
          fullName={data.fullName}
          fullNameError={errors.fullName}
          onFullNameChange={(val) => updateData({ fullName: val })}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
        <NicknameSection
          nickNames={data.nickNames}
          onUpdate={nicks => updateData({ nickNames: nicks })}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
      </div>
      {/* Personal detail fields spanning two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <PersonalDetailsSection
          dateOfBirth={data.dateOfBirth}
          onDateOfBirthChange={val => updateData({ dateOfBirth: val })}
          gender={data.gender}
          onGenderChange={val => updateData({ gender: val })}
          religion={data.religion}
          onReligionChange={val => updateData({ religion: val })}
          maritalStatus={data.maritalStatus}
          onMaritalStatusChange={val => updateData({ maritalStatus: val })}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
      </div>
      {/* Personal Email and Additional Phone side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
        <EmailSection
          personalEmail={data.personalEmail}
          personalEmailError={errors.personalEmail}
          onPersonalEmailChange={val => updateData({ personalEmail: val })}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
        <AdditionalPhonesSection
          additionalPhones={data.additionalPhones}
          onUpdate={phones => updateData({ additionalPhones: phones })}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
      </div>
      {/* Save and Continue button at the bottom */}
      <div className="flex justify-end mt-8">
        <LiquidGlassSiennaButton
          type="submit"
          className="bg-emerald-600/80 hover:bg-emerald-700/90 active:bg-emerald-900 text-white font-bold text-lg px-8 py-3 min-w-[160px] rounded-xl animate-fade-in"
          style={{ boxShadow: '0 6px 24px 0 rgba(40, 180, 99, 0.19), 0 1.5px 6px 0 rgba(52, 168, 83,0.23)' }}
        >
          {t('register.step2.save_continue')}
        </LiquidGlassSiennaButton>
      </div>
    </form>
  );
};

export default PersonalInfoFormLayout;
