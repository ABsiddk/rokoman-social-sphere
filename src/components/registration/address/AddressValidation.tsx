
import { useLanguage } from '../../../contexts/LanguageContext';
import { RegistrationData } from '../RegistrationForm';

export const useAddressValidation = () => {
  const { t } = useLanguage();

  const validateForm = (data: RegistrationData) => {
    const newErrors: Record<string, string> = {};

    if (!data.presentAddress.division) {
      newErrors.presentDivision = t('register.step3.errors.division.required');
    }
    if (!data.presentAddress.district) {
      newErrors.presentDistrict = t('register.step3.errors.district.required');
    }
    if (!data.presentAddress.subDistrict) {
      newErrors.presentSubDistrict = t('register.step3.errors.subdistrict.required');
    }

    if (!data.sameAsPresentAddress) {
      if (!data.permanentAddress.division) {
        newErrors.permanentDivision = t('register.step3.errors.division.required');
      }
      if (!data.permanentAddress.district) {
        newErrors.permanentDistrict = t('register.step3.errors.district.required');
      }
      if (!data.permanentAddress.subDistrict) {
        newErrors.permanentSubDistrict = t('register.step3.errors.subdistrict.required');
      }
    }

    return newErrors;
  };

  return { validateForm };
};
