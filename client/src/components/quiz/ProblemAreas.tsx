import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Target, Activity, Heart, Zap, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface ProblemAreasProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const areas = [
  { value: "glutes", label: "Glúteos", icon: Target },
  { value: "thighs", label: "Coxas", icon: Activity },
  { value: "abs", label: "Abdômen", icon: Heart },
  { value: "arms", label: "Braços", icon: Zap },
  { value: "overall", label: "Corpo todo", icon: Target }
];

export default function ProblemAreas({ onNext, onPrevious, onUpdate, data }: ProblemAreasProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>(data.problemAreas || []);

  const toggleArea = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    );
  };

  const handleSubmit = () => {
    if (selectedAreas.length > 0) {
      onUpdate({ problemAreas: selectedAreas });
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Quais são suas principais áreas problema?
          </h1>
          <p className="text-gray-600 text-lg">
            Selecione todas as áreas que você gostaria de melhorar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
          {areas.map((area) => {
            const IconComponent = area.icon;
            const isSelected = selectedAreas.includes(area.value);
            
            return (
              <div
                key={area.value}
                onClick={() => toggleArea(area.value)}
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
                      "font-semibold text-lg",
                      isSelected ? "text-white" : "text-gray-900"
                    )}>
                      {area.label}
                    </h3>
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
            disabled={selectedAreas.length === 0}
            className="w-full max-w-md mx-auto bg-primary hover:bg-primary/90 text-white font-bold py-8 px-8 rounded-full text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
}