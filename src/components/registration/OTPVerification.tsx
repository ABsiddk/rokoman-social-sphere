
import React, { useState, useEffect } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Button } from '../ui/button';
import { ArrowLeft, Copy } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerified: () => void;
  onBack: () => void;
}

const OTPVerification = ({ phoneNumber, onVerified, onBack }: OTPVerificationProps) => {
  const { t } = useLanguage();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [canResend, setCanResend] = useState(false);
  const [autoFill, setAutoFill] = useState(false);
  const [error, setError] = useState('');

  // Demo OTPs for testing
  const demoOTPs = ['123456', '654321', '111111'];

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOTPChange = (value: string) => {
    setOtp(value);
    setError('');
  };

  const handleVerify = () => {
    if (otp.length !== 6) {
      setError(t('registration.otp.error.incomplete'));
      return;
    }

    // Check against demo OTPs
    if (demoOTPs.includes(otp)) {
      onVerified();
    } else {
      setError(t('registration.otp.error.invalid'));
    }
  };

  const handleResendOTP = () => {
    setTimeLeft(180);
    setCanResend(false);
    setOtp('');
    setError('');
  };

  const copyDemoOTP = (demoOTP: string) => {
    navigator.clipboard.writeText(demoOTP);
    if (autoFill) {
      setOtp(demoOTP);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
        >
          <ArrowLeft size={16} className="mr-1" />
          {t('common.back')}
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          {t('registration.otp.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          {t('registration.otp.subtitle')}
        </p>
        <p className="font-semibold">{phoneNumber}</p>
      </div>

      <div className="space-y-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600 mb-4">
            {formatTime(timeLeft)}
          </p>
          
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={handleOTPChange}
            className="justify-center"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {error && (
          <p className="text-red-500 text-center">{error}</p>
        )}

        <div className="flex items-center justify-center space-x-2">
          <input
            type="checkbox"
            id="autoFill"
            checked={autoFill}
            onChange={(e) => setAutoFill(e.target.checked)}
            className="rounded"
          />
          <label htmlFor="autoFill" className="text-sm text-gray-600 dark:text-gray-300">
            {t('registration.otp.autofill')}
          </label>
        </div>

        <Button
          onClick={handleVerify}
          disabled={otp.length !== 6}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          {t('registration.verify')}
        </Button>

        {canResend && (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              {t('registration.otp.not.received')}
            </p>
            <Button
              onClick={handleResendOTP}
              variant="outline"
              size="sm"
            >
              {t('registration.otp.resend')}
            </Button>
          </div>
        )}

        {/* Demo OTPs for testing */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-2 text-center">
            {t('registration.otp.demo.title')}
          </p>
          <div className="flex justify-center space-x-2">
            {demoOTPs.map((demoOTP, index) => (
              <button
                key={index}
                onClick={() => copyDemoOTP(demoOTP)}
                className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <span>{demoOTP}</span>
                <Copy size={12} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
