
import React from 'react';
import AddressStep from '../AddressStep';
import { RegistrationData } from '../RegistrationForm';

interface StepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
  onComplete: () => void;
}
const AddressStepContainer = (props: StepProps) => <AddressStep {...props} />;

export default AddressStepContainer;
