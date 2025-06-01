import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizData } from "../../pages/quiz";
import { getButtonStyles } from "@/lib/quiz-styles";

interface FoodRestrictionsQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const restrictions = [
  { 
    value: "lactose", 
    label: "Lactose intolerance",
    emoji: "🥛"
  },
  { 
    value: "gluten", 
    label: "Gluten sensitivity or allergy",
    emoji: "🌾"
  },
  { 
    value: "nozes", 
    label: "Nuts/tree nuts allergy",
    emoji: "🥜"
  },
  { 
    value: "frutos-mar", 
    label: "Seafood allergy",
    emoji: "🦐"
  },
];

export default function FoodRestrictionsQuestion({ onNext, onUpdate, data }: FoodRestrictionsQuestionProps) {
  const [selectedRestrictions, setSelectedRestrictions] = useState<string[]>(data.foodRestrictions || []);

  const handleSelection = (value: string) => {
    const newSelection = selectedRestrictions.includes(value)
      ? selectedRestrictions.filter(item => item !== value)
      : [...selectedRestrictions, value];
    
    setSelectedRestrictions(newSelection);
    onUpdate({ foodRestrictions: newSelection });
  };

  const handleContinue = () => {
    onNext();
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Do you have any food restrictions or allergies?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto mb-8">
          {restrictions.map((restriction) => {
            const isSelected = selectedRestrictions.includes(restriction.value);
            return (
              <button
                key={restriction.value}
                onClick={() => handleSelection(restriction.value)}
                className={`w-full py-4 px-8 rounded-full text-left transition-all duration-200 font-medium text-lg border-2 ${
                  isSelected
                    ? "bg-[#ea749b] text-white border-[#ea749b] shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#ea749b] hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-xl",
                    isSelected ? "bg-white/20" : "bg-gray-100"
                  )}>
                    {restriction.emoji}
                  </div>
                  <span className="font-medium">{restriction.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fixed button at the bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className={getButtonStyles()}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}