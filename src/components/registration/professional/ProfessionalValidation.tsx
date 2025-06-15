
import { useLanguage } from '../../../contexts/LanguageContext';
import { RegistrationData } from '../RegistrationForm';

export const useProfessionalValidation = () => {
  const { t } = useLanguage();

  const validateForm = (data: RegistrationData) => {
    const newErrors: Record<string, string> = {};
    // All business/designation/specialNote/jobDescription validation removed
    return newErrors;
  };

  return { validateForm };
};
