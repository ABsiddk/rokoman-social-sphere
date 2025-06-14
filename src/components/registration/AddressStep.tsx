import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';

interface AddressStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const AddressStep = ({ data, updateData, onComplete }: AddressStepProps) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const divisions = [
    'Dhaka Division',
    'Chittagong Division', 
    'Rajshahi Division',
    'Khulna Division',
    'Sylhet Division',
    'Barisal Division',
    'Rangpur Division',
    'Mymensingh Division'
  ];

  const districts = [
    'Dhaka', 'Gazipur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Tangail', 'Kishoreganj', 'Madaripur', 'Shariatpur', 'Faridpur', 'Gopalganj', 'Rajbari',
    'Chittagong', 'Coxs Bazar', 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati', 'Bandarban', 'Brahmanbaria', 'Chandpur', 'Comilla',
    'Rajshahi', 'Bogura', 'Joypurhat', 'Naogaon', 'Natore', 'Nawabganj', 'Pabna', 'Sirajganj',
    'Khulna', 'Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira',
    'Sylhet', 'Habiganj', 'Moulvibazar', 'Sunamganj',
    'Barisal', 'Barguna', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur',
    'Rangpur', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Thakurgaon',
    'Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur'
  ];

  const handleSameAddressChange = (checked: boolean) => {
    updateData({ sameAsPresentAddress: checked });
    if (checked) {
      updateData({ permanentAddress: { ...data.presentAddress } });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.presentAddress.division) {
      newErrors.presentDivision = t('register.step3.errors.division.required');
    }
    if (!data.presentAddress.district) {
      newErrors.presentDistrict = t('register.step3.errors.district.required');
    }
    if (!data.presentAddress.subDistrict) {
      newErrors.presentSubDistrict = t('register.step3.errors.subdistrict.required');
    }

    if (!data.sameAsPresentAddress) {
      if (!data.permanentAddress.division) {
        newErrors.permanentDivision = t('register.step3.errors.division.required');
      }
      if (!data.permanentAddress.district) {
        newErrors.permanentDistrict = t('register.step3.errors.district.required');
      }
      if (!data.permanentAddress.subDistrict) {
        newErrors.permanentSubDistrict = t('register.step3.errors.subdistrict.required');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>{t('register.step3.nationality')}</Label>
            <Select 
              value={data.presentAddress.nationality} 
              onValueChange={(value) => updateData({ 
                presentAddress: { ...data.presentAddress, nationality: value }
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
            <Label>{t('register.step3.division')} *</Label>
            <Select 
              value={data.presentAddress.division} 
              onValueChange={(value) => updateData({ 
                presentAddress: { ...data.presentAddress, division: value }
              })}
            >
              <SelectTrigger className={errors.presentDivision ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('register.step3.division.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {divisions.map((division) => (
                  <SelectItem key={division} value={division}>{division}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.presentDivision && <p className="text-red-500 text-sm mt-1">{errors.presentDivision}</p>}
          </div>

          <div>
            <Label>{t('register.step3.district')} *</Label>
            <Select 
              value={data.presentAddress.district} 
              onValueChange={(value) => updateData({ 
                presentAddress: { ...data.presentAddress, district: value }
              })}
            >
              <SelectTrigger className={errors.presentDistrict ? 'border-red-500' : ''}>
                <SelectValue placeholder={t('register.step3.district.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district} value={district}>{district}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.presentDistrict && <p className="text-red-500 text-sm mt-1">{errors.presentDistrict}</p>}
          </div>

          <div>
            <Label>{t('register.step3.subdistrict')} *</Label>
            <Input
              value={data.presentAddress.subDistrict}
              onChange={(e) => updateData({ 
                presentAddress: { ...data.presentAddress, subDistrict: e.target.value }
              })}
              placeholder={t('register.step3.subdistrict.placeholder')}
              className={errors.presentSubDistrict ? 'border-red-500' : ''}
            />
            {errors.presentSubDistrict && <p className="text-red-500 text-sm mt-1">{errors.presentSubDistrict}</p>}
          </div>

          <div>
            <Label>{t('register.step3.village')}</Label>
            <Input
              value={data.presentAddress.villageHouseRoad}
              onChange={(e) => updateData({ 
                presentAddress: { ...data.presentAddress, villageHouseRoad: e.target.value }
              })}
              placeholder={t('register.step3.village.placeholder')}
            />
          </div>

          <div>
            <Label>{t('register.step3.zipcode')}</Label>
            <Input
              value={data.presentAddress.zipCode}
              onChange={(e) => updateData({ 
                presentAddress: { ...data.presentAddress, zipCode: e.target.value }
              })}
              placeholder={t('register.step3.zipcode.placeholder')}
            />
          </div>
        </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t('register.step3.nationality')}</Label>
              <Select 
                value={data.permanentAddress.nationality} 
                onValueChange={(value) => updateData({ 
                  permanentAddress: { ...data.permanentAddress, nationality: value }
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
              <Label>{t('register.step3.division')} *</Label>
              <Select 
                value={data.permanentAddress.division} 
                onValueChange={(value) => updateData({ 
                  permanentAddress: { ...data.permanentAddress, division: value }
                })}
              >
                <SelectTrigger className={errors.permanentDivision ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('register.step3.division.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {divisions.map((division) => (
                    <SelectItem key={division} value={division}>{division}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.permanentDivision && <p className="text-red-500 text-sm mt-1">{errors.permanentDivision}</p>}
            </div>

            <div>
              <Label>{t('register.step3.district')} *</Label>
              <Select 
                value={data.permanentAddress.district} 
                onValueChange={(value) => updateData({ 
                  permanentAddress: { ...data.permanentAddress, district: value }
                })}
              >
                <SelectTrigger className={errors.permanentDistrict ? 'border-red-500' : ''}>
                  <SelectValue placeholder={t('register.step3.district.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                  {districts.map((district) => (
                    <SelectItem key={district} value={district}>{district}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.permanentDistrict && <p className="text-red-500 text-sm mt-1">{errors.permanentDistrict}</p>}
            </div>

            <div>
              <Label>{t('register.step3.subdistrict')} *</Label>
              <Input
                value={data.permanentAddress.subDistrict}
                onChange={(e) => updateData({ 
                  permanentAddress: { ...data.permanentAddress, subDistrict: e.target.value }
                })}
                placeholder={t('register.step3.subdistrict.placeholder')}
                className={errors.permanentSubDistrict ? 'border-red-500' : ''}
              />
              {errors.permanentSubDistrict && <p className="text-red-500 text-sm mt-1">{errors.permanentSubDistrict}</p>}
            </div>

            <div>
              <Label>{t('register.step3.village')}</Label>
              <Input
                value={data.permanentAddress.villageHouseRoad}
                onChange={(e) => updateData({ 
                  permanentAddress: { ...data.permanentAddress, villageHouseRoad: e.target.value }
                })}
                placeholder={t('register.step3.village.placeholder')}
              />
            </div>

            <div>
              <Label>{t('register.step3.zipcode')}</Label>
              <Input
                value={data.permanentAddress.zipCode}
                onChange={(e) => updateData({ 
                  permanentAddress: { ...data.permanentAddress, zipCode: e.target.value }
                })}
                placeholder={t('register.step3.zipcode.placeholder')}
              />
            </div>
          </div>
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
