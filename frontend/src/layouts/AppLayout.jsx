import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Logo from '../components/Logo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#DDE3DC] font-sans">
      {/* Luxury Bali Background */}
      <div className="bali-bg">
        {/* Soft Nature Blobs */}
        <div className="bali-blob w-[900px] h-[900px] bg-[#EEF1EA] -top-[300px] -right-[200px] opacity-60" />
        <div className="bali-blob w-[700px] h-[700px] bg-[#CBD3C7] -bottom-[200px] -left-[200px] opacity-40 animate-pulse" />
        <div className="bali-blob w-[600px] h-[600px] bg-[#8F9B8B] top-[20%] left-[5%] opacity-20" />
        
        {/* Cinematic Noise Overlay */}
        <div className="noise-overlay" />
      </div>

      {/* Horizontal Navigation */}
      <Navbar />
      
      <div className="flex-1 overflow-y-auto relative z-10 hide-scrollbar pt-32">
        {/* Main Content Area - Full Width Editorial Layout */}
        <main className="w-full min-h-full">
          <div className="w-full">
            <Outlet />
          </div>
        </main>

        {/* Global Footer (Optional but good for luxury feel) */}
        <footer className="py-20 px-10 border-t border-[#CBD3C7]/30 flex flex-col items-center bg-[#EEF1EA]/50 backdrop-blur-md">
           <Logo className="mb-6" />
           <p className="text-[#6F756B] text-[9px] font-black tracking-[0.4em] uppercase">The Art of Mindful Exploration</p>
           <div className="mt-8 flex justify-center gap-10 text-[10px] font-black text-[#1F241D] uppercase tracking-[0.3em]">
              <a href="#" className="hover:text-[#3F4F37] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#3F4F37] transition-colors">Concierge</a>
              <a href="#" className="hover:text-[#3F4F37] transition-colors">Archive</a>
           </div>
        </footer>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        toastStyle={{
          background: '#F7F5EF',
          color: '#1F241D',
          border: '1px solid #CBD3C7',
          borderRadius: '40px',
          boxShadow: '0 30px 70px rgba(31, 36, 29, 0.1)',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: '700',
          fontSize: '14px',
          padding: '20px 32px',
        }}
      />
    </div>
  );
};

export default AppLayout;
