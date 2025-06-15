
import React, { useState } from 'react';
// import { Button } from '../ui/button';
import LiquidGlassButton from '../ui/LiquidGlassButton';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import AddressFormSection from './address/AddressFormSection';
import { useAddressValidation } from './address/AddressValidation';

interface AddressStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const AddressStep = ({ data, updateData, onComplete }: AddressStepProps) => {
  const { t } = useLanguage();
  const { validateForm } = useAddressValidation();
  const [errors, setErrors] = useState<Record<string, string>>({});

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
          {t('register.step3.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('register.step3.subtitle')}
        </p>
      </div>

      {/* Present Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {t('register.step3.present.title')}
        </h3>

        <AddressFormSection
          address={data.presentAddress}
          onAddressChange={(address) => updateData({ presentAddress: address })}
          errors={errors}
          fieldPrefix="present"
        />
      </div>

      {/* Everything below Permanent Address is removed as requested */}

      <div className="flex justify-end mt-8">
        <LiquidGlassButton
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500/80 to-cyan-400/80 hover:from-blue-600/90 hover:to-cyan-600/90 text-white font-bold text-lg px-8 py-3 min-w-[160px] rounded-xl animate-fade-in transition-all duration-200"
          type="button"
        >
          {t('register.step3.continue')}
        </LiquidGlassButton>
      </div>
    </div>
  );
};

export default AddressStep;
