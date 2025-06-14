import React, { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  optional?: boolean;
}

export interface MultiStepFormProps {
  steps: FormStep[];
  onComplete?: (data: Record<string, any>) => void;
  onStepChange?: (step: number, data: Record<string, any>) => void;
  className?: string;
  showStepIndicator?: boolean;
  allowSkip?: boolean;
}

export const MultiStepForm = React.forwardRef<HTMLDivElement, MultiStepFormProps>(
  ({ 
    steps, 
    onComplete, 
    onStepChange,
    className,
    showStepIndicator = true,
    allowSkip = false 
  }, ref) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));

    const updateFormData = useCallback((stepData: Record<string, any>) => {
      const newFormData = { ...formData, ...stepData };
      setFormData(newFormData);
      onStepChange?.(currentStep, newFormData);
    }, [formData, currentStep, onStepChange]);

    const goToStep = (stepIndex: number) => {
      if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        setVisitedSteps(prev => new Set([...prev, stepIndex]));
      }
    };

    const goToNext = () => {
      if (currentStep < steps.length - 1) {
        goToStep(currentStep + 1);
      }
    };

    const goToPrevious = () => {
      if (currentStep > 0) {
        goToStep(currentStep - 1);
      }
    };

    const handleComplete = () => {
      onComplete?.(formData);
    };

    const canGoToStep = (stepIndex: number) => {
      return visitedSteps.has(stepIndex) || stepIndex === currentStep + 1;
    };

    return (
      <div ref={ref} className={cn("w-full max-w-2xl mx-auto", className)}>
        {/* Step Indicator */}
        {showStepIndicator && (
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => canGoToStep(index) && goToStep(index)}
                    disabled={!canGoToStep(index)}
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full border-2 font-medium text-sm transition-colors",
                      index === currentStep && "border-primary bg-primary text-primary-foreground",
                      index < currentStep && "border-primary bg-primary text-primary-foreground",
                      index > currentStep && "border-muted-foreground/30 text-muted-foreground",
                      canGoToStep(index) && "hover:border-primary cursor-pointer",
                      !canGoToStep(index) && "cursor-not-allowed opacity-50"
                    )}
                  >
                    {index + 1}
                  </button>
                  
                  {index < steps.length - 1 && (
                    <div 
                      className={cn(
                        "w-12 h-0.5 mx-2",
                        index < currentStep ? "bg-primary" : "bg-muted-foreground/30"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {/* Step Info */}
            <div className="mt-4 text-center">
              <h2 className="text-lg font-semibold">{steps[currentStep].title}</h2>
              {steps[currentStep].description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {steps[currentStep].description}
                </p>
              )}
              {steps[currentStep].optional && (
                <span className="inline-block mt-2 px-2 py-1 text-xs bg-muted rounded-full">
                  Optional
                </span>
              )}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="mb-8 min-h-[200px]">
          {React.cloneElement(steps[currentStep].content as React.ReactElement, {
            formData,
            updateFormData,
            currentStep
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={currentStep === 0}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
            {allowSkip && steps[currentStep].optional && (
              <button
                onClick={goToNext}
                className="ml-4 text-primary hover:underline"
              >
                Skip this step
              </button>
            )}
          </div>

          {currentStep < steps.length - 1 ? (
            <Button onClick={goToNext} className="flex items-center">
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              Complete
            </Button>
          )}
        </div>
      </div>
    );
  }
);

MultiStepForm.displayName = "MultiStepForm";