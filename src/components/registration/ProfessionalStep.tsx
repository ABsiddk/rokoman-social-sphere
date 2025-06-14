
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';

interface ProfessionalStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const ProfessionalStep = ({ data, updateData, onComplete }: ProfessionalStepProps) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const occupations = [
    'business_commerce',
    'government_jobs',
    'education_research',
    'healthcare',
    'law_justice',
    'engineering_it',
    'media_creative',
    'private_service',
    'self_employed',
    'agriculture_fisheries',
    'laborer_worker',
    'student',
    'homemaker',
    'others'
  ];

  const businessTypes = {
    manufacturing: [
      'garments_rmg',
      'food_beverage',
      'pharmaceuticals',
      'chemicals',
      'electronics',
      'other_production'
    ],
    trading: [
      'wholesale',
      'retail',
      'import_export',
      'ecommerce',
      'other_trade'
    ],
    service_based: [
      'banking_financial',
      'insurance',
      'consultancy',
      'hospitality_tourism',
      'real_estate',
      'educational_services',
      'healthcare_management',
      'it_services',
      'logistics_transportation',
      'marketing_advertising',
      'other_services'
    ],
    agro_business: [
      'agro_processing',
      'poultry_fisheries',
      'agricultural_input',
      'other_agricultural'
    ]
  };

  const designations = {
    entrepreneur: [
      'founder',
      'managing_director',
      'proprietor',
      'partner',
      'freelancer',
      'other_ownership'
    ],
    senior_management: [
      'ceo',
      'cfo',
      'coo',
      'general_manager',
      'director',
      'other_senior'
    ],
    mid_management: [
      'head_department',
      'manager',
      'assistant_manager',
      'supervisor',
      'other_middle'
    ],
    officer_executive: [
      'officer',
      'executive',
      'senior_executive',
      'sales_representative',
      'customer_service',
      'accounts_officer',
      'other_officers'
    ],
    general_staff: [
      'general_staff',
      'worker',
      'other_general'
    ]
  };

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.occupation) {
      newErrors.occupation = t('register.step4.errors.occupation.required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete();
    }
  };

  const renderBusinessFields = () => {
    if (data.occupation !== 'business_commerce') return null;

    return (
      <>
        <div>
          <Label>{t('register.step4.business.type')}</Label>
          <Select 
            value={data.businessType} 
            onValueChange={(value) => updateData({ businessType: value })}
          >
            <SelectTrigger>
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
            <Label>{t('register.step4.business.subcategory')}</Label>
            <Select 
              value={data.businessSubCategory} 
              onValueChange={(value) => updateData({ businessSubCategory: value })}
            >
              <SelectTrigger>
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
          <Label>{t('register.step4.business.name')}</Label>
          <Input
            value={data.businessName || ''}
            onChange={(e) => updateData({ businessName: e.target.value })}
            placeholder={t('register.step4.business.name.placeholder')}
          />
        </div>

        <div>
          <Label>{t('register.step4.designation')}</Label>
          <Select 
            value={data.designation} 
            onValueChange={(value) => updateData({ designation: value })}
          >
            <SelectTrigger>
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.step4.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('register.step4.subtitle')}
        </p>
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

        {renderBusinessFields()}

        {/* Workplace Address */}
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

            <div>
              <Label>{t('register.step3.subdistrict')}</Label>
              <Input
                value={data.workplaceAddress.subDistrict}
                onChange={(e) => updateData({ 
                  workplaceAddress: { ...data.workplaceAddress, subDistrict: e.target.value }
                })}
                placeholder={t('register.step3.subdistrict.placeholder')}
              />
            </div>

            <div>
              <Label>{t('register.step3.village')}</Label>
              <Input
                value={data.workplaceAddress.villageHouseRoad}
                onChange={(e) => updateData({ 
                  workplaceAddress: { ...data.workplaceAddress, villageHouseRoad: e.target.value }
                })}
                placeholder={t('register.step3.village.placeholder')}
              />
            </div>

            <div>
              <Label>{t('register.step3.zipcode')}</Label>
              <Input
                value={data.workplaceAddress.zipCode}
                onChange={(e) => updateData({ 
                  workplaceAddress: { ...data.workplaceAddress, zipCode: e.target.value }
                })}
                placeholder={t('register.step3.zipcode.placeholder')}
              />
            </div>
          </div>
        </div>

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

      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
          {t('register.step4.complete')}
        </Button>
      </div>
    </div>
  );
};

export default ProfessionalStep;
