import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, DollarSign, Users, Globe, ArrowRight,
  ChevronLeft, ChevronRight, Check, Sparkles, Plus, X,
  Compass, Palmtree, Waves, Mountain, Shield
} from 'lucide-react';

import { Card } from '../components/Cards';
import { BtnPrimary, BtnSecondary, BtnGhost, BtnHighlight } from '../components/Buttons';

import { toast } from 'react-toastify';
import { useTrips } from '../utils/TripContext';

const steps = [
  { id: 1, label: 'Vision', icon: <Compass size={20} /> },
  { id: 2, label: 'Timeline', icon: <Calendar size={20} /> },
  { id: 3, label: 'Budget', icon: <DollarSign size={20} /> },
  { id: 4, label: 'Companions', icon: <Users size={20} /> },
  { id: 5, label: 'Finalize', icon: <Check size={20} /> },
];

const destinationSuggestions = [
  { emoji: '🏝️', name: 'Uluwatu, Bali' },
  { emoji: '🌿', name: 'Ubud, Bali' },
  { emoji: '🌋', name: 'Mount Batur' },
  { emoji: '🌊', name: 'Nusa Penida' },
  { emoji: '🏯', name: 'Tanah Lot' },
  { emoji: '🛶', name: 'Bedugul Lake' },
];

