import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, WifiOff, Download, RefreshCw, Check, HardDrive, Cloud, AlertCircle, Battery, Zap, Smartphone, Globe } from 'lucide-react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnSecondary, BtnGhost } from '../components/Buttons';
import { toast } from 'react-toastify';

const OfflinePage = () => {
  const [isOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [downloadedTrips, setDownloadedTrips] = useState(['t1', 't4']);

  const trips = [
    { id: 't1', title: 'Tokyo & Kyoto Adventure', size: '4.2 MB', emoji: '🗾' },
    { id: 't2', title: 'Bali Paradise Retreat', size: '2.8 MB', emoji: '🏝️' },
    { id: 't3', title: 'Swiss Alps Explorer', size: '1.9 MB', emoji: '🏔️' },
    { id: 't4', title: 'Rajasthan Royal Tour', size: '3.5 MB', emoji: '🏯' },
  ];

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      toast.success('✨ All local data synced!');
    }, 2500);
  };

  const toggleDownload = (id) => {
    if (downloadedTrips.includes(id)) {
      setDownloadedTrips(prev => prev.filter(t => t !== id));
      toast.info('Removed from local storage');
    } else {
      setDownloadedTrips(prev => [...prev, id]);
      toast.success('Downloaded for offline use!');
    }
  };

  return (
    <div className="p-6 lg:p-10 animate-fade-in pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#263238] tracking-tight">Offline Engine 📶</h1>
          <p className="text-[#607D8B] font-medium mt-1">Your data is safe, even in the middle of the ocean.</p>
        </div>
        <BtnGhost onClick={handleSync} loading={syncing} icon={RefreshCw}>Force Sync</BtnGhost>
      </div>

      {/* Connectivity Status Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-10 p-10 rounded-[48px] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden ${
          isOnline 
            ? 'bg-gradient-to-br from-[#4DB6AC] to-[#8ECAE6] text-white shadow-teal-100' 
            : 'bg-gradient-to-br from-[#FF8A5B] to-[#FFD166] text-[#263238] shadow-orange-100'
        }`}
      >
        <div className={`w-20 h-20 rounded-[32px] bg-white flex items-center justify-center shadow-xl relative ${isOnline ? 'text-[#4DB6AC]' : 'text-[#FF8A5B]'}`}>
           {isOnline ? <Wifi size={36} /> : <WifiOff size={36} />}
           <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full border-4 border-white ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
        </div>
        
        <div className="flex-1 text-center md:text-left relative z-10">
           <h2 className="text-3xl font-black tracking-tight mb-2">
              {isOnline ? 'Global Sync Active' : 'Running Local Mode'}
           </h2>
           <p className="text-white/80 font-medium leading-relaxed max-w-md">
              {isOnline 
                ? 'Your changes are being synchronized in real-time with our secure cloud servers. Everything is up to date.' 
                : 'No internet connection detected. You can still view and edit your saved trips; changes will sync once you are back online.'}
           </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-[32px] p-6 border border-white/20 text-center min-w-[160px]">
           <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Health Status</p>
           <p className="text-2xl font-black">{isOnline ? 'Stable' : 'Offline'}</p>
           <div className="flex justify-center gap-1 mt-3">
              {[1, 2, 3, 4].map(i => (
                 <div key={i} className={`w-1.5 h-4 rounded-full ${i < 4 ? 'bg-white' : 'bg-white/20'}`} />
              ))}
           </div>
        </div>
        
        {/* Animated Background Deco */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left: Device & Storage */}
        <div className="md:col-span-4 space-y-8">
           <Card className="!p-8">
              <h3 className="text-lg font-black text-[#263238] mb-6 flex items-center gap-2">
                 <HardDrive size={18} className="text-[#FF8A5B]" /> Local Vault
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Cloud Cache', value: '12.5 MB', icon: Cloud, color: '#4DB6AC' },
                  { label: 'Photo Vault', value: '428 MB', icon: Smartphone, color: '#FFD166' },
                  { label: 'Free Space', value: '2.4 GB', icon: Zap, color: '#8ECAE6' },
                ].map(({ label, value, icon: Icon, color }) => (
                  <div key={label} className="flex items-center gap-4 p-4 bg-[#FDF2E9]/60 rounded-2xl border border-transparent hover:border-[#F3D8C7] transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center" style={{ color }}>
                       <Icon size={20} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-[#607D8B] uppercase tracking-widest">{label}</p>
                       <p className="text-lg font-black text-[#263238]">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
           </Card>

           <Card className="!p-8 !bg-[#263238] text-white border-none shadow-xl shadow-gray-200">
              <div className="flex items-center gap-3 mb-6">
                 <Smartphone size={20} className="text-[#FF8A5B]" />
                 <h3 className="text-lg font-black tracking-tight">App Experience</h3>
              </div>
              <div className="space-y-4">
                 {[
                    { label: 'Home Install', val: 'Active' },
                    { label: 'Push Updates', val: 'Ready' },
                    { label: 'Auth Token', val: 'Secure' },
                 ].map(s => (
                    <div key={s.label} className="flex items-center justify-between py-3 border-b border-white/10 last:border-0">
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{s.label}</span>
                       <span className="text-[10px] font-black uppercase tracking-widest text-[#4DB6AC]">{s.val}</span>
                    </div>
                 ))}
              </div>
              <BtnGhost className="w-full mt-6 !bg-white/10 !text-white" icon={Globe}>Offline Docs</BtnGhost>
           </Card>
        </div>

        {/* Right: Offline Trip Management */}
        <div className="md:col-span-8 space-y-8">
           <Card className="!p-8">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-[#263238]">Managed Offline Storage</h3>
                 <span className="px-3 py-1 bg-[#FDF2E9] rounded-full text-[10px] font-black text-[#FF8A5B] uppercase tracking-widest">{downloadedTrips.length} Trips Saved</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trips.map((trip) => {
                  const isDownloaded = downloadedTrips.includes(trip.id);
                  return (
                    <motion.div
                      key={trip.id}
                      whileHover={{ y: -4 }}
                      className={`p-6 rounded-[32px] border-2 transition-all flex items-center gap-5 ${
                        isDownloaded ? 'bg-white border-[#FF8A5B] shadow-xl shadow-orange-50' : 'bg-[#FDF2E9]/40 border-transparent hover:bg-white hover:border-[#F3D8C7]'
                      }`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-[#FDF2E9] flex items-center justify-center text-4xl shadow-inner shrink-0 transition-transform group-hover:scale-110">
                        {trip.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-[#263238] truncate">{trip.title}</p>
                        <p className="text-[10px] font-bold text-[#607D8B] uppercase tracking-widest mt-1">{trip.size}</p>
                        <button
                          onClick={() => toggleDownload(trip.id)}
                          className={`mt-4 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                            isDownloaded 
                              ? 'bg-[#4DB6AC] text-white shadow-lg shadow-teal-100' 
                              : 'bg-white border border-[#F3D8C7] text-[#607D8B] hover:bg-[#FF8A5B] hover:text-[#263238] hover:border-[#FF8A5B]'
                          }`}
                        >
                          {isDownloaded ? <><Check size={14} /> Saved</> : <><Download size={14} /> Download</>}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
           </Card>

           <div className="p-8 rounded-[40px] border-2 border-dashed border-[#F3D8C7] bg-white/40 flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-[24px] bg-[#FDF2E9] flex items-center justify-center text-4xl shadow-inner">⚡</div>
              <div className="flex-1 text-center md:text-left">
                 <h4 className="text-lg font-black text-[#263238]">Instant Re-Sync</h4>
                 <p className="text-sm font-medium text-[#607D8B] mt-1 leading-relaxed">We automatically bridge the gap when your connection returns. No data is ever lost during the transition.</p>
              </div>
              <BtnPrimary onClick={handleSync} loading={syncing} icon={RefreshCw} className="!px-10">Manual Sync</BtnPrimary>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
