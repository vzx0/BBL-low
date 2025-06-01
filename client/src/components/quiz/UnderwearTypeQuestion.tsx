import { useState } from "react";
import { cn } from "@/lib/utils";
import { QuizData } from "../../pages/quiz";

interface UnderwearTypeQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const underwearTypes = [
  { 
    value: "brief", 
    label: "Brief (classic with wide sides and full coverage)",
    icon: "👙"
  },
  { 
    value: "bikini", 
    label: "Bikini (medium sides and full back coverage)",
    icon: "👙"
  },
  { 
    value: "thong", 
    label: "Thong",
    icon: "👙"
  },
  { 
    value: "hipster", 
    label: "Hipster (low waist, wide sides)",
    icon: "👙"
  },
];

export default function UnderwearTypeQuestion({ onNext, onUpdate, data }: UnderwearTypeQuestionProps) {
  const [selectedType, setSelectedType] = useState(data.underwearType || "");

  const handleSelection = (value: string) => {
    setSelectedType(value);
    onUpdate({ underwearType: value });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What type of underwear have you worn most in your life?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {underwearTypes.map((type) => {
            const isSelected = selectedType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => handleSelection(type.value)}
                className={`w-full py-4 px-8 rounded-full text-left transition-all duration-200 font-medium text-lg border-2 ${
                  isSelected
                    ? "bg-[#ea749b] text-white border-[#ea749b] shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#ea749b] hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center text-xl",
                    isSelected ? "bg-white/20" : "bg-gray-100"
                  )}>
                    {type.icon}
                  </div>
                  <span className="font-medium">{type.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}