import { Check } from "lucide-react";
import type { QuizData } from "@/pages/quiz";

interface MoneyBackGuaranteeProps {
  data: Partial<QuizData>;
}

export default function MoneyBackGuarantee({ data }: MoneyBackGuaranteeProps) {
  return (
    <div className="gradient-bg rounded-2xl p-6 mb-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          30-day money back guarantee
        </h2>
        
        <p className="text-gray-600 mb-6">
          We believe our plan can work for you and you will have visible results in 21 days! We are even ready to refund your money if you don't see visible results and can demonstrate that you followed our plan.
        </p>
        
        <p className="text-sm text-gray-500">
          Learn more about applicable limitations in our{" "}
          <a href="#" className="text-primary underline">money back policy</a>.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6">
        <p className="text-xs text-gray-500 text-center">
          BBL Challenge Brasil Ltda | CNPJ No. 12.345.678/0001-90, "Centro Empresarial", Avenida Paulista, 1000, 10º andar, São Paulo, SP, 01310-100, Brasil
        </p>
      </div>

      <div className="flex justify-center space-x-6 text-sm text-gray-500">
        <a href="#" className="hover:text-primary">Privacidade</a>
        <a href="#" className="hover:text-primary">Termos</a>
      </div>

      <div className="mt-8 text-center">
        <p className="text-lg font-semibold text-gray-900 mb-2">
          Obrigado, {data.name}!
        </p>
        <p className="text-gray-600">
          Seu plano personalizado foi criado com sucesso. Prepare-se para sua transformação!
        </p>
      </div>
    </div>
  );
}
