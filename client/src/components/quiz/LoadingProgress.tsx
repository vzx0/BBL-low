import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Calculator, Heart, Target } from "lucide-react";
import type { QuizData } from "@/pages/quiz";

interface LoadingProgressProps {
  onNext: () => void;
  onPrevious: () => void;
  data: Partial<QuizData>;
}

const analysisSteps = [
  { icon: Calculator, text: "Calculating your ideal BMI...", duration: 2000 },
  { icon: Heart, text: "Analyzing your health needs...", duration: 2500 },
  { icon: Target, text: "Creating your personalized plan...", duration: 3000 }
];

export default function LoadingProgress({ onNext, onPrevious, data }: LoadingProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCompleted(true);
          clearInterval(timer);
          setTimeout(() => onNext(), 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onNext]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepTimer);
        return prev;
      });
    }, 2000);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Analyzing your responses...
          </h1>
          <p className="text-gray-600 text-lg">
            Creating your personalized BBL program
          </p>
        </div>

        <div className="max-w-md mx-auto mb-12">
          <div className="space-y-8">
            {analysisSteps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index <= currentStep;
              const isCompleted = index < currentStep || completed;
              
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 transition-all duration-500 ${
                    isActive ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted ? "bg-green-500" : isActive ? "bg-primary" : "bg-gray-200"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-white" />
                    ) : (
                      <IconComponent className="h-6 w-6 text-white" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <p className={`font-medium ${
                      isActive ? "text-gray-900" : "text-gray-500"
                    }`}>
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>



        {completed && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <p className="text-lg font-medium text-green-600">
              Analysis complete! Redirecting...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}