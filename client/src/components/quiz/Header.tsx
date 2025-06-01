import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  onBack?: () => void;
  showBackButton?: boolean;
  showProgressBar?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export default function Header({ onBack, showBackButton = false, showProgressBar = true, currentStep = 0, totalSteps = 39 }: HeaderProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
  const sections = [
    { name: "Profile", steps: 10 },
    { name: "Physical", steps: 8 },
    { name: "Health", steps: 10 },
    { name: "Analysis", steps: 6 },
    { name: "Finalization", steps: 5 },
  ];

  let stepsAccumulated = 0;
  let currentSection = "";
  
  for (const section of sections) {
    if (currentStep <= stepsAccumulated + section.steps) {
      currentSection = section.name;
      break;
    }
    stepsAccumulated += section.steps;
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center relative">
        {showBackButton && onBack && (
          <button 
            onClick={onBack}
            className="absolute left-4 p-2 text-black hover:text-gray-600 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
        )}
        
        {showProgressBar ? (
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold text-gray-900 mb-3">{currentSection}</h2>
            <div className="flex gap-1">
              {sections.map((section, index) => {
                const sectionStartStep = sections.slice(0, index).reduce((acc, s) => acc + s.steps, 0);
                const sectionEndStep = sectionStartStep + section.steps;
                const sectionProgress = Math.max(0, Math.min(100, 
                  ((currentStep - sectionStartStep) / section.steps) * 100
                ));
                const isActive = currentStep > sectionStartStep;
                
                return (
                  <div key={section.name} className="relative">
                    <div className="w-8 h-1 bg-gray-200 rounded-full">
                      {isActive && (
                        <div
                          className="h-1 bg-black transition-all duration-500 ease-out rounded-full"
                          style={{ width: `${sectionProgress}%` }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <h1 className="text-xl font-bold text-gray-900">
            BBL Challenge
          </h1>
        )}
      </div>
    </header>
  );
}
