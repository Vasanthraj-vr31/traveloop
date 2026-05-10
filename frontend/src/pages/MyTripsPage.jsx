import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Filter, Calendar, MapPin, Grid, List as ListIcon, Map as MapIcon, ChevronRight, Sparkles, Compass, RefreshCw } from 'lucide-react';
import { useTrips } from '../utils/TripContext';
import { TripCard, SkeletonCard } from '../components/Cards';
import { BtnPrimary, BtnSecondary, BtnGhost, BtnHighlight } from '../components/Buttons';

const MyTripsPage = () => {
  const navigate = useNavigate();
  const { trips, loading, fetchTrips, selectTrip } = useTrips();
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');

  const filteredTrips = (trips || []).filter(trip => {
    const matchesSearch = (trip.title || '').toLowerCase().includes(search.toLowerCase()) || 
                         (trip.destination && trip.destination.toLowerCase().includes(search.toLowerCase()));
    const matchesFilter = filter === 'all' || trip.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="animate-editorial-up space-y-16 pb-24 max-w-[1600px] mx-auto px-8 lg:px-20">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-20 border-b border-[#CBD3C7]/30">
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37]"
          >
            The Archive
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
            Your <span className="italic font-normal text-[#6F756B]">Chronicles</span>
          </h1>
          <p className="text-xl text-[#6F756B] font-medium flex items-center gap-4 italic">
            <span className="w-12 h-px bg-[#3F4F37]" /> {trips.length} Curated Stories
          </p>
        </div>
        <div className="flex items-center gap-4">
           <BtnGhost onClick={fetchTrips} icon={RefreshCw} className="!px-8 py-5">Sync</BtnGhost>
           <BtnHighlight onClick={() => navigate('/create-trip')} icon={Plus} className="!px-12 py-5">Begin New Journey</BtnHighlight>
        </div>
      </div>

      {/* Editorial Controls */}
      <div className="flex flex-col xl:flex-row items-center justify-between gap-10">
        {/* Filter Ribbon */}
        <div className="flex items-center gap-4 p-3 bg-[#EEF1EA]/60 backdrop-blur-xl rounded-full border border-[#CBD3C7]/40 shadow-bali overflow-x-auto hide-scrollbar w-full xl:w-auto">
          {['all', 'upcoming', 'completed', 'planning'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.25em] transition-all shrink-0 ${
                filter === f 
                  ? 'bg-[#263322] text-[#F8F4EA] shadow-xl' 
                  : 'text-[#6F756B] hover:text-[#1F241D] hover:bg-white/50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Search & View Matrix */}
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full xl:w-auto flex-1 max-w-3xl">
          <div className="flex-1 flex items-center gap-5 bg-white/40 backdrop-blur-xl border border-[#CBD3C7]/50 rounded-full px-10 py-5 shadow-bali focus-within:border-[#3F4F37] transition-all w-full">
            <Search size={20} className="text-[#3F4F37]" />
            <input
              type="text"
              placeholder="Search your library..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-sm text-[#1F241D] outline-none w-full font-bold uppercase tracking-widest placeholder-[#6F756B]/40"
            />
          </div>
          
          <div className="flex items-center gap-3 bg-[#EEF1EA]/80 p-2 rounded-full border border-[#CBD3C7]/30 shrink-0 shadow-sm">
             <button onClick={() => setView('grid')} className={`p-4 rounded-full transition-all ${view === 'grid' ? 'bg-[#263322] text-[#F8F4EA] shadow-md' : 'text-[#6F756B]/40'}`}>
                <Grid size={22} />
             </button>
             <button onClick={() => setView('list')} className={`p-4 rounded-full transition-all ${view === 'list' ? 'bg-[#263322] text-[#F8F4EA] shadow-md' : 'text-[#6F756B]/40'}`}>
                <ListIcon size={22} />
             </button>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <AnimatePresence mode="popLayout">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        ) : filteredTrips.length > 0 ? (
          <motion.div 
            layout
            className={view === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12" 
              : "space-y-10 max-w-5xl mx-auto"}
          >
            {filteredTrips.map((trip, idx) => (
              <motion.div
                key={trip._id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.7, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <TripCard 
                  trip={trip} 
                  onClick={() => {
                    selectTrip(trip);
                    navigate('/itinerary-view');
                  }} 
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/20 backdrop-blur-xl rounded-[100px] border-2 border-dashed border-[#CBD3C7] p-40 text-center shadow-bali"
          >
            <div className="w-32 h-32 rounded-[48px] bg-[#EEF1EA] flex items-center justify-center text-7xl mx-auto mb-12 shadow-inner">
               🌿
            </div>
            <h3 className="text-5xl font-black text-[#1F241D] mb-6 editorial-title tracking-tighter">Your library is waiting</h3>
            <p className="text-[#6F756B] text-xl font-medium mb-16 max-w-lg mx-auto italic leading-relaxed">
              No journeys match your current search. Perhaps it's time to venture into the unknown and start a new chapter.
            </p>
            <BtnHighlight onClick={() => navigate('/create-trip')} icon={Plus} className="!px-20 py-6 text-base">Write a New Chapter</BtnHighlight>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discovery Recommendations */}
      <div className="pt-32 border-t border-[#CBD3C7]/30">
         <div className="flex items-center justify-between mb-16 px-6">
            <div className="space-y-2">
               <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37]">Inspiration</h4>
               <h2 className="text-4xl md:text-5xl font-black text-[#1F241D] editorial-title tracking-tight flex items-center gap-6">
                  Where to <span className="italic text-[#6F756B]">next?</span>
               </h2>
            </div>
            <BtnGhost className="!text-[#3F4F37] font-black tracking-[0.3em] uppercase text-[10px]" icon={Compass}>Refresh Muse</BtnGhost>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
               { name: 'Uluwatu', img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=600', tag: 'COASTAL' },
               { name: 'Ubud Hills', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', tag: 'SERENE' },
               { name: 'Canggu', img: 'https://images.unsplash.com/photo-1539367628448-4bc5c9d170c8?auto=format&fit=crop&q=80&w=600', tag: 'VIBRANT' },
               { name: 'Munduk', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=600', tag: 'MISTY' },
            ].map((dest, i) => (
               <motion.div 
                  key={dest.name}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
               >
                  <div className="relative h-80 rounded-[60px] overflow-hidden mb-8 shadow-bali border-4 border-white/50">
                     <img src={dest.img} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={dest.name} />
                     <div className="absolute inset-0 bg-black/10" />
                     <div className="absolute top-8 right-8 px-5 py-2 bg-white/30 backdrop-blur-md rounded-full text-[9px] font-black tracking-[0.3em] text-white border border-white/30 uppercase">{dest.tag}</div>
                  </div>
                  <h4 className="font-black text-[#1F241D] text-center text-2xl editorial-title tracking-tight group-hover:text-[#3F4F37] transition-colors">{dest.name}</h4>
               </motion.div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default MyTripsPage;
