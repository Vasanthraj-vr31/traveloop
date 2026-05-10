import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, Circle, Plus, Trash2, Package, Tag,
  ShoppingBag, Camera, Briefcase, Pill, Sparkles, Filter, Loader2
} from 'lucide-react';
import { useTrips } from '../utils/TripContext';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost, BtnHighlight } from '../components/Buttons';
import { toast } from 'react-toastify';
import { packingAPI } from '../services/api';

const PackingPage = () => {
  const { currentTrip, packingList, refreshCurrentTrip, loading } = useTrips();
  const [filter, setFilter] = useState('all');
  const [newItem, setNewItem] = useState('');
  const [newCat, setNewCat] = useState('Essentials');
  const [syncing, setSyncing] = useState(false);

  const categories = ['Essentials', 'Electronics', 'Clothing', 'Toiletries', 'Miscellaneous'];

  const toggleItem = async (item) => {
    try {
      const existingDoc = packingList[0];
      if (!existingDoc) return;

      const updatedItems = existingDoc.items.map(i => 
        i._id === item._id ? { ...i, isPacked: !i.isPacked } : i
      );
      await packingAPI.update(existingDoc._id, { items: updatedItems });
      refreshCurrentTrip();
      if (!item.isPacked) toast.success(`Packed: ${item.name}`);
    } catch (error) {
      toast.error('Sync failed');
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    if (!newItem || !currentTrip) return;
    setSyncing(true);
    try {
      const existingDoc = packingList[0];
      const newItemObj = { name: newItem, category: newCat, isPacked: false };
      
      if (existingDoc) {
        await packingAPI.update(existingDoc._id, { 
          items: [...existingDoc.items, newItemObj] 
        });
      } else {
        await packingAPI.create({ 
          tripId: currentTrip._id, 
          items: [newItemObj] 
        });
      }
      
      setNewItem('');
      refreshCurrentTrip();
      toast.success('Added to list');
    } catch (error) {
      toast.error('Failed to add');
    } finally {
      setSyncing(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const existingDoc = packingList[0];
      if (!existingDoc) return;

      const updatedItems = existingDoc.items.filter(i => i._id !== itemId);
      await packingAPI.update(existingDoc._id, { items: updatedItems });
      refreshCurrentTrip();
      toast.info('Item removed');
    } catch (error) {
      toast.error('Failed to remove');
    }
  };

  const flatItems = packingList[0]?.items || [];

  const filteredItems = flatItems.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'packed') return item.isPacked;
    if (filter === 'unpacked') return !item.isPacked;
    return item.category === filter;
  });

  const packedCount = flatItems.filter(i => i.isPacked).length;
  const progress = flatItems.length > 0 ? (packedCount / flatItems.length) * 100 : 0;

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Loading Gear...</div>;
  if (!currentTrip) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Select a trip to pack</div>;

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 border-b border-[#CBD3C7]/30 pb-10">
        <div>
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-4">Inventory Curation</div>
           <h1 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
             Packing <span className="italic font-normal text-[#6F756B]">Checklist</span>
           </h1>
           <p className="text-[#6F756B] font-medium mt-4 italic">Ensuring you have everything for {currentTrip.title}.</p>
        </div>
        <BtnGhost onClick={() => toast.info('Suggestions synced with local weather!')} icon={Sparkles}>AI Suggestions</BtnGhost>
      </div>

      {/* Progress Header */}
      <Card className="mb-16 !p-12 relative overflow-hidden !bg-[#3F4F37] text-[#F8F4EA] border-none shadow-editorial">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h3 className="text-3xl font-black tracking-tight editorial-title mb-2">Ready for Departure?</h3>
                <p className="text-[#F8F4EA]/60 text-sm font-medium">You've curated {packedCount} of {flatItems.length} essential items.</p>
             </div>
             <span className="text-6xl animate-slow-float">✈️</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-5 overflow-hidden mb-6 shadow-inner border border-white/5">
             <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-[#D4B2A7] to-[#F8F4EA] rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]"
             />
          </div>
          <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] opacity-40">
             <span>0% Staging</span>
             <span>{progress.toFixed(0)}% Prepared</span>
             <span>100% Ready</span>
          </div>
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-[100px]" />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Add Item Panel */}
        <div className="lg:col-span-4 space-y-8">
           <Card className="!p-10 shadow-bali">
              <h3 className="text-xl font-black text-[#1F241D] mb-10 editorial-title">Quick Entry</h3>
              <form onSubmit={addItem} className="space-y-8">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] block">Item Nomenclature</label>
                    <input
                       type="text"
                       placeholder="e.g. Leather Travel Journal"
                       value={newItem}
                       onChange={(e) => setNewItem(e.target.value)}
                       className="w-full bg-[#EEF1EA] rounded-3xl px-8 py-5 text-base font-bold text-[#1F241D] border-2 border-transparent focus:border-[#3F4F37] outline-none transition-all shadow-inner"
                    />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] block">Category</label>
                    <div className="grid grid-cols-2 gap-3">
                       {categories.map(cat => (
                          <button
                             key={cat}
                             type="button"
                             onClick={() => setNewCat(cat)}
                             className={`py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${newCat === cat ? 'bg-[#3F4F37] text-[#F8F4EA] shadow-lg' : 'bg-[#EEF1EA] text-[#6F756B] hover:bg-[#CBD3C7]/30'}`}
                          >
                             {cat}
                          </button>
                       ))}
                    </div>
                 </div>
                 <BtnHighlight type="submit" disabled={syncing} className="w-full mt-4 !py-5" icon={syncing ? Loader2 : Plus}>
                   {syncing ? 'Syncing...' : 'Add to Manifest'}
                 </BtnHighlight>
              </form>
           </Card>

           <Card className="bg-[#EEF1EA]/40 border-dashed border-2 border-[#CBD3C7] !p-10 shadow-sm">
              <h3 className="text-[10px] font-black text-[#3F4F37] mb-8 flex items-center gap-3 uppercase tracking-[0.3em]">
                 <Package size={16} /> Recommended Packs
              </h3>
              <div className="space-y-4">
                 {[
                    { label: 'Coastal Retreat', icon: '🏖️' },
                    { label: 'Executive Summit', icon: '💼' },
                    { label: 'Alpine Expedition', icon: '🏔️' },
                 ].map(p => (
                    <button key={p.label} className="w-full flex items-center gap-4 p-5 bg-white rounded-[24px] transition-all text-xs font-black text-[#1F241D] border border-transparent hover:border-[#3F4F37] shadow-sm group">
                       <span className="text-2xl group-hover:rotate-12 transition-transform">{p.icon}</span> {p.label}
                    </button>
                 ))}
              </div>
           </Card>
        </div>

        {/* List Section */}
        <div className="lg:col-span-8 space-y-12">
           
           {/* Filters */}
           <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-4">
              {['all', 'unpacked', 'packed', ...categories].map(f => (
                 <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shrink-0 shadow-sm ${filter === f ? 'bg-[#1F241D] text-[#F8F4EA]' : 'bg-white border border-[#CBD3C7]/30 text-[#6F756B] hover:bg-[#EEF1EA]'}`}
                 >
                    {f}
                 </button>
              ))}
           </div>

           {/* Items List */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                 {filteredItems.map((item, i) => (
                    <motion.div
                       key={item._id || i}
                       layout
                       initial={{ opacity: 0, scale: 0.9 }}
                       animate={{ opacity: 1, scale: 1 }}
                       exit={{ opacity: 0, scale: 0.9 }}
                       transition={{ delay: i * 0.05 }}
                       className={`flex items-center gap-6 p-6 rounded-[40px] border transition-all group ${item.isPacked ? 'bg-[#EEF1EA]/40 border-[#CBD3C7]/20 opacity-60' : 'bg-white border-[#CBD3C7]/30 hover:border-[#3F4F37] hover:shadow-bali'}`}
                    >
                       <button 
                          onClick={() => toggleItem(item)}
                          className={`w-12 h-12 rounded-[20px] flex items-center justify-center transition-all ${item.isPacked ? 'bg-[#3F4F37] text-[#F8F4EA] shadow-lg' : 'bg-[#EEF1EA] text-[#6F756B] hover:bg-[#3F4F37]/10'}`}
                       >
                          {item.isPacked ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                       </button>
                       <div className="flex-1 min-w-0">
                          <p className={`font-black text-[#1F241D] text-lg truncate transition-all ${item.isPacked ? 'line-through opacity-50' : ''}`}>
                             {item.name}
                          </p>
                          <p className="text-[9px] font-black text-[#6F756B] uppercase tracking-[0.2em] mt-1">
                             {item.category}
                          </p>
                       </div>
                       <button 
                          onClick={() => removeItem(item._id)}
                          className="w-10 h-10 flex items-center justify-center rounded-2xl bg-red-50 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                       >
                          <Trash2 size={16} />
                       </button>
                    </motion.div>
                 ))}
              </AnimatePresence>
              
              {filteredItems.length === 0 && (
                 <div className="col-span-2 py-40 text-center bg-[#EEF1EA]/20 border-4 border-dashed border-[#CBD3C7]/50 rounded-[80px]">
                    <div className="text-7xl mb-8 animate-slow-float">🧳</div>
                    <h3 className="text-3xl font-black text-[#1F241D] editorial-title">Manifest is Empty</h3>
                    <p className="text-[#6F756B] font-medium mt-4 italic max-w-xs mx-auto">Try refining your filters or curate new items for the journey.</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default PackingPage;
