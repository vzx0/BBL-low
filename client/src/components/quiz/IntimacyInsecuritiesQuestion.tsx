import { useState } from "react";
import { QuizData } from "../../pages/quiz";
import { getButtonStyles } from "@/lib/quiz-styles";

interface IntimacyInsecuritiesQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const intimacyOptions = [
  { 
    value: "sem-roupa", 
    label: "When I'm completely undressed"
  },
  { 
    value: "luz-acesa", 
    label: "When the light is on"
  },
  { 
    value: "por-cima", 
    label: "From above (I don't like my belly showing)"
  },
  { 
    value: "de-quatro", 
    label: "On all fours (I don't have volume or curves)"
  },
  { 
    value: "de-lado", 
    label: "From the side (I feel it doesn't fit)"
  },
  { 
    value: "evito-intimidade", 
    label: "I avoid intimacy to not feel ashamed"
  },
  { 
    value: "nao-responder", 
    label: "I prefer not to answer"
  },
];

export default function IntimacyInsecuritiesQuestion({ onNext, onUpdate, data }: IntimacyInsecuritiesQuestionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(data.intimacyInsecurities || []);

  const handleSelection = (value: string) => {
    if (value === "nao-responder") {
      setSelectedOptions([value]);
      onUpdate({ intimacyInsecurities: [value] });
    } else {
      const newSelection = selectedOptions.filter(item => item !== "nao-responder");
      const updatedSelection = newSelection.includes(value)
        ? newSelection.filter(item => item !== value)
        : [...newSelection, value];
      
      setSelectedOptions(updatedSelection);
      onUpdate({ intimacyInsecurities: updatedSelection });
    }
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Behind closed doors, what makes you feel uncomfortable or insecure about your body?
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto mb-8">
          {intimacyOptions.map((option) => {
            const isSelected = selectedOptions.includes(option.value);
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
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>

        {selectedOptions.length > 0 && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className={getButtonStyles()}
            >
              CONTINUE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}