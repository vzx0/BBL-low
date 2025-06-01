import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/quiz/Header";
import type { QuizData } from "@/pages/quiz";

interface WeightPredictionProps {
  onNext: () => void;
  onPrevious: () => void;
  data: Partial<QuizData>;
}

export default function WeightPrediction({ onNext, onPrevious, data }: WeightPredictionProps) {
  const [animationProgress, setAnimationProgress] = useState(0);
  
  // Calculate target weight based on user data (21-day BBL Challenge)
  const currentWeight = data.currentWeight || 70;
  const targetWeight = data.targetWeight || 60;
  
  // Chart dimensions
  const chartWidth = 280;
  const chartHeight = 160;
  const padding = 30;
  
  // Generate data for both lines
  const withoutAppData = [
    { x: 0, y: currentWeight },
    { x: 0.3, y: currentWeight - 1 }, // slight initial drop
    { x: 0.6, y: currentWeight + 2 }, // weight gain
    { x: 1, y: currentWeight + 4 }    // continued weight gain
  ];
  
  const withAppData = [
    { x: 0, y: currentWeight },
    { x: 0.3, y: currentWeight - 3 }, // good progress
    { x: 0.6, y: currentWeight - 6 }, // accelerating
    { x: 1, y: targetWeight }         // target reached
  ];
  
  // Calculate scales
  const minWeight = Math.min(targetWeight - 2, currentWeight - 8);
  const maxWeight = Math.max(currentWeight + 6, currentWeight + 2);
  const weightRange = maxWeight - minWeight;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Convert data points to SVG coordinates
  const convertToSVG = (dataPoints: {x: number, y: number}[]) => {
    return dataPoints.map(point => ({
      x: padding + point.x * (chartWidth - 2 * padding),
      y: padding + ((maxWeight - point.y) / weightRange) * (chartHeight - 2 * padding)
    }));
  };

  const withoutAppPoints = convertToSVG(withoutAppData);
  const withAppPoints = convertToSVG(withAppData);

  // Generate smooth curve path
  const generateSmoothPath = (points: {x: number, y: number}[]) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (i === 1) {
        // First curve
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y;
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      } else {
        // Smooth curve using previous and next points
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y + (curr.y - prev.y) * 0.3;
        const cp2x = curr.x - (curr.x - prev.x) * 0.3;
        const cp2y = curr.y - (next ? (next.y - curr.y) * 0.3 : 0);
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
    }
    return path;
  };

  return (
    <div className="bg-white min-h-screen">
      <Header 
        onBack={onPrevious}
        showBackButton={true}
        showProgressBar={false}
        currentStep={0}
        totalSteps={0}
      />

      <div className="px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            The last plan you'll ever need to get in shape
          </h1>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">We predict you'll be</p>
            <p className="text-2xl">
              <span className="text-primary font-bold">{targetWeight} kg</span>
              <span className="text-gray-600"> in just 21 days</span>
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 mx-auto max-w-sm">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">EXPECTED RESULTS</h3>
            <p className="text-sm text-gray-600">Weight</p>
          </div>
          
          <svg width="100%" height="200" viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`}>
            {/* Background grid lines */}
            {[0.25, 0.5, 0.75].map((ratio, index) => (
              <line
                key={index}
                x1={padding}
                y1={padding + ratio * (chartHeight - 2 * padding)}
                x2={chartWidth - padding}
                y2={padding + ratio * (chartHeight - 2 * padding)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
            ))}

            {/* Area fill for "without app" line */}
            <path
              d={`${generateSmoothPath(withoutAppPoints)} L ${withoutAppPoints[withoutAppPoints.length - 1].x} ${chartHeight} L ${withoutAppPoints[0].x} ${chartHeight} Z`}
              fill="rgba(239, 68, 68, 0.1)"
              style={{
                opacity: animationProgress,
                transition: 'opacity 1s ease-in-out'
              }}
            />

            {/* Area fill for "with app" line */}
            <path
              d={`${generateSmoothPath(withAppPoints)} L ${withAppPoints[withAppPoints.length - 1].x} ${chartHeight} L ${withAppPoints[0].x} ${chartHeight} Z`}
              fill="rgba(59, 130, 246, 0.1)"
              style={{
                opacity: animationProgress,
                transition: 'opacity 1s ease-in-out'
              }}
            />

            {/* "Without app" line (red) */}
            <path
              d={generateSmoothPath(withoutAppPoints)}
              stroke="#ef4444"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: '300',
                strokeDashoffset: 300 * (1 - animationProgress),
                transition: 'stroke-dashoffset 2s ease-in-out'
              }}
            />

            {/* "With app" line (blue) */}
            <path
              d={generateSmoothPath(withAppPoints)}
              stroke="#3b82f6"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: '300',
                strokeDashoffset: 300 * (1 - animationProgress),
                transition: 'stroke-dashoffset 2s ease-in-out 0.5s'
              }}
            />

            {/* End points */}
            <circle
              cx={withoutAppPoints[withoutAppPoints.length - 1].x}
              cy={withoutAppPoints[withoutAppPoints.length - 1].y}
              r="6"
              fill="#ef4444"
              style={{
                opacity: animationProgress,
                transition: 'opacity 1s ease-in-out 1.5s'
              }}
            />
            
            <circle
              cx={withAppPoints[withAppPoints.length - 1].x}
              cy={withAppPoints[withAppPoints.length - 1].y}
              r="6"
              fill="#3b82f6"
              style={{
                opacity: animationProgress,
                transition: 'opacity 1s ease-in-out 2s'
              }}
            />

            {/* Labels */}
            <text
              x={withoutAppPoints[withoutAppPoints.length - 1].x + 10}
              y={withoutAppPoints[withoutAppPoints.length - 1].y - 10}
              className="text-xs font-medium fill-red-500"
              style={{
                opacity: animationProgress,
                transition: 'opacity 1s ease-in-out 2.5s'
              }}
            >
              Without app
            </text>
            
            <text
              x={withAppPoints[withAppPoints.length - 1].x + 10}
              y={withAppPoints[withAppPoints.length - 1].y + 15}
              className="text-xs font-medium fill-blue-600"
              style={{
                opacity: animationProgress,
                transition: 'opacity 1s ease-in-out 2.5s'
              }}
            >
              BBL Challenge
            </text>
          </svg>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 text-center mb-8 px-4">
          <p>*Based on the data of users who log their progress in the app.</p>
          <p>Consult your physician first. The chart is a non-customized illustration and results may vary</p>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <Button 
          onClick={onNext}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-base transition-all duration-300"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}