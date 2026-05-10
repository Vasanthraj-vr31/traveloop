import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Phone, Hospital, AlertTriangle, MapPin, ChevronRight, Globe, LifeBuoy, HeartPulse, ExternalLink, Zap } from 'lucide-react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost, BtnHighlight } from '../components/Buttons';
import { useTrips } from '../utils/TripContext';
import { toast } from 'react-toastify';

const EmergencyPage = () => {
  const { currentTrip } = useTrips();

  const emergencyContacts = [
    { label: 'Police', number: '110', icon: '🚔', color: '#3F4F37' },
    { label: 'Ambulance', number: '119', icon: '🚑', color: '#EF4444' },
    { label: 'Fire Dept', number: '119', icon: '🚒', color: '#F97316' },
    { label: 'Embassy', number: '+81-3-3280-5555', icon: '🏛️', color: '#6F756B' },
  ];

  const safetyTips = [
    "Japan is incredibly safe, but always keep your passport copy digital.",
    "The local emergency number for English support is 03-3501-0110.",
    "Always carry your hotel's business card with the address in Japanese.",
    "Earthquake drills are common; follow local guidance immediately."
  ];

  if (!currentTrip) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Select a trip to view safety info</div>;

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 border-b border-[#CBD3C7]/30 pb-10">
        <div>
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-4">Safety & Support</div>
           <h1 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
             Guardian <span className="italic font-normal text-[#6F756B]">Protocol</span>
           </h1>
           <p className="text-[#6F756B] font-medium mt-4 italic">Peace of mind for your journey in {currentTrip.destination}.</p>
        </div>
        <button 
          onClick={() => toast.error('Connecting to Traveloop Concierge...')}
          className="flex items-center gap-3 px-10 py-5 bg-red-50 text-red-500 rounded-full font-black text-[10px] uppercase tracking-[0.2em] border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-50"
        >
           <LifeBuoy size={20} /> Secure Concierge
        </button>
      </div>

      {/* Safety Alert Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-16 p-12 bg-[#3F4F37] rounded-[80px] text-[#F8F4EA] flex flex-col md:flex-row items-center gap-12 shadow-editorial relative overflow-hidden"
      >
        <div className="w-20 h-20 rounded-[32px] bg-white/10 backdrop-blur-xl flex items-center justify-center text-4xl shadow-lg border border-white/20">
           🛡️
        </div>
        <div className="flex-1 text-center md:text-left z-10">
          <h2 className="text-3xl font-black tracking-tight mb-2 editorial-title">Destination Safety: Verified</h2>
          <p className="text-[#F8F4EA]/70 font-medium leading-relaxed max-w-2xl">
             {currentTrip.destination} remains a high-security zone for elite travelers. Local emergency services are highly responsive and Traveloop protocols are active.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 p-6 rounded-[40px] border border-white/10">
           <span className="text-5xl">🟢</span>
           <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Threat Level</p>
              <p className="text-2xl font-black uppercase tracking-tighter">Minimal</p>
           </div>
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Emergency Contacts Panel */}
        <div className="md:col-span-7 space-y-10">
          <Card className="!p-10 shadow-bali">
            <h3 className="text-2xl font-black text-[#1F241D] mb-10 flex items-center gap-4 editorial-title">
               <Phone size={24} className="text-red-500" /> One-Touch Support
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {emergencyContacts.map((contact) => (
                <motion.button
                  key={contact.label}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toast.info(`Initializing secure call to ${contact.label}: ${contact.number}`)}
                  className="p-8 rounded-[48px] text-left border-2 border-transparent hover:border-current transition-all group flex items-center gap-6 shadow-sm"
                  style={{ backgroundColor: contact.color + '15', color: contact.color }}
                >
                  <span className="text-5xl group-hover:rotate-12 transition-transform">{contact.icon}</span>
                  <div>
                    <p className="text-3xl font-black tracking-tighter leading-none mb-1">{contact.number}</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">{contact.label}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </Card>

          <Card className="!p-10 shadow-bali">
            <h3 className="text-2xl font-black text-[#1F241D] mb-10 flex items-center gap-4 editorial-title">
               <Shield size={24} className="text-[#3F4F37]" /> Safety Wisdom
            </h3>
            <div className="space-y-4">
              {safetyTips.map((tip, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-6 p-6 bg-[#EEF1EA]/40 border border-[#CBD3C7]/20 rounded-[32px] hover:bg-white hover:shadow-editorial transition-all"
                >
                  <div className="w-10 h-10 rounded-2xl bg-[#3F4F37] flex items-center justify-center text-[#F8F4EA] shadow-sm shrink-0 mt-0.5">
                     <Zap size={18} />
                  </div>
                  <p className="text-base font-bold text-[#1F241D] leading-relaxed italic">"{tip}"</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Resources Panel */}
        <div className="md:col-span-5 space-y-10">
          <Card className="!p-10 shadow-bali">
            <h3 className="text-2xl font-black text-[#1F241D] mb-10 flex items-center gap-4 editorial-title">
               <Hospital size={24} className="text-[#3F4F37]" /> Medical Network
            </h3>
            <div className="space-y-6">
              {[
                { name: 'Red Cross Hospital', distance: '1.2km', type: '24/7' },
                { name: 'St. Lukes International', distance: '3.4km', type: 'Specialist' },
                { name: 'University Medical Center', distance: '5.8km', type: 'General' },
              ].map((hospital, i) => (
                <motion.div
                  key={i}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-5 p-6 bg-[#EEF1EA]/40 rounded-[32px] border border-transparent hover:border-[#CBD3C7] hover:bg-white transition-all cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm shrink-0">🏥</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-[#1F241D] text-lg leading-tight truncate">{hospital.name}</p>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[10px] font-black text-[#6F756B] uppercase tracking-widest flex items-center gap-1">
                          <MapPin size={10} /> {hospital.distance}
                       </span>
                       <span className="px-2 py-0.5 bg-[#3F4F37]/10 text-[#3F4F37] text-[9px] font-black rounded-full uppercase">{hospital.type}</span>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-[#CBD3C7] group-hover:text-[#3F4F37] transition-colors" />
                </motion.div>
              ))}
            </div>
          </Card>

          {/* SOS Panic Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
               toast.error('🚨 SOS ACTIVATED! Connecting to elite security and notifying your squad...', {
                  autoClose: 5000,
                  style: { background: '#263322', color: '#F8F4EA', borderRadius: '32px', fontWeight: 'bold' }
               });
            }}
            className="w-full py-10 bg-[#1F241D] text-[#F8F4EA] rounded-[64px] flex flex-col items-center justify-center gap-3 shadow-editorial relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-red-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
            <div className="relative z-10 flex items-center gap-4">
               <span className="text-4xl animate-pulse">🚨</span>
               <span className="text-2xl font-black tracking-[0.3em] uppercase">Emergency SOS</span>
               <span className="text-4xl animate-pulse">🚨</span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 relative z-10">Notify squad & local authorities</p>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;
