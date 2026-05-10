import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, MapPin, Globe, Camera, Bell, Shield, CreditCard,
  ChevronRight, Edit2, Check, Trash2, Download, Zap, Star, Loader2
} from 'lucide-react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnSecondary, BtnGhost, BtnHighlight } from '../components/Buttons';
import { toast } from 'react-toastify';
import { useTrips } from '../utils/TripContext';
import { authAPI } from '../services/api';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [form, setForm] = useState({
    name: user.name || '',
    email: user.email || '',
    location: user.location || 'Undisclosed',
    bio: user.bio || 'Global Explorer',
  });
  const [saving, setSaving] = useState(false);

  const { trips } = useTrips();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'notifications', label: 'Notifs', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '🔒' },
    { id: 'billing', label: 'Billing', icon: '💳' },
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await authAPI.updateProfile(form);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const notifSettings = [
    { label: 'Trip Reminders', desc: 'Get notified before your trips', on: true },
    { label: 'Collaboration Updates', desc: 'When team members make changes', on: true },
    { label: 'Budget Alerts', desc: 'When approaching budget limit', on: false },
    { label: 'Weather Alerts', desc: 'Weather updates for destinations', on: true },
    { label: 'AI Insights', desc: 'Smart suggestions and recommendations', on: false },
  ];

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 border-b border-[#CBD3C7]/30 pb-10">
        <div>
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-4">Identity Hub</div>
           <h1 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
             User <span className="italic font-normal text-[#6F756B]">Preferences</span>
           </h1>
           <p className="text-[#6F756B] font-medium mt-4 italic">Manage your account preferences and travel identity.</p>
        </div>
      </div>

      {/* Profile Banner */}
      <Card className="mb-10 !p-12 relative overflow-hidden bg-[#F7F5EF] border border-[#CBD3C7]/50 shadow-bali">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[48px] bg-[#3F4F37] flex items-center justify-center text-5xl font-bold text-[#F8F4EA] shadow-2xl border-4 border-white">
              {user.name?.charAt(0) || 'U'}
            </div>
            <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-[#263322] text-white rounded-2xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Camera size={20} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl font-black text-[#1F241D] tracking-tighter editorial-title mb-2">{user.name}</h2>
            <p className="text-[#6F756B] font-bold text-base mb-6 italic">{user.email} · {user.location || 'Explorer'}</p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
               <span className="px-5 py-2 bg-white rounded-full text-[10px] font-black uppercase tracking-widest text-[#3F4F37] shadow-sm border border-[#CBD3C7]/20 flex items-center gap-2">
                  <Star size={12} fill="#3F4F37" /> Elite Voyager
               </span>
               <span className="px-5 py-2 bg-[#3F4F37] rounded-full text-[10px] font-black uppercase tracking-widest text-[#F8F4EA] shadow-lg flex items-center gap-2">
                  <Zap size={12} fill="#F8F4EA" className="text-[#F8F4EA]" /> 2,450 Points
               </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-10 text-center bg-white/50 backdrop-blur-md p-8 rounded-[48px] border border-white/50 shadow-sm">
            {[
              { label: 'Trips', value: trips.length },
              { label: 'Pins', value: 12 },
              { label: 'Photos', value: 428 },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-[#1F241D] tracking-tight">{s.value}</p>
                <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.2em]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#3F4F37]/5 rounded-full blur-[100px]" />
      </Card>

      {/* Tab Bar */}
      <div className="flex p-2 bg-[#EEF1EA] border border-[#CBD3C7]/30 rounded-[32px] mb-12 w-fit mx-auto md:mx-0 shadow-inner">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-4 px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] transition-all shrink-0 ${
              activeTab === tab.id ? 'bg-[#263322] text-[#F8F4EA] shadow-editorial' : 'text-[#6F756B] hover:text-[#263322]'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'profile' && (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="!p-12">
              <div className="flex items-center justify-between mb-12 border-b border-[#CBD3C7]/20 pb-8">
                <h3 className="text-2xl font-black text-[#1F241D] editorial-title tracking-tight">Personal Identity</h3>
                {editing ? (
                  <BtnHighlight onClick={handleSave} disabled={saving} icon={saving ? Loader2 : Check}>
                    {saving ? 'Syncing...' : 'Save Changes'}
                  </BtnHighlight>
                ) : (
                  <BtnSecondary onClick={() => setEditing(true)} icon={Edit2}>Modify Profile</BtnSecondary>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { label: 'Full Display Name', key: 'name', icon: User, type: 'text' },
                  { label: 'Primary Email', key: 'email', icon: Mail, type: 'email' },
                  { label: 'Home Base', key: 'location', icon: MapPin, type: 'text' },
                ].map(({ label, key, icon: Icon, type }) => (
                  <div key={key}>
                    <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] mb-4 block">{label}</label>
                    <div className="flex items-center gap-5 bg-[#EEF1EA]/60 rounded-3xl px-6 py-5 border-2 border-transparent focus-within:border-[#3F4F37] focus-within:bg-white transition-all">
                      <Icon size={20} className="text-[#3F4F37] shrink-0" />
                      {editing ? (
                        <input
                          type={type}
                          className="bg-transparent text-base text-[#1F241D] font-bold outline-none flex-1"
                          value={form[key]}
                          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        />
                      ) : (
                        <span className="text-base font-bold text-[#1F241D]">{form[key]}</span>
                      )}
                    </div>
                  </div>
                ))}
                <div className="md:col-span-2">
                  <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] mb-4 block">Travel Bio</label>
                  <div className="flex gap-5 bg-[#EEF1EA]/60 rounded-3xl px-6 py-5 border-2 border-transparent focus-within:border-[#3F4F37] focus-within:bg-white transition-all">
                    <Globe size={20} className="text-[#3F4F37] shrink-0 mt-1" />
                    {editing ? (
                      <textarea
                        className="bg-transparent text-base text-[#1F241D] font-bold outline-none flex-1 resize-none"
                        rows={4}
                        value={form.bio}
                        onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      />
                    ) : (
                      <p className="text-base font-bold text-[#1F241D] leading-relaxed italic">"{form.bio}"</p>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
