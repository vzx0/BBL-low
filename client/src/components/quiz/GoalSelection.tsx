import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { QuizData } from "../../pages/quiz";
import { getButtonStyles } from "@/lib/quiz-styles";

interface GoalSelectionProps {
  onNext: () => void;
  onPrevious?: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const goals = [
  { 
    value: "shape-booty", 
    label: "Shape my booty", 
    emoji: "🍑",
    description: "" 
  },
  { 
    value: "slim-waist", 
    label: "Slim my waist", 
    emoji: "⌛",
    description: "" 
  },
  { 
    value: "reduce-fat", 
    label: "Reduce localized fat", 
    emoji: "🔥",
    description: "" 
  },
  { 
    value: "improve-posture", 
    label: "Improve my posture", 
    emoji: "🧘‍♀️",
    description: "" 
  },
  { 
    value: "reduce-anxiety", 
    label: "Reduce anxiety and stress", 
    emoji: "🌿",
    description: "" 
  },
  { 
    value: "boost-confidence", 
    label: "Boost my confidence", 
    emoji: "💖",
    description: "" 
  },
];

export default function GoalSelection({ onNext, onPrevious, onUpdate, data }: GoalSelectionProps) {
  const [selectedGoal, setSelectedGoal] = useState(data.mainGoals?.[0] || "");

  const handleSubmit = () => {
    if (selectedGoal) {
      onUpdate({ mainGoals: [selectedGoal] });
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What's your main goal with this challenge?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto mb-8">
          {goals.map((goal) => {
            const isSelected = selectedGoal === goal.value;
            
            return (
              <button
                key={goal.value}
                onClick={() => setSelectedGoal(goal.value)}
                className={cn(
                  "w-full py-4 px-6 rounded-xl text-left transition-all duration-200 font-medium text-lg border-2",
                  isSelected
                    ? "bg-[#ea749b] text-white border-[#ea749b] shadow-lg"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#ea749b] hover:shadow-md"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-xl",
                      isSelected ? "bg-white/20" : "bg-gray-100"
                    )}>
                      {goal.emoji}
                    </div>
                    <span className="font-medium">{goal.label}</span>
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

      {/* Botão fixo na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!selectedGoal}
            className={getButtonStyles(!selectedGoal)}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
