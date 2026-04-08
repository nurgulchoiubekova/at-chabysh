import { motion } from 'motion/react';
import { Player } from '../types';

interface RaceTrackProps {
  players: Player[];
}

const HorseIcon = ({ color }: { color: string }) => (
  <div className="relative">
    {/* Colored Glow Background */}
    <div 
      className="absolute inset-0 rounded-full blur-xl opacity-30 animate-pulse"
      style={{ backgroundColor: color }}
    />
    <img 
      src="https://cdn-icons-png.flaticon.com/512/15622/15622258.png" 
      alt="Horse Rider" 
      className="w-24 h-24 object-contain relative z-10"
      style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
      referrerPolicy="no-referrer"
    />
    {/* Indicator arrow to show player color */}
    <div 
      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] z-20"
      style={{ borderTopColor: color }}
    />
  </div>
);

export default function RaceTrack({ players }: RaceTrackProps) {
  return (
    <div className="w-full bg-amber-50 p-6 rounded-3xl border-4 border-amber-200 shadow-inner relative overflow-hidden">
      {/* Track Lines */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-10 pointer-events-none">
        {[...Array(players.length)].map((_, i) => (
          <div key={i} className="h-px bg-amber-900 w-full border-t-2 border-dashed border-amber-900" />
        ))}
      </div>

      {/* Finish Line */}
      <div className="absolute right-12 top-0 bottom-0 w-4 border-l-4 border-r-4 border-white flex flex-col justify-around bg-black/10">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`h-4 w-full ${i % 2 === 0 ? 'bg-black' : 'bg-white'}`} />
        ))}
      </div>

      <div className="space-y-12 relative">
        {players.map((player) => (
          <div key={player.id} className="relative h-16 flex items-center">
            {/* Player Name */}
            <div 
              className="absolute -top-6 left-0 text-sm font-black bg-white/90 px-3 py-0.5 rounded-full border-2 shadow-sm z-30"
              style={{ color: player.color, borderColor: player.color + '44' }}
            >
              {player.name}
            </div>
            
            {/* Horse Container */}
            <motion.div
              className="absolute flex items-center"
              initial={{ left: '0%' }}
              animate={{ left: `${player.position}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 15 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                >
                  <HorseIcon color={player.color} />
                </motion.div>
                
                {/* Dust effect when moving */}
                {player.position > 0 && (
                  <motion.div
                    className="absolute -left-4 bottom-0 w-4 h-4 bg-amber-200 rounded-full opacity-50"
                    animate={{ scale: [1, 2], opacity: [0.5, 0], x: [-10, -20] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                  />
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
