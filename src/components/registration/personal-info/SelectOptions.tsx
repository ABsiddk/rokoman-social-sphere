
import { useLanguage } from '../../../contexts/LanguageContext';

export const useSelectOptions = () => {
  const { t } = useLanguage();

  const genderOptions = [
    { value: 'male', label: t('register.step2.gender.male') },
    { value: 'female', label: t('register.step2.gender.female') },
    { value: 'other', label: t('register.step2.gender.other') }
  ];

  const religionOptions = [
    { value: 'islam', label: t('register.step2.religion.islam') },
    { value: 'hinduism', label: t('register.step2.religion.hinduism') },
    { value: 'christianity', label: t('register.step2.religion.christianity') },
    { value: 'buddhism', label: t('register.step2.religion.buddhism') },
    { value: 'other', label: t('register.step2.religion.other') }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: t('register.step2.marital.single') },
    { value: 'married', label: t('register.step2.marital.married') },
    { value: 'divorced', label: t('register.step2.marital.divorced') },
    { value: 'widowed', label: t('register.step2.marital.widowed') }
  ];

  return { genderOptions, religionOptions, maritalStatusOptions };
};
