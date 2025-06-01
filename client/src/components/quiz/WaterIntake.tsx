import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Droplets, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface WaterIntakeProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const intakeOptions = [
  { value: "1-2", label: "1-2 copos", description: "Menos de 500ml", icon: Droplets },
  { value: "3-4", label: "3-4 copos", description: "500ml - 1L", icon: Droplets },
  { value: "5-6", label: "5-6 copos", description: "1L - 1.5L", icon: Droplets },
  { value: "7-8", label: "7-8 copos", description: "1.5L - 2L", icon: Droplets },
  { value: "9+", label: "9+ copos", description: "Mais de 2L", icon: Droplets }
];

export default function WaterIntake({ onNext, onPrevious, onUpdate, data }: WaterIntakeProps) {
  const [selectedIntake, setSelectedIntake] = useState(data.waterIntake || "");

  const handleSelect = (intake: string) => {
    setSelectedIntake(intake);
    onUpdate({ waterIntake: intake });
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quanta água você bebe por dia?
          </h1>
          <p className="text-gray-600 text-lg">
            A hidratação é fundamental para seus resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {intakeOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = selectedIntake === option.value;
            
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg",
                  isSelected 
                    ? "border-primary bg-primary text-white shadow-lg" 
                    : "border-gray-200 bg-white hover:border-primary/30"
                )}
              >
                <div className="flex items-start space-x-4">
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                    isSelected ? "bg-white/20" : "bg-primary/10"
                  )}>
                    <IconComponent className={cn(
                      "h-6 w-6",
                      isSelected ? "text-white" : "text-primary"
                    )} />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-semibold text-lg mb-1",
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