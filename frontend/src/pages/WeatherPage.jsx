import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Wind, Droplets, Eye, Thermometer, Umbrella, MapPin, Sparkles, Navigation, Calendar } from 'lucide-react';
import { mockWeather } from '../utils/mockData';
import { Card } from '../components/Cards';
import { BtnPrimary, BtnGhost } from '../components/Buttons';

const WeatherPage = () => {
  const days = mockWeather.forecast;

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-[#263238] tracking-tight">Weather Hub ⛅</h1>
          <p className="text-[#607D8B] font-medium mt-1">Real-time conditions for your global destinations.</p>
        </div>
        <BtnGhost icon={Navigation}>Switch Location</BtnGhost>
      </div>

      {/* Current Weather Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#8ECAE6] via-[#4DB6AC] to-[#FFD166] rounded-[48px] p-10 md:p-14 mb-10 text-[#263238] relative overflow-hidden shadow-2xl shadow-blue-100"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4 opacity-80">
               <MapPin size={16} />
               <p className="text-xs font-black uppercase tracking-[0.2em]">{mockWeather.city}, Japan</p>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <span className="text-9xl drop-shadow-2xl animate-float">{mockWeather.current.icon}</span>
              <div>
                <p className="text-8xl font-black tracking-tighter">{mockWeather.current.temp}°</p>
                <p className="text-xl font-bold uppercase tracking-widest opacity-70">{mockWeather.current.condition}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-xl rounded-[40px] p-8 border border-white/30 grid grid-cols-2 gap-8 w-full md:w-auto">
            {[
              { label: 'Humidity', value: `${mockWeather.current.humidity}%`, icon: Droplets, color: '#8ECAE6' },
              { label: 'Wind Speed', value: `${mockWeather.current.wind} km/h`, icon: Wind, color: '#4DB6AC' },
              { label: 'Feels Like', value: '16°C', icon: Thermometer, color: '#FF8A5B' },
              { label: 'Visibility', value: '12 km', icon: Eye, color: '#607D8B' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="text-center md:text-left">
                <Icon size={20} className="mx-auto md:mx-0 mb-2" style={{ color }} />
                <p className="text-xl font-black">{value}</p>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{label}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Animated Background Deco */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg] pointer-events-none" />
      </motion.div>

      {/* 7-Day Forecast Ribbon */}
      <Card className="mb-10 !p-8">
        <h3 className="text-lg font-black text-[#263238] mb-8 flex items-center gap-3">
           <Calendar size={20} className="text-[#FF8A5B]" /> Weekly Outlook
        </h3>
        <div className="flex items-center gap-4 overflow-x-auto hide-scrollbar pb-2">
          {days.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col items-center justify-center min-w-[100px] h-[160px] rounded-[32px] transition-all cursor-pointer group ${
                i === 0 ? 'bg-[#263238] text-white shadow-xl shadow-gray-300 scale-105' : 'bg-[#FDF2E9] hover:bg-white hover:shadow-lg text-[#263238]'
              }`}
            >
              <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${i === 0 ? 'text-white/40' : 'text-[#607D8B]'}`}>{day.day}</p>
              <span className="text-4xl mb-3 group-hover:scale-125 transition-transform">{day.icon}</span>
              <div className="text-center">
                 <p className="text-lg font-black">{day.high}°</p>
                 <p className={`text-[10px] font-bold ${i === 0 ? 'text-white/40' : 'text-[#607D8B]/40'}`}>{day.low}°</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Destinaion Alerts & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Travel Weather Tips */}
        <Card className="!p-8">
          <h3 className="text-lg font-black text-[#263238] mb-6 flex items-center gap-3">
             <Sparkles size={18} className="text-[#FFD166]" /> AI Smart Forecast
          </h3>
          <div className="space-y-4">
            {[
              { day: 'Today', tip: 'Golden hour at 5:42 PM — Perfect for Tokyo Tower photos!', icon: '📸', type: 'great' },
              { day: 'Wednesday', tip: 'Approaching rain front — Plan indoor museums in Ueno.', icon: '🏛️', type: 'warn' },
              { day: 'Weekend', tip: 'Exceptional clarity — Best time for Mt. Fuji views.', icon: '🏔️', type: 'good' },
            ].map((tip, i) => (
              <div key={i} className={`p-5 rounded-[24px] flex items-start gap-4 border transition-all ${
                tip.type === 'great' ? 'bg-orange-50 border-orange-100' : tip.type === 'warn' ? 'bg-blue-50 border-blue-100' : 'bg-[#FDF2E9]/40 border-transparent'
              }`}>
                <span className="text-3xl shrink-0">{tip.icon}</span>
                <div>
                  <p className="text-xs font-black text-[#263238] uppercase tracking-widest">{tip.day}</p>
                  <p className="text-sm font-medium text-[#607D8B] mt-1 leading-relaxed">{tip.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Other Trip Cities */}
        <Card className="!p-8">
          <h3 className="text-lg font-black text-[#263238] mb-6">Route Conditions</h3>
          <div className="space-y-4">
            {[
              { city: 'Tokyo', temp: 18, icon: '⛅', status: 'On Track' },
              { city: 'Kyoto', temp: 16, icon: '🌤️', status: 'Sunny' },
              { city: 'Hakone', temp: 12, icon: '🌧️', status: 'Rainy' },
            ].map((dest) => (
              <div key={dest.city} className="flex items-center gap-4 p-4 rounded-[24px] bg-[#FDF2E9]/40 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                <span className="text-4xl group-hover:scale-110 transition-transform">{dest.icon}</span>
                <div className="flex-1">
                  <p className="text-base font-black text-[#263238]">{dest.city}</p>
                  <p className="text-[10px] font-black text-[#4DB6AC] uppercase tracking-[0.2em]">{dest.status}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-[#263238]">{dest.temp}°</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gradient-to-r from-[#FF8A5B]/10 to-[#FFD166]/10 rounded-2xl flex items-center gap-3">
             <Umbrella size={16} className="text-[#FF8A5B]" />
             <p className="text-[10px] font-black text-[#263238] uppercase tracking-widest">Pack light rain gear for Hakone</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WeatherPage;
