import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Globe, Lock, Link, Copy, Check, Info, Layout, Eye, Sparkles, Navigation, Heart, ArrowRight } from 'lucide-react';
import { mockTrips, mockItinerary, mockPhotos } from '../utils/mockData';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost, BtnSecondary, BtnHighlight } from '../components/Buttons';
import { toast } from 'react-toastify';

const SharedTripPage = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    toast.success('Broadcast Link Copied! 📡', {
      style: { background: '#FFFDFC', borderRadius: '24px', border: '1px solid #EADFD8' }
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-editorial-up space-y-16 pb-24">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-12 px-4 border-b border-[#EADFD8]">
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4B2A7]"
          >
            Memoir Broadcasting
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-[#2F2A2A] tracking-tighter editorial-title leading-none">
            Share the <span className="italic font-normal text-[#D4B2A7]">Dream</span>
          </h1>
          <p className="text-lg text-[#6E6A6A] font-medium italic">Broadcast your living journey to the world or keep it for the few.</p>
        </div>
        <div className="flex gap-4">
           <BtnGhost icon={Eye}>Live Preview</BtnGhost>
           <BtnHighlight icon={Sparkles}>Auto-Broadcast</BtnHighlight>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Left: Broadcast Controls */}
        <div className="lg:col-span-1 space-y-12">
          {/* Visibility Studio */}
          <section className="space-y-8">
             <h3 className="text-xs font-black text-[#D4B2A7] uppercase tracking-[0.4em] flex items-center gap-3">
                <Layout size={16} /> Visibility Studio
             </h3>
             <div className="flex flex-col gap-4">
                {[
                  { id: 'public', label: 'Open Archive', desc: 'Visible to anyone with the link', icon: Globe, active: isPublic },
                  { id: 'private', label: 'Private Journal', desc: 'Invite-only secure fellowship', icon: Lock, active: !isPublic },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setIsPublic(opt.id === 'public')}
                    className={`p-8 rounded-[40px] text-left transition-all border-2 flex items-center gap-6 group ${opt.active ? 'bg-white border-[#D4B2A7] shadow-2xl shadow-[#D4B2A7]/10 translate-x-2' : 'bg-transparent border-[#EADFD8] opacity-50 hover:opacity-80'}`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all ${opt.active ? 'rose-gradient text-white shadow-lg rotate-[15deg]' : 'bg-[#EADFD8] text-[#6E6A6A]'}`}>
                       <opt.icon size={24} />
                    </div>
                    <div>
                       <p className="font-black text-[#2F2A2A] editorial-title text-xl mb-1">{opt.label}</p>
                       <p className="text-[10px] font-bold text-[#6E6A6A] uppercase tracking-widest leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                ))}
             </div>
          </section>

          {/* Magic Link Generator */}
          <section className="space-y-8">
             <h3 className="text-xs font-black text-[#D4B2A7] uppercase tracking-[0.4em] flex items-center gap-3">
                <Link size={16} /> Memoir Portal
             </h3>
             <Card className="!p-10 !rounded-[50px] !bg-gradient-to-br from-[#FFFDFC] to-[#F3D7CA]/10">
                <p className="text-[10px] font-black text-[#6E6A6A] uppercase tracking-[0.4em] mb-6">Generated Portal URL</p>
                <div className="flex items-center gap-4 bg-white/60 p-3 rounded-full border border-[#EADFD8] mb-8">
                   <div className="flex-1 truncate pl-4 text-xs font-bold text-[#2F2A2A] italic">traveloop.app/broadcast/tokyo-dream-2025</div>
                   <button 
                     onClick={handleCopy}
                     className="w-12 h-12 rounded-full rose-gradient flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
                   >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                   </button>
                </div>
                <BtnSecondary className="w-full !rounded-2xl !py-4" icon={Share2}>Broadcast to Circles</BtnSecondary>
             </Card>
          </section>
        </div>

        {/* Right: Cinematic Preview Canvas */}
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-8">
             <h3 className="text-xs font-black text-[#D4B2A7] uppercase tracking-[0.4em] flex items-center gap-3">
                <Navigation size={16} /> Public Perspective
             </h3>
             <div className="relative group overflow-hidden rounded-[60px] shadow-2xl border-4 border-white">
                {/* Hero Section of Public View */}
                <div className="h-[400px] bg-gradient-to-br from-[#D4B2A7] to-[#B784A7] relative overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center grayscale-[30%] opacity-40 group-hover:scale-105 transition-transform duration-[10s]" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                   
                   <div className="relative z-10 text-center space-y-6 px-10">
                      <span className="text-9xl drop-shadow-2xl">🗼</span>
                      <h4 className="text-5xl md:text-7xl font-black text-white editorial-title tracking-tighter leading-none">Tokyo Memoirs</h4>
                      <div className="flex items-center justify-center gap-4">
                         <div className="px-6 py-2 rounded-full glass-soft border border-white/30 text-[10px] font-black uppercase tracking-[0.4em] text-white">14 Memoirs</div>
                         <div className="px-6 py-2 rounded-full glass-soft border border-white/30 text-[10px] font-black uppercase tracking-[0.4em] text-white">Spring 2025</div>
                      </div>
                   </div>
                </div>

                {/* Content Preview */}
                <div className="bg-white p-12 space-y-12">
                   <div className="flex items-center justify-between">
                      <div>
                         <p className="text-[10px] font-black text-[#D4B2A7] uppercase tracking-[0.4em] mb-2">The Narrative</p>
                         <h5 className="text-3xl font-black text-[#2F2A2A] editorial-title">Expedition Log</h5>
                      </div>
                      <div className="flex -space-x-3">
                         {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-[#D4B2A7] shadow-sm" />)}
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="h-48 bg-[#F8F4F1] rounded-[40px] flex items-center justify-center text-4xl shadow-inner border border-[#EADFD8]/30">🍣</div>
                      <div className="h-48 bg-[#F8F4F1] rounded-[40px] flex items-center justify-center text-4xl shadow-inner border border-[#EADFD8]/30">🌸</div>
                   </div>

                   <p className="text-[#6E6A6A] font-medium leading-relaxed italic border-l-4 border-[#D4B2A7] pl-8 py-2">
                     "Wandered through the neon alleys of Shinjuku tonight. The rain turned the world into a living oil painting..."
                   </p>

                   <div className="flex items-center justify-center gap-6 pt-6">
                      <div className="flex items-center gap-3 text-[10px] font-black text-[#D4B2A7] uppercase tracking-[0.4em]">
                         <Heart size={14} fill="#D4B2A7" /> 1.2k Blessings
                      </div>
                      <div className="w-px h-6 bg-[#EADFD8]" />
                      <div className="flex items-center gap-3 text-[10px] font-black text-[#D4B2A7] uppercase tracking-[0.4em]">
                         <Check size={14} /> 42 Chronicles
                      </div>
                   </div>
                </div>

                {/* Perspective Badge */}
                <div className="absolute top-10 left-10">
                   <div className="px-6 py-3 bg-[#2F2A2A] text-white text-[9px] font-black uppercase tracking-[0.4em] rounded-full shadow-2xl flex items-center gap-3 border border-white/20">
                      <Sparkles size={14} className="text-[#D4B2A7]" /> Live Perspective
                   </div>
                </div>
             </div>
             <BtnGhost className="w-full !py-6 !text-[#D4B2A7]" icon={ArrowRight}>Enter Full Perspective</BtnGhost>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SharedTripPage;
