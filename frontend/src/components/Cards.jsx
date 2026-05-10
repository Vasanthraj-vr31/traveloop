import React from 'react';
import { motion } from 'framer-motion';

// Base Card - Luxury Bali Style
export const Card = ({ children, className = '', onClick, hover = false }) => (
  <motion.div
    whileHover={hover || onClick ? { y: -8, boxShadow: '0 30px 70px rgba(31, 36, 29, 0.08)' } : {}}
    onClick={onClick}
    className={`bg-[#F7F5EF] border border-[#CBD3C7]/50 rounded-[48px] p-10 shadow-bali transition-all duration-500 ${onClick ? 'cursor-pointer' : ''} ${className}`}
  >
    {children}
  </motion.div>
);

// Stat Card - Premium Analytics
export const StatCard = ({ label, value, icon: Icon, trend, color = '#3F4F37', className = '' }) => (
  <Card className={`${className} !p-8`}>
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em] mb-4">{label}</p>
        <p className="text-4xl font-black text-[#1F241D] tracking-tighter leading-none editorial-title">₹{value}</p>
        {trend && (
          <div className="flex items-center gap-3 mt-6">
            <span className={`text-[9px] font-black px-4 py-2 rounded-full ${trend > 0 ? 'bg-[#3F4F37] text-[#F8F4EA]' : 'bg-[#CBD3C7] text-[#1F241D]'}`}>
               {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
            <span className="text-[9px] font-bold text-[#6F756B] uppercase tracking-widest">Growth</span>
          </div>
        )}
      </div>
      {Icon && (
        <div className="w-16 h-16 rounded-[28px] flex items-center justify-center border border-[#CBD3C7]" style={{ backgroundColor: color + '10' }}>
          <Icon size={24} style={{ color }} strokeWidth={2} />
        </div>
      )}
    </div>
  </Card>
);

// Trip Card - Cinematic Editorial Style
export const TripCard = ({ trip, onClick }) => (
  <motion.div
    whileHover={{ y: -15, boxShadow: '0 50px 100px rgba(31, 36, 29, 0.12)' }}
    onClick={onClick}
    className="bg-[#F7F5EF] rounded-[60px] overflow-hidden cursor-pointer border border-[#CBD3C7]/50 shadow-bali group transition-all duration-700"
  >
    <div className="h-72 relative overflow-hidden">
      <img 
        src={trip.coverImage || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800'} 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        alt={trip.title}
      />
      <div className="absolute inset-0 cinematic-overlay" />
      
      <div className="absolute top-10 right-10">
        <span className="text-[9px] font-black px-6 py-3 rounded-full glass-bali border border-white/40 uppercase tracking-[0.3em] shadow-xl text-[#1F241D]">
          {trip.status}
        </span>
      </div>
      
      <div className="absolute bottom-10 left-10">
         <div className="flex items-center gap-3 text-white/80">
            <span className="text-3xl">{trip.emoji || '🌿'}</span>
            <div className="text-[10px] font-black uppercase tracking-widest">{trip.days || 0} Day Story</div>
         </div>
      </div>
    </div>
    
    <div className="p-12">
      <div className="flex justify-between items-start mb-6">
         <h3 className="font-black text-[#1F241D] text-4xl tracking-tighter editorial-title group-hover:text-[#3F4F37] transition-colors">{trip.title}</h3>
         <div className="w-14 h-14 rounded-full border border-[#CBD3C7] flex items-center justify-center text-[#263322] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-sm">
            <span className="text-2xl">→</span>
         </div>
      </div>
      
      <p className="text-[#6F756B] text-base font-bold mb-12 flex items-center gap-4">
        <span className="w-2.5 h-2.5 rounded-full bg-[#3F4F37]" /> {trip.destination} · <span className="opacity-50 uppercase tracking-widest text-[11px]">Chapter Archive</span>
      </p>
      
      <div className="flex items-center justify-between pt-10 border-t border-[#CBD3C7]/30">
        <div className="flex -space-x-4">
          {(trip.collaborators || []).slice(0, 3).map((collab, i) => (
            <div key={i} className="w-14 h-14 rounded-[24px] bg-[#263322] text-[#F8F4EA] flex items-center justify-center text-xs font-black border-4 border-[#F7F5EF] shadow-lg">
              {typeof collab === 'string' ? collab : (collab.name ? collab.name.substring(0, 2).toUpperCase() : '??')}
            </div>
          ))}
          {trip.collaborators && trip.collaborators.length > 3 && (
            <div className="w-14 h-14 rounded-[24px] bg-[#DDE3DC] flex items-center justify-center text-[#263322] text-xs font-black border-4 border-[#F7F5EF] shadow-lg">
              +{trip.collaborators.length - 3}
            </div>
          )}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] mb-2">Investment</p>
          <p className="text-3xl font-black text-[#1F241D] tracking-tighter editorial-title">₹{(trip.budget || 0).toLocaleString()}</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// Skeleton Card - Cinematic Shimmer
export const SkeletonCard = () => (
  <div className="bg-[#F7F5EF] rounded-[60px] overflow-hidden border border-[#CBD3C7]/50 animate-pulse shadow-sm">
    <div className="h-72 w-full bg-[#DDE3DC]" />
    <div className="p-12 space-y-10">
      <div className="h-12 w-3/4 bg-[#DDE3DC] rounded-3xl" />
      <div className="h-8 w-1/2 bg-[#DDE3DC] rounded-3xl" />
      <div className="pt-10 border-t border-[#CBD3C7]/30 flex justify-between">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-[24px] bg-[#DDE3DC]" />
          <div className="w-14 h-14 rounded-[24px] bg-[#DDE3DC]" />
        </div>
        <div className="w-32 h-12 bg-[#DDE3DC] rounded-3xl" />
      </div>
    </div>
  </div>
);
