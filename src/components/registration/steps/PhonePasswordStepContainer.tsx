
import React from 'react';
import PhonePasswordStep from '../PhonePasswordStep';
import { RegistrationData } from '../RegistrationForm';

interface StepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}
const PhonePasswordStepContainer = (props: StepProps) => <PhonePasswordStep {...props} />;

export default PhonePasswordStepContainer;
