import { motion } from 'motion/react';
import { Trophy, RotateCcw, Medal } from 'lucide-react';
import { Player } from '../types';

interface ResultScreenProps {
  players: Player[];
  onRestart: () => void;
}

export default function ResultScreen({ players, onRestart }: ResultScreenProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl w-full mx-auto bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-8 border-amber-100 text-center relative overflow-visible"
    >
      {/* Decorative Ornaments */}
      <div className="absolute top-4 left-4 text-amber-200 opacity-20">🇰🇬</div>
      <div className="absolute top-4 right-4 text-amber-200 opacity-20">🇰🇬</div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
        className="inline-block mb-12 relative"
      >
        <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-8 rounded-full text-white shadow-[0_10px_30px_rgba(234,179,8,0.4)] relative z-10">
          <Trophy size={100} />
        </div>
        
        {/* Winner Image - Jockey */}
        <motion.div
          initial={{ x: 50, opacity: 0, rotate: 20 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.8, type: 'spring' }}
          className="absolute -bottom-10 -right-16 z-20"
        >
          <div className="relative">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/15622/15622258.png" 
              alt="Winner Jockey" 
              className="w-40 h-40 drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)]"
              referrerPolicy="no-referrer"
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-4 -left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg"
            >
              №1
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <div className="space-y-4 mb-12">
        <motion.h1 
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="text-6xl font-black text-amber-900 tracking-tighter"
        >
          АЗАМАТСЫҢАР!
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-2xl font-bold text-amber-700">
            Бүгүнкү жарыштын жеңүүчүсү:
          </p>
          <div className="px-8 py-3 bg-amber-900 text-white rounded-2xl text-4xl font-black shadow-xl border-4 border-amber-400 transform -rotate-2">
            {winner.name}
          </div>
        </motion.div>
      </div>

      <div className="space-y-6 mb-12">
        <h2 className="text-2xl font-black text-gray-400 uppercase tracking-widest flex items-center justify-center gap-3">
          <Medal className="text-amber-500" />
          Жалпы жыйынтык
          <Medal className="text-amber-500" />
        </h2>
        
        <div className="grid gap-3">
          {sortedPlayers.map((player, index) => (
            <motion.div 
              key={player.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 + (index * 0.1) }}
              className={`flex items-center justify-between p-5 rounded-3xl transition-all ${
                index === 0 
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 shadow-md scale-105' 
                  : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <div className="flex items-center gap-5">
                <span className={`w-10 h-10 flex items-center justify-center rounded-2xl font-black text-xl ${
                  index === 0 ? 'bg-yellow-400 text-white shadow-inner' : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1}
                </span>
                <span className="font-black text-2xl text-gray-800">{player.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono font-black text-2xl text-amber-700">{player.score}</span>
                <span className="text-xs font-bold text-amber-600/50 uppercase">упай</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8 }}
        onClick={onRestart}
        className="group w-full py-6 bg-amber-600 hover:bg-amber-700 text-white rounded-[2rem] text-3xl font-black shadow-[0_15px_30px_rgba(217,119,6,0.3)] hover:shadow-[0_20px_40px_rgba(217,119,6,0.4)] transition-all active:scale-95 flex items-center justify-center gap-4"
      >
        <RotateCcw size={36} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
        ЖАҢЫ ЖАРЫШ
      </motion.button>
    </motion.div>
  );
}
