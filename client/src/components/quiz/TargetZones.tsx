import { useState } from "react";
import type { QuizData } from "@/pages/quiz";

interface TargetZonesProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

export default function TargetZones({ onNext, onPrevious, onUpdate, data }: TargetZonesProps) {
  const [selectedZones, setSelectedZones] = useState<string[]>(data.targetZones || []);

  const zones = [
    { 
      id: "lowerBack", 
      label: "Lower back",
      overlayImage: "https://slimkit.health/walking/survey/static/media/lowerBack-sm.57f976c5.png"
    },
    { 
      id: "belly", 
      label: "Belly",
      overlayImage: "https://slimkit.health/walking/survey/static/media/belly-sm.ec8aaab9.png"
    },
    { 
      id: "buttocks", 
      label: "Buttocks",
      overlayImage: "https://slimkit.health/walking/survey/static/media/buttocks-sm.e8b2c51d.png"
    },
    { 
      id: "hips", 
      label: "Hips",
      overlayImage: "https://slimkit.health/walking/survey/static/media/hips-sm.7a139e92.png"
    },
    { 
      id: "knees", 
      label: "Knees",
      overlayImage: "https://slimkit.health/walking/survey/static/media/knees-sm.693142e9.png"
    },
    { 
      id: "calves", 
      label: "Calves",
      overlayImage: "https://slimkit.health/walking/survey/static/media/calves-sm.ea4c3772.png"
    },
    { 
      id: "wholeBody", 
      label: "Whole body",
      overlayImage: "https://slimkit.health/walking/survey/static/media/wholeBody-sm.2210b80f.png"
    }
  ];

  const handleZoneToggle = (zoneId: string) => {
    const newSelection = selectedZones.includes(zoneId)
      ? selectedZones.filter(id => id !== zoneId)
      : [...selectedZones, zoneId];
    
    setSelectedZones(newSelection);
    onUpdate({ targetZones: newSelection });
  };

  const handleContinue = () => {
    if (selectedZones.length > 0) {
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Choose your target zones
          </h1>
        </div>

        <div className="flex items-start gap-6">
          {/* Left side - Woman image with overlays */}
          <div className="relative flex-shrink-0" style={{ width: "180px", height: "280px" }}>
            {/* Base woman image */}
            <img
              src="https://slimkit.health/walking/survey/static/media/f-sm.a19ed714.png"
              alt="Woman silhouette"
              className="w-full h-full object-contain"
            />
            
            {/* Overlay images for selected zones */}
            {selectedZones.map((zoneId) => {
              const zone = zones.find(z => z.id === zoneId);
              if (!zone?.overlayImage) return null;
              
              return (
                <img
                  key={zoneId}
                  src={zone.overlayImage}
                  alt={`${zone.label} overlay`}
                  className="absolute inset-0 w-full h-full object-contain transition-opacity duration-200"
                  style={{ opacity: 1 }}
                />
              );
            })}
          </div>

          {/* Right side - Zone selection buttons */}
          <div className="flex-1 space-y-3">
            {zones.map((zone) => {
              const isSelected = selectedZones.includes(zone.id);
              return (
                <button
                  key={zone.id}
                  onClick={() => handleZoneToggle(zone.id)}
                  className={`
                    w-full py-4 px-4 rounded-2xl font-medium text-center transition-all duration-200
                    ${isSelected 
                      ? 'bg-[#ea749b] text-white shadow-lg' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {zone.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            disabled={selectedZones.length === 0}
            className="w-full bg-[#ea749b] hover:bg-[#e85a8a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-3xl text-base transition-all duration-200"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}