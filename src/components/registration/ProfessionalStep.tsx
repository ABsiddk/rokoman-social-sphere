
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import { useProfessionalValidation } from './professional/ProfessionalValidation';
import { occupations } from './professional/ProfessionalData';
import BusinessFieldsSection from './professional/BusinessFieldsSection';
import LiquidGlassSiennaButton from '../ui/LiquidGlassSiennaButton';

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

  // For consistency
  const labelColor = "text-[rgb(77,89,119)] dark:text-[rgb(155,174,205)]";
  const inputBgColor = "bg-[rgb(252,252,253)] dark:bg-[rgb(33,37,44)] text-black dark:text-white border border-gray-300 dark:border-[#2e3749] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-400";
  const sectionBg =
    "rounded-xl px-5 py-6 mb-4 bg-opacity-70 dark:bg-opacity-70 bg-white dark:bg-gray-900 ";

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      // Simulate api or onComplete
      setTimeout(() => {
        setSubmitting(false);
        if (onComplete) onComplete();
      }, 400);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${sectionBg}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.step4.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="md:col-span-2">
          <Label className={labelColor}>
            {t('register.step4.occupation')} *
          </Label>
          <Select
            value={data.occupation}
            onValueChange={(value) => updateData({ occupation: value })}
          >
            <SelectTrigger className={`${inputBgColor} ${errors.occupation ? 'border-red-500' : ''}`}>
              <SelectValue placeholder={t('register.step4.occupation.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {occupations.map((occupation) => (
                <SelectItem key={occupation} value={occupation}>
                  {t(`register.step4.occupation.${occupation}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.occupation && (
            <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
          )}
        </div>

        {/* Business fields section if occupation is business */}
        <BusinessFieldsSection data={data} updateData={updateData} />

        <div>
          <Label className={labelColor}>{t('register.step4.start.date')}</Label>
          <Input
            type="date"
            className={inputBgColor}
            value={data.startDate}
            onChange={(e) => updateData({ startDate: e.target.value })}
            placeholder={t('register.step4.start.date.placeholder')}
          />
        </div>

        <div>
          <Label className={labelColor}>{t('register.step4.end.date')}</Label>
          <Input
            type="date"
            className={inputBgColor}
            value={data.endDate}
            onChange={(e) => updateData({ endDate: e.target.value })}
            disabled={data.currentlyWorking}
            placeholder={t('register.step4.end.date.placeholder')}
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
              {t('register.step4.currently.working')}
            </Label>
          </div>
        </div>

        <div className="md:col-span-2">
          <Label className={labelColor}>{t('register.step4.special.note')}</Label>
          <Textarea
            className={inputBgColor}
            value={data.specialNote}
            onChange={(e) => updateData({ specialNote: e.target.value })}
            placeholder={t('register.step4.special.note.placeholder')}
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <Label className={labelColor}>{t('register.step4.job.description')}</Label>
          <Textarea
            className={inputBgColor}
            value={data.jobDescription}
            onChange={(e) => updateData({ jobDescription: e.target.value })}
            placeholder={t('register.step4.job.description.placeholder')}
            rows={4}
          />
        </div>
      </div>

      {/* Confirmation Button: synchronized name and styling */}
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
