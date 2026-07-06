import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, Award, Sparkles, Heart } from 'lucide-react';
import Envelope from './components/Envelope';
import InvitationCard from './components/InvitationCard';
import RsvpForm from './components/RsvpForm';
import AudioPlayer from './components/AudioPlayer';

export default function App() {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [autoPlayAudio, setAutoPlayAudio] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    setAutoPlayAudio(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col font-sans select-none selection:bg-gold-100 selection:text-gold-900 overflow-x-hidden">
      
      {/* Background Audio Player (synthesized client-side) */}
      <AudioPlayer autoPlayTrigger={autoPlayAudio} />

      <AnimatePresence mode="wait">
        {!isEnvelopeOpen ? (
          <motion.div
            key="envelope-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-50"
          >
            <Envelope onOpen={handleOpenEnvelope} />
          </motion.div>
        ) : (
          <motion.div
            key="invitation-screen"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full flex flex-col items-center"
          >
            {/* STUNNING FLOATING NAVIGATION HEADER */}
            <header className="sticky top-0 w-full bg-cream/80 backdrop-blur-md border-b border-gold-200/20 py-4 px-6 z-40 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="font-display text-xs tracking-widest text-gold-600 font-bold">† A.F.P</span>
              </div>
              
              <nav className="flex items-center gap-6 font-display text-[10px] md:text-xs uppercase tracking-widest font-semibold text-stone-500">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-gold-600 transition-colors"
                >
                  Invitation
                </button>
                <button
                  onClick={() => scrollToSection('rsvp-and-wishes-section')}
                  className="hover:text-gold-600 transition-colors"
                >
                  RSVP
                </button>
              </nav>

              <button
                onClick={() => scrollToSection('rsvp-and-wishes-section')}
                className="rounded-full bg-gold-gradient hover:opacity-90 text-white font-sans text-[10px] uppercase tracking-wider px-4 py-1.5 font-bold shadow-sm cursor-pointer transition-opacity"
              >
                RSVP Now
              </button>
            </header>

            {/* MAIN COVER HERO OVERVIEW BANNER */}
            <section className="relative w-full bg-[#FAF8F5] paper-texture flex flex-col items-center text-center px-4 pt-16 pb-12 overflow-hidden border-b border-gold-200/20">
              {/* Floral corner decor */}
              <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-gold-300/20 m-6 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-gold-300/20 m-6 rounded-tr-lg" />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="max-w-2xl flex flex-col items-center z-10"
              >
                <span className="font-display text-[10px] uppercase tracking-[0.3em] text-gold-600 font-bold mb-3">
                  Sacred Family Invitation
                </span>
                
                <h1 className="font-serif text-3xl md:text-5xl font-light text-stone-900 tracking-[0.1em] leading-tight">
                  The First Holy Communion
                </h1>
                
                <p className="font-serif italic text-base text-stone-500 mt-2">
                  of
                </p>
                
                <h2 className="font-cursive text-5xl md:text-7xl text-gold-600 py-4 tracking-wide">
                  Ayaan Franchesco Perera
                </h2>

                <div className="w-12 h-[1px] bg-gold-300 my-4" />
                
                <p className="font-sans text-xs uppercase tracking-[0.18em] text-stone-400 font-semibold mb-2">
                  August 29, 2026 • Negombo
                </p>
              </motion.div>
            </section>

            {/* INVITATION CONTENT MODULES */}
            <main className="w-full max-w-4xl px-4 py-12 flex flex-col items-center gap-16">
              
              {/* Detailed Invitation Card */}
              <InvitationCard onRsvpClick={() => scrollToSection('rsvp-and-wishes-section')} />

              {/* Rsvp Form segment */}
              <RsvpForm />

            </main>

            {/* TRADITIONAL SACRAMENTAL FOOTER */}
            <footer className="w-full bg-[#181615] text-[#eadbba] py-16 px-6 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
              
              <div className="max-w-md mx-auto space-y-6">
                {/* Traditional cross vector */}
                <div className="text-gold-500 flex justify-center">
                  <svg className="w-8 h-8 opacity-60" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M 46 15 L 54 15 L 54 38 L 76 38 L 76 46 L 54 46 L 54 85 L 46 85 L 46 46 L 24 46 L 24 38 L 46 38 Z" />
                  </svg>
                </div>

                <h3 className="font-serif text-xl italic text-gold-200">
                  “May God bless you abundantly on your First Holy Communion.”
                </h3>

                <p className="font-sans text-xs text-stone-500 leading-relaxed max-w-sm mx-auto">
                  Thank you for keeping Ayaan Franchesco Perera in your loving prayers as he embarks on this holy and lifelong path of faith.
                </p>

                <div className="pt-4 border-t border-stone-800/80 max-w-xs mx-auto">
                  <p className="font-display text-[9px] uppercase tracking-[0.2em] text-stone-500">
                    Ayaan's First Holy Communion • 2026
                  </p>
                </div>
              </div>

              {/* Back to Top Quick Button */}
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="mt-10 mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-stone-800 bg-stone-900 text-gold-400 hover:text-gold-200 transition-all shadow-md active:scale-95 cursor-pointer"
                title="Scroll to Top"
              >
                <ChevronUp className="h-5 w-5" />
              </button>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

