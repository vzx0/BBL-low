import { Button } from "@/components/ui/button";

interface PlanHighlightsProps {
  onNext: () => void;
  onPrevious: () => void;
}

export default function PlanHighlights({ onNext }: PlanHighlightsProps) {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 max-w-md mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
            What you need to know about BBL workouts
          </h1>

          {/* Chart/Graph Illustration */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 relative">
            <div className="mb-4">
              <svg width="100%" height="120" viewBox="0 0 320 120">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="80" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Week labels */}
                <text x="40" y="110" className="text-xs fill-gray-500" textAnchor="middle">WEEK 1</text>
                <text x="120" y="110" className="text-xs fill-gray-500" textAnchor="middle">WEEK 2</text>
                <text x="200" y="110" className="text-xs fill-gray-500" textAnchor="middle">WEEK 3</text>
                
                {/* Curves */}
                {/* Training plan curve (blue) */}
                <path
                  d="M 20 80 Q 80 60 120 50 Q 160 40 200 35 Q 240 30 280 25"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Old habits curve (yellow) */}
                <path
                  d="M 20 80 Q 60 75 100 78 Q 140 82 180 85 Q 220 88 260 90"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                
                {/* Legend */}
                <circle cx="30" cy="15" r="3" fill="#3b82f6"/>
                <text x="40" y="18" className="text-xs fill-gray-600">Training plan</text>
                <circle cx="30" cy="30" r="3" fill="#fbbf24"/>
                <text x="40" y="33" className="text-xs fill-gray-600">Your old habits</text>
                
                {/* Label */}
                <text x="20" y="50" className="text-xs fill-blue-600 font-medium">Glute growth</text>
                <text x="20" y="62" className="text-xs fill-blue-600">state</text>
              </svg>
            </div>
          </div>

          {/* Credibility Facts */}
          <div className="space-y-6 text-left">
            {/* First fact */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 bg-blue-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⚡</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  The American Council on Exercise
                </h3>
                <p className="text-gray-600 text-sm">
                  recommend targeted glute exercises 3-4 times per week for optimal muscle growth and strength
                </p>
              </div>
            </div>

            {/* Second fact */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <div className="w-8 h-8 bg-amber-600 rounded-sm flex items-center justify-center">
                  <span className="text-white text-xs font-bold">🏛️</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">
                  Harvard
                </h3>
                <p className="text-gray-600 text-sm">
                  researchers say that people who do glute-focused workouts regularly have 35% better posture and reduced back pain
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Got it Button */}
      <div className="p-4 bg-white border-t border-gray-100">
        <Button 
          onClick={onNext}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
        >
          Got it
        </Button>
      </div>
    </div>
  );
}