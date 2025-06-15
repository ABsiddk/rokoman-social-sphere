import React from 'react';
import ProfessionalStep from '../ProfessionalStep';
import { RegistrationData } from '../RegistrationForm';

interface StepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}
const ProfessionalStepContainer = (props: StepProps) => <ProfessionalStep {...props} />;

export default ProfessionalStepContainer;
