import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/utils";
import type { QuizData } from "@/pages/quiz";

interface FinalOfferProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

const plans = [
  { id: "trial", name: "1 Week Trial", duration: "21-DAY PLAN", price: 19.90, dailyPrice: 2.84 },
  { id: "popular", name: "21-Day Plan", price: 49.90, dailyPrice: 1.78, popular: true },
  { id: "extended", name: "90-Day Plan", price: 199.99, dailyPrice: 1.19 },
];

export default function FinalOffer({ onNext, onUpdate, data }: FinalOfferProps) {
  const [selectedPlan, setSelectedPlan] = useState(data.selectedPlan || "popular");

  const handlePurchase = () => {
    onUpdate({ selectedPlan });
    onNext();
  };

  return (
    <div className="gradient-bg rounded-2xl p-6 mb-6">
      <div className="text-center mb-8">
        <p className="text-xs text-gray-500 mb-4">
          *Warning: Following exercises and diet plans is key in your fitness journey and greatly impacts results. In 4 weeks users can expect to lose no more than 0.45-0.90 kg per week. Individual results may vary.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Get visible results in 21 days!
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm">Meta: {data.goal || 'Transformação'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-sm">Peso objetivo: 65 kg</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={cn(
              "relative border-2 rounded-xl p-4 cursor-pointer transition-all duration-300",
              selectedPlan === plan.id 
                ? "border-primary bg-primary/10" 
                : "border-gray-200",
              plan.popular && "bg-primary/5"
            )}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  MAIS POPULAR
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {selectedPlan === plan.id && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
                <div>
                  <div className="font-medium text-gray-900">{plan.name}</div>
                  {plan.duration && (
                    <div className="text-sm text-gray-600">{plan.duration}</div>
                  )}
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(plan.price)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  {formatCurrency(plan.dailyPrice)}
                </div>
                <div className="text-sm text-gray-600">por dia</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-xs text-gray-500 mb-6">
        Concordo com os{" "}
        <a href="#" className="text-primary underline">Termos e Condições</a>,{" "}
        <a href="#" className="text-primary underline">Política de Privacidade</a>,{" "}
        <a href="#" className="text-primary underline">Política de Assinatura</a> e a{" "}
        <a href="#" className="text-primary underline">Política de Reembolso e Cancelamento</a>
      </div>

      <button 
        onClick={handlePurchase}
        className="w-full bg-[#ea749b] text-white py-4 px-8 rounded-full font-semibold text-lg hover:bg-[#d85d87] transition-all duration-200 mb-6"
      >
        OBTER MEU PLANO
      </button>

      <p className="text-xs text-gray-500 text-center">
        Ao clicar em OBTER MEU PLANO, concordo que o plano selecionado será renovado automaticamente até o cancelamento. O BBL Challenge cobrará automaticamente meu método de pagamento {formatCurrency(49.90)} a cada 21 dias. Posso cancelar online visitando a página de assinatura em minha conta no site ou no aplicativo para evitar ser cobrado pelo próximo ciclo de cobrança.
      </p>
    </div>
  );
}
