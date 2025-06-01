import React from 'react';
import { QuizData } from '@/pages/quiz';
import { calculateBMI, getBMICategory } from '@/lib/utils';
import gluteImage from "@assets/image_1748729842210.png";

interface ProfileSummaryProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

export default function ProfileSummary({ onNext, data }: ProfileSummaryProps) {
  // Calculate BMI
  const height = data.height || 160;
  const weight = data.currentWeight || 60;
  const bmi = calculateBMI(weight, height);
  
  // Get BMI position on scale (0-100%)
  const getBMIPosition = (bmi: number) => {
    if (bmi <= 15) return 0;
    if (bmi >= 40) return 100;
    return ((bmi - 15) / (40 - 15)) * 100;
  };

  const getBMILevel = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const getBodyType = () => {
    return data.bodyType || "Mesomorfo";
  };

  const getLifestyle = () => {
    if (data.exerciseFrequency === "Sedentário") return "Sedentary";
    if (data.exerciseFrequency === "Pouco ativo") return "Lightly active";
    if (data.exerciseFrequency === "Moderadamente ativo") return "Moderately active";
    if (data.exerciseFrequency === "Muito ativo") return "Very active";
    return "Sedentary";
  };

  const getFitnessLevel = () => {
    if (data.exerciseFrequency === "Sedentário") return "Basic";
    if (data.exerciseFrequency === "Pouco ativo") return "Basic";
    if (data.exerciseFrequency === "Moderadamente ativo") return "Intermediate";
    if (data.exerciseFrequency === "Muito ativo") return "Advanced";
    return "Basic";
  };

  const getMetabolism = () => {
    if (bmi < 18.5) return "Fast, may gain weight easily";
    if (bmi < 25) return "Moderate, balanced to maintain weight";
    if (bmi < 30) return "Moderate, challenging to stay toned";
    return "Slow, challenging to lose weight";
  };

  const bmiPosition = getBMIPosition(bmi);

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Body Mass Index (BMI)
          </h1>
        </div>

        {/* BMI Scale */}
        <div className="mb-8">
          {/* BMI Value Badge */}
          <div className="flex justify-end mb-4">
            <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Yours - {bmi.toFixed(2)}
            </div>
          </div>

          {/* BMI Scale Numbers */}
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>15</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40</span>
          </div>

          {/* BMI Scale Bar */}
          <div className="relative h-4 mb-3">
            {/* Background gradient */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 via-green-300 via-yellow-300 via-orange-300 to-red-400"></div>
            
            {/* BMI Indicator */}
            <div 
              className="absolute top-0 w-6 h-6 bg-gray-900 rounded-full transform -translate-x-3 -translate-y-1 shadow-lg"
              style={{ left: `${bmiPosition}%` }}
            >
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
            </div>
          </div>

          {/* BMI Categories */}
          <div className="flex justify-between text-xs text-gray-600">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
            <span>Obese</span>
          </div>
        </div>

        {/* Health Warning */}
        {bmi >= 25 && (
          <div className="bg-pink-50 border-l-4 border-pink-400 p-4 mb-8 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 text-sm font-bold">!</span>
                </div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Risks of unhealthy BMI:
                </h3>
                <p className="text-sm text-gray-700">
                  High blood pressure, increased risk of heart attack, stroke, type 2 diabetes, chronic back and joint pain
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Profile Details with Image */}
        <div className="flex gap-6">
          {/* Left side - Profile Information */}
          <div className="flex-1 space-y-6">
            {/* Body Type */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 10.5V19L13.5 17.5V10.5M10.5 10.5V17.5L9 19V10.5M9 7.5L3 7V9L9 10.5Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Body type</p>
                <p className="text-lg font-semibold text-gray-900">{getBodyType()}</p>
              </div>
            </div>

            {/* Lifestyle */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7,2V4H8V18A4,4 0 0,0 12,22A4,4 0 0,0 16,18V4H17V2H7M11,16C10.4,16 10,15.6 10,15C10,14.4 10.4,14 11,14C11.6,14 12,14.4 12,15C12,15.6 11.6,16 11,16M13,12C12.4,12 12,11.6 12,11C12,10.4 12.4,10 13,10C13.6,10 14,10.4 14,11C14,11.6 13.6,12 13,12M11,8C10.4,8 10,7.6 10,7C10,6.4 10.4,6 11,6C11.6,6 12,6.4 12,7C12,7.6 11.6,8 11,8Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Lifestyle</p>
                <p className="text-lg font-semibold text-gray-900">{getLifestyle()}</p>
              </div>
            </div>

            {/* Fitness Level */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Fitness level</p>
                <p className="text-lg font-semibold text-gray-900">{getFitnessLevel()}</p>
              </div>
            </div>

            {/* Metabolism */}
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">Metabolism</p>
                <p className="text-lg font-semibold text-gray-900">{getMetabolism()}</p>
              </div>
            </div>
          </div>

          {/* Right side - Glute Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-40 rounded-2xl overflow-hidden">
              <img
                src={gluteImage}
                alt="BBL Goal"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
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