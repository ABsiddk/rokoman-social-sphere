import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Plus, X } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';

interface PersonalInfoStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}

const PersonalInfoStep = ({ data, updateData, onComplete }: PersonalInfoStepProps) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const genderOptions = [
    { value: 'male', label: t('register.step2.gender.male') },
    { value: 'female', label: t('register.step2.gender.female') },
    { value: 'other', label: t('register.step2.gender.other') }
  ];

  const religionOptions = [
    { value: 'islam', label: t('register.step2.religion.islam') },
    { value: 'hinduism', label: t('register.step2.religion.hinduism') },
    { value: 'christianity', label: t('register.step2.religion.christianity') },
    { value: 'buddhism', label: t('register.step2.religion.buddhism') },
    { value: 'other', label: t('register.step2.religion.other') }
  ];

  const maritalStatusOptions = [
    { value: 'single', label: t('register.step2.marital.single') },
    { value: 'married', label: t('register.step2.marital.married') },
    { value: 'divorced', label: t('register.step2.marital.divorced') },
    { value: 'widowed', label: t('register.step2.marital.widowed') }
  ];

  const addNickname = () => {
    if (data.nickNames.length < 5) {
      updateData({ nickNames: [...data.nickNames, ''] });
    }
  };

  const removeNickname = (index: number) => {
    const newNicknames = data.nickNames.filter((_, i) => i !== index);
    updateData({ nickNames: newNicknames });
  };

  const updateNickname = (index: number, value: string) => {
    const newNicknames = [...data.nickNames];
    newNicknames[index] = value;
    updateData({ nickNames: newNicknames });
  };

  const addAdditionalPhone = () => {
    if (data.additionalPhones.length < 3) {
      updateData({ additionalPhones: [...data.additionalPhones, ''] });
    }
  };

  const removeAdditionalPhone = (index: number) => {
    const newPhones = data.additionalPhones.filter((_, i) => i !== index);
    updateData({ additionalPhones: newPhones });
  };

  const updateAdditionalPhone = (index: number, value: string) => {
    const newPhones = [...data.additionalPhones];
    newPhones[index] = value;
    updateData({ additionalPhones: newPhones });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = t('register.step2.errors.fullname.required');
    }

    if (data.personalEmail && !/\S+@\S+\.\S+/.test(data.personalEmail)) {
      newErrors.personalEmail = t('register.step2.errors.email.invalid');
    }

    if (data.officialEmail && !/\S+@\S+\.\S+/.test(data.officialEmail)) {
      newErrors.officialEmail = t('register.step2.errors.email.invalid');
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
          {t('register.step2.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {t('register.step2.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <Label htmlFor="fullName">{t('register.step2.fullname')} *</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={(e) => updateData({ fullName: e.target.value })}
            placeholder={t('register.step2.fullname.placeholder')}
            className={errors.fullName ? 'border-red-500' : ''}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        {/* Nicknames */}
        <div className="md:col-span-2">
          <Label>{t('register.step2.nickname')}</Label>
          {data.nickNames.map((nickname, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                value={nickname}
                onChange={(e) => updateNickname(index, e.target.value)}
                placeholder={t('register.step2.nickname.placeholder')}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeNickname(index)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
          {data.nickNames.length < 5 && (
            <Button
              type="button"
              variant="outline"
              onClick={addNickname}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              {t('register.step2.nickname.add')}
            </Button>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <Label htmlFor="dateOfBirth">{t('register.step2.dob')}</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => updateData({ dateOfBirth: e.target.value })}
          />
        </div>

        {/* Gender */}
        <div>
          <Label>{t('register.step2.gender')}</Label>
          <Select value={data.gender} onValueChange={(value) => updateData({ gender: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('register.step2.gender.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Religion */}
        <div>
          <Label>{t('register.step2.religion')}</Label>
          <Select value={data.religion} onValueChange={(value) => updateData({ religion: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('register.step2.religion.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {religionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Marital Status */}
        <div>
          <Label>{t('register.step2.marital')}</Label>
          <Select value={data.maritalStatus} onValueChange={(value) => updateData({ maritalStatus: value })}>
            <SelectTrigger>
              <SelectValue placeholder={t('register.step2.marital.placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {maritalStatusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Personal Email */}
        <div>
          <Label htmlFor="personalEmail">{t('register.step2.email.personal')}</Label>
          <Input
            id="personalEmail"
            type="email"
            value={data.personalEmail}
            onChange={(e) => updateData({ personalEmail: e.target.value })}
            placeholder={t('register.step2.email.personal.placeholder')}
            className={errors.personalEmail ? 'border-red-500' : ''}
          />
          {errors.personalEmail && <p className="text-red-500 text-sm mt-1">{errors.personalEmail}</p>}
        </div>

        {/* Official Email */}
        <div>
          <Label htmlFor="officialEmail">{t('register.step2.email.official')}</Label>
          <Input
            id="officialEmail"
            type="email"
            value={data.officialEmail}
            onChange={(e) => updateData({ officialEmail: e.target.value })}
            placeholder={t('register.step2.email.official.placeholder')}
            className={errors.officialEmail ? 'border-red-500' : ''}
          />
          {errors.officialEmail && <p className="text-red-500 text-sm mt-1">{errors.officialEmail}</p>}
        </div>

        {/* Additional Phone Numbers */}
        <div className="md:col-span-2">
          <Label>{t('register.step2.phone.additional')}</Label>
          {data.additionalPhones.map((phone, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Input
                value={phone}
                onChange={(e) => updateAdditionalPhone(index, e.target.value)}
                placeholder={t('register.step2.phone.additional.placeholder')}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeAdditionalPhone(index)}
              >
                <X size={16} />
              </Button>
            </div>
          ))}
          {data.additionalPhones.length < 3 && (
            <Button
              type="button"
              variant="outline"
              onClick={addAdditionalPhone}
              className="mt-2"
            >
              <Plus size={16} className="mr-2" />
              {t('register.step2.phone.additional.add')}
            </Button>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
          {t('register.step2.continue')}
        </Button>
      </div>
    </div>
  );
};

export default PersonalInfoStep;
