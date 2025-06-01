import { useState } from "react";
import { QuizData } from "../../pages/quiz";
import { getButtonStyles } from "@/lib/quiz-styles";

interface HeightInputProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

export default function HeightInput({ onNext, onUpdate, data }: HeightInputProps) {
  const [height, setHeight] = useState(data.height?.toString() || "");
  const [unit, setUnit] = useState(data.heightUnit || "cm");

  const handleHeightChange = (value: string) => {
    setHeight(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onUpdate({ height: numValue, heightUnit: unit });
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    const numValue = parseFloat(height);
    if (!isNaN(numValue) && numValue > 0) {
      onUpdate({ height: numValue, heightUnit: newUnit });
    }
  };

  const handleContinue = () => {
    const numValue = parseFloat(height);
    if (!isNaN(numValue) && numValue > 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What is your height ({unit})?
          </h1>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleUnitChange("cm")}
              className={`flex-1 py-2 px-4 rounded-full font-medium ${
                unit === "cm"
                  ? "bg-[#ea749b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              cm
            </button>
            <button
              onClick={() => handleUnitChange("inches")}
              className={`flex-1 py-2 px-4 rounded-full font-medium ${
                unit === "inches"
                  ? "bg-[#ea749b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              inches
            </button>
          </div>

          <div className="mb-8">
            <input
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              placeholder="Enter your height"
              className="w-full p-4 text-center text-2xl font-normal border-2 border-gray-200 rounded-2xl focus:border-[#ea749b] focus:outline-none"
              min="1"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Fixed button at the bottom */}
      {height && parseFloat(height) > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleContinue}
              className={getButtonStyles()}
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}