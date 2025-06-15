
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { useLanguage } from '../../contexts/LanguageContext';
import { RegistrationData } from './RegistrationForm';
import OTPVerification from './OTPVerification';
import CountryCodeSelect from './phone-password/CountryCodeSelect';
import PhoneInput from './phone-password/PhoneInput';
import { countryOptions } from './phone-password/countryOptions';
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
    const phoneError = validatePhone(data.phone, data.countryCode, t);
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
    return (
      <OTPVerification
        phoneNumber={`${data.countryCode} ${data.phone}`}
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
        {/* Country Code and Phone Number */}
        <div className="space-y-3">
          <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium text-sm">
            {t('register.step1.phone')} <span className="text-red-500">*</span>
          </Label>
          <div className="flex gap-2 w-full">
            <CountryCodeSelect
              value={data.countryCode}
              onChange={(value) => updateData({ countryCode: value })}
              countries={countryOptions}
            />
            <PhoneInput
              value={data.phone}
              onChange={handlePhoneChange}
              countryCode={data.countryCode}
              error={errors.phone}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm font-medium mt-2">{errors.phone}</p>}
        </div>

        <Button
          onClick={handleSendOTP}
          className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800 text-white font-semibold py-3 h-12 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
          size="lg"
        >
          {t('register.step1.send_otp')}
        </Button>
      </div>
    </div>
  );
};

export default PhonePasswordStep;
