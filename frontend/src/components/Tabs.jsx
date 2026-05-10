import React from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs, activeTab, onChange }) => (
  <div className="flex gap-1 bg-[#E8F0E8] p-1 rounded-2xl">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
          activeTab === tab.id
            ? 'text-[#2F3E46]'
            : 'text-[#2F3E46]/50 hover:text-[#2F3E46]/80'
        }`}
      >
        {activeTab === tab.id && (
          <motion.div
            layoutId="tabIndicator"
            className="absolute inset-0 bg-white rounded-xl shadow-sm"
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {tab.icon && <span>{tab.icon}</span>}
          {tab.label}
        </span>
      </button>
    ))}
  </div>
);

export default Tabs;
