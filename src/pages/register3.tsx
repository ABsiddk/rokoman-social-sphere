
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfessionalStepContainer from '../components/registration/steps/ProfessionalStepContainer';
import { RegistrationData } from '../components/registration/RegistrationForm';
import { useNavigate } from 'react-router-dom';

// Responsive glass bg gradient for visual comfort (handles light/dark)
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
      professionType: ''
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
    <div
      // Responsive: use full viewport height, no whitespace at edges, glass gradient bg
      className={`relative h-screen w-screen overflow-hidden ${glassBgGradient} transition-colors duration-300`}
      style={{ minHeight: '100dvh', minWidth: '100vw' }}
    >
      {/* Fixed, responsive background layers always flush with viewport (no gaps above/below header/footer) */}
      <div
        className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-0"
        aria-hidden="true"
      >
        <div className="absolute top-[8%] right-[4%] w-40 h-40 bg-teal-200/40 rounded-full blur-3xl opacity-60 animate-fade-in" />
        <div className="absolute bottom-0 left-[15%] w-32 h-32 bg-indigo-300/50 rounded-full blur-2xl opacity-30 animate-fade-in" />
        <div className="absolute bottom-[12%] right-[20%] w-36 h-36 bg-blue-300/60 rounded-full blur-2xl opacity-20 animate-fade-in" />
      </div>
      {/* Real content is positioned relative to z-10 */}
      <div className="relative flex flex-col min-h-screen h-full z-10">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-0 m-0 w-full h-full min-h-0">
          <div className="w-full h-auto mx-0 animate-fade-in transition-all duration-300 flex flex-col items-center">
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
