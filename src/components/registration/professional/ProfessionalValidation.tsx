
import { useLanguage } from '../../../contexts/LanguageContext';
import { RegistrationData } from '../RegistrationForm';

export const useProfessionalValidation = () => {
  const { t } = useLanguage();

  const validateForm = (data: RegistrationData) => {
    const newErrors: Record<string, string> = {};
    // All business/designation/specialNote/jobDescription validation removed

    // NEW: If BCS is checked, bcsSession is required
    if (data.professionType === 'government' && data.isBCS) {
      if (!data.bcsSession || data.bcsSession.trim() === '') {
        newErrors.bcsSession = t('register.step4.bcs_session_required') || 'Please enter your BCS session.';
      }
    }
    return newErrors;
  };

  return { validateForm };
};
