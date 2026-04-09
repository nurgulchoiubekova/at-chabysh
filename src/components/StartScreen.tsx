import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Users, Settings2, Volume2, VolumeX } from 'lucide-react';
import { Difficulty } from '../types';

interface StartScreenProps {
  onStart: (playerNames: string[], difficulty: Difficulty) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState(['Тайпа 1', 'Тайпа 2', 'Тайпа 3', 'Тайпа 4']);
  const [difficulty, setDifficulty] = useState<Difficulty>('оңой');

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  return (
    <div className="max-w-5xl w-full mx-auto bg-white rounded-[2.5rem] shadow-2xl border-8 border-ethno-gold/20 overflow-hidden flex flex-col md:flex-row">
      {/* Left Side: Hero/Title */}
      <div className="md:w-2/5 bg-ethno-red p-12 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 kyrgyz-pattern" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -15, 0] }}
          transition={{ 
            scale: { duration: 0.5 },
            opacity: { duration: 0.5 },
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
          }}
          className="relative z-10 mb-6 w-full max-w-[320px]"
        >
          <img 
            src="https://img.freepik.com/premium-vector/jockey-with-horse-are-doing-exercise-race-track_7496-49.jpg" 
            alt="Horse Racing" 
            className="w-full h-auto rounded-3xl border-4 border-ethno-gold/30 shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter relative z-10">
          АТ <br /> ЧАБЫШ
        </h1>
        <div className="w-24 h-1 bg-ethno-gold mb-6 relative z-10" />
        <p className="text-xl font-medium text-amber-100/80 italic relative z-10">
          Кыргыз адабияты боюнча интеллектуалдык жарыш
        </p>
      </div>

      {/* Right Side: Settings */}
      <div className="md:w-3/5 p-10 md:p-16 bg-white relative">
        <div className="space-y-10">
          {/* Player Count */}
          <section>
            <label className="flex items-center gap-3 text-xl font-extrabold text-ethno-brown mb-6">
              <Users size={24} className="text-ethno-gold" />
              Тайпалардын саны
            </label>
            <div className="flex gap-4">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setPlayerCount(num)}
                  className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    playerCount === num 
                      ? 'bg-ethno-red text-white shadow-xl -translate-y-1' 
                      : 'bg-ethno-cream text-ethno-brown hover:bg-amber-100'
                  }`}
                >
                  {num} тайпа
                </button>
              ))}
            </div>
          </section>

          {/* Player Names */}
          <section>
            <label className="block text-xl font-extrabold text-ethno-brown mb-6">Тайпалардын аттарын жазыңыз</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(playerCount)].map((_, i) => (
                <div key={i} className="relative">
                  <input
                    type="text"
                    value={names[i]}
                    onChange={(e) => handleNameChange(i, e.target.value)}
                    className="w-full p-5 pl-12 rounded-2xl border-2 border-ethno-cream bg-ethno-cream/30 focus:bg-white focus:border-ethno-gold focus:ring-0 outline-none transition-all font-bold text-ethno-brown"
                    placeholder={`Тайпа ${i + 1}`}
                  />
                  <div 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                    style={{ backgroundColor: ['#F59E0B', '#EF4444', '#3B82F6', '#10B981'][i] }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Difficulty */}
          <section>
            <label className="flex items-center gap-3 text-xl font-extrabold text-ethno-brown mb-6">
              <Settings2 size={24} className="text-ethno-gold" />
              Кыйынчылык деңгээли
            </label>
            <div className="flex gap-4">
              {(['оңой', 'орто', 'татаал'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`flex-1 py-4 rounded-2xl font-bold text-lg transition-all duration-300 capitalize ${
                    difficulty === d 
                      ? 'bg-ethno-gold text-white shadow-xl -translate-y-1' 
                      : 'bg-ethno-cream text-ethno-brown hover:bg-amber-100'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </section>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStart(names.slice(0, playerCount), difficulty)}
            className="w-full py-6 bg-ethno-red hover:bg-red-800 text-white rounded-2xl text-2xl font-black shadow-2xl transition-all mt-6 flex items-center justify-center gap-4"
          >
            ЖАРЫШТЫ БАШТОО
            <Play size={28} fill="currentColor" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
