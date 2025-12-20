import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { decodeWish } from '../utils';
import { WishData } from '../types';
import AnimationCanvas from '../components/AnimationCanvas';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Volume2, RefreshCw, PenTool, Heart } from 'lucide-react';

const Reveal = () => {
  const location = useLocation();
  const [data, setData] = useState<WishData | null>(null);
  const [stage, setStage] = useState<'LOCKED' | 'PLAYING' | 'FINISHED'>('LOCKED');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hash = params.get('d');
    if (hash) {
      const decoded = decodeWish(hash);
      if (decoded) setData(decoded);
    }
  }, [location]);

  if (!data) {
    return (
        <div className="h-screen bg-black flex flex-col items-center justify-center text-zinc-500 font-mono">
            <Lock size={48} className="mb-4 text-zinc-800" />
            <p>ACCESS DENIED: MEMORY NOT FOUND</p>
        </div>
    );
  }

  const handleOpen = () => {
    setStage('PLAYING');
  };

  const handleComplete = () => {
    setTimeout(() => {
        setStage('FINISHED');
    }, 1500);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-black font-['Inter']">
      
      {/* Top Header - Always visible in Locked */}
      <AnimatePresence>
        {stage === 'LOCKED' && (
            <motion.div 
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-50"
            >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur text-xs font-mono text-zinc-300 tracking-wider">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                    HEART-LINK SECURE
                </div>
                <div className="w-10 h-10 rounded-full bg-zinc-900/80 border border-white/10 flex items-center justify-center text-zinc-400">
                    <Volume2 size={16} />
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 1: LOCKED (The Wish Awaits) */}
      <AnimatePresence>
        {stage === 'LOCKED' && (
            <motion.div 
                exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20 cursor-pointer"
                onClick={handleOpen}
            >
                {/* Central Heart Lock */}
                <div className="relative mb-12 group">
                    {/* Ripple Effects */}
                    <div className="absolute inset-0 rounded-full border border-white/5 animate-ping" style={{ animationDuration: '3s' }}></div>
                    <div className="absolute inset-[-20px] rounded-full border border-white/5 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                    
                    {/* Circle Container */}
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-b from-zinc-800 to-black border border-zinc-800 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.05)] group-hover:scale-105 transition-transform duration-500">
                        <Heart size={40} fill="white" className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
                        
                        {/* Status Dot */}
                        <div className="absolute bottom-8 right-8 w-2 h-2 bg-[#10b981] rounded-full shadow-[0_0_5px_#10b981]"></div>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded bg-[#10b981]/10 text-[#10b981] text-[10px] font-mono tracking-widest uppercase">
                    <Lock size={10} /> Touch to Unlock
                </div>

                <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
                    A WISH AWAITS
                </h1>
                
                <div className="flex items-center gap-2 text-red-500 text-xs font-mono tracking-[0.2em] uppercase">
                    <span className="w-1 h-1 rounded-full bg-red-500"></span>
                    Encrypted with Emotion
                    <span className="w-1 h-1 rounded-full bg-red-500"></span>
                </div>
                
                {/* Footer Info */}
                <div className="absolute bottom-8 left-0 w-full px-8 flex justify-between text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        System Online
                    </div>
                    <div>Ver 2.0.4</div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* STAGE 2: PLAYING (Animation) */}
      <AnimationCanvas 
        data={data} 
        isPlaying={stage === 'PLAYING' || stage === 'FINISHED'} 
        onComplete={handleComplete} 
      />

      {/* STAGE 3: AFTERCARE (Buttons) */}
      <AnimatePresence>
        {stage === 'FINISHED' && (
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute bottom-0 left-0 w-full z-[60] p-8 flex flex-col items-center gap-6 pointer-events-auto bg-gradient-to-t from-black via-black/80 to-transparent"
            >
                <div className="flex flex-col items-center">
                    <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest mb-4">Transmission Received</p>
                    
                    <div className="flex gap-4">
                        <button 
                            onClick={() => setStage('PLAYING')}
                            className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            title="Replay Memory"
                        >
                            <RefreshCw size={20} />
                        </button>
                        
                        <Link to="/create">
                            <button 
                                className="h-12 px-8 rounded-full bg-white text-black font-bold font-['Space_Grotesk'] hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                            >
                                <PenTool size={16} /> Send One Back
                            </button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Reveal;