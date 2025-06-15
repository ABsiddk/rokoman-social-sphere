import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import { useProfessionalValidation } from './professional/ProfessionalValidation';
import LiquidGlassSiennaButton from '../ui/LiquidGlassSiennaButton';
import ProfessionTypeSelector from './professional/ProfessionTypeSelector';
import LiquidGlassInput from '../ui/LiquidGlassInput';
import SearchableInput from "../ui/SearchableInput";
import {
  institutionSuggestions,
  departmentSuggestions,
  designationSuggestions,
} from "./professional/ProfessionalSuggestions";

interface ProfessionalStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete?: () => void;
}

const ProfessionalStep = ({ data, updateData, onComplete }: ProfessionalStepProps) => {
  const { t, language } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { validateForm } = useProfessionalValidation();
  const [submitting, setSubmitting] = useState(false);

  const labelColor = "text-[rgb(77,89,119)] dark:text-[rgb(155,174,205)]";
  const sectionBg = "rounded-xl px-5 py-6 mb-4 bg-opacity-70 dark:bg-opacity-70 bg-white dark:bg-gray-900 ";

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
    <form onSubmit={handleSubmit} className={`gap-y-3 flex flex-col ${sectionBg}`}>
      <div className="w-full flex justify-center mb-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-cyan-200 drop-shadow-md tracking-tight">
          {t('register.step4.title')}
        </h1>
      </div>

      <ProfessionTypeSelector
        value={data.professionType}
        onChange={handleProfessionTypeChange}
      />

      {/* NEW: Searchable professional info inputs */}
      <div
        className="w-full flex flex-col gap-2 md:flex-row md:gap-4"
        style={{ marginBottom: "0.3rem" }}
      >
        <div className="flex-1 min-w-[120px]">
          <SearchableInput
            label={t('register.step4.institution_name') || "Institution Name"}
            placeholder={t('register.step4.institution_name.placeholder') || "e.g. University of Dhaka"}
            suggestions={institutionSuggestions}
            value={data.institutionName || ""}
            onChange={val => updateData({ institutionName: val })}
            autoComplete="organization"
            id="institutionName"
            maxLength={48}
          />
        </div>
        <div className="flex-1 min-w-[120px]">
          <SearchableInput
            label={t('register.step4.department') || "Department"}
            placeholder={t('register.step4.department.placeholder') || "e.g. Computer Science"}
            suggestions={departmentSuggestions}
            value={data.department || ""}
            onChange={val => updateData({ department: val })}
            autoComplete="department"
            id="department"
            maxLength={48}
          />
        </div>
        <div className="flex-1 min-w-[120px]">
          <SearchableInput
            label={t('register.step4.designation') || "Designation"}
            placeholder={t('register.step4.designation.placeholder') || "e.g. Manager"}
            suggestions={designationSuggestions}
            value={data.designation || ""}
            onChange={val => updateData({ designation: val })}
            autoComplete="title"
            id="designation"
            maxLength={48}
          />
        </div>
      </div>

      {data.professionType === 'government' && (
        <div className="w-full flex flex-col items-start animate-fade-in mb-1">
          <div className="flex items-center space-x-2 py-1">
            <Checkbox
              id="isBCS"
              checked={!!data.isBCS}
              onCheckedChange={checked => handleBCSCheckboxChange(!!checked)}
            />
            <Label htmlFor="isBCS" className={`${labelColor} text-base font-semibold`}>
              {t('register.step4.is_bcs')}
            </Label>
          </div>
          {data.isBCS && (
            <div className="pl-6 py-0 animate-fade-in flex-1 min-w-0">
              <Label htmlFor="bcsSession" className={`${labelColor} text-sm mb-1`}>
                {t('register.step4.bcs_session')}
              </Label>
              {/* Remove all width/maxWidth, true dynamic sizing */}
              <LiquidGlassInput
                id="bcsSession"
                value={data.bcsSession || ''}
                onChange={handleBCSSessionChange}
                error={errors.bcsSession}
                placeholder={t('register.step4.bcs_session.placeholder')}
                autoComplete="off"
                maxLength={32}
                className="mt-0.5"
                style={{ minWidth: 0, maxWidth: "none" }}
              />
            </div>
          )}
        </div>
      )}

      {/* On all screens: make date boxes side by side, no unnecessary gap, truly fit text */}
      <div className="grid grid-cols-2 gap-2 md:gap-5 justify-between">
        <div className="flex flex-col">
          <Label className={labelColor}>{t('register.step4.start_date')}</Label>
          <LiquidGlassInput
            type="date"
            value={data.startDate}
            onChange={e => updateData({ startDate: e.target.value })}
            placeholder={t('register.step4.start_date.placeholder')}
            className="mt-0.5"
            maxLength={24}
            style={{ minWidth: 0, maxWidth: "none" }}
          />
        </div>
        <div className="flex flex-col">
          <Label className={labelColor}>{t('register.step4.end_date')}</Label>
          <LiquidGlassInput
            type="date"
            value={data.endDate}
            onChange={e => updateData({ endDate: e.target.value })}
            placeholder={t('register.step4.end_date.placeholder')}
            className="mt-0.5"
            disabled={data.currentlyWorking}
            maxLength={24}
            style={{ minWidth: 0, maxWidth: "none" }}
          />
        </div>
        <div className="col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="currentlyWorking"
              checked={data.currentlyWorking}
              onCheckedChange={checked => updateData({ currentlyWorking: !!checked })}
            />
            <Label htmlFor="currentlyWorking" className={labelColor}>
              {t('register.step4.currently_working')}
            </Label>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center mt-4">
        <LiquidGlassSiennaButton
          type="submit"
          disabled={submitting}
          className="w-full md:w-auto !bg-[linear-gradient(96deg,rgba(5,117,170,0.88)14%,rgba(42,210,172,0.93)71%)] text-white shadow-lg py-2 px-6 font-bold"
        >
          {submitting
            ? t('register.step4.completing') || 'Submitting...'
            : t('register.step4.complete_registration')}
        </LiquidGlassSiennaButton>
      </div>
    </form>
  );
};

export default ProfessionalStep;
