
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

  const handleComplete = () => {
    console.log('Professional information completed:', registrationData);
    // Handle completion logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-[#277196] via-[#36a9e1] to-[#c6e6fa] dark:from-[#103c57] dark:via-[#277196] dark:to-[#39536d] transition-colors duration-300">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="bg-white/80 dark:bg-[#277196]/80 backdrop-blur-lg border border-primary/20 rounded-2xl shadow-2xl p-0 sm:p-1 md:p-2 transition-colors duration-300 overflow-hidden">
            <div className="px-8 py-8 sm:p-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-sky-300 dark:from-white dark:via-primary dark:to-sky-200 mb-2 transition-colors duration-300">
                  Professional Registration
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-200 font-medium transition-colors duration-300">
                  Tell us about your occupation, business, and workplace info below.
                </p>
              </div>
              <ProfessionalStepContainer
                data={registrationData}
                updateData={updateRegistrationData}
                onComplete={handleComplete}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registerelement3;
