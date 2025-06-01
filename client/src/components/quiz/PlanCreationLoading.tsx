import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import Header from "@/components/quiz/Header";
import type { QuizData } from "@/pages/quiz";

interface PlanCreationLoadingProps {
  onNext: () => void;
  onPrevious: () => void;
  data: Partial<QuizData>;
}

export default function PlanCreationLoading({ onNext, onPrevious, data }: PlanCreationLoadingProps) {
  const [progress, setProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100%
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          // Auto advance to next step after completion
          setTimeout(() => onNext(), 1500);
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onNext]);

  useEffect(() => {
    // Smooth display progress animation
    const displayTimer = setInterval(() => {
      setDisplayProgress(prev => {
        if (prev >= progress) {
          clearInterval(displayTimer);
          return progress;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(displayTimer);
  }, [progress]);

  // Calculate stroke dash array for circular progress
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayProgress / 100) * circumference;

  return (
    <div className="bg-white min-h-screen">
      <div className="px-4 py-8 text-center">
        {/* Progress Circle */}
        <div className="relative mx-auto mb-8 w-48 h-48 flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r={radius}
              stroke="#ea749b"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-100 ease-out"
            />
          </svg>
          
          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">
              {displayProgress}%
            </span>
          </div>
        </div>

        {/* Loading text */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Creating your personalized BBL Workout Plan
          </h2>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <div className="text-4xl font-bold text-primary mb-2">
            150 million people
          </div>
          <div className="text-gray-700 text-lg">
            have chosen BBL Challenge
          </div>
        </div>

        {/* Stars Rating */}
        <div className="flex justify-center gap-1 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-6 h-6 fill-green-500 text-green-500"
            />
          ))}
        </div>

        {/* Testimonial with Before/After Images */}
        <div className="bg-gray-50 rounded-2xl p-6 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/attached_assets/375b10bc-d74e-4ebd-87ef-ca7fe2da1b85.jpeg"
              alt="Transformação BBL Challenge"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-gray-900">Perdi 15kg e ganhei bumbum!</h3>
              <span className="text-gray-600 text-sm">Amanda</span>
            </div>
          </div>
          <p className="text-gray-700 text-sm text-left leading-relaxed">
            In 3 weeks of BBL Challenge I got incredible results! My butt grew, 
            my legs toned and I feel much more confident. The exercises are practical 
            and effective, perfect for doing at home!
          </p>
        </div>
      </div>
    </div>
  );
}