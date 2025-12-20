import { WishData, VibeType } from './types';
import LZString from 'lz-string';

// Minified keys structure to reduce URL length
interface MinifiedWishData {
  s: string; // sender
  r: string; // recipient
  m: string; // message
  v: VibeType; // vibe
}

// Encode with Compression + Minification
export const encodeWish = (data: WishData): string => {
  try {
    const minified: MinifiedWishData = {
      s: data.sender,
      r: data.recipient,
      m: data.message,
      v: data.vibe
    };
    const json = JSON.stringify(minified);
    // compressToEncodedURIComponent produces URL-safe strings without expanding like Base64
    return LZString.compressToEncodedURIComponent(json);
  } catch (e) {
    console.error("Encoding failed", e);
    return "";
  }
};

export const decodeWish = (hash: string): WishData | null => {
  try {
    // 1. Try decompressing (New Format)
    const decompressed = LZString.decompressFromEncodedURIComponent(hash);
    
    if (decompressed) {
      const parsed = JSON.parse(decompressed);
      
      // Check for minified format keys
      if (parsed.s !== undefined && parsed.r !== undefined && parsed.m !== undefined && parsed.v !== undefined) {
        return {
          sender: parsed.s,
          recipient: parsed.r,
          message: parsed.m,
          vibe: parsed.v
        };
      }
      // If by chance we compressed non-minified data in a previous version
      return parsed as WishData;
    }

    // 2. Fallback: Try Legacy Base64 Decoding (Old Format)
    // This ensures old links still work if they were created before this update
    try {
        const json = decodeURIComponent(atob(hash));
        return JSON.parse(json);
    } catch {
        return null;
    }

  } catch (e) {
    console.error("Decoding failed", e);
    return null;
  }
};

export interface StoredWish extends WishData {
  id: string;
  date: string;
}

const STORAGE_KEY = 'core_memory_wishes';

export const saveWishToHistory = (data: WishData) => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    const history: StoredWish[] = existing ? JSON.parse(existing) : [];
    
    const newWish: StoredWish = {
      ...data,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    
    // Prepend to history, keep max 50
    const updatedHistory = [newWish, ...history].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  } catch (e) {
    console.error("Failed to save wish locally", e);
  }
};

export const getWishHistory = (): StoredWish[] => {
  try {
    const existing = localStorage.getItem(STORAGE_KEY);
    return existing ? JSON.parse(existing) : [];
  } catch (e) {
    return [];
  }
};