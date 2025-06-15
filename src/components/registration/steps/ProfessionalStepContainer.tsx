import React from 'react';
import ProfessionalStep from '../ProfessionalStep';
import { RegistrationData } from '../RegistrationForm';
import { useNavigate } from 'react-router-dom';

interface StepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}
const ProfessionalStepContainer = ({ data, updateData }: StepProps) => {
  const navigate = useNavigate();

  const handleComplete = () => {
    localStorage.setItem('registrationData', JSON.stringify(data));
    navigate('/profile'); // Go to profile page on complete
  };

  return (
    <ProfessionalStep
      data={data}
      updateData={updateData}
      onComplete={handleComplete}
    />
  );
};

export default ProfessionalStepContainer;
