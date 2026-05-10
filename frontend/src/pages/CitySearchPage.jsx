import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Globe, ArrowRight, Filter, Sparkles, Navigation, X, ChevronRight } from 'lucide-react';
import { mockCities } from '../utils/mockData';
import { Card } from '../components/Cards';
import { useNavigate } from 'react-router-dom';
import { BtnPrimary, BtnGhost, BtnHighlight, BtnSecondary } from '../components/Buttons';

const CitySearchPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Asia', 'Europe', 'Americas', 'Beach', 'Mountains'];
  const filtered = mockCities.filter(c =>
    (activeFilter === 'All' || c.tags.includes(activeFilter) || c.country.includes(activeFilter)) &&
    (c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.country.toLowerCase().includes(query.toLowerCase()))
  );

  const trending = [
    { name: 'Tokyo', emoji: '🗾' },
    { name: 'Bali', emoji: '🏝️' },
    { name: 'Paris', emoji: '🗼' },
    { name: 'Swiss Alps', emoji: '🏔️' }
  ];

  return (
    <div className="animate-editorial-up space-y-16 pb-24">
      {/* Editorial Hero Header */}
      <div className="text-center space-y-8 max-w-4xl mx-auto py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#D4B2A7]/30 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4B2A7]"
        >
          <Globe size={12} /> The World is Your Canvas
        </motion.div>
        
        <h1 className="text-7xl md:text-9xl font-black text-[#2F2A2A] tracking-tighter editorial-title leading-[0.8]">
          Find Your <span className="italic font-normal text-[#D4B2A7]">Muse</span>
        </h1>
        
        <p className="text-xl text-[#6E6A6A] font-medium max-w-2xl mx-auto leading-relaxed italic">
          "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes."
        </p>
      </div>

      {/* Editorial Search Bar */}
      <div className="relative max-w-5xl mx-auto">
        <div className="bg-white rounded-[50px] shadow-2xl shadow-[#D4B2A7]/10 p-4 border border-[#EADFD8] flex items-center gap-6 group transition-all focus-within:shadow-[#D4B2A7]/20">
           <div className="w-16 h-16 rounded-full rose-gradient flex items-center justify-center text-white shrink-0 shadow-lg">
             <Search size={28} />
           </div>
           <input
             type="text"
             placeholder="Search for a city, country or a feeling..."
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             className="flex-1 bg-transparent text-2xl font-black text-[#2F2A2A] placeholder-[#6E6A6A]/20 outline-none editorial-title tracking-tight"
           />
           {query && (
             <button onClick={() => setQuery('')} className="p-4 hover:bg-[#F8F4F1] rounded-full transition-colors text-[#D4B2A7]">
                <X size={24} />
             </button>
           )}
           <BtnHighlight className="hidden md:flex !rounded-full !px-12">Seek</BtnHighlight>
        </div>

        {/* Trending Tags */}
        {!query && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mt-10 flex-wrap"
          >
            <span className="text-[9px] font-black text-[#D4B2A7] uppercase tracking-[0.4em] mr-4">Trending Now:</span>
            {trending.map((t) => (
              <button
                key={t.name}
                onClick={() => setQuery(t.name)}
                className="px-6 py-2.5 bg-white border border-[#EADFD8] text-[#2F2A2A] text-xs font-black rounded-full hover:border-[#D4B2A7] hover:text-[#D4B2A7] transition-all shadow-sm"
              >
                {t.emoji} {t.name}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Discovery Layout */}
      <div className="flex flex-col lg:flex-row gap-16">
         
         {/* Sidebar Navigation Filters */}
         <div className="w-full lg:w-72 space-y-12 shrink-0">
            <div className="space-y-6">
               <h3 className="text-[10px] font-black text-[#D4B2A7] uppercase tracking-[0.4em] flex items-center gap-3 ml-4">
                  <Filter size={14} /> Taxonomy
               </h3>
               <div className="flex flex-col gap-2">
                 {filters.map((f) => (
                   <button
                     key={f}
                     onClick={() => setActiveFilter(f)}
                     className={`w-full px-8 py-5 rounded-[24px] text-sm font-bold transition-all text-left flex items-center justify-between group ${
                       activeFilter === f
                         ? 'bg-[#2F2A2A] text-white shadow-2xl shadow-[#D4B2A7]/20 translate-x-2'
                         : 'bg-white/40 text-[#6E6A6A] hover:bg-white hover:border-[#D4B2A7]/30 border border-transparent'
                     }`}
                   >
                     {f}
                     <ChevronRight size={14} className={`transition-transform group-hover:translate-x-1 ${activeFilter === f ? 'opacity-100' : 'opacity-20'}`} />
                   </button>
                 ))}
               </div>
            </div>

            <Card className="!p-10 rose-gradient border-none text-white shadow-2xl shadow-[#D4B2A7]/30 !rounded-[50px] relative overflow-hidden">
               <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
                     <Sparkles size={24} />
                  </div>
                  <h4 className="text-2xl font-black editorial-title leading-tight">AI Vision Search</h4>
                  <p className="text-white/80 text-xs font-medium leading-relaxed italic">Describe your mood and let our AI curate your next landscape.</p>
                  <BtnSecondary className="w-full !bg-white !text-[#D4B2A7] !py-4 !rounded-2xl shadow-xl">Try the Oracle</BtnSecondary>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            </Card>
         </div>

         {/* Results Canvas */}
         <div className="flex-1">
            <div className="flex items-center justify-between mb-10 px-4">
               <p className="text-[10px] font-black text-[#D4B2A7] uppercase tracking-[0.4em]">{filtered.length} Landscapes found</p>
               <BtnGhost className="!p-0 !text-[10px] !uppercase !tracking-[0.2em]">Sequence: Allure</BtnGhost>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {filtered.map((city, i) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -15 }}
                  className="bg-white rounded-[60px] overflow-hidden cursor-pointer group shadow-2xl shadow-[#D4B2A7]/5 border border-[#EADFD8] transition-all duration-700"
                  onClick={() => navigate('/activity-search')}
                >
                  {/* City Editorial Cover */}
                  <div className="h-64 bg-gradient-to-br from-[#F3D7CA] to-[#D9B6D3] flex items-center justify-center relative overflow-hidden">
                    <span className="text-[120px] transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-6 opacity-90 drop-shadow-2xl">{city.emoji}</span>
                    
                    <div className="absolute top-8 right-8">
                      <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md text-[#2F2A2A] text-[10px] font-black px-5 py-2.5 rounded-full shadow-xl border border-white">
                        <Star size={14} fill="#D4B2A7" className="text-[#D4B2A7]" /> {city.rating}
                      </div>
                    </div>
                    
                    <div className="absolute bottom-8 left-8 flex items-center gap-2 bg-[#2F2A2A]/40 backdrop-blur-md text-white text-[9px] font-black px-5 py-2.5 rounded-full border border-white/20 uppercase tracking-[0.3em]">
                      {city.weather}
                    </div>
                  </div>

                  <div className="p-10">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-3xl font-black text-[#2F2A2A] tracking-tighter editorial-title group-hover:text-[#D4B2A7] transition-colors leading-none">{city.name}</h3>
                        <p className="text-[10px] font-black text-[#D4B2A7] uppercase tracking-[0.3em] flex items-center gap-2 mt-3">
                          <Globe size={12} /> {city.country}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-[#EADFD8] flex items-center justify-center text-[#D4B2A7] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                         <ArrowRight size={22} />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {city.tags.map((tag) => (
                        <span key={tag} className="text-[9px] font-black uppercase tracking-[0.25em] px-4 py-2 bg-[#F8F4F1] text-[#6E6A6A] rounded-full border border-[#EADFD8]/30">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-8 border-t border-[#EADFD8]">
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black text-[#D4B2A7] uppercase tracking-[0.4em] mb-1">Curation</span>
                         <span className="text-lg font-black text-[#2F2A2A] editorial-title leading-none">{city.activities} Events</span>
                      </div>
                      <BtnGhost className="!p-0 !text-[#D4B2A7] !font-black !text-[10px] !uppercase !tracking-[0.3em] group-hover:underline">Chronicle →</BtnGhost>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-40 bg-white/40 border-4 border-dashed border-[#EADFD8] rounded-[60px]">
                <div className="w-28 h-28 rounded-full bg-[#F3D7CA]/20 flex items-center justify-center text-6xl mx-auto mb-10 shadow-inner">🔭</div>
                <h3 className="text-3xl font-black text-[#2F2A2A] mb-4 editorial-title">Uncharted Territory</h3>
                <p className="text-[#6E6A6A] font-medium max-w-sm mx-auto italic leading-relaxed">"Not all those who wander are lost, but we couldn't find matches for this query."</p>
                <BtnPrimary onClick={() => {setQuery(''); setActiveFilter('All');}} className="mt-12 px-16">Reset Perspective</BtnPrimary>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default CitySearchPage;
