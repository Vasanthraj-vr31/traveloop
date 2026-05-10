import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, MapPin, Calendar, Camera, Globe, TrendingUp, Award, Zap, Sparkles } from 'lucide-react';
import { mockStats, mockUser } from '../utils/mockData';
import { Card } from '../components/Cards';
import { BtnGhost } from '../components/Buttons';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';

const StatsPage = () => {
  const earnedBadges = mockStats.badges.filter(b => b.earned);
  const lockedBadges = mockStats.badges.filter(b => !b.earned);

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#263238] tracking-tight">Travel Stats 🏆</h1>
          <p className="text-[#607D8B] font-medium mt-1">Your global impact and exploration milestones.</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="px-5 py-2 bg-white border border-[#F3D8C7] rounded-full text-[10px] font-black uppercase tracking-widest text-[#FF8A5B]">
              Ranked Top 3%
           </div>
        </div>
      </div>

      {/* Level Progress Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#263238] to-[#455A64] rounded-[48px] p-10 md:p-14 mb-10 text-white relative overflow-hidden shadow-2xl shadow-blue-100"
      >
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
            <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#FF8A5B] to-[#FFD166] flex items-center justify-center text-5xl shadow-2xl shadow-orange-500/20 animate-float">
               ⭐
            </div>
            <div className="flex-1">
              <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Explorer Status</p>
              <h2 className="text-4xl font-black tracking-tight mb-2">{mockUser.level}</h2>
              <p className="text-white/60 font-bold flex items-center gap-2">
                 <Zap size={16} className="text-[#FFD166]" /> {mockUser.points.toLocaleString()} Experience Points
              </p>
            </div>
            <div className="md:text-right">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Next Milestone</p>
              <p className="text-xl font-black text-[#FFD166]">Platinum Traveler</p>
              <p className="text-sm font-bold opacity-60">{5000 - mockUser.points} pts remaining</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-full bg-white/10 rounded-full h-5 p-1 border border-white/5 overflow-hidden backdrop-blur-sm shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(mockUser.points / 5000) * 100}%` }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-[#FF8A5B] to-[#FFD166] rounded-full shadow-[0_0_15px_rgba(255,138,91,0.5)]"
              />
            </div>
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
              <span>Silver Level</span>
              <span className="text-white/80">{((mockUser.points / 5000) * 100).toFixed(0)}% Completed</span>
              <span>Platinum Level</span>
            </div>
          </div>
        </div>
        
        {/* Background Decorations */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#FF8A5B]/10 rounded-full blur-[100px]" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-[#4DB6AC]/10 rounded-full blur-[80px]" />
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
        {[
          { label: 'Trips', value: mockStats.totalTrips, icon: '✈️', color: '#FF8A5B' },
          { label: 'Countries', value: mockStats.countriesVisited, icon: '🌍', color: '#4DB6AC' },
          { label: 'Cities', value: mockStats.citiesExplored, icon: '🏙️', color: '#FFD166' },
          { label: 'Days', value: mockStats.totalDays, icon: '📅', color: '#8ECAE6' },
          { label: 'Photos', value: mockStats.photosUploaded, icon: '📸', color: '#FF8A5B' },
          { label: 'Rating', value: mockStats.avgRating, icon: '⭐', color: '#FFD166' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-[#F3D8C7] rounded-[32px] p-6 text-center hover:shadow-xl hover:shadow-orange-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2E9] mx-auto mb-4 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
               {s.icon}
            </div>
            <p className="text-2xl font-black text-[#263238]">{s.value}</p>
            <p className="text-[10px] font-black text-[#607D8B] uppercase tracking-widest mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Achievements & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <Card className="!p-8">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-xl font-black text-[#263238]">Collected Badges ({earnedBadges.length})</h3>
             <Trophy size={20} className="text-[#FFD166]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {earnedBadges.map((badge, i) => (
              <motion.div
                key={badge.id}
                whileHover={{ y: -4 }}
                className="p-5 rounded-[32px] bg-[#FDF2E9]/60 border border-[#F3D8C7]/30 text-center relative group"
              >
                <div className="absolute top-3 right-3 text-[#FFD166]">
                   <Sparkles size={12} />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white mx-auto mb-4 flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">
                   {badge.icon}
                </div>
                <p className="text-xs font-black text-[#263238] uppercase tracking-widest leading-tight">{badge.name}</p>
                <p className="text-[9px] font-bold text-[#607D8B] mt-2 leading-relaxed opacity-60 px-2">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="!p-8">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-[#263238]">Next Achievements</h3>
              <Award size={20} className="text-[#607D8B]/20" />
           </div>
          <div className="space-y-4">
            {lockedBadges.map((badge, i) => (
              <div key={badge.id} className="p-4 bg-white/40 border-2 border-dashed border-[#F3D8C7] rounded-[28px] flex items-center gap-5 grayscale opacity-40">
                <div className="w-14 h-14 rounded-2xl bg-[#FDF2E9] flex items-center justify-center text-3xl shrink-0">
                   {badge.icon}
                </div>
                <div>
                   <p className="text-xs font-black text-[#263238] uppercase tracking-widest">{badge.name}</p>
                   <p className="text-[10px] font-bold text-[#607D8B] mt-1">{badge.description}</p>
                </div>
                <div className="ml-auto">
                   <div className="w-8 h-8 rounded-full border-2 border-[#F3D8C7] flex items-center justify-center text-[#607D8B]/40">
                      🔒
                   </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Travel Trend Chart */}
      <Card className="!p-10">
        <div className="flex items-center justify-between mb-10">
           <div>
              <h3 className="text-xl font-black text-[#263238]">Travel Frequency</h3>
              <p className="text-xs font-bold text-[#607D8B] mt-1">Monthly trend for current year</p>
           </div>
           <BtnGhost icon={TrendingUp} className="!text-[#FF8A5B]">Yearly View</BtnGhost>
        </div>
        <div className="h-64">
           <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockStats.monthlyTrips}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F3D8C7" opacity={0.5} />
                <XAxis 
                   dataKey="month" 
                   tick={{ fontSize: 10, fontWeight: 'black', fill: '#607D8B' }} 
                   axisLine={false} 
                   tickLine={false} 
                   dy={10}
                />
                <Tooltip 
                   cursor={{ fill: '#FDF2E9' }}
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 'black' }}
                />
                <Bar dataKey="trips" fill="#FF8A5B" radius={[12, 12, 0, 0]} barSize={40} />
              </BarChart>
           </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default StatsPage;
