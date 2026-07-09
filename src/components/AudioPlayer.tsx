import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ autoPlayTrigger }: { autoPlayTrigger: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element only once
    if (!audioRef.current) {
      audioRef.current = new Audio("/Pentatonix - Hallelujah (Official Video).mp3");
      audioRef.current.loop = true;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.error("Audio playback failed:", err));
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlayback = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      playMusic();
    }
  };

  // Listen to external triggers (e.g. clicking Open Envelope)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      // Small delay for natural feel
      const timer = setTimeout(() => {
        playMusic();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlayTrigger, isPlaying]);

  return (
    <div id="ambient-audio-player" className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        onClick={togglePlayback}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/60 bg-cream text-gold-600 gold-glow hover:bg-gold-50 hover:text-gold-700 transition-all duration-300 shadow-md group active:scale-95"
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        {isPlaying ? (
          <div className="relative">
            <Volume2 className="h-5 w-5 animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
            </span>
          </div>
        ) : (
          <VolumeX className="h-5 w-5 text-stone-400" />
        )}
      </button>

      {isPlaying && (
        <div className="flex h-8 items-center gap-1.5 rounded-full bg-cream/90 backdrop-blur-sm border border-gold-200/50 px-3 py-1 shadow-sm text-xs text-gold-700 font-serif font-medium">
          <Music className="h-3 w-3 animate-bounce" />
          <span className="tracking-wide">Hallelujah</span>
          {/* Animated Equalizer Waveform */}
          <div className="flex items-end gap-0.5 h-3">
            <div className="w-0.5 bg-gold-500 h-2 animate-[pulse_1s_infinite_100ms]" />
            <div className="w-0.5 bg-gold-400 h-3 animate-[pulse_0.8s_infinite_300ms]" />
            <div className="w-0.5 bg-gold-500 h-1.5 animate-[pulse_1.2s_infinite_200ms]" />
            <div className="w-0.5 bg-gold-300 h-2.5 animate-[pulse_0.9s_infinite_400ms]" />
          </div>
        </div>
      )}
    </div>
  );
}
