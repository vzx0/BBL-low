import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizData } from "../../pages/quiz";

interface StairsConditionQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const stairsOptions = [
  { 
    value: "ofegante", 
    label: "I reach the top out of breath",
    emoji: "🥵"
  },
  { 
    value: "parar-meio", 
    label: "I need to stop halfway to catch my breath",
    emoji: "⏸️"
  },
  { 
    value: "devagar-falta-ar", 
    label: "Even going up slowly, I get short of breath",
    emoji: "😮‍💨"
  },
  { 
    value: "sem-problema", 
    label: "I climb without any breathing problems",
    emoji: "💨"
  },
];

export default function StairsConditionQuestion({ onNext, onUpdate, data }: StairsConditionQuestionProps) {
  const [selectedOption, setSelectedOption] = useState(data.stairsCondition || "");

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    onUpdate({ stairsCondition: value });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How do you feel when you climb a flight of stairs?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {stairsOptions.map((option) => {
            const isSelected = selectedOption === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelection(option.value)}
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
                    {option.emoji}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}