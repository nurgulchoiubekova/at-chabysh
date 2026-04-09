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
      className="parchment p-10 rounded-[2.5rem] shadow-2xl border-8 border-ethno-gold/30 max-w-3xl w-full mx-auto relative overflow-hidden"
    >
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-0 w-full h-4 kyrgyz-pattern opacity-20" />
      <div className="absolute bottom-0 left-0 w-full h-4 kyrgyz-pattern opacity-20" />

      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex flex-col">
          <span className="text-ethno-red font-black text-xs uppercase tracking-[0.3em] mb-1">
            Тема
          </span>
          <span className="bg-ethno-red text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md">
            {question.topic}
          </span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-ethno-red font-black text-xs uppercase tracking-[0.3em] mb-1">
            Убакыт
          </span>
          <div className="flex items-center gap-2 text-ethno-brown font-black text-3xl">
            <Timer size={28} className="text-ethno-gold" />
            <span className={timeLeft <= 5 ? 'text-ethno-red animate-pulse' : ''}>
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      <div className="ornament-divider mb-8 opacity-40" />

      <h2 className="text-3xl md:text-4xl font-black text-ethno-brown mb-10 leading-tight text-center italic">
        "{question.text}"
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {question.options.map((option, index) => {
          let buttonClass = "p-6 rounded-2xl border-4 text-left transition-all text-xl font-bold relative overflow-hidden shadow-md ";
          
          if (isAnswered) {
            if (index === question.correctAnswer) {
              buttonClass += "bg-green-50 border-green-500 text-green-900";
            } else if (index === selectedOption) {
              buttonClass += "bg-red-50 border-red-500 text-red-900";
            } else {
              buttonClass += "bg-white/50 border-gray-200 text-gray-400 opacity-50";
            }
          } else {
            buttonClass += "bg-white border-ethno-gold/20 hover:border-ethno-gold hover:bg-amber-50 text-ethno-brown active:scale-95";
          }

          return (
            <button
              key={index}
              onClick={() => !isAnswered && onAnswer(index)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-ethno-gold text-white text-lg font-black shrink-0 shadow-lg">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="leading-tight">{option}</span>
              </div>
              
              <AnimatePresence>
                {isAnswered && index === question.correctAnswer && (
                  <motion.div 
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                )}
                {isAnswered && index === selectedOption && index !== question.correctAnswer && (
                  <motion.div 
                    initial={{ scale: 0, rotate: 10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600"
                  >
                    <XCircle size={32} />
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
