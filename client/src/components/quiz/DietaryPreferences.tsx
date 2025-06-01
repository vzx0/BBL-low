import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Apple, Beef, Carrot, Wheat, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface DietaryPreferencesProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const preferences = [
  { value: "balanced", label: "Balanced diet", icon: Apple },
  { value: "vegetarian", label: "Vegetarian", icon: Carrot },
  { value: "vegan", label: "Vegan", icon: Carrot },
  { value: "keto", label: "Ketogenic", icon: Beef },
  { value: "gluten-free", label: "Gluten-free", icon: Wheat },
  { value: "none", label: "None of the above", icon: Apple }
];

export default function DietaryPreferences({ onNext, onPrevious, onUpdate, data }: DietaryPreferencesProps) {
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>(data.dietaryPreferences || []);

  const togglePreference = (preference: string) => {
    setSelectedPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleSubmit = () => {
    if (selectedPreferences.length > 0) {
      onUpdate({ dietaryPreferences: selectedPreferences });
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 max-w-md mx-auto px-4 py-8 pb-24">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Do you follow any specific diet?
          </h1>
          <p className="text-gray-600 text-sm">
            Choose all that apply
          </p>
        </div>

        <div className="space-y-3">
          {preferences.map((preference) => {
            const IconComponent = preference.icon;
            const isSelected = selectedPreferences.includes(preference.value);
            
            return (
              <div
                key={preference.value}
                onClick={() => togglePreference(preference.value)}
                className="flex items-center p-4 bg-gray-50 rounded-2xl cursor-pointer transition-all duration-200 hover:bg-gray-100"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full mr-4">
                  <IconComponent className="h-5 w-5 text-gray-600" />
                </div>
                
                <div className="flex-1">
                  <span className="text-gray-900 font-medium">
                    {preference.label}
                  </span>
                </div>
                
                <div className="ml-4">
                  <div className={cn(
                    "w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200",
                    isSelected 
                      ? "bg-primary border-primary" 
                      : "border-gray-300 bg-white"
                  )}>
                    {isSelected && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Continue button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleSubmit}
            disabled={selectedPreferences.length === 0}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}