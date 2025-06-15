
import React from 'react';
import BasicInfoSection from './BasicInfoSection';
import NicknameSection from './NicknameSection';
import PersonalDetailsSection from './PersonalDetailsSection';
import EmailSection from './EmailSection';
import AdditionalPhonesSection from './AdditionalPhonesSection';
import LiquidGlassButton from '../../ui/LiquidGlassButton';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PersonalInfoFormLayoutProps {
  data: {
    fullName: string;
    nickNames: string[];
    dateOfBirth: string;
    gender: string;
    religion: string;
    maritalStatus: string;
    personalEmail: string;
    officialEmail: string;
    additionalPhones: string[];
  };
  errors: Record<string, string>;
  updateData: (data: Partial<PersonalInfoFormLayoutProps['data']>) => void;
  onSubmit: () => void;
}

const labelColor = 'text-[rgb(145,153,165)]';
const inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary';

const PersonalInfoFormLayout: React.FC<PersonalInfoFormLayoutProps> = ({
  data,
  errors,
  updateData,
  onSubmit,
}) => {
  const { t } = useLanguage();

  // Handlers
  const handleNicknames = (nickNames: string[]) => updateData({ nickNames });
  const handleAdditionalPhones = (additionalPhones: string[]) => updateData({ additionalPhones });

  return (
    <div className="space-y-6 relative z-10 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-lg animate-fade-in">
          {t('register.step2.title')}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BasicInfoSection
          fullName={data.fullName}
          fullNameError={errors.fullName}
          onFullNameChange={(val) => updateData({ fullName: val })}
          nickname1={data.nickNames?.[0] || ''}
          onNickname1Change={(val) => {
            const next = [...(data.nickNames ?? ['', '', '', '', ''])];
            next[0] = val;
            updateData({ nickNames: next });
          }}
          nickname2={data.nickNames?.[1] || ''}
          onNickname2Change={(val) => {
            const next = [...(data.nickNames ?? ['', '', '', '', ''])];
            next[1] = val;
            updateData({ nickNames: next });
          }}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
        <NicknameSection
          nickNames={data.nickNames}
          onUpdate={handleNicknames}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
        <PersonalDetailsSection
          dateOfBirth={data.dateOfBirth}
          onDateOfBirthChange={(val) => updateData({ dateOfBirth: val })}
          gender={data.gender}
          onGenderChange={(val) => updateData({ gender: val })}
          religion={data.religion}
          onReligionChange={(val) => updateData({ religion: val })}
          maritalStatus={data.maritalStatus}
          onMaritalStatusChange={(val) => updateData({ maritalStatus: val })}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
        <EmailSection
          personalEmail={data.personalEmail}
          personalEmailError={errors.personalEmail}
          onPersonalEmailChange={(val) => updateData({ personalEmail: val })}
          officialEmail={data.officialEmail}
          officialEmailError={errors.officialEmail}
          onOfficialEmailChange={(val) => updateData({ officialEmail: val })}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
        <AdditionalPhonesSection
          additionalPhones={data.additionalPhones}
          onUpdate={handleAdditionalPhones}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
      </div>
      <div className="flex justify-end">
        <LiquidGlassButton onClick={onSubmit} className="animate-fade-in">
          {t('register.step2.save_continue')}
        </LiquidGlassButton>
      </div>
    </div>
  );
};

export default PersonalInfoFormLayout;
