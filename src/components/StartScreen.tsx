import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Users, Settings2 } from 'lucide-react';
import { Difficulty } from '../types';

interface StartScreenProps {
  onStart: (playerNames: string[], difficulty: Difficulty) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [names, setNames] = useState(['Оюнчу 1', 'Оюнчу 2', 'Оюнчу 3', 'Оюнчу 4']);
  const [difficulty, setDifficulty] = useState<Difficulty>('оңой');

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  return (
    <div className="max-w-xl w-full mx-auto bg-white p-8 rounded-3xl shadow-2xl border-4 border-amber-100">
      <div className="text-center mb-10">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-block mb-4"
        >
          <div className="bg-amber-500 p-4 rounded-full text-white shadow-lg">
            <Play size={48} fill="currentColor" />
          </div>
        </motion.div>
        <h1 className="text-4xl font-black text-amber-900 mb-2">АТ ЧАБЫШ</h1>
        <p className="text-amber-700 font-medium">Кыргыз тили оюну</p>
      </div>

      <div className="space-y-8">
        {/* Player Count */}
        <div>
          <label className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4">
            <Users size={20} className="text-amber-600" />
            Оюнчулардын саны
          </label>
          <div className="flex gap-4">
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => setPlayerCount(num)}
                className={`flex-1 py-3 rounded-2xl font-bold transition-all ${
                  playerCount === num 
                    ? 'bg-amber-500 text-white shadow-md scale-105' 
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Player Names */}
        <div className="space-y-4">
          <label className="block text-lg font-bold text-gray-700">Аттарыңызды жазыңыз</label>
          <div className="grid grid-cols-1 gap-3">
            {[...Array(playerCount)].map((_, i) => (
              <input
                key={i}
                type="text"
                value={names[i]}
                onChange={(e) => handleNameChange(i, e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-amber-100 focus:border-amber-400 focus:ring-0 outline-none transition-all font-medium"
                placeholder={`Оюнчу ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label className="flex items-center gap-2 text-lg font-bold text-gray-700 mb-4">
            <Settings2 size={20} className="text-amber-600" />
            Кыйынчылык деңгээли
          </label>
          <div className="flex gap-4">
            {(['оңой', 'орто', 'татаал'] as Difficulty[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`flex-1 py-3 rounded-2xl font-bold transition-all capitalize ${
                  difficulty === d 
                    ? 'bg-amber-500 text-white shadow-md scale-105' 
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onStart(names.slice(0, playerCount), difficulty)}
          className="w-full py-5 bg-green-500 hover:bg-green-600 text-white rounded-2xl text-2xl font-black shadow-lg hover:shadow-xl transition-all active:scale-95 mt-4"
        >
          ОЮНДУ БАШТОО
        </button>
      </div>
    </div>
  );
}
