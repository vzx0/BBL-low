import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Dumbbell, Trophy, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface ActivityLevelProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const activityLevels = [
  { 
    value: "sedentary", 
    label: "Sedentary", 
    description: "Little or no exercise", 
    icon: User 
  },
  { 
    value: "light", 
    label: "Lightly active", 
    description: "Light exercise 1-3 days/week", 
    icon: User 
  },
  { 
    value: "moderate", 
    label: "Moderately active", 
    description: "Moderate exercise 3-5 days/week", 
    icon: Dumbbell 
  },
  { 
    value: "very-active", 
    label: "Very active", 
    description: "Intense exercise 6-7 days/week", 
    icon: Trophy 
  },
  { 
    value: "extra-active", 
    label: "Extremely active", 
    description: "Very intense exercise, physical work", 
    icon: Zap 
  }
];

export default function ActivityLevel({ onNext, onPrevious, onUpdate, data }: ActivityLevelProps) {
  const [selectedLevel, setSelectedLevel] = useState(data.activityLevel || "");

  const handleSelect = (level: string) => {
    setSelectedLevel(level);
    onUpdate({ activityLevel: level });
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What is your current activity level?
          </h1>
          <p className="text-gray-600 text-lg">
            This helps us personalize your program
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
          {activityLevels.map((level) => {
            const IconComponent = level.icon;
            const isSelected = selectedLevel === level.value;
            
            return (
              <div
                key={level.value}
                onClick={() => handleSelect(level.value)}
                className={cn(
                  "relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg",
                  isSelected 
                    ? "border-[#ea749b] bg-[#ea749b] text-white shadow-lg" 
                    : "border-gray-200 bg-white hover:border-[#ea749b]/30"
                )}
              >
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center",
                    isSelected ? "bg-white/20" : "bg-gray-100"
                  )}>
                    <IconComponent className={cn(
                      "h-6 w-6",
                      isSelected ? "text-white" : "text-gray-600"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold text-lg mb-1",
                      isSelected ? "text-white" : "text-gray-900"
                    )}>
                      {level.label}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isSelected ? "text-white/80" : "text-gray-600"
                    )}>
                      {level.description}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}