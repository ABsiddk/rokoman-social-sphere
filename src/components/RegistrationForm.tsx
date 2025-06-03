
import React, { useState } from 'react';
import { useUser, UserEmail, UserPhone, UserExperience, bangladeshDistricts } from '../contexts/UserContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Plus, Trash2, Calendar, User, MapPin, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const { createUser } = useUser();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2
    name: '',
    nickNames: [''],
    dateOfBirth: '',
    gender: '',
    religion: '',
    maritalStatus: '',
    emails: [{ id: '1', email: '', type: 'personal' as const }] as UserEmail[],
    phones: [{ id: '1', phone: '', type: 'personal' as const }] as UserPhone[],
    
    // Step 3
    presentAddress: { district: '', address: '' },
    permanentAddress: { district: '', address: '' },
    
    // Step 4
    experiences: [] as UserExperience[],
    profileHeadline: ''
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendOtp = () => {
    // Simulate OTP sending
    toast({
      title: t('registration.otp.sent'),
      description: t('registration.otp.message') + ' 123456'
    });
  };

  const verifyOtp = () => {
    if (otp === '123456') {
      setIsOtpVerified(true);
      toast({
        title: t('registration.otp.verified'),
        description: t('registration.otp.success')
      });
    } else {
      toast({
        title: t('registration.otp.error'),
        description: t('registration.otp.invalid'),
        variant: 'destructive'
      });
    }
  };

  const addNickName = () => {
    setFormData(prev => ({
      ...prev,
      nickNames: [...prev.nickNames, '']
    }));
  };

  const removeNickName = (index: number) => {
    setFormData(prev => ({
      ...prev,
      nickNames: prev.nickNames.filter((_, i) => i !== index)
    }));
  };

  const updateNickName = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      nickNames: prev.nickNames.map((nick, i) => i === index ? value : nick)
    }));
  };

  const addEmail = () => {
    const newEmail: UserEmail = {
      id: Date.now().toString(),
      email: '',
      type: 'personal'
    };
    setFormData(prev => ({
      ...prev,
      emails: [...prev.emails, newEmail]
    }));
  };

  const removeEmail = (id: string) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails.filter(email => email.id !== id)
    }));
  };

  const updateEmail = (id: string, field: keyof UserEmail, value: string) => {
    setFormData(prev => ({
      ...prev,
      emails: prev.emails.map(email => 
        email.id === id ? { ...email, [field]: value } : email
      )
    }));
  };

  const addPhone = () => {
    const newPhone: UserPhone = {
      id: Date.now().toString(),
      phone: '',
      type: 'personal'
    };
    setFormData(prev => ({
      ...prev,
      phones: [...prev.phones, newPhone]
    }));
  };

  const removePhone = (id: string) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.filter(phone => phone.id !== id)
    }));
  };

  const updatePhone = (id: string, field: keyof UserPhone, value: string) => {
    setFormData(prev => ({
      ...prev,
      phones: prev.phones.map(phone => 
        phone.id === id ? { ...phone, [field]: value } : phone
      )
    }));
  };

  const addExperience = () => {
    const newExperience: UserExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      startDate: '',
      isCurrent: false,
      location: '',
      description: ''
    };
    setFormData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }));
  };

  const removeExperience = (id: string) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const updateExperience = (id: string, field: keyof UserExperience, value: any) => {
    setFormData(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!formData.phone || !formData.password || !isOtpVerified) {
        toast({
          title: t('registration.error'),
          description: t('registration.complete.step1'),
          variant: 'destructive'
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: t('registration.error'),
          description: t('registration.password.mismatch'),
          variant: 'destructive'
        });
        return;
      }
    }
    
    if (currentStep === 2 && !formData.name) {
      toast({
        title: t('registration.error'),
        description: t('registration.name.required'),
        variant: 'destructive'
      });
      return;
    }
    
    if (currentStep === 3) {
      if (!formData.presentAddress.district || !formData.permanentAddress.district) {
        toast({
          title: t('registration.error'),
          description: t('registration.district.required'),
          variant: 'destructive'
        });
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    const userData = {
      name: formData.name,
      nickNames: formData.nickNames.filter(nick => nick.trim() !== ''),
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender as any,
      religion: formData.religion,
      maritalStatus: formData.maritalStatus as any,
      emails: formData.emails.filter(email => email.email.trim() !== ''),
      phones: [{ id: '1', phone: formData.phone, type: 'personal' as const }, ...formData.phones.filter(phone => phone.phone.trim() !== '')],
      presentAddress: formData.presentAddress,
      permanentAddress: formData.permanentAddress,
      experiences: formData.experiences,
      profileHeadline: formData.profileHeadline,
      role: 'user' as const,
      isActive: true
    };

    createUser(userData);
    
    toast({
      title: t('registration.success'),
      description: t('registration.profile.created')
    });
    
    navigate('/profile');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('registration.step1.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('registration.step1.subtitle')}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.phone.number')}
          </label>
          <div className="flex gap-2">
            <Input
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+880 1234-567890"
              className="flex-1"
            />
            <Button onClick={sendOtp} variant="outline">
              {t('registration.send.otp')}
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.enter.otp')}
          </label>
          <div className="flex gap-2">
            <Input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="123456"
              className="flex-1"
            />
            <Button onClick={verifyOtp} variant="outline">
              {t('registration.verify')}
            </Button>
          </div>
          {isOtpVerified && (
            <p className="text-green-600 text-sm mt-1">{t('registration.otp.verified')}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.password')}
          </label>
          <Input
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            placeholder={t('registration.password')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.confirm.password')}
          </label>
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            placeholder={t('registration.confirm.password')}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('registration.step2.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('registration.step2.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.full.name')} *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder={t('registration.full.name')}
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.nick.names')}
          </label>
          {formData.nickNames.map((nick, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={nick}
                onChange={(e) => updateNickName(index, e.target.value)}
                placeholder={`${t('registration.nick.name')} ${index + 1}`}
                className="flex-1"
              />
              {formData.nickNames.length > 1 && (
                <Button 
                  onClick={() => removeNickName(index)} 
                  variant="outline" 
                  size="sm"
                >
                  <Trash2 size={16} />
                </Button>
              )}
            </div>
          ))}
          <Button onClick={addNickName} variant="outline" size="sm">
            <Plus size={16} className="mr-1" />
            {t('registration.add.nickname')}
          </Button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.date.of.birth')}
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.gender')}
          </label>
          <select
            value={formData.gender}
            onChange={(e) => handleInputChange('gender', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">{t('registration.select.gender')}</option>
            <option value="male">{t('registration.male')}</option>
            <option value="female">{t('registration.female')}</option>
            <option value="other">{t('registration.other')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.religion')}
          </label>
          <select
            value={formData.religion}
            onChange={(e) => handleInputChange('religion', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">{t('registration.select.religion')}</option>
            <option value="Islam">{t('registration.islam')}</option>
            <option value="Hinduism">{t('registration.hinduism')}</option>
            <option value="Christianity">{t('registration.christianity')}</option>
            <option value="Buddhism">{t('registration.buddhism')}</option>
            <option value="Other">{t('registration.other')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('registration.marital.status')}
          </label>
          <select
            value={formData.maritalStatus}
            onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="">{t('registration.select.marital.status')}</option>
            <option value="single">{t('registration.single')}</option>
            <option value="married">{t('registration.married')}</option>
            <option value="divorced">{t('registration.divorced')}</option>
            <option value="widowed">{t('registration.widowed')}</option>
          </select>
        </div>
      </div>

      {/* Email Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('registration.emails')}
        </label>
        {formData.emails.map((email, index) => (
          <div key={email.id} className="flex gap-2 mb-2">
            <Input
              value={email.email}
              onChange={(e) => updateEmail(email.id, 'email', e.target.value)}
              placeholder={t('registration.email')}
              className="flex-1"
            />
            <select
              value={email.type}
              onChange={(e) => updateEmail(email.id, 'type', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="personal">{t('registration.personal')}</option>
              <option value="office">{t('registration.office')}</option>
            </select>
            {formData.emails.length > 1 && (
              <Button onClick={() => removeEmail(email.id)} variant="outline" size="sm">
                <Trash2 size={16} />
              </Button>
            )}
          </div>
        ))}
        <Button onClick={addEmail} variant="outline" size="sm">
          <Plus size={16} className="mr-1" />
          {t('registration.add.email')}
        </Button>
      </div>

      {/* Phone Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('registration.additional.phones')}
        </label>
        {formData.phones.map((phone, index) => (
          <div key={phone.id} className="flex gap-2 mb-2">
            <Input
              value={phone.phone}
              onChange={(e) => updatePhone(phone.id, 'phone', e.target.value)}
              placeholder={t('registration.phone.number')}
              className="flex-1"
            />
            <select
              value={phone.type}
              onChange={(e) => updatePhone(phone.id, 'type', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              <option value="personal">{t('registration.personal')}</option>
              <option value="office">{t('registration.office')}</option>
            </select>
            <Button onClick={() => removePhone(phone.id)} variant="outline" size="sm">
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
        <Button onClick={addPhone} variant="outline" size="sm">
          <Plus size={16} className="mr-1" />
          {t('registration.add.phone')}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('registration.step3.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('registration.step3.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Present Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {t('registration.present.address')}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('registration.district')} *
            </label>
            <select
              value={formData.presentAddress.district}
              onChange={(e) => handleInputChange('presentAddress', { ...formData.presentAddress, district: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">{t('registration.select.district')}</option>
              {bangladeshDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('registration.address.details')}
            </label>
            <Textarea
              value={formData.presentAddress.address}
              onChange={(e) => handleInputChange('presentAddress', { ...formData.presentAddress, address: e.target.value })}
              placeholder={t('registration.address.placeholder')}
              rows={3}
            />
          </div>
        </div>

        {/* Permanent Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {t('registration.permanent.address')}
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('registration.district')} *
            </label>
            <select
              value={formData.permanentAddress.district}
              onChange={(e) => handleInputChange('permanentAddress', { ...formData.permanentAddress, district: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[rgb(39,113,150)] dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            >
              <option value="">{t('registration.select.district')}</option>
              {bangladeshDistricts.map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('registration.address.details')}
            </label>
            <Textarea
              value={formData.permanentAddress.address}
              onChange={(e) => handleInputChange('permanentAddress', { ...formData.permanentAddress, address: e.target.value })}
              placeholder={t('registration.address.placeholder')}
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('registration.step4.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {t('registration.step4.subtitle')}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {t('registration.profile.headline')}
        </label>
        <Input
          value={formData.profileHeadline}
          onChange={(e) => handleInputChange('profileHeadline', e.target.value)}
          placeholder={t('registration.profile.headline.placeholder')}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('registration.professional.experience')}
          </label>
          <Button onClick={addExperience} variant="outline" size="sm">
            <Plus size={16} className="mr-1" />
            {t('registration.add.experience')}
          </Button>
        </div>

        {formData.experiences.map((experience, index) => (
          <div key={experience.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-800 dark:text-white">
                {t('registration.experience')} {index + 1}
              </h4>
              <Button onClick={() => removeExperience(experience.id)} variant="outline" size="sm">
                <Trash2 size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('registration.job.title')}
                </label>
                <Input
                  value={experience.jobTitle}
                  onChange={(e) => updateExperience(experience.id, 'jobTitle', e.target.value)}
                  placeholder={t('registration.job.title')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('registration.company')}
                </label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder={t('registration.company')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('registration.start.date')}
                </label>
                <Input
                  type="date"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('registration.end.date')}
                </label>
                <Input
                  type="date"
                  value={experience.endDate || ''}
                  onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  disabled={experience.isCurrent}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={experience.isCurrent}
                    onChange={(e) => updateExperience(experience.id, 'isCurrent', e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {t('registration.currently.working')}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('registration.job.location')}
                </label>
                <Input
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder={t('registration.job.location')}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {t('registration.job.description')}
                </label>
                <Textarea
                  value={experience.description}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                  placeholder={t('registration.job.description.placeholder')}
                  rows={3}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step <= currentStep
                  ? 'bg-[rgb(39,113,150)] text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step === 1 ? <User size={20} /> :
               step === 2 ? <User size={20} /> :
               step === 3 ? <MapPin size={20} /> :
               <Briefcase size={20} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{t('registration.step1.title')}</span>
          <span>{t('registration.step2.title')}</span>
          <span>{t('registration.step3.title')}</span>
          <span>{t('registration.step4.title')}</span>
        </div>
      </div>

      {/* Step content */}
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button
          onClick={prevStep}
          disabled={currentStep === 1}
          variant="outline"
        >
          <ArrowLeft size={16} className="mr-2" />
          {t('registration.previous')}
        </Button>

        {currentStep < 4 ? (
          <Button onClick={nextStep} className="bg-[rgb(39,113,150)] hover:bg-[rgb(39,113,150)]/90">
            {t('registration.next')}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            {t('registration.save.profile')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
