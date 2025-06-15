import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import StepIndicator from './StepIndicator';
import PhonePasswordStepContainer from './steps/PhonePasswordStepContainer';
import PersonalInfoStepContainer from './steps/PersonalInfoStepContainer';
import AddressStepContainer from './steps/AddressStepContainer';

export interface RegistrationData {
  // Step 1
  phone: string;
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
  workplaceAddress: {
    nationality: string;
    division: string;
    district: string;
    subDistrict: string;
    villageHouseRoad: string;
    zipCode: string;
  };
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  professionType: string;
  isBCS?: boolean;
  bcsSession?: string;
  // ---- NEW FIELDS ----
  institutionName?: string;
  department?: string;
  designation?: string;
  jobLocation?: string;
  
  // Step 4 additions for Student
  gradeLevel?: string;
  sessionYear?: string;
  
  // New fields for enhanced professional step
  professionDescription?: string;
  workAddress?: string;
}

const RegistrationForm = () => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    nickNames: [],
    dateOfBirth: '',
    gender: '',
    religion: '',
    maritalStatus: '',
    personalEmail: '',
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
    workplaceAddress: {
      nationality: 'Bangladesh',
      division: '',
      district: '',
      subDistrict: '',
      villageHouseRoad: '',
      zipCode: ''
    },
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    professionType: '',
    isBCS: false,
    bcsSession: '',
    institutionName: '',
    department: '',
    designation: '',
    jobLocation: '',
    gradeLevel: '',
    sessionYear: '',
    professionDescription: '',
    workAddress: ''
  });

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  const completeStep = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps(prev => [...prev, step]);
    }
    if (step < 3) {
      setCurrentStep(step + 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        // No StepIndicator on first step, only the form
        return (
          <PhonePasswordStepContainer
            data={registrationData}
            updateData={updateRegistrationData}
            // Remove onComplete for this step, handled by navigate in PhonePasswordStep
          />
        );
      case 2:
        return (
          <>
            <StepIndicator
              currentStep={currentStep}
              completedSteps={completedSteps}
              totalSteps={3}
            />
            <PersonalInfoStepContainer
              data={registrationData}
              updateData={updateRegistrationData}
              onComplete={() => completeStep(2)}
            />
          </>
        );
      case 3:
        return (
          <>
            <StepIndicator
              currentStep={currentStep}
              completedSteps={completedSteps}
              totalSteps={3}
            />
            <AddressStepContainer
              data={registrationData}
              updateData={updateRegistrationData}
              onComplete={() => completeStep(3)}
            />
          </>
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

        <div className="mt-8">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
