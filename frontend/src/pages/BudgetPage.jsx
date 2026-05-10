import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Sparkles, AlertCircle, PieChart as PieChartIcon, BarChart3, CreditCard, Wallet } from 'lucide-react';
import { useTrips } from '../utils/TripContext';
import { Card } from '../components/Cards';
import { BtnHighlight } from '../components/Buttons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid } from 'recharts';

const BudgetPage = () => {
  const { currentTrip, budget: budgetData, loading } = useTrips();

  // Normalize budget data from object to array for UI rendering
  const budget = Array.isArray(budgetData) && budgetData.length > 0 && budgetData[0].name ? budgetData : [
    { name: 'Transport', amount: (currentTrip?.budget || 0) * 0.3, spent: budgetData?.transportCost || 0, icon: '✈️' },
    { name: 'Stay', amount: (currentTrip?.budget || 0) * 0.4, spent: budgetData?.stayCost || 0, icon: '🏨' },
    { name: 'Food', amount: (currentTrip?.budget || 0) * 0.2, spent: budgetData?.foodCost || 0, icon: '🍔' },
    { name: 'Activities', amount: (currentTrip?.budget || 0) * 0.1, spent: budgetData?.activityCost || 0, icon: '🎯' },
  ];

  const totalBudget = currentTrip?.budget || 0;
  const totalSpent = budget.reduce((acc, curr) => acc + (curr.spent || 0), 0);
  const pct = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  
  const chartColors = ['#FF8A5B', '#4DB6AC', '#FFD166', '#8ECAE6', '#607D8B'];

  if (loading) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Analyzing Financials...</div>;
  if (!currentTrip) return <div className="p-20 text-center font-black uppercase tracking-widest text-[#6F756B]">Select a trip to view budget</div>;

  return (
    <div className="p-6 lg:p-10 animate-editorial-up pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 border-b border-[#CBD3C7]/30 pb-10">
        <div>
           <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#3F4F37] mb-4">Financial Dashboard</div>
           <h1 className="text-5xl font-black text-[#1F241D] tracking-tighter editorial-title leading-none">
             Expense <span className="italic font-normal text-[#6F756B]">Control</span>
           </h1>
           <p className="text-[#6F756B] font-medium mt-4 italic">Real-time budget tracking for {currentTrip.title}</p>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-8 py-4 bg-white border border-[#CBD3C7] rounded-full text-[10px] font-black uppercase tracking-widest text-[#1F241D] hover:bg-[#FDF2E9] transition-all">Export PDF</button>
           <BtnHighlight icon={CreditCard}>Add Expense</BtnHighlight>
        </div>
      </div>

      {/* Main Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        {[
          { label: 'Total Budget', value: `₹${totalBudget.toLocaleString()}`, sub: 'Goal set', color: '#FF8A5B', icon: CreditCard },
          { label: 'Amount Spent', value: `₹${totalSpent.toLocaleString()}`, sub: `${pct.toFixed(1)}% consumed`, color: pct > 90 ? '#ef4444' : '#4DB6AC', icon: TrendingUp },
          { label: 'Available', value: `₹${(totalBudget - totalSpent).toLocaleString()}`, sub: 'Safe to spend', color: '#8ECAE6', icon: Wallet },
        ].map((item) => (
          <Card key={item.label} className="!p-8">
            <div className="flex items-center justify-between mb-6">
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner" style={{ backgroundColor: item.color + '15' }}>
                  <item.icon size={24} style={{ color: item.color }} />
               </div>
               <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ${item.label === 'Amount Spent' && pct > 90 ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                  {item.sub}
               </span>
            </div>
            <p className="text-[10px] font-black text-[#6F756B] uppercase tracking-[0.2em] mb-2">{item.label}</p>
            <p className="text-4xl font-black text-[#1F241D] tracking-tighter editorial-title">{item.value}</p>
          </Card>
        ))}
      </div>

      {/* Overall Progress */}
      <Card className="mb-10 !p-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-black text-[#1F241D] editorial-title tracking-tight">Overall Progress</h3>
          <span className="text-xl font-black text-[#3F4F37] bg-[#3F4F37]/10 px-6 py-2 rounded-full">{pct.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-[#DDE3DC] rounded-full h-5 overflow-hidden mb-6 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-[#3F4F37] via-[#8F9B8B] to-[#D4B2A7]"
          />
        </div>
        <div className="flex justify-between items-center text-[10px] font-black text-[#6F756B] uppercase tracking-[0.3em]">
           <span>₹0 Spent</span>
           <span>Target: ₹{totalBudget.toLocaleString()}</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        {/* Category Breakdown */}
        <Card className="!p-8">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-2xl font-black text-[#1F241D] editorial-title tracking-tight">Category Breakdown</h3>
             <BarChart3 size={20} className="text-[#6F756B]/30" />
          </div>
          <div className="space-y-8">
            {budget.map((cat, i) => {
              const catPct = (cat.spent / cat.amount) * 100;
              const over = cat.spent > cat.amount;
              return (
                <div key={cat._id || i} className="group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{cat.icon || '💰'}</span>
                      <div>
                         <p className="text-base font-black text-[#1F241D]">{cat.name}</p>
                         <p className="text-[10px] font-bold text-[#6F756B] uppercase tracking-widest">{Math.min(catPct, 100).toFixed(0)}% Utilized</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-xl font-black ${over ? 'text-red-500' : 'text-[#1F241D]'}`}>₹{(cat.spent || 0).toLocaleString()}</span>
                      <span className="text-[10px] font-bold text-[#6F756B]/40 block uppercase tracking-widest mt-1">Budget: ₹{(cat.amount || 0).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#EEF1EA] rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(catPct, 100)}%` }}
                      transition={{ duration: 0.8, delay: 0.1 + i * 0.05 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: over ? '#ef4444' : chartColors[i % chartColors.length] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Pie Chart / Distribution */}
        <Card className="!p-8 flex flex-col">
          <div className="flex items-center justify-between mb-10">
             <h3 className="text-2xl font-black text-[#1F241D] editorial-title tracking-tight">Distribution</h3>
             <PieChartIcon size={20} className="text-[#6F756B]/30" />
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={budget}
                  dataKey="spent"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={65}
                  stroke="none"
                  paddingAngle={5}
                >
                  {budget.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '32px', border: 'none', boxShadow: '0 30px 70px rgba(0,0,0,0.1)', fontWeight: 'bold' }}
                   formatter={(v) => `₹${v.toLocaleString()}`} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-[#CBD3C7]/30">
            {budget.map((cat, i) => (
              <div key={cat._id || i} className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: chartColors[i % chartColors.length] }} />
                <span className="text-[11px] font-black text-[#1F241D] truncate uppercase tracking-widest">{cat.name}</span>
                <span className="text-[10px] font-bold text-[#6F756B] ml-auto">{((cat.spent/totalSpent)*100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Advice */}
      <Card className="!p-10 !bg-[#263322] text-[#F8F4EA] border-none shadow-editorial">
         <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#D4B2A7]">
               <Sparkles size={24} />
            </div>
            <h3 className="text-2xl font-black tracking-tight editorial-title">Financial Intelligence</h3>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-8 rounded-[40px] bg-white/5 border border-white/10">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60 mb-4">Predicted Burn Rate</p>
               <p className="text-5xl font-black text-white tracking-tighter">₹{(totalSpent * 1.2).toLocaleString()}</p>
               <div className="flex items-center gap-2 mt-6">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">High Accuracy Analysis</span>
               </div>
            </div>

            <div className="space-y-6">
               <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Optimization Strategy</p>
               {[
                 'Consolidate transport bookings to save ₹1,200',
                 'Daily dining average is within safe limits',
                 'Consider shifting hotel deposit to available pool'
               ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                     <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-[#D4B2A7] shrink-0 mt-0.5">
                        <TrendingDown size={16} />
                     </div>
                     <p className="text-sm font-medium text-white/70 leading-relaxed group-hover:text-white transition-colors">{tip}</p>
                  </div>
               ))}
            </div>
         </div>
      </Card>
    </div>
  );
};

export default BudgetPage;
