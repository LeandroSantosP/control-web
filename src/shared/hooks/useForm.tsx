import { useState } from 'react';

export const useForm = (steps: JSX.Element[]) => {
   const [currentStep, setCurrentStep] = useState(0);

   const changeStep = (step: number) => {
      if (step < 0 || step >= steps.length) return;
      setCurrentStep(step);
   };

   return {
      currentStep,
      changeStep,
      currentComponent: steps[currentStep],
      isLastStep: currentStep === steps.length - 1 ? true : false,
   };
};
