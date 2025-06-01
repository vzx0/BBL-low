import { useState } from "react";
import type { QuizData } from "@/pages/quiz";

interface DreamBodySelectionProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

export default function DreamBodySelection({ onNext, onPrevious, onUpdate, data }: DreamBodySelectionProps) {
  const [selectedType, setSelectedType] = useState(data.dreamBodyType || "");

  const bodyTypes = [
    {
      id: "slim",
      label: "Slim",
      image: "https://res.cloudinary.com/drhg6wpcy/image/upload/f_webp/q_auto:eco/fl_lossy/c_fit%2Cw_512/fimhflrex9nfmyawecn1"
    },
    {
      id: "toned",
      label: "Toned",
      image: "https://res.cloudinary.com/drhg6wpcy/image/upload/f_webp/q_auto:eco/fl_lossy/c_fit%2Cw_512/ytrgwzrwdrhkx33o9naq"
    },
    {
      id: "curvy",
      label: "Curvy",
      image: "https://res.cloudinary.com/drhg6wpcy/image/upload/f_webp/q_auto:eco/fl_lossy/c_fit%2Cw_512/p6yvqdhnjklqwpgye4e6"
    },
    {
      id: "medium",
      label: "Medium",
      image: "https://res.cloudinary.com/drhg6wpcy/image/upload/f_webp/q_auto:eco/fl_lossy/c_fit%2Cw_512/umkweskmksoieehtclwq"
    }
  ];

  const handleSelection = (typeId: string) => {
    setSelectedType(typeId);
    onUpdate({ dreamBodyType: typeId });
  };

  const handleContinue = () => {
    if (selectedType) {
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            What is your dream body?
          </h1>
          <p className="text-gray-600">
            Visualize your goal to stay motivated and accountable
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {bodyTypes.map((type) => {
            const isSelected = selectedType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => handleSelection(type.id)}
                className={`
                  relative overflow-hidden rounded-2xl border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-[#ea749b] bg-pink-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
              >
                <div className="aspect-[3/4] relative">
                  <img
                    src={type.image}
                    alt={type.label}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-pink-100 bg-opacity-20">
                      <div className="absolute bottom-2 right-2 w-8 h-8 bg-[#ea749b] rounded-full flex items-center justify-center">
                        <span className="text-white text-lg">✓</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium ${isSelected ? 'text-[#ea749b]' : 'text-gray-900'}`}>
                      {type.label}
                    </span>
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center
                      ${isSelected 
                        ? 'border-[#ea749b] bg-[#ea749b]' 
                        : 'border-gray-300 bg-white'
                      }
                    `}>
                      {isSelected && (
                        <span className="text-white text-xs">✓</span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={!selectedType}
            className="w-full bg-[#ea749b] hover:bg-[#e85a8a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-3xl text-base transition-all duration-200"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}