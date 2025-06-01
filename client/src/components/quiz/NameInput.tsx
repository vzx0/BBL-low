import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { QuizData } from "@/pages/quiz";

interface NameInputProps {
  onNext: () => void;
  onPrevious: () => void;
  onUpdate: (data: Partial<QuizData>) => void;
  data: Partial<QuizData>;
}

export default function NameInput({ onNext, onPrevious, onUpdate, data }: NameInputProps) {
  const [name, setName] = useState(data.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onUpdate({ name: name.trim() });
      onNext();
    }
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            What is your name?
          </h1>
          <p className="text-gray-600 text-lg">
            We want to personalize your experience even more
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:ring-2 focus:ring-[#ea749b] focus:border-[#ea749b] text-gray-900 placeholder-gray-400"
              required
            />
          </div>
        </form>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto">
          <button 
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="w-full bg-[#ea749b] hover:bg-[#e85a8a] text-white font-bold py-4 px-8 rounded-3xl text-base disabled:opacity-50 transition-all duration-200"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
}