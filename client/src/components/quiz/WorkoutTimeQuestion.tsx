import { useState } from "react";
import { QuizData } from "../../pages/quiz";

interface WorkoutTimeQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const timeOptions = [
  { 
    value: "10-15-minutos", 
    label: "10–15 minutes",
    emoji: "🕓"
  },
  { 
    value: "20-30-minutos", 
    label: "20–30 minutes",
    emoji: "🕓"
  },
  { 
    value: "mais-1-hora", 
    label: "+1 hour",
    emoji: "🕓"
  },
  { 
    value: "pouco-tempo", 
    label: "Very little time",
    emoji: "⏳"
  },
];

export default function WorkoutTimeQuestion({ onNext, onUpdate, data }: WorkoutTimeQuestionProps) {
  const [selectedOption, setSelectedOption] = useState(data.workoutTime || "");

  const handleSelection = (value: string) => {
    setSelectedOption(value);
    onUpdate({ workoutTime: value });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How much time can you dedicate per day to a personalized workout without leaving home?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {timeOptions.map((option) => {
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
                  <span className="text-2xl">{option.emoji}</span>
                  <span>{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}