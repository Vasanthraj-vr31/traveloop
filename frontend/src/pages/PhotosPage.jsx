import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, Calendar, Tag, X, Grid3X3, List, Heart, Sparkles, Filter, MoreVertical, Download, Share2, Plus, Loader2 } from 'lucide-react';
import { useTrips } from '../utils/TripContext';
import { photoAPI } from '../services/api';
import { BtnPrimary, BtnGhost, BtnHighlight } from '../components/Buttons';
import { Card } from '../components/Cards';
import { toast } from 'react-toastify';

const PhotosPage = () => {
  const { currentTrip, photos, refreshCurrentTrip, loading } = useTrips();
  const [view, setView] = useState('grid');
  const [selected, setSelected] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const API_BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !currentTrip) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('tripId', currentTrip._id);
    formData.append('title', file.name.split('.')[0]);
    formData.append('location', currentTrip.destination || 'Unspecified');

    setUploading(true);
    try {
      await photoAPI.upload(formData);
      toast.success('Memory captured successfully!');
      refreshCurrentTrip();
    } catch (error) {
      toast.error('Upload failed. Try again.');
    } finally {
      setUploading(false);
    }
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${API_BASE}/${path}`;
  };

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Opening the archives...</div>;
  if (!currentTrip) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Select a trip to view memories</div>;

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 border-b border-[#CBD3C7]/30 pb-10">
        <div>
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-4">Visual Archives</div>
           <h1 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
             Trip <span className="italic font-normal text-[#6F756B]">Memories</span>
           </h1>
           <p className="text-[#6F756B] font-medium mt-4 italic">{photos.length} moments captured for {currentTrip.title}.</p>
        </div>
        <div className="flex items-center gap-4">
           <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*"
           />
           <BtnHighlight 
              onClick={() => fileInputRef.current?.click()} 
              icon={uploading ? Loader2 : Camera}
              disabled={uploading}
           >
              {uploading ? 'Capturing...' : 'Upload Memory'}
           </BtnHighlight>
        </div>
      </div>

      {/* Gallery View */}
      <AnimatePresence mode="wait">
        {photos.length > 0 ? (
          <motion.div
             key="grid"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8"
          >
            {photos.map((photo, i) => (
              <motion.div
                key={photo._id || i}
                layout
                whileHover={{ y: -8 }}
                onClick={() => setSelected(photo)}
                className="break-inside-avoid relative rounded-[48px] overflow-hidden cursor-pointer group shadow-bali border-4 border-white"
              >
                <img 
                  src={getImageUrl(photo.imageUrl)} 
                  alt={photo.title}
                  className="w-full h-auto transition-all duration-700 group-hover:scale-110"
                />

                {/* Overlay Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#263322] via-[#263322]/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                   <h4 className="text-2xl font-black text-[#F8F4EA] tracking-tight editorial-title">{photo.title}</h4>
                   <p className="text-[#F8F4EA]/60 text-[9px] font-black uppercase tracking-widest mt-2 flex items-center gap-2">
                      <MapPin size={10} /> {photo.location}
                   </p>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                   <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-[#263322] shadow-lg transition-all">
                      <Heart size={20} />
                   </button>
                   <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-[#263322] shadow-lg transition-all">
                      <Download size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/20 backdrop-blur-xl rounded-[100px] border-2 border-dashed border-[#CBD3C7] p-40 text-center"
          >
             <div className="w-32 h-32 rounded-[48px] bg-[#EEF1EA] flex items-center justify-center text-5xl mx-auto mb-10">
                🎞️
             </div>
             <h3 className="text-4xl font-black text-[#1F241D] editorial-title mb-4">No moments captured yet</h3>
             <p className="text-[#6F756B] max-w-md mx-auto italic mb-10">
                Start building your visual archive by uploading photos from your journey.
             </p>
             <BtnHighlight onClick={() => fileInputRef.current?.click()} icon={Camera}>Upload Your First Photo</BtnHighlight>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox / Expanded View */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#263322]/95 backdrop-blur-2xl z-[2000] flex items-center justify-center p-6 md:p-12"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 40, opacity: 0 }}
              className="bg-[#F7F5EF] rounded-[64px] max-w-6xl w-full max-h-full overflow-hidden shadow-2xl flex flex-col lg:flex-row relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelected(null)} 
                className="absolute top-8 right-8 w-14 h-14 bg-white/10 backdrop-blur-xl text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#263322] transition-all z-20"
              >
                <X size={28} />
              </button>

              <div className="flex-1 min-h-[400px] flex items-center justify-center p-4 bg-[#DDE3DC]/30 overflow-hidden">
                <img 
                   src={getImageUrl(selected.imageUrl)} 
                   className="w-full h-full object-contain drop-shadow-2xl" 
                   alt={selected.title} 
                />
              </div>

              <div className="w-full lg:w-[450px] p-12 md:p-16 flex flex-col justify-center">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#3F4F37] flex items-center justify-center text-[#F8F4EA]">
                       <Sparkles size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37]">Memory Detail</span>
                 </div>
                 
                 <h2 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title mb-6 leading-none">{selected.title}</h2>
                 
                 <div className="space-y-6 mb-12 border-l-2 border-[#CBD3C7] pl-8 py-2">
                    <div className="flex items-center gap-4 text-base font-bold text-[#6F756B]">
                       <MapPin size={20} className="text-[#3F4F37]" /> {selected.location}
                    </div>
                    <div className="flex items-center gap-4 text-base font-bold text-[#6F756B]">
                       <Calendar size={20} className="text-[#3F4F37]" /> {new Date(selected.createdAt).toLocaleDateString()}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <BtnGhost className="w-full !py-6" icon={Share2}>Share</BtnGhost>
                    <BtnPrimary className="w-full !py-6" icon={Download}>Download</BtnPrimary>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotosPage;
