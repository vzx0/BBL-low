import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { QuizData } from "../../pages/quiz";
import { getButtonStyles } from "@/lib/quiz-styles";

interface ButtImprovementsProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const improvements = [
  { 
    value: "lift", 
    label: "Lift",
    emoji: "🔼"
  },
  { 
    value: "add-volume", 
    label: "Add more volume",
    emoji: "➕"
  },
  { 
    value: "eliminate-cellulite", 
    label: "Eliminate cellulite",
    emoji: "🍊"
  },
  { 
    value: "fix-hipdips", 
    label: "Fix hip dips",
    emoji: "🎯"
  },
  { 
    value: "define-curves", 
    label: "Define more marked curves",
    emoji: "🍑"
  },
];

export default function ButtImprovements({ onNext, onUpdate, data }: ButtImprovementsProps) {
  const [selectedImprovements, setSelectedImprovements] = useState<string[]>(data.buttImprovements || []);

  const handleSelection = (value: string) => {
    const newSelection = selectedImprovements.includes(value)
      ? selectedImprovements.filter(item => item !== value)
      : [...selectedImprovements, value];
    
    setSelectedImprovements(newSelection);
    onUpdate({ buttImprovements: newSelection });
  };

  const handleContinue = () => {
    if (selectedImprovements.length > 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 pb-32">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What do you want to improve about your booty today?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto mb-8">
          {improvements.map((improvement) => {
            const isSelected = selectedImprovements.includes(improvement.value);
            return (
              <button
                key={improvement.value}
                onClick={() => handleSelection(improvement.value)}
                className={`w-full py-4 px-8 rounded-full text-left transition-all duration-200 font-medium text-lg border-2 ${
                  isSelected
                    ? "bg-[#ea749b] text-white border-[#ea749b] shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#ea749b] hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-xl",
                      isSelected ? "bg-white/20" : "bg-gray-100"
                    )}>
                      {improvement.emoji}
                    </div>
                    <span className="font-medium">{improvement.label}</span>
                  </div>
                  
                  {isSelected && (
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-[#ea749b]" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

      </div>

      {/* Botão fixado na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={selectedImprovements.length === 0}
            className={getButtonStyles(selectedImprovements.length === 0)}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}