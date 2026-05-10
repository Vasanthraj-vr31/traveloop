import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, DollarSign, Clock, Filter, Plus, Heart, Sparkles, MapPin, ChevronRight, X } from 'lucide-react';
import { mockActivities } from '../utils/mockData';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost, BtnSecondary, BtnHighlight } from '../components/Buttons';
import { toast } from 'react-toastify';

const ActivitySearchPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [liked, setLiked] = useState({});

  const categories = ['All', 'Sightseeing', 'Food', 'Nature', 'Culture', 'Shopping', 'City'];
  const filtered = mockActivities.filter(a =>
    (category === 'All' || a.category === category) &&
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggleLike = (id) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    if (!liked[id]) toast.success('Saved to Memoirs! ❤️');
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
            Curated Experiences
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-[#2F2A2A] tracking-tighter editorial-title leading-none">
            The <span className="italic font-normal text-[#D4B2A7]">Art</span> of Play
          </h1>
          <p className="text-lg text-[#6E6A6A] font-medium italic">Discover unique local narratives to weave into your journey.</p>
        </div>
        <BtnHighlight icon={Sparkles} className="!rounded-full shadow-2xl">Vision Sync</BtnHighlight>
      </div>

      {/* Discovery Dashboard */}
      <div className="space-y-12">
        {/* Editorial Search */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex items-center gap-6 bg-white rounded-[40px] border border-[#EADFD8] px-10 py-6 shadow-2xl shadow-[#D4B2A7]/5 transition-all focus-within:shadow-[#D4B2A7]/15 group">
            <Search size={24} className="text-[#D4B2A7]" />
            <input
              type="text"
              placeholder="Search by flavor, sound or sight..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-xl font-bold text-[#2F2A2A] outline-none placeholder-[#6E6A6A]/20"
            />
            {query && (
               <button onClick={() => setQuery('')} className="p-3 hover:bg-[#F8F4F1] rounded-full transition-colors">
                  <X size={20} className="text-[#D4B2A7]" />
               </button>
            )}
          </div>
          <button className="flex items-center gap-4 px-10 py-6 bg-white border border-[#EADFD8] rounded-[40px] text-[10px] font-black text-[#2F2A2A] uppercase tracking-[0.3em] hover:border-[#D4B2A7] transition-all shadow-sm">
            <Filter size={18} className="text-[#D4B2A7]" /> Refine
          </button>
        </div>

        {/* Categories Ribbon */}
        <div className="flex gap-4 overflow-x-auto pb-6 hide-scrollbar px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`shrink-0 px-10 py-4 rounded-full text-[9px] font-black uppercase tracking-[0.3em] transition-all border shadow-sm ${
                category === cat
                  ? 'rose-gradient text-white border-transparent shadow-xl shadow-[#D4B2A7]/30'
                  : 'bg-white text-[#6E6A6A] border-[#EADFD8] hover:border-[#D4B2A7] hover:text-[#2F2A2A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((act, i) => (
            <motion.div
              key={act.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -12 }}
              className="bg-white rounded-[50px] overflow-hidden shadow-2xl shadow-[#D4B2A7]/5 group border border-[#EADFD8] transition-all duration-700 flex flex-col"
            >
              {/* Artistic Experience Cover */}
              <div className="h-56 bg-gradient-to-br from-[#F3D7CA] to-[#FFFDFC] flex items-center justify-center relative overflow-hidden shrink-0">
                <span className="text-[100px] drop-shadow-2xl transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6 opacity-90">{act.emoji}</span>
                
                {/* Save to Memoirs */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLike(act.id); }}
                  className={`absolute top-8 right-8 w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-xl shadow-xl transition-all border border-white/40 ${liked[act.id] ? 'rose-gradient text-white' : 'bg-white/80 text-[#6E6A6A] hover:bg-white'}`}
                >
                  <Heart size={20} className={liked[act.id] ? 'fill-white' : ''} strokeWidth={2} />
                </button>

                <div className="absolute bottom-8 left-8 px-5 py-2 bg-[#2F2A2A]/40 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-black text-white uppercase tracking-[0.3em]">
                   {act.category}
                </div>
              </div>

              {/* Experience Memoirs */}
              <div className="p-10 flex flex-col flex-1">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                     <MapPin size={12} className="text-[#D4B2A7]" />
                     <span className="text-[9px] font-black text-[#6E6A6A] uppercase tracking-[0.3em]">{act.city}</span>
                  </div>
                  <h3 className="text-2xl font-black text-[#2F2A2A] tracking-tighter editorial-title group-hover:text-[#D4B2A7] transition-colors leading-tight mb-6 line-clamp-2">
                    {act.name}
                  </h3>
                  
                  <div className="flex items-center gap-6 text-[10px] font-black text-[#6E6A6A] uppercase tracking-[0.2em] mb-8">
                    <span className="flex items-center gap-2"><Star size={14} fill="#D4B2A7" className="text-[#D4B2A7]" /> {act.rating}</span>
                    <span className="flex items-center gap-2"><Clock size={14} className="text-[#B784A7]" /> {act.duration}</span>
                    <span className="flex items-center gap-2"><DollarSign size={14} className="text-[#D4B2A7]" /> {act.price === 0 ? 'Gift' : `$${act.price}`}</span>
                  </div>
                </div>

                <div className="pt-8 border-t border-[#EADFD8] flex items-center justify-between">
                  <BtnGhost className="!p-0 !text-[9px] !uppercase !tracking-[0.3em]">The Story</BtnGhost>
                  <button
                    onClick={() => toast.success(`Woven into your ${act.city} trip!`)}
                    className="flex items-center gap-3 px-8 py-3 bg-[#2F2A2A] text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-full hover:bg-[#D4B2A7] transition-all shadow-xl shadow-gray-200"
                  >
                    <Plus size={16} /> Add to Log
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center py-40 bg-white/40 border-4 border-dashed border-[#EADFD8] rounded-[60px] mt-12"
        >
          <div className="w-28 h-28 rounded-full bg-[#F3D7CA]/20 flex items-center justify-center text-6xl mx-auto mb-10 shadow-inner">🎪</div>
          <h3 className="text-3xl font-black text-[#2F2A2A] mb-4 editorial-title">Unwritten Stories</h3>
          <p className="text-[#6E6A6A] font-medium max-w-sm mx-auto italic leading-relaxed">"We couldn't find matches for this scene. Explore other chapters or reset your discovery."</p>
          <BtnPrimary onClick={() => {setQuery(''); setCategory('All');}} className="mt-12 px-16">Reset Chapters</BtnPrimary>
        </motion.div>
      )}
    </div>
  );
};

export default ActivitySearchPage;
