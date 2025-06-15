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

interface ProfessionalStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}

const ProfessionalStep = ({ data, updateData }: ProfessionalStepProps) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { validateForm } = useProfessionalValidation();

  const handleSubmit = () => {
    const validationErrors = validateForm(data);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.step4.title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Label>{t('register.step4.occupation')} *</Label>
          <Select 
            value={data.occupation} 
            onValueChange={(value) => updateData({ occupation: value })}
          >
            <SelectTrigger className={errors.occupation ? 'border-red-500' : ''}>
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
          {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
        </div>

        <BusinessFieldsSection data={data} updateData={updateData} />

        <div>
          <Label>{t('register.step4.start.date')}</Label>
          <Input
            type="date"
            value={data.startDate}
            onChange={(e) => updateData({ startDate: e.target.value })}
          />
        </div>

        <div>
          <Label>{t('register.step4.end.date')}</Label>
          <Input
            type="date"
            value={data.endDate}
            onChange={(e) => updateData({ endDate: e.target.value })}
            disabled={data.currentlyWorking}
          />
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="currentlyWorking"
              checked={data.currentlyWorking}
              onCheckedChange={(checked) => updateData({ currentlyWorking: !!checked })}
            />
            <Label htmlFor="currentlyWorking">
              {t('register.step4.currently.working')}
            </Label>
          </div>
        </div>

        <div className="md:col-span-2">
          <Label>{t('register.step4.special.note')}</Label>
          <Textarea
            value={data.specialNote}
            onChange={(e) => updateData({ specialNote: e.target.value })}
            placeholder={t('register.step4.special.note.placeholder')}
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <Label>{t('register.step4.job.description')}</Label>
          <Textarea
            value={data.jobDescription}
            onChange={(e) => updateData({ jobDescription: e.target.value })}
            placeholder={t('register.step4.job.description.placeholder')}
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalStep;
