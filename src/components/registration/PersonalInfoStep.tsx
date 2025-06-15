
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import { usePersonalInfoValidation } from './personal-info/ValidationUtils';
import PersonalInfoFormLayout from './personal-info/PersonalInfoFormLayout';

interface PersonalInfoStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const NICKNAME_FIELDS = 5;
const ADDITIONAL_PHONE_FIELDS = 1; // Changed from 3 to 1

const PersonalInfoStep = ({ data, updateData, onComplete }: PersonalInfoStepProps) => {
  const { t, language } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { validateForm } = usePersonalInfoValidation();

  // Add initial fields if empty
  useEffect(() => {
    if (!data.nickNames || data.nickNames.length < NICKNAME_FIELDS) {
      updateData({
        nickNames: Array.from({ length: NICKNAME_FIELDS }, (_, i) => data.nickNames?.[i] || '')
      });
    }
    if (!data.additionalPhones || data.additionalPhones.length < ADDITIONAL_PHONE_FIELDS) {
      updateData({
        additionalPhones: Array.from({ length: ADDITIONAL_PHONE_FIELDS }, (_, i) => data.additionalPhones?.[i] || '')
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

  return (
    <PersonalInfoFormLayout
      data={data}
      errors={errors}
      updateData={updateData}
      onSubmit={handleSubmit}
    />
  );
};

export default PersonalInfoStep;
