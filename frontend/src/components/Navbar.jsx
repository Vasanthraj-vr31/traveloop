import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Search, User, LogOut, ChevronDown, 
  Map, Compass, BarChart3, Briefcase, Camera, 
  Share2, Shield, Settings, Sparkles, Plus,
  Globe, Layout, History, FileText, Cloud, Heart
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuGroups = [
    {
      title: 'Trips',
      icon: Compass,
      links: [
        { name: 'Dashboard', path: '/dashboard', icon: Layout },
        { name: 'Create Story', path: '/create-trip', icon: Plus },
        { name: 'My Archives', path: '/my-trips', icon: History },
      ]
    },
    {
      title: 'Itinerary',
      icon: Map,
      links: [
        { name: 'Builder', path: '/itinerary-builder', icon: Briefcase },
        { name: 'View List', path: '/itinerary-view', icon: FileText },
        { name: 'Interactive Map', path: '/map-view', icon: Globe },
        { name: 'Trip Replay', path: '/trip-replay', icon: History },
      ]
    },
    {
      title: 'Discover',
      icon: Search,
      links: [
        { name: 'City Search', path: '/city-search', icon: Globe },
        { name: 'Activities', path: '/activity-search', icon: Sparkles },
        { name: 'Weather', path: '/weather', icon: Cloud },
      ]
    },
    {
      title: 'Finances',
      icon: BarChart3,
      links: [
        { name: 'Budget Control', path: '/budget', icon: BarChart3 },
      ]
    },
    {
      title: 'Tools',
      icon: Shield,
      links: [
        { name: 'Packing List', path: '/packing', icon: Briefcase },
        { name: 'Emergency Info', path: '/emergency', icon: Shield },
        { name: 'Offline Mode', path: '/offline', icon: Cloud },
      ]
    },
    {
      title: 'Memories',
      icon: Camera,
      links: [
        { name: 'Journal', path: '/notes', icon: FileText },
        { name: 'Photo Album', path: '/photos', icon: Camera },
        { name: 'AI Insights', path: '/ai-summary', icon: Sparkles },
        { name: 'PDF Souvenir', path: '/pdf-souvenir', icon: FileText },
      ]
    },
    {
      title: 'Social',
      icon: Share2,
      links: [
        { name: 'Public Page', path: '/shared-trip', icon: Globe },
        { name: 'QR Portal', path: '/qr-share', icon: Share2 },
        { name: 'Squad Mode', path: '/collaboration', icon: User },
      ]
    },
    {
      title: 'Studio',
      icon: Settings,
      links: [
        { name: 'Profile', path: '/profile', icon: User },
        { name: 'Milestones', path: '/stats', icon: Sparkles },
        { name: 'Admin Hub', path: '/admin', icon: Shield },
      ]
    }
  ];

  return (
    <nav className="fixed top-6 left-0 right-0 z-[100] transition-all duration-700 px-8">
      <div className={`max-w-[1600px] mx-auto px-10 py-5 rounded-[40px] transition-all duration-500 flex items-center justify-between ${
        scrolled ? 'bali-nav-blur shadow-editorial border border-[#CBD3C7]/30' : 'bg-white/80 backdrop-blur-md shadow-bali'
      }`}>
        
        {/* Logo */}
        <Link to="/dashboard" className="hover:scale-105 transition-transform duration-500">
           <Logo />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-1">
          {menuGroups.map((group, idx) => (
            <div 
              key={group.title}
              className="relative"
              onMouseEnter={() => setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all ${
                activeDropdown === idx ? 'bg-[#263322] text-[#F8F4EA]' : 'text-[#6F756B] hover:text-[#1F241D]'
              }`}>
                {group.title} <ChevronDown size={12} className={`transition-transform duration-300 ${activeDropdown === idx ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {activeDropdown === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full left-0 mt-2 w-64 glass-bali rounded-[24px] p-4 shadow-editorial"
                  >
                    <div className="grid gap-1">
                      {group.links.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                            location.pathname === link.path ? 'bg-[#263322] text-[#F8F4EA]' : 'hover:bg-[#EEF1EA] text-[#6F756B] hover:text-[#1F241D]'
                          }`}
                        >
                          <link.icon size={16} />
                          <span className="text-xs font-bold">{link.name}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-6">
          <button className="text-[#1F241D] hover:scale-110 transition-transform">
            <Search size={20} />
          </button>
          <button className="w-10 h-10 rounded-full border border-[#CBD3C7] flex items-center justify-center text-[#1F241D] hover:bg-[#EEF1EA] transition-all">
            <User size={18} />
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-[#263322] text-[#F8F4EA] rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#3F4F37] transition-all shadow-lg shadow-gray-200"
          >
            Depart
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          className="xl:hidden w-12 h-12 rounded-full bg-[#EEF1EA] flex items-center justify-center text-[#263322]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#F8F4EA] z-[110] p-10 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-16">
              <span className="editorial-title text-3xl font-black text-[#263322]">Menu</span>
              <button onClick={() => setIsOpen(false)} className="w-12 h-12 rounded-full bg-[#EEF1EA] flex items-center justify-center text-[#263238]">
                <X size={24} />
              </button>
            </div>

            <div className="grid gap-12">
              {menuGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#6F756B] mb-6">{group.title}</h3>
                  <div className="grid gap-6">
                    {group.links.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-10 h-10 rounded-2xl bg-[#EEF1EA] flex items-center justify-center text-[#263322] group-hover:bg-[#263322] group-hover:text-[#F8F4EA] transition-all">
                          <link.icon size={18} />
                        </div>
                        <span className="text-xl font-bold text-[#1F241D] group-hover:translate-x-2 transition-transform">{link.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-20 pt-10 border-t border-[#CBD3C7]/30">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  navigate('/login');
                }}
                className="w-full py-6 bg-[#263322] text-[#F8F4EA] rounded-[32px] text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4"
              >
                Sign Out <LogOut size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
