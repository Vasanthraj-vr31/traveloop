import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, Plus, UserPlus, Activity, Crown, Edit2, Eye, Trash2,
  MessageSquare, Send, Shield, Globe, Clock, Star, Settings
} from 'lucide-react';
import { mockCollaborators, mockActivityFeed } from '../utils/mockData';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnSecondary, BtnGhost } from '../components/Buttons';
import Modal from '../components/Modal';
import { toast } from 'react-toastify';

const CollaborationPage = () => {
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Viewer');
  const [message, setMessage] = useState('');

  const messages = [
    { id: 1, user: 'Sneha Kumar', initials: 'SK', text: 'Should we add a day trip to Nikko?', time: '10:23 AM', self: false, color: '#FF8A5B' },
    { id: 2, user: 'Arjun Mehta', initials: 'AM', text: 'Yes! Let\'s fit it in on Day 8', time: '10:25 AM', self: true, color: '#4DB6AC' },
    { id: 3, user: 'Nisha Pillai', initials: 'NP', text: 'I\'ve added Nikko to the itinerary builder 🎉', time: '10:31 AM', self: false, color: '#FFD166' },
    { id: 4, user: 'Rahul Patel', initials: 'RP', text: 'Great! Don\'t forget to book the Shinkansen early', time: '10:45 AM', self: false, color: '#8ECAE6' },
  ];

  const handleInvite = () => {
    if (!inviteEmail) return;
    toast.success(`Invite sent to ${inviteEmail}!`);
    setInviteEmail('');
    setShowInvite(false);
  };

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#263238] tracking-tight">Team Collaboration 👥</h1>
          <p className="text-[#607D8B] font-medium mt-1">Real-time planning with your travel squad.</p>
        </div>
        <BtnPrimary onClick={() => setShowInvite(true)} icon={UserPlus}>Add Buddy</BtnPrimary>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Team Members & Permissions */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="!p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-[#263238]">The Squad ({mockCollaborators.length})</h3>
              <div className="flex -space-x-3">
                {mockCollaborators.map((c) => (
                  <div key={c.id} className="w-9 h-9 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[10px] font-black text-white" style={{ backgroundColor: c.color }}>
                    {c.initials}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              {mockCollaborators.map((c) => (
                <motion.div
                  key={c.id}
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-3.5 rounded-2xl hover:bg-[#FDF2E9] transition-all group"
                >
                  <div className="relative">
                    <div
                      className="w-12 h-12 rounded-[18px] flex items-center justify-center text-white text-sm font-black shadow-sm"
                      style={{ backgroundColor: c.color }}
                    >
                      {c.initials}
                    </div>
                    {c.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-[#263238] truncate">{c.name}</p>
                      {c.role === 'Owner' && <Crown size={12} className="text-[#FFD166]" />}
                    </div>
                    <p className="text-[10px] font-bold text-[#607D8B] uppercase tracking-widest">{c.role} · {c.online ? 'Online' : 'Away'}</p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-opacity">
                    <button className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white text-[#607D8B] transition-colors">
                      <Settings size={14} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => setShowInvite(true)}
              className="w-full mt-6 py-4 border-2 border-dashed border-[#F3D8C7] rounded-[24px] text-xs font-black text-[#607D8B] uppercase tracking-widest flex items-center justify-center gap-3 hover:border-[#FF8A5B] hover:text-[#FF8A5B] hover:bg-[#FF8A5B]/5 transition-all group"
            >
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> Invite more
            </button>
          </Card>

          <Card className="!p-8">
            <div className="flex items-center gap-3 mb-6">
               <Shield size={18} className="text-[#4DB6AC]" />
               <h3 className="text-lg font-black text-[#263238]">Access Control</h3>
            </div>
            <div className="space-y-3">
              {[
                { role: 'Owner', perms: 'Full Control', color: '#FF8A5B' },
                { role: 'Editor', perms: 'Modify Content', color: '#4DB6AC' },
                { role: 'Viewer', perms: 'View Only', color: '#607D8B' },
              ].map((r) => (
                <div key={r.role} className="flex items-center justify-between p-4 bg-[#FDF2E9]/60 rounded-2xl border border-transparent hover:border-[#F3D8C7] transition-all cursor-default">
                  <span className="text-xs font-black text-[#263238] uppercase tracking-widest">{r.role}</span>
                  <span className="text-[10px] font-bold text-[#607D8B] bg-white/60 px-3 py-1 rounded-full">{r.perms}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Center: Live Chat & Feed */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Real-time Activity Feed */}
          <Card className="!p-8 relative overflow-hidden">
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                  <Activity size={20} className="text-[#FF8A5B]" />
                  <h3 className="text-lg font-black text-[#263238]">Live Activity Feed</h3>
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-[#4DB6AC] animate-pulse">● Live Sync</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockActivityFeed.slice(0, 4).map((activity, i) => (
                <div key={activity.id} className="p-4 bg-[#FDF2E9]/50 border border-[#F3D8C7]/30 rounded-2xl flex items-start gap-4 hover:bg-white transition-all shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm shrink-0">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[#263238] leading-snug">
                       <span className="font-black">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-[9px] font-bold text-[#607D8B] uppercase tracking-widest mt-2 flex items-center gap-1.5">
                       <Clock size={10} /> {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Team Messaging */}
          <Card className="!p-0 flex flex-col h-[520px] overflow-hidden border-2 border-[#F3D8C7]/50 shadow-2xl shadow-orange-100/20">
            <div className="px-8 py-6 bg-white border-b border-[#F3D8C7]/30 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-2xl bg-[#4DB6AC] flex items-center justify-center text-white shadow-lg shadow-teal-50">
                    <MessageSquare size={20} />
                 </div>
                 <div>
                    <h3 className="text-lg font-black text-[#263238] tracking-tight">Team Chat</h3>
                    <p className="text-[10px] font-black text-[#4DB6AC] uppercase tracking-widest">3 Buddies Online</p>
                 </div>
              </div>
              <BtnGhost icon={Star} className="!text-[#FFD166]">Pinned</BtnGhost>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#FDF2E9]/20 hide-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                   key={msg.id}
                   initial={{ opacity: 0, x: msg.self ? 20 : -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   className={`flex items-end gap-3 ${msg.self ? 'flex-row-reverse' : ''}`}
                >
                  {!msg.self && (
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-sm" style={{ backgroundColor: msg.color }}>
                      {msg.initials}
                    </div>
                  )}
                  <div className={`max-w-[70%] group relative`}>
                    {!msg.self && <p className="text-[10px] font-black text-[#607D8B] uppercase tracking-widest mb-1.5 ml-1">{msg.user}</p>}
                    <div className={`px-5 py-4 rounded-[24px] text-sm font-medium shadow-sm transition-transform hover:scale-[1.02] ${
                      msg.self
                        ? 'bg-[#263238] text-white rounded-br-none shadow-gray-200'
                        : 'bg-white text-[#263238] border border-[#F3D8C7]/50 rounded-bl-none'
                    }`}>
                      {msg.text}
                      <p className={`text-[9px] mt-2 font-bold uppercase tracking-widest ${msg.self ? 'text-white/40' : 'text-[#607D8B]/40'}`}>{msg.time}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 bg-white border-t border-[#F3D8C7]/30">
               <div className="flex items-center gap-3 bg-[#FDF2E9] rounded-2xl px-5 py-2 focus-within:ring-2 focus-within:ring-[#FF8A5B]/20 transition-all">
                  <input
                    type="text"
                    placeholder="Type a message to the squad..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter' && message) { setMessage(''); toast.info('Sent!'); } }}
                    className="flex-1 bg-transparent py-3 text-sm text-[#263238] font-bold outline-none placeholder-[#607D8B]/40"
                  />
                  <button
                    onClick={() => { if (message) { setMessage(''); toast.info('Sent!'); } }}
                    className="w-10 h-10 bg-[#FF8A5B] rounded-xl flex items-center justify-center text-[#263238] hover:bg-[#FFD166] transition-all shadow-lg shadow-orange-100"
                  >
                    <Send size={18} />
                  </button>
               </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Invite Modal Refined */}
      <Modal
        isOpen={showInvite}
        onClose={() => setShowInvite(false)}
        title="Invite New Buddy"
        footer={
          <div className="flex gap-3 w-full">
            <BtnGhost onClick={() => setShowInvite(false)} className="flex-1">Cancel</BtnGhost>
            <BtnPrimary onClick={handleInvite} icon={Send} className="flex-1">Send Invite</BtnPrimary>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="text-center">
             <div className="w-20 h-20 rounded-[32px] bg-[#FDF2E9] flex items-center justify-center text-4xl mx-auto mb-4">👋</div>
             <h4 className="text-xl font-black text-[#263238]">Grow your squad</h4>
             <p className="text-sm text-[#607D8B] font-medium">Invite friends to view or edit this trip.</p>
          </div>
          
          <div>
            <label className="text-xs font-black text-[#607D8B] uppercase tracking-widest mb-2 block">Email Address</label>
            <input
              type="email"
              placeholder="explorer@email.com"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full bg-[#FDF2E9] rounded-2xl px-5 py-4 text-sm font-bold text-[#263238] outline-none border-2 border-transparent focus:border-[#FF8A5B]"
            />
          </div>
          
          <div>
            <label className="text-xs font-black text-[#607D8B] uppercase tracking-widest mb-3 block">Privileges</label>
            <div className="flex gap-2">
              {['Viewer', 'Editor'].map((r) => (
                <button
                  key={r}
                  onClick={() => setInviteRole(r)}
                  className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                    inviteRole === r ? 'bg-[#263238] text-white shadow-xl' : 'bg-[#FDF2E9] text-[#607D8B] hover:bg-[#F3D8C7]/30'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CollaborationPage;
