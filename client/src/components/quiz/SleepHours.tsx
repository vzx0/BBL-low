import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface SleepHoursProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const sleepOptions = [
  { value: "4-5", label: "4-5 horas", description: "Muito pouco", emoji: "😴" },
  { value: "6", label: "6 horas", description: "Insuficiente", emoji: "😐" },
  { value: "7", label: "7 horas", description: "Bom", emoji: "😌" },
  { value: "8", label: "8 horas", description: "Ideal", emoji: "😊" },
  { value: "9+", label: "9+ horas", description: "Muito sono", emoji: "😴" }
];

export default function SleepHours({ onNext, onPrevious, onUpdate, data }: SleepHoursProps) {
  const [selectedHours, setSelectedHours] = useState(data.sleepHours || "");

  const handleSelect = (hours: string) => {
    setSelectedHours(hours);
    onUpdate({ sleepHours: hours });
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How many horas você dorme por noite?
          </h1>
          <p className="text-gray-600 text-base">
            O sono adequado é essencial para a recuperação muscular
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 max-w-2xl mx-auto">
          {sleepOptions.map((option) => {
            const isSelected = selectedHours === option.value;
            
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300",
                  isSelected 
                    ? "border-[#ea749b] bg-[#ea749b] text-white shadow-lg transform scale-105" 
                    : "border-gray-200 bg-white hover:border-[#ea749b]/30"
                )}
              >
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-2xl",
                    isSelected ? "bg-white/20" : "bg-gray-100"
                  )}>
                    {option.emoji}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold text-base",
                      isSelected ? "text-white" : "text-gray-900"
                    )}>
                      {option.label}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isSelected ? "text-white/80" : "text-gray-600"
                    )}>
                      {option.description}
                    </p>
                  </div>
                  
                  {isSelected && (
                    <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-primary" />
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