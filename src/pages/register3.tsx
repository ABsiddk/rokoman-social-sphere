
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfessionalStepContainer from '../components/registration/steps/ProfessionalStepContainer';
import { RegistrationData } from '../components/registration/RegistrationForm';

const Registerelement3 = () => {
  // Initialize with empty professional info data
  const [registrationData, setRegistrationData] = React.useState<RegistrationData>({
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-colors duration-300">
            <ProfessionalStepContainer
              data={registrationData}
              updateData={updateRegistrationData}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registerelement3;
