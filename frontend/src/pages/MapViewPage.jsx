import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Navigation, Layers, ZoomIn, ZoomOut, Search,
  Compass, List, ChevronRight, Globe, Wind, Star, Sparkles, Shield, Clock, Info
} from 'lucide-react';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost, BtnSecondary } from '../components/Buttons';

// Fix for Leaflet marker icon issue in Vite
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIconRetina,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const points = [
  { 
    id: 1, 
    name: 'Ubud', 
    type: 'Cultural Center', 
    lat: -8.5069, 
    lng: 115.2625, 
    emoji: '🌿',
    desc: 'The spiritual and artistic heart of Bali, famous for its lush rainforest and terraced rice paddies.',
    visitTime: '4-6 Hours'
  },
  { 
    id: 2, 
    name: 'Tegallalang Rice Terrace', 
    type: 'Nature', 
    lat: -8.4331, 
    lng: 115.2785, 
    emoji: '🌾',
    desc: 'Breathtaking terraced rice fields offering a deep look into Bali\'s traditional Subak irrigation system.',
    visitTime: '2 Hours'
  },
  { 
    id: 3, 
    name: 'Tanah Lot', 
    type: 'Temple', 
    lat: -8.6212, 
    lng: 115.0868, 
    emoji: '🏯',
    desc: 'An iconic offshore temple set on a rock formation, stunning during sunset.',
    visitTime: '1.5 Hours'
  },
  { 
    id: 4, 
    name: 'Seminyak Beach', 
    type: 'Beach', 
    lat: -8.6913, 
    lng: 115.1554, 
    emoji: '🏖️',
    desc: 'Stylish beach area with world-class dining, luxury boutiques, and golden sands.',
    visitTime: '3 Hours'
  },
  { 
    id: 5, 
    name: 'Kuta Beach', 
    type: 'Beach', 
    lat: -8.7185, 
    lng: 115.1686, 
    emoji: '🏄',
    desc: 'Famous for its long sandy beach, surf-friendly waves, and vibrant nightlife.',
    visitTime: '2 Hours'
  },
  { 
    id: 6, 
    name: 'Uluwatu Temple', 
    type: 'Temple', 
    lat: -8.8291, 
    lng: 115.0849, 
    emoji: '🌄',
    desc: 'Ancient cliff-top temple with dramatic Indian Ocean views and traditional Kecak fire dances.',
    visitTime: '3 Hours'
  },
];

const polylinePath = points.map(p => [p.lat, p.lng]);

