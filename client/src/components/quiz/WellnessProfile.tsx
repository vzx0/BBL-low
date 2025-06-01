import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, Activity, Dumbbell, Zap, AlertTriangle, Info } from "lucide-react";
import { calculateBMI, getBMICategory } from "@/lib/utils";
import Header from "@/components/quiz/Header";
import avatarImage from "@assets/lzkrpr2be5x0z7gaqctt.jpg";
import type { QuizData } from "@/pages/quiz";

interface WellnessProfileProps {
  onNext: () => void;
  onPrevious: () => void;
  data: Partial<QuizData>;
}

export default function WellnessProfile({ onNext, onPrevious, data }: WellnessProfileProps) {
  const [animatedBMI, setAnimatedBMI] = useState(0);
  const [showItems, setShowItems] = useState(false);
  
  // Calculate BMI from user data
  const bmi = data.currentWeight && data.height ? 
    calculateBMI(data.currentWeight, data.height) : 25.0;

  useEffect(() => {
    // Animate BMI counter
    const timer = setTimeout(() => {
      let start = 0;
      const increment = bmi / 50;
      const interval = setInterval(() => {
        start += increment;
        if (start >= bmi) {
          setAnimatedBMI(bmi);
          clearInterval(interval);
        } else {
          setAnimatedBMI(start);
        }
      }, 20);
    }, 500);

    // Show profile items with delay
    const itemsTimer = setTimeout(() => {
      setShowItems(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(itemsTimer);
    };
  }, [bmi]);
  
  const bmiCategory = getBMICategory(bmi);
  
  // BMI position on scale (15-40 range)
  const bmiPosition = Math.min(Math.max((bmi - 15) / (40 - 15) * 100, 0), 100);

  const getBMIRisks = (bmi: number) => {
    if (bmi >= 30) {
      return "High blood pressure, increased risk of heart attack, stroke, type 2 diabetes, chronic back and joint pain";
    } else if (bmi >= 25) {
      return "Moderate risk of cardiovascular disease and type 2 diabetes";
    } else if (bmi < 18.5) {
      return "Increased risk of osteoporosis, decreased immune function, fertility issues";
    } else {
      return "You're in the healthy range! Keep maintaining your current lifestyle.";
    }
  };

  const getBodyType = () => {
    if (data.goal?.includes("lose")) return "Endomorph";
    if (data.goal?.includes("gain")) return "Ectomorph";
    return "Mesomorph";
  };

  const getLifestyle = () => {
    if (data.activityLevel === "sedentary") return "Sedentary";
    if (data.activityLevel === "light") return "Light";
    if (data.activityLevel === "moderate") return "Moderate";
    if (data.activityLevel === "very-active") return "Active";
    return "Very Active";
  };

  const getFitnessLevel = () => {
    if (data.physicalCondition === "beginner") return "Beginner";
    if (data.physicalCondition === "intermediate") return "Intermediate";
    return "Advanced";
  };

  const getMetabolism = () => {
    const age = data.age || 25;
    if (age >= 40) return "Slow, easy to gain weight";
    if (age >= 30) return "Moderate, stable";
    return "Fast, easy to lose weight";
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Simple Header with just BBL Challenge */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button 
          onClick={onPrevious}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h1 className="text-xl font-bold text-gray-900">BBL Challenge</h1>
        
        <div className="w-5"></div> {/* Spacer for alignment */}
      </div>

      <div className="px-4 py-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Here's your wellness profile
        </h2>

        {/* BMI Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Body Mass Index (BMI)
          </h3>
          
          {/* BMI Value */}
          <div className="relative mb-4">
            <div className="bg-black text-white px-4 py-2 rounded-full inline-block text-sm font-medium animate-pulse">
              You - {animatedBMI.toFixed(1)}
            </div>
          </div>

          {/* BMI Scale */}
          <div className="relative mb-2 bg-gray-100 rounded-full h-4 p-1">
            {/* Background scale */}
            <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 via-orange-400 to-red-400"></div>
            
            {/* Animated BMI Indicator */}
            <div 
              className="absolute top-1 w-6 h-6 bg-white border-2 border-black rounded-full transform -translate-x-1/2 shadow-lg transition-all duration-1000 ease-out flex items-center justify-center"
              style={{ 
                left: `${bmiPosition}%`,
                transform: `translateX(-50%) scale(${showItems ? 1 : 0.5})`,
                opacity: showItems ? 1 : 0.7
              }}
            >
              <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* BMI Labels */}
          <div className="flex justify-between text-xs text-gray-600 mb-4">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40</span>
          </div>

          <div className="flex justify-between text-xs text-gray-700 mb-6">
            <span>UNDERWEIGHT</span>
            <span>NORMAL</span>
            <span>OVERWEIGHT</span>
            <span>OBESE</span>
          </div>

          {/* BMI Warning */}
          {(bmi >= 25 || bmi < 18.5) && (
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-orange-900 mb-1">
                    Risks of unhealthy BMI:
                  </p>
                  <p className="text-sm text-orange-800">
                    {getBMIRisks(bmi)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Information with Avatar */}
        <div className="flex justify-between items-start mb-8">
          {/* Profile Information */}
          <div className="space-y-4 flex-1">
            {/* Body Type */}
            <div className={`flex items-center gap-3 transition-all duration-700 ${showItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{transitionDelay: '0ms'}}>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Body type</p>
                <p className="font-semibold text-gray-900 flex items-center gap-1">
                  {getBodyType()}
                  <Info className="h-4 w-4 text-gray-400" />
                </p>
              </div>
            </div>

            {/* Lifestyle */}
            <div className={`flex items-center gap-3 transition-all duration-700 ${showItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{transitionDelay: '200ms'}}>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Activity className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lifestyle</p>
                <p className="font-semibold text-gray-900">{getLifestyle()}</p>
              </div>
            </div>

            {/* Fitness Level */}
            <div className={`flex items-center gap-3 transition-all duration-700 ${showItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{transitionDelay: '400ms'}}>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Dumbbell className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Fitness level</p>
                <p className="font-semibold text-gray-900">{getFitnessLevel()}</p>
              </div>
            </div>

            {/* Metabolism */}
            <div className={`flex items-center gap-3 transition-all duration-700 ${showItems ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`} style={{transitionDelay: '600ms'}}>
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Metabolism</p>
                <p className="font-semibold text-gray-900">{getMetabolism()}</p>
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="ml-6">
            <div className="w-28 h-36 rounded-2xl overflow-hidden bg-transparent">
              <img 
                src={avatarImage} 
                alt="Avatar" 
                className="w-full h-full object-contain"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <Button 
          onClick={onNext}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300"
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}