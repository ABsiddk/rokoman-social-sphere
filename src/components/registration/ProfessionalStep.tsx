
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import { useProfessionalValidation } from './professional/ProfessionalValidation';
import LiquidGlassSiennaButton from '../ui/LiquidGlassSiennaButton';
import ProfessionTypeSelector from './professional/ProfessionTypeSelector';

interface ProfessionalStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete?: () => void;
}

const ProfessionalStep = ({ data, updateData, onComplete }: ProfessionalStepProps) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { validateForm } = useProfessionalValidation();
  const [submitting, setSubmitting] = useState(false);

  const labelColor = "text-[rgb(77,89,119)] dark:text-[rgb(155,174,205)]";
  const inputBgColor = "bg-[rgb(252,252,253)] dark:bg-[rgb(33,37,44)] text-black dark:text-white border border-gray-300 dark:border-[#2e3749] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-400";
  const sectionBg =
    "rounded-xl px-5 py-6 mb-4 bg-opacity-70 dark:bg-opacity-70 bg-white dark:bg-gray-900 ";

  const handleProfessionTypeChange = (val: string) => {
    if (val !== 'government') {
      updateData({ professionType: val, isBCS: false, bcsSession: '' });
    } else {
      updateData({ professionType: val });
    }
  };

  const handleBCSCheckboxChange = (checked: boolean) => {
    if (!checked) {
      updateData({ isBCS: false, bcsSession: '' });
    } else {
      updateData({ isBCS: true });
    }
  };

  const handleBCSSessionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ bcsSession: e.target.value });
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        if (onComplete) onComplete();
      }, 400);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${sectionBg}`}>
      <div className="w-full flex justify-center mb-5">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-cyan-200 drop-shadow-md tracking-tight">
          {t('register.step4.title') || 'Professional Information'}
        </h1>
      </div>
      {/* Profession type selection section */}
      <ProfessionTypeSelector
        value={data.professionType}
        onChange={handleProfessionTypeChange}
      />
      {/* BCS section - only visible if Government is selected */}
      {data.professionType === 'government' && (
        <div className="w-full flex flex-col items-start animate-fade-in mb-4">
          <div className="flex items-center space-x-2 py-2">
            <Checkbox
              id="isBCS"
              checked={!!data.isBCS}
              onCheckedChange={checked => handleBCSCheckboxChange(!!checked)}
            />
            <Label htmlFor="isBCS" className={`${labelColor} text-base font-semibold`}>
              {t('register.step4.is_bcs') || 'Is this BCS?'}
            </Label>
          </div>
          {/* Show BCS session input only if checkbox is checked */}
          {data.isBCS && (
            <div className="w-full flex flex-col space-y-1 pl-6 py-1 animate-fade-in">
              <Label htmlFor="bcsSession" className={`${labelColor} text-sm`}>
                {t('register.step4.bcs_session') || 'How many BCS?'}
              </Label>
              <Input
                id="bcsSession"
                value={data.bcsSession || ''}
                onChange={handleBCSSessionChange}
                className={inputBgColor + (errors.bcsSession ? ' border-red-500' : '')}
                placeholder={t('register.step4.bcs_session.placeholder') || 'Enter your BCS session'}
                autoComplete="off"
              />
              {errors.bcsSession && (
                <span className="text-sm text-red-600">{errors.bcsSession}</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {/* Removed the "Profession"/Occupation dropdown */}
        {/* Business fields no longer depend on occupation */}

        <div>
          <Label className={labelColor}>{t('register.step4.start_date')}</Label>
          <Input
            type="date"
            className={inputBgColor}
            value={data.startDate}
            onChange={(e) => updateData({ startDate: e.target.value })}
            placeholder={t('register.step4.start_date.placeholder')}
          />
        </div>

        <div>
          <Label className={labelColor}>{t('register.step4.end_date')}</Label>
          <Input
            type="date"
            className={inputBgColor}
            value={data.endDate}
            onChange={(e) => updateData({ endDate: e.target.value })}
            disabled={data.currentlyWorking}
            placeholder={t('register.step4.end_date.placeholder')}
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="currentlyWorking"
              checked={data.currentlyWorking}
              onCheckedChange={(checked) => updateData({ currentlyWorking: !!checked })}
            />
            <Label htmlFor="currentlyWorking" className={labelColor}>
              {t('register.step4.currently_working')}
            </Label>
          </div>
        </div>
      </div>

      {/* Confirmation Button */}
      <div className="w-full flex justify-center mt-6">
        <LiquidGlassSiennaButton
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto !bg-[linear-gradient(96deg,rgba(5,117,170,0.88)14%,rgba(42,210,172,0.93)71%)] text-white shadow-lg py-3 px-12 font-bold"
        >
          {submitting
            ? t('register.step4.completing') || t('register.step2.completing') || 'Submitting...'
            : t('register.step4.complete_registration') || 'Complete Registration'}
        </LiquidGlassSiennaButton>
      </div>
    </form>
  );
};

export default ProfessionalStep;

