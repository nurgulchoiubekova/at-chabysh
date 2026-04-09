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
    
    if (!isMuted && status === 'playing') {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log("Autoplay blocked. Waiting for interaction.", e);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isMuted, status]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      if (!newMuted && status === 'playing') {
        audioRef.current.play().catch(e => console.log("Manual play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  };

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
    audio.volume = 0.4;
    audio.play().catch(e => console.log("SFX play failed:", e));
  }, [isMuted]);

  const startNewGame = (names: string[], diff: Difficulty) => {
    // Ensure music is playing
    if (audioRef.current && !isMuted) {
      audioRef.current.play().catch(e => console.log("Start game play failed:", e));
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
    <div className="min-h-screen bg-ethno-cream font-sans text-ethno-brown selection:bg-ethno-gold/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none kyrgyz-pattern" />
      
      {/* Decorative Corners */}
      <div className="fixed top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-ethno-gold/20 rounded-tl-[3rem] pointer-events-none" />
      <div className="fixed top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-ethno-gold/20 rounded-tr-[3rem] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-b-8 border-l-8 border-ethno-gold/20 rounded-bl-[3rem] pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-ethno-gold/20 rounded-br-[3rem] pointer-events-none" />

      {/* Header */}
      <header className="relative z-20 p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="bg-ethno-red p-3 rounded-2xl text-white shadow-xl border-2 border-white/20">
            <Music size={24} />
          </div>
          <div>
            <h1 className="font-black text-ethno-red tracking-tighter text-3xl leading-none">АТ ЧАБЫШ</h1>
            <p className="text-[10px] font-bold text-ethno-gold uppercase tracking-[0.2em]">Кыргыз адабияты боюнча интеллектуалдык жарыш</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {status !== 'start' && (
            <button 
              onClick={() => setStatus('start')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all text-ethno-red font-black text-sm border-2 border-ethno-cream"
            >
              <ArrowLeft size={20} />
              <span>АРТКА</span>
            </button>
          )}
          <button 
            onClick={() => setShowHelp(!showHelp)}
            className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all text-ethno-gold border-2 border-ethno-cream"
          >
            <HelpCircle size={28} />
          </button>
          <button 
            onClick={toggleMute}
            className="p-3 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all text-ethno-red border-2 border-ethno-cream"
          >
            {isMuted ? <VolumeX size={28} /> : <Volume2 size={28} />}
          </button>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <AnimatePresence mode="wait">
          {status === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex justify-center"
            >
              <StartScreen 
                onStart={startNewGame} 
              />
            </motion.div>
          )}

          {status === 'playing' && (
            <motion.div
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full max-w-6xl space-y-12"
            >
              {/* Race Track */}
              <GameScreen players={players} />

              {/* Current Player Indicator */}
              <div className="flex justify-center">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="bg-white px-10 py-4 rounded-[2rem] shadow-2xl border-4 border-ethno-gold/20 flex items-center gap-6"
                >
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-full animate-ping absolute inset-0 opacity-40" 
                      style={{ backgroundColor: players[currentPlayerIndex]?.color }}
                    />
                    <div 
                      className="w-8 h-8 rounded-full relative z-10 border-4 border-white shadow-inner" 
                      style={{ backgroundColor: players[currentPlayerIndex]?.color }}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-ethno-gold uppercase tracking-widest">Кезектеги тайпа</span>
                    <span className="text-2xl font-black text-ethno-brown">
                      {players[currentPlayerIndex]?.name}
                    </span>
                  </div>
                </motion.div>
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex justify-center"
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
        src="https://cdn.pixabay.com/audio/2022/01/18/audio_d0a13f69d2.mp3"
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