const CreateTripPage = () => {
  const navigate = useNavigate();
  const { addTrip } = useTrips();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: '',
    destination: '',
    emoji: '🌿',
    startDate: '',
    endDate: '',
    budget: '',
    currency: 'USD',
    collaborators: [],
    newEmail: '',
    visibility: 'private',
    tags: [],
  });

  const canProceed = () => {
    if (step === 1) return form.title.length > 0 && form.destination.length > 0;
    if (step === 2) return form.startDate && form.endDate;
    if (step === 3) return form.budget.length > 0;
    return true;
  };

  const handleCreate = async () => {
    const tripData = {
      title: form.title,
      destination: form.destination,
      emoji: form.emoji,
      startDate: form.startDate,
      endDate: form.endDate,
      budget: Number(form.budget),
      currency: form.currency,
      isPublic: form.visibility === 'public',
      tags: form.tags,
      description: `A journey to ${form.destination}`,
    };

    try {
      await addTrip(tripData);
      navigate('/dashboard');
    } catch (error) {
      // Error handled by TripContext
    }
  };


  return (
    <div className="pt-20 pb-32 animate-editorial-up min-h-screen relative overflow-hidden">
      {/* Editorial Decorative Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EEF1EA] rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#CBD3C7] rounded-full blur-[100px] -z-10 opacity-40" />

      <div className="max-w-[1200px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-6"
          >
            Phase {step} of 5
          </motion.div>
          <h1 className="editorial-title text-6xl md:text-8xl text-[#1F241D] tracking-tighter italic mb-4">
            Curate Your <span className="font-black not-italic">Story</span>
          </h1>
          <p className="text-xl text-[#6F756B] font-medium max-w-xl mx-auto italic">
            Begin the process of documenting your next meaningful escape.
          </p>
        </div>

        {/* Cinematic Progress Bar */}
        <div className="flex items-center justify-between mb-24 px-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-[#CBD3C7] -translate-y-1/2 z-0 mx-20" />
          <motion.div 
            className="absolute top-1/2 left-0 h-px bg-[#263322] -translate-y-1/2 z-0 mx-20 transition-all duration-1000"
            style={{ width: `${((step - 1) / (steps.length - 1)) * (100 - 15)}%` }}
          />
          {steps.map((s) => (
            <div key={s.id} className="relative z-10 flex flex-col items-center">
              <button
                onClick={() => s.id < step && setStep(s.id)}
                className={`w-16 h-16 rounded-[28px] flex items-center justify-center transition-all duration-700 shadow-bali ${
                  step >= s.id 
                    ? 'bg-[#263322] text-[#F8F4EA] scale-110' 
                    : 'bg-[#F7F5EF] text-[#6F756B] border border-[#CBD3C7]'
                }`}
              >
                {step > s.id ? <Check size={24} /> : s.icon}
              </button>
              <span className={`text-[10px] font-black uppercase tracking-[0.3em] mt-5 transition-colors ${step >= s.id ? 'text-[#1F241D]' : 'text-[#6F756B]/40'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Form Side */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-12"
              >
                {step === 1 && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em] block">Journal Title</label>
                      <input
                        type="text"
                        placeholder="Name your journey..."
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full bg-white/40 backdrop-blur-md rounded-[32px] px-8 py-6 text-2xl font-black text-[#1F241D] border border-[#CBD3C7]/40 focus:border-[#263322] outline-none transition-all placeholder-[#6F756B]/20"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em] block">The Destination</label>
                      <div className="relative">
                        <MapPin className="absolute left-8 top-1/2 -translate-y-1/2 text-[#3F4F37]" size={22} />
                        <input
                          type="text"
                          placeholder="Where will you wander?"
                          value={form.destination}
                          onChange={(e) => setForm({ ...form, destination: e.target.value })}
                          className="w-full bg-white/40 backdrop-blur-md rounded-[32px] pl-16 pr-8 py-6 text-xl font-bold text-[#1F241D] border border-[#CBD3C7]/40 focus:border-[#263322] outline-none transition-all placeholder-[#6F756B]/20"
                        />
                      </div>
                      <div className="flex flex-wrap gap-3 mt-6">
                        {destinationSuggestions.map((s) => (
                          <button
                            key={s.name}
                            onClick={() => setForm({ ...form, destination: s.name, emoji: s.emoji })}
                            className="px-6 py-3 rounded-full bg-[#EEF1EA]/60 border border-[#CBD3C7]/50 text-[10px] font-black text-[#1F241D] uppercase tracking-widest hover:bg-[#263322] hover:text-[#F8F4EA] transition-all"
                          >
                            {s.emoji} {s.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em] block">Arrival Date</label>
                      <input
                        type="date"
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className="w-full bg-white/40 backdrop-blur-md rounded-[32px] px-8 py-6 text-lg font-bold text-[#1F241D] border border-[#CBD3C7]/40 focus:border-[#263322] outline-none"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em] block">Departure Date</label>
                      <input
                        type="date"
                        value={form.endDate}
                        onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                        className="w-full bg-white/40 backdrop-blur-md rounded-[32px] px-8 py-6 text-lg font-bold text-[#1F241D] border border-[#CBD3C7]/40 focus:border-[#263322] outline-none"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-12">
                    <div className="space-y-4 text-center lg:text-left">
                      <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em] block">Financial Investment</label>
                      <div className="relative inline-block w-full">
                        <span className="absolute left-10 top-1/2 -translate-y-1/2 text-5xl font-black text-[#3F4F37] opacity-30">$</span>
                        <input
                          type="number"
                          placeholder="0,000"
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                          className="w-full bg-transparent border-b-4 border-[#CBD3C7] focus:border-[#263322] px-10 py-8 text-7xl font-black text-[#1F241D] outline-none transition-all placeholder-[#CBD3C7]"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-4">
                      {['USD', 'EUR', 'GBP', 'JPY', 'INR'].map(c => (
                        <button
                          key={c}
                          onClick={() => setForm({...form, currency: c})}
                          className={`py-5 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${form.currency === c ? 'bg-[#263322] text-[#F8F4EA] shadow-xl' : 'bg-[#EEF1EA] text-[#6F756B] hover:bg-white'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em] block">Invite Companions</label>
                      <div className="flex gap-4">
                        <input
                          type="email"
                          placeholder="companion@email.com"
                          value={form.newEmail}
                          onChange={(e) => setForm({ ...form, newEmail: e.target.value })}
                          className="flex-1 bg-white/40 backdrop-blur-md rounded-[32px] px-8 py-6 text-lg font-bold text-[#1F241D] outline-none border border-[#CBD3C7]/40 focus:border-[#263322]"
                        />
                        <button 
                          onClick={() => {
                            if (form.newEmail) {
                              setForm({ ...form, collaborators: [...form.collaborators, form.newEmail], newEmail: '' });
                              toast.info(`Added ${form.newEmail}`);
                            }
                          }}
                          className="w-20 h-20 bg-[#263322] text-[#F8F4EA] rounded-[32px] flex items-center justify-center hover:bg-[#3F4F37] transition-all"
                        >
                          <Plus size={28} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {form.collaborators.map((email, i) => (
                        <div key={i} className="flex items-center gap-4 px-6 py-3 bg-white border border-[#CBD3C7]/40 rounded-[24px] text-xs font-bold text-[#1F241D] shadow-sm">
                          <Users size={16} className="text-[#3F4F37]" />
                          {email}
                          <button onClick={() => setForm({ ...form, collaborators: form.collaborators.filter((_, idx) => idx !== i) })}>
                            <X size={16} className="text-[#6F756B]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div className="space-y-10">
                     <div className="relative h-[450px] rounded-[60px] overflow-hidden shadow-editorial border-4 border-white/50">
                        <img 
                          src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1200" 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 cinematic-overlay" />
                        <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                           <div className="text-7xl mb-6">{form.emoji}</div>
                           <h3 className="editorial-title text-6xl tracking-tighter mb-4 italic leading-tight">{form.title || 'Your Future Journey'}</h3>
                           <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] opacity-80">
                              <span className="flex items-center gap-2"><MapPin size={12} /> {form.destination || 'Bali'}</span>
                              <span className="flex items-center gap-2"><Calendar size={12} /> {form.startDate || '2026'}</span>
                              <span className="flex items-center gap-2"><DollarSign size={12} /> {form.currency} {form.budget || '0'}</span>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-2 gap-6">
                        <button className={`p-8 rounded-[40px] border-2 transition-all text-left flex flex-col gap-3 ${form.visibility === 'private' ? 'border-[#263322] bg-[#263322]/5 shadow-bali' : 'border-[#CBD3C7]/40 bg-white'}`}
                          onClick={() => setForm({...form, visibility: 'private'})}>
                          <Shield size={24} className={form.visibility === 'private' ? 'text-[#263322]' : 'text-[#6F756B]'} />
                          <div>
                            <p className="font-black text-[#1F241D] text-lg">Private Archive</p>
                            <p className="text-[10px] text-[#6F756B] font-bold uppercase tracking-widest mt-1">Exclusive to you & companions</p>
                          </div>
                        </button>
                        <button className={`p-8 rounded-[40px] border-2 transition-all text-left flex flex-col gap-3 ${form.visibility === 'public' ? 'border-[#3F4F37] bg-[#3F4F37]/5 shadow-bali' : 'border-[#CBD3C7]/40 bg-white'}`}
                          onClick={() => setForm({...form, visibility: 'public'})}>
                          <Globe size={24} className={form.visibility === 'public' ? 'text-[#3F4F37]' : 'text-[#6F756B]'} />
                          <div>
                            <p className="font-black text-[#1F241D] text-lg">Public Discovery</p>
                            <p className="text-[10px] text-[#6F756B] font-bold uppercase tracking-widest mt-1">Shared with the Traveloop community</p>
                          </div>
                        </button>
                     </div>
                  </div>
                )}

                {/* Internal Nav Buttons */}
                <div className="pt-10 flex items-center gap-6">
                  <button 
                    onClick={() => setStep(step - 1)}
                    className={`text-[10px] font-black uppercase tracking-[0.4em] text-[#6F756B] hover:text-[#1F241D] transition-colors flex items-center gap-3 ${step === 1 ? 'invisible' : ''}`}
                  >
                    <ChevronLeft size={16} /> Retreat
                  </button>
                  {step < 5 ? (
                    <BtnPrimary 
                      onClick={() => setStep(step + 1)} 
                      disabled={!canProceed()} 
                      className="!px-16"
                    >
                      Advance Phase
                    </BtnPrimary>
                  ) : (
                    <BtnHighlight onClick={handleCreate} className="!px-16" icon={Sparkles}>
                      Archive Journey
                    </BtnHighlight>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Editorial Side Panel */}
          <div className="lg:col-span-5 hidden lg:block">
             <div className="relative group">
                <img 
                  src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800" 
                  className="w-full h-[700px] object-cover rounded-[100px] rounded-tl-[20px] shadow-editorial transition-all duration-1000 group-hover:scale-[0.98]"
                />
                <div className="absolute inset-0 bg-[#3F4F37]/10 rounded-[100px] rounded-tl-[20px] group-hover:bg-transparent transition-all" />
                <div className="absolute -bottom-10 -left-10 w-72 p-10 bg-[#F7F5EF] rounded-[48px] shadow-2xl border border-[#CBD3C7]/30">
                   <div className="editorial-title text-4xl italic text-[#263322] mb-4">"The journey is the story."</div>
                   <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.2em] leading-relaxed">
                      We curate spaces for you to breathe, plan, and remember. Every detail matters in the archive of your life.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTripPage;
