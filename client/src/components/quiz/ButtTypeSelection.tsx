import { useState } from "react";
import { QuizData } from "../../pages/quiz";
import { Square, Circle, ChevronDown, TrendingDown } from "lucide-react";

interface ButtTypeSelectionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const buttTypes = [
  { 
    value: "square-shape", 
    label: "Square shape",
    icon: Square
  },
  { 
    value: "round-no-volume", 
    label: "Round but no volume",
    icon: Circle
  },
  { 
    value: "full-saggy", 
    label: "Full but saggy",
    icon: ChevronDown
  },
  { 
    value: "flat", 
    label: "Flat/negative volume",
    icon: TrendingDown
  },
];

export default function ButtTypeSelection({ onNext, onUpdate, data }: ButtTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState(data.buttType || "");

  const handleSelection = (value: string) => {
    setSelectedType(value);
    onUpdate({ buttType: value });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            How would you describe your booty?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto">
          {buttTypes.map((type) => {
            const isSelected = selectedType === type.value;
            return (
              <button
                key={type.value}
                onClick={() => handleSelection(type.value)}
                className={`w-full py-4 px-8 rounded-full transition-all duration-200 font-medium text-lg border-2 ${
                  isSelected
                    ? "bg-[#ea749b] text-white border-[#ea749b] shadow-lg transform scale-105"
                    : "bg-white text-gray-700 border-gray-200 hover:border-[#ea749b] hover:shadow-md"
                }`}
              >
                <div className="flex items-center space-x-4 text-left">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isSelected ? "bg-white/20" : "bg-gray-100"
                  }`}>
                    <type.icon className={`w-5 h-5 ${isSelected ? "text-white" : "text-gray-600"}`} />
                  </div>
                  <span>{type.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}