import { useEffect, useState } from "react";
import type { QuizData } from "@/pages/quiz";

interface LastPlanEverProps {
  onNext: () => void;
  onPrevious: () => void;
  data: Partial<QuizData>;
}

export default function LastPlanEver({ onNext, onPrevious, data }: LastPlanEverProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Calculate weeks data
  const userName = data.name || "you";
  const currentWeight = data.currentWeight || 70;
  const targetWeight = data.targetWeight || 60;
  
  // Calculate 4 weeks progression
  const weekDates = [];
  for (let i = 0; i <= 4; i++) {
    const date = new Date();
    date.setDate(date.getDate() + (i * 7));
    weekDates.push(date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short' 
    }));
  }
  
  const finalDate = weekDates[4];

  useEffect(() => {
    // Start animation after component mounts
    const timer1 = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    // Show button after animation
    const timer2 = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-md mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            The last plan {userName} will need to get in shape
          </h1>
          <p className="text-gray-600 mb-2">
            We predict you will reach
          </p>
          <p className="text-2xl font-bold text-[#ea749b]">
            {targetWeight} kg by {finalDate}
          </p>
        </div>

        {/* Animated Chart */}
        <div className="bg-gray-50 rounded-3xl p-6 mb-8 relative overflow-hidden">
          <div className="relative h-64">
            {/* Chart SVG */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 320 200"
              className="absolute inset-0"
            >
              <defs>
                <linearGradient id="weightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA500" />
                  <stop offset="30%" stopColor="#FFD700" />
                  <stop offset="70%" stopColor="#ea749b" />
                  <stop offset="100%" stopColor="#32CD32" />
                </linearGradient>
                
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(234, 116, 155, 0.3)" />
                  <stop offset="100%" stopColor="rgba(234, 116, 155, 0.0)" />
                </linearGradient>
              </defs>
              
              {/* Grid lines */}
              <g stroke="#E5E7EB" strokeWidth="1" opacity="0.5">
                <line x1="0" y1="50" x2="320" y2="50" />
                <line x1="0" y1="100" x2="320" y2="100" />
                <line x1="0" y1="150" x2="320" y2="150" />
              </g>
              
              {/* Week markers */}
              <g stroke="#D1D5DB" strokeWidth="1" opacity="0.3">
                <line x1="80" y1="0" x2="80" y2="200" />
                <line x1="160" y1="0" x2="160" y2="200" />
                <line x1="240" y1="0" x2="240" y2="200" />
              </g>
              
              {/* Weight curve path */}
              <path
                d="M 20 150 Q 100 120 180 80 Q 260 50 300 30"
                fill="none"
                stroke="url(#weightGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                className={`transition-all duration-2000 ease-out`}
                style={{
                  strokeDasharray: animationComplete ? 'none' : '1000',
                  strokeDashoffset: animationComplete ? '0' : '1000',
                  transition: 'stroke-dashoffset 2s ease-out'
                }}
              />
              
              {/* Area under curve */}
              <path
                d="M 20 150 Q 100 120 180 80 Q 260 50 300 30 L 300 200 L 20 200 Z"
                fill="url(#areaGradient)"
                className={`transition-opacity duration-1000 delay-1000 ${
                  animationComplete ? 'opacity-100' : 'opacity-0'
                }`}
              />
              
              {/* Week progression points */}
              <circle
                cx="20"
                cy="150"
                r="6"
                fill="#FFA500"
                className={`transition-all duration-500 delay-500 ${
                  animationComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
              <circle
                cx="100"
                cy="120"
                r="4"
                fill="#ea749b"
                className={`transition-all duration-500 delay-1000 ${
                  animationComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
              <circle
                cx="180"
                cy="80"
                r="4"
                fill="#ea749b"
                className={`transition-all duration-500 delay-1500 ${
                  animationComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
              <circle
                cx="260"
                cy="50"
                r="4"
                fill="#ea749b"
                className={`transition-all duration-500 delay-1800 ${
                  animationComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
              <circle
                cx="300"
                cy="30"
                r="8"
                fill="#32CD32"
                className={`transition-all duration-500 delay-2000 ${
                  animationComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
              />
            </svg>
            
            {/* Goal badge */}
            <div 
              className={`absolute top-2 right-4 bg-[#ea749b] text-white px-3 py-2 rounded-lg text-sm font-bold transition-all duration-500 delay-2500 ${
                animationComplete ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              Goal<br />{targetWeight} kg
            </div>
            
            {/* Week labels */}
            <div className="absolute -bottom-6 left-4 text-xs text-gray-500">
              Week 1
            </div>
            <div className="absolute -bottom-6 text-xs text-gray-500" style={{ left: '100px', transform: 'translateX(-50%)' }}>
              Week 2
            </div>
            <div className="absolute -bottom-6 text-xs text-gray-500" style={{ left: '180px', transform: 'translateX(-50%)' }}>
              Week 3
            </div>
            <div className="absolute -bottom-6 text-xs text-gray-500" style={{ left: '260px', transform: 'translateX(-50%)' }}>
              Week 4
            </div>
            <div className="absolute -bottom-6 right-4 text-xs text-gray-500">
              Goal
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-500 text-center mb-8">
          *Based on data from users who track their progress in the app. Consult your doctor first. The 
          chart is a non-customized illustration and results may vary
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={onNext}
            className={`w-full bg-[#8B7BCF] hover:bg-[#7A6BBF] text-white font-bold py-4 px-8 rounded-3xl text-base transition-all duration-500 ${
              showButton ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
            }`}
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}