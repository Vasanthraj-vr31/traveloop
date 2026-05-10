import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, GripVertical, Trash2, Clock, MapPin, Edit2,
  ChevronDown, ChevronUp, Sparkles, Layout, Calendar, Heart, Loader2
} from 'lucide-react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnSecondary, BtnGhost, BtnHighlight } from '../components/Buttons';
import { toast } from 'react-toastify';
import { useTrips } from '../utils/TripContext';
import { stopAPI, activityAPI } from '../services/api';

const activityTypes = {
  transport: { color: '#D4B2A7', bg: '#F3D7CA30' },
  accommodation: { color: '#B784A7', bg: '#D9B6D330' },
  food: { color: '#FFD166', bg: '#FFD16630' },
  activity: { color: '#D4B2A7', bg: '#F3D7CA30' },
  sightseeing: { color: '#4DB6AC', bg: '#E0F7F530' },
  shopping: { color: '#6E6A6A', bg: '#F8F4F130' },
};

const ItineraryBuilderPage = () => {
  const { currentTrip, itinerary: stops, activities, refreshCurrentTrip, loading } = useTrips();
  const [expandedStops, setExpandedStops] = useState({});
  const [editingActivity, setEditingActivity] = useState(null);

  const toggleDay = (id) => setExpandedStops(prev => ({ ...prev, [id]: !prev[id] }));

  const addStop = async () => {
    if (!currentTrip) return;
    try {
      await stopAPI.create({
        tripId: currentTrip._id,
        cityName: `New Chapter ${stops.length + 1}`,
        country: currentTrip.destination || 'Global',
        order: stops.length
      });
      toast.success('📖 New chapter begun!');
      refreshCurrentTrip();
    } catch (error) {
      toast.error('Failed to add stop');
    }
  };

  const addActivity = async (stopId) => {
    if (!currentTrip) return;
    try {
      await activityAPI.create({
        tripId: currentTrip._id,
        stopId,
        title: 'New Memory',
        category: 'activity',
        duration: '1 hr',
        icon: '📍'
      });
      toast.success('✨ Memoir draft created');
      refreshCurrentTrip();
    } catch (error) {
      toast.error('Failed to add activity');
    }
  };

  const removeActivity = async (actId) => {
    try {
      await activityAPI.delete(actId);
      toast.info('Memory archived');
      refreshCurrentTrip();
    } catch (error) {
      toast.error('Failed to remove');
    }
  };

  const removeStop = async (stopId) => {
    try {
      await stopAPI.delete(stopId);
      toast.info('Chapter archived');
      refreshCurrentTrip();
    } catch (error) {
      toast.error('Failed to remove chapter');
    }
  };

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Opening the archives...</div>;
  if (!currentTrip) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Select a trip to build the chronicle</div>;

  return (
    <div className="animate-editorial-up space-y-16 pb-24 max-w-6xl mx-auto px-6">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 py-12 border-b border-[#CBD3C7]/30">
        <div className="space-y-4">
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37]">Memoir Drafting</div>
          <h1 className="text-6xl md:text-8xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
            The <span className="italic font-normal text-[#6F756B]">Chronicle</span>
          </h1>
          <p className="text-lg text-[#6F756B] font-medium flex items-center gap-3 italic">
            <span className="w-8 h-px bg-[#CBD3C7]" /> Writing the story of {currentTrip.title} · {stops.length} Chapters
          </p>
        </div>
        <div className="flex items-center gap-4">
          <BtnGhost icon={Sparkles}>AI Muse</BtnGhost>
          <BtnHighlight onClick={refreshCurrentTrip} icon={Layout}>Sync History</BtnHighlight>
        </div>
      </div>

      {/* Chapters Sequence */}
      <div className="space-y-12">
        {stops.map((stop, idx) => (
          <motion.div
            key={stop._id}
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/40 backdrop-blur-xl rounded-[60px] border border-[#CBD3C7]/30 overflow-hidden shadow-bali group"
          >
            {/* Chapter Header */}
            <div
              className="flex items-center gap-8 px-12 py-10 cursor-pointer hover:bg-white transition-all duration-500"
              onClick={() => toggleDay(stop._id)}
            >
              <div className="w-20 h-20 rounded-[40px] bg-[#3F4F37] flex items-center justify-center text-[#F8F4EA] font-black text-2xl shrink-0 shadow-lg transform group-hover:rotate-12 transition-transform">
                {idx + 1}
              </div>
              <div className="flex-1 space-y-2">
                <p className="font-black text-[#1F241D] text-3xl tracking-tighter editorial-title">{stop.cityName}</p>
                <div className="flex items-center gap-6">
                  <p className="text-[9px] font-black text-[#6F756B] uppercase tracking-[0.4em] flex items-center gap-2">
                    <MapPin size={12} /> {stop.country}
                  </p>
                  <div className="w-1 h-1 bg-[#CBD3C7] rounded-full" />
                  <p className="text-[9px] font-black text-[#6F756B] uppercase tracking-[0.4em] flex items-center gap-2">
                    <Clock size={12} /> {activities.filter(a => a.stopId === stop._id).length} Memoirs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => { e.stopPropagation(); addActivity(stop._id); }}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-[#EEF1EA] text-[#3F4F37] hover:bg-[#3F4F37] hover:text-[#F8F4EA] transition-all border border-transparent"
                >
                  <Plus size={24} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); removeStop(stop._id); }}
                  className="w-14 h-14 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
                <div className="text-[#3F4F37]/40">
                  {expandedStops[stop._id] ? <ChevronUp size={28} /> : <ChevronDown size={28} />}
                </div>
              </div>
            </div>

            {/* Activities Sequence */}
            <AnimatePresence>
              {expandedStops[stop._id] && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-12 pb-12 space-y-8 relative overflow-hidden"
                >
                  <div className="absolute left-[78px] top-0 bottom-20 w-px bg-gradient-to-b from-[#3F4F37] to-transparent opacity-20" />
                  
                  {activities.filter(a => a.stopId === stop._id).map((activity) => {
                    const style = activityTypes[activity.category?.toLowerCase()] || activityTypes.activity;
                    return (
                      <motion.div
                        key={activity._id}
                        layout
                        className="flex items-start gap-10 group/item"
                      >
                        <div className="shrink-0 flex flex-col items-center mt-3">
                           <div className="w-16 h-16 rounded-[28px] bg-white border border-[#CBD3C7]/30 flex items-center justify-center text-3xl z-10 shadow-lg group-hover/item:scale-110 group-hover/item:rotate-6 transition-all">
                              {activity.icon || '📍'}
                           </div>
                        </div>

                        <div className="flex-1 bg-white border border-[#CBD3C7]/20 rounded-[50px] p-8 hover:shadow-editorial transition-all relative overflow-hidden">
                          <div className="flex items-start justify-between gap-6">
                            <div className="flex-1 space-y-4">
                              <div className="flex items-center gap-4">
                                <span className="text-[9px] font-black uppercase tracking-[0.4em] px-5 py-2 rounded-full" 
                                  style={{ backgroundColor: style.bg, color: style.color }}>
                                  {activity.category}
                                </span>
                                <span className="text-[9px] font-black text-[#6F756B]/60 uppercase tracking-[0.3em] flex items-center gap-2">
                                  <Clock size={12} /> {activity.duration}
                                </span>
                              </div>
                              <h5 className="text-2xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">{activity.title}</h5>
                              {activity.notes && <p className="text-sm text-[#6F756B] font-medium leading-relaxed italic">{activity.notes}</p>}
                            </div>
                            <div className="flex items-center gap-3 opacity-0 group-hover/item:opacity-100 transition-all">
                               <button onClick={() => removeActivity(activity._id)} className="p-3 rounded-full hover:bg-red-50 text-red-400 transition-all">
                                  <Trash2 size={16} />
                                </button>
                               <button className="p-3 rounded-full text-[#6F756B]/20 cursor-grab hover:text-[#1F241D]">
                                  <GripVertical size={16} />
                                </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {activities.filter(a => a.stopId === stop._id).length === 0 && (
                    <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 opacity-60">
                       <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#3F4F37]">A chapter waiting to be written</p>
                       <BtnGhost onClick={() => addActivity(stop._id)} className="!text-[#3F4F37] !font-black !text-[11px] underline">Add Memoir</BtnGhost>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.01, y: -5 }}
          whileTap={{ scale: 0.99 }}
          onClick={addStop}
          className="w-full py-16 rounded-[80px] border-4 border-dashed border-[#CBD3C7]/50 flex flex-col items-center justify-center gap-6 hover:bg-white/40 hover:border-[#3F4F37] transition-all group"
        >
          <div className="w-20 h-20 rounded-[32px] bg-[#EEF1EA] text-[#3F4F37] flex items-center justify-center group-hover:scale-110 group-hover:rotate-[15deg] transition-all shadow-lg border border-[#3F4F37]/10">
            <Plus size={32} />
          </div>
          <span className="font-black text-[#1F241D] text-2xl tracking-tighter editorial-title group-hover:text-[#3F4F37]">Begin New Chapter</span>
        </motion.button>
      </div>
    </div>
  );
};

export default ItineraryBuilderPage;
