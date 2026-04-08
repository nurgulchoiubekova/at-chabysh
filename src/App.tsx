import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Volume2, VolumeX, Music, HelpCircle, ArrowLeft } from 'lucide-react';

import StartScreen from './components/StartScreen';
import GameScreen from './components/RaceTrack';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';

import { Player, Question, GameStatus, Difficulty } from './types';
import { QUESTIONS } from './questions';

const COLORS = ['#F59E0B', '#EF4444', '#3B82F6', '#10B981'];
const QUESTION_TIME = 15;
const WINNING_POSITION = 85; // Percent of track

export default function App() {
  const [status, setStatus] = useState<GameStatus>('start');
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('оңой');
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Control background music based on game status and mute state
  useEffect(() => {
    if (!audioRef.current) return;
    
    if (status === 'playing' && !isMuted) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Autoplay blocked. User must interact first.", e);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [status, isMuted]);

  // Sound effects
  const playSound = useCallback((type: 'correct' | 'wrong' | 'win' | 'click') => {
    if (isMuted) return;
    
    const sounds = {
      correct: 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-reward-952.mp3',
      wrong: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3',
      win: 'https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3',
      click: 'https://assets.mixkit.co/sfx/preview/mixkit-simple-click-interface-1111.mp3'
    };

    const audio = new Audio(sounds[type]);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("SFX play failed:", e));
  }, [isMuted]);

  const startNewGame = (names: string[], diff: Difficulty) => {
    // Explicitly play on user interaction
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(e => console.log("Play on click failed:", e));
    }
    
    const initialPlayers = names.map((name, i) => ({
      id: i,
      name,
      position: 0,
      score: 0,
      color: COLORS[i % COLORS.length]
    }));
    setPlayers(initialPlayers);
    setDifficulty(diff);
    setStatus('playing');
    setCurrentPlayerIndex(0);
    nextQuestion(diff);
  };

  const nextQuestion = useCallback((diff: Difficulty) => {
    const filtered = QUESTIONS.filter(q => q.difficulty === diff);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentQuestion(random);
    setTimeLeft(QUESTION_TIME);
    setIsAnswered(false);
    setSelectedOption(null);
  }, []);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered || !currentQuestion) return;
    
    setIsAnswered(true);
    setSelectedOption(optionIndex);
    
    const isCorrect = optionIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      playSound('correct');
      // Update player position and score
      setPlayers(prev => {
        const next = [...prev];
        const p = next[currentPlayerIndex];
        p.score += 10;
        p.position += 15; // Move forward
        
        if (p.position >= WINNING_POSITION) {
          setTimeout(() => {
            setStatus('finished');
            confetti({
              particleCount: 150,
              spread: 70,
              origin: { y: 0.6 }
            });
            playSound('win');
          }, 1000);
        }
        return next;
      });
    } else {
      playSound('wrong');
    }

    // Move to next player after a delay
    setTimeout(() => {
      if (status === 'playing') {
        setCurrentPlayerIndex(prev => (prev + 1) % players.length);
        nextQuestion(difficulty);
      }
    }, 2000);
  };

  // Timer logic
  useEffect(() => {
    if (status === 'playing' && !isAnswered && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleAnswer(-1); // Time out
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, isAnswered, timeLeft, handleAnswer]);

  return (
    <div className="min-h-screen bg-amber-50 font-sans text-gray-900 selection:bg-amber-200">
      {/* Background Pattern (Kyrgyz Ornament Style) */}
      <div className="fixed inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900 via-transparent to-transparent bg-[length:100px_100px]" />
        <div className="absolute bottom-0 left-0 w-full h-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900 via-transparent to-transparent bg-[length:100px_100px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="bg-amber-600 p-2 rounded-xl text-white shadow-md">
            <Music size={20} />
          </div>
          <span className="font-black text-amber-900 tracking-tighter text-xl">АТ ЧАБЫШ</span>
        </div>
        
        <div className="flex items-center gap-3">
          {status !== 'start' && (
            <button 
              onClick={() => setStatus('start')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white shadow-sm hover:shadow-md transition-all text-amber-700 font-bold text-sm"
            >
              <ArrowLeft size={18} />
              <span>АРТКА</span>
            </button>
          )}
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-amber-600"
          >
            <HelpCircle size={24} />
          </button>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all text-amber-600"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <AnimatePresence mode="wait">
          {status === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <StartScreen onStart={startNewGame} />
            </motion.div>
          )}

          {status === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-5xl space-y-8"
            >
              {/* Race Track */}
              <GameScreen players={players} />

              {/* Current Player Indicator */}
              <div className="flex justify-center">
                <div className="bg-white px-6 py-2 rounded-full shadow-md border-2 border-amber-100 flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full animate-pulse" 
                    style={{ backgroundColor: players[currentPlayerIndex]?.color }}
                  />
                  <span className="font-bold text-gray-700">
                    Кезек: <span className="text-amber-900">{players[currentPlayerIndex]?.name}</span>
                  </span>
                </div>
              </div>

              {/* Question Area */}
              {currentQuestion && (
                <QuestionCard
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  timeLeft={timeLeft}
                  isAnswered={isAnswered}
                  selectedOption={selectedOption}
                />
              )}
            </motion.div>
          )}

          {status === 'finished' && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ResultScreen 
                players={players} 
                onRestart={() => setStatus('start')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white p-8 rounded-3xl max-w-md w-full shadow-2xl border-4 border-amber-100"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-black text-amber-900 mb-4">Оюндун эрежеси</h2>
              <ul className="space-y-4 text-gray-700 font-medium">
                <li className="flex gap-3">
                  <span className="bg-amber-100 text-amber-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">1</span>
                  Ар бир оюнчу өз кезегинде суроого жооп берет.
                </li>
                <li className="flex gap-3">
                  <span className="bg-amber-100 text-amber-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">2</span>
                  Туура жооп үчүн ат алдыга жылат жана упай берилет.
                </li>
                <li className="flex gap-3">
                  <span className="bg-amber-100 text-amber-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">3</span>
                  Ката жооп берсеңиз, ат ордунда калат.
                </li>
                <li className="flex gap-3">
                  <span className="bg-amber-100 text-amber-700 w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold">4</span>
                  Марага биринчи жеткен оюнчу жеңүүчү аталат!
                </li>
              </ul>
              <button
                onClick={() => setShowHelp(false)}
                className="w-full mt-8 py-3 bg-amber-500 text-white rounded-xl font-bold shadow-md"
              >
                ТҮШҮНҮКТҮҮ
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Elements */}
      <audio 
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
        hidden
      />

      {/* Footer Decoration */}
      <footer className="p-8 text-center text-amber-900/30 font-bold tracking-widest text-sm uppercase">
        🇰🇬 Ат Чабыш • 2026 🇰🇬
      </footer>
    </div>
  );
}
