
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Label } from '../../ui/label';
import { useLanguage } from '../../../contexts/LanguageContext';
import { RegistrationData } from '../RegistrationForm';
import { divisions, districts } from './ProfessionalData';

interface WorkplaceAddressSectionProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}

const WorkplaceAddressSection = ({ data, updateData }: WorkplaceAddressSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="md:col-span-2">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        {t('register.step4.workplace.address')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>{t('register.step3.nationality')}</Label>
          <Select 
            value={data.workplaceAddress.nationality} 
            onValueChange={(value) => updateData({ 
              workplaceAddress: { ...data.workplaceAddress, nationality: value }
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('register.step3.nationality.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bangladesh">Bangladesh</SelectItem>
              <SelectItem value="Other">{t('register.step3.nationality.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{t('register.step3.division')}</Label>
          <Select 
            value={data.workplaceAddress.division} 
            onValueChange={(value) => updateData({ 
              workplaceAddress: { ...data.workplaceAddress, division: value }
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('register.step3.division.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {divisions.map((division) => (
                <SelectItem key={division} value={division}>{division}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>{t('register.step3.district')}</Label>
          <Select 
            value={data.workplaceAddress.district} 
            onValueChange={(value) => updateData({ 
              workplaceAddress: { ...data.workplaceAddress, district: value }
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t('register.step3.district.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>{district}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default WorkplaceAddressSection;

