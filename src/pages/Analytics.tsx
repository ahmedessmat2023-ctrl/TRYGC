/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BarChart3, TrendingUp, Users, CheckCircle2, AlertCircle, PieChart, Info } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RePieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const DATA_KPI = [
  { name: 'KSA', active: 12, closed: 45 },
  { name: 'UAE', active: 8, closed: 32 },
  { name: 'EG', active: 15, closed: 28 },
  { name: 'KW', active: 4, closed: 12 },
];

const COLORS = ['#E8630C', '#52358C', '#A798BF', '#E3A579'];

export default function OperationalAnalytics() {
  return (
    <div className="max-w-[1240px] mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="section-kicker">Data Science</div>
          <h2 className="section-title">Operational Insights</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-2 font-mono text-[13px]">
            <TrendingUp size={16} className="text-[var(--gc-purple)]" />
            Performance mapping across the full TryGC ecosystem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsStatCard title="Total Campaigns" value="156" trend="+12.5%" desc="YoY Growth Managed" icon={<BarChart3 size={24} />} accent="orange" />
        <AnalyticsStatCard title="QA Pass Rate" value="98.2%" trend="+0.4%" desc="Against Compliance Brief" icon={<CheckCircle2 size={24} />} accent="purple" />
        <AnalyticsStatCard title="Recovery Avg Time" value="1.4h" trend="-15%" desc="Lead to Archive Speed" icon={<TrendingUp size={24} />} accent="lavender" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="command-card p-8 bg-[var(--bg)]">
           <h3 className="section-title text-[12px] uppercase tracking-widest text-[var(--ink-300)] mb-8 font-mono">Active vs Closed Operations</h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={DATA_KPI}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-strong)" />
                 <XAxis dataKey="name" fontSize={11} fontWeight="bold" stroke="var(--ink-500)" />
                 <YAxis fontSize={11} stroke="var(--ink-500)" />
                 <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: 'var(--white)', borderColor: 'var(--border)', color: 'var(--ink-900)' }} />
                 <Bar dataKey="active" fill="var(--gc-orange)" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="closed" fill="var(--gc-purple)" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="command-card p-8 bg-[var(--bg)] flex flex-col items-center justify-center">
           <h3 className="section-title text-[12px] uppercase tracking-widest text-[var(--ink-300)] mb-8 self-start font-mono">Market Distribution</h3>
           <div className="h-[240px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <RePieChart>
                 <Pie data={DATA_KPI} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="active" stroke="transparent">
                   {DATA_KPI.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ backgroundColor: 'var(--white)', borderColor: 'var(--border)', color: 'var(--ink-900)' }} />
               </RePieChart>
             </ResponsiveContainer>
           </div>
           <div className="flex gap-4 mt-4">
              {DATA_KPI.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-white">
                   <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                   <span className="text-[10px] font-bold uppercase text-[var(--ink-900)] tracking-wider">{d.name}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsStatCard({ title, value, trend, desc, icon, accent }: any) {
  const isOrange = accent === 'orange';
  const isPurple = accent === 'purple';
  
  return (
    <div className={`command-card p-8 relative overflow-hidden flex flex-col group bg-white`}>
       <div className="absolute top-0 right-0 p-8 opacity-20 text-[var(--ink-300)] transition-transform group-hover:scale-110">
          {icon}
       </div>
       <p className="data-label">{title}</p>
       <p className={`text-5xl tracking-tight mt-1 font-display font-black ${isOrange ? 'text-[var(--gc-orange)]' : isPurple ? 'text-[var(--gc-purple)]' : 'text-[var(--gc-lavender)]'}`}>{value}</p>
       <div className="mt-8 flex items-center justify-between border-t border-[var(--border)] pt-4">
          <p className="text-[11px] font-mono text-[var(--ink-500)] max-w-[120px] uppercase tracking-wider">{desc}</p>
          <span className={`px-2.5 py-1 rounded-sm border text-[10px] font-display font-black tracking-widest ${trend.startsWith('+') ? 'text-[var(--success)] bg-emerald-50 border-emerald-100' : 'text-[var(--danger)] bg-red-50 border-red-100'}`}>{trend}</span>
       </div>
    </div>
  );
}
