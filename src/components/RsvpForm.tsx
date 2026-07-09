import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Users, MessageSquare, Coffee, Sparkles, Send, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RsvpEntry, RsvpStatus } from '../types';

// Simple Confetti particle system on HTML Canvas
interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<RsvpStatus>('attending');
  const [guestsCount, setGuestsCount] = useState(1);
  const [prayerWish, setPrayerWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);


  // Run Canvas Confetti loop when submission is successful
  useEffect(() => {
    if (hasSubmitted && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = 300;

      const colors = ['#b38f4d', '#eadbba', '#d4af37', '#fcfbfa', '#f5eedc'];
      const particles: Particle[] = [];

      // Create particles
      for (let i = 0; i < 80; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -100 - 10,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 4 - 2,
          speedY: Math.random() * 3 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 4 - 2
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;

        particles.forEach(p => {
          p.y += p.speedY;
          p.x += p.speedX;
          p.rotation += p.rotationSpeed;

          if (p.y < canvas.height) {
            active = true;
          }

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          // draw small confetti rectangles or circles
          if (p.size % 2 === 0) {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        });

        if (active) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [hasSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);

    const newRsvp: RsvpEntry = {
      id: 'rsvp-' + Date.now(),
      name: name.trim(),
      status,
      guestsCount: status === 'attending' ? guestsCount : 0,
      prayerWish: prayerWish.trim() || undefined,
      timestamp: new Date().toISOString()
    };

    // Small timeout for premium loading animation
    setTimeout(() => {
      // In the future, this is where you'd send data to Google Sheets
      setIsSubmitting(false);
      setHasSubmitted(true);
    }, 1200);
  };

  const resetForm = () => {
    setName('');
    setStatus('attending');
    setGuestsCount(1);
    setPrayerWish('');
    setHasSubmitted(false);
  };

  return (
    <div id="rsvp-and-wishes-section" className="w-full max-w-2xl px-4 mt-20">
      
      {/* RSVP HEADER */}
      <div className="text-center mb-8 px-4">
        <p className="font-serif text-lg md:text-xl text-stone-600 italic mb-6 max-w-xl mx-auto leading-relaxed">
          Your presence will be a treasured blessing as we gather with family and friends to celebrate this sacred milestone.
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-stone-800 font-semibold mt-2">Kindly Respond (RSVP)</h2>
        <p className="font-serif text-sm md:text-base italic text-gold-600 mt-2">before 10th August 2026</p>
        <div className="w-16 h-[1px] bg-gold-300 mx-auto mt-4" />
      </div>

      <div className="bg-cream paper-texture rounded-xl border border-gold-300/30 gold-glow overflow-hidden relative">
        <AnimatePresence mode="wait">
          {!hasSubmitted ? (
            <motion.form
              key="rsvp-form-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="p-6 md:p-10 space-y-6"
            >
              {/* Full Name field */}
              <div className="space-y-2">
                <label className="font-serif text-base md:text-lg text-stone-700 font-medium block">
                  Your Full Name <span className="text-gold-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mr. & Mrs. Perera"
                  className="w-full rounded-md border border-stone-300/70 bg-white/95 px-4 py-3 font-sans text-base text-stone-800 placeholder-stone-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-colors"
                />
              </div>

              {/* Attendance Selection */}
              <div className="space-y-2">
                <label className="font-serif text-base md:text-lg text-stone-700 font-medium block">
                  Will you join us in Negombo? <span className="text-gold-600">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setStatus('attending')}
                    className={`rounded-md border py-4 px-4 font-sans text-sm md:text-base font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                      status === 'attending'
                        ? 'border-gold-500 bg-gold-50 text-gold-700 font-bold'
                        : 'border-stone-300/70 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <CheckCircle className={`h-4 w-4 ${status === 'attending' ? 'text-gold-600' : 'text-stone-300'}`} />
                    <span>Joyfully Accepts</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStatus('declined')}
                    className={`rounded-md border py-4 px-4 font-sans text-sm md:text-base font-semibold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                      status === 'declined'
                        ? 'border-gold-500 bg-gold-50 text-gold-700 font-bold'
                        : 'border-stone-300/70 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${status === 'declined' ? 'border-gold-600 text-gold-600' : 'border-stone-300 text-transparent'}`}>
                      {status === 'declined' && <div className="h-1.5 w-1.5 rounded-full bg-gold-600" />}
                    </div>
                    <span>Regretfully Declines</span>
                  </button>
                </div>
              </div>

              {status === 'attending' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {/* Guests count */}
                  <div className="space-y-2">
                    <label className="font-serif text-base md:text-lg text-stone-700 font-medium flex items-center gap-2">
                      <Users className="h-5 w-5 text-gold-500" />
                      <span>Number of Guests Attending</span>
                    </label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuestsCount(num)}
                          className={`h-11 w-11 rounded-full font-sans text-base font-bold transition-all ${
                            guestsCount === num
                              ? 'bg-gold-600 text-white shadow-sm shadow-gold-600/35'
                              : 'bg-white border border-stone-300 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 rounded-md border border-stone-300/70 bg-white px-3 py-2 text-center font-sans text-base text-stone-800 placeholder-stone-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-colors"
                        title="Custom Guest Count"
                      />
                    </div>
                  </div>


                </motion.div>
              )}

              {/* Congratulatory message / prayer */}
              <div className="space-y-2">
                <label className="font-serif text-base md:text-lg text-stone-700 font-medium flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-gold-500" />
                  <span>Send a Blessing or Message of Love for Ayaan (Optional)</span>
                </label>
                <textarea
                  rows={4}
                  value={prayerWish}
                  onChange={(e) => setPrayerWish(e.target.value)}
                  placeholder="Write a warm prayer, message, or blessing for Ayaan on his First Communion..."
                  className="w-full rounded-md border border-stone-300/70 bg-white/95 px-4 py-3 font-sans text-base text-stone-800 placeholder-stone-400 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-gold-gradient hover:opacity-95 text-white font-sans text-sm md:text-base uppercase tracking-[0.2em] font-semibold py-4 transition-opacity duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(179,143,77,0.3)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Send RSVP & Blessings</span>
                  </>
                )}
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="rsvp-success-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="p-8 md:p-12 text-center flex flex-col items-center justify-center relative min-h-[350px]"
            >
              <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none w-full h-full" />
              
              <div className="h-16 w-16 bg-gold-100/60 text-gold-600 rounded-full flex items-center justify-center mb-6 gold-glow-strong">
                <Sparkles className="h-8 w-8 animate-bounce" />
              </div>

              <h3 className="font-display text-xl md:text-2xl text-stone-900 font-bold tracking-wider">
                Thank You So Much
              </h3>
              
              <p className="font-serif italic text-gold-600 text-base md:text-lg mt-2">
                Your response has been treasured.
              </p>

              <p className="font-sans text-sm md:text-base text-stone-500 mt-4 max-w-md leading-relaxed">
                {status === 'attending' 
                  ? `We are so delighted that you will join us for Ayaan's First Holy Communion on 29th of August 2026. Your presence is a true blessing!`
                  : `We are sorry you won't be able to celebrate with us in person, but we truly appreciate your lovely blessings and prayers for Ayaan.`}
              </p>

              <button
                onClick={resetForm}
                className="mt-8 rounded-full border border-gold-300/40 hover:bg-gold-50/50 text-gold-700 px-6 py-2 text-xs font-sans font-semibold tracking-wide transition-colors"
              >
                Submit another response
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>



    </div>
  );
}
