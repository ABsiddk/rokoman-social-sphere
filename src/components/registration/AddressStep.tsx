
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
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

  const handleSameAddressChange = (checked: boolean) => {
    updateData({ sameAsPresentAddress: checked });
    if (checked) {
      updateData({ permanentAddress: { ...data.presentAddress } });
    }
  };

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

      {/* Permanent Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {t('register.step3.permanent.title')}
        </h3>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="sameAddress"
            checked={data.sameAsPresentAddress}
            onCheckedChange={handleSameAddressChange}
          />
          <Label htmlFor="sameAddress">
            {t('register.step3.same.address')}
          </Label>
        </div>

        {!data.sameAsPresentAddress && (
          <AddressFormSection
            address={data.permanentAddress}
            onAddressChange={(address) => updateData({ permanentAddress: address })}
            errors={errors}
            fieldPrefix="permanent"
          />
        )}
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
          {t('register.step3.continue')}
        </Button>
      </div>
    </div>
  );
};

export default AddressStep;
