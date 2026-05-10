import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Download, Share2, RefreshCw, Copy, Globe, Lock, Shield, Settings, Activity, Palette, Sparkles, Heart } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnSecondary, BtnGhost, BtnHighlight } from '../components/Buttons';
import { toast } from 'react-toastify';

const QRSharePage = () => {
  const [tripId] = useState('tokyo-2025-adventure');
  const shareUrl = `https://traveloop.app/shared/${tripId}`;
  const [style, setStyle] = useState('classic');
  const [color, setColor] = useState('#D4B2A7');

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success('Portal Link Copied! 🔗', {
      style: { background: '#FFFDFC', borderRadius: '24px', border: '1px solid #EADFD8' }
    });
  };

  return (
    <div className="animate-editorial-up space-y-16 pb-24">
      {/* Editorial Header */}
      <div className="text-center space-y-6 py-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#D4B2A7]/30 text-[10px] font-black uppercase tracking-[0.4em] text-[#D4B2A7]"
        >
          <Sparkles size={12} /> Digital Artifacts
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-black text-[#2F2A2A] tracking-tighter editorial-title leading-none">
          Share the <span className="italic font-normal text-[#D4B2A7]">Magic</span>
        </h1>
        <p className="text-xl text-[#6E6A6A] font-medium max-w-2xl mx-auto leading-relaxed italic">
          "A journey shared is a journey doubled." Create a portal to your memories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: QR Portal Preview */}
        <div className="flex flex-col items-center space-y-12">
          <motion.div 
            whileHover={{ scale: 1.02, rotate: 1 }}
            className="relative p-16 bg-white rounded-[80px] shadow-2xl shadow-[#D4B2A7]/20 border border-[#EADFD8] group overflow-hidden"
          >
             {/* Decorative Background */}
             <div className="absolute inset-0 bg-gradient-to-br from-[#F3D7CA]/10 to-[#D9B6D3]/10 opacity-50" />
             <div className="absolute -top-20 -right-20 w-64 h-64 rose-gradient opacity-5 rounded-full blur-3xl" />
             
             <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl rose-gradient flex items-center justify-center text-white mb-10 shadow-xl shadow-[#D4B2A7]/30 transform group-hover:rotate-12 transition-transform duration-700">
                  <Globe size={40} />
                </div>
                
                <div className="p-10 bg-white rounded-[40px] shadow-inner border-2 border-[#F3D8C7]/30 relative group/qr">
                   <QRCodeSVG 
                      value={shareUrl} 
                      size={250} 
                      fgColor={color} 
                      level="H" 
                      includeMargin={false}
                   />
                   {/* Centered Icon Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center border-4 border-[#F8F4F1] transform group-hover/qr:scale-110 transition-transform">
                         <span className="text-2xl">✈️</span>
                      </div>
                   </div>
                </div>
                
                <div className="mt-12 text-center">
                   <p className="text-[10px] font-black text-[#D4B2A7] uppercase tracking-[0.4em] mb-3">Expedition Access</p>
                   <h3 className="text-3xl font-black text-[#2F2A2A] editorial-title tracking-tight">Tokyo Adventure 2025</h3>
                </div>
             </div>
          </motion.div>
          
          <div className="flex gap-4">
             <BtnPrimary onClick={() => toast.info('Artifact saved to Gallery')} icon={Download}>Print Artifact</BtnPrimary>
             <BtnSecondary onClick={copyLink} icon={Copy}>Copy Portal Link</BtnSecondary>
          </div>
        </div>

        {/* Right: Customization & Security */}
        <div className="space-y-12">
          {/* Customization Studio */}
          <section className="space-y-8">
             <h3 className="text-xs font-black text-[#D4B2A7] uppercase tracking-[0.4em] flex items-center gap-3">
                <Palette size={16} /> Studio Customization
             </h3>
             <Card className="!p-10 !rounded-[50px] shadow-2xl shadow-[#D4B2A7]/5">
                <div className="space-y-10">
                   <div>
                      <label className="text-[10px] font-black text-[#6E6A6A] uppercase tracking-[0.3em] mb-6 block">Artistic Palette</label>
                      <div className="flex flex-wrap gap-4">
                        {[
                          { name: 'Rose', color: '#D4B2A7' },
                          { name: 'Teal', color: '#4DB6AC' },
                          { name: 'Gold', color: '#FFD166' },
                          { name: 'Sky', color: '#8ECAE6' },
                          { name: 'Dark', color: '#2F2A2A' },
                        ].map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setColor(c.color)}
                            className={`w-14 h-14 rounded-full border-4 transition-all transform hover:scale-110 ${color === c.color ? 'border-[#D4B2A7] scale-110 shadow-xl' : 'border-white'}`}
                            style={{ backgroundColor: c.color }}
                          />
                        ))}
                      </div>
                   </div>
                   
                   <div>
                      <label className="text-[10px] font-black text-[#6E6A6A] uppercase tracking-[0.3em] mb-6 block">Portal Aesthetic</label>
                      <div className="grid grid-cols-2 gap-4">
                         {['classic', 'minimal', 'artistic', 'retro'].map((s) => (
                           <button
                             key={s}
                             onClick={() => setStyle(s)}
                             className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                               style === s 
                                 ? 'bg-[#2F2A2A] text-white border-[#2F2A2A] shadow-xl' 
                                 : 'bg-[#F8F4F1] text-[#6E6A6A] border-transparent hover:border-[#D4B2A7]'
                             }`}
                           >
                             {s}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
             </Card>
          </section>

          {/* Security & Access */}
          <section className="space-y-8">
             <h3 className="text-xs font-black text-[#D4B2A7] uppercase tracking-[0.4em] flex items-center gap-3">
                <Shield size={16} /> Access Control
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Public View', icon: Globe, desc: 'Anyone with portal link', active: true },
                  { label: 'Invite Only', icon: Lock, desc: 'Verified fellows only', active: false },
                ].map((opt) => (
                  <button 
                    key={opt.label}
                    className={`p-8 rounded-[40px] text-left transition-all border-2 group ${opt.active ? 'bg-white border-[#D4B2A7] shadow-2xl shadow-[#D4B2A7]/10' : 'bg-transparent border-[#EADFD8] opacity-50'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${opt.active ? 'rose-gradient text-white shadow-lg' : 'bg-[#EADFD8] text-[#6E6A6A]'}`}>
                       <opt.icon size={22} />
                    </div>
                    <p className="font-black text-[#2F2A2A] editorial-title text-xl mb-2">{opt.label}</p>
                    <p className="text-[10px] font-bold text-[#6E6A6A] uppercase tracking-widest leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
             </div>
          </section>

          {/* Stats & Activity */}
          <Card className="!p-10 !rounded-[50px] rose-gradient border-none text-white shadow-2xl shadow-[#D4B2A7]/20">
             <div className="flex items-center justify-between">
                <div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70 mb-2">Portal Reach</p>
                   <h4 className="text-4xl font-black editorial-title">1,284 Views</h4>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-xl border border-white/20">
                   🚀
                </div>
             </div>
             <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-3">
                <Activity size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Trending in Tokyo Circle</span>
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QRSharePage;
