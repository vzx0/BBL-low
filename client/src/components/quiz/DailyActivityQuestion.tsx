import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizData } from "../../pages/quiz";

interface DailyActivityQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const activityOptions = [
  { 
    value: "sentada", 
    label: "I spend most of my time sitting",
    emoji: "🪑"
  },
  { 
    value: "pausas-ativas", 
    label: "I have active breaks during the day where I move a lot",
    emoji: "⚖️"
  },
  { 
    value: "em-pe", 
    label: "I stand most of the day",
    emoji: "🚶"
  },
];

export default function DailyActivityQuestion({ onNext, onUpdate, data }: DailyActivityQuestionProps) {
  const [selectedOption, setSelectedOption] = useState(data.dailyActivity || "");

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    onUpdate({ dailyActivity: value });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            On a typical day you...
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {activityOptions.map((option) => {
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