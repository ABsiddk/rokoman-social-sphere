
import { useLanguage } from '../../../contexts/LanguageContext';
import { RegistrationData } from '../RegistrationForm';

export const useProfessionalValidation = () => {
  const { t } = useLanguage();

  const validateForm = (data: RegistrationData) => {
    const newErrors: Record<string, string> = {};
    // Removed occupation validation
    return newErrors;
  };

  return { validateForm };
};
