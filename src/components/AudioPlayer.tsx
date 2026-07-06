import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioPlayer({ autoPlayTrigger }: { autoPlayTrigger: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalIdRef = useRef<number | null>(null);
  const currentStepRef = useRef(0);

  // Soothing sacred harp/piano chords
  // C-maj7, Am9, F-maj7, G6
  const progressions = [
    [261.63, 329.63, 392.00, 493.88], // C, E, G, B (Cmaj7)
    [220.00, 261.63, 329.63, 440.00], // A, C, E, A (Am)
    [174.61, 261.63, 349.23, 440.00], // F, C, F, A (Fmaj7)
    [196.00, 246.94, 293.66, 392.00], // G, B, D, G (G6)
  ];

  const initAudio = () => {
    if (!audioContextRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioContextRef.current = new AudioContextClass();
      }
    }
    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playHarpPluck = (frequency: number, time: number) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Pluck sound: combination of a sine wave (fundamental) and triangle wave (overtones)
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, time);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(frequency * 1.5, time); // Subtle fifth overtone

    // Volume envelope
    gainNode.gain.setValueAtTime(0.05, time);
    // Smooth decay to mimic physical string pluck
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 2.5);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start & stop
    osc1.start(time);
    osc1.stop(time + 2.6);
    osc2.start(time);
    osc2.stop(time + 2.6);
  };

  const startMusic = () => {
    initAudio();
    if (!audioContextRef.current) return;

    setIsPlaying(true);

    let step = 0;
    const tempo = 450; // ms per beat

    const runSeq = () => {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'suspended') return;

      const chordIndex = Math.floor(step / 8) % progressions.length;
      const noteIndex = step % 4;
      const notes = progressions[chordIndex];
      const freq = notes[noteIndex];

      const now = ctx.currentTime;
      
      // Arpeggiate
      playHarpPluck(freq, now);

      // Add a subtle lower harmony chord on the first beat of each chord
      if (step % 8 === 0) {
        playHarpPluck(notes[0] / 2, now); // Octave below root
        playHarpPluck(notes[2] / 2, now + 0.1); // Harmony fifth below
      }

      step++;
      currentStepRef.current = step;
    };

    // Run first step immediately
    runSeq();
    
    const interval = window.setInterval(runSeq, tempo);
    intervalIdRef.current = interval;
  };

  const stopMusic = () => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
    setIsPlaying(false);
  };

  const togglePlayback = () => {
    initAudio();
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Listen to external triggers (e.g. clicking Open Envelope)
  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      // Small delay for natural feel
      const timer = setTimeout(() => {
        startMusic();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlayTrigger]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, []);

  return (
    <div id="ambient-audio-player" class="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <button
        onClick={togglePlayback}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-gold-300/60 bg-cream text-gold-600 gold-glow hover:bg-gold-50 hover:text-gold-700 transition-all duration-300 shadow-md group active:scale-95"
        title={isPlaying ? 'Mute Music' : 'Play Sacred Ambient Music'}
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
          <span className="tracking-wide">Harp Ambient</span>
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
