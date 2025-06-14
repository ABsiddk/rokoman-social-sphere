
import React from 'react';
import PersonalInfoStep from '../PersonalInfoStep';
import { RegistrationData } from '../RegistrationForm';

interface StepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}
const PersonalInfoStepContainer = (props: StepProps) => <PersonalInfoStep {...props} />;

export default PersonalInfoStepContainer;
