
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { useLanguage } from '../../../contexts/LanguageContext';
import { RegistrationData } from '../RegistrationForm';
import { businessTypes } from './ProfessionalData';

const labelColor = "text-[rgb(77,89,119)] dark:text-[rgb(155,174,205)]";
const inputBgColor = "bg-[rgb(252,252,253)] dark:bg-[rgb(33,37,44)] text-black dark:text-white border border-gray-300 dark:border-[#2e3749] focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-gray-400 dark:placeholder:text-gray-400";

interface BusinessFieldsSectionProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}

const BusinessFieldsSection = ({ data, updateData }: BusinessFieldsSectionProps) => {
  const { t } = useLanguage();

  if (data.occupation !== 'business_commerce') return null;

  return (
    <>
      <div>
        <Label className={labelColor}>{t('register.step4.business.type')}</Label>
        <Select 
          value={data.businessType} 
          onValueChange={(value) => updateData({ businessType: value })}
        >
          <SelectTrigger className={inputBgColor}>
            <SelectValue placeholder={t('register.step4.business.type.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manufacturing">{t('register.step4.business.manufacturing')}</SelectItem>
            <SelectItem value="trading">{t('register.step4.business.trading')}</SelectItem>
            <SelectItem value="service_based">{t('register.step4.business.service')}</SelectItem>
            <SelectItem value="agro_business">{t('register.step4.business.agro')}</SelectItem>
            <SelectItem value="other">{t('register.step4.business.other')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {data.businessType && data.businessType !== 'other' && (
        <div>
          <Label className={labelColor}>{t('register.step4.business.subcategory')}</Label>
          <Select 
            value={data.businessSubCategory} 
            onValueChange={(value) => updateData({ businessSubCategory: value })}
          >
            <SelectTrigger className={inputBgColor}>
              <SelectValue placeholder={t('register.step4.business.subcategory.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {businessTypes[data.businessType as keyof typeof businessTypes]?.map((subcat) => (
                <SelectItem key={subcat} value={subcat}>
                  {t(`register.step4.business.${subcat}`)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label className={labelColor}>{t('register.step4.business.name')}</Label>
        <Input
          className={inputBgColor}
          value={data.businessName || ''}
          onChange={(e) => updateData({ businessName: e.target.value })}
          placeholder={t('register.step4.business.name.placeholder')}
        />
      </div>

      <div>
        <Label className={labelColor}>{t('register.step4.designation')}</Label>
        <Select 
          value={data.designation} 
          onValueChange={(value) => updateData({ designation: value })}
        >
          <SelectTrigger className={inputBgColor}>
            <SelectValue placeholder={t('register.step4.designation.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entrepreneur">{t('register.step4.designation.entrepreneur')}</SelectItem>
            <SelectItem value="senior_management">{t('register.step4.designation.senior')}</SelectItem>
            <SelectItem value="mid_management">{t('register.step4.designation.mid')}</SelectItem>
            <SelectItem value="officer_executive">{t('register.step4.designation.officer')}</SelectItem>
            <SelectItem value="general_staff">{t('register.step4.designation.general')}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default BusinessFieldsSection;
