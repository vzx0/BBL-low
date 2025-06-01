import { useState } from "react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface AgeRangeSelectionProps {
  onNext: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const ageRanges = [
  { 
    value: "18-29", 
    label: "18-29",
    imageUrl: "https://slimkit.health/walking/survey/static/media/o1.4fd900e6.png"
  },
  { 
    value: "30-39", 
    label: "30-39",
    imageUrl: "https://slimkit.health/walking/survey/static/media/o2.a569dab4.png"
  },
  { 
    value: "40-49", 
    label: "40-49",
    imageUrl: "https://slimkit.health/walking/survey/static/media/o3.33b9a66b.png"
  },
  { 
    value: "50+", 
    label: "50+",
    imageUrl: "https://slimkit.health/walking/survey/static/media/o4.0528f790.png"
  }
];

export default function AgeRangeSelection({ onNext, onUpdate, data }: AgeRangeSelectionProps) {
  const [selectedRange, setSelectedRange] = useState(data.ageRange || "");

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    onUpdate({ ageRange: range });
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            How old are you?
          </h1>
        </div>

        <div className="space-y-3">
          {ageRanges.map((range) => {
            const isSelected = selectedRange === range.value;
            
            return (
              <div
                key={range.value}
                onClick={() => handleSelect(range.value)}
                className={cn(
                  "relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                  isSelected 
                    ? "border-[#ea749b] bg-[#ea749b] text-white shadow-lg transform scale-105" 
                    : "border-gray-200 bg-white hover:border-[#ea749b]/30"
                )}
              >
                <div className="flex items-center flex-1">
                  <span className={cn(
                    "font-semibold text-base mr-4",
                    isSelected ? "text-white" : "text-gray-900"
                  )}>
                    {range.label}
                  </span>
                </div>
                
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white ml-auto">
                  <img 
                    src={range.imageUrl} 
                    alt={`Woman ${range.value} years old`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a colored circle if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-500 text-xs font-medium">Photo</div>';
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}