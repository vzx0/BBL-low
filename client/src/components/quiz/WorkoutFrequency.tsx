import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Trophy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface WorkoutFrequencyProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const frequencies = [
  { value: "1-2", label: "1-2 vezes por semana", description: "Iniciante", icon: Calendar },
  { value: "3-4", label: "3-4 vezes por semana", description: "Intermediário", icon: Clock },
  { value: "5-6", label: "5-6 vezes por semana", description: "Avançado", icon: Trophy },
  { value: "daily", label: "Todos os dias", description: "Atleta", icon: Trophy }
];

export default function WorkoutFrequency({ onNext, onPrevious, onUpdate, data }: WorkoutFrequencyProps) {
  const [selectedFrequency, setSelectedFrequency] = useState(data.workoutFrequency || "");

  const handleSubmit = () => {
    if (selectedFrequency) {
      onUpdate({ workoutFrequency: selectedFrequency });
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Com que frequência você pode treinar?
          </h1>
          <p className="text-gray-600 text-lg">
            Escolha a frequência mais realista para você
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
          {frequencies.map((freq) => {
            const IconComponent = freq.icon;
            const isSelected = selectedFrequency === freq.value;
            
            return (
              <div
                key={freq.value}
                onClick={() => setSelectedFrequency(freq.value)}
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
                      {freq.label}
                    </h3>
                    <p className={cn(
                      "text-sm",
                      isSelected ? "text-white/80" : "text-gray-600"
                    )}>
                      {freq.description}
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

        <div className="text-center">
          <Button 
            onClick={handleSubmit}
            disabled={!selectedFrequency}
            className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-white font-bold py-8 px-8 rounded-full text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
}