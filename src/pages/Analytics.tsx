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
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="section-title text-4xl">Operational Insights</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-1">
            <TrendingUp size={14} className="text-[var(--gc-purple)]" />
            Performance mapping across the full TryGC ecosystem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsStatCard title="Total Campaigns" value="156" trend="+12.5%" desc="YoY Growth Managed" icon={<BarChart3 size={20} />} accent="orange" />
        <AnalyticsStatCard title="QA Pass Rate" value="98.2%" trend="+0.4%" desc="Against Compliance Brief" icon={<CheckCircle2 size={20} />} accent="purple" />
        <AnalyticsStatCard title="Recovery Avg Time" value="1.4h" trend="-15%" desc="Lead to Archive Speed" icon={<TrendingUp size={20} />} accent="lavender" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="command-card p-8 bg-white">
           <h3 className="section-title text-sm uppercase tracking-widest text-slate-400 mb-8 font-mono">Active vs Closed Operations</h3>
           <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={DATA_KPI}>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
                 <XAxis dataKey="name" fontSize={11} fontWeight="bold" />
                 <YAxis fontSize={11} />
                 <Tooltip />
                 <Bar dataKey="active" fill="#E8630C" radius={[4, 4, 0, 0]} />
                 <Bar dataKey="closed" fill="#52358C" radius={[4, 4, 0, 0]} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="command-card p-8 bg-white flex flex-col items-center justify-center">
           <h3 className="section-title text-sm uppercase tracking-widest text-slate-400 mb-8 self-start font-mono">Market Distribution</h3>
           <div className="h-[240px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <RePieChart>
                 <Pie data={DATA_KPI} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="active">
                   {DATA_KPI.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip />
               </RePieChart>
             </ResponsiveContainer>
           </div>
           <div className="flex gap-4 mt-4">
              {DATA_KPI.map((d, i) => (
                <div key={d.name} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                   <span className="text-[10px] font-bold uppercase">{d.name}</span>
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
  return (
    <div className={`command-card p-8 relative overflow-hidden flex flex-col group`}>
       <div className={`absolute top-0 right-0 p-8 text-slate-100 transition-colors group-hover:text-slate-50`}>
          {icon}
       </div>
       <p className="data-label">{title}</p>
       <p className={`text-4xl font-display font-black ${isOrange ? 'text-[var(--gc-orange)]' : 'text-[var(--gc-purple)]'}`}>{value}</p>
       <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-[var(--ink-500)] max-w-[120px]">{desc}</p>
          <span className={`text-xs font-display font-black ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>{trend}</span>
       </div>
    </div>
  );
}
