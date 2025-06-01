import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Star, Copy, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import beforeImage from "@assets/gsg8boognozdj7b0dlmj.webp";
import afterImage from "@assets/gpb0nidq274vf3tjfhpi.webp";

interface CheckoutSummaryProps {
  onNext: () => void;
  onPrevious: () => void;
  data: any;
}

const planHighlights = [
  {
    icon: "🏠",
    title: "Easy home workouts",
    subtitle: "to lose weight and tone up"
  },
  {
    icon: "🏋️‍♀️",
    title: "Beginner exercises",
    subtitle: "for a flatter belly and better shape"
  },
  {
    icon: "⏱️",
    title: "10-20 minute routines",
    subtitle: "that fit your schedule"
  },
  {
    icon: "🏠",
    title: "No equipment needed",
    subtitle: "all you need is our plan"
  },
  {
    icon: "🍽️",
    title: "Personalized meal plan",
    subtitle: "with quick and tasty recipes"
  },
  {
    icon: "📋",
    title: "Expert tips and tricks",
    subtitle: "to improve your lifestyle and stay in shape"
  }
];

const faqItems = [
  {
    question: "How can this plan help me grow my glutes?",
    answer: "Your BBL Challenge plan includes targeted glute exercises and routines designed specifically to build, tone, and grow your booty. The training focuses on all glute muscles with progressive workouts that will help you achieve a rounder, firmer shape."
  },
  {
    question: "Is it okay that I'm a beginner?",
    answer: "Absolutely! Our BBL Challenge routines are designed for all fitness levels and will gradually progress to help you build stronger glutes over time."
  },
  {
    question: "How will the plan be delivered?",
    answer: "You'll get instant access to your personalized BBL Challenge plan through our mobile app, available on iOS and Android."
  }
];

const testimonials = [
  {
    name: "Amber",
    rating: 5,
    text: "I had my doubts but the BBL Challenge really helped me to be consistent with my workouts. I've never done targeted glute training before so didn't know what to expect. I'm surprised how much more lifted and rounder my glutes feel."
  },
  {
    name: "Amanda",
    rating: 5,
    text: "Highly recommend for those wanting to grow their glutes. This app has helped me better myself and achieve my booty goals. The app is very easy to use and with the everyday reminders and coaching, it's kept me more motivated than ever."
  },
  {
    name: "Tila",
    rating: 5,
    text: "I've been using the BBL Challenge since February 2023 and gained amazing shape in my glutes. I love how it gears to my age, limitations and always gives me encouragement to keep going. The app is simple and keeps me on track."
  }
];

const beforeAfterImages = [
  {
    name: "Sarah",
    result: "BBL Challenge",
    beforeImage: beforeImage,
    afterImage: afterImage
  },
  {
    name: "Maria",
    result: "21 Days",
    beforeImage: beforeImage,
    afterImage: afterImage
  },
  {
    name: "Juliana",
    result: "Amazing Results",
    beforeImage: beforeImage,
    afterImage: afterImage
  }
];

export default function CheckoutSummary({ onNext, data }: CheckoutSummaryProps) {
  const [selectedPlan, setSelectedPlan] = useState("bbl-challenge");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentBeforeAfter, setCurrentBeforeAfter] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [copied, setCopied] = useState(false);

  // Generate coupon code based on name
  const generateCouponCode = (name: string) => {
    const cleanName = name.replace(/\s+/g, '').toUpperCase();
    return `${cleanName}50`;
  };

  const couponCode = generateCouponCode(data.name || "USUARIO");

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  // Timer countdown effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Auto-slide for before/after images
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentBeforeAfter((prev) => (prev + 1) % beforeAfterImages.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(slideTimer);
  }, []);

  // Navigation functions for before/after
  const nextSlide = () => {
    setCurrentBeforeAfter((prev) => (prev + 1) % beforeAfterImages.length);
  };

  const prevSlide = () => {
    setCurrentBeforeAfter((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
  };

  // Personalize content based on user data
  const getPersonalizedGoal = () => {
    if (data.mainGoals?.includes('Grow the butt') || data.mainGoals?.includes('Crescer o bumbum')) {
      return 'Grow the butt';
    } else if (data.mainGoals?.includes('Lift the butt') || data.mainGoals?.includes('Levantar o bumbum')) {
      return 'Lift the butt';
    } else if (data.mainGoals?.includes('Tone the butt') || data.mainGoals?.includes('Tonificar o bumbum')) {
      return 'Tone the butt';
    } else if (data.mainGoals?.includes('Strengthen legs') || data.mainGoals?.includes('Fortalecer pernas')) {
      return 'Strengthen legs';
    }
    return 'Grow the butt';
  };

  const getPersonalizedTarget = () => {
    const targetWeight = data.targetWeight || 50;
    const currentWeight = data.currentWeight || 60;
    const weightDiff = currentWeight - targetWeight;
    
    if (weightDiff > 0) {
      return `${targetWeight} kg (-${weightDiff} kg)`;
    }
    return `${targetWeight} kg`;
  };

  const getUserGoals = () => {
    const goals = [];
    if (data.mainGoals?.includes("Grow the butt") || data.mainGoals?.includes("Crescer o bumbum")) goals.push("Grow the butt");
    if (data.mainGoals?.includes("Lift the butt") || data.mainGoals?.includes("Levantar o bumbum")) goals.push("Lift the butt");
    if (data.mainGoals?.includes("Tone the butt") || data.mainGoals?.includes("Tonificar o bumbum")) goals.push("Tone the butt");
    if (data.mainGoals?.includes("Strengthen legs") || data.mainGoals?.includes("Fortalecer pernas")) goals.push("Strengthen legs");
    if (data.mainGoals?.includes("Lose weight") || data.mainGoals?.includes("Perder peso")) goals.push("Lose weight");
    return goals.length > 0 ? goals.join(", ") : "Transform the body";
  };

  const getUserActivityLevel = () => {
    if (data.exerciseFrequency === "Sedentary" || data.exerciseFrequency === "Sedentário") return "Sedentary";
    if (data.exerciseFrequency === "Lightly active" || data.exerciseFrequency === "Pouco ativo") return "Lightly active";
    if (data.exerciseFrequency === "Moderately active" || data.exerciseFrequency === "Moderadamente ativo") return "Moderately active";
    if (data.exerciseFrequency === "Very active" || data.exerciseFrequency === "Muito ativo") return "Very active";
    return "Moderately active";
  };

  const getUserAge = () => {
    if (data.ageRange) return data.ageRange;
    if (data.age) return `${data.age} years`;
    return "25-35 years";
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const plans = [
    {
      id: "bbl-challenge",
      title: "BBL Challenge - 21 Days",
      subtitle: "SPECIAL OFFER",
      originalPrice: "$23.80",
      price: "$11.90",
      discount: "50% OFF",
      dailyPrice: "$0.57",
      dailyLabel: "per day",
      popular: true
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Fixed Header with Timer and Button */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Timer Display */}
          <div className="text-left">
            <div className="text-2xl font-bold text-[#ea749b] mb-1">
              {formatTime(timeLeft).replace(':', ' : ')}
            </div>
            <div className="text-xs text-gray-600">
              min   sec
            </div>
          </div>
          
          {/* Get Plan Button */}
          <Button 
            onClick={() => window.open('https://lp.bblchalllenge.com/click', '_blank')}
            className="bg-[#ea749b] hover:bg-[#e85a8a] text-white font-bold py-3 px-6 rounded-2xl text-sm w-full"
          >
            GET MY PERSONALIZED PLAN
          </Button>
        </div>
      </div>

      <div className="pt-20 pb-8 max-w-md mx-auto px-4">
        {/* Body Comparison Section */}
        <div className="mb-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center">
              <div className="bg-gray-100 rounded-2xl p-4 mb-3">
                <img 
                  src={beforeImage}
                  alt="Before - BBL Challenge"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm mb-1">Body fat</p>
                <p className="font-semibold text-gray-900">Normal</p>
                <p className="text-gray-600 text-sm mb-1 mt-2">BBL Challenge level</p>
                <p className="font-semibold text-gray-900">Intermediate</p>
                <div className="flex space-x-1 mt-2">
                  <div className="h-2 w-8 bg-primary rounded"></div>
                  <div className="h-2 w-8 bg-primary rounded"></div>
                  <div className="h-2 w-8 bg-gray-200 rounded"></div>
                </div>
              </div>
              <p className="text-gray-700 font-medium text-center mt-2">Now</p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-2xl p-4 mb-3">
                <img 
                  src={afterImage}
                  alt="After - BBL Challenge"
                  className="w-full h-48 object-cover rounded-xl"
                />
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm mb-1">Body fat</p>
                <p className="font-semibold text-gray-900">Normal</p>
                <p className="text-gray-600 text-sm mb-1 mt-2">BBL Challenge level</p>
                <p className="font-semibold text-gray-900">Advanced</p>
                <div className="flex space-x-1 mt-2">
                  <div className="h-2 w-8 bg-primary rounded"></div>
                  <div className="h-2 w-8 bg-primary rounded"></div>
                  <div className="h-2 w-8 bg-primary rounded"></div>
                </div>
              </div>
              <p className="text-primary font-medium text-center mt-2">Your Goal</p>
            </div>
          </div>
        </div>

        {/* Plan Ready Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
            Get<br/>
            visible results<br/>
            in 4 weeks!
          </h1>
          
          {/* Coupon Applied Section */}
          <div className="mb-6 bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl p-6 border border-green-200 shadow-sm">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4 shadow-lg">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-gray-900">
                  Your promotional code has been applied!
                </h3>
              </div>
            </div>
            
            <div className="flex items-center justify-between bg-white rounded-xl p-5 border border-green-300 shadow-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
                <span className="font-bold text-lg text-gray-900">
                  {data?.name ? `${data.name.toLowerCase().replace(/\s+/g, '_')}_may25` : 'teste_may25'}
                </span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  {formatTime(timeLeft).replace(':', ' : ')}
                </div>
                <div className="text-xs text-gray-600">
                  min   sec
                </div>
              </div>
            </div>
          </div>

          {/* Personalized Quiz Summary */}
          <div className="mb-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">Your Personalized Plan</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <span className="text-pink-600 text-lg">🎯</span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Main Goal</p>
                    <p className="font-semibold text-gray-900">{getUserGoals()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 text-lg">🏃‍♀️</span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Activity Level</p>
                    <p className="font-semibold text-gray-900">{getUserActivityLevel()}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-lg">👤</span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Age Range</p>
                    <p className="font-semibold text-gray-900">{getUserAge()}</p>
                  </div>
                </div>
              </div>

              {data.buttType && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">🍑</span>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Butt Type</p>
                      <p className="font-semibold text-gray-900">{data.buttType}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">🎯</span>
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm">Goal</p>
                <p className="font-semibold text-gray-900">{getPersonalizedGoal()}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">🍑</span>
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm">Target shape</p>
                <p className="font-semibold text-gray-900">{getPersonalizedTarget()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="space-y-4 mb-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative border-2 rounded-2xl p-6 cursor-pointer transition-all",
                selectedPlan === plan.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 bg-white",
                plan.popular && "border-primary"
              )}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {plan.discount}
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={cn(
                    "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                    selectedPlan === plan.id
                      ? "border-primary bg-primary"
                      : "border-gray-300"
                  )}>
                    {selectedPlan === plan.id && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </div>
                  
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{plan.title}</p>
                    {plan.subtitle && (
                      <p className="text-red-600 text-sm font-medium">{plan.subtitle}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-gray-500 text-lg line-through">{plan.originalPrice}</p>
                      <p className="text-green-600 font-bold text-xl">{plan.price}</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{plan.dailyPrice}</p>
                  <p className="text-gray-500 text-sm">{plan.dailyLabel}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terms Checkbox */}
        <div className="mb-6">
          <label className="flex items-start space-x-3 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1"
            />
            <span>
              I agree to the{" "}
              <a href="#" className="text-blue-600 underline">Terms and Conditions</a>,{" "}
              <a href="#" className="text-blue-600 underline">Privacy policy</a>,{" "}
              <a href="#" className="text-blue-600 underline">Subscription policy</a>{" "}
              and the{" "}
              <a href="#" className="text-blue-600 underline">Refund and Cancellation policy</a>
            </span>
          </label>
        </div>

        {/* CTA Button with Timer */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">Special offer expires in:</div>
            <div className="bg-red-100 text-red-600 px-4 py-3 rounded-full text-base font-semibold min-w-[80px] text-center">
              {formatTime(timeLeft)}
            </div>
          </div>
          <Button 
            onClick={() => window.open('https://lp.bblchalllenge.com/click', '_blank')}
            disabled={!agreedToTerms}
            className="w-full bg-[#ea749b] hover:bg-[#e85a8a] text-white font-bold py-4 px-8 rounded-2xl text-base disabled:opacity-50"
          >
            GET MY PERSONALIZED PLAN
          </Button>
        </div>

        {/* Auto-renewal notice */}
        <p className="text-xs text-gray-500 text-center mb-8">
          By clicking GET MY PLAN, I agree that the plan I have selected will automatically 
          renew until I cancel. BBL Challenge will automatically charge my payment method{" "}
          <strong>$11.90</strong> every <strong>21 days</strong>. I can cancel online by visiting subscription page in{" "}
          <a href="#" className="text-blue-600 underline">my account</a>{" "}
          on website or in the app to avoid being charged for the next billing cycle.
        </p>

        {/* Highlights Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Your plan highlights
          </h2>
          
          <div className="space-y-6">
            {planHighlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    {index === 0 && <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>}
                    {index === 1 && <path d="M20.57,14.86L22,13.43L20.57,12L17,15.57L8.43,7L12,3.43L10.57,2L9.14,3.43L7.71,2L5.57,4.14L4.14,2.71L2.71,4.14L4.14,5.57L2,7.71L3.43,9.14L2,10.57L3.43,12L7,8.43L15.57,17L12,20.57L13.43,22L14.86,20.57L16.29,22L18.43,19.86L19.86,21.29L21.29,19.86L19.86,18.43L22,16.29L20.57,14.86Z"/>}
                    {index === 2 && <path d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z"/>}
                    {index === 3 && <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z"/>}
                    {index === 4 && <path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1c-.55 0-1 .45-1 1v3H8V1c0-.55-.45-1-1-1H6v4H1l1.65 16.48c.1.82.79 1.46 1.63 1.46h1.66c.84 0 1.53-.64 1.63-1.46L9.5 7h5l1.93 14.53c.1.82.79 1.46 1.63 1.46z"/>}
                    {index === 5 && <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>}
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{highlight.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{highlight.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credibility Section */}
        <div className="mb-8 bg-gray-50 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            As featured in
          </h2>
          
          <div className="grid grid-cols-2 gap-4 items-center justify-items-center">
            {/* First Row */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">USA<br/>TODAY</span>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <span className="text-gray-600 text-2xl font-serif italic">Forbes</span>
            </div>
            
            {/* Second Row */}
            <div className="flex items-center justify-center">
              <span className="text-gray-600 text-2xl font-serif">WSJ</span>
            </div>
            <div className="flex items-center justify-center col-span-1">
              <span className="text-gray-600 text-xl font-bold">Mashable</span>
            </div>
            
            {/* Third Row - Centered */}
            <div className="col-span-2 flex justify-center">
              <span className="text-gray-600 text-xl font-bold italic transform -skew-x-12">NEW YORK POST</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Results that make us proud
          </h2>
          
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentBeforeAfter * 100}%)` }}
              >
                {beforeAfterImages.map((result, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 gap-2">
                      <img 
                        src={result.beforeImage}
                        alt="Before"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                      <img 
                        src={result.afterImage}
                        alt="After"
                        className="w-full h-64 object-cover rounded-xl"
                      />
                    </div>
                    <div className="text-center mt-4">
                      <p className="font-semibold text-gray-900">{result.name}, {result.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          <p className="text-sm text-gray-600 mt-4 text-center">
            It helps you track everything you need when you want to help 
            yourself lowering weight or keeping it, from water to food and 
            calories and many other, adding to that the 1 to 1 conversations 
            are super helpful the trainings help so much it's extremely good.
          </p>
          
          <button className="text-blue-600 text-sm font-medium mt-2 block mx-auto">
            Read more
          </button>

          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {beforeAfterImages.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentBeforeAfter ? 'bg-gray-900' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>


        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            People often ask
          </h2>
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="font-semibold text-gray-900 pr-4">{item.question}</h3>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFaq === index && (
                  <div className="mt-3">
                    <p className="text-gray-600 text-sm">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">
            Users love our plans
          </h2>
          
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  {testimonial.text}
                  <button className="text-blue-600 ml-1">more</button>
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-4">
            <strong>Disclaimer:</strong> Following exercise and diet plans is the key in your fitness journey and greatly 
            impacts results. In 4 weeks users can typically expect to lose not more than 0.45-0.90 kg 
            per week. Individual results may vary.
          </p>
        </div>

        {/* Final CTA Section */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Get visible results in 4 weeks!
          </h2>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">🎯</span>
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm">Goal</p>
                <p className="font-semibold text-gray-900">Lose weight</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary text-lg">⚖️</span>
              </div>
              <div className="text-left">
                <p className="text-gray-600 text-sm">Target weight</p>
                <p className="font-semibold text-gray-900">50 kg</p>
              </div>
            </div>
          </div>

          {/* Repeat pricing plans */}
          <div className="space-y-4 mb-6">
            {plans.map((plan) => (
              <div
                key={`final-${plan.id}`}
                className={cn(
                  "relative border-2 rounded-2xl p-4 cursor-pointer transition-all",
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 bg-white",
                  plan.popular && "border-primary"
                )}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                      selectedPlan === plan.id
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    )}>
                      {selectedPlan === plan.id && (
                        <Check className="h-4 w-4 text-white" />
                      )}
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-900">{plan.title}</p>
                      {plan.subtitle && (
                        <p className="text-gray-500 text-sm">{plan.subtitle}</p>
                      )}
                      <p className="text-gray-900 font-medium">{plan.price}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{plan.dailyPrice}</p>
                    <p className="text-gray-500 text-sm">{plan.dailyLabel}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Terms Checkbox */}
          <div className="mb-6">
            <label className="flex items-start space-x-3 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1"
              />
              <span>
                I agree to the{" "}
                <a href="#" className="text-blue-600 underline">Terms and Conditions</a>,{" "}
                <a href="#" className="text-blue-600 underline">Privacy policy</a>,{" "}
                <a href="#" className="text-blue-600 underline">Subscription policy</a>{" "}
                and the{" "}
                <a href="#" className="text-blue-600 underline">Refund and Cancellation policy</a>
              </span>
            </label>
          </div>

          <div className="relative mb-4">
            <div className="absolute inset-0 bg-[#ea749b] rounded-3xl blur-md animate-pulse opacity-50"></div>
            <Button 
              onClick={onNext}
              disabled={!agreedToTerms}
              className="relative w-full bg-[#ea749b] hover:bg-[#e85a8a] text-white font-bold py-4 px-8 rounded-3xl text-base disabled:opacity-50 shadow-lg"
            >
              GET MY PLAN
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center mb-8">
            By clicking GET MY PLAN, I agree that the plan I have selected will automatically 
            renew until I cancel. BBL Challenge will automatically charge my payment method{" "}
            <strong>R$11.90</strong> every <strong>21 days</strong>. I can cancel online by visiting subscription page in{" "}
            <a href="#" className="text-blue-600 underline">my account</a>{" "}
            on website or in the app to avoid being charged for the next billing cycle.
          </p>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center bg-gray-50 rounded-2xl p-6">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            30-day money-back guarantee
          </h3>
          
          <p className="text-gray-600 text-sm mb-4">
            We believe that our plan may work for you and you'll get visible 
            results in 4 weeks! We are ready to return your money back 
            if you don't see visible results and can demonstrate that you 
            followed our plan.
          </p>
          
          <p className="text-sm text-gray-600">
            Find more about applicable limitations in our{" "}
            <a href="#" className="text-blue-600 underline">money-back policy</a>.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">
            BBL Challenge International Limited | Office No. 101, 1st Floor, "Afentika Anna" Building, Corner of 
            Tepeleniou & Korytsa Street, 8010, Paphos, Cyprus
          </p>
          
          <div className="flex justify-center space-x-4 text-xs text-gray-500">
            <a href="#" className="underline">Privacy</a>
            <a href="#" className="underline">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
}