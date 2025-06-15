
import React, { useState } from 'react';
// import { Button } from '../ui/button';
import LiquidGlassButton from '../ui/LiquidGlassButton';
import { Label } from '../ui/label';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import OTPVerification from './OTPVerification';
import PhoneInput from './phone-password/PhoneInput';
import { validatePhone } from './phone-password/validationUtils';
import { useNavigate } from 'react-router-dom';

interface PhonePasswordStepProps {
  data: RegistrationData;
  updateData: (data: Partial<RegistrationData>) => void;
}

const PhonePasswordStep = ({ data, updateData }: PhonePasswordStepProps) => {
  const { t } = useLanguage();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (value: string) => {
    updateData({ phone: value });
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleSendOTP = () => {
    const newErrors: Record<string, string> = {};
    const phoneError = validatePhone(data.phone, t);
    if (phoneError) newErrors.phone = phoneError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setShowOTP(true);
  };

  const handleOTPVerified = () => {
    // Navigate to register2 page after OTP verification
    navigate('/register2');
  };

  if (showOTP) {
    // Bangladesh only, so phoneNumber is always "+88 phone"
    return (
      <OTPVerification
        phoneNumber={`+88 ${data.phone}`}
        onVerified={handleOTPVerified}
        onBack={() => setShowOTP(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('register.step1.title')}
        </h2>
      </div>

      <div className="space-y-6">
        {/* Phone Number only */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium text-sm">
            {t('register.step1.phone')} <span className="text-red-500">*</span>
          </Label>
          <div className="w-full">
            <PhoneInput
              value={data.phone}
              onChange={handlePhoneChange}
              error={errors.phone}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm font-medium mt-2">{errors.phone}</p>}
        </div>

        {/* Centered, animated silky glass button */}
        <div className="flex justify-center w-full">
          <LiquidGlassButton
            onClick={handleSendOTP}
            className="w-full sm:w-auto font-semibold py-3 h-12 px-6 text-white dark:text-cyan-100 text-base" // eye-comfort/contrast color!
            disabled={data.phone.length === 0}
            type="button"
            >
            {t('register.step1.send_otp')}
          </LiquidGlassButton>
        </div>
      </div>
    </div>
  );
};

export default PhonePasswordStep;
