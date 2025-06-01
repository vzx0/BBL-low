import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";
import { getButtonStyles } from "@/lib/quiz-styles";
import type { QuizData } from "@/pages/quiz";

interface AgeInputProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

export default function AgeInput({ onNext, onPrevious, onUpdate, data }: AgeInputProps) {
  const [age, setAge] = useState(data.age?.toString() || "");
  const [showMessage, setShowMessage] = useState(false);

  const getAgeMessage = (ageValue: number) => {
    if (ageValue < 16) {
      return "For safety reasons, our program is designed for ages 16 and above.";
    } else if (ageValue > 80) {
      return "Please consult your physician before starting any fitness program.";
    } else if (ageValue >= 50) {
      return "Older people are found to have a higher body fat percentage than younger people with the same BMI.";
    } else if (ageValue >= 35) {
      return "Your metabolism may be slowing down. We'll adjust your plan accordingly.";
    } else if (ageValue >= 25) {
      return "Perfect age to build healthy habits that will last a lifetime.";
    } else {
      return "Young people tend to have faster metabolisms and better recovery rates.";
    }
  };

  const getBoxColor = (ageValue: number) => {
    if (ageValue < 16 || ageValue > 80) {
      return "bg-red-50 border-red-200";
    } else if (ageValue >= 60) {
      return "bg-orange-50 border-orange-200";
    } else if (ageValue >= 40) {
      return "bg-yellow-50 border-yellow-200";
    } else {
      return "bg-blue-50 border-blue-200";
    }
  };

  const getTextColor = (ageValue: number) => {
    if (ageValue < 16 || ageValue > 80) {
      return "text-red-900";
    } else if (ageValue >= 60) {
      return "text-orange-900";
    } else if (ageValue >= 40) {
      return "text-yellow-900";
    } else {
      return "text-blue-900";
    }
  };

  const getSubTextColor = (ageValue: number) => {
    if (ageValue < 16 || ageValue > 80) {
      return "text-red-700";
    } else if (ageValue >= 60) {
      return "text-orange-700";
    } else if (ageValue >= 40) {
      return "text-yellow-700";
    } else {
      return "text-blue-700";
    }
  };

  useEffect(() => {
    if (age) {
      const ageValue = parseInt(age);
      if (ageValue > 0 && ageValue <= 120) {
        setShowMessage(true);
      } else {
        setShowMessage(false);
      }
    } else {
      setShowMessage(false);
    }
  }, [age]);

  const handleSubmit = () => {
    const ageValue = parseInt(age);
    if (ageValue >= 16 && ageValue <= 80) {
      onUpdate({ age: ageValue });
      setTimeout(() => onNext(), 500);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What's your age?
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Valid age: 16-80 years
          </p>
        </div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-center gap-4">
              <Input
                type="number"
                placeholder="23"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="text-center text-4xl font-normal border-0 border-b-2 border-gray-300 rounded-none focus:border-gray-300 focus:ring-0 bg-transparent px-2 py-3 h-16 placeholder:text-gray-400 placeholder:text-2xl placeholder:font-normal focus:outline-none"
                min="10"
                max="120"
              />
              <span className="text-2xl font-medium text-black">
                years
              </span>
            </div>
          </div>
        </div>

        {showMessage && age && parseInt(age) > 0 && parseInt(age) <= 120 && (
          <div className="max-w-md mx-auto mb-8 animate-in fade-in duration-300">
            <div className={`${getBoxColor(parseInt(age))} border rounded-2xl p-6`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500 mt-1" />
                </div>
                <div>
                  <p className={`text-sm font-bold ${getTextColor(parseInt(age))} mb-1`}>
                    We ask your age to personalize your plan
                  </p>
                  <p className={`text-sm ${getSubTextColor(parseInt(age))}`}>
                    {getAgeMessage(parseInt(age))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed button at the bottom */}
      {age && parseInt(age) >= 16 && parseInt(age) <= 80 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
          <div className="max-w-md mx-auto">
            <button
              onClick={handleSubmit}
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