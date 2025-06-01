import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizData } from "../../pages/quiz";
import { getButtonStyles } from "@/lib/quiz-styles";

interface InsecurityAreasQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const insecurityAreas = [
  { 
    value: "vestido-justo", 
    label: "Wearing a tight dress",
    emoji: "👗"
  },
  { 
    value: "bikini", 
    label: "Wearing a bikini",
    emoji: "👙"
  },
  { 
    value: "roupas-barriga", 
    label: "Wearing clothes that show the belly",
    emoji: "👕"
  },
  { 
    value: "tirando-fotos", 
    label: "Taking photos",
    emoji: "📸"
  },
  { 
    value: "momentos-intimos", 
    label: "Intimate moments without clothes",
    emoji: "🛏️"
  },
  { 
    value: "sentada-barriga", 
    label: "Sitting when the belly folds",
    emoji: "🪞"
  },
  { 
    value: "provando-roupas", 
    label: "Trying on clothes in stores",
    emoji: "👚"
  },
  { 
    value: "escolhendo-look", 
    label: "Choosing an outfit to leave the house",
    emoji: "👠"
  },
];

export default function InsecurityAreasQuestion({ onNext, onUpdate, data }: InsecurityAreasQuestionProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(data.insecurityAreas || []);

  const handleSelection = (value: string) => {
    const newSelection = selectedAreas.includes(value)
      ? selectedAreas.filter(item => item !== value)
      : [...selectedAreas, value];
    
    setSelectedAreas(newSelection);
    onUpdate({ insecurityAreas: newSelection });
  };

  const handleContinue = () => {
    if (selectedAreas.length > 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Do you feel insecure in any of these situations?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto mb-8">
          {insecurityAreas.map((area) => {
            const isSelected = selectedAreas.includes(area.value);
            return (
              <button
                key={area.value}
                onClick={() => handleSelection(area.value)}
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
                    {area.emoji}
                  </div>
                  <span className="font-medium">{area.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        {selectedAreas.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className={getButtonStyles()}
            >
              CONTINUE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}