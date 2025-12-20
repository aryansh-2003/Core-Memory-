import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VibeType, WishData, VIBE_CONFIG } from '../types';
import { encodeWish, saveWishToHistory } from '../utils';
import AnimationCanvas from '../components/AnimationCanvas';
import { ArrowRight, Sparkles, Smartphone, Copy, Check, ExternalLink, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Creator = () => {
  const [searchParams] = useSearchParams();
  const initialVibe = searchParams.get('vibe') as VibeType;

  const [formData, setFormData] = useState<WishData>({
    sender: '',
    recipient: '',
    message: '',
    vibe: initialVibe && VIBE_CONFIG[initialVibe] ? initialVibe : VibeType.COSMIC
  });
  
  // Debounce the message for preview so we don't restart animation on every keystroke
  const [debouncedData, setDebouncedData] = useState<WishData>(formData);

  // Modal State
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // If vibe changes via URL params (e.g. from Gallery), update state
    if (initialVibe && VIBE_CONFIG[initialVibe]) {
        setFormData(prev => ({ ...prev, vibe: initialVibe }));
    }
  }, [initialVibe]);

  useEffect(() => {
    const handler = setTimeout(() => {
        setDebouncedData(formData);
    }, 400);
    return () => clearTimeout(handler);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateLink = () => {
    if (!formData.message) return;
    
    // Save to local history
    saveWishToHistory(formData);

    const hash = encodeWish(formData);
    const url = `${window.location.origin}/#/reveal?d=${hash}`;
    setGeneratedLink(url);
  };

  const copyToClipboard = () => {
    if (generatedLink) {
        navigator.clipboard.writeText(generatedLink);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const closeSuccessModal = () => {
      setGeneratedLink(null);
      setIsCopied(false);
  };

  return (
    <div className="min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto">
      
      <div className="mb-10">
        <h1 className="font-['Space_Grotesk'] text-4xl font-bold">Craft Your Moment</h1>
        <p className="text-zinc-500 mt-2">Design a memory that resonates across the digital ether.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: EDITOR */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Select Vibe */}
          <section className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-6">
                <div className="p-1 rounded bg-pink-500/10"><Sparkles size={14} className="text-pink-500" /></div>
                <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Select Vibe</h3>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(VIBE_CONFIG).map(([key, config]) => {
                   const isActive = formData.vibe === key;
                   return (
                     <button
                        key={key}
                        onClick={() => setFormData({ ...formData, vibe: key as VibeType })}
                        className={`relative group p-4 rounded-2xl border text-left transition-all duration-300 h-32 flex flex-col justify-between overflow-hidden ${
                            isActive 
                            ? `border-transparent ${config.activeClass} shadow-lg` 
                            : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                        }`}
                     >
                        {/* Top Gradient Line */}
                        {isActive && <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${config.color}`} />}
                        
                        <div className={`text-2xl mb-2 ${config.iconColor}`}>{config.icon}</div>
                        <div>
                            <div className={`font-bold ${isActive ? 'text-white' : 'text-zinc-300'}`}>{config.label}</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{config.subLabel}</div>
                        </div>
                     </button>
                   );
                })}
             </div>
          </section>

          {/* 2. Personal Details */}
          <section className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-6">
                <div className="p-1 rounded bg-blue-500/10"><div className="w-3 h-3 bg-blue-500 rounded-full" /></div>
                <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Personal Details</h3>
             </div>
             
             <div className="space-y-6">
                <div className="group">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase mb-2 block ml-1">To (Recipient)</label>
                    <input
                      name="recipient"
                      value={formData.recipient}
                      onChange={handleInputChange}
                      placeholder="Who is this special wish for?"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-zinc-700"
                    />
                </div>
                <div className="group">
                    <label className="text-[10px] font-mono text-zinc-500 uppercase mb-2 block ml-1">From (You)</label>
                    <input
                      name="sender"
                      value={formData.sender}
                      onChange={handleInputChange}
                      placeholder="Your name or nickname"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all placeholder:text-zinc-700"
                    />
                </div>
             </div>
          </section>

          {/* 3. Message */}
          <section className="bg-zinc-900/30 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-6">
                <div className="p-1 rounded bg-green-500/10"><div className="w-3 h-3 bg-green-500 rounded-sm" /></div>
                <h3 className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Heartfelt Message</h3>
             </div>
             
             <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your wish here. Make it magical..."
                  rows={4}
                  maxLength={100}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none placeholder:text-zinc-700"
                />
                <div className="absolute bottom-3 right-3 text-[10px] text-zinc-600 font-mono">
                    {formData.message.length}/100
                </div>
             </div>
          </section>

          {/* Create Button */}
          <button
            onClick={generateLink}
            disabled={!formData.message || !formData.recipient || !formData.sender}
            className="w-full py-5 rounded-full bg-[#10b981] hover:bg-[#059669] text-black font-['Space_Grotesk'] font-bold text-lg transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"
          >
             Create Wish Link <ArrowRight size={20} />
          </button>

        </div>

        {/* RIGHT COLUMN: PREVIEW */}
        <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
                <div className="flex items-center justify-between mb-4 px-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Live Preview</span>
                    </div>
                    <div className="flex gap-2 text-zinc-600">
                        <Smartphone size={16} />
                    </div>
                </div>

                {/* Phone Frame */}
                <div className="relative mx-auto border-8 border-zinc-900 bg-black rounded-[3rem] shadow-2xl h-[700px] overflow-hidden ring-1 ring-white/10">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-900 rounded-b-xl z-50"></div>
                    
                    {/* Screen Content */}
                    <div className="w-full h-full relative overflow-hidden rounded-[2.5rem]">
                        {debouncedData.message ? (
                            // Use key to force remount and replay animation when vibe or message changes
                            <AnimationCanvas 
                                key={`${debouncedData.vibe}-${debouncedData.message}`}
                                data={debouncedData} 
                                isPlaying={true} 
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-700 p-8 text-center">
                                <Sparkles size={48} className="mb-4 opacity-20" />
                                <p className="font-['Space_Grotesk']">Your magic will appear here</p>
                            </div>
                        )}
                        
                        {/* Overlay Information for static preview feel */}
                        <div className="absolute bottom-8 left-0 w-full text-center z-40 pointer-events-none">
                            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Surprise Wish Gen</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {generatedLink && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeSuccessModal}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative bg-[#09090b] border border-white/10 p-8 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#10b981]/20 blur-[50px] rounded-full pointer-events-none" />

                    <button 
                        onClick={closeSuccessModal}
                        className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col items-center text-center relative z-10">
                        <div className="w-16 h-16 bg-[#10b981]/10 rounded-full flex items-center justify-center mb-6 text-[#10b981] border border-[#10b981]/20">
                            <Share2 size={32} />
                        </div>
                        
                        <h3 className="font-['Space_Grotesk'] text-2xl font-bold text-white mb-2">It's Ready!</h3>
                        <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                            Your wish has been encrypted and is ready for transmission. Copy the secure link below.
                        </p>

                        <div className="w-full flex gap-2 mb-4 bg-black/50 p-2 rounded-xl border border-white/10">
                            <input 
                                value={generatedLink} 
                                readOnly 
                                className="bg-transparent border-none focus:ring-0 text-zinc-300 text-sm flex-1 font-mono px-2 outline-none w-full"
                            />
                            <button 
                                onClick={copyToClipboard}
                                className={`px-4 py-2 rounded-lg font-bold text-xs transition-all flex items-center gap-2 ${
                                    isCopied 
                                    ? 'bg-[#10b981] text-black' 
                                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                                }`}
                            >
                                {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                {isCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>

                        <button 
                            onClick={() => window.open(generatedLink, '_blank')}
                            className="text-zinc-500 text-xs hover:text-white transition-colors flex items-center gap-1"
                        >
                            Open link in new tab <ExternalLink size={10} />
                        </button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Creator;