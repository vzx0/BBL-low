import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, AlertTriangle, CheckCircle, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface HealthConditionsProps {
  onNext: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const conditions = [
  { value: "diabetes", label: "Diabetes", icon: Heart },
  { value: "hypertension", label: "Hipertensão", icon: AlertTriangle },
  { value: "heart", label: "Problemas cardíacos", icon: Heart },
  { value: "joints", label: "Problemas articulares", icon: AlertTriangle },
  { value: "other", label: "Outros", icon: X },
  { value: "none", label: "Nenhuma das opções acima", icon: CheckCircle }
];

export default function HealthConditions({ onNext, onUpdate, data }: HealthConditionsProps) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>(data.healthConditions || []);

  const toggleCondition = (condition: string) => {
    if (condition === "none") {
      setSelectedConditions(["none"]);
    } else {
      setSelectedConditions(prev => {
        const newConditions = prev.filter(c => c !== "none");
        return prev.includes(condition) 
          ? newConditions.filter(c => c !== condition)
          : [...newConditions, condition];
      });
    }
  };

  const handleSubmit = () => {
    onUpdate({ healthConditions: selectedConditions });
    onNext();
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 max-w-md mx-auto px-4 py-8 pb-24">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Do you have any of the following health conditions?
          </h1>
          <p className="text-gray-600 text-sm">
            Choose all that apply
          </p>
        </div>

        <div className="space-y-3">
          {conditions.map((condition) => {
            const IconComponent = condition.icon;
            const isSelected = selectedConditions.includes(condition.value);
            
            return (
              <div
                key={condition.value}
                onClick={() => toggleCondition(condition.value)}
                className="flex items-center p-4 bg-gray-50 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-100"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full mr-4">
                  <IconComponent className="h-5 w-5 text-gray-600" />
                </div>
                
                <div className="flex-1">
                  <span className="text-gray-900 font-medium">
                    {condition.label}
                  </span>
                </div>
                
                <div className="ml-4">
                  <div className={cn(
                    "w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200",
                    isSelected 
                      ? "bg-primary border-primary" 
                      : "border-gray-300 bg-white"
                  )}>
                    {isSelected && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Continue button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleSubmit}
            disabled={selectedConditions.length === 0}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}