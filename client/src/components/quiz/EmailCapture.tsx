import { useState } from "react";
import { Lock } from "lucide-react";
import type { QuizData } from "@/pages/quiz";

interface EmailCaptureProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

export default function EmailCapture({ onNext, onPrevious, onUpdate, data }: EmailCaptureProps) {
  const [email, setEmail] = useState(data.email || "");

  const handleContinue = () => {
    console.log('Button clicked!');
    console.log('Email value:', email);
    console.log('Email trimmed:', email.trim());
    console.log('onNext function:', typeof onNext);
    console.log('onUpdate function:', typeof onUpdate);
    
    try {
      if (email && email.trim().length > 0) {
        console.log('Updating with email:', email.trim());
        onUpdate({ email: email.trim() });
        console.log('Calling onNext...');
        onNext();
        console.log('onNext called successfully');
      } else {
        console.log('Email is empty or invalid');
      }
    } catch (error) {
      console.error('Error in handleContinue:', error);
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Digite seu email para receber seu{" "}
            <span className="text-[#ea749b]">Plano BBL Challenge</span> personalizado
          </h1>
        </div>

        <div className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="seu.email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-2 focus:ring-[#ea749b] focus:border-[#ea749b] text-gray-900 placeholder-gray-400 outline-none"
            />
          </div>
          
          <div className="flex items-start space-x-3 text-sm text-gray-600 mt-4">
            <Lock className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <p className="leading-relaxed">
              Respeitamos sua privacidade e estamos comprometidos em proteger seus dados pessoais. Seus dados serão processados de acordo com nossa{" "}
              <a href="#" className="text-[#ea749b] underline font-medium">Política de Privacidade</a>.
            </p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleContinue();
            }}
            disabled={!email || email.trim().length === 0}
            className="w-full bg-[#ea749b] hover:bg-[#e85a8a] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-3xl text-base transition-all duration-200"
            type="button"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}
