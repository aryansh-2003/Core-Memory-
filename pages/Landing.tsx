import React, { useState, useCallback, useMemo } from 'react';
import {
  motion,
  useScroll,
  useSpring
} from 'framer-motion';
import {
  ArrowRight,
  Sparkles,
  Heart,
  Zap,
  Binary,
  Activity,
  Share2,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const EASE_SMOOTH = [0.25, 0.1, 0.25, 1];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SMOOTH }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const AnimatedText = React.memo(({ text, className, delay = 0 }: { text: string, className: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE_SMOOTH }}
      className={className}
    >
      {text}
    </motion.div>
  );
});

AnimatedText.displayName = 'AnimatedText';

const Landing = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    setMousePos({ x, y });
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const orbStyles = useMemo(() => ({
    orb1: {
      transform: `translate3d(${-mousePos.x}px, ${mousePos.y}px, 0)`,
    },
    orb2: {
      transform: `translate3d(${mousePos.x}px, ${-mousePos.y}px, 0)`,
    },
    orb3: {
      transform: `translate3d(${-mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px, 0)`,
    }
  }), [mousePos.x, mousePos.y]);

  return (
    <div
      className="min-h-screen w-full relative bg-[#050505] text-white overflow-x-hidden selection:bg-pink-500/30"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 origin-left z-50"
        style={{ scaleX, willChange: 'transform' }}
      />

      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

         <div
            style={{
              ...orbStyles.orb1,
              willChange: 'transform'
            }}
            className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-pink-600/30 via-purple-900/10 to-transparent rounded-full blur-[120px] transition-transform duration-500 ease-out"
         />

         <div
            style={{
              ...orbStyles.orb2,
              willChange: 'transform'
            }}
            className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] transition-transform duration-500 ease-out"
         />

         <div
            style={{
              ...orbStyles.orb3,
              willChange: 'transform'
            }}
            className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[120px] transition-transform duration-500 ease-out"
         />
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-32 flex flex-col items-center">

        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/20 bg-pink-500/10 text-[10px] font-mono tracking-widest text-pink-400 uppercase backdrop-blur-md shadow-[0_0_15px_rgba(236,72,153,0.2)]"
        >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
            <span>Surprise Wish v2.0 Live</span>
        </motion.div>

        <div className="text-center font-bold leading-[0.85] tracking-tighter mb-8">
            <AnimatedText
                text="TRANSMIT"
                className="text-4xl md:text-7xl text-white/40 mb-2 italic"
                delay={0}
            />

            <AnimatedText
                text="DIGITAL"
                className="text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40"
                delay={0.1}
            />

            <AnimatedText
                text="AFFECTION."
                className="text-6xl md:text-9xl text-pink-500 italic"
                delay={0.2}
            />
        </div>

        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE_SMOOTH }}
            className="text-center text-zinc-400 max-w-xl text-lg md:text-xl leading-relaxed mb-12 font-light"
        >
            High-fidelity, ethereal greeting cards for the internet age. <br className="hidden md:block"/>
            Weave a feeling that echoes forever in the cyber-void.
        </motion.p>

        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-[#FF0F7B] to-[#F89B29] text-white font-bold rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,15,123,0.4)]"
            style={{ willChange: 'transform' }}
        >
            <span className="relative z-10 flex items-center gap-2 text-lg tracking-wide">
                <Link to="/create">
                Craft a Digital Love Note <Heart size={18} fill="currentColor" />
                </Link>
            </span>
        </motion.button>

        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mt-40 w-full max-w-6xl relative"
        >
            <div className="flex items-center justify-between mb-10 px-2 relative z-10">
                <div className="flex items-center gap-3">
                    <Sparkles size={20} className="text-pink-500" />
                    <h3 className="font-bold text-2xl tracking-tight">Trending Aesthetics</h3>
                </div>
                <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-xs font-bold text-pink-500 flex items-center gap-1 uppercase tracking-wider"
                    style={{ willChange: 'transform' }}
                >
                    View All <ArrowRight size={14} />
                </motion.a>
            </div>

            <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-full h-[140%] -z-10 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-purple-500/5 to-blue-500/10 blur-3xl"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">

                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  style={{ willChange: 'transform' }}
                >
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/80 backdrop-blur-sm transition-all duration-300 group-hover:border-pink-500/30 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-50"></div>

                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
                                <Binary size={12} className="text-pink-300" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white">ThePractice_01</span>
                            </div>
                            <h4 className="font-bold text-2xl text-white mb-2">Love Glitch</h4>
                            <p className="text-sm text-zinc-400 font-light">Digital distortion. Beautiful imperfections.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  style={{ willChange: 'transform' }}
                >
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/80 backdrop-blur-sm transition-all duration-300 group-hover:border-blue-500/30 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                        <div className="absolute inset-0 bg-black">
                             <div className="absolute top-0 left-[-20%] w-[10px] h-[150%] bg-red-600 rotate-[25deg] shadow-[0_0_50px_20px_rgba(220,38,38,0.3)] blur-sm opacity-60" />
                             <div className="absolute top-[-20%] right-[20%] w-[10px] h-[150%] bg-blue-600 rotate-[-15deg] shadow-[0_0_50px_20px_rgba(37,99,235,0.3)] blur-sm opacity-60" />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
                                <Activity size={12} className="text-blue-300" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white">Neon_Protocol</span>
                            </div>
                            <h4 className="font-bold text-2xl text-white mb-2">Neon Miss You</h4>
                            <p className="text-sm text-zinc-400 font-light">Visuals pulse to your song.</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                  style={{ willChange: 'transform' }}
                >
                    <div className="relative h-[400px] rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900/80 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-500/30 group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)]">
                        <div className="absolute inset-0 bg-zinc-950 flex items-center justify-center">
                             <div className="absolute inset-0 bg-[radial-gradient(#ffd700_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                             <Heart size={100} className="text-yellow-400 drop-shadow-[0_0_35px_rgba(250,204,21,0.6)]" strokeWidth={1} />
                        </div>

                        <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 w-fit">
                                <Zap size={12} className="text-yellow-300" />
                                <span className="text-[10px] font-mono uppercase tracking-wider text-white">System_Heart</span>
                            </div>
                            <h4 className="font-bold text-2xl text-white mb-2">Cyber Heart</h4>
                            <p className="text-sm text-zinc-400 font-light">Typography that lives like love.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>

        <div className="mt-40 w-full max-w-5xl">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE_SMOOTH }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="font-bold text-3xl md:text-5xl mb-4 tracking-tight">THE MAGIC BEHIND THE SCREEN</h2>
                <p className="text-zinc-500 text-lg">We engineer romance into every pixel</p>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-pink-500/20 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-lg bg-[#FF3366] flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(255,51,102,0.3)]">
                        <span className="font-bold text-xl font-serif">A</span>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-white">Fluid Typography</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Words shouldn't stand still. Our text engine ripples, waves, and morphs with emotion, just like your heartbeat.
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-blue-500/20 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-lg bg-[#00C2FF] flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(0,194,255,0.3)]">
                        <BarChart3 size={24} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-white">Sonic Resonance</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Each vibe is tuned to a visual frequency. Watch the audio-visual world glitch and glow in perfect harmony.
                    </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="p-8 rounded-3xl bg-[#0A0A0A] border border-white/5 hover:border-purple-500/20 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-lg bg-[#A020F0] flex items-center justify-center text-white mb-6 shadow-[0_0_20px_rgba(160,32,240,0.3)]">
                        <Share2 size={24} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-white">Instant Connection</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        Generate a unique, permanent link. Send your digital affection instantly via any messaging platform.
                    </p>
                </motion.div>
            </motion.div>
        </div>

        <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_SMOOTH }}
            viewport={{ once: true }}
            className="mt-32 w-full max-w-5xl h-[400px] rounded-[3rem] p-12 relative overflow-hidden text-center flex items-center justify-center bg-[#FF0055]"
        >
            <div className="relative z-10 flex flex-col items-center">
                <h2 className="font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
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
                    style={{ willChange: 'transform' }}
                >
                    
                        Start Creating Free <Heart size={16} fill="#FF0055" className="text-[#FF0055]" />
                    
                </motion.button>
                </Link>
            </div>
        </motion.div>

      </div>

      <footer className="w-full py-6 text-center text-zinc-600 text-[10px] uppercase tracking-widest">
         © 2025 Surprise Wish Inc. // Est. Digital Romance
      </footer>
    </div>
  );
};

export default Landing;
