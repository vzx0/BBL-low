import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizData } from "../../pages/quiz";

interface WorkoutFrequencyQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const frequencyOptions = [
  { 
    value: "1", 
    label: "1 time per week",
    emoji: "1️⃣"
  },
  { 
    value: "2", 
    label: "2 times per week",
    emoji: "2️⃣"
  },
  { 
    value: "3", 
    label: "3 times per week",
    emoji: "3️⃣"
  },
  { 
    value: "4+", 
    label: "4+ times per week",
    emoji: "4️⃣"
  },
];

export default function WorkoutFrequencyQuestion({ onNext, onUpdate, data }: WorkoutFrequencyQuestionProps) {
  const [selectedOption, setSelectedOption] = useState(data.workoutFrequency || "");

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    onUpdate({ workoutFrequency: value });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How many times per week can you dedicate yourself?
          </h1>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          {frequencyOptions.map((option) => {
            const isSelected = selectedOption === option.value;
            return (
              <button
                key={option.value}
                onClick={() => handleSelection(option.value)}
                className={cn(
                  "w-full p-4 border-2 rounded-xl cursor-pointer transition-all duration-300",
                  isSelected
                    ? "border-[#ea749b] bg-[#ea749b] text-white shadow-lg transform scale-105"
                    : "border-gray-200 bg-white hover:border-[#ea749b]/30"
                )}
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                    isSelected ? "bg-white/20" : "bg-gray-100"
                  )}>
                    {option.emoji}
                  </div>
                  <span className={cn(
                    "font-semibold text-lg text-left",
                    isSelected ? "text-white" : "text-gray-900"
                  )}>
                    {option.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}