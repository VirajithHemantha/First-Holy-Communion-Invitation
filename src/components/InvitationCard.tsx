import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Share2, Camera, Trash2, ChevronRight, Navigation } from 'lucide-react';
import { motion } from 'motion/react';

interface InvitationCardProps {
  onRsvpClick: () => void;
}

export default function InvitationCard({ onRsvpClick }: InvitationCardProps) {
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const savedPhoto = localStorage.getItem('ayaan_communion_photo');
    if (savedPhoto) {
      setPhoto(savedPhoto);
      return;
    }

    const testImage = (url: string) => {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    const findImage = async () => {
      const paths = ['/ayaan.jpg', '/ayaan.png', '/ayaan.jpeg', '/ayaan.webp'];
      for (const path of paths) {
        const exists = await testImage(path);
        if (exists) {
          setPhoto(path);
          break;
        }
      }
    };

    findImage();
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPhoto(base64String);
        localStorage.setItem('ayaan_communion_photo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    localStorage.removeItem('ayaan_communion_photo');
  };

  const targetDate = new Date('2026-08-29T18:30:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setTimeLeft(prev => ({ ...prev, isCompleted: true }));
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isCompleted: false
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);



  return (
    <div id="invitation-details-container" className="flex flex-col items-center w-full">
      
      {/* ULTRA PREMIUM CARD FRONT */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[800px] bg-[#fdfbf7] p-4 md:p-8 rounded-sm shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_0_20px_rgba(179,143,77,0.05)] relative overflow-hidden"
      >
        {/* Subtle floral watermark in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none flex items-center justify-center">
          <svg viewBox="0 0 200 200" className="w-[120%] h-[120%] fill-gold-900 animate-[spin_120s_linear_infinite]">
             <path d="M100,20 C120,60 180,80 180,100 C180,120 120,140 100,180 C80,140 20,120 20,100 C20,80 80,60 100,20 Z" />
             <path d="M100,40 C110,70 160,90 160,100 C160,110 110,130 100,160 C90,130 40,110 40,100 C40,90 90,70 100,40 Z" transform="rotate(45 100 100)" />
          </svg>
        </div>

        {/* Ultra Premium Ornate Inner Border Frame */}
        <div className="relative w-full h-full p-8 md:p-14 text-center overflow-hidden flex flex-col items-center">
          
          {/* Outer Thin Border */}
          <div className="absolute inset-2 border-[1px] border-gold-300/50 pointer-events-none" />
          
          {/* Inner Thicker Border */}
          <div className="absolute inset-3 border-[2px] border-gold-200/40 pointer-events-none" />
          
          {/* Elegant SVG Corner Filigrees */}
          {/* Top Left */}
          <svg className="absolute top-4 left-4 w-12 h-12 text-gold-400 pointer-events-none" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 0 0 L 100 0 C 80 20 20 80 0 100 Z" fill="currentColor" opacity="0.1" stroke="none" />
            <path d="M 10 10 L 50 10 C 30 20 20 30 10 50 Z" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
          {/* Top Right */}
          <svg className="absolute top-4 right-4 w-12 h-12 text-gold-400 pointer-events-none rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 0 0 L 100 0 C 80 20 20 80 0 100 Z" fill="currentColor" opacity="0.1" stroke="none" />
            <path d="M 10 10 L 50 10 C 30 20 20 30 10 50 Z" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
          {/* Bottom Right */}
          <svg className="absolute bottom-4 right-4 w-12 h-12 text-gold-400 pointer-events-none rotate-180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 0 0 L 100 0 C 80 20 20 80 0 100 Z" fill="currentColor" opacity="0.1" stroke="none" />
            <path d="M 10 10 L 50 10 C 30 20 20 30 10 50 Z" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>
          {/* Bottom Left */}
          <svg className="absolute bottom-4 left-4 w-12 h-12 text-gold-400 pointer-events-none -rotate-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M 0 0 L 100 0 C 80 20 20 80 0 100 Z" fill="currentColor" opacity="0.1" stroke="none" />
            <path d="M 10 10 L 50 10 C 30 20 20 30 10 50 Z" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </svg>

          {/* Delicate Cross Ornament */}
          <div className="mb-10 text-gold-600 flex justify-center relative z-10 w-full drop-shadow-[0_2px_4px_rgba(179,143,77,0.2)]">
            <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <path d="M 50 15 L 50 85 M 25 35 L 75 35" strokeWidth="2" />
              <circle cx="50" cy="35" r="12" strokeWidth="1" strokeDasharray="2 3" />
              <path d="M 50 15 L 56 25 L 50 40 L 44 25 Z" fill="currentColor" opacity="0.15" stroke="none" />
            </svg>
          </div>

          {/* Scripture Quote */}
          <div className="max-w-md mx-auto mb-14 relative z-10">
            <p className="font-serif italic text-lg md:text-2xl text-stone-600/90 leading-[1.8] tracking-wide">
              “I am the living bread that came down from heaven. Whoever eats this bread will live forever.”
            </p>
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-8 h-[1px] bg-gold-300/60" />
              <p className="font-display text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-gold-700 font-semibold">
                John 6:51
              </p>
              <div className="w-8 h-[1px] bg-gold-300/60" />
            </div>
          </div>

          {/* Majestic Portrait Area */}
          <div className="my-14 flex flex-col items-center relative z-10">
            {/* Subtle glow behind the portrait */}
            <div className="absolute inset-0 bg-gold-400/10 blur-3xl rounded-full scale-110 pointer-events-none" />
            
            <div className="relative group w-56 h-[320px] md:w-[300px] md:h-[420px] rounded-[120px] border-[3px] border-gold-200 p-2.5 bg-white shadow-[0_15px_50px_-10px_rgba(179,143,77,0.25)] transition-all duration-700 hover:shadow-[0_25px_60px_-10px_rgba(179,143,77,0.35)] hover:-translate-y-2">
              <div className="absolute -inset-2 border border-gold-300/30 rounded-[130px] pointer-events-none" />
              {photo ? (
                <div className="relative w-full h-full rounded-[105px] overflow-hidden">
                  <img
                    src={photo}
                    alt="Ayaan Franchesco"
                    className="w-full h-full object-cover rounded-[105px] transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm rounded-[105px]">
                    <label className="cursor-pointer bg-white/95 text-stone-800 rounded-full px-5 py-2.5 shadow-xl hover:bg-gold-50 hover:text-gold-700 transition-all text-xs font-sans font-medium flex items-center gap-2">
                      <Camera className="h-4 w-4" /> Change Portrait
                      <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                    </label>
                    <button
                      onClick={handleRemovePhoto}
                      className="bg-red-500/95 text-white rounded-full px-5 py-2.5 shadow-xl hover:bg-red-600 transition-all text-xs font-sans font-medium flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full rounded-[105px] bg-gold-50/70 flex flex-col items-center justify-center p-6 text-center border-[1.5px] border-dashed border-gold-300/50 hover:bg-gold-50 transition-colors">
                  <Camera className="w-10 h-10 text-gold-400/70 mb-4" />
                  <span className="font-display text-[11px] uppercase tracking-[0.25em] text-gold-700 font-semibold block mb-2">Upload Portrait</span>
                  <span className="font-sans text-[10px] text-stone-400 max-w-[120px] leading-relaxed block">
                    Click to add Ayaan's beautiful photo here
                  </span>
                  <label className="absolute inset-0 cursor-pointer flex items-center justify-center">
                    <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Core Invitation Text */}
          <div className="space-y-7 text-stone-700 max-w-2xl mx-auto relative z-10">
            <p className="font-serif italic text-xl md:text-2xl text-gold-700 tracking-wide">
              By the grace of God,
            </p>
            <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.35em] text-stone-500 font-medium">
              We are delighted to invite you to celebrate the
            </p>
            
            <div className="relative py-4 flex justify-center w-full">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-stone-900 tracking-[0.1em] drop-shadow-sm text-center ml-[0.1em]">
                FIRST HOLY COMMUNION
              </h2>
            </div>
            
            <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.35em] text-stone-500 font-medium">
              of our beloved son,
            </p>

            <h1 className="font-cursive text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[7rem] text-gold-600 py-6 px-2 tracking-wide drop-shadow-[0_2px_4px_rgba(179,143,77,0.15)] leading-[1.2]">
              Ayaan Franchesco
            </h1>

            <p className="font-serif italic text-lg md:text-xl text-stone-600 max-w-sm mx-auto leading-relaxed">
              as he received the Holy Eucharist for the first time.
            </p>
          </div>

          {/* Majestic Divider */}
          <div className="flex items-center justify-center gap-6 my-16 relative z-10 w-full max-w-md mx-auto">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
            <svg className="w-8 h-8 text-gold-500" viewBox="0 0 100 100" fill="currentColor">
              <path d="M 50 10 L 60 40 L 90 50 L 60 60 L 50 90 L 40 60 L 10 50 L 40 40 Z" />
            </svg>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-gold-300 to-transparent" />
          </div>

          {/* Date, Time & Venue Block - Refined Typography */}
          <p className="font-serif text-xl md:text-2xl text-stone-600 italic mt-12 mb-8 text-center relative z-10">
            Please join us;
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-2xl mx-auto text-center md:text-left relative z-10 px-4">
            <div className="flex flex-col items-center md:items-end md:pr-14 md:border-r border-gold-300/40 relative">
              <span className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-700 font-bold mb-4 block">When</span>
              <p className="font-serif text-2xl md:text-3xl text-stone-900 mb-1">Saturday</p>
              <p className="font-display text-3xl md:text-4xl text-gold-600 my-2 font-medium tracking-[0.15em] drop-shadow-sm">29 . 08 . 26</p>
              <span className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-700 font-bold mt-8 mb-3 block">What Time</span>
              <p className="font-serif text-xl text-stone-600/90 italic">At 06.30 PM</p>
            </div>

            <div className="flex flex-col items-center md:items-start md:pl-14">
              <span className="font-display text-[11px] uppercase tracking-[0.4em] text-gold-700 font-bold mb-4 block">Where</span>
              <p className="font-serif text-2xl md:text-3xl text-stone-900 mb-2">Grandeeza Hotel</p>
              <p className="font-serif text-xl text-stone-600/90 italic leading-relaxed mt-2">
                772, Colombo Road,<br/>
                Kurana, Negombo
              </p>
            </div>
          </div>

          {/* Host Signatures */}
          <div className="mt-24 mb-6 relative z-10">
            <p className="font-display text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-5">With Love & Blessings</p>
            <p className="font-serif text-stone-800 text-lg sm:text-xl md:text-3xl italic tracking-wide whitespace-nowrap">
              Gayan Perera & Irani Jayamanna
            </p>
          </div>

        </div>
      </motion.div>



      {/* COUNTDOWN TIMER SECTION */}
      <div className="w-full max-w-3xl mt-24 text-center px-4">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-gold-300/50" />
          <h3 className="font-display text-xs uppercase tracking-[0.3em] text-gold-600 font-semibold">
            Anticipating the Day
          </h3>
          <div className="w-12 h-[1px] bg-gold-300/50" />
        </div>
        
        {timeLeft.isCompleted ? (
          <div className="bg-[#fdfbf7] border border-gold-200/50 p-8 rounded-sm shadow-sm max-w-xl mx-auto">
            <p className="font-serif text-xl text-gold-700 italic">"The sacred day has arrived. Thank you for your blessings!"</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
            {[
              { label: 'Days', val: timeLeft.days },
              { label: 'Hours', val: timeLeft.hours },
              { label: 'Minutes', val: timeLeft.minutes },
              { label: 'Seconds', val: timeLeft.seconds },
            ].map((unit, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white border border-gold-200/60 rounded-full flex flex-col items-center justify-center shadow-[0_10px_30px_-10px_rgba(179,143,77,0.15)] mb-3 relative overflow-hidden">
                  {/* Subtle inner ring */}
                  <div className="absolute inset-1 border border-gold-100 rounded-full" />
                  <span className="font-display text-2xl md:text-4xl font-normal text-stone-800">
                    {String(unit.val).padStart(2, '0')}
                  </span>
                </div>
                <span className="font-display text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-stone-500">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MAP & LOCATION INTEGRATION */}
      <div className="w-full max-w-4xl mt-32 px-4 mb-10">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="w-16 h-[1px] bg-gold-300/50" />
          <h2 className="font-display text-lg md:text-xl uppercase tracking-[0.2em] text-stone-800 font-medium">The Venue</h2>
          <div className="w-16 h-[1px] bg-gold-300/50" />
        </div>

        <div className="bg-[#fdfbf7] p-2 rounded-sm border border-gold-200/40 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)]">
          <div className="border border-gold-300/30 flex flex-col lg:flex-row h-auto lg:h-[400px]">
            {/* Left Column: Details */}
            <div className="w-full lg:w-2/5 p-10 md:p-14 flex flex-col justify-center items-center lg:items-start text-center lg:text-left bg-white/50 border-b lg:border-b-0 lg:border-r border-gold-300/30">
              <div className="h-12 w-12 bg-gold-50 rounded-full flex items-center justify-center mb-6">
                <MapPin className="h-5 w-5 text-gold-600" />
              </div>
              <h3 className="font-serif text-3xl text-stone-900 mb-3">Grandeeza Hotel</h3>
              <p className="font-sans text-sm text-stone-500 leading-relaxed mb-8 max-w-xs">
                772, Colombo Road, <br/>Kurana, Negombo, <br/>Sri Lanka
              </p>
              <a
                href="https://maps.google.com/?q=Grandeeza+Hotel+Colombo+Road+Negombo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-stone-900 text-white px-8 py-3.5 rounded-sm text-[10px] font-display uppercase tracking-[0.2em] font-semibold hover:bg-gold-700 transition-colors duration-300"
              >
                <Navigation className="h-3 w-3" />
                Live Directions
              </a>
            </div>

            {/* Right Column: Custom Visual Map representation */}
            <div className="w-full lg:w-3/5 h-64 lg:h-full relative bg-[#f7f5f0] overflow-hidden flex items-center justify-center">
              {/* Elegant SVG Mock Map Design */}
              <svg className="absolute inset-0 w-full h-full text-stone-300/40" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M -10 40 Q 30 20 60 70 T 110 80" stroke="#d4af37" strokeWidth="0.5" fill="none" strokeDasharray="3 3" />
                <path d="M 15 -10 L 25 110" stroke="#e5e0d8" strokeWidth="1.5" />
                <path d="M 45 -10 L 55 110" stroke="#e5e0d8" strokeWidth="3" />
                <path d="M 75 -10 L 80 110" stroke="#e5e0d8" strokeWidth="1" />
                <path d="M -10 60 L 110 50" stroke="#e5e0d8" strokeWidth="2" />
                <path d="M -10 25 L 110 20" stroke="#b38f4d" strokeWidth="6" opacity="0.2" /> {/* Colombo Rd Accent */}
              </svg>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-gold-400 opacity-20 animate-ping" />
                  <div className="relative h-6 w-6 rounded-full bg-stone-900 border-[3px] border-white flex items-center justify-center shadow-lg">
                    <span className="text-[10px] text-gold-400 font-bold mb-0.5">†</span>
                  </div>
                </div>
                <div className="mt-3 bg-white/90 backdrop-blur-sm border border-gold-200 px-4 py-1.5 rounded-sm shadow-sm">
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-stone-800 font-medium">Grandeeza</span>
                </div>
              </div>
              
              {/* Landmark tags */}
              <span className="absolute top-6 left-8 text-[9px] font-mono text-stone-400 uppercase tracking-widest bg-white/50 px-2 py-1">Negombo Lagoon</span>
              <span className="absolute bottom-6 right-8 text-[9px] font-mono text-stone-400 uppercase tracking-widest bg-white/50 px-2 py-1">Colombo Rd</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
