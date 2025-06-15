
import React from 'react';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Label } from '../../ui/label';
import { useLanguage } from '../../../contexts/LanguageContext';
import { divisions, districts } from './AddressData';

interface AddressFormSectionProps {
  address: {
    nationality: string;
    division: string;
    district: string;
    subDistrict: string;
    villageHouseRoad: string;
    zipCode: string;
  };
  onAddressChange: (address: any) => void;
  errors: Record<string, string>;
  fieldPrefix: string;
}

const AddressFormSection = ({ address, onAddressChange, errors, fieldPrefix }: AddressFormSectionProps) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label>{t('register.step3.nationality')}</Label>
        <Select 
          value={address.nationality} 
          onValueChange={(value) => onAddressChange({ ...address, nationality: value })}
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
        <Label>{t('register.step3.division')} *</Label>
        <Select 
          value={address.division} 
          onValueChange={(value) => onAddressChange({ ...address, division: value })}
        >
          <SelectTrigger className={errors[`${fieldPrefix}Division`] ? 'border-red-500' : ''}>
            <SelectValue placeholder={t('register.step3.division.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((division) => (
              <SelectItem key={division} value={division}>{division}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors[`${fieldPrefix}Division`] && <p className="text-red-500 text-sm mt-1">{errors[`${fieldPrefix}Division`]}</p>}
      </div>

      <div>
        <Label>{t('register.step3.district')} *</Label>
        <Select 
          value={address.district} 
          onValueChange={(value) => onAddressChange({ ...address, district: value })}
        >
          <SelectTrigger className={errors[`${fieldPrefix}District`] ? 'border-red-500' : ''}>
            <SelectValue placeholder={t('register.step3.district.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>{district}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors[`${fieldPrefix}District`] && <p className="text-red-500 text-sm mt-1">{errors[`${fieldPrefix}District`]}</p>}
      </div>

      <div>
        <Label>{t('register.step3.subdistrict')} *</Label>
        <Input
          value={address.subDistrict}
          onChange={(e) => onAddressChange({ ...address, subDistrict: e.target.value })}
          placeholder={t('register.step3.subdistrict.placeholder')}
          className={errors[`${fieldPrefix}SubDistrict`] ? 'border-red-500' : ''}
        />
        {errors[`${fieldPrefix}SubDistrict`] && <p className="text-red-500 text-sm mt-1">{errors[`${fieldPrefix}SubDistrict`]}</p>}
      </div>

      <div>
        <Label>{t('register.step3.village')}</Label>
        <Input
          value={address.villageHouseRoad}
          onChange={(e) => onAddressChange({ ...address, villageHouseRoad: e.target.value })}
          placeholder={t('register.step3.village.placeholder')}
        />
      </div>

      <div>
        <Label>{t('register.step3.zipcode')}</Label>
        <Input
          value={address.zipCode}
          onChange={(e) => onAddressChange({ ...address, zipCode: e.target.value })}
          placeholder={t('register.step3.zipcode.placeholder')}
        />
      </div>
    </div>
  );
};

export default AddressFormSection;
