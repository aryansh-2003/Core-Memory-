import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Plus, User, Menu, X, Image, Info, Home } from 'lucide-react';
import logo from '../pages/logo.png'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen w-full bg-[#050505] text-white relative overflow-x-hidden selection:bg-pink-500 selection:text-white font-['Inter']">
      
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group z-50">
                    <img className="w-12 lg:w-[10%]" src={logo} alt="" />
                <span className="font-['Space_Grotesk'] font-bold text-lg tracking-tight hidden sm:block">Surprise Wish Gen</span>
                <span className="font-['Space_Grotesk'] font-bold text-lg tracking-tight sm:hidden">Your Wishes</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                <Link to="/create" className="hover:text-white transition-colors">Create Wish</Link>
                <Link to="/gallery" className={`hover:text-white transition-colors ${location.pathname === '/gallery' ? 'text-white' : ''}`}>Gallery</Link>
                <Link to="/" className="hover:text-white transition-colors">About</Link>
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
                <Link to="/create">
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold hover:opacity-90 transition-opacity">
                        <Plus size={14} /> New Wish
                    </button>
                </Link>
                <button className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                    <User size={16} className="text-zinc-400" />
                </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-4">
                <button 
                    onClick={toggleSidebar} 
                    className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white active:scale-95 transition-transform"
                >
                    <Menu size={24} />
                </button>
            </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
            <>
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm md:hidden"
                />
                
                {/* Drawer */}
                <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-[#09090b] border-l border-white/10 z-[70] p-6 shadow-2xl md:hidden flex flex-col"
                >
                    <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-6">
                         <span className="font-['Space_Grotesk'] font-bold text-xl">Menu</span>
                         <button onClick={closeSidebar} className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <X size={24} />
                         </button>
                    </div>
                    
                    <div className="flex flex-col gap-2 flex-1">
                        <Link 
                            to="/" 
                            onClick={closeSidebar}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Home size={20} />
                            <span className="font-medium">Home</span>
                        </Link>
                        
                        {/* <Link 
                            to="/create" 
                            onClick={closeSidebar}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${location.pathname === '/create' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Plus size={20} />
                            <span className="font-medium">Create Wish</span>
                        </Link> */}

                        <Link 
                            to="/gallery" 
                            onClick={closeSidebar}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all ${location.pathname === '/gallery' ? 'bg-white/10 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <Image size={20} />
                            <span className="font-medium">Gallery</span>
                        </Link>

                        <Link 
                            to="/" 
                            onClick={closeSidebar}
                            className="flex items-center gap-4 p-4 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-all"
                        >
                            <Info size={20} />
                            <span className="font-medium">About</span>
                        </Link>
                    </div>

                    {/* <div className="mt-auto pt-6 border-t border-white/5">
                        <Link to="/create" onClick={closeSidebar}>
                            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-purple-900/20 hover:shadow-purple-900/40 transition-all active:scale-95 flex items-center justify-center gap-2">
                                <Plus size={18} /> Create New Wish
                            </button>
                        </Link>
                        <p className="text-center text-zinc-600 text-[10px] mt-6 font-mono uppercase tracking-widest">
                            v2.0.4 // Mobile
                        </p>
                    </div> */}
                </motion.div>
            </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 pt-16">
          {children}
      </main>

       <footer className="w-full py-8 text-center border-t border-white/5 bg-black/50 mt-20">
         <div className="flex items-center justify-center gap-2 mb-2">
            <Heart size={12} className="text-pink-600" fill="currentColor" />
            <span className="text-xs font-mono text-zinc-600">SURPRISE WISH GEN v2.0.4</span>
         </div>
         <p className="text-zinc-700 text-[10px] uppercase tracking-widest">Transmit Digital Affection</p>
       </footer>
    </div>
  );
};

export default Layout;