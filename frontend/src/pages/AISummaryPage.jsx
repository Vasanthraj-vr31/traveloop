import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Download, Share2, RefreshCw, Star,
  Globe, Clock, MapPin, Zap, MessageSquare, Heart
} from 'lucide-react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnSecondary, BtnGhost } from '../components/Buttons';
import { toast } from 'react-toastify';

const AISummaryPage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [summary, setSummary] = useState(null);

  const generateSummary = () => {
    setIsGenerating(true);
    setSummary(null);
    setTimeout(() => {
      setIsGenerating(false);
      setSummary({
        headline: "A Magical Journey Through the Heart of Japan 🌸",
        sections: [
          {
            title: "The Vibe",
            content: "Your upcoming Tokyo trip is perfectly balanced between high-tech neon adventures and serene spiritual moments. You'll experience the pulsating energy of Shibuya before finding peace in the ancient gardens of Shinjuku Gyoen."
          },
          {
            title: "Smart Insights",
            content: "Based on your activity density, Day 3 and Day 5 are high-walking days. We recommend comfortable shoes and booking your Shinkansen tickets at least 2 days prior to keep the flow smooth."
          },
          {
            title: "Hidden Gem Recommendation",
            content: "Since you love coffee and quiet spots, don't miss the small roasteries in Shimokitazawa. It's only 15 mins away from your Shibuya base but feels like a world away."
          }
        ],
        tags: ['Efficient Planning', 'Culture Focused', 'Well Balanced', 'Tech Savvy']
      });
      toast.success('✨ AI Summary generated!');
    }, 2500);
  };

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-20 h-20 rounded-[32px] bg-gradient-to-br from-[#FF8A5B] to-[#FFD166] flex items-center justify-center text-4xl shadow-2xl shadow-orange-100 mx-auto mb-6 animate-float">
          ✨
        </div>
        <h1 className="text-4xl font-black text-[#263238] tracking-tight mb-3">AI Journey Insight 🧠</h1>
        <p className="text-[#607D8B] font-medium max-w-lg mx-auto">
          We've analyzed your itinerary to give you a smart narrative summary and logistical tips.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Input / Trigger */}
        <div className="lg:col-span-4 space-y-6">
           <Card className="!p-8">
              <h3 className="text-lg font-black text-[#263238] mb-6">Optimization Level</h3>
              <div className="space-y-4">
                 {[
                    { label: 'Time Efficiency', icon: Clock, val: 'High' },
                    { label: 'Budget Safety', icon: Zap, val: 'Medium' },
                    { label: 'Culture Depth', icon: Globe, val: 'Expert' },
                 ].map(s => (
                    <div key={s.label} className="flex items-center justify-between p-4 bg-[#FDF2E9] rounded-2xl">
                       <div className="flex items-center gap-3">
                          <s.icon size={16} className="text-[#FF8A5B]" />
                          <span className="text-xs font-bold text-[#607D8B] uppercase tracking-widest">{s.label}</span>
                       </div>
                       <span className="text-xs font-black text-[#263238]">{s.val}</span>
                    </div>
                 ))}
              </div>
              <button 
                onClick={generateSummary}
                disabled={isGenerating}
                className="w-full mt-8 py-4 bg-[#263238] text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-200 disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Refine Summary <RefreshCw size={16} /></>
                )}
              </button>
           </Card>

           <Card className="bg-gradient-to-br from-[#4DB6AC] to-[#8ECAE6] border-none text-white !p-8 shadow-xl shadow-teal-100">
              <h4 className="text-lg font-black mb-2">Want better results?</h4>
              <p className="text-white/80 text-sm font-medium mb-6 leading-relaxed">Add more details to your itinerary notes for deeper AI contextual analysis.</p>
              <BtnGhost className="!bg-white !text-[#4DB6AC] w-full" onClick={() => toast.info('Syncing notes...')}>Sync Notes</BtnGhost>
           </Card>
        </div>

        {/* Right: Summary Result */}
        <div className="lg:col-span-8">
           <AnimatePresence mode="wait">
              {isGenerating ? (
                 <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                 >
                    <div className="relative mb-10">
                       <div className="w-24 h-24 rounded-full border-4 border-[#FDF2E9] border-t-[#FF8A5B] animate-spin" />
                       <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">🤖</div>
                    </div>
                    <h3 className="text-2xl font-black text-[#263238] mb-2 tracking-tight">Consulting the Travel Gods...</h3>
                    <p className="text-[#607D8B] font-medium max-w-xs">Our AI is weaving your itinerary into a beautiful story.</p>
                 </motion.div>
              ) : summary ? (
                 <motion.div
                    key="result"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                 >
                    <Card className="!p-10 border-2 border-[#FF8A5B]/30 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4">
                          <button className="text-[#FF8A5B] hover:scale-110 transition-transform">
                             <Heart size={24} />
                          </button>
                       </div>
                       
                       <h2 className="text-3xl md:text-4xl font-black text-[#263238] leading-tight mb-8 tracking-tighter">
                          {summary.headline}
                       </h2>

                       <div className="space-y-10">
                          {summary.sections.map((section, i) => (
                             <div key={i} className="relative pl-8">
                                <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-[#FF8A5B] shadow-[0_0_10px_#FF8A5B]" />
                                <h4 className="text-xs font-black text-[#607D8B] uppercase tracking-[0.2em] mb-3">{section.title}</h4>
                                <p className="text-lg text-[#263238] leading-relaxed font-medium">
                                   {section.content}
                                </p>
                             </div>
                          ))}
                       </div>

                       <div className="mt-12 flex flex-wrap gap-2">
                          {summary.tags.map(tag => (
                             <span key={tag} className="px-4 py-2 bg-[#FDF2E9] text-[#263238] text-[10px] font-black uppercase tracking-widest rounded-xl border border-[#F3D8C7]">
                                #{tag}
                             </span>
                          ))}
                       </div>
                    </Card>

                    <div className="flex items-center gap-4">
                       <BtnSecondary className="flex-1" icon={Share2}>Share Insight</BtnSecondary>
                       <BtnPrimary className="flex-1" icon={Download}>Download PDF</BtnPrimary>
                    </div>
                 </motion.div>
              ) : (
                 <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/40 backdrop-blur-md rounded-[48px] border-2 border-dashed border-[#F3D8C7] p-20 text-center flex flex-col items-center"
                 >
                    <div className="w-24 h-24 rounded-[40px] bg-[#FDF2E9] flex items-center justify-center text-5xl mb-8 shadow-inner">
                       📖
                    </div>
                    <h3 className="text-2xl font-black text-[#263238] mb-2">Your Story is Waiting</h3>
                    <p className="text-[#607D8B] font-medium mb-10 max-w-sm">
                       Click the button on the left to generate a smart summary of your trip using advanced AI analysis.
                    </p>
                    <BtnPrimary onClick={generateSummary} icon={Sparkles} className="px-12 py-5 text-base">Generate Now</BtnPrimary>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AISummaryPage;
