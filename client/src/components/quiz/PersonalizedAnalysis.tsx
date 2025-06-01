import { useState, useEffect } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { QuizData } from "@/pages/quiz";
import { calculateBMI, getBMICategory } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

interface PersonalizedAnalysisProps {
  data: QuizData;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PersonalizedAnalysis({ data, onNext, onPrevious }: PersonalizedAnalysisProps) {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate analyses based on responses
  const calculateFitnessScore = () => {
    let score = 50;
    if (data.exerciseFrequency === "Yes, 3-5 times per week") score += 30;
    else if (data.exerciseFrequency === "Yes, 1-2 times per week") score += 15;
    
    if (data.energyLevels === "I'm always energetic") score += 20;
    else if (data.energyLevels === "I have energy most of the day") score += 10;
    else if (data.energyLevels === "I feel I need more energy") score -= 10;
    
    if (data.stairsCondition === "I climb without problems") score += 15;
    else if (data.stairsCondition === "I climb, but get a little tired") score += 5;
    else score -= 5;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateNutritionScore = () => {
    let score = 40;
    if (data.dietType === "Vegan (100% plant-based)") score += 40;
    else if (data.dietType === "I eat everything, no specific restrictions") score += 20;
    else if (data.dietType === "Fast food and processed food") score -= 20;
    
    if (data.eatingRoutine === "I have 5-6 smaller meals throughout the day") score += 20;
    else if (data.eatingRoutine === "I follow the basics: breakfast, lunch and dinner") score += 10;
    
    return Math.max(0, Math.min(100, score));
  };

  const calculateConfidenceScore = () => {
    let score = 60;
    if (data.insecurityAreas && data.insecurityAreas.length > 3) score -= 20;
    else if (data.insecurityAreas && data.insecurityAreas.length > 1) score -= 10;
    
    if (data.intimacyInsecurities && data.intimacyInsecurities.length > 2) score -= 15;
    else if (data.intimacyInsecurities && data.intimacyInsecurities.length > 0) score -= 5;
    
    return Math.max(0, Math.min(100, score));
  };

  const fitnessScore = calculateFitnessScore();
  const nutritionScore = calculateNutritionScore();
  const confidenceScore = calculateConfidenceScore();
  
  const bmi = data.currentWeight && data.height ? 
    calculateBMI(data.currentWeight, data.height) : 0;
  const bmiCategory = getBMICategory(bmi);

  const fitnessData = {
    labels: ['Conditioning', 'Nutrition', 'Body Confidence'],
    datasets: [
      {
        label: 'Your Score',
        data: [fitnessScore, nutritionScore, confidenceScore],
        backgroundColor: [
          'rgba(234, 116, 155, 0.8)',
          'rgba(147, 197, 253, 0.8)',
          'rgba(167, 243, 208, 0.8)',
        ],
        borderColor: [
          'rgba(234, 116, 155, 1)',
          'rgba(147, 197, 253, 1)',
          'rgba(167, 243, 208, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const progressData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Expected Progress (%)',
        data: [15, 35, 60, 85],
        borderColor: 'rgba(234, 116, 155, 1)',
        backgroundColor: 'rgba(234, 116, 155, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const goalDistribution = {
    labels: data.mainGoals || ['Glute Growth', 'Toning', 'Confidence'],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: [
          'rgba(234, 116, 155, 0.8)',
          'rgba(147, 197, 253, 0.8)',
          'rgba(167, 243, 208, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart' as const,
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          font: {
            family: 'Montserrat',
            size: 12,
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  // Determine body type based on responses
  const getBodyType = () => {
    if (data.buttType === "Heart shape (wider at the top)") return "Mesomorph";
    if (data.buttType === "Pear shape (wider at the bottom)") return "Endomorph"; 
    return "Ectomorph";
  };

  // Determine lifestyle based on responses
  const getLifestyle = () => {
    if (data.workRoutine === "I work from home" || data.dailyActivity === "Mostly sitting") return "Sedentary";
    if (data.exerciseFrequency === "Yes, 3-5 times per week") return "Active";
    return "Moderate";
  };

  // Determine fitness level
  const getFitnessLevel = () => {
    if (fitnessScore >= 80) return "Advanced";
    if (fitnessScore >= 60) return "Intermediate";
    return "Beginner";
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 py-8 pb-32">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Here's your wellness profile
          </h1>
        </div>

        {/* BMI Section */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Body Mass Index (BMI)</h2>
          
          {/* BMI Scale */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
            <div className="relative h-3 rounded-full bg-gradient-to-r from-blue-300 via-green-300 via-yellow-300 via-orange-300 to-red-400">
              <div 
                className="absolute w-3 h-3 bg-white border-2 border-gray-800 rounded-full top-0 transform -translate-y-0"
                style={{ left: `${Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>UNDERWEIGHT</span>
              <span>NORMAL</span>
              <span>OVERWEIGHT</span>
              <span>OBESE</span>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600">👤</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Body type</p>
                <p className="font-semibold text-gray-900">{getBodyType()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600">🪑</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Lifestyle</p>
                <p className="font-semibold text-gray-900">{getLifestyle()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600">💪</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Fitness level</p>
                <p className="font-semibold text-gray-900">{getFitnessLevel()}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-600">🔥</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Metabolism</p>
                <p className="font-semibold text-gray-900">
                  {nutritionScore >= 70 ? "Fast, easy to" : "Moderate, challenging to"}<br/>
                  <span className="text-sm">{nutritionScore >= 70 ? "stay fit" : "stay trim"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Character Illustration */}
        <div className="flex justify-end mb-6">
          <div className="w-32 h-48 bg-gradient-to-b from-purple-200 to-purple-300 rounded-2xl flex items-end justify-center relative">
            <div className="text-6xl">👩‍🦰</div>
            <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-xs">ℹ️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <button
            onClick={onNext}
            className="w-full bg-[#ea749b] text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-[#d85d87] transition-all duration-200"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}