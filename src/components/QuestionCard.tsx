import { motion, AnimatePresence } from 'motion/react';
import { Question } from '../types';
import { CheckCircle2, XCircle, Timer } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionIndex: number) => void;
  timeLeft: number;
  isAnswered: boolean;
  selectedOption: number | null;
}

export default function QuestionCard({ 
  question, 
  onAnswer, 
  timeLeft, 
  isAnswered, 
  selectedOption 
}: QuestionCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-8 rounded-3xl shadow-xl border-4 border-amber-100 max-w-2xl w-full mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <span className="bg-amber-100 text-amber-800 px-4 py-1 rounded-full text-sm font-bold">
          {question.topic}
        </span>
        <div className="flex items-center gap-2 text-amber-600 font-mono font-bold text-xl">
          <Timer size={24} />
          <span className={timeLeft <= 5 ? 'text-red-500 animate-pulse' : ''}>
            {timeLeft}с
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-8 leading-relaxed">
        {question.text}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => {
          let buttonClass = "p-4 rounded-2xl border-2 text-left transition-all text-lg font-medium relative overflow-hidden ";
          
          if (isAnswered) {
            if (index === question.correctAnswer) {
              buttonClass += "bg-green-100 border-green-500 text-green-800";
            } else if (index === selectedOption) {
              buttonClass += "bg-red-100 border-red-500 text-red-800";
            } else {
              buttonClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
            }
          } else {
            buttonClass += "bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50 text-gray-700 active:scale-95";
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && onAnswer(index)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 text-sm font-bold shrink-0">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
              
              <AnimatePresence>
                {isAnswered && index === question.correctAnswer && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600"
                  >
                    <CheckCircle2 size={24} />
                  </motion.div>
                )}
                {isAnswered && index === selectedOption && index !== question.correctAnswer && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600"
                  >
                    <XCircle size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
