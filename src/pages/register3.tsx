import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfessionalStepContainer from '../components/registration/steps/ProfessionalStepContainer';
import { RegistrationData } from '../components/registration/RegistrationForm';
import { useNavigate } from 'react-router-dom';

// Adjusted glass bg gradient for a more pronounced/deep color effect
const glassBgGradient =
  "bg-gradient-to-br from-[#18697d]/95 via-[#22739A]/85 to-[#2ae1ab]/95 dark:from-[#0c273c]/98 dark:via-[#22739A]/85 dark:to-[#099577]/80";

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
    <div className="relative h-screen min-h-[100dvh] w-full overflow-hidden">
      {/* Deepened background layer with 1px gap at top and bottom */}
      <div
        className={`
          fixed inset-x-0 top-1 bottom-1 z-0
          ${glassBgGradient}
          transition-colors duration-300
          pointer-events-none
        `}
        aria-hidden="true"
      >
        {/* Animated blurry shapes for aesthetic consistency */}
        <div className="absolute top-[8%] right-[4%] w-40 h-40 bg-teal-300/50 rounded-full blur-3xl opacity-75 animate-fade-in" />
        <div className="absolute bottom-0 left-[15%] w-32 h-32 bg-indigo-400/50 rounded-full blur-2xl opacity-40 animate-fade-in" />
        <div className="absolute bottom-[12%] right-[20%] w-36 h-36 bg-blue-400/60 rounded-full blur-2xl opacity-30 animate-fade-in" />
      </div>
      <div className="relative z-10 flex flex-col h-full min-h-[100dvh]">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-0 m-0 w-full h-full min-h-[calc(100vh-90px)]">
          <div className="w-full h-auto mx-0 relative z-10 animate-fade-in transition-all duration-300 flex flex-col items-center">
            <div className="w-full h-auto rounded-none shadow-none px-0 py-0 bg-white/80 dark:bg-opacity-60 dark:bg-gray-900 backdrop-blur-md border-0 transition-all duration-300 animate-scale-in flex flex-col items-center">
              <ProfessionalStepContainer
                data={registrationData}
                updateData={updateRegistrationData}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Registerelement3;