// Helper component to handle map centering and animation
const ChangeView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const MapViewPage = () => {
  const [activeTab, setActiveTab] = useState('destinations');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [mapCenter, setMapCenter] = useState([-8.3405, 115.0920]);
  const [zoom, setZoom] = useState(10);

  const handlePlaceClick = (p) => {
    setSelectedPlace(p);
    setMapCenter([p.lat, p.lng]);
    setZoom(13);
  };

  return (
    <div className="p-0 h-[calc(100vh-80px)] relative overflow-hidden animate-editorial-up flex flex-col lg:flex-row bg-[#DDE3DC]">
      
      {/* Sidebar Controls - Luxury Bali Style */}
      <div className="w-full lg:w-[450px] bg-[#EEF1EA]/90 backdrop-blur-3xl border-r border-[#CBD3C7]/30 z-[1000] flex flex-col relative h-2/5 lg:h-full shadow-bali">
         <div className="p-8 lg:p-10 pb-4 lg:pb-6">
            <div className="flex items-center gap-5 mb-8 lg:mb-10">
               <div className="w-12 h-12 rounded-[20px] bg-[#263322] flex items-center justify-center text-[#F8F4EA] shadow-xl">
                  <Compass size={24} />
               </div>
               <div>
                  <h1 className="editorial-title text-2xl font-black text-[#1F241D] tracking-tighter italic leading-none">Bali Archive</h1>
                  <p className="text-[10px] font-black text-[#3F4F37] uppercase tracking-[0.3em] mt-1">Journey Chronicles 2026</p>
               </div>
            </div>

            <div className="flex items-center gap-4 bg-white/40 backdrop-blur-md border border-[#CBD3C7]/40 rounded-[28px] px-6 py-4 mb-6 lg:mb-8 focus-within:border-[#263322] transition-all">
               <Search size={18} className="text-[#6F756B]" />
               <input 
                  type="text" 
                  placeholder="Identify locations..." 
                  className="bg-transparent text-sm text-[#1F241D] font-bold outline-none flex-1 uppercase tracking-widest placeholder-[#6F756B]/40"
               />
            </div>

            <div className="flex p-1.5 bg-[#DDE3DC]/50 rounded-[24px] mb-6 lg:mb-8">
               {['destinations', 'saved'].map(tab => (
                  <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`flex-1 py-3 rounded-[20px] text-[10px] font-black uppercase tracking-[0.25em] transition-all ${activeTab === tab ? 'bg-[#263322] text-[#F8F4EA] shadow-xl' : 'text-[#6F756B] hover:text-[#1F241D]'}`}
                  >
                     {tab}
                  </button>
               ))}
            </div>
         </div>

         <div className="flex-1 overflow-y-auto px-6 pb-6 lg:pb-10 space-y-4 hide-scrollbar">
            {points.map((p) => (
               <motion.div
                  key={p.id}
                  whileHover={{ scale: 1.01, x: 5 }}
                  onClick={() => handlePlaceClick(p)}
                  className={`p-5 lg:p-6 rounded-[32px] border transition-all cursor-pointer group flex items-start gap-5 ${selectedPlace?.id === p.id ? 'bg-white border-[#3F4F37] shadow-bali' : 'bg-white/20 border-transparent hover:bg-white/40 hover:border-[#CBD3C7]/50'}`}
               >
                  <div className="w-14 h-14 rounded-[24px] bg-[#EEF1EA] group-hover:bg-[#3F4F37] flex items-center justify-center text-3xl shrink-0 transition-all group-hover:text-white">
                     {p.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-lg font-black text-[#1F241D] truncate tracking-tighter transition-colors leading-none mb-1">{p.name}</p>
                     <p className="text-[10px] font-bold text-[#6F756B] uppercase tracking-[0.2em]">{p.type}</p>
                     
                     {selectedPlace?.id === p.id && (
                       <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 pt-4 border-t border-[#CBD3C7]/30"
                       >
                          <p className="text-xs text-[#6F756B] leading-relaxed mb-4">{p.desc}</p>
                          <div className="flex items-center gap-4">
                             <span className="flex items-center gap-1.5 text-[9px] font-black text-[#3F4F37] uppercase tracking-widest">
                                <Clock size={12} /> {p.visitTime}
                             </span>
                             <button className="flex items-center gap-1.5 text-[9px] font-black text-[#6F756B] uppercase tracking-widest">
                                <Navigation size={12} /> Directions
                             </button>
                          </div>
                       </motion.div>
                     )}
                  </div>
                  <ChevronRight size={18} className={`mt-2 transition-colors ${selectedPlace?.id === p.id ? 'text-[#3F4F37] rotate-90' : 'text-[#6F756B]/20'}`} />
               </motion.div>
            ))}
         </div>
         
         <div className="p-8 lg:p-10 border-t border-[#CBD3C7]/30 bg-[#EEF1EA]/50 backdrop-blur-md">
            <BtnPrimary className="w-full !rounded-[24px] py-5" icon={Navigation}>Synchronize Journey</BtnPrimary>
         </div>
      </div>

      {/* Real Interactive Map - Leaflet */}
      <div className="flex-1 relative bg-[#DDE3DC] h-3/5 lg:h-full">
         <MapContainer 
            center={mapCenter} 
            zoom={zoom} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            className="z-10"
            zoomControl={false}
         >
            <ChangeView center={mapCenter} zoom={zoom} />
            <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
               url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            {points.map(p => (
               <Marker 
                  key={p.id} 
                  position={[p.lat, p.lng]}
                  eventHandlers={{
                    click: () => setSelectedPlace(p),
                  }}
               >
                  <Popup className="bali-popup">
                     <div className="p-2 min-w-[200px]">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-2xl">{p.emoji}</span>
                           <div>
                              <h3 className="font-black text-[#1F241D] m-0 leading-tight">{p.name}</h3>
                              <p className="text-[9px] font-bold text-[#6F756B] uppercase tracking-widest m-0">{p.type}</p>
                           </div>
                        </div>
                        <p className="text-xs text-[#6F756B] leading-relaxed mb-3">{p.desc}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-[#CBD3C7]/30">
                           <span className="text-[10px] font-black text-[#3F4F37] uppercase tracking-widest flex items-center gap-1">
                              <Clock size={10} /> {p.visitTime}
                           </span>
                           <button className="text-[10px] font-black text-white bg-[#263322] px-3 py-1 rounded-full uppercase tracking-widest">
                              Add
                           </button>
                        </div>
                     </div>
                  </Popup>
               </Marker>
            ))}

            <Polyline 
               positions={polylinePath} 
               color="#3F4F37" 
               weight={3} 
               dashArray="10, 10"
               opacity={0.6}
            />
         </MapContainer>

         {/* Floating Map Controls - Luxury Style */}
         <div className="absolute top-10 right-10 flex flex-col gap-4 z-[1000]">
            <button 
               onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
               className="w-14 h-14 bg-white/80 backdrop-blur-md border border-[#CBD3C7]/30 rounded-[24px] flex items-center justify-center text-[#1F241D] shadow-bali hover:bg-[#263322] hover:text-[#F8F4EA] transition-all"
            >
               <ZoomIn size={22} />
            </button>
            <button 
               onClick={() => setZoom(prev => Math.max(prev - 1, 3))}
               className="w-14 h-14 bg-white/80 backdrop-blur-md border border-[#CBD3C7]/30 rounded-[24px] flex items-center justify-center text-[#1F241D] shadow-bali hover:bg-[#263322] hover:text-[#F8F4EA] transition-all"
            >
               <ZoomOut size={22} />
            </button>
            <button className="w-14 h-14 bg-white/80 backdrop-blur-md border border-[#CBD3C7]/30 rounded-[24px] flex items-center justify-center text-[#1F241D] shadow-bali hover:bg-[#263322] hover:text-[#F8F4EA] transition-all">
               <Layers size={22} />
            </button>
            <button className="w-14 h-14 bg-white/80 backdrop-blur-md border border-[#CBD3C7]/30 rounded-[24px] flex items-center justify-center text-[#1F241D] shadow-bali hover:bg-[#263322] hover:text-[#F8F4EA] transition-all">
               <Sparkles size={22} />
            </button>
         </div>

         {/* Map Stats Badge */}
         <div className="absolute bottom-10 right-10 left-10 lg:left-auto z-[1000]">
            <Card className="!p-6 bg-white/90 backdrop-blur-2xl border-[#CBD3C7]/30 shadow-editorial max-w-sm">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-[20px] bg-[#263322] flex items-center justify-center text-white text-2xl">
                     📍
                  </div>
                  <div className="flex-1">
                     <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#6F756B]">Active Route</p>
                     <h4 className="text-xl font-black text-[#1F241D] tracking-tighter italic">Bali Expedition</h4>
                  </div>
                  <div className="text-right">
                     <p className="text-sm font-black text-[#3F4F37]">{points.length} Stops</p>
                     <p className="text-[8px] font-black uppercase tracking-widest text-[#6F756B]">42km Total</p>
                  </div>
               </div>
            </Card>
         </div>
      </div>

      <style jsx global>{`
        .leaflet-container {
          background: #DDE3DC !important;
        }
        .bali-popup .leaflet-popup-content-wrapper {
          border-radius: 24px;
          padding: 0;
          overflow: hidden;
          background: #F7F5EF;
          border: 1px solid rgba(203, 211, 199, 0.5);
          box-shadow: 0 20px 40px rgba(31, 36, 29, 0.1);
        }
        .bali-popup .leaflet-popup-content {
          margin: 0;
        }
        .bali-popup .leaflet-popup-tip {
          background: #F7F5EF;
        }
      `}</style>
    </div>
  );
};

export default MapViewPage;
