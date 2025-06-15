import React from 'react';
import BasicInfoSection from './BasicInfoSection';
import NicknameSection from './NicknameSection';
import PersonalDetailsSection from './PersonalDetailsSection';
import EmailSection from './EmailSection';
import AdditionalPhonesSection from './AdditionalPhonesSection';
import LiquidGlassButton from '../../ui/LiquidGlassButton';
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
    officialEmail: string;
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
    <div className="space-y-6 relative z-10 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 drop-shadow-lg animate-fade-in">
          {t('register.step2.title')}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <BasicInfoSection
          fullName={data.fullName}
          fullNameError={errors.fullName}
          onFullNameChange={(val) => updateData({ fullName: val })}
          labelColor={labelColor}
          inputBgColor={inputBgColor}
          t={t}
        />
      </div>
    </div>
  );
};

export default PersonalInfoFormLayout;
