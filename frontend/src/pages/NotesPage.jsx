import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, BookOpen, Pin, Search, Tag, Calendar, Trash2, Edit2, Sparkles, X, Loader2, Check } from 'lucide-react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost, BtnHighlight } from '../components/Buttons';
import Modal from '../components/Modal';
import { useTrips } from '../utils/TripContext';
import { noteAPI } from '../services/api';
import { toast } from 'react-toastify';

const NotesPage = () => {
  const { currentTrip, notes, refreshCurrentTrip, loading } = useTrips();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', tags: '', color: '#FFFFFF' });
  const [saving, setSaving] = useState(false);

  const colors = ['#FFFFFF', '#D4B2A7', '#8F9B8B', '#F3D7CA', '#B784A7'];
  
  const filtered = notes.filter(n =>
    (n.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (n.content || '').toLowerCase().includes(search.toLowerCase())
  );
  const pinned = filtered.filter(n => n.pinned);
  const unpinned = filtered.filter(n => !n.pinned);

  const openNew = () => {
    setEditNote(null);
    setForm({ title: '', content: '', tags: '', color: '#FFFFFF' });
    setShowModal(true);
  };

  const openEdit = (note) => {
    setEditNote(note);
    setForm({ title: note.title, content: note.content, tags: note.tags?.join(', ') || '', color: note.color });
    setShowModal(true);
  };

  const saveNote = async () => {
    if (!currentTrip) return;
    setSaving(true);
    const noteData = {
      tripId: currentTrip._id,
      ...form,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
    };

    try {
      if (editNote) {
        await noteAPI.update(editNote._id, noteData);
        toast.success('✨ Note refined!');
      } else {
        await noteAPI.create(noteData);
        toast.success('🖋️ Memory captured!');
      }
      refreshCurrentTrip();
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to save note');
    } finally {
      setSaving(false);
    }
  };

  const deleteNote = async (id) => {
    try {
      await noteAPI.delete(id);
      toast.info('Note deleted');
      refreshCurrentTrip();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const togglePin = async (note) => {
    try {
      await noteAPI.update(note._id, { pinned: !note.pinned });
      refreshCurrentTrip();
    } catch (error) {
      toast.error('Sync failed');
    }
  };

  const NoteCard = ({ note }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-[48px] p-8 border transition-all cursor-pointer group relative overflow-hidden flex flex-col h-full ${
        note.pinned ? 'border-[#3F4F37] shadow-editorial' : 'border-[#CBD3C7]/50 bg-white hover:border-[#3F4F37]'
      }`}
      style={{ backgroundColor: note.color === '#FFFFFF' ? 'white' : note.color + '15' }}
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1 pr-4">
           <h3 className="text-2xl font-black text-[#1F241D] leading-tight line-clamp-2 editorial-title">{note.title}</h3>
           <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] mt-3 flex items-center gap-2">
              <Calendar size={12} /> {new Date(note.createdAt).toLocaleDateString()}
           </p>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={(e) => { e.stopPropagation(); togglePin(note); }} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#EEF1EA] hover:bg-[#3F4F37] hover:text-white transition-all shadow-sm">
            <Pin size={16} className={note.pinned ? 'fill-current' : ''} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); openEdit(note); }} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#EEF1EA] hover:bg-[#3F4F37] hover:text-white transition-all shadow-sm">
            <Edit2 size={16} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); deleteNote(note._id); }} className="w-10 h-10 flex items-center justify-center rounded-2xl bg-red-50 text-red-400 hover:bg-red-400 hover:text-white transition-all shadow-sm">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      <p className="text-base text-[#1F241D]/70 leading-relaxed line-clamp-5 flex-1 mb-8 font-medium italic">
        "{note.content}"
      </p>

      <div className="flex flex-wrap gap-2 pt-6 border-t border-[#CBD3C7]/20">
        {note.tags?.map(tag => (
          <span key={tag} className="text-[9px] font-black uppercase tracking-[0.3em] px-4 py-1.5 bg-[#EEF1EA] text-[#3F4F37] rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      
      {note.pinned && (
        <div className="absolute top-0 right-0 p-4 text-[#3F4F37]">
           <Sparkles size={18} className="animate-pulse" />
        </div>
      )}
    </motion.div>
  );

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Opening the journals...</div>;
  if (!currentTrip) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Select a trip to view notes</div>;

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 border-b border-[#CBD3C7]/30 pb-10">
        <div>
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-4">Travel Archives</div>
           <h1 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
             Journal & <span className="italic font-normal text-[#6F756B]">Memoirs</span>
           </h1>
           <p className="text-[#6F756B] font-medium mt-4 italic">Collecting moments and documenting the adventure.</p>
        </div>
        <BtnHighlight onClick={openNew} icon={Plus}>Capture Memory</BtnHighlight>
      </div>

      {/* Modern Search */}
      <div className="flex items-center gap-6 bg-[#EEF1EA]/60 backdrop-blur-md border border-[#CBD3C7]/30 rounded-[40px] px-10 py-6 mb-16 shadow-bali focus-within:bg-white transition-all">
        <Search size={24} className="text-[#6F756B]" />
        <input
          type="text"
          placeholder="Search through your travel stories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-xl font-bold text-[#1F241D] placeholder-[#6F756B]/40 outline-none flex-1"
        />
      </div>

      <AnimatePresence>
         {pinned.length > 0 && (
           <div className="mb-20">
              <div className="flex items-center gap-4 mb-8 px-6">
                 <Pin size={18} className="text-[#3F4F37]" />
                 <h3 className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em]">Pinned Highlights</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {pinned.map(note => <NoteCard key={note._id} note={note} />)}
              </div>
           </div>
         )}

         <div>
           <div className="flex items-center gap-4 mb-8 px-6">
              <BookOpen size={18} className="text-[#3F4F37]" />
              <h3 className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.4em]">Archive Entries</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {unpinned.map(note => <NoteCard key={note._id} note={note} />)}
           </div>
         </div>

         {filtered.length === 0 && (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center py-40 bg-[#EEF1EA]/20 border-2 border-dashed border-[#CBD3C7] rounded-[80px]"
           >
             <div className="w-32 h-32 rounded-[48px] bg-[#EEF1EA] flex items-center justify-center text-6xl mx-auto mb-10 shadow-inner">🖋️</div>
             <h3 className="text-3xl font-black text-[#1F241D] mb-4 editorial-title">The first page is always the hardest</h3>
             <p className="text-[#6F756B] font-medium mb-12 max-w-md mx-auto italic">Document a thought, a place, or a hidden gem you found today.</p>
             <BtnHighlight onClick={openNew} icon={Plus} className="!px-12">Start Journaling</BtnHighlight>
           </motion.div>
         )}
      </AnimatePresence>

      {/* Refined Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={editNote ? 'Refine Memory' : 'Capture Memory'}
        footer={
          <div className="flex gap-6 w-full p-2">
            <BtnGhost onClick={() => setShowModal(false)} className="flex-1 !py-6">Discard</BtnGhost>
            <BtnHighlight onClick={saveNote} disabled={saving} className="flex-1 !py-6" icon={saving ? Loader2 : Check}>
               {saving ? 'Archiving...' : 'Save Entry'}
            </BtnHighlight>
          </div>
        }
      >
        <div className="space-y-8 p-4">
          <div className="p-6 rounded-[32px] bg-[#EEF1EA]/60 border border-[#CBD3C7]/20 flex items-center gap-4 mb-4 shadow-inner">
             <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">📔</div>
             <div>
                <p className="text-[10px] font-black text-[#3F4F37] uppercase tracking-widest">Entry Date</p>
                <p className="text-sm font-bold text-[#1F241D]">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
             </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] block">Story Title</label>
            <input
              type="text"
              placeholder="e.g. Lost in the streets of Shinjuku"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full bg-[#EEF1EA] rounded-3xl px-8 py-5 text-base font-bold text-[#1F241D] outline-none border-2 border-transparent focus:border-[#3F4F37] transition-all"
            />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] block">Tell the story</label>
            <textarea
              placeholder="It was a rainy afternoon when we stumbled upon this tiny ramen shop..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              rows={6}
              className="w-full bg-[#EEF1EA] rounded-3xl px-8 py-5 text-base font-bold text-[#1F241D] outline-none border-2 border-transparent focus:border-[#3F4F37] transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] block">Tags</label>
                <input
                  type="text"
                  placeholder="Tokyo, Food, Hidden Gem"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  className="w-full bg-[#EEF1EA] rounded-3xl px-8 py-5 text-base font-bold text-[#1F241D] outline-none border-2 border-transparent focus:border-[#3F4F37] transition-all"
                />
             </div>
             <div className="space-y-4">
                <label className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em] block">Mood Palette</label>
                <div className="flex gap-3">
                  {colors.map(c => (
                    <button
                      key={c}
                      onClick={() => setForm({ ...form, color: c })}
                      className={`w-12 h-12 rounded-2xl border-4 transition-all shadow-sm ${form.color === c ? 'border-[#3F4F37] scale-110 shadow-lg' : 'border-white hover:scale-105'}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
             </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default NotesPage;
