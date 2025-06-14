
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import { usePersonalInfoValidation } from './personal-info/ValidationUtils';

interface PersonalInfoStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const NICKNAME_FIELDS = 5;
const ADDITIONAL_PHONE_FIELDS = 3;

const labelColor = 'text-[rgb(145,153,165)]';
const inputBgColor = 'bg-[rgb(55,65,81)] text-white border-none focus:ring-2 focus:ring-primary';

const PersonalInfoStep = ({ data, updateData, onComplete }: PersonalInfoStepProps) => {
  const { t, language } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { validateForm } = usePersonalInfoValidation();

  // Add initial fields if empty
  useEffect(() => {
    if (!data.nickNames || data.nickNames.length < NICKNAME_FIELDS) {
      updateData({ 
        nickNames: Array.from({length: NICKNAME_FIELDS}, (_,i) => data.nickNames?.[i] || '')
      });
    }
    if (!data.additionalPhones || data.additionalPhones.length < ADDITIONAL_PHONE_FIELDS) {
      updateData({
        additionalPhones: Array.from({length: ADDITIONAL_PHONE_FIELDS}, (_,i) => data.additionalPhones?.[i] || '')
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync error messages on language or form updates
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setErrors(validateForm(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, data]);
  // Ensure rerender on language change
  const _currentLanguage = language;

  const handleSubmit = () => {
    const validationErrors = validateForm(data);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onComplete();
    }
  };

  // Update handlers for each field
  const updateNickname = (idx: number, value: string) => {
    const updated = [...(data.nickNames ?? Array(NICKNAME_FIELDS).fill(''))];
    updated[idx] = value;
    updateData({ nickNames: updated });
  };
  const updateAdditionalPhone = (idx: number, value: string) => {
    const updated = [...(data.additionalPhones ?? Array(ADDITIONAL_PHONE_FIELDS).fill(''))];
    updated[idx] = value;
    updateData({ additionalPhones: updated });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.step2.title')}
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <Label htmlFor="fullName" className={labelColor}>{t('register.step2.full_name')} *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder={t('register.step2.full_name_placeholder')}
            className={`${inputBgColor} ${errors.fullName ? 'border-red-500' : ''}`}
            autoComplete="off"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>
        {/* Nickname 1 - directly under full name */}
        <div>
          <Label htmlFor="nickname1" className={labelColor}>{t('register.step2.nickname')} 1</Label>
          <Input
            id="nickname1"
            value={data.nickNames?.[0] || ''}
            onChange={(e) => updateNickname(0, e.target.value)}
            placeholder={t('register.step2.nickname.placeholder')}
            className={inputBgColor}
          />
        </div>
        {/* Nickname 2-5 */}
        {Array.from({length: NICKNAME_FIELDS-1}).map((_, i) => (
          <div key={i+1}>
            <Label htmlFor={`nickname${i+2}`} className={labelColor}>{t('register.step2.nickname')} {i+2}</Label>
            <Input
              id={`nickname${i+2}`}
              value={data.nickNames?.[i+1] || ''}
              onChange={(e) => updateNickname(i+1, e.target.value)}
              placeholder={t('register.step2.nickname.placeholder')}
              className={inputBgColor}
            />
          </div>
        ))}
        {/* Date of Birth */}
        <div>
          <Label htmlFor="dateOfBirth" className={labelColor}>{t('register.step2.date_of_birth')}</Label>
          <Input
            id="dateOfBirth"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
            placeholder={t('register.step2.date_of_birth_placeholder')}
            className={inputBgColor}
          />
        </div>
        {/* Gender */}
        <div>
          <Label htmlFor="gender" className={labelColor}>{t('register.step2.gender')}</Label>
          <Input
            id="gender"
            value={data.gender}
            onChange={(e) => updateData({ gender: e.target.value })}
            placeholder={t('register.step2.gender')}
            className={inputBgColor}
          />
        </div>
        {/* Religion */}
        <div>
          <Label htmlFor="religion" className={labelColor}>{t('register.step2.religion')}</Label>
          <Input
            id="religion"
            value={data.religion}
            onChange={(e) => updateData({ religion: e.target.value })}
            placeholder={t('register.step2.religion')}
            className={inputBgColor}
          />
        </div>
        {/* Marital Status */}
        <div>
          <Label htmlFor="maritalStatus" className={labelColor}>{t('register.step2.marital_status')}</Label>
          <Input
            id="maritalStatus"
            value={data.maritalStatus}
            onChange={(e) => updateData({ maritalStatus: e.target.value })}
            placeholder={t('register.step2.marital_status')}
            className={inputBgColor}
          />
        </div>
        {/* Personal Email */}
        <div>
          <Label htmlFor="personalEmail" className={labelColor}>{t('register.step2.personal_email')}</Label>
          <Input
            id="personalEmail"
            type="email"
            value={data.personalEmail}
            onChange={(e) => updateData({ personalEmail: e.target.value })}
            placeholder={t('register.step2.personal_email_placeholder')}
            className={`${inputBgColor} ${errors.personalEmail ? 'border-red-500' : ''}`}
            autoComplete="off"
          />
          {errors.personalEmail && <p className="text-red-500 text-sm mt-1">{errors.personalEmail}</p>}
        </div>
        {/* Official Email */}
        <div>
          <Label htmlFor="officialEmail" className={labelColor}>{t('register.step2.official_email')}</Label>
          <Input
            id="officialEmail"
            type="email"
            value={data.officialEmail}
            onChange={(e) => updateData({ officialEmail: e.target.value })}
            placeholder={t('register.step2.official_email_placeholder')}
            className={`${inputBgColor} ${errors.officialEmail ? 'border-red-500' : ''}`}
            autoComplete="off"
          />
          {errors.officialEmail && <p className="text-red-500 text-sm mt-1">{errors.officialEmail}</p>}
        </div>
        {/* Additional Phone Numbers (Personal) */}
        {Array.from({length: ADDITIONAL_PHONE_FIELDS}).map((_, i) => (
          <div key={i}>
            <Label htmlFor={`addPhone${i+1}`} className={labelColor}>{t('register.step2.phone.additional')} {i+1}</Label>
            <Input
              id={`addPhone${i+1}`}
              value={data.additionalPhones?.[i] || ''}
              onChange={(e) => updateAdditionalPhone(i, e.target.value)}
              placeholder={t('register.step2.phone.additional.placeholder')}
              className={inputBgColor}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
          {t('register.step2.save_continue')}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
