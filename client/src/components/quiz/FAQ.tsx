import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQProps {
  onNext: () => void;
  onPrevious: () => void;
}

const faqs = [
  {
    question: "Como este plano pode me ajudar a perder peso?",
    answer: "Seu plano de exercícios BBL Challenge inclui uma variedade de exercícios e rotinas diferentes que podem ajudar você a perder peso e tonificar todo o seu corpo. O treinamento tem como alvo todos os tipos de músculos, incluindo coxas, pernas, bumbum, pernas e braços. Estes não são difíceis de executar, mas certamente podem queimar essas calorias."
  },
  {
    question: "Está tudo bem se eu não for flexível?",
    answer: "Absolutamente! Nossos exercícios são adaptados para todos os níveis de flexibilidade. Começamos com movimentos simples e gradualmente aumentamos a dificuldade conforme você progride."
  },
  {
    question: "Como o plano será entregue?",
    answer: "O plano será entregue através do nosso aplicativo móvel e plataforma web, onde você terá acesso a todos os exercícios, receitas e acompanhamento do progresso."
  }
];

const testimonials = [
  {
    name: "Camila",
    rating: 5,
    text: "Eu tinha minhas dúvidas, mas o aplicativo realmente me ajudou a ser consistente com meus exercícios. Nunca fiz exercícios de parede antes, então não sabia o que esperar. Estou surpresa com o quanto mais tonificada..."
  },
  {
    name: "Fernanda",
    rating: 5,
    text: "Este plano mudou minha vida! Em apenas 3 semanas já estou vendo resultados incríveis. Os exercícios são fáceis de seguir e realmente funcionam."
  }
];

export default function FAQ({ onNext }: FAQProps) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="gradient-bg rounded-2xl p-6 mb-6">
      <Button className="bg-primary text-white font-semibold py-4 px-8 rounded-full mb-6 w-full">
        OBTER MEU PLANO
      </Button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Perguntas frequentes</h2>
      </div>

      <div className="space-y-4 mb-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button 
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left"
            >
              <span className="font-medium text-gray-900">{faq.question}</span>
              {openFAQ === index ? (
                <ChevronUp className="h-5 w-5 text-gray-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600" />
              )}
            </button>
            {openFAQ === index && (
              <div className="mt-3 text-gray-600 text-sm animate-fade-in">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
          Usuários amam nossos planos
        </h3>
        
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card rounded-xl p-6 mb-4">
            <div className="mb-4">
              <h4 className="font-semibold text-gray-900 mb-2">{testimonial.name}</h4>
              <div className="flex text-yellow-400 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-gray-600 text-sm">
              {testimonial.text}
            </p>
            <button className="text-primary text-sm font-medium mt-2">
              mais
            </button>
          </div>
        ))}
      </div>

      <Button 
        onClick={onNext}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300"
      >
        CONTINUE
      </Button>
    </div>
  );
}
