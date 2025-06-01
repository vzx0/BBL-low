import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle, XCircle, Star, Heart, Target, TrendingUp, Sparkles, Shield, Info } from "lucide-react";

interface InformationalPageProps {
  onNext: () => void;
  onPrevious: () => void;
  title: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  highlightType?: "green" | "red" | "blue";
  showImage?: boolean;
  imageUrl?: string;
  messageType?: "success" | "warning" | "error" | "default" | "clothing" | "exercise" | "motivation" | "health" | "info";
}

export default function InformationalPage({ 
  onNext, 
  title, 
  subtitle, 
  description, 
  buttonText = "Continue",
  highlightType = "green",
  showImage = false,
  imageUrl,
  messageType = "default"
}: InformationalPageProps) {
  const getIconForMessageType = () => {
    switch (messageType) {
      case "success":
        return (
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        );
      case "warning":
        return (
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
          </div>
        );
      case "error":
        return (
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
        );
      case "clothing":
        return (
          <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-pink-600" />
          </div>
        );
      case "exercise":
        return (
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
        );
      case "motivation":
        return (
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        );
      case "health":
        return (
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
        );
      case "info":
        return (
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Info className="w-6 h-6 text-blue-600" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <Star className="w-6 h-6 text-gray-600" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="flex-1 max-w-md mx-auto px-6 py-12 pb-32">
        {/* Ícone contextual */}
        <div className="mb-8">
          {getIconForMessageType()}
        </div>

        {/* Título principal */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
          {title.replace(/[✅🎉🔥💃👑🚨]/g, '').trim()}
        </h1>

        {/* Conteúdo */}
        <div className="space-y-4">
          {subtitle && (
            <p className="text-lg text-gray-700 leading-relaxed">
              <span className="font-semibold">{subtitle.split(' ').slice(0, 3).join(' ')}</span>
              {subtitle.split(' ').slice(3).length > 0 && (
                <span> {subtitle.split(' ').slice(3).join(' ')}</span>
              )}
            </p>
          )}

          {description && (
            <p className="text-gray-600 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {showImage && imageUrl && (
          <div className="mt-8">
            <img
              src={imageUrl}
              alt="BBL Challenge Community"
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Botão fixado na parte inferior com linha sutil */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
        <div className="max-w-md mx-auto">
          <button
            onClick={onNext}
            className="w-full bg-[#ea749b] text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-[#d85d87] transition-all duration-200"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}