import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SuccessStoriesProps {
  onNext: () => void;
  onPrevious: () => void;
}

const testimonials = [
  {
    name: "Ana",
    result: "-8 kg",
    beforeImage: "https://images.unsplash.com/photo-1494790108755-2616c9e035b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
    afterImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
    testimonial: "This helps you track everything you need when you want to help yourself lose weight or maintain it, from water to food and calories and many other things..."
  },
  {
    name: "Maria",
    result: "-12 kg",
    beforeImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
    afterImage: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=600",
    testimonial: "In just 21 days I got incredible results! The program is easy to follow and really works."
  }
];

export default function SuccessStories({ onNext }: SuccessStoriesProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <div className="gradient-bg rounded-2xl p-6 mb-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Over 587 thousand women have already tried the BBL challenge and progressed towards their goals!</h2>
      </div>

      <div className="relative mb-8">
        <div className="flex space-x-4 overflow-hidden">
          <div className="flex-shrink-0 w-full">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <img 
                src={current.beforeImage} 
                alt="Before transformation" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <img 
                src={current.afterImage} 
                alt="After transformation" 
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-center">
                <div className="font-bold text-gray-900 mb-1">
                  {current.name}, {current.result}
                </div>
                <p className="text-sm text-gray-600">
                  {current.testimonial}
                </p>
                <button className="text-primary text-sm font-medium mt-2">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>

        {testimonials.length > 1 && (
          <>
            <button 
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center space-x-2 mb-6">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      <div className="text-xs text-gray-500 text-center mb-6">
        *Warning: Following exercises and a meal plan is key in your fitness journey and greatly impacts results. It's uncommon to lose more than 4 pounds per month. Consult a doctor first. Individual results may vary.
      </div>

      <Button 
        onClick={onNext}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300"
      >
        CONTINUE
      </Button>
    </div>
  );
}
