import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import StepIndicator from './StepIndicator';
import PhonePasswordStep from './PhonePasswordStep';
import PersonalInfoStep from './PersonalInfoStep';
import AddressStep from './AddressStep';
import ProfessionalStep from './ProfessionalStep';

export interface RegistrationData {
  // Step 1
  phone: string;
  countryCode: string;
  password: string;
  confirmPassword: string;
  
  // Step 2
  fullName: string;
  nickNames: string[];
  dateOfBirth: string;
  gender: string;
  religion: string;
  maritalStatus: string;
  personalEmail: string;
  officialEmail: string;
  additionalPhones: string[];
  
  // Step 3
  presentAddress: {
    nationality: string;
    division: string;
    district: string;
    subDistrict: string;
    villageHouseRoad: string;
    zipCode: string;
  };
  permanentAddress: {
    nationality: string;
    division: string;
    district: string;
    subDistrict: string;
    villageHouseRoad: string;
    zipCode: string;
  };
  sameAsPresentAddress: boolean;
  
  // Step 4
  occupation: string;
  businessType?: string;
  businessSubCategory?: string;
  businessName?: string;
  designation?: string;
  workplaceAddress: {
    nationality: string;
    division: string;
    district: string;
    subDistrict: string;
    villageHouseRoad: string;
    zipCode: string;
  };
  specialNote: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  jobDescription: string;
}

const RegistrationForm = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    phone: '',
    countryCode: '+88',
    password: '',
    confirmPassword: '',
    fullName: '',
    nickNames: [],
    dateOfBirth: '',
    gender: '',
    religion: '',
    maritalStatus: '',
    personalEmail: '',
    officialEmail: '',
    additionalPhones: [],
    presentAddress: {
      nationality: 'Bangladesh',
      division: '',
      district: '',
      subDistrict: '',
      villageHouseRoad: '',
      zipCode: ''
    },
    permanentAddress: {
      nationality: 'Bangladesh',
      division: '',
      district: '',
      subDistrict: '',
      villageHouseRoad: '',
      zipCode: ''
    },
    sameAsPresentAddress: false,
    occupation: '',
    workplaceAddress: {
      nationality: 'Bangladesh',
      division: '',
      district: '',
      subDistrict: '',
      villageHouseRoad: '',
      zipCode: ''
    },
    specialNote: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    jobDescription: ''
  });

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  const completeStep = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
    if (step < 4) {
      setCurrentStep(step + 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PhonePasswordStep
            data={registrationData}
            updateData={updateRegistrationData}
            onComplete={() => completeStep(1)}
          />
        );
      case 2:
        return (
          <PersonalInfoStep
            data={registrationData}
            updateData={updateRegistrationData}
            onComplete={() => completeStep(2)}
          />
        );
      case 3:
        return (
          <AddressStep
            data={registrationData}
            updateData={updateRegistrationData}
            onComplete={() => completeStep(3)}
          />
        );
      case 4:
        return (
          <ProfessionalStep
            data={registrationData}
            updateData={updateRegistrationData}
            onComplete={() => completeStep(4)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
            {t('register.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {t('register.subtitle')}
          </p>
        </div>

        <StepIndicator
          currentStep={currentStep}
          completedSteps={completedSteps}
          totalSteps={4}
        />

        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
