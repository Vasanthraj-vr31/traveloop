import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Printer, ChevronRight, MapPin, Calendar, Users, Camera, Sparkles, Layout, Palette, Settings, Eye, FileText, Loader2 } from 'lucide-react';
import { Card, TripCard } from '../components/Cards';
import { BtnPrimary, BtnGhost, BtnHighlight } from '../components/Buttons';
import { useTrips } from '../utils/TripContext';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const PDFSouvenirPage = () => {
  const { currentTrip, itinerary, photos, budget: budgetData, loading } = useTrips();
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [generating, setGenerating] = useState(false);
  const pdfRef = useRef(null);

  const normalizedBudget = Array.isArray(budgetData) && budgetData.length > 0 && budgetData[0].name ? budgetData : [
    { name: 'Transport', spent: budgetData?.transportCost || 0 },
    { name: 'Stay', spent: budgetData?.stayCost || 0 },
    { name: 'Food', spent: budgetData?.foodCost || 0 },
    { name: 'Activities', spent: budgetData?.activityCost || 0 },
  ];

  const totalBudget = normalizedBudget.reduce((acc, curr) => acc + (curr.spent || 0), 0);

  const templates = [
    { id: 'classic', name: 'Elite Traveler', emoji: '📰', desc: 'Sleek magazine publication layout', color: '#3F4F37' },
    { id: 'minimal', name: 'Pure Narrative', emoji: '📋', desc: 'Minimalist & typography focused', color: '#6F756B' },
    { id: 'photo', name: 'Memory Book', emoji: '📸', desc: 'Visual-heavy artistic journey', color: '#D4B2A7' },
    { id: 'adventure', name: 'Explorer Log', emoji: '🗺️', desc: 'Bold, adventure-centric aesthetic', color: '#8F9B8B' },
  ];

  const handleDownload = async () => {
    if (!pdfRef.current) return;
    setGenerating(true);
    try {
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#F7F5EF'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${currentTrip.title.replace(/\s+/g, '_')}_Souvenir.pdf`);
      toast.success('🎉 Your travel souvenir is ready!');
    } catch (error) {
      toast.error('Failed to generate PDF. Try again.');
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Preparing the studio...</div>;
  if (!currentTrip) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Select a trip to design souvenir</div>;

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 border-b border-[#CBD3C7]/30 pb-10">
        <div>
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-4">Souvenir Studio</div>
           <h1 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
             Publication <span className="italic font-normal text-[#6F756B]">Designer</span>
           </h1>
           <p className="text-[#6F756B] font-medium mt-4 italic">Transform your digital journey into a high-end publication.</p>
        </div>
        <div className="flex items-center gap-4">
           <BtnGhost icon={Share2}>Share</BtnGhost>
           <BtnHighlight onClick={handleDownload} disabled={generating} icon={generating ? Loader2 : Download}>
             {generating ? 'Exporting...' : 'Download PDF'}
           </BtnHighlight>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Configuration Panel */}
        <div className="lg:col-span-5 space-y-8">
           
           {/* Template Selection */}
           <Card className="!p-8">
              <div className="flex items-center gap-4 mb-10">
                 <Palette size={20} className="text-[#3F4F37]" />
                 <h3 className="text-xl font-black text-[#1F241D] editorial-title tracking-tight">Choose Template</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {templates.map((t) => (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-6 rounded-[32px] text-left border-2 transition-all group ${
                      selectedTemplate === t.id
                        ? 'bg-[#263322] border-[#263322] text-[#F8F4EA] shadow-editorial'
                        : 'bg-[#EEF1EA]/40 border-transparent hover:bg-white hover:border-[#CBD3C7]'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm transition-transform group-hover:rotate-12 ${selectedTemplate === t.id ? 'bg-white/10' : 'bg-white'}`}>
                       {t.emoji}
                    </div>
                    <p className={`text-xs font-black uppercase tracking-widest ${selectedTemplate === t.id ? 'text-[#F8F4EA]' : 'text-[#1F241D]'}`}>{t.name}</p>
                    <p className={`text-[10px] font-bold mt-2 opacity-60 leading-tight`}>
                      {t.desc}
                    </p>
                  </motion.button>
                ))}
              </div>
           </Card>

           {/* Page Options */}
           <Card className="!p-8">
              <div className="flex items-center gap-4 mb-10">
                 <Layout size={20} className="text-[#3F4F37]" />
                 <h3 className="text-xl font-black text-[#1F241D] editorial-title tracking-tight">Page Layout</h3>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Cinematic Cover Page', on: true },
                  { label: 'Narrative Trip Summary', on: true },
                  { label: 'Chronological Itinerary', on: true },
                  { label: 'High-Res Photo Gallery', on: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-5 bg-[#EEF1EA]/40 rounded-2xl border border-transparent hover:border-[#CBD3C7] transition-all">
                    <span className="text-[10px] font-black text-[#1F241D] uppercase tracking-widest">{item.label}</span>
                    <button className={`w-12 h-7 rounded-full relative transition-all ${item.on ? 'bg-[#3F4F37]' : 'bg-[#CBD3C7]'}`}>
                      <span className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${item.on ? 'left-6' : 'left-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
           </Card>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-7">
           <div className="sticky top-32">
              <div className="flex items-center justify-between mb-8 px-6">
                 <h3 className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] flex items-center gap-3">
                   <Eye size={16} /> Publication Preview
                 </h3>
                 <span className="text-[10px] font-black text-[#3F4F37] uppercase tracking-widest animate-pulse">● Live Render</span>
              </div>
              
              <div ref={pdfRef} className="bg-[#F7F5EF] rounded-[64px] shadow-editorial border border-[#CBD3C7]/50 overflow-hidden relative">
                 {/* Cinematic Cover Page Mockup */}
                 <div className="relative aspect-[1/1.41] flex flex-col">
                    <div className="bg-[#263322] p-20 text-[#F8F4EA] text-center relative overflow-hidden flex-1 flex flex-col justify-center">
                       <div className="relative z-10">
                          <p className="text-[10px] font-black tracking-[0.4em] uppercase text-[#D4B2A7] mb-8">Official Journey Souvenir</p>
                          <h2 className="text-6xl font-black mb-4 tracking-tighter editorial-title leading-tight">{currentTrip.title}</h2>
                          <p className="text-base font-bold opacity-50 uppercase tracking-[0.2em]">{currentTrip.destination} · {new Date(currentTrip.startDate).getFullYear()}</p>
                          
                          <div className="flex justify-center mt-16 mb-16">
                             <div className="w-48 h-48 rounded-[60px] bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-8xl shadow-2xl animate-float">
                                {currentTrip.emoji || '🌿'}
                             </div>
                          </div>

                          <div className="flex items-center justify-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] opacity-60">
                             <span className="flex items-center gap-2"><Users size={14} /> {currentTrip.collaborators?.length || 1} Squad</span>
                             <span className="flex items-center gap-2"><Calendar size={14} /> {itinerary.length} Stops</span>
                             <span className="flex items-center gap-2"><Camera size={14} /> {photos.length} Moments</span>
                          </div>
                       </div>
                       {/* Abstract Deco */}
                       <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#D4B2A7]/10 rounded-full blur-[120px]" />
                       <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#8F9B8B]/10 rounded-full blur-[100px]" />
                    </div>

                    {/* Content Preview Page 2 */}
                    <div className="p-16 space-y-12 bg-[#F7F5EF]">
                       <div className="flex justify-between items-end border-b border-[#CBD3C7] pb-8">
                          <div className="space-y-2">
                             <h4 className="text-[10px] font-black uppercase tracking-widest text-[#3F4F37]">Financial Summary</h4>
                             <p className="text-3xl font-black text-[#1F241D] tracking-tight editorial-title">₹{totalBudget.toLocaleString()}</p>
                          </div>
                          <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-widest italic">Total Investment</p>
                       </div>

                       <div className="space-y-6">
                          <h4 className="text-[10px] font-black uppercase tracking-widest text-[#3F4F37]">Journey Highlights</h4>
                          <div className="grid grid-cols-2 gap-6">
                            {photos.slice(0, 4).map((p, i) => (
                              <div key={i} className="aspect-[4/3] rounded-[32px] overflow-hidden border-4 border-white shadow-bali">
                                 <img src={p.imageUrl?.startsWith('http') ? p.imageUrl : `http://localhost:5000/${p.imageUrl}`} className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {photos.length === 0 && [1,2,3,4].map(i => (
                               <div key={i} className="aspect-[4/3] rounded-[32px] bg-[#EEF1EA] flex items-center justify-center text-4xl border-4 border-white">🌿</div>
                            ))}
                          </div>
                       </div>

                       <div className="flex items-center justify-between pt-12 mt-auto">
                          <p className="text-[9px] font-black text-[#6F756B] uppercase tracking-[0.3em]">Created by Traveloop Editorial</p>
                          <p className="text-[9px] font-black text-[#6F756B] uppercase tracking-[0.3em]">Archive P.01</p>
                       </div>
                    </div>
                 </div>

                 {/* Generating Overlay */}
                 <AnimatePresence>
                    {generating && (
                       <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-[#263322]/95 backdrop-blur-xl flex flex-col items-center justify-center text-center p-12 z-[100]"
                       >
                          <div className="relative mb-10">
                             <div className="w-32 h-32 rounded-full border-4 border-white/10 border-t-[#D4B2A7] animate-spin" />
                             <div className="absolute inset-0 flex items-center justify-center text-4xl">🖨️</div>
                          </div>
                          <h3 className="text-3xl font-black text-[#F8F4EA] mb-4 editorial-title">Publishing Memories</h3>
                          <p className="text-[#F8F4EA]/60 font-medium max-w-xs leading-relaxed">
                            Our editorial engine is meticulously crafting your luxury travel souvenir. High-resolution assets are being processed.
                          </p>
                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-6">
                 <button className="py-6 bg-white border-2 border-[#CBD3C7] text-[#1F241D] font-black text-[10px] uppercase tracking-[0.3em] rounded-full hover:bg-[#EEF1EA] transition-all flex items-center justify-center gap-4">
                    <Printer size={18} /> Print Service
                 </button>
                 <BtnHighlight onClick={handleDownload} disabled={generating} className="py-6 !text-sm" icon={Download}>
                    {generating ? 'Processing...' : 'Export Publication'}
                 </BtnHighlight>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PDFSouvenirPage;
