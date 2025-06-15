
import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
  totalSteps: number;
}

const StepIndicator = ({ currentStep, completedSteps, totalSteps }: StepIndicatorProps) => {
  const { t } = useLanguage();

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1:
        return t('register.step1.title');
      case 2:
        return t('register.step2.title');
      case 3:
        return t('register.step3.title');
      default:
        return '';
    }
  };

  return (
    <div className="flex justify-between items-start mb-8">
      {Array.from({ length: 3 }, (_, index) => {
        const stepNumber = index + 1;
        const isCompleted = completedSteps.includes(stepNumber);
        const isCurrent = currentStep === stepNumber;

        return (
          <div key={stepNumber} className="flex flex-col items-center flex-1">
            <div className="flex items-center w-full">
              <div className="flex justify-center w-full">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-200 border-gray-300 text-gray-500'
                  }`}
                >
                  {isCompleted ? (
                    <Check size={20} />
                  ) : (
                    <span className="text-sm font-semibold">{stepNumber}</span>
                  )}
                </div>
              </div>
              {stepNumber < 3 && (
                <div
                  className={`flex-1 h-0.5 ml-2 ${
                    completedSteps.includes(stepNumber) ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
            <span className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
              {getStepTitle(stepNumber)}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;

