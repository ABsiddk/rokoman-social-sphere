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
import LiquidGlassTextarea from "../ui/LiquidGlassTextarea";
import {
  getInstitutionSuggestions,
  getDepartmentSuggestions,
  getDesignationSuggestions,
  bangladeshDistricts,
  getGradeLevelSuggestions,
  getSessionYearSuggestions,
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

  // Handle profession type and clear special fields
  const handleProfessionTypeChange = (val: string) => {
    if (val === 'student') {
      // Clear job related fields if switching to student
      updateData({
        professionType: val,
        isBCS: false,
        bcsSession: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        jobLocation: '',
        gradeLevel: '',
        sessionYear: '',
        department: '',  // do not show/use for student
        designation: '', // do not show/use for student
      });
    } else {
      // Clear student-related fields if switching away
      updateData({
        professionType: val, 
        isBCS: false, 
        bcsSession: '', 
        gradeLevel: '', 
        sessionYear: '',
        department: '',
        designation: '',
      });
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

  // Suggestions for institution, department, designation & student levels/sessions
  const institutionSuggestions = getInstitutionSuggestions(data.professionType);
  const departmentSuggestions = getDepartmentSuggestions(data.professionType);
  const designationSuggestions = getDesignationSuggestions(data.professionType);
  const gradeLevelSuggestions = getGradeLevelSuggestions(data.professionType);
  const sessionYearSuggestions = getSessionYearSuggestions(data.professionType);

  // Student-specific: true if student form should be shown
  const isStudent = data.professionType === 'student';

  return (
    <form onSubmit={handleSubmit} className={`gap-y-3 flex flex-col ${sectionBg}`}>
      <div className="w-full flex justify-center mb-3">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-cyan-200 drop-shadow-md tracking-tight">
          {t('register.step4.title')}
        </h1>
      </div>

      {/* Profession type selector */}
      <ProfessionTypeSelector
        value={data.professionType}
        onChange={handleProfessionTypeChange}
      />

      {/* Show BCS options if applicable (non-student, government only) */}
      {!isStudent && data.professionType === 'government' && (
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

      {/* --- Main student/professional field block --- */}
      <div className="w-full flex flex-col gap-2 md:flex-row md:gap-4">
        <div className="flex-1 min-w-[120px]">
          {/* Institution Name: always shown */}
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
        {!isStudent && (
          <>
            <div className="flex-1 min-w-[120px]">
              {/* Department */}
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
              {/* Designation */}
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
          </>
        )}
        {/* When Student: show Grade Level & Session Year instead */}
        {isStudent && (
          <>
            <div className="flex-1 min-w-[120px]">
              {/* Grade Level */}
              <SearchableInput
                label={t('register.step4.grade_level')}
                placeholder={t('register.step4.grade_level.placeholder')}
                suggestions={gradeLevelSuggestions}
                value={data.gradeLevel || ""}
                onChange={val => updateData({ gradeLevel: val })}
                autoComplete="education"
                id="gradeLevel"
                maxLength={40}
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              {/* Session Year */}
              <SearchableInput
                label={t('register.step4.session_year')}
                placeholder={t('register.step4.session_year.placeholder')}
                suggestions={sessionYearSuggestions}
                value={data.sessionYear || ""}
                onChange={val => updateData({ sessionYear: val })}
                autoComplete="off"
                id="sessionYear"
                maxLength={20}
              />
            </div>
          </>
        )}
      </div>
      {/* END fields row */}

      {/* Date fields, job location fields etc: only show if not student */}
      {!isStudent && (
        <>
          {/* Date fields (start and end) & currently working */}
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

          {/* Job Location + Profession Description row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 w-full mb-2 animate-fade-in">
            <div className="flex flex-col">
              <SearchableInput
                label={t('register.step4.job_location') || "Job Location"}
                placeholder={t('register.step4.job_location.placeholder') || "Select your work district"}
                suggestions={bangladeshDistricts}
                value={data.jobLocation || ""}
                onChange={val => updateData({ jobLocation: val })}
                autoComplete="address-level2"
                id="jobLocation"
                maxLength={32}
                className="mt-1"
                style={{ minWidth: 0, maxWidth: "none" }}
              />
            </div>
            <div className="flex flex-col">
              <LiquidGlassTextarea
                label={t('register.step4.profession_description')}
                placeholder={t('register.step4.profession_description.placeholder')}
                value={data.professionDescription || ""}
                onChange={e => updateData({ professionDescription: e.target.value })}
                maxLength={500}
                className="mt-1"
              />
            </div>
          </div>
          {/* Work Address */}
          <div className="w-full flex flex-col mb-2 animate-fade-in">
            <LiquidGlassInput
              label={t('register.step4.work_address')}
              placeholder={t('register.step4.work_address.placeholder')}
              value={data.workAddress || ""}
              onChange={e => updateData({ workAddress: e.target.value })}
              maxLength={200}
              id="workAddress"
              autoComplete="address-line1"
              className="mt-1"
              style={{ minWidth: 0, maxWidth: "none" }}
            />
          </div>
        </>
      )}

      {/* Submit Button: always shown and centered */}
      <div className="w-full mt-4 flex justify-center">
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
