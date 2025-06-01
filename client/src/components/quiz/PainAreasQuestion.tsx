import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { QuizData } from "../../pages/quiz";
import { getButtonStyles } from "@/lib/quiz-styles";

interface PainAreasQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const painAreas = [
  { 
    value: "knees", 
    label: "Sensitive knees",
    emoji: "🦵"
  },
  { 
    value: "shoulders-arms", 
    label: "Shoulders/Arms",
    emoji: "💪"
  },
  { 
    value: "spine", 
    label: "Spine",
    emoji: "🌀"
  },
  { 
    value: "hips", 
    label: "Hips",
    emoji: "🦴"
  },
  { 
    value: "no-restrictions", 
    label: "No restrictions",
    emoji: "✅"
  },
];

export default function PainAreasQuestion({ onNext, onUpdate, data }: PainAreasQuestionProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(data.painAreas || []);

  const handleSelection = (value: string) => {
    if (value === "nao-tenho") {
      setSelectedAreas([value]);
      onUpdate({ painAreas: [value] });
    } else {
      const newSelection = selectedAreas.filter(item => item !== "nao-tenho");
      const updatedSelection = newSelection.includes(value)
        ? newSelection.filter(item => item !== value)
        : [...newSelection, value];
      
      setSelectedAreas(updatedSelection);
      onUpdate({ painAreas: updatedSelection });
    }
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
            Do you have any pain areas we should consider?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto mb-8">
          {painAreas.map((area) => {
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