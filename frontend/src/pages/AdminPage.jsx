import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Map, TrendingUp, DollarSign, Activity, Globe, ChevronUp,
  BarChart2, PieChart, Eye, Star, ArrowRight, Shield, Settings,
  Zap, Calendar, Clock, Download
} from 'lucide-react';
import { mockAdminStats } from '../utils/mockData';
import { Card, StatCard } from '../components/Cards';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import { BtnPrimary, BtnSecondary, BtnGhost } from '../components/Buttons';

const AdminPage = () => {
  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#263238] tracking-tight">Platform Admin 📊</h1>
          <p className="text-[#607D8B] font-medium mt-1">Global ecosystem overview and growth metrics.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-full">
          <Shield size={16} className="text-red-500" />
          <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">Enterprise Access</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Users', value: mockAdminStats.totalUsers.toLocaleString(), icon: Users, trend: 12, color: '#FF8A5B' },
          { label: 'Active Trips', value: mockAdminStats.activeTrips.toLocaleString(), icon: Map, trend: 8, color: '#4DB6AC' },
          { label: 'MRR Growth', value: `$${mockAdminStats.monthlyRevenue.toLocaleString()}`, icon: DollarSign, trend: 15, color: '#FFD166' },
          { label: 'Avg Session', value: mockAdminStats.avgSessionTime, icon: Activity, color: '#8ECAE6' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
        {/* User Growth Chart */}
        <Card className="lg:col-span-2 !p-8">
          <div className="flex items-center justify-between mb-10">
            <div>
               <h3 className="text-xl font-black text-[#263238]">User Acquisition</h3>
               <p className="text-xs font-bold text-[#607D8B] mt-1">Growth trend for last 6 months</p>
            </div>
            <div className="px-4 py-1.5 bg-green-50 text-green-600 font-black text-[10px] uppercase tracking-widest rounded-full border border-green-100 flex items-center gap-1.5 shadow-sm">
              <ChevronUp size={14} /> 12% Monthly
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAdminStats.userGrowth}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F3D8C7" opacity={0.5} />
                <XAxis 
                   dataKey="month" 
                   tick={{ fontSize: 10, fontWeight: 'black', fill: '#607D8B' }} 
                   axisLine={false} 
                   tickLine={false} 
                   dy={10}
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 'black' }} 
                   formatter={(v) => [v.toLocaleString(), 'Users']} 
                />
                <Line 
                   type="monotone" 
                   dataKey="users" 
                   stroke="#FF8A5B" 
                   strokeWidth={4} 
                   dot={{ fill: '#FF8A5B', strokeWidth: 0, r: 6 }} 
                   activeDot={{ r: 8, stroke: 'white', strokeWidth: 4 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Destinations */}
        <Card className="!p-8">
          <h3 className="text-xl font-black text-[#263238] mb-8 flex items-center gap-3">
            <Globe size={20} className="text-[#4DB6AC]" /> Market Share
          </h3>
          <div className="space-y-6">
            {mockAdminStats.topDestinations.map((dest, i) => (
              <div key={dest.name} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-[#FF8A5B] w-4">{i + 1}</span>
                    <span className="text-sm font-bold text-[#263238]">{dest.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-[#607D8B] uppercase tracking-widest">{dest.trips.toLocaleString()} trips</span>
                </div>
                <div className="w-full bg-[#FDF2E9] rounded-full h-2 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${dest.percentage}%` }}
                    transition={{ delay: i * 0.1 + 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#FF8A5B] to-[#FFD166] group-hover:shadow-[0_0_10px_#FF8A5B] transition-shadow"
                  />
                </div>
              </div>
            ))}
          </div>
          <BtnGhost className="w-full mt-8 !text-[#FF8A5B]" icon={ArrowRight}>Full Market Report</BtnGhost>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Revenue Mini Chart */}
        <Card className="!p-8">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-xl font-black text-[#263238]">Monthly Revenue</h3>
             <span className="text-[10px] font-black text-[#4DB6AC] uppercase tracking-widest">$ USD</span>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { month: 'Jan', revenue: 32000 },
                { month: 'Feb', revenue: 36000 },
                { month: 'Mar', revenue: 41000 },
                { month: 'Apr', revenue: 38000 },
                { month: 'May', revenue: 44000 },
                { month: 'Jun', revenue: 48200 },
              ]}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#F3D8C7" opacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontWeight: 'black', fill: '#607D8B' }} axisLine={false} tickLine={false} dy={5} />
                <Tooltip 
                   contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', fontWeight: 'black' }}
                   formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} 
                />
                <Bar dataKey="revenue" fill="#4DB6AC" radius={[8, 8, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Onboarding */}
        <Card className="!p-8">
          <h3 className="text-xl font-black text-[#263238] mb-8 flex items-center gap-3">
            <Users size={20} className="text-[#FF8A5B]" /> Recent Onboarding
          </h3>
          <div className="space-y-4">
            {mockAdminStats.recentUsers.map((user, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-4 p-4 rounded-[28px] bg-[#FDF2E9]/40 border border-transparent hover:border-[#F3D8C7] hover:bg-white transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF8A5B] to-[#FFD166] flex items-center justify-center text-[#263238] text-sm font-black shadow-sm">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-[#263238] truncate group-hover:text-[#FF8A5B] transition-colors">{user.name}</p>
                  <p className="text-[10px] font-bold text-[#607D8B] uppercase tracking-widest mt-1">{user.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-[#4DB6AC] uppercase tracking-widest">{user.joined}</p>
                  <p className="text-[9px] font-bold text-[#607D8B] mt-0.5">{user.trips} Trips</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Admin Command Center */}
      <Card className="!p-10 bg-gradient-to-br from-[#263238] to-[#455A64] text-white border-none shadow-2xl shadow-blue-100 relative overflow-hidden">
        <div className="relative z-10">
           <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
             <Settings size={24} className="text-[#FFD166]" /> Admin Command Center
           </h3>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {[
               { label: 'User Control', icon: '👥', color: '#FF8A5B' },
               { label: 'Trust & Safety', icon: '🛡️', color: '#4DB6AC' },
               { label: 'System Logs', icon: '📟', color: '#FFD166' },
               { label: 'API Keys', icon: '🔑', color: '#8ECAE6' },
             ].map((action) => (
               <motion.button
                 key={action.label}
                 whileHover={{ scale: 1.05, y: -4 }}
                 whileTap={{ scale: 0.95 }}
                 className="flex flex-col items-center gap-4 p-8 rounded-[40px] bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all group"
               >
                 <span className="text-5xl group-hover:rotate-12 transition-transform duration-500">{action.icon}</span>
                 <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">{action.label}</span>
               </motion.button>
             ))}
           </div>
        </div>
        
        {/* Animated Background Deco */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none" />
      </Card>
    </div>
  );
};

export default AdminPage;
