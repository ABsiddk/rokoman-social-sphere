
import { useLanguage } from '../../../contexts/LanguageContext';
import { RegistrationData } from '../RegistrationForm';

export const usePersonalInfoValidation = () => {
  const { t } = useLanguage();

  const validateForm = (data: RegistrationData) => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = t('register.step2.errors.fullname.required');
    }

    if (data.personalEmail && !/\S+@\S+\.\S+/.test(data.personalEmail)) {
      newErrors.personalEmail = t('register.step2.errors.email.invalid');
    }

    // officialEmail validation removed

    return newErrors;
  };

  return { validateForm };
};
