import React from 'react';
import { QuizData } from '@/pages/quiz';

interface WeightProjectionProps {
  onNext: () => void;
  onPrevious: () => void;
  data: Partial<QuizData>;
}

export default function WeightProjection({ onNext, data }: WeightProjectionProps) {
  // Get user's name for personalization
  const userName = data.name || "User";
  
  // Get goal from user's responses
  const getGoalText = () => {
    if (data.mainGoals?.includes("Grow my glutes") || data.mainGoals?.includes("Crescer o bumbum")) return "grow your glutes";
    if (data.mainGoals?.includes("Lift my glutes") || data.mainGoals?.includes("Levantar o bumbum")) return "lift your glutes";
    if (data.mainGoals?.includes("Tone my glutes") || data.mainGoals?.includes("Tonificar o bumbum")) return "tone your glutes";
    return "shape your body";
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            <span className="text-[#ea749b]">{userName},</span> here's the plan you'll<br/>
            need to get in shape
          </h1>
          <p className="text-gray-600 mb-2">We predict you'll achieve</p>
          <p className="text-3xl font-bold text-[#ea749b] mb-1">
            85% improvement
          </p>
          <p className="text-lg text-gray-600">
            in your booty within 3 weeks.
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 relative">
          {/* Custom SVG Chart */}
          <div className="relative h-48">
            <svg className="w-full h-full" viewBox="0 0 400 200">
              {/* Background gradient area */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ea749b" stopOpacity="0.2"/>
                  <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.2"/>
                  <stop offset="100%" stopColor="#ea749b" stopOpacity="0.3"/>
                </linearGradient>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ea749b"/>
                  <stop offset="50%" stopColor="#f59e0b"/>
                  <stop offset="100%" stopColor="#ea749b"/>
                </linearGradient>
              </defs>
              
              {/* Area fill */}
              <path
                d="M 80 150 Q 160 125 240 105 Q 320 85 360 70 L 360 180 L 80 180 Z"
                fill="url(#areaGradient)"
              />
              
              {/* Progress line */}
              <path
                d="M 80 150 Q 160 125 240 105 Q 320 85 360 70"
                stroke="url(#lineGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Progress points */}
              <circle cx="80" cy="150" r="5" fill="#ea749b" />
              <circle cx="160" cy="125" r="5" fill="#f59e0b" />
              <circle cx="240" cy="105" r="5" fill="#ea749b" />
              <circle cx="360" cy="70" r="5" fill="#ea749b" />
              
              {/* Week labels */}
              <text x="80" y="195" textAnchor="middle" className="text-xs fill-gray-500">Week 1</text>
              <text x="160" y="195" textAnchor="middle" className="text-xs fill-gray-500">Week 2</text>
              <text x="240" y="195" textAnchor="middle" className="text-xs fill-gray-500">Week 3</text>
              <text x="360" y="195" textAnchor="middle" className="text-xs fill-gray-500">Week 4</text>
            </svg>
            
            {/* Goal badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-[#ea749b] text-white px-3 py-2 rounded-lg text-sm font-semibold shadow-md">
                Goal<br/>85%
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mb-8">
          *Based on data from users who track their progress in the app. Consult your doctor first. The chart is a non-customized illustration and results may vary
        </p>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button
            onClick={onNext}
            className="w-full bg-[#ea749b] hover:bg-[#e85a8a] text-white font-bold py-4 px-8 rounded-3xl text-base transition-all duration-200"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}