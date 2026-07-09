import React from 'react';
import { motion } from 'motion/react';

interface EnvelopeProps {
  onOpen: () => void;
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  return (
    <div className="min-h-screen w-full bg-[#0c0a09] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[600px] bg-gold-900/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Decorative floral gold symbols drifting around */}
      <div className="absolute top-20 left-1/4 text-gold-500/10 text-6xl font-display pointer-events-none sparkle">†</div>
      <div className="absolute bottom-20 right-1/4 text-gold-500/10 text-5xl font-display pointer-events-none sparkle" style={{ animationDelay: '2s' }}>†</div>
      
      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center max-w-2xl w-full text-center z-10"
      >
        {/* Divine Symbol */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 text-gold-400/80"
        >
          <svg className="w-16 h-16 mx-auto drop-shadow-[0_0_15px_rgba(179,143,77,0.3)]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 50 10 L 50 90 M 25 35 L 75 35" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="50" cy="35" r="15" strokeDasharray="2 4" className="animate-[spin_20s_linear_infinite]" />
            <path d="M 50 10 Q 65 25 50 40 Q 35 25 50 10" fill="currentColor" fillOpacity="0.1" />
          </svg>
        </motion.div>

        {/* Outer text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <h1 className="font-display text-[10px] md:text-xs uppercase tracking-[0.4em] text-gold-300 mb-4 opacity-80 font-medium">
            First of comminunion of 
          </h1>
          <h2 className="font-cursive text-5xl md:text-6xl lg:text-7xl text-gold-100 mb-12 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Ayaan Franchesco
          </h2>
        </motion.div>

        {/* The Envelope - Ultra Premium */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-lg aspect-[4/2.8] bg-[#fbf9f6] rounded-sm shadow-[0_40px_80px_-20px_rgba(0,0,0,1)] flex items-center justify-center p-3"
        >
          {/* Subtle paper texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

          {/* Envelope Flap Lines (CSS created shapes for realism) */}
          <div className="absolute top-0 left-0 w-full h-full border-[1.5px] border-gold-200/40 rounded-sm pointer-events-none overflow-hidden">
             {/* Top flap */}
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-[60%] border-b border-gold-300/30 bg-gradient-to-b from-[#fbf9f6] to-[#f4f0e6] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.15)] origin-top z-10" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
             {/* Bottom flap */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-[55%] border-t border-gold-200/20 bg-[#f9f7f2]" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
             {/* Side flaps */}
             <div className="absolute top-0 left-0 w-[55%] h-full bg-[#f6f4ee]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
             <div className="absolute top-0 right-0 w-[55%] h-full bg-[#f6f4ee]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
          </div>

          {/* Golden Corner Accents on the envelope */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t border-l border-gold-400/40 opacity-70 z-10" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t border-r border-gold-400/40 opacity-70 z-10" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b border-l border-gold-400/40 opacity-70 z-10" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b border-r border-gold-400/40 opacity-70 z-10" />

          {/* Text on envelope */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
            <span className="font-display text-[11px] md:text-xs uppercase tracking-[0.5em] text-stone-500/80 font-bold">
              Invitation
            </span>
          </div>

          {/* Wax Seal / Open Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="absolute z-30 w-20 h-20 rounded-full bg-gold-gradient border border-gold-300/50 flex items-center justify-center cursor-pointer shadow-[0_10px_30px_-5px_rgba(158,120,60,0.6),inset_0_2px_5px_rgba(255,255,255,0.4)] group overflow-hidden"
          >
            {/* Shimmer overlay */}
            <div className="absolute top-0 left-[-150%] w-[150%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-[100%]" />
            
            {/* Inner seal ring */}
            <div className="w-[85%] h-[85%] rounded-full border border-gold-200/30 flex items-center justify-center bg-gradient-to-br from-gold-600 to-gold-800 shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)]">
              {/* Cross inside seal */}
              <div className="text-gold-100 text-center flex flex-col items-center justify-center font-serif">
                <svg className="w-8 h-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M 46 15 L 54 15 L 54 38 L 76 38 L 76 46 L 54 46 L 54 85 L 46 85 L 46 46 L 24 46 L 24 38 L 46 38 Z" />
                </svg>
                <span className="text-[6px] uppercase tracking-[0.2em] mt-1 font-sans font-medium drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)] opacity-80">OPEN</span>
              </div>
            </div>
          </motion.button>
        </motion.div>

        {/* Call to action text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12 font-serif text-gold-200/60 text-sm tracking-widest uppercase animate-pulse"
        >
          Break the seal to view invitation
        </motion.p>
      </motion.div>
    </div>
  );
}
