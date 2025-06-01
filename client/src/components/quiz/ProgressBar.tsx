interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const sections = [
  { name: "Goals", steps: 5 },
  { name: "Health", steps: 6 },
  { name: "Physical", steps: 4 },
  { name: "Analysis", steps: 3 },
  { name: "Contact", steps: 2 },
];

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progressPercentage = (currentStep / totalSteps) * 100;
  
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
    <div className="bg-white border-b border-gray-100 px-4 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">{currentSection}</span>
          <span className="text-sm text-gray-500">{currentStep} of {totalSteps}</span>
        </div>
        
        {/* Barra de progresso simples */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
