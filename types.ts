export enum VibeType {
  COSMIC = 'COSMIC',
  ANIME = 'ANIME',
  GLITCH = 'GLITCH',
  LOVE = 'LOVE',
  CHILL = 'CHILL',
  MEMORY = 'MEMORY',
  DEEP = 'DEEP'
}

export interface WishData {
  sender: string;
  recipient: string;
  message: string;
  vibe: VibeType;
}

export const VIBE_CONFIG = {
  [VibeType.COSMIC]: {
    label: "Cosmic",
    subLabel: "Deep & Infinite",
    description: "Ethereal, romantic, stardust.",
    color: "from-indigo-500 via-purple-500 to-pink-500",
    activeClass: "ring-purple-500 bg-purple-500/10",
    iconColor: "text-purple-400",
    font: "font-['Cinzel']",
    icon: "🌌"
  },
  [VibeType.ANIME]: {
    label: "Anime",
    subLabel: "Hype & Power",
    description: "High energy, impact frames, speed.",
    color: "from-red-500 via-orange-500 to-yellow-500",
    activeClass: "ring-red-500 bg-red-500/10",
    iconColor: "text-red-400",
    font: "font-['Bangers'] tracking-widest",
    icon: "⚔️"
  },
  [VibeType.GLITCH]: {
    label: "Glitch",
    subLabel: "Edgy & Raw",
    description: "Neon, datamosh, edgy.",
    color: "from-green-400 via-cyan-500 to-blue-500",
    activeClass: "ring-green-500 bg-green-500/10",
    iconColor: "text-green-400",
    font: "font-['VT323'] text-xl",
    icon: "🧩"
  },
  [VibeType.LOVE]: {
    label: "Love",
    subLabel: "Soft & Sweet",
    description: "Pure romance, hearts, warmth.",
    color: "from-rose-400 via-pink-500 to-red-500",
    activeClass: "ring-pink-500 bg-pink-500/10",
    iconColor: "text-pink-400",
    font: "font-['Space_Grotesk']",
    icon: "💝"
  },
  [VibeType.CHILL]: {
    label: "Chill",
    subLabel: "Lo-fi & Calm",
    description: "Relaxed beats, clouds, peace.",
    color: "from-blue-200 via-purple-200 to-pink-200",
    activeClass: "ring-blue-300 bg-blue-500/10",
    iconColor: "text-blue-300",
    font: "font-mono",
    icon: "☕"
  },
  [VibeType.MEMORY]: {
    label: "Memory",
    subLabel: "Nostalgic",
    description: "Golden hour, dust, timeless.",
    color: "from-amber-700 via-orange-600 to-yellow-500",
    activeClass: "ring-amber-500 bg-amber-500/10",
    iconColor: "text-amber-500",
    font: "font-serif italic",
    icon: "🕰️"
  },
  [VibeType.DEEP]: {
    label: "Deep",
    subLabel: "Underwater",
    description: "Submerged, quiet, bioluminescent.",
    color: "from-cyan-900 via-blue-900 to-indigo-900",
    activeClass: "ring-cyan-500 bg-cyan-500/10",
    iconColor: "text-cyan-400",
    font: "font-['Space_Grotesk'] tracking-[0.2em]",
    icon: "🌊"
  }
};