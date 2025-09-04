import { ReactNode } from 'react';

interface WizardStepProps {
  children: ReactNode;
  isActive: boolean;
  isCompleted?: boolean;
}

export function WizardStep({ children, isActive, isCompleted }: WizardStepProps) {
  if (!isActive && !isCompleted) {
    return null;
  }

  return (
    <div className={`transition-all duration-300 ${
      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 hidden'
    }`}>
      {children}
    </div>
  );
}