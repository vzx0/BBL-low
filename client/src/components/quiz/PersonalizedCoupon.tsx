import { useState, useEffect } from "react";
import { Copy, Check, Gift } from "lucide-react";
import { QuizData } from "@/pages/quiz";

interface PersonalizedCouponProps {
  data: QuizData;
  onNext: () => void;
  onPrevious: () => void;
}

export default function PersonalizedCoupon({ data, onNext, onPrevious }: PersonalizedCouponProps) {
  const [copied, setCopied] = useState(false);
  const [showCoupon, setShowCoupon] = useState(false);

  // Generate coupon code based on name
  const generateCouponCode = (name: string) => {
    const cleanName = name.replace(/\s+/g, '').toUpperCase();
    return `${cleanName}50`;
  };

  const couponCode = generateCouponCode(data.name || "USER");

  useEffect(() => {
    const timer = setTimeout(() => setShowCoupon(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-32">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#ea749b] rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            🎉 Congratulations, {data.name}!
          </h1>
          <p className="text-lg text-gray-600">
            You earned an exclusive personalized discount
          </p>
        </div>

        {/* Main Coupon */}
        <div className={`transform transition-all duration-1000 ${showCoupon ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="relative mx-auto max-w-md">
            {/* Coupon Design */}
            <div className="bg-gradient-to-r from-[#ea749b] to-[#d85d87] rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
                <div className="absolute top-8 right-8 w-6 h-6 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-6 left-8 w-4 h-4 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-10 h-10 border-2 border-white rounded-full"></div>
              </div>

              {/* Coupon content */}
              <div className="relative z-10 text-center">
                <div className="text-white mb-4">
                  <h2 className="text-2xl font-bold mb-2">SPECIAL OFFER</h2>
                  <div className="text-6xl font-black mb-2">50%</div>
                  <p className="text-lg font-semibold">OFF</p>
                </div>

                {/* Coupon code */}
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
                  <p className="text-white/80 text-sm mb-2">YOUR EXCLUSIVE CODE:</p>
                  <div className="bg-white rounded-xl p-3 flex items-center justify-between">
                    <span className="text-[#ea749b] font-black text-xl tracking-wider">
                      {couponCode}
                    </span>
                    <button
                      onClick={handleCopyCoupon}
                      className="ml-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-white/90 text-sm">
                  <p className="mb-1">✨ Valid only for you, {data.name}!</p>
                  <p>⏰ Limited offer - Use now!</p>
                </div>
              </div>

              {/* Serrated edges */}
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <div className="w-4 h-4 bg-pink-50 rounded-full"></div>
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                <div className="w-4 h-4 bg-pink-50 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">🏋️‍♀️</div>
            <h3 className="font-semibold text-gray-900 mb-1">21 Days</h3>
            <p className="text-sm text-gray-600">Complete program</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 mb-1">Exclusive App</h3>
            <p className="text-sm text-gray-600">Lifetime access</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-semibold text-gray-900 mb-1">Community</h3>
            <p className="text-sm text-gray-600">24/7 Support</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            🔥 Last hours of this offer!
          </h3>
          <p className="text-gray-600 mb-4">
            Over 10,000 women have already transformed their bodies with the BBL Challenge
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#ea749b]">R$ 197</div>
              <div className="text-sm text-gray-500 line-through">R$ 394</div>
            </div>
            <div className="text-3xl">→</div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">R$ 97</div>
              <div className="text-sm text-green-600 font-semibold">WITH YOUR COUPON</div>
            </div>
          </div>
        </div>

        {/* Urgency */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-center space-x-2 text-red-700">
            <span className="animate-pulse">🚨</span>
            <span className="font-semibold">ATTENTION: This offer expires in 24 hours!</span>
            <span className="animate-pulse">🚨</span>
          </div>
        </div>
      </div>

      {/* Fixed Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <button
            onClick={onNext}
            className="w-full bg-gradient-to-r from-[#ea749b] to-[#d85d87] text-white py-4 px-8 rounded-full font-bold text-lg hover:from-[#d85d87] hover:to-[#c44d78] transition-all duration-200 shadow-lg"
          >
            APPLY COUPON AND COMPLETE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}