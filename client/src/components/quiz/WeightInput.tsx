import { useState } from "react";
import { QuizData } from "../../pages/quiz";

interface WeightInputProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

export default function WeightInput({ onNext, onUpdate, data }: WeightInputProps) {
  const [weight, setWeight] = useState(data.currentWeight?.toString() || "");
  const [unit, setUnit] = useState(data.weightUnit || "kg");

  const handleWeightChange = (value: string) => {
    setWeight(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue > 0) {
      onUpdate({ currentWeight: numValue, weightUnit: unit });
    }
  };

  const handleUnitChange = (newUnit: string) => {
    setUnit(newUnit);
    const numValue = parseFloat(weight);
    if (!isNaN(numValue) && numValue > 0) {
      onUpdate({ currentWeight: numValue, weightUnit: newUnit });
    }
  };

  const handleContinue = () => {
    const numValue = parseFloat(weight);
    if (!isNaN(numValue) && numValue > 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What is your current weight ({unit})?
          </h1>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleUnitChange("kg")}
              className={`flex-1 py-2 px-4 rounded-full font-medium ${
                unit === "kg"
                  ? "bg-[#ea749b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              kg
            </button>
            <button
              onClick={() => handleUnitChange("lbs")}
              className={`flex-1 py-2 px-4 rounded-full font-medium ${
                unit === "lbs"
                  ? "bg-[#ea749b] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              lbs
            </button>
          </div>

          <div className="mb-8">
            <input
              type="number"
              value={weight}
              onChange={(e) => handleWeightChange(e.target.value)}
              placeholder="Enter your current weight"
              className="w-full p-4 text-center text-2xl border-2 border-gray-200 rounded-2xl focus:border-[#ea749b] focus:outline-none"
              min="1"
              step="0.1"
            />
          </div>
        </div>
      </div>

      {/* Fixed button at the bottom */}
      {weight && parseFloat(weight) > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleContinue}
              className="w-full bg-[#ea749b] text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-[#d85d87] transition-all duration-200"
            >
              CONTINUE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}