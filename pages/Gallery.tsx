import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { VibeType, VIBE_CONFIG } from '../types';
import { getWishHistory, StoredWish } from '../utils';
import { Heart, Sparkles, Zap, Filter, ArrowDownUp, PenTool } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Gallery = () => {
    const [filter, setFilter] = useState('All Vibes');
    const [history, setHistory] = useState<StoredWish[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Load history from local storage
        setHistory(getWishHistory());
    }, []);

    const filters = ['All Vibes', 'Chill', 'Hype', 'Love', 'Cosmic', 'Memory', 'Deep'];
    
    const filteredItems = filter === 'All Vibes' ? history : history.filter(item => {
        if (filter === 'Cosmic' && item.vibe === VibeType.COSMIC) return true;
        if (filter === 'Hype' && item.vibe === VibeType.ANIME) return true;
        if (filter === 'Love' && item.vibe === VibeType.LOVE) return true;
        if (filter === 'Chill' && item.vibe === VibeType.CHILL) return true;
        if (filter === 'Memory' && item.vibe === VibeType.MEMORY) return true;
        if (filter === 'Deep' && item.vibe === VibeType.DEEP) return true;
        return false;
    });

    const handleUseStyle = (vibe: VibeType) => {
        navigate(`/create?vibe=${vibe}`);
    };

    return (
        <div className="min-h-screen pt-10 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl font-bold text-white mb-4">
                        My Wishes <span className="text-pink-500">Gallery</span>
                    </h1>
                    <p className="text-zinc-400 max-w-xl text-sm md:text-base leading-relaxed">
                        Your archive of digital memories and cyber-romantic moments. Review past transmissions.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="flex gap-4">
                    <div className="px-6 py-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col items-center">
                        <span className="text-2xl font-bold text-pink-500">{history.length}</span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Sent</span>
                    </div>
                </div>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                
                {/* Filters */}
                <div className="flex flex-wrap gap-2">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                                filter === f 
                                ? 'bg-pink-600 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]' 
                                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid */}
            {filteredItems.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                    <p className="text-zinc-500 mb-4">No wishes found in this timeline.</p>
                    <Link to="/create" className="text-pink-500 hover:underline">Create your first wish</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => {
                        const config = VIBE_CONFIG[item.vibe];
                        return (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ y: -5, rotateX: 5, rotateY: 5, scale: 1.02 }}
                                className={`group relative bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden hover:border-pink-500/30 transition-all duration-300 flex flex-col perspective-1000`}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Gradient Preview Area */}
                                <div className={`h-32 w-full bg-gradient-to-br ${config?.color || 'from-zinc-800 to-black'} relative overflow-hidden flex items-center justify-center group-hover:brightness-110 transition-all`}>
                                     {/* Subtle animated overlay */}
                                     <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] hover:animate-[gradient_3s_ease_infinite]"></div>
                                     
                                     <div className="text-6xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                                        {config?.icon}
                                     </div>
                                     <div className="absolute top-4 right-4 bg-black/40 backdrop-blur px-2 py-1 rounded text-[10px] font-mono text-white border border-white/10 uppercase">
                                        {config?.label}
                                     </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col bg-zinc-900/50 backdrop-blur-sm">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <div className="text-[10px] font-mono text-zinc-500 mb-1">{item.date}</div>
                                            <div className="text-lg font-bold text-white leading-tight">For: {item.recipient}</div>
                                        </div>
                                    </div>
                                    
                                    <p className="text-zinc-400 text-xs line-clamp-2 mb-4 flex-1">"{item.message}"</p>
                                    
                                    <button 
                                        onClick={() => handleUseStyle(item.vibe)}
                                        className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-bold text-zinc-300 flex items-center justify-center gap-2 transition-colors group-hover:bg-white group-hover:text-black"
                                    >
                                        <PenTool size={12} /> Use Design
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Gallery;