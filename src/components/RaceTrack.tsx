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
    <div className="w-full bg-[#3D5A3D] p-8 rounded-[2rem] border-8 border-ethno-gold/30 shadow-2xl relative overflow-hidden min-h-[400px] flex flex-col justify-center">
      {/* Grass Texture Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/grass.png")' }} />
      
      {/* Track Lines */}
      <div className="absolute inset-0 flex flex-col justify-around opacity-20 pointer-events-none py-12">
        {[...Array(players.length)].map((_, i) => (
          <div key={i} className="h-1 bg-white/30 w-full border-t-4 border-dashed border-white/20" />
        ))}
      </div>

      {/* Finish Line Area */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-ethno-gold/20 to-transparent flex items-center justify-end pr-8">
        <div className="h-full w-6 border-l-4 border-r-4 border-white flex flex-col justify-around bg-black/20">
          {[...Array(24)].map((_, i) => (
            <div key={i} className={`h-4 w-full ${i % 2 === 0 ? 'bg-ethno-red' : 'bg-white'}`} />
          ))}
        </div>
      </div>

      <div className="space-y-16 relative z-10">
        {players.map((player) => (
          <div key={player.id} className="relative h-20 flex items-center">
            {/* Player Name Tag */}
            <div 
              className="absolute -top-8 left-0 text-xs font-black bg-white px-3 py-1 rounded-lg shadow-lg z-30 flex items-center gap-2 border-b-4"
              style={{ borderBottomColor: player.color }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: player.color }} />
              <span className="text-ethno-brown uppercase tracking-wider">{player.name}</span>
            </div>
            
            {/* Horse Container */}
            <motion.div
              className="absolute flex items-center"
              initial={{ left: '0%' }}
              animate={{ left: `${player.position}%` }}
              transition={{ type: 'spring', stiffness: 40, damping: 12 }}
            >
              <div className="relative">
                <motion.div
                  animate={{ 
                    rotate: [0, -8, 8, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ repeat: Infinity, duration: 0.4 }}
                >
                  <HorseIcon color={player.color} />
                </motion.div>
                
                {/* Dust effect when moving */}
                {player.position > 0 && (
                  <div className="absolute -left-6 bottom-2 flex gap-1">
                    {[1, 2, 3].map(i => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-amber-100/40 rounded-full"
                        animate={{ 
                          scale: [1, 2.5], 
                          opacity: [0.6, 0], 
                          x: [-10, -40],
                          y: [0, -10]
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.6, 
                          delay: i * 0.2 
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
