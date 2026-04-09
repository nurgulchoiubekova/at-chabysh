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
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="max-w-3xl w-full mx-auto bg-white rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] border-[12px] border-ethno-gold/30 text-center relative overflow-hidden parchment"
    >
      {/* Animated Background Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-64 h-64 kyrgyz-pattern opacity-10 rounded-full"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-64 h-64 kyrgyz-pattern opacity-10 rounded-full"
        />
      </div>

      <div className="relative z-10 p-10 md:p-16">
        {/* Celebration Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
          className="inline-block mb-10 relative"
        >
          {/* Sun-like Glow */}
          <div className="absolute inset-0 bg-ethno-gold blur-3xl opacity-40 animate-pulse" />
          
          <div className="bg-gradient-to-br from-ethno-gold to-amber-600 p-10 rounded-full text-white shadow-2xl relative z-10 border-4 border-white/40">
            <Trophy size={120} />
          </div>
          
          {/* Floating Medals/Stars */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-ethno-gold"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0, 1.5, 0],
                x: Math.cos(i * 60 * Math.PI / 180) * 120,
                y: Math.sin(i * 60 * Math.PI / 180) * 120
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeOut"
              }}
            >
              <Medal size={32} />
            </motion.div>
          ))}
        </motion.div>

        <div className="space-y-6 mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
          >
            <h1 className="text-6xl md:text-7xl font-black text-ethno-red tracking-tighter mb-2 italic">
              КУТТУКТАЙБЫЗ!
            </h1>
            <div className="ornament-divider w-64 mx-auto opacity-60" />
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-2xl font-bold text-ethno-brown/70 uppercase tracking-[0.3em]">
              ЖЕҢҮҮЧҮ ТАЙПА:
            </p>
            <div className="relative group">
              <div className="absolute inset-0 bg-ethno-red blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="px-12 py-5 bg-ethno-red text-white rounded-[2rem] text-5xl font-black shadow-2xl border-4 border-ethno-gold relative z-10 transform -rotate-1 hover:rotate-0 transition-transform">
                {winner.name}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6 mb-12 bg-white/50 p-8 rounded-[2.5rem] border-2 border-ethno-gold/10">
          <h2 className="text-xl font-black text-ethno-gold uppercase tracking-[0.4em] flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-ethno-gold/30" />
            Жыйынтыктар
            <div className="h-px w-12 bg-ethno-gold/30" />
          </h2>
          
          <div className="grid gap-4">
            {sortedPlayers.map((player, index) => (
              <motion.div 
                key={player.id}
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2 + (index * 0.1) }}
                className={`flex items-center justify-between p-6 rounded-2xl transition-all ${
                  index === 0 
                    ? 'bg-ethno-gold/10 border-2 border-ethno-gold/30 shadow-lg scale-105' 
                    : 'bg-white/80 border border-ethno-cream shadow-sm'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className={`w-12 h-12 flex items-center justify-center rounded-xl font-black text-2xl ${
                    index === 0 ? 'bg-ethno-gold text-white shadow-lg' : 'bg-ethno-cream text-ethno-brown'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="font-black text-2xl text-ethno-brown">{player.name}</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-black text-3xl text-ethno-red leading-none">{player.score}</span>
                  <span className="text-[10px] font-black text-ethno-gold uppercase tracking-widest">упай</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="group w-full py-6 bg-ethno-brown hover:bg-black text-white rounded-[2rem] text-2xl font-black shadow-2xl transition-all flex items-center justify-center gap-4 border-b-8 border-black/20"
        >
          <RotateCcw size={32} className="group-hover:rotate-[-180deg] transition-transform duration-700" />
          ЖАҢЫ ЖАРЫШТЫ БАШТОО
        </motion.button>
      </div>
    </motion.div>
  );
}
