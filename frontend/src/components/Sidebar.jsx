import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Map, ListTodo, Plus, Calendar, Search, Compass,
  DollarSign, Package, BookOpen, Image, Sparkles, FileText,
  MapPin, Play, Share2, QrCode, Users, Cloud, Shield, Wifi,
  Trophy, BarChart3, User, Settings, ChevronRight, Globe, X
} from 'lucide-react';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Journal Home' },
      { to: '/my-trips', icon: Map, label: 'Travel Log' },
      { to: '/create-trip', icon: Plus, label: 'Begin Story' },
    ],
  },
  {
    label: 'Planning',
    items: [
      { to: '/itinerary-builder', icon: ListTodo, label: 'Itinerary' },
      { to: '/itinerary-view', icon: Calendar, label: 'Chronicle' },
      { to: '/city-search', icon: Search, label: 'Destinations' },
      { to: '/activity-search', icon: Compass, label: 'Experiences' },
    ],
  },
  {
    label: 'Management',
    items: [
      { to: '/budget', icon: DollarSign, label: 'Finance' },
      { to: '/packing', icon: Package, label: 'Essentials' },
      { to: '/weather', icon: Cloud, label: 'Climate' },
      { to: '/emergency', icon: Shield, label: 'Safety' },
    ],
  },
  {
    label: 'Memories',
    items: [
      { to: '/notes', icon: BookOpen, label: 'Memoirs' },
      { to: '/photos', icon: Image, label: 'Gallery' },
      { to: '/ai-summary', icon: Sparkles, label: 'AI Visions' },
      { to: '/pdf-souvenir', icon: FileText, label: 'Artifacts' },
    ],
  },
  {
    label: 'Social',
    items: [
      { to: '/map-view', icon: MapPin, label: 'Cartography' },
      { to: '/trip-replay', icon: Play, label: 'Flashbacks' },
      { to: '/shared-trip', icon: Share2, label: 'Broadcasting' },
      { to: '/qr-share', icon: QrCode, label: 'QR Portals' },
      { to: '/collaboration', icon: Users, label: 'Fellowship' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { to: '/stats', icon: Trophy, label: 'Triumphs' },
      { to: '/offline', icon: Wifi, label: 'Local Mode' },
      { to: '/profile', icon: User, label: 'Identity' },
      { to: '/admin', icon: BarChart3, label: 'Curator' },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Editorial Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#2F2A2A]/40 backdrop-blur-md z-30 md:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Editorial Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
        className="fixed top-0 left-0 h-full w-80 bg-[#FFFDFC]/95 backdrop-blur-2xl border-r border-[#EADFD8] z-40 md:translate-x-0 md:static md:h-auto flex flex-col pt-8"
      >
        {/* Mobile Sidebar Header */}
        <div className="px-8 py-6 mb-8 md:hidden border-b border-[#EADFD8]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full rose-gradient flex items-center justify-center shadow-lg">
                <Globe size={22} className="text-white" />
              </div>
              <span className="font-black text-[#2F2A2A] text-2xl tracking-tighter editorial-title italic">Traveloop</span>
            </div>
            <button onClick={onClose} className="p-3 rounded-full hover:bg-[#F8F4F1] text-[#6E6A6A] transition-colors"><X size={24} /></button>
          </div>
        </div>

        <nav className="flex-1 px-4 overflow-y-auto hide-scrollbar pb-12">
          {navGroups.map((group, idx) => (
            <div key={group.label} className={idx !== 0 ? 'mt-10' : ''}>
              <p className="px-6 py-2 text-[9px] font-black text-[#D4B2A7] uppercase tracking-[0.4em] mb-2">{group.label}</p>
              <div className="space-y-1.5">
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => { if (window.innerWidth < 768) onClose(); }}
                    className={({ isActive }) =>
                      `flex items-center gap-4 px-6 py-4 rounded-[24px] text-sm font-bold transition-all group ${
                        isActive
                          ? 'bg-[#F3D7CA] text-[#2F2A2A] shadow-md shadow-[#D4B2A7]/10 translate-x-2'
                          : 'text-[#6E6A6A] hover:bg-[#F8F4F1] hover:text-[#2F2A2A] hover:translate-x-1'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div className={`p-2 rounded-xl transition-all duration-500 ${isActive ? 'bg-white/40 scale-110 rotate-[10deg]' : 'bg-transparent group-hover:bg-[#D4B2A7]/10 group-hover:rotate-6'}`}>
                          <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#2F2A2A]' : 'text-[#D4B2A7]'} />
                        </div>
                        <span className={`flex-1 transition-all duration-300 ${isActive ? 'tracking-tighter font-black' : 'tracking-normal font-bold'}`}>{item.label}</span>
                        {isActive && <ChevronRight size={14} className="text-[#D4B2A7] opacity-60" />}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Minimal User Card at bottom */}
        <div className="p-6 m-4 mt-auto bg-gradient-to-br from-[#F3D7CA]/30 to-[#D9B6D3]/30 rounded-[32px] border border-[#EADFD8]/40 mb-10 group cursor-pointer hover:shadow-xl hover:shadow-[#D4B2A7]/10 transition-all duration-500">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full rose-gradient flex items-center justify-center text-white font-black text-xs shadow-xl border-2 border-white group-hover:rotate-[360deg] transition-transform duration-1000">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-black text-[#2F2A2A] truncate tracking-tight uppercase">Arjun Mehta</p>
              <p className="text-[9px] font-black text-[#D4B2A7] uppercase tracking-widest mt-1">Voyager</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-[#6E6A6A] group-hover:bg-white transition-colors shadow-sm">
              <Settings size={14} />
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
