import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar as CalendarIcon, Clock, MapPin, ChevronRight,
  Printer, Download, Share2, Filter, Layout, List
} from 'lucide-react';
import { useTrips } from '../utils/TripContext';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost } from '../components/Buttons';
import { toast } from 'react-toastify';

const ItineraryViewPage = () => {
  const { itinerary: stops, activities, currentTrip } = useTrips();
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [activeDay, setActiveDay] = useState(0);

  // Reset activeDay when trip changes to prevent out-of-bounds indexing
  React.useEffect(() => {
    setActiveDay(0);
  }, [currentTrip?._id]);

  // Normalize data into the 'days' array structure expected by the UI
  const activitiesByDate = {};
  (activities || []).forEach(act => {
    const dateStr = act.date ? new Date(act.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Unknown Date';
    if (!activitiesByDate[dateStr]) activitiesByDate[dateStr] = [];
    activitiesByDate[dateStr].push(act);
  });

  let formattedDays = Object.keys(activitiesByDate).map((dateStr, index) => ({
    id: `day-${index}`,
    day: String(index + 1).padStart(2, '0'),
    title: `Day ${index + 1}`,
    date: dateStr,
    activities: activitiesByDate[dateStr].map((act, actIdx) => ({
      id: act._id || `act-${actIdx}`,
      time: act.date ? new Date(act.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'TBD',
      duration: 'Flexible',
      title: act.title,
      notes: act.category,
      icon: act.category === 'Culture' ? '🏛️' : act.category === 'Food' ? '🍱' : '✨'
    }))
  }));

  if (formattedDays.length === 0 && stops && stops.length > 0) {
    formattedDays = stops.map((stop, index) => ({
      id: stop._id || `day-${index}`,
      day: String(index + 1).padStart(2, '0'),
      title: stop.cityName || 'Unknown City',
      date: stop.startDate ? new Date(stop.startDate).toLocaleDateString() : 'Flexible',
      activities: []
    }));
  }

  if (formattedDays.length === 0) {
    formattedDays = [{
      id: 'empty-1',
      day: '01',
      title: 'Planning Phase',
      date: 'TBD',
      activities: []
    }];
  }

  const days = formattedDays;

  return (
    <div className="p-6 lg:p-10 animate-fade-in pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-6">
           <div className="w-16 h-16 rounded-[28px] bg-gradient-to-br from-[#FF8A5B] to-[#FFD166] flex items-center justify-center text-4xl shadow-xl shadow-orange-100">
              {currentTrip?.emoji || '✈️'}
           </div>
           <div>
              <h1 className="text-3xl font-black text-[#263238] tracking-tight">{currentTrip?.title || 'Trip Overview'}</h1>
              <p className="text-[#607D8B] font-medium flex items-center gap-2">
                 <span className="text-[#FF8A5B]">📍</span> {currentTrip?.destination} · {currentTrip?.startDate} to {currentTrip?.endDate}
              </p>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <BtnGhost onClick={() => toast.info('Exporting...')} icon={Download}>Export</BtnGhost>
           <BtnPrimary onClick={() => toast.success('Link copied!')} icon={Share2}>Share View</BtnPrimary>
        </div>
      </div>

      {/* Tabs / Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-10">
         <div className="flex p-1.5 bg-white/60 border border-[#F3D8C7] rounded-[28px] shadow-sm">
            {[
               { id: 'list', icon: List, label: 'Timeline View' },
               { id: 'calendar', icon: CalendarIcon, label: 'Calendar View' },
            ].map(v => (
               <button
                  key={v.id}
                  onClick={() => setViewMode(v.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-[20px] text-xs font-black uppercase tracking-widest transition-all ${
                     viewMode === v.id ? 'bg-[#FF8A5B] text-[#263238] shadow-md shadow-orange-100' : 'text-[#607D8B] hover:text-[#263238]'
                  }`}
               >
                  <v.icon size={16} /> {v.label}
               </button>
            ))}
         </div>

         <div className="flex gap-2 overflow-x-auto hide-scrollbar max-w-full lg:max-w-[500px] p-1">
            {days.map((day, i) => (
               <button
                  key={day.id}
                  onClick={() => setActiveDay(i)}
                  className={`flex flex-col items-center justify-center w-16 h-20 rounded-[24px] border-2 transition-all shrink-0 ${
                     activeDay === i 
                     ? 'border-[#FF8A5B] bg-white shadow-xl shadow-orange-100' 
                     : 'border-transparent bg-white/40 hover:bg-white text-[#607D8B]'
                  }`}
               >
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${activeDay === i ? 'text-[#FF8A5B]' : 'text-[#607D8B]/40'}`}>Day</span>
                  <span className={`text-xl font-black ${activeDay === i ? 'text-[#263238]' : 'text-[#607D8B]'}`}>{day.day}</span>
               </button>
            ))}
         </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         
         {/* Itinerary Focus */}
         <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
               {viewMode === 'list' ? (
                  <motion.div
                     key={`list-${activeDay}`}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-6"
                  >
                     <div className="mb-6 px-4">
                        <h2 className="text-2xl font-black text-[#263238]">{days[activeDay]?.title}</h2>
                        <p className="text-sm font-bold text-[#FF8A5B] uppercase tracking-widest mt-1">{days[activeDay]?.date}</p>
                     </div>
                     
                     <div className="space-y-4">
                        {days[activeDay]?.activities?.map((act, i) => (
                           <motion.div
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.1 }}
                              key={act.id}
                              className="bg-white/70 backdrop-blur-md border border-[#F3D8C7] rounded-[32px] p-6 hover:shadow-lg transition-all flex items-start gap-6 group"
                           >
                              <div className="w-14 h-14 rounded-2xl bg-[#FDF2E9] border border-[#F3D8C7] flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                                 {act.icon}
                              </div>
                              <div className="flex-1">
                                 <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#FF8A5B] bg-[#FF8A5B]/10 px-3 py-1 rounded-full">{act.time}</span>
                                    <span className="text-xs font-bold text-[#607D8B] opacity-50">{act.duration}</span>
                                 </div>
                                 <h4 className="text-xl font-black text-[#263238]">{act.title}</h4>
                                 {act.notes && <p className="text-[#607D8B] text-sm mt-2 leading-relaxed">{act.notes}</p>}
                                 
                                 <div className="mt-4 pt-4 border-t border-[#F3D8C7]/30 flex items-center gap-4">
                                    <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#4DB6AC] hover:underline">
                                       <MapPin size={12} /> Directions
                                    </button>
                                    <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#607D8B]/60 hover:underline">
                                       <CalendarIcon size={12} /> Add to Cal
                                    </button>
                                 </div>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </motion.div>
               ) : (
                  <motion.div
                     key="calendar-view"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-white/60 backdrop-blur-md border border-[#F3D8C7] rounded-[40px] p-10 h-[600px] flex items-center justify-center text-center"
                  >
                     <div>
                        <div className="text-6xl mb-6 opacity-30">🗓️</div>
                        <h3 className="text-2xl font-black text-[#263238] mb-2">Calendar Integration</h3>
                        <p className="text-[#607D8B] max-w-sm mx-auto font-medium">
                           Full month view with interactive drag & drop is available in the Pro version. Syncing with Google/Apple Calendar...
                        </p>
                        <BtnPrimary className="mt-8 mx-auto" onClick={() => toast.success('Calendars Synced!')}>Sync Now</BtnPrimary>
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>

         {/* Sidebar Stats & Info */}
         <div className="space-y-8">
            <Card>
               <h3 className="text-lg font-black text-[#263238] mb-6">Trip Statistics</h3>
               <div className="space-y-4">
                  {[
                     { label: 'Total Distance', value: '428 km', color: '#FF8A5B', icon: MapPin },
                     { label: 'Total Events', value: days.reduce((acc, d) => acc + (d.activities?.length || 0), 0), color: '#4DB6AC', icon: Layout },
                     { label: 'Transport Hours', value: '18.5h', color: '#8ECAE6', icon: Clock },
                  ].map(s => (
                     <div key={s.label} className="flex items-center gap-4 p-4 rounded-2xl bg-[#FDF2E9]/60">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.color + '22', color: s.color }}>
                           <s.icon size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-[#607D8B] uppercase tracking-widest">{s.label}</p>
                           <p className="text-lg font-black text-[#263238]">{s.value}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </Card>

            <Card className="bg-gradient-to-br from-[#4DB6AC] to-[#8ECAE6] text-white border-none shadow-xl shadow-teal-100/50 relative overflow-hidden">
               <div className="relative z-10">
                  <h3 className="text-lg font-black mb-2">Live Weather Sync</h3>
                  <p className="text-white/80 text-sm font-medium mb-6">Real-time alerts for {currentTrip?.destination}</p>
                  <div className="flex items-center justify-between">
                     <span className="text-5xl">⛅</span>
                     <div className="text-right">
                        <p className="text-3xl font-black">18°C</p>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-70">Mild Conditions</p>
                     </div>
                  </div>
               </div>
               <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </Card>

            <Card>
               <h3 className="text-lg font-black text-[#263238] mb-4">Pack Smartly</h3>
               <div className="space-y-3">
                  {[
                     { item: 'International Adapter', icon: '🔌' },
                     { item: 'JR Pass (Japan Only)', icon: '🎫' },
                     { item: 'Light Raincoat', icon: '🧥' },
                  ].map(item => (
                     <div key={item.item} className="flex items-center gap-3 p-3 hover:bg-[#FDF2E9] rounded-xl transition-colors cursor-pointer">
                        <span className="text-xl">{item.icon}</span>
                        <span className="text-sm font-bold text-[#263238]">{item.item}</span>
                        <ChevronRight size={14} className="ml-auto text-[#607D8B]/30" />
                     </div>
                  ))}
               </div>
               <BtnGhost className="w-full mt-4 !text-[#FF8A5B]" onClick={() => navigate('/packing')}>Full Checklist</BtnGhost>
            </Card>
         </div>
      </div>
    </div>
  );
};

export default ItineraryViewPage;
