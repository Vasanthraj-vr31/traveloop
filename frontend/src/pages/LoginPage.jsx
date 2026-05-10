import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Navigation, Heart, Shield, Compass } from 'lucide-react';
import { BtnPrimary, BtnGhost, BtnHighlight, BtnSecondary } from '../components/Buttons';
import Logo from '../components/Logo';
import { authAPI } from '../services/api';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = isLogin 
        ? await authAPI.login({ email, password })
        : await authAPI.signup({ name, email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      toast.success(isLogin ? 'Welcome back, explorer. 🌿' : 'Your journey has been initialized. 🖋️', {
        style: { background: '#F7F5EF', borderRadius: '40px', color: '#1F241D', border: '1px solid #CBD3C7' }
      });
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#DDE3DC] flex overflow-hidden relative">
      {/* Cinematic Background System */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[#263322] opacity-40 mix-blend-multiply" />
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center grayscale-[10%] opacity-40" />
         <div className="noise-overlay" />
      </div>

      {/* Editorial Content Section */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-24 relative z-10 space-y-16">
         <div className="space-y-8">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-[0.6em] text-white"
            >
               <Sparkles size={16} className="text-[#FFD166]" /> The Art of Exploration
            </motion.div>
            <h1 className="text-8xl xl:text-9xl font-black text-white tracking-tighter editorial-title leading-[0.85]">
              Your <span className="italic font-normal text-[#DDE3DC] block">Horizon</span> Awaits.
            </h1>
         </div>
         
         <p className="text-2xl text-white/80 font-medium leading-relaxed max-w-xl italic border-l-4 border-white/30 pl-12">
           "The world is a book and those who do not travel read only one page." Enter your archive and continue the story of a lifetime.
         </p>

         <div className="flex items-center gap-12 pt-16">
            <div className="flex flex-col">
               <span className="text-4xl font-black text-white editorial-title tracking-tighter">50K+</span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mt-2">Active Explorers</span>
            </div>
            <div className="w-px h-16 bg-white/20" />
            <div className="flex flex-col">
               <span className="text-4xl font-black text-white editorial-title tracking-tighter">120+</span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mt-2">Realms Mapped</span>
            </div>
         </div>
      </div>

      {/* Auth Canvas */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
         <motion.div
           initial={{ opacity: 0, y: 50, scale: 0.9 }}
           animate={{ opacity: 1, y: 0, scale: 1 }}
           className="w-full max-w-xl bg-[#F7F5EF] rounded-[80px] p-12 md:p-24 shadow-editorial border-[12px] border-white group relative overflow-hidden"
         >
            {/* Visual Deco */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#3F4F37] opacity-5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-14">
               <div className="text-center">
                  <div className="flex justify-center mb-12">
                    <Logo className="scale-150" />
                  </div>
                  <h2 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none mb-6">
                    {isLogin ? 'Welcome Back' : 'Join the Collective'}
                  </h2>
                  <p className="text-[11px] font-black text-[#6F756B] opacity-60 uppercase tracking-[0.3em] leading-relaxed">
                    Identify yourself to access the travel archives.
                  </p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-10">
                  {!isLogin && (
                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-[#3F4F37] uppercase tracking-[0.4em] ml-6">Your Identity</label>
                       <div className="relative">
                          <User className="absolute left-8 top-1/2 -translate-y-1/2 text-[#3F4F37]" size={22} />
                         <input
                          type="text"
                          placeholder="John Voyager"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-white/60 rounded-[32px] pl-16 pr-8 py-6 text-base font-bold text-[#1F241D] outline-none border border-transparent focus:border-[#263322] focus:bg-white transition-all shadow-inner"
                        />
                       </div>
                    </div>
                  )}

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-[#3F4F37] uppercase tracking-[0.4em] ml-6">Access Email</label>
                     <div className="relative">
                        <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-[#3F4F37]" size={22} />
                         <input
                          type="email"
                          placeholder="explorer@traveloop.app"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-white/60 rounded-[32px] pl-16 pr-8 py-6 text-base font-bold text-[#1F241D] outline-none border border-transparent focus:border-[#263322] focus:bg-white transition-all shadow-inner"
                        />
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black text-[#3F4F37] uppercase tracking-[0.4em] ml-6">Secret Phrase</label>
                     <div className="relative">
                        <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-[#3F4F37]" size={22} />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full bg-white/60 rounded-[32px] pl-16 pr-20 py-6 text-base font-bold text-[#1F241D] outline-none border border-transparent focus:border-[#263322] focus:bg-white transition-all shadow-inner"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-8 top-1/2 -translate-y-1/2 text-[#6F756B] hover:text-[#263322] transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                     </div>
                  </div>

                  <div className="flex items-center justify-between px-6">
                     <label className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                           <input type="checkbox" className="w-6 h-6 rounded-xl border-[#CBD3C7] text-[#263322] focus:ring-[#263322] bg-white cursor-pointer" />
                        </div>
                        <span className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.2em] group-hover:text-[#1F241D] transition-colors">Remember Session</span>
                     </label>
                     {isLogin && <button className="text-[10px] font-black text-[#3F4F37] uppercase tracking-[0.2em] hover:underline">Lost access?</button>}
                  </div>

                  <BtnPrimary type="submit" disabled={loading} className="w-full !py-7 shadow-bali text-sm" icon={ArrowRight}>
                    {loading ? 'Processing...' : (isLogin ? 'Enter Archive' : 'Initialize Portal')}
                  </BtnPrimary>
               </form>

               <div className="text-center space-y-10">
                  <div className="flex items-center gap-6">
                     <div className="flex-1 h-px bg-[#CBD3C7]/40" />
                     <span className="text-[9px] font-black text-[#6F756B] uppercase tracking-[0.5em]">Identity Portal</span>
                     <div className="flex-1 h-px bg-[#CBD3C7]/40" />
                  </div>

                  <div className="flex justify-center gap-8">
                     {['G', 'A', 'X'].map(p => (
                       <button key={p} className="w-16 h-16 rounded-[24px] bg-white border border-[#CBD3C7]/40 flex items-center justify-center text-sm font-black text-[#1F241D] hover:bg-[#EEF1EA] hover:shadow-xl transition-all active:scale-95">
                         {p}
                       </button>
                     ))}
                  </div>

                  <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.25em]">
                    {isLogin ? "No story yet?" : "Already an explorer?"}{' '}
                    <button 
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-[#3F4F37] hover:underline ml-3"
                    >
                      {isLogin ? 'Begin Your Story' : 'Enter the Portal'}
                    </button>
                  </p>
               </div>
            </div>
         </motion.div>
      </div>

      {/* Trust Badge */}
      <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-5 text-white/50">
         <Shield size={20} />
         <span className="text-[10px] font-black uppercase tracking-[0.6em]">Secure Travel Ledger</span>
      </div>
    </div>
  );
};

export default LoginPage;
