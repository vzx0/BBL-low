import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizData } from "../../pages/quiz";

interface EatingRoutineQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const routineOptions = [
  { 
    value: "sem-horario", 
    label: "I have no schedule, I eat when I feel hungry",
    emoji: "⏰"
  },
  { 
    value: "beliscando", 
    label: "I'm constantly snacking on something",
    emoji: "🍪"
  },
  { 
    value: "so-rua", 
    label: "I only eat out",
    emoji: "🍔"
  },
  { 
    value: "sem-tempo", 
    label: "I don't have time, I eat what's easiest",
    emoji: "🥪"
  },
  { 
    value: "basico", 
    label: "I follow the basics: breakfast, lunch and dinner",
    emoji: "🍽️"
  },
  { 
    value: "5-6-refeicoes", 
    label: "I have 5-6 smaller meals throughout the day",
    emoji: "🥦"
  },
];

export default function EatingRoutineQuestion({ onNext, onUpdate, data }: EatingRoutineQuestionProps) {
  const [selectedOption, setSelectedOption] = useState(data.eatingRoutine || "");

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    onUpdate({ eatingRoutine: value });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Which option best represents your eating routine?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {routineOptions.map((option) => {
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