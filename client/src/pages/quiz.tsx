import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import bblCommunityImage from "@assets/ChatGPT Image 31 de mai. de 2025, 19_00_30.png";
import Header from "@/components/quiz/Header";
import ProgressBar from "@/components/quiz/ProgressBar";
import GoalSelection from "@/components/quiz/GoalSelection";
import ActivityLevel from "@/components/quiz/ActivityLevel";
import PhysicalCondition from "@/components/quiz/PhysicalCondition";
import HealthConditions from "@/components/quiz/HealthConditions";
import DietaryPreferences from "@/components/quiz/DietaryPreferences";
import SleepHours from "@/components/quiz/SleepHours";
import HeightInput from "@/components/quiz/HeightInput";
import WeightInput from "@/components/quiz/WeightInput";
import TargetWeightInput from "@/components/quiz/TargetWeightInput";
import AgeInput from "@/components/quiz/AgeInput";
import AgeRangeSelection from "@/components/quiz/AgeRangeSelection";
import LoadingProgress from "@/components/quiz/LoadingProgress";
import WellnessProfile from "@/components/quiz/WellnessProfile";
import WeightPrediction from "@/components/quiz/WeightPrediction";
import PlanCreationLoading from "@/components/quiz/PlanCreationLoading";
import EmailCapture from "@/components/quiz/EmailCapture";
import NameInput from "@/components/quiz/NameInput";
import MotivationalMessage from "@/components/quiz/MotivationalMessage";
import PlanHighlights from "@/components/quiz/PlanHighlights";
import CheckoutSummary from "@/components/quiz/CheckoutSummary";
import InformationalPage from "@/components/quiz/InformationalPage";
import BBLExperienceQuestion from "@/components/quiz/BBLExperienceQuestion";
import BodyVisualization from "@/components/quiz/BodyVisualization";
import ButtTypeSelection from "@/components/quiz/ButtTypeSelection";
import FlexibilityQuestion from "@/components/quiz/FlexibilityQuestion";
import ButtImprovements from "@/components/quiz/ButtImprovements";
import UnderwearTypeQuestion from "@/components/quiz/UnderwearTypeQuestion";
import BottomStyleQuestion from "@/components/quiz/BottomStyleQuestion";
import PainAreasQuestion from "@/components/quiz/PainAreasQuestion";
import ExerciseFrequencyQuestion from "@/components/quiz/ExerciseFrequencyQuestion";
import StairsConditionQuestion from "@/components/quiz/StairsConditionQuestion";
import WorkRoutineQuestion from "@/components/quiz/WorkRoutineQuestion";
import DailyActivityQuestion from "@/components/quiz/DailyActivityQuestion";
import EnergyLevelsQuestion from "@/components/quiz/EnergyLevelsQuestion";
import EatingRoutineQuestion from "@/components/quiz/EatingRoutineQuestion";
import DietTypeQuestion from "@/components/quiz/DietTypeQuestion";
import FoodRestrictionsQuestion from "@/components/quiz/FoodRestrictionsQuestion";
import InsecurityAreasQuestion from "@/components/quiz/InsecurityAreasQuestion";
import IntimacyInsecuritiesQuestion from "@/components/quiz/IntimacyInsecuritiesQuestion";
import WorkoutTimeQuestion from "@/components/quiz/WorkoutTimeQuestion";
import WorkoutFrequencyQuestion from "@/components/quiz/WorkoutFrequencyQuestion";
import TargetZones from "@/components/quiz/TargetZones";
import DreamBodySelection from "@/components/quiz/DreamBodySelection";
import PersonalizedAnalysis from "@/components/quiz/PersonalizedAnalysis";
import PersonalizedCoupon from "@/components/quiz/PersonalizedCoupon";
import WeightProjection from "@/components/quiz/WeightProjection";
import LastPlanEver from "@/components/quiz/LastPlanEver";
import ProfileSummary from "@/components/quiz/ProfileSummary";

export interface QuizData {
  // Step 1
  ageRange: string;
  // Step 3
  bblExperience: string;
  // Step 5
  mainGoals: string[];
  // Step 6
  bodyType: string;
  // Step 7
  buttType: string;
  // Step 8
  flexibility: string;
  // Step 9
  buttImprovements: string[];
  // Step 10
  underwearType: string;
  // Step 11
  bottomStyle: string;
  // Step 13
  painAreas: string[];
  // Step 15
  exerciseFrequency: string;
  // Step 16
  stairsCondition: string;
  // Step 17
  workRoutine: string;
  // Step 18
  dailyActivity: string;
  // Step 19
  energyLevels: string;
  // Step 21
  eatingRoutine: string;
  // Step 22
  dietType: string;
  // Step 23
  foodRestrictions: string[];
  // Step 25
  insecurityAreas: string[];
  // Step 26
  intimacyInsecurities: string[];
  // Step 27-30
  height: number;
  heightUnit: string;
  currentWeight: number;
  weightUnit: string;
  targetWeight: number;
  age: number;
  // Step 33-34
  workoutTime: string;
  workoutFrequency: string;
  // Step 35-37
  targetZones: string[];
  dreamBodyType: string;
  email: string;
  name: string;
  selectedPlan: string;
}

const TOTAL_STEPS = 40;

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<Partial<QuizData>>({});

  const updateQuizData = (data: Partial<QuizData>) => {
    setQuizData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < stepComponents.length - 1) {
      setCurrentStep(prev => prev + 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Scroll to top when changing steps
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const stepComponents = [
    // Step 1 - Age question
    <AgeRangeSelection key="age-range" onNext={nextStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 2 - Informational page
    <InformationalPage
      key="info-1"
      onNext={nextStep}
      onPrevious={previousStep}
      title="Over 587 thousand women have already tried the BBL challenge and progressed towards their goals!"
      buttonText="CONTINUE"
      showImage={true}
      imageUrl={bblCommunityImage}
    />,
    
    // Step 3 - BBL Experience question
    <BBLExperienceQuestion key="bbl-experience" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 4 - Informational page
    <InformationalPage
      key="info-2"
      onNext={nextStep}
      onPrevious={previousStep}
      title="✅ You're going to rock it!"
      subtitle="Our challenge works for any age!"
      description="We help you shape your body without leaving home! No need to face crowded gyms, harmful drugs or surgeries that put your life at risk."
      highlightType="green"
    />,
    
    // Step 5 - Main goals question
    <GoalSelection key="goal" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 6 - Body type question
    <BodyVisualization key="body-type" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 7 - Dream body question
    <DreamBodySelection key="dream-body" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 8 - Butt type question
    <ButtTypeSelection key="butt-type" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 9 - Flexibility question
    <FlexibilityQuestion key="flexibility" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 10 - Glute improvements question
    <ButtImprovements key="butt-improvements" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 11 - Underwear type question
    <UnderwearTypeQuestion key="underwear-type" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 12 - Bottom style question
    <BottomStyleQuestion key="bottom-style" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 12 - Informational page about clothing
    <InformationalPage
      key="info-3"
      onNext={nextStep}
      onPrevious={previousStep}
      title="🚨 Did you know that the clothes you wear daily shape your body over time?"
      description="They can enhance or accentuate unwanted volumes without you realizing it."
      subtitle="✅ The good news - With the right exercises for your body, you can correct this and sculpt the curves you desire!"
      highlightType="red"
    />,
    
    // Step 13 - Pain/restrictions question
    <PainAreasQuestion key="pain-areas" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 14 - Informational page about care
    <InformationalPage
      key="info-4"
      onNext={nextStep}
      onPrevious={previousStep}
      title="✅ You're in good hands!"
      description="Our exercises are gentle and effective, with no impact. You'll find the ideal exercise for your body to achieve the best results without suffering!"
      highlightType="green"
    />,
    
    // Step 15 - Exercise frequency question
    <ExerciseFrequencyQuestion key="exercise-frequency" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 16 - Stairs condition question
    <StairsConditionQuestion key="stairs-condition" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 17 - Work routine question
    <WorkRoutineQuestion key="work-routine" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 18 - Daily activity question
    <DailyActivityQuestion key="daily-activity" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 19 - Energy levels question
    <EnergyLevelsQuestion key="energy-levels" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 20 - Informational page about energy
    <InformationalPage
      key="info-5"
      onNext={nextStep}
      onPrevious={previousStep}
      title="💃 The BBL Challenge will renew your energy for daily life!"
      description="Our challenge activates large muscle groups and releases endorphins. We'll guide you to get the best results by regulating your hormones, boosting your energy, igniting your libido and elevating your self-esteem!"
      highlightType="green"
    />,
    
    // Step 21 - Eating routine question
    <EatingRoutineQuestion key="eating-routine" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 22 - Diet type question
    <DietTypeQuestion key="diet-type" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 23 - Food restrictions question
    <FoodRestrictionsQuestion key="food-restrictions" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 24 - Informational page about menu
    <InformationalPage
      key="info-6"
      onNext={nextStep}
      onPrevious={previousStep}
      title="👑 Don't worry, we take care of you with great attention!"
      description="Our challenge includes a practical and exclusive menu for your eating profile. We bring a variety of options that will accelerate your challenge results and are ideal for you who want to grow your glutes!"
      highlightType="green"
    />,
    
    // Step 25 - Insecurity areas question
    <InsecurityAreasQuestion key="insecurity-areas" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 26 - Intimacy insecurities question
    <IntimacyInsecuritiesQuestion key="intimacy-insecurities" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 27 - Height input
    <HeightInput key="height" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 28 - Current weight input
    <WeightInput key="weight" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 29 - Target weight input
    <TargetWeightInput key="target-weight" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 30 - Age input
    <AgeInput key="age" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 31 - Profile summary (BMI and characteristics)
    <ProfileSummary key="profile-summary" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 32 - Analysis loading page
    <LoadingProgress key="loading-analysis" onNext={nextStep} onPrevious={previousStep} data={quizData} />,
    
    // Step 33 - Workout time question
    <WorkoutTimeQuestion key="workout-time" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 34 - Weekly frequency question
    <WorkoutFrequencyQuestion key="workout-frequency" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 35 - Target areas question
    <TargetZones key="target-zones" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 36 - Loading with testimonials
    <PlanCreationLoading key="plan-creation" onNext={nextStep} onPrevious={previousStep} data={quizData} />,
    
    // Step 37 - The last plan you'll ever need (animated chart)
    <LastPlanEver key="last-plan" onNext={nextStep} onPrevious={previousStep} data={quizData} />,
    
    // Step 38 - Name input
    <NameInput key="name" onNext={nextStep} onPrevious={previousStep} onUpdate={updateQuizData} data={quizData} />,
    
    // Step 39 - Personalized progress projection
    <WeightProjection key="weight-projection-final" onNext={nextStep} onPrevious={previousStep} data={quizData} />,
    
    // Step 40 - Final result page with integrated coupon
    <CheckoutSummary key="checkout" onNext={nextStep} onPrevious={previousStep} data={quizData} />
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onBack={previousStep} 
        showBackButton={currentStep > 0}
        showProgressBar={![1, 3, 12, 14, 20, 24, 31, 32, 36, 37, 38, 39].includes(currentStep)} // Remove progress bar for: informational pages (1,3,12,14,20,24), profile summary (31), loading (32,36), last plan (37), name (38), weight projection (39), checkout (40)
        currentStep={currentStep + 1}
        totalSteps={TOTAL_STEPS}
      />
      
      <main className="w-full max-w-none relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ 
              opacity: 0, 
              x: 50,
              scale: 0.98 
            }}
            animate={{ 
              opacity: 1, 
              x: 0,
              scale: 1 
            }}
            exit={{ 
              opacity: 0, 
              x: -50,
              scale: 0.98 
            }}
            transition={{
              duration: 0.35,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="w-full"
          >
            {stepComponents[currentStep]}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
