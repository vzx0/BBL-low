import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface PhysicalConditionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const conditions = [
  { value: "excellent", label: "Excellent", emoji: "💪" },
  { value: "good", label: "Good", emoji: "😊" },
  { value: "fair", label: "Fair", emoji: "😐" },
  { value: "poor", label: "Poor", emoji: "😓" }
];

export default function PhysicalCondition({ onNext, onPrevious, onUpdate, data }: PhysicalConditionProps) {
  const [selectedCondition, setSelectedCondition] = useState(data.physicalCondition || "");

  const handleSubmit = () => {
    if (selectedCondition) {
      onUpdate({ physicalCondition: selectedCondition });
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">

        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How would you describe your current physical condition?
          </h1>
          <p className="text-gray-600 text-base">
            Be honest so we can get the best plan for you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto mb-8">
          {conditions.map((condition) => {
            const isSelected = selectedCondition === condition.value;
            
            return (
              <div
                key={condition.value}
                onClick={() => setSelectedCondition(condition.value)}
                className={cn(
                  "relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300",
                  isSelected 
                    ? "border-[#ea749b] bg-[#ea749b] text-white shadow-lg transform scale-105" 
                    : "border-gray-200 bg-white hover:border-[#ea749b]/30"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                    isSelected ? "bg-white/20" : "bg-gray-100"
                  )}>
                    {condition.emoji}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold text-base",
                      isSelected ? "text-white" : "text-gray-900"
                    )}>
                      {condition.label}
                    </h3>
                  </div>
                  
                  {isSelected && (
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedCondition}
            className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
}