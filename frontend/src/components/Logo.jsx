import React from 'react';

const Logo = ({ className = '', showText = true }) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {/* Fixed SVG Logo - Expanded ViewBox to prevent clipping */}
      <svg width="68" height="68" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        {/* Deep Green Globe - Centered left */}
        <circle cx="30" cy="50" r="22" fill="#3F6F5B" />
        
        {/* Globe Grid Lines */}
        <circle cx="30" cy="50" r="22" stroke="white" strokeWidth="0.75" strokeOpacity="0.4" />
        <path d="M10 40C10 40 16 35 30 35C44 35 50 40 50 40" stroke="white" strokeWidth="0.75" strokeOpacity="0.4" />
        <path d="M10 60C10 60 16 65 30 65C44 65 50 60 50 60" stroke="white" strokeWidth="0.75" strokeOpacity="0.4" />
        <path d="M20 30C20 30 25 40 25 50C25 60 20 70 20 70" stroke="white" strokeWidth="0.75" strokeOpacity="0.4" />
        <path d="M40 30C40 30 35 40 35 50C35 60 40 70 40 70" stroke="white" strokeWidth="0.75" strokeOpacity="0.4" />
        
        {/* Completed Infinity Loop - Smoother and wider path */}
        <path 
          d="M30 25C16 25 5 36 5 50C5 64 16 75 30 75C42 75 55 65 65 55C75 45 85 35 100 35C112 35 115 42 115 50C115 58 112 65 100 65C85 65 75 55 65 45C55 35 42 25 30 25Z" 
          stroke="#C9A64A" 
          strokeWidth="7" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Highlight for depth */}
        <path 
          d="M30 25C16 25 5 36 5 50C5 64 16 75 30 75" 
          stroke="white" 
          strokeWidth="1.5" 
          strokeOpacity="0.2" 
          strokeLinecap="round"
        />
      </svg>
      
      {showText && (
        <div className="flex flex-col justify-center">
          <h1 className="text-[32px] font-bold text-[#2F332D] tracking-[-0.03em] uppercase leading-[1] m-0" style={{ fontFamily: "'Playfair Display', serif" }}>
            Traveloop
          </h1>
          <p className="text-[10px] font-black text-[#1F241D] uppercase tracking-[0.3em] whitespace-nowrap leading-none mt-2">
            International Travel Hub
          </p>
        </div>
      )}
    </div>
  );
};

export default Logo;
