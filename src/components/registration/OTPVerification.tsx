import React, { useState, useEffect } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '../ui/input-otp';
import { Button } from '../ui/button';
import { ArrowLeft, Copy } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import glassButtonStyles from './phone-password/LiquidGlassButton.module.css';

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
      setError(t('register.otp.error.incomplete'));
      return;
    }

    if (demoOTPs.includes(otp)) {
      onVerified();
    } else {
      setError(t('register.otp.error.invalid'));
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
    <div className="min-h-[70vh] flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-md bg-white dark:bg-gray-800/80 rounded-xl shadow-lg mx-auto p-6 sm:p-8 animate-fade-in">
        <div className="text-center">
          <button
            onClick={onBack}
            className="inline-flex items-center text-[rgb(39,113,150)] hover:text-[rgb(39,113,150)]/80 dark:text-blue-400 dark:hover:text-blue-300 mb-4 transition-colors duration-200 font-medium"
          >
            <ArrowLeft size={16} className="mr-1" />
            {t('common.back')}
          </button>
          
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {t('register.otp.title')}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">
            {t('register.otp.subtitle')}
          </p>
          <p className="font-semibold text-gray-800 dark:text-white">{phoneNumber}</p>
        </div>

        <div className="space-y-4 mt-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
              {formatTime(timeLeft)}
            </p>
            
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleOTPChange}
              className="justify-center"
            >
              <InputOTPGroup className="gap-3 md:gap-4">
                {/* Animated border + bold + responsive sizing */}
                {[0,1,2,3,4,5].map(idx => (
                  <InputOTPSlot 
                    key={idx}
                    index={idx} 
                    className="
                      w-12 h-12 md:w-14 md:h-14 
                      text-lg sm:text-xl bg-white dark:bg-gray-700 
                      border-4 border-gray-300 dark:border-gray-500 
                      text-gray-900 dark:text-white font-bold 
                      transition-all duration-300 
                      focus-within:border-[rgb(39,113,150)] focus-within:shadow-lg 
                      ring-0 
                      animate-[pulse_1.3s_ease-in-out_infinite]  
                      [@media(max-width:400px)]:w-10 [@media(max-width:400px)]:h-10
                      [&.z-10]:border-[rgb(39,113,150)] [&.z-10]:animate-none 
                      "
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <p className="text-red-500 dark:text-red-400 text-center font-medium">{error}</p>
          )}

          <div className="flex items-center justify-center space-x-2">
            <input
              type="checkbox"
              id="autoFill"
              checked={autoFill}
              onChange={(e) => setAutoFill(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            />
            <label htmlFor="autoFill" className="text-sm text-gray-600 dark:text-gray-300 font-medium">
              {t('register.otp.autofill')}
            </label>
          </div>

          <button
            onClick={handleVerify}
            disabled={otp.length !== 6}
            type="button"
            className={
              glassButtonStyles.liquidGlassButton +
              ' w-full mt-2 font-medium text-lg text-[rgb(39,113,150)] dark:text-white ' +
              'transition-all duration-200'
            }
          >
            <span className={glassButtonStyles.liquidGlassButtonContent}>
              {t('register.verify')}
            </span>
          </button>

          {canResend && (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 mb-2 font-medium">
                {t('register.otp.not_received')}
              </p>
              <Button
                onClick={handleResendOTP}
                variant="outline"
                size="sm"
                className="bg-white dark:bg-gray-700 border-[rgb(39,113,150)] text-[rgb(39,113,150)] dark:text-white hover:bg-[rgb(39,113,150)]/10 dark:hover:bg-gray-600 font-medium"
              >
                {t('register.otp.resend')}
              </Button>
            </div>
          )}

          {/* Demo OTPs for testing */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 text-center font-medium">
              {t('register.otp.demo.title')}
            </p>
            <div className="flex justify-center space-x-2">
              {demoOTPs.map((demoOTP, index) => (
                <button
                  key={index}
                  onClick={() => copyDemoOTP(demoOTP)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 font-medium"
                >
                  <span>{demoOTP}</span>
                  <Copy size={12} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
