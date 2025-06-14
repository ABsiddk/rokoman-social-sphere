
import { useLanguage } from '../../../contexts/LanguageContext';
import { RegistrationData } from '../RegistrationForm';

export const useProfessionalValidation = () => {
  const { t } = useLanguage();

  const validateForm = (data: RegistrationData) => {
    const newErrors: Record<string, string> = {};

    if (!data.occupation) {
      newErrors.occupation = t('register.step4.errors.occupation.required');
    }

    return newErrors;
  };

  return { validateForm };
};
