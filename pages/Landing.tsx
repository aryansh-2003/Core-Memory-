import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import anime from 'animejs';
import { ArrowRight, Sparkles, Heart, Zap, Binary, Activity, Share2, Music, BarChart3 } from 'lucide-react';
import { VibeType } from '../types';
import { lazy } from 'react';

const Hyperspeed = lazy(() => import('../components/Hyperspeed'))


// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Landing = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Hero Text Glitch/Float Animation
    anime({
      targets: '.hero-char',
      translateY: [20, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1200,
      delay: (el, i) => 30 * i
    });
  }, []);

  return (
    <div className="min-h-screen w-full relative bg-[#050505] text-white overflow-x-hidden selection:bg-pink-500/30">
           
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 origin-left z-50"
        style={{ scaleX }}
      />

      

      {/* --- ENHANCED BACKGROUND FLARES & ATMOSPHERE --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* 1. Base Grid Floor */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
         
         {/* 2. Top Center "Sun" Glow (Warm Pink) */}
         <motion.div 
            animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.1, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-pink-600/30 via-purple-900/10 to-transparent rounded-full blur-[120px] mix-blend-screen" 
         />

                
         {/* 3. Left Side Ambient Flare (Cool Blue/Purple) */}
         <motion.div 
            animate={{ x: [-20, 20, -20], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] mix-blend-screen"
         />

         {/* 4. Right Side Accent Flare (Hot Magenta) */}
         <motion.div 
            animate={{ x: [20, -20, 20], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[120px] mix-blend-screen"
         />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-32 flex flex-col items-center">

      
        
        {/* --- HERO SECTION --- */}
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-[10px] font-mono tracking-widest text-pink-400 uppercase backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.2)]"
        >
            
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span>Surprise Wish v2.0 Live</span>
        </motion.div>
        

        <h1 className="text-center font-['Space_Grotesk'] font-bold leading-[0.85] tracking-tighter mb-8 perspective-1000 relative">
            {/* Backglow for Text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/5 blur-3xl rounded-full -z-10"></div>
            
            <span className="block text-4xl md:text-7xl text-white/40 mb-2 hero-char italic transform skew-x-[-10deg]">TRANSMIT</span>
            <div className="relative inline-block">
                <span className="block text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    DIGITAL
                </span>
                {/* Text Glitch Effect Layer */}
                <span className="absolute inset-0 text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 blur-sm opacity-50 animate-pulse">
                    DIGITAL
                </span>
            </div>
            <span className="block text-6xl md:text-9xl text-pink-500 italic mix-blend-lighten drop-shadow-[0_0_35px_rgba(236,72,153,0.6)]">
                AFFECTION.
            </span>
        </h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-center text-zinc-400 max-w-xl text-lg md:text-xl leading-relaxed mb-12 font-light"
        >
            High-fidelity, ethereal greeting cards for the internet age. <br className="hidden md:block"/>
            Weave a feeling that echoes forever in the cyber-void.
        </motion.p>
        
        

        <Link to="/create">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-10 py-5 bg-gradient-to-r from-[#FF0F7B] to-[#F89B29] text-white font-bold rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,15,123,0.4)]"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <span className="relative z-10 flex items-center gap-2 font-['Space_Grotesk'] text-lg tracking-wide">
                    Craft a Digital Love Note <Heart size={18} fill="currentColor" className="animate-pulse" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
            </motion.button>
        </Link>
    

        {/* --- TRENDING AESTHETICS --- */}
        
        <motion.div 
            initial="visible"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-40 w-full max-w-6xl"
        >
             
            <div className="flex items-center justify-between mb-10 px-2">
                <div className="flex items-center gap-3">
                    <Sparkles size={20} className="text-pink-500" />
                    <h3 className="font-['Space_Grotesk'] font-bold text-2xl tracking-tight">Trending Aesthetics</h3>
                </div>
                <motion.a 
                    href="#" 
                    whileHover={{ x: 5 }}
                    className="text-xs font-bold text-pink-500 flex items-center gap-1 uppercase tracking-wider"
                >
                    View All <ArrowRight size={14} />
                </motion.a>
            </div>

            <div loading="lazy" className="w-screen h-screen absolute left-0 right-0 -z-10">
                 <Hyperspeed
                      effectOptions={{
                          onSpeedUp: () => { },
                          onSlowDown: () => { },
                          distortion: 'turbulentDistortion',
                          length: 400,
                          roadWidth: 10,
                          islandWidth: 2,
                          lanesPerRoad: 4,
                          fov: 90,
                          fovSpeedUp: 150,
                          speedUp: 2,
                          carLightsFade: 0.4,
                          totalSideLightSticks: 20,
                          lightPairsPerRoadWay: 40,
                          shoulderLinesWidthPercentage: 0.05,
                          brokenLinesWidthPercentage: 0.1,
                          brokenLinesLengthPercentage: 0.5,
                          lightStickWidth: [0.12, 0.5],
                          lightStickHeight: [1.3, 1.7],
                          movingAwaySpeed: [60, 80],
                          movingCloserSpeed: [-120, -160],
                          carLightsLength: [400 * 0.03, 400 * 0.2],
                          carLightsRadius: [0.05, 0.14],
                          carWidthPercentage: [0.3, 0.5],
                          carShiftX: [-0.8, 0.8],
                          carFloorSeparation: [0, 5],
                          colors: {
                          roadColor: 0x080808,
                          islandColor: 0x0a0a0a,
                          background: 0x000000,
                          shoulderLines: 0xFFFFFF,
                          brokenLines: 0xFFFFFF,
                          leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                          rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
                          sticks: 0x03B3C3,
                          }
                      }}
                      /></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* CARD 1: LOVE GLITCH (Swirly/Hypnotic Look) */}
                <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="group cursor-pointer">
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 transition-colors group-hover:border-pink-500/30">
                        {/* CSS-generated Hypnotic Swirl Background */}
                        <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                             <div className="absolute inset-0 bg-[conic-gradient(at_center,var(--tw-gradient-stops))] from-indigo-500 via-purple-500 to-pink-500 blur-xl opacity-50 animate-spin-slow" style={{ animationDuration: '10s' }}></div>
                             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,#000_120%)]"></div>
                             {/* Spiral Lines simulation */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] border-[40px] border-pink-500/20 rounded-full blur-md"></div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border-[30px] border-blue-500/20 rounded-full blur-sm"></div>
                        </div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
                                <Binary size={12} className="text-pink-300" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white">ThePractice_01</span>
                            </div>
                            <h4 className="font-['Space_Grotesk'] font-bold text-2xl text-white mb-2">Love Glitch</h4>
                            <p className="text-sm text-zinc-400 font-light">Digital distortion. Beautiful imperfections.</p>
                        </div>
                    </div>
                </motion.div>

                {/* CARD 2: NEON MISS YOU (Laser/Beams Look) */}
                <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="group cursor-pointer">
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 transition-colors group-hover:border-blue-500/30">
                        {/* CSS-generated Neon Beams */}
                        <div className="absolute inset-0 bg-black">
                             {/* Red Beam */}
                             <div className="absolute top-0 left-[-20%] w-[10px] h-[150%] bg-red-600 rotate-[25deg] shadow-[0_0_50px_20px_rgba(220,38,38,0.5)] blur-sm opacity-80"></div>
                             {/* Blue Beam */}
                             <div className="absolute top-[-20%] right-[20%] w-[10px] h-[150%] bg-blue-600 rotate-[-15deg] shadow-[0_0_50px_20px_rgba(37,99,235,0.5)] blur-sm opacity-80"></div>
                             {/* Floor Reflection */}
                             <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-red-900/20 via-blue-900/10 to-transparent backdrop-blur-sm"></div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
                                <Activity size={12} className="text-blue-300" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white">Neon_Protocol</span>
                            </div>
                            <h4 className="font-['Space_Grotesk'] font-bold text-2xl text-white mb-2">Neon Miss You</h4>
                            <p className="text-sm text-zinc-400 font-light">Visuals pulse to your song.</p>
                        </div>
                    </div>
                </motion.div>
                

                {/* CARD 3: CYBER HEART (Wireframe/Gold Look) */}
                <motion.div variants={fadeInUp} whileHover={{ y: -10 }} className="group cursor-pointer">
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 transition-colors group-hover:border-yellow-500/30">
                        {/* CSS-generated Cyber Grid & Heart */}
                        <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                             {/* Dot Grid */}
                             <div className="absolute inset-0 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                             
                             {/* Glowing Heart Center */}
                             <motion.div 
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="relative z-10"
                             >
                                 <Heart size={100} className="text-yellow-400 drop-shadow-[0_0_35px_rgba(250,204,21,0.6)]" strokeWidth={1} />
                                 {/* Wireframe overlay simulation */}
                                 <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_45%,black_50%,transparent_55%)] bg-[size:10px_10px] opacity-30 mix-blend-overlay"></div>
                             </motion.div>
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
                                <Zap size={12} className="text-yellow-300" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white">System_Heart</span>
                            </div>
                            <h4 className="font-['Space_Grotesk'] font-bold text-2xl text-white mb-2">Cyber Heart</h4>
                            <p className="text-sm text-zinc-400 font-light">Typography that lives like love.</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>

        {/* --- THE MAGIC BEHIND THE SCREEN --- */}
        <div className="mt-40 w-full max-w-5xl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="font-['Space_Grotesk'] font-bold text-3xl md:text-5xl mb-4 tracking-tight">THE MAGIC BEHIND THE SCREEN</h2>
                <p className="text-zinc-500 text-lg">We engineer romance into every pixel</p>
            </motion.div>

            <motion.div 
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {/* Feature 1 */}
                <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-pink-500/20 transition-all duration-300 group relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-lg bg-[#FF3366] flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(255,51,102,0.3)] group-hover:scale-110 transition-transform">
                            <span className="font-bold text-xl font-serif">A</span>
                        </div>
                        <h3 className="font-['Space_Grotesk'] font-bold text-xl mb-3 text-white">Fluid Typography</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Words shouldn't stand still. Our text engine ripples, waves, and morphs with emotion, just like your heartbeat.
                        </p>
                    </div>
                </motion.div>

                {/* Feature 2 */}
                <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-lg bg-[#00C2FF] flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(0,194,255,0.3)] group-hover:scale-110 transition-transform">
                            <BarChart3 size={24} />
                        </div>
                        <h3 className="font-['Space_Grotesk'] font-bold text-xl mb-3 text-white">Sonic Resonance</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Each vibe is tuned to a visual frequency. Watch the audio-visual world glitch and glow in perfect harmony.
                        </p>
                    </div>
                </motion.div>

                 {/* Feature 3 */}
                 <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-purple-500/20 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="w-12 h-12 rounded-lg bg-[#A020F0] flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(160,32,240,0.3)] group-hover:scale-110 transition-transform">
                            <Share2 size={24} />
                        </div>
                        <h3 className="font-['Space_Grotesk'] font-bold text-xl mb-3 text-white">Instant Connection</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Generate a unique, permanent link. Send your digital affection instantly via any messaging platform.
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </div>

        {/* --- CTA BANNER --- */}
        <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-32 w-full max-w-5xl h-[400px] rounded-[3rem] p-12 relative overflow-hidden text-center flex items-center justify-center"
        >
            {/* Hot Pink Background */}
            <div className="absolute inset-0 bg-[#FF0055]">
                {/* Subtle texture/noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white opacity-10 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <h2 className="font-['Space_Grotesk'] font-bold text-4xl md:text-6xl text-white mb-6 leading-tight drop-shadow-sm">
                    READY TO MAKE<br/>SOMEONE'S DAY?
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-10 max-w-lg mx-auto font-medium">
                    Join the romantic revolution. Create a core memory they can keep in their pocket forever.
                </p>
                <Link to="/create">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-black text-white rounded-full font-bold text-sm shadow-xl flex items-center gap-2 mx-auto hover:bg-zinc-900 transition-colors"
                    >
                        Start Creating Free <Heart size={16} fill="#FF0055" className="text-[#FF0055]" />
                    </motion.button>
                </Link>
            </div>
        </motion.div>

      </div>
      
      
      {/* Footer minimal */}
      <footer className="w-full py-6 text-center text-zinc-600 text-[10px] uppercase tracking-widest">
         © 2024 Surprise Wish Inc. // Est. Digital Romance
      </footer>
      
    </div>
    
  );
};

export default Landing;