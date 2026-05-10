import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, Clock, MapPin, Sparkles, Navigation, Globe, Rewind, FastForward, Heart, Share2 } from 'lucide-react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost, BtnHighlight, BtnSecondary } from '../components/Buttons';

const TripReplayPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStop, setCurrentStop] = useState(0);

  const stops = [
    { title: 'The Arrival', loc: 'Narita Airport', time: '10:00 AM', emoji: '✈️', desc: 'The scent of Japan fills the air for the first time.' },
    { title: 'Neon Nights', loc: 'Shinjuku', time: '08:00 PM', emoji: '🏮', desc: 'Lost in a sea of lights and stories.' },
    { title: 'Zen Moments', loc: 'Kyoto Temples', time: '02:00 PM', emoji: '⛩️', desc: 'Time stands still in the gardens of history.' },
    { title: 'Mountain Mist', loc: 'Mount Fuji', time: '06:00 AM', emoji: '🏔️', desc: 'Waking up with the giants of the East.' },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const nextP = p + 1;
          if (nextP % 25 === 0) setCurrentStop(s => (s + 1) % stops.length);
          return nextP;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="animate-editorial-up space-y-16 pb-24">
      {/* Editorial Header */}
      <div className="text-center space-y-6 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#D4B2A7]/30 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4B2A7]"
        >
          <Rewind size={12} /> Expedition Flashbacks
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-black text-[#2F2A2A] tracking-tighter editorial-title leading-none">
          Relive the <span className="italic font-normal text-[#D4B2A7]">Story</span>
        </h1>
        <p className="text-xl text-[#6E6A6A] font-medium max-w-2xl mx-auto leading-relaxed italic">
          "Memory is the diary that we all carry about with us." Step back into your favorite moments.
        </p>
      </div>

      {/* Cinematic Flashback Player */}
      <div className="relative group rounded-[80px] overflow-hidden shadow-[0_50px_100px_rgba(212,178,167,0.3)] border-8 border-white bg-[#2F2A2A]">
         {/* The Stage */}
         <div className="h-[600px] relative overflow-hidden flex items-center justify-center">
            {/* Visual Narrative Layer */}
            <AnimatePresence mode="wait">
               <motion.div
                 key={currentStop}
                 initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                 animate={{ opacity: 0.6, scale: 1, filter: 'blur(0px)' }}
                 exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                 transition={{ duration: 2, ease: "easeInOut" }}
                 className="absolute inset-0 bg-cover bg-center grayscale-[30%]"
                 style={{ backgroundImage: `url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2070')` }}
               />
            </AnimatePresence>
            
            {/* Soft Sunset Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2F2A2A] via-transparent to-[#2F2A2A]/20" />
            
            {/* Animated Path System */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
               <motion.path 
                 d="M -100 300 Q 400 100 800 400 T 1300 200" 
                 fill="none" 
                 stroke="white" 
                 strokeWidth="2" 
                 strokeDasharray="10 10"
                 animate={{ strokeDashoffset: [0, -100] }}
                 transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
               />
            </svg>

            {/* Current Memoir Card (Floating) */}
            <div className="relative z-10 w-full max-w-2xl px-12">
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStop}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    className="space-y-10 text-center"
                  >
                     <div className="w-40 h-40 bg-white/10 backdrop-blur-3xl rounded-full mx-auto flex items-center justify-center border border-white/20 shadow-2xl">
                        <span className="text-[100px] drop-shadow-2xl">{stops[currentStop].emoji}</span>
                     </div>
                     <div className="space-y-4">
                        <p className="text-[12px] font-black uppercase tracking-[0.6em] text-[#F3D7CA]">Chapter {currentStop + 1}</p>
                        <h2 className="text-6xl md:text-8xl font-black text-white editorial-title tracking-tighter leading-none">{stops[currentStop].title}</h2>
                        <div className="flex items-center justify-center gap-6">
                           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                              <MapPin size={14} className="text-[#D4B2A7]" /> {stops[currentStop].loc}
                           </div>
                           <div className="w-1 h-1 bg-white/20 rounded-full" />
                           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                              <Clock size={14} className="text-[#D4B2A7]" /> {stops[currentStop].time}
                           </div>
                        </div>
                     </div>
                     <p className="text-xl text-white/80 font-medium italic leading-relaxed max-w-lg mx-auto">
                        "{stops[currentStop].desc}"
                     </p>
                  </motion.div>
               </AnimatePresence>
            </div>

            {/* Cinematic Perspective Badge */}
            <div className="absolute top-12 left-12">
               <div className="px-8 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center gap-4 shadow-2xl">
                  <div className="w-3 h-3 bg-[#D4B2A7] rounded-full animate-pulse shadow-[0_0_15px_#D4B2A7]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Playback Mode</span>
               </div>
            </div>
         </div>

         {/* Flashback Controller Dashboard */}
         <div className="bg-white p-12 space-y-12 border-t border-[#EADFD8]">
            {/* Progress Visualization */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black text-[#D4B2A7] uppercase tracking-[0.5em]">Timeline Progression</p>
                  <p className="text-[10px] font-black text-[#6E6A6A] uppercase tracking-[0.5em]">2025 Edition</p>
               </div>
               <div className="h-4 w-full bg-[#F8F4F1] rounded-full overflow-hidden shadow-inner relative cursor-pointer" onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  setProgress((x / rect.width) * 100);
               }}>
                  <motion.div 
                    className="h-full rose-gradient rounded-full shadow-lg shadow-[#D4B2A7]/30"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Scene Markers */}
                  {[0, 25, 50, 75, 100].map(m => (
                    <div key={m} className={`absolute top-0 bottom-0 w-1 bg-white/40 z-10`} style={{ left: `${m}%` }} />
                  ))}
               </div>
            </div>

            {/* Interaction Matrix */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="flex items-center gap-10">
                  <button className="text-[#6E6A6A] hover:text-[#D4B2A7] transition-all transform hover:scale-125"><SkipBack size={32} strokeWidth={1.5} /></button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-24 h-24 rounded-full rose-gradient flex items-center justify-center text-white shadow-2xl shadow-[#D4B2A7]/40 transform hover:scale-110 active:scale-90 transition-all border-4 border-white"
                  >
                    {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} className="ml-2" fill="currentColor" />}
                  </button>
                  <button className="text-[#6E6A6A] hover:text-[#D4B2A7] transition-all transform hover:scale-125"><SkipForward size={32} strokeWidth={1.5} /></button>
               </div>

               <div className="flex items-center gap-12">
                  <div className="flex items-center gap-4 text-[#6E6A6A]">
                     <Volume2 size={24} />
                     <div className="w-24 h-2 bg-[#F8F4F1] rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-[#D4B2A7] rounded-full" />
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <BtnGhost icon={Share2}>Broadcast Flashback</BtnGhost>
                     <BtnSecondary icon={Heart}>Bless Memoir</BtnSecondary>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Narrative Context */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <Card className="lg:col-span-2 !p-12 !rounded-[60px] shadow-2xl shadow-[#D4B2A7]/5">
            <h3 className="text-3xl font-black text-[#2F2A2A] editorial-title mb-8">Curator's Notes</h3>
            <div className="space-y-8">
               <p className="text-xl text-[#6E6A6A] font-medium leading-relaxed italic border-l-4 border-[#D4B2A7] pl-10 py-4 bg-[#F8F4F1]/40 rounded-r-3xl">
                  "This journey was defined by the silent moments between the sights. The way the light hit the temples at dusk, the sound of the rain in the bamboo groves..."
               </p>
               <div className="flex flex-wrap gap-4">
                  {['Tokyo', 'Spring', 'Adventure', 'Soul-Searching'].map(tag => (
                    <span key={tag} className="px-6 py-2.5 rounded-full bg-white border border-[#EADFD8] text-[10px] font-black uppercase tracking-[0.3em] text-[#D4B2A7] shadow-sm">
                      #{tag}
                    </span>
                  ))}
               </div>
            </div>
         </Card>
         
         <Card className="!p-12 !rounded-[60px] rose-gradient border-none text-white shadow-2xl shadow-[#D4B2A7]/20 flex flex-col justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-8 flex items-center justify-center text-3xl shadow-xl">🎬</div>
            <h4 className="text-2xl font-black editorial-title mb-4 tracking-tighter">Export Artifact</h4>
            <p className="text-white/80 text-xs font-medium leading-relaxed mb-10 italic">Transform this flashback into a high-fidelity cinematic artifact for your socials.</p>
            <BtnSecondary className="w-full !bg-white !text-[#D4B2A7] !py-4 shadow-2xl">Begin Export</BtnSecondary>
         </Card>
      </div>
    </div>
  );
};

export default TripReplayPage;
