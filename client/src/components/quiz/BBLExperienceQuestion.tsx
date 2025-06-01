import { useState } from "react";
import type { QuizData } from "@/pages/quiz";

interface BBLExperienceQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const options = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];

export default function BBLExperienceQuestion({ onNext, onUpdate, data }: BBLExperienceQuestionProps) {
  const [selectedOption, setSelectedOption] = useState(data.bblExperience || "");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onUpdate({ bblExperience: option });
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Have you tried the BBL Challenge before?
          </h1>
        </div>

        <div className="space-y-4">
          {options.map((option) => {
            const isSelected = selectedOption === option.value;
            
            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 ${
                  isSelected 
                    ? "border-[#ea749b] bg-[#ea749b] text-white shadow-lg transform scale-[1.02]" 
                    : "border-gray-200 bg-white hover:border-[#ea749b]/30 text-gray-900"
                }`}
              >
                <span className="font-semibold text-lg">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}