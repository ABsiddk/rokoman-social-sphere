import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfessionalStepContainer from '../components/registration/steps/ProfessionalStepContainer';
import { RegistrationData } from '../components/registration/RegistrationForm';
import { useNavigate } from 'react-router-dom';

// Glass bg gradient for visual comfort
const glassBgGradient =
  "bg-gradient-to-br from-green-100/80 via-blue-100/60 to-indigo-200/80 dark:from-gray-900 dark:via-[#22739A]/50 dark:to-gray-800/90";

const Registerelement3 = () => {
  // On initial render, prefer localStorage value
  const getInitialRegistrationData = (): RegistrationData => {
    const persisted = localStorage.getItem('registrationData');
    if (persisted) {
      try {
        return JSON.parse(persisted);
      } catch {
        // fallback below
      }
    }
    return {
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
      professionType: '' // <-- NEW
    };
  };

  const [registrationData, setRegistrationData] = React.useState<RegistrationData>(getInitialRegistrationData);

  // Keep localStorage in sync
  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('registrationData', JSON.stringify(updated));
      return updated;
    });
  };

  const navigate = useNavigate();

  // Handler for when step is completed, could navigate or finish registration flow
  const handleComplete = () => {
    console.log('Professional information completed:', registrationData);
    localStorage.setItem('registrationData', JSON.stringify(registrationData));
    // Future navigation: e.g. navigate('/registration-success');
  };

  return (
    <div className={`min-h-screen ${glassBgGradient} transition-colors duration-300 relative overflow-hidden`}>
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Animated blurry shapes for aesthetic consistency */}
        <div className="absolute top-[8%] right-[4%] w-40 h-40 bg-teal-200/40 rounded-full blur-3xl opacity-60 animate-fade-in" />
        <div className="absolute bottom-0 left-[15%] w-32 h-32 bg-indigo-300/50 rounded-full blur-2xl opacity-30 animate-fade-in" />
        <div className="absolute bottom-[12%] right-[20%] w-36 h-36 bg-blue-300/60 rounded-full blur-2xl opacity-20 animate-fade-in" />
      </div>
      <Header />
      <main className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[90vh]">
        <div className="max-w-4xl w-full mx-auto relative z-10 animate-fade-in">
          {/* Glass style container for symmetry */}
          <div className="rounded-2xl shadow-xl px-6 py-8 sm:p-10 bg-white/80 dark:bg-opacity-60 dark:bg-gray-900 backdrop-blur-md border border-gray-200 dark:border-[#1B2936] transition-all duration-300 animate-scale-in">
            <ProfessionalStepContainer
              data={registrationData}
              updateData={updateRegistrationData}
              // Pass handleComplete if internal "continue" button is implemented
              // If not, add submit button here like in register2
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Registerelement3;
