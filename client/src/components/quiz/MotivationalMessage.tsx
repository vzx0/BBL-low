import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, Star, Target, TrendingUp, Sparkles } from "lucide-react";

interface MotivationalMessageProps {
  onNext: () => void;
  onPrevious: () => void;
  messageType?: "crush" | "make-happen" | "got-you" | "custom";
  customTitle?: string;
  customSubtitle?: string;
  customDescription?: string;
  showImage?: boolean;
  imageUrl?: string;
}

export default function MotivationalMessage({ 
  onNext, 
  onPrevious, 
  messageType = "crush",
  customTitle,
  customSubtitle,
  customDescription,
  showImage = false,
  imageUrl
}: MotivationalMessageProps) {

  const getMessageContent = () => {
    switch (messageType) {
      case "crush":
        return {
          icon: <Target className="h-8 w-8 text-blue-600" />,
          title: "You're going to crush this!",
          subtitle: "Our BBL Challenge program is easy and effective fitness option for all levels.",
          description: "We help you get in shape using zero equipment at home!",
          showImage: true
        };
      case "make-happen":
        return {
          icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
          title: "We know how to make that happen!",
          subtitle: "Life is 99 problems, but your fitness routine doesn't have to be one.",
          description: "BBL Challenge is perfect for slimming down at your own pace and with pleasure!",
          showImage: false
        };
      case "got-you":
        return {
          icon: <CheckCircle className="h-8 w-8 text-green-600" />,
          title: "We got you!",
          subtitle: "You'll find lots of gentle exercises that also strengthen your knees.",
          description: "This means enjoying longer walks, less tension, and more day-to-day confidence!",
          showImage: false
        };
      case "custom":
        return {
          icon: <Sparkles className="h-8 w-8 text-pink-600" />,
          title: customTitle || "Great choice!",
          subtitle: customSubtitle || "We're here to help you succeed.",
          description: customDescription || "Let's continue your journey.",
          showImage: showImage
        };
      default:
        return {
          icon: <Target className="h-8 w-8 text-blue-600" />,
          title: "You're going to crush this!",
          subtitle: "Our BBL Challenge program is easy and effective fitness option for all levels.",
          description: "We help you get in shape using zero equipment at home!",
          showImage: true
        };
    }
  };

  const content = getMessageContent();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 max-w-md mx-auto px-6 py-12 pb-32">
        {/* Ícone contextual */}
        <div className="mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            {content.icon}
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
          {content.title}
        </h1>

        {/* Conteúdo */}
        <div className="space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold">{content.subtitle.split(' ').slice(0, 4).join(' ')}</span>
            {content.subtitle.split(' ').slice(4).length > 0 && (
              <span> {content.subtitle.split(' ').slice(4).join(' ')}</span>
            )}
          </p>

          <p className="text-gray-600 leading-relaxed">
            {content.description}
          </p>
        </div>

        {/* Image */}
        {(content.showImage || showImage) && (
          <div className="mt-8">
            {imageUrl ? (
              <img 
                src={imageUrl} 
                alt="Workout demonstration" 
                className="w-full rounded-2xl shadow-lg"
              />
            ) : (
              <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-gray-600 font-medium text-sm">Woman doing BBL workout</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botão fixado na parte inferior */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white">
        <div className="max-w-md mx-auto">
          <button
            onClick={onNext}
            className="w-full bg-[#ea749b] text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-[#d85d87] transition-all duration-200"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}