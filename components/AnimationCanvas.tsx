import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { VibeType, WishData } from '../types';
import { Cloud, Music, Heart, Sparkles, Waves, Crosshair, Binary, Clock } from 'lucide-react';

interface AnimationCanvasProps {
  data: WishData;
  isPlaying: boolean;
  onComplete?: () => void;
}

const ANIME_IMAGES = {
  logo: "data:image/png;base64,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",
  left: "https://images.vexels.com/media/users/3/252304/isolated/preview/e746e8c1329e1df28163394c733608a5-winking-purple-anime-eyes.png",
  right: "https://pngfre.com/wp-content/uploads/1000112591-300x262.png",
  up:"https://pngfre.com/wp-content/uploads/anime-poster.png",
  down:"https://pngfre.com/wp-content/uploads/anime-poster.png",
};

const AnimationCanvas: React.FC<AnimationCanvasProps> = ({ data, isPlaying, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<anime.AnimeTimelineInstance | null>(null);

  useEffect(() => {
    if (isPlaying) {
      // Slight delay to ensure DOM is ready
      const timer = setTimeout(() => {
        runAnimation();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      if (timelineRef.current) timelineRef.current.pause();
    }
  }, [isPlaying, data.vibe, data.message]);

  const runAnimation = () => {
    if (!containerRef.current) return;
    
    // Stop any running instance
    if (timelineRef.current) timelineRef.current.pause();
    
    // Reset targets cleanly
    anime.remove(containerRef.current.querySelectorAll('*'));
    
    // Create new timeline
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      complete: () => {
        if (onComplete) onComplete();
      }
    });
    timelineRef.current = tl;

    switch (data.vibe) {
      case VibeType.COSMIC:
        runCosmicSequence(tl);
        break;
      case VibeType.ANIME:
        runAnimeSequence(tl);
        break;
      case VibeType.GLITCH:
        runGlitchSequence(tl);
        break;
      case VibeType.LOVE:
        runLoveSequence(tl);
        break;
      case VibeType.CHILL:
        runChillSequence(tl);
        break;
      case VibeType.MEMORY:
        runMemorySequence(tl);
        break;
      case VibeType.DEEP:
        runDeepSequence(tl);
        break;
    }
  };

  const runCosmicSequence = (tl: anime.AnimeTimelineInstance) => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // 1. Initial Void & Nebula
    tl.add({
      targets: containerRef.current?.querySelectorAll('.cosmic-bg'),
      opacity: [0, 1],
      duration: 1500,
      easing: 'linear'
    })
    // 2. Stars appearing spirally
    .add({
      targets: containerRef.current?.querySelectorAll('.star-particle'),
      opacity: [0, 1],
      scale: [0, () => anime.random(1, 2)],
      translateX: () => anime.random(-viewportWidth/2, viewportWidth/2),
      translateY: () => anime.random(-viewportHeight/2, viewportHeight/2),
      delay: anime.stagger(10),
      duration: 1500
    }, '-=1000')
    // 3. Heart SVG Drawing
    .add({
      targets: containerRef.current?.querySelectorAll('.heart-path'),
      strokeDashoffset: [anime.setDashoffset, 0],
      opacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 2000
    })
    // 4. HEART FILL & MASSIVE BURST
    .add({
        targets: containerRef.current?.querySelectorAll('.heart-fill'),
        scale: [0, 1.5, 1],
        opacity: [0, 1],
        easing: 'easeOutElastic(1, .5)',
        duration: 1200
    })
    .add({
        targets: containerRef.current?.querySelectorAll('.heart-burst-particle'),
        translateX: () => anime.random(-viewportWidth/1.5, viewportWidth/1.5),
        translateY: () => anime.random(-viewportHeight/1.5, viewportHeight/1.5),
        scale: [0, 3, 0],
        opacity: [1, 0],
        rotate: () => anime.random(-360, 360),
        easing: 'easeOutExpo',
        duration: 2500,
        delay: anime.stagger(5)
    }, '-=1000')
    // 5. Message Reveal
    .add({
      targets: containerRef.current?.querySelectorAll('.message-word'),
      translateY: [50, 0],
      opacity: [0, 1],
      filter: ['blur(10px)', 'blur(0px)'],
      delay: anime.stagger(200),
      duration: 1500
    }, '-=2000');
  };

  const runAnimeSequence = (tl: anime.AnimeTimelineInstance) => {
    // 1. Background & Speed Lines
    tl.add({
        targets: containerRef.current?.querySelectorAll('.anime-bg'),
        opacity: [0, 1],
        duration: 200,
        easing: 'linear'
    })
    .add({
      targets: containerRef.current?.querySelectorAll('.speed-line'),
      scaleY: [0, 1.5],
      opacity: [0, 0.8],
      delay: anime.stagger(50),
      duration: 400,
      easing: 'easeInQuad'
    })
    // 2. Character Slide-ins
    .add({
        targets: containerRef.current?.querySelectorAll('.anime-icon-left'),
        translateX: ['-100%', '0%'],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 600
    })
    .add({
        targets: containerRef.current?.querySelectorAll('.anime-icon-right'),
        translateX: ['100%', '0%'],
        opacity: [0, 1],
        easing: 'easeOutExpo',
        duration: 600
    }, '-=500')
    // 3. Logo Appear
    .add({
        targets: containerRef.current?.querySelectorAll('.anime-logo'),
        scale: [0, 1],
        opacity: [0, 0.8],
        rotate: [-360, 0],
        duration: 1000,
        easing: 'easeOutElastic(1, .8)'
    }, '-=800')
    // 4. Weapons clash / Impact
    .add({
        targets: containerRef.current?.querySelectorAll('.anime-clash'),
        scale: [0, 3, 0],
        opacity: [0, 1, 0],
        duration: 400,
        easing: 'easeOutExpo'
    }, '-=400')
    .add({
      targets: containerRef.current?.querySelectorAll('.impact-flash'),
      opacity: [0, 1, 0, 1, 0],
      duration: 300,
      easing: 'steps(5)'
    }, '-=300')
    // 5. Text Explosion
    .add({
      targets: containerRef.current?.querySelectorAll('.anime-text-container'),
      scale: [3, 1],
      opacity: [0, 1],
      rotate: [-5, 0],
      duration: 800,
      easing: 'spring(1, 80, 10, 0)'
    })
    .add({
      targets: containerRef.current?.querySelectorAll('.message-char'),
      translateX: () => anime.random(-2, 2),
      translateY: () => anime.random(-2, 2),
      duration: 100,
      delay: anime.stagger(20),
      loop: true,
      direction: 'alternate'
    });
  };

  const runGlitchSequence = (tl: anime.AnimeTimelineInstance) => {
    tl.add({
      targets: containerRef.current?.querySelectorAll('.glitch-bg-layer'),
      opacity: [0, 1],
      duration: 100
    })
    .add({
      targets: containerRef.current?.querySelectorAll('.glitch-icon'),
      opacity: [0, 1, 0, 1],
      translateX: () => anime.random(-10, 10),
      scale: [0.8, 1.2],
      duration: 500,
      easing: 'steps(3)'
    })
    .add({
      targets: containerRef.current?.querySelectorAll('.message-line'),
      width: ['0%', '100%'],
      easing: 'steps(20)',
      duration: 1500
    })
    .add({
      targets: containerRef.current?.querySelectorAll('.glitch-text'),
      textShadow: [
        '2px 0 #ff0000, -2px 0 #0000ff',
        '-2px 0 #ff0000, 2px 0 #0000ff',
        '0px 0 #ff0000, 0px 0 #0000ff'
      ],
      duration: 200,
      loop: 5,
      easing: 'linear'
    });
  };

  const runLoveSequence = (tl: anime.AnimeTimelineInstance) => {
    // 1. Background glow
    tl.add({
        targets: containerRef.current?.querySelectorAll('.love-bg'),
        opacity: [0, 1],
        duration: 1000
    })
    // 2. Big central heartbeat
    .add({
        targets: containerRef.current?.querySelectorAll('.heart-aura'),
        scale: [0.8, 1.2],
        opacity: [0, 0.4, 0.2],
        duration: 1000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    }, '-=500')
    // 3. Floating hearts rising
    .add({
        targets: containerRef.current?.querySelectorAll('.floating-heart'),
        translateY: [200, -600],
        translateX: () => anime.random(-50, 50),
        opacity: [0, 0.8, 0],
        scale: () => anime.random(0.5, 1.5),
        rotate: () => anime.random(-45, 45),
        duration: 4000,
        delay: anime.stagger(150),
        loop: true,
        easing: 'easeOutSine'
    }, '-=500')
    // 4. Text reveal
    .add({
        targets: containerRef.current?.querySelectorAll('.love-text'),
        scale: [0.9, 1],
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)'
    }, '-=3000');
  };

  const runChillSequence = (tl: anime.AnimeTimelineInstance) => {
    tl.add({
        targets: containerRef.current?.querySelectorAll('.chill-bg'),
        opacity: [0, 1],
        duration: 1000
    })
    .add({
        targets: containerRef.current?.querySelectorAll('.cloud-icon'),
        translateX: () => [anime.random(-20, 20), anime.random(-20, 20)],
        opacity: [0, 0.5],
        scale: [0.9, 1.1],
        duration: 8000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    }, '-=1000')
    .add({
        targets: containerRef.current?.querySelectorAll('.chill-text'),
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 2000,
        delay: anime.stagger(300)
    }, '-=7000');
  };

  const runMemorySequence = (tl: anime.AnimeTimelineInstance) => {
     tl.add({
        targets: containerRef.current?.querySelectorAll('.memory-bg'),
        opacity: [0, 1],
        duration: 2000
     })
     .add({
         targets: containerRef.current?.querySelectorAll('.dust-particle'),
         translateY: () => anime.random(-50, -150),
         translateX: () => anime.random(-20, 20),
         opacity: [0, 0.8, 0],
         scale: [0, 1],
         duration: 5000,
         loop: true,
         easing: 'linear',
         delay: anime.stagger(100)
     }, '-=1500')
     .add({
         targets: containerRef.current?.querySelectorAll('.memory-frame'),
         opacity: [0, 1],
         scale: [0.95, 1],
         rotate: [-1, 0],
         duration: 2000,
         easing: 'easeOutQuad'
     }, '-=3000');
  };

  const runDeepSequence = (tl: anime.AnimeTimelineInstance) => {
    tl.add({
        targets: containerRef.current?.querySelectorAll('.deep-bg'),
        opacity: [0, 1],
        duration: 2000
    })
    .add({
        targets: containerRef.current?.querySelectorAll('.bubble'),
        translateY: [600, -600],
        translateX: () => anime.random(-30, 30),
        opacity: [0, 0.6, 0],
        scale: () => anime.random(0.5, 2),
        duration: 5000,
        loop: true,
        easing: 'easeInQuad',
        delay: anime.stagger(200)
    }, '-=1500')
    .add({
        targets: containerRef.current?.querySelectorAll('.deep-text'),
        opacity: [0, 1],
        filter: ['blur(10px)', 'blur(0px)'],
        translateY: [20, 0],
        duration: 2000,
        delay: anime.stagger(100)
    }, '-=4000');
  };

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 overflow-hidden flex items-center justify-center pointer-events-none">
      
      {/* --- VIBE: COSMIC --- */}
      {data.vibe === VibeType.COSMIC && (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-3xl cosmic-bg opacity-0 overflow-hidden">
            {/* Rotating Star Field */}
            <div className="absolute inset-[-50%] w-[200%] h-[200%] animate-[spin_60s_linear_infinite] opacity-30">
                 {[...Array(100)].map((_, i) => (
                    <div key={i} className="absolute bg-white rounded-full" 
                         style={{ 
                             top: `${Math.random() * 100}%`, 
                             left: `${Math.random() * 100}%`,
                             width: Math.random() > 0.9 ? '3px' : '1px',
                             height: Math.random() > 0.9 ? '3px' : '1px',
                             opacity: Math.random()
                         }} />
                ))}
            </div>

            {/* Main Star Particles (Anime.js controlled) */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(50)].map((_, i) => (
                    <div key={i} className="star-particle absolute w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] opacity-0" 
                         style={{ top: '50%', left: '50%' }} />
                ))}
            </div>

             {/* Shooting Stars (CSS Animation) */}
            <div className="absolute inset-0 overflow-hidden">
                 <div className="absolute top-10 right-0 w-[200px] h-[2px] bg-gradient-to-l from-white to-transparent shooting-star-anim" style={{ animationDelay: '2s' }}></div>
                 <div className="absolute top-1/3 right-20 w-[150px] h-[2px] bg-gradient-to-l from-blue-300 to-transparent shooting-star-anim" style={{ animationDelay: '5s' }}></div>
                 <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[2px] bg-gradient-to-l from-purple-300 to-transparent shooting-star-anim" style={{ animationDelay: '8s' }}></div>
            </div>

             <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                {[...Array(60)].map((_, i) => (
                    <div key={`burst-${i}`} className="heart-burst-particle absolute w-4 h-4 text-pink-500 opacity-0 flex items-center justify-center">
                         <Heart size={16} fill="currentColor" />
                    </div>
                ))}
            </div>
            
            <div className="relative w-64 h-64 mb-8 flex items-center justify-center animate-float">
                 <div className="absolute inset-0 flex items-center justify-center heart-fill opacity-0 transform scale-0">
                     <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_80px_rgba(236,72,153,1)]">
                        <path fill="#ec4899" d="M50 30 L55 25 A10 10 0 1 1 75 45 L50 70 L25 45 A10 10 0 1 1 45 25 Z" transform="scale(1.2) translate(-10, -5)" />
                     </svg>
                 </div>
                 <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] absolute inset-0">
                    <path className="heart-path fill-none stroke-pink-500 stroke-[2] opacity-0"
                        d="M50 30 L55 25 A10 10 0 1 1 75 45 L50 70 L25 45 A10 10 0 1 1 45 25 Z" transform="scale(1.2) translate(-10, -5)" />
                </svg>
            </div>
            <div className="relative z-10 text-center px-4">
                <div className="font-['Cinzel'] text-pink-200 text-xl mb-4 opacity-0 message-word">For {data.recipient}</div>
                <h1 className="font-['Cinzel'] text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
                   {data.message.split(' ').map((word, i) => (
                       <span key={i} className="inline-block mx-1 opacity-0 message-word">{word}</span>
                   ))}
                </h1>
                <div className="font-['Cinzel'] text-zinc-400 text-sm opacity-0 message-word">From: {data.sender}</div>
            </div>
        </div>
      )}

      {/* --- VIBE: ANIME --- */}
      {data.vibe === VibeType.ANIME && (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-950 anime-bg opacity-0 overflow-hidden">
             
             {/* Radial Burst BG */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-600/20 via-red-900/40 to-black z-0"></div>

             {/* Speed Lines */}
             <div className="absolute inset-0 z-0">
                 {[...Array(20)].map((_, i) => (
                     <div key={i} className="speed-line absolute bg-white/10" 
                          style={{
                              left: `${Math.random() * 100}%`,
                              top: '-20%',
                              height: '140%',
                              width: `${Math.random() * 20 + 15}px`,
                              transform: `skewX(-20deg) scaleY(0)`,
                              transformOrigin: 'top'
                          }} />
                 ))}
             </div>

             {/* Custom Character Images */}
             <div className="absolute top-10 left-[-50px] anime-icon-left opacity-0 z-10">
                 <img 
                    src={ANIME_IMAGES.left} 
                    alt="Character" 
                    className="w-64 h-auto object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]" 
                 />
             </div>
             <div className="absolute bottom-[30px] left-[-50px] anime-icon-left opacity-0 z-10">
                 <img 
                    src={ANIME_IMAGES.down} 
                    alt="Character" 
                    className="w-64 h-auto object-contain drop-shadow-[0_0_20px_rgba(239,68,68,0.6)]" 
                 />
             </div>
             <div className="absolute bottom-10 right-[-50px] anime-icon-right opacity-0 z-10">
                 <img 
                    src={ANIME_IMAGES.right} 
                    alt="Character" 
                    className="w-64 h-auto object-contain drop-shadow-[0_0_20px_rgba(250,204,21,0.6)]" 
                 />
             </div>
             
          
             {/* Central Clash */}
             <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none anime-clash opacity-0">
                  <Crosshair size={200} className="text-white opacity-50 absolute" />
                  <div className="w-[300px] h-[2px] bg-white rotate-45 absolute shadow-[0_0_20px_white]" />
                  <div className="w-[300px] h-[2px] bg-white -rotate-45 absolute shadow-[0_0_20px_white]" />
             </div>

             <div className="impact-flash absolute inset-0 bg-white z-30 opacity-0 mix-blend-overlay pointer-events-none" />

             <div className="relative z-40 text-center anime-text-container opacity-0 rotate-[-5deg]">
                 <div className="font-['Bangers'] text-yellow-400 text-3xl mb-2 tracking-widest uppercase drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                     TO: {data.recipient}
                 </div>
                 <h1 className="font-['Bangers'] text-6xl md:text-8xl text-white mb-4 leading-none uppercase drop-shadow-[6px_6px_0_#ef4444] stroke-black" 
                     style={{ WebkitTextStroke: '2px black' }}>
                     {data.message.split('').map((char, i) => (
                         <span key={i} className="inline-block message-char">{char === ' ' ? '\u00A0' : char}</span>
                     ))}
                 </h1>
                 <div className="font-['Bangers'] text-orange-400 text-2xl tracking-widest uppercase drop-shadow-[3px_3px_0_rgba(0,0,0,1)]">
                     FROM: {data.sender}
                 </div>
             </div>
          </div>
      )}

      {/* --- VIBE: GLITCH --- */}
      {data.vibe === VibeType.GLITCH && (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black glitch-bg-layer opacity-0 overflow-hidden">
             
             {/* Digital Noise Grid */}
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-200 contrast-200"></div>

             {/* Random Glitch Icons */}
             <div className="absolute top-1/4 left-1/4 glitch-icon opacity-0 text-green-500">
                <Binary size={48} />
             </div>
             <div className="absolute bottom-1/3 right-1/4 glitch-icon opacity-0 text-blue-500">
                <Clock size={48} />
             </div>

             <div className="relative z-10 w-full max-w-lg p-8 border-l-4 border-green-500 bg-zinc-900/80 backdrop-blur-sm">
                 <div className="flex justify-between items-center mb-4 border-b border-green-900/50 pb-2">
                     <span className="font-['VT323'] text-xl text-green-500">Subject: {data.recipient}</span>
                     <span className="font-['VT323'] text-xl text-green-500 animate-pulse">Running...</span>
                 </div>
                 
                 <div className="relative mb-6">
                     <h1 className="font-['VT323'] text-5xl md:text-6xl text-white leading-none uppercase glitch-text" data-text={data.message}>
                         {data.message}
                     </h1>
                     <div className="h-1 bg-green-500 message-line w-0 mt-2 shadow-[0_0_10px_#22c55e]"></div>
                 </div>

                 <div className="font-['VT323'] text-2xl text-zinc-500">
                     {'>>'} Sender: {data.sender}_
                 </div>
             </div>
        </div>
      )}

      {/* --- VIBE: LOVE --- */}
      {data.vibe === VibeType.LOVE && (
         <div className="relative w-full h-full flex flex-col items-center justify-center bg-pink-950/80 love-bg opacity-0 overflow-hidden">
             
             <div className="absolute inset-0 flex items-center justify-center heart-aura opacity-0">
                 <div className="w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
             </div>

             <div className="absolute inset-0">
                 {[...Array(15)].map((_, i) => (
                     <div key={i} className="floating-heart absolute text-pink-400 opacity-0"
                          style={{
                              left: `${Math.random() * 100}%`,
                              top: '110%'
                          }}>
                        <Heart size={Math.random() * 30 + 10} fill="currentColor" />
                     </div>
                 ))}
             </div>

             <div className="relative z-10 text-center p-8 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/20 love-text opacity-0 shadow-2xl">
                 <p className="font-['Space_Grotesk'] text-pink-200 text-sm mb-2 tracking-widest uppercase">To My Dearest {data.recipient}</p>
                 <h1 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                     {data.message}
                 </h1>
                 <div className="flex justify-center items-center gap-2">
                     <div className="h-[1px] w-12 bg-pink-500/50"></div>
                     <Heart size={16} className="text-pink-500" fill="currentColor" />
                     <div className="h-[1px] w-12 bg-pink-500/50"></div>
                 </div>
                 <p className="font-['Space_Grotesk'] text-zinc-300 mt-4 text-sm">Love, {data.sender}</p>
             </div>
         </div>
      )}

      {/* --- VIBE: CHILL --- */}
      {data.vibe === VibeType.CHILL && (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#c8b6ff] chill-bg opacity-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-purple-200 opacity-80" />
              
              <div className="absolute top-20 left-20 cloud-icon text-white opacity-0">
                  <Cloud size={80} fill="white" />
              </div>
              <div className="absolute top-40 right-40 cloud-icon text-white opacity-0" style={{ transform: 'scale(1.5)' }}>
                  <Cloud size={100} fill="white" />
              </div>
              <div className="absolute bottom-20 left-1/3 cloud-icon text-white opacity-0">
                  <Cloud size={60} fill="white" />
              </div>

              <div className="relative z-10 p-10 bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 chill-text opacity-0 max-w-lg">
                  <div className="flex items-center gap-2 mb-4 text-purple-900/60 font-mono text-xs uppercase">
                      <Music size={14} /> Now Playing: Good Vibes
                  </div>
                  <h1 className="font-mono text-3xl md:text-4xl text-purple-900 mb-6 leading-relaxed">
                      "{data.message}"
                  </h1>
                  <div className="flex justify-between items-end border-t border-purple-900/10 pt-4">
                      <div className="font-mono text-sm text-purple-800">
                          To: {data.recipient}<br/>
                          From: {data.sender}
                      </div>
                      <div className="text-2xl">☕</div>
                  </div>
              </div>
          </div>
      )}

      {/* --- VIBE: MEMORY --- */}
      {data.vibe === VibeType.MEMORY && (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-amber-950 memory-bg opacity-0 overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-black to-black"></div>
               
               {/* Floating Dust */}
               <div className="absolute inset-0 pointer-events-none">
                  {[...Array(30)].map((_, i) => (
                      <div key={i} className="dust-particle absolute bg-amber-200 rounded-full opacity-0"
                           style={{
                               width: Math.random() * 4 + 'px',
                               height: Math.random() * 4 + 'px',
                               left: Math.random() * 100 + '%',
                               top: '100%'
                           }} />
                  ))}
               </div>

               <div className="relative z-10 memory-frame opacity-0 p-1 bg-gradient-to-br from-amber-600 to-amber-900 rounded-lg shadow-2xl rotate-1">
                   <div className="bg-[#1a1500] p-8 md:p-12 rounded border border-amber-900/50 min-w-[300px] max-w-lg text-center">
                       <div className="mb-6 text-amber-500/50 flex justify-center">
                           <Clock size={32} />
                       </div>
                       <div className="font-serif italic text-amber-100/80 text-lg mb-2">My dearest {data.recipient},</div>
                       <h1 className="font-serif text-3xl md:text-4xl text-amber-50 font-medium leading-normal mb-8 border-y border-amber-900/30 py-8">
                           {data.message}
                       </h1>
                       <div className="font-serif text-amber-500 text-sm">Always, {data.sender}</div>
                   </div>
               </div>
          </div>
      )}

      {/* --- VIBE: DEEP --- */}
      {data.vibe === VibeType.DEEP && (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#001219] deep-bg opacity-0 overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-t from-[#005f73]/20 to-transparent"></div>
               
               {/* Bubbles */}
               <div className="absolute inset-0 pointer-events-none">
                  {[...Array(20)].map((_, i) => (
                      <div key={i} className="bubble absolute border border-cyan-500/30 rounded-full opacity-0"
                           style={{
                               width: Math.random() * 20 + 10 + 'px',
                               height: Math.random() * 20 + 10 + 'px',
                               left: Math.random() * 100 + '%',
                               bottom: '-50px'
                           }} />
                  ))}
               </div>

               <div className="relative z-10 text-center deep-text opacity-0">
                   <div className="mb-8 flex justify-center text-cyan-500/50 animate-pulse">
                       <Waves size={48} />
                   </div>
                   <h1 className="font-['Space_Grotesk'] text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-blue-400 font-bold tracking-[0.2em] mb-8 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">
                       {data.message}
                   </h1>
                   <div className="flex justify-between items-center w-full max-w-md mx-auto px-8 border-t border-cyan-900/50 pt-8">
                       <span className="font-mono text-cyan-700 text-xs uppercase">{data.recipient}</span>
                       <div className="w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4]"></div>
                       <span className="font-mono text-cyan-700 text-xs uppercase">{data.sender}</span>
                   </div>
               </div>
          </div>
      )}
    </div>
  );
};

export default AnimationCanvas;