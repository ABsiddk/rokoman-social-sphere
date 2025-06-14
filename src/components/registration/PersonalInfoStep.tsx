
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import NicknameSection from './personal-info/NicknameSection';
import AdditionalPhonesSection from './personal-info/AdditionalPhonesSection';
import { useSelectOptions } from './personal-info/SelectOptions';
import { usePersonalInfoValidation } from './personal-info/ValidationUtils';

interface PersonalInfoStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const PersonalInfoStep = ({ data, updateData, onComplete }: PersonalInfoStepProps) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { genderOptions, religionOptions, maritalStatusOptions } = useSelectOptions();
  const { validateForm } = usePersonalInfoValidation();

  const handleSubmit = () => {
    const validationErrors = validateForm(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onComplete();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.step2.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('register.step2.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <Label htmlFor="fullName">{t('register.step2.fullname')} *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder={t('register.step2.fullname.placeholder')}
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Nicknames */}
        <NicknameSection
          nickNames={data.nickNames}
          onUpdate={(nickNames) => updateData({ nickNames })}
        />

        {/* Date of Birth */}
        <div>
          <Label htmlFor="dateOfBirth">{t('register.step2.dob')}</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
          />
        </div>

        {/* Gender */}
        <div>
          <Label>{t('register.step2.gender')}</Label>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('register.step2.gender.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Religion */}
        <div>
          <Label>{t('register.step2.religion')}</Label>
          <Select value={data.religion} onValueChange={(value) => updateData({ religion: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('register.step2.religion.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {religionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Marital Status */}
        <div>
          <Label>{t('register.step2.marital')}</Label>
          <Select value={data.maritalStatus} onValueChange={(value) => updateData({ maritalStatus: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('register.step2.marital.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {maritalStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Personal Email */}
        <div>
          <Label htmlFor="personalEmail">{t('register.step2.email.personal')}</Label>
          <Input
            id="personalEmail"
            type="email"
            value={data.personalEmail}
            onChange={(e) => updateData({ personalEmail: e.target.value })}
            placeholder={t('register.step2.email.personal.placeholder')}
            className={errors.personalEmail ? 'border-red-500' : ''}
          />
          {errors.personalEmail && <p className="text-red-500 text-sm mt-1">{errors.personalEmail}</p>}
        </div>

        {/* Official Email */}
        <div>
          <Label htmlFor="officialEmail">{t('register.step2.email.official')}</Label>
          <Input
            id="officialEmail"
            type="email"
            value={data.officialEmail}
            onChange={(e) => updateData({ officialEmail: e.target.value })}
            placeholder={t('register.step2.email.official.placeholder')}
            className={errors.officialEmail ? 'border-red-500' : ''}
          />
          {errors.officialEmail && <p className="text-red-500 text-sm mt-1">{errors.officialEmail}</p>}
        </div>

        {/* Additional Phone Numbers */}
        <AdditionalPhonesSection
          additionalPhones={data.additionalPhones}
          onUpdate={(additionalPhones) => updateData({ additionalPhones })}
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
          {t('register.step2.continue')}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
