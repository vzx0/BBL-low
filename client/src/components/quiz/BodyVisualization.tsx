import { useState } from "react";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface BodyVisualizationProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const bodyTypes = [
  {
    value: "apple",
    title: "Apple-shaped",
    description: "Naturally wide torso and broad shoulders",
    imageUrl: "https://slimkit.health/walking/survey/static/media/bt1.18cf7323.png"
  },
  {
    value: "pear",
    title: "Pear-shaped", 
    description: "Naturally slimmer shoulders and thicker thighs",
    imageUrl: "https://slimkit.health/walking/survey/static/media/bt2.6c242f95.png"
  },
  {
    value: "square",
    title: "Square-shaped",
    description: "Naturally wide shoulders and thighs", 
    imageUrl: "https://slimkit.health/walking/survey/static/media/bt3.5af02177.png"
  },
  {
    value: "hourglass",
    title: "Hourglass",
    description: "Wide bust and hips, a narrow waist",
    imageUrl: "https://slimkit.health/walking/survey/static/media/bt4.374855fc.png"
  },
  {
    value: "inverted",
    title: "Inverted triangle",
    description: "Wider shoulders and slimmer hips",
    imageUrl: "https://slimkit.health/walking/survey/static/media/bt5.e41157d5.png"
  }
];

export default function BodyVisualization({ onNext, onPrevious, onUpdate, data }: BodyVisualizationProps) {
  const [selectedBodyType, setSelectedBodyType] = useState("");

  const handleSelect = (bodyType: string) => {
    setSelectedBodyType(bodyType);
    onUpdate({ bodyType });
    setTimeout(() => onNext(), 300);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            What's your body type?
          </h1>
        </div>

        <div className="space-y-3">
          {bodyTypes.map((type) => {
            const isSelected = selectedBodyType === type.value;
            
            return (
              <div
                key={type.value}
                onClick={() => handleSelect(type.value)}
                className={cn(
                  "relative flex items-center p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                  isSelected 
                    ? "border-[#ea749b] bg-[#ea749b] text-white shadow-lg transform scale-105" 
                    : "border-gray-200 bg-white hover:border-[#ea749b]/30"
                )}
              >
                <div className="flex-1">
                  <h3 className={cn(
                    "font-semibold text-base mb-1",
                    isSelected ? "text-white" : "text-gray-900"
                  )}>
                    {type.title}
                  </h3>
                  <p className={cn(
                    "text-sm",
                    isSelected ? "text-white/80" : "text-gray-600"
                  )}>
                    {type.description}
                  </p>
                </div>
                
                <div className="w-16 h-20 ml-4 flex items-center justify-center">
                  <img 
                    src={type.imageUrl} 
                    alt={`${type.title} body type`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-500 text-xs font-medium">Body</div>';
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
