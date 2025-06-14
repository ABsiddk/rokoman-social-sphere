
import React from 'react';
import { Button } from '../../ui/button';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PhoneConfirmationProps {
  phoneNumber: string;
  onEdit: () => void;
  onConfirm: () => void;
}

const PhoneConfirmation = ({ phoneNumber, onEdit, onConfirm }: PhoneConfirmationProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        {t('register.step1.phone_confirmation')}
      </h2>
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
          {phoneNumber}
        </p>
      </div>
      <div className="flex gap-4 justify-center">
        <Button
          onClick={onEdit}
          variant="outline"
          className="bg-white dark:bg-gray-700 border-[rgb(39,113,150)] text-[rgb(39,113,150)] dark:text-white hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-gray-600 font-medium"
        >
          {t('register.step1.edit_phone')}
        </Button>
        <Button
          onClick={onConfirm}
          className="bg-green-600 hover:bg-green-700 text-white font-medium"
        >
          {t('register.step1.confirm_phone')}
        </Button>
      </div>
    </div>
  );
};

export default PhoneConfirmation;
