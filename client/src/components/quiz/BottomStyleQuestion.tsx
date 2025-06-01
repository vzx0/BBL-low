import { useState } from "react";
import { QuizData } from "../../pages/quiz";
import highWaistImage from "@assets/ChatGPT Image 31 de mai. de 2025, 18_00_29.png";
import lowWaistImage from "@assets/ChatGPT Image 31 de mai. de 2025, 17_59_34.png";

interface BottomStyleQuestionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const bottomStyles = [
  { 
    value: "high-waist", 
    label: "High Waist",
    image: highWaistImage
  },
  { 
    value: "low-waist", 
    label: "Low Waist",
    image: lowWaistImage
  },
];

export default function BottomStyleQuestion({ onNext, onUpdate, data }: BottomStyleQuestionProps) {
  const [selectedStyle, setSelectedStyle] = useState(data.bottomStyle || "");

  const handleSelection = (value: string) => {
    setSelectedStyle(value);
    onUpdate({ bottomStyle: value });
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What style of bottoms do you wear most?
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          {bottomStyles.map((style) => {
            const isSelected = selectedStyle === style.value;
            return (
              <button
                key={style.value}
                onClick={() => handleSelection(style.value)}
                className={`transition-all duration-200 rounded-2xl overflow-hidden border-4 ${
                  isSelected
                    ? "border-[#ea749b] shadow-xl transform scale-105"
                    : "border-gray-200 hover:border-[#ea749b] hover:shadow-lg"
                }`}
              >
                <div className="aspect-[3/4] relative">
                  <img
                    src={style.image}
                    alt={style.label}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <h3 className="text-white font-semibold text-lg text-center">
                      {style.label}
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}