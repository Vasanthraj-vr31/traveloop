import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Compass, MapPin, Calendar, 
  Sparkles, Camera, Heart, Navigation,
  Palmtree, Waves, Mountain
} from 'lucide-react';
import { BtnPrimary, BtnSecondary } from '../components/Buttons';
import { Card } from '../components/Cards';

const DashboardPage = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Adventure', icon: Mountain, img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=600', count: '12 Spots' },
    { name: 'Culture', icon: Palmtree, img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600', count: '8 Temples' },
    { name: 'Relaxation', icon: Waves, img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&q=80&w=800', count: '15 Spas' },
  ];

  return (
    <div className="pb-20 animate-editorial-up">
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[700px] w-full overflow-hidden mb-20 rounded-b-[60px] lg:rounded-b-[100px] shadow-editorial">
        <img 
          src="https://images.unsplash.com/photo-1555400038-63f5ba517a47?auto=format&fit=crop&q=80&w=1920" 
          alt="Bali Landscape"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 cinematic-overlay" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8">
              <Sparkles size={14} className="text-[#FFD166]" /> Eternal Summer 2026
            </div>
            <h1 className="editorial-title text-6xl md:text-8xl lg:text-9xl text-white mb-8 tracking-tighter leading-tight">
              It’s time to <br /> visit <span className="italic">Bali</span>
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-white/90 font-medium mb-12 mx-auto leading-relaxed">
              Experience the art of slow travel in the heart of Indonesia. From sacred temples to emerald rice fields, Traveloop helps you curate your perfect soul-journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigate('/create-trip')}
                className="px-12 py-5 bg-[#F8F4EA] text-[#263322] rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-[#DDE3DC] transition-all shadow-2xl"
              >
                Begin Your Journey
              </button>
              <button 
                onClick={() => navigate('/itinerary-view')}
                className="px-12 py-5 bg-white/10 backdrop-blur-md border border-white/40 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all"
              >
                View Itinerary
              </button>
            </div>
          </motion.div>
        </div>

        {/* Hero Bottom Info */}
        <div className="absolute bottom-12 left-12 hidden lg:flex items-center gap-10 text-white/60">
           <div className="flex items-center gap-3">
              <Navigation size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tegallalang, Ubud</span>
           </div>
           <div className="flex items-center gap-3">
              <Calendar size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Best: Apr - Oct</span>
           </div>
        </div>
      </section>

      {/* Categories / Destinations */}
      <section className="max-w-[1600px] mx-auto px-8 lg:px-20 mb-32">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
           <div className="max-w-xl">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-4">The Collection</h4>
              <h2 className="text-4xl md:text-6xl font-black text-[#1F241D] leading-tight tracking-tighter">
                 Curated experiences for the <span className="italic text-[#6F756B]">mindful wanderer.</span>
              </h2>
           </div>
           <BtnSecondary onClick={() => navigate('/city-search')} className="!px-10">Explore All</BtnSecondary>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => navigate('/activity-search')}
            >
              <div className="relative h-[500px] rounded-[48px] overflow-hidden mb-6 shadow-bali">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1F241D]/60" />
                <div className="absolute bottom-8 left-8">
                   <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-4">
                      <cat.icon size={20} />
                   </div>
                   <h3 className="text-3xl font-black text-white tracking-tighter">{cat.name}</h3>
                   <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mt-1">{cat.count}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Editorial Split Section */}
      <section className="bg-[#EEF1EA] py-32 mb-32 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="relative"
           >
              <img 
                src="https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-[700px] object-cover rounded-[100px] rounded-tr-[20px] shadow-editorial"
                alt="Editorial"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#F7F5EF] rounded-[40px] p-8 shadow-2xl flex flex-col justify-center">
                 <p className="text-4xl font-black text-[#263322] tracking-tighter italic">98%</p>
                 <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-widest mt-2 leading-relaxed">Of travelers find peace in the hills of Munduk.</p>
              </div>
           </motion.div>
           
           <div className="space-y-10">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37]">Philosophy</h4>
              <h2 className="text-5xl md:text-7xl font-black text-[#1F241D] leading-tight tracking-tighter">
                 Travel that heals the <span className="italic text-[#8F9B8B]">spirit.</span>
              </h2>
              <p className="text-xl text-[#6F756B] leading-relaxed font-medium">
                 We believe in itineraries that breathe. In moments that linger. In the space between destinations where the real magic of Bali reveals itself to those who wait.
              </p>
              <div className="grid gap-6">
                 {[
                    { title: 'Intelligent Planning', desc: 'AI-assisted flows that optimize for experience, not just distance.', icon: Sparkles },
                    { title: 'Global Connectivity', icon: MapPin, desc: 'Offline maps and local insights accessible from anywhere.' },
                 ].map(item => (
                    <div key={item.title} className="flex gap-6 p-6 bg-white/40 rounded-[32px] border border-[#CBD3C7]/30">
                       <div className="w-12 h-12 rounded-2xl bg-[#263322] text-[#F8F4EA] flex items-center justify-center shrink-0">
                          <item.icon size={20} />
                       </div>
                       <div>
                          <h4 className="text-base font-black text-[#1F241D] mb-1">{item.title}</h4>
                          <p className="text-sm text-[#6F756B] font-medium leading-relaxed">{item.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
              <BtnPrimary onClick={() => navigate('/my-trips')} className="!px-12 py-6">View Archive</BtnPrimary>
           </div>
        </div>
      </section>

      {/* Itinerary Preview / Recent Trip */}
      <section className="max-w-[1600px] mx-auto px-8 lg:px-20 mb-32">
        <div className="flex items-center justify-between mb-16">
           <h2 className="text-4xl font-black text-[#1F241D] tracking-tighter">Your Next <span className="italic">Perspective</span></h2>
           <button onClick={() => navigate('/itinerary-view')} className="group flex items-center gap-3 text-[#3F4F37] font-black uppercase tracking-widest text-[10px]">
              Full Itinerary <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
              { day: 'Day 01', title: 'Arrival & Calm', location: 'Uluwatu', img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=500' },
              { day: 'Day 02', title: 'Ancient Echoes', location: 'Tirta Empul', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=500' },
              { day: 'Day 03', title: 'Emerald Flow', location: 'Tegallalang', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=500' },
              { day: 'Day 04', title: 'Coastal Serenity', location: 'Nusa Penida', img: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&q=80&w=800' },
           ].map((step, i) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onClick={() => navigate('/itinerary-builder')}
              >
                 <div className="relative h-[400px] rounded-[40px] overflow-hidden mb-4">
                    <img src={step.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute top-6 left-6 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-widest border border-white/20">
                       {step.day}
                    </div>
                 </div>
                 <h4 className="text-lg font-black text-[#1F241D]">{step.title}</h4>
                 <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-widest mt-1 flex items-center gap-1.5">
                    <MapPin size={10} className="text-[#3F4F37]" /> {step.location}
                 </p>
              </motion.div>
           ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="max-w-[1600px] mx-auto px-8 lg:px-20">
         <Card className="relative overflow-hidden !p-20 text-center border-none text-white shadow-xl">
            <div className="absolute inset-0">
               <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover" />
               <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto">
               <h2 className="editorial-title text-5xl md:text-7xl mb-8">Ready to write your <span className="italic">own story?</span></h2>
               <p className="text-xl text-white/90 mb-12 font-medium">Join 50,000+ travelers planning their perfect escapes with Traveloop.</p>
               <BtnPrimary onClick={() => navigate('/create-trip')} className="!bg-[#F8F4EA] !text-[#263322] !px-16 !py-6 text-base">Plan Your Journey</BtnPrimary>
            </div>
         </Card>
      </section>
    </div>
  );
};

export default DashboardPage;
