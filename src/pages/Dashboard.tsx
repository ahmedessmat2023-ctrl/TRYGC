/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Briefcase,
  Layers,
  Search,
  ArrowUpRight,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Sparkles,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../utils';

const CAMPAIGN_HEALTH = [
  { name: 'Red Bull Summer KSA', stage: 'Coverage', progress: 72, health: 'Healthy', owner: 'Sarah A.' },
  { name: 'STC Pay Launch', stage: 'List Prep', progress: 100, health: 'Healthy', owner: 'Ahmed E.' },
  { name: 'Almarai Fresh', stage: 'Validation', progress: 15, health: 'Blocked', owner: 'Mona K.' },
  { name: 'Hungerstation EGY', stage: 'Execution', progress: 45, health: 'At Risk', owner: 'Omar S.' },
];

const STAGES = [
  'Intake', 'Validation', 'Ready', 'Setup', 'List Prep', 'Approval', 
  'Invites', 'Execution', 'Coverage', 'QA Review', 'Closure'
];

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Executive Summary Section */}
      <section className="relative overflow-hidden bg-slate-900 rounded-[3rem] p-12 text-white shadow-[0_40px_100px_rgba(0,0,0,0.25)] border border-slate-800">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[var(--gc-orange)] to-transparent opacity-10 blur-[120px] -mr-60 -mt-60" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[var(--gc-purple)] opacity-10 blur-[100px] -ml-20 rounded-full" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                <Activity size={12} className="animate-pulse" /> Global Reconciliation Sync
              </div>
              <div className="h-px w-20 bg-slate-800" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Uptime: 99.98%</span>
            </div>

            <h1 className="font-display font-black text-7xl leading-[0.9] tracking-tighter">
              Operational <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--gc-orange)] to-amber-300">Heartbeat.</span>
            </h1>
            
            <p className="text-slate-400 max-w-lg text-lg leading-relaxed font-medium italic">
              Supervising <span className="text-white">24 active campaigns</span> across 4 regions. System velocity is optimized with <span className="text-emerald-400">+14.2%</span> efficiency gains this quarter.
            </p>

            <div className="flex gap-4 pt-4">
               <button className="px-8 py-4 bg-white text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center gap-3">
                  Deploy Campaign <ArrowUpRight size={16} />
               </button>
               <button className="px-8 py-4 bg-slate-800 text-white border border-slate-700 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-slate-700 transition-colors">
                  System Audit
               </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-6 h-full">
             <div className="bg-slate-800/40 backdrop-blur-3xl border border-slate-700/50 rounded-[2rem] p-8 flex flex-col justify-between group hover:border-[var(--gc-orange-soft)] transition-colors">
                <div>
                   <Globe size={24} className="text-[var(--gc-orange)] mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Active Reach</p>
                </div>
                <p className="text-5xl font-display font-black text-white group-hover:scale-110 transition-transform origin-left tabular-nums">1.2M</p>
             </div>
             <div className="bg-slate-800/40 backdrop-blur-3xl border border-slate-700/50 rounded-[2rem] p-8 flex flex-col justify-between group hover:border-[var(--gc-purple-soft)] transition-colors">
                <div>
                   <Zap size={24} className="text-[var(--gc-purple)] mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">System Load</p>
                </div>
                <p className="text-5xl font-display font-black text-white group-hover:scale-110 transition-transform origin-left tabular-nums">42<span className="text-2xl text-slate-500">%</span></p>
             </div>
             <div className="col-span-2 bg-gradient-to-r from-[var(--gc-orange)] to-amber-500 rounded-[2.5rem] p-8 flex items-center justify-between shadow-[0_20px_40px_rgba(232,99,12,0.3)]">
                <div className="space-y-1 text-slate-900">
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Revenue Recovery</p>
                   <p className="text-4xl font-display font-black">$482.4K</p>
                </div>
                <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-slate-900 border border-white/20">
                   <TrendingUp size={32} />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <KPIBox label="Campaigns In Flight" value="24" trend="+4 This Week" icon={<Briefcase size={20} />} color="orange" />
        <KPIBox label="Critical Blockers" value="03" trend="Action Required" icon={<ShieldAlert size={20} />} color="red" />
        <KPIBox label="QA Extraction" value="112" trend="Pending Audit" icon={<CheckCircle2 size={20} />} color="purple" />
        <KPIBox label="Discovery Pace" value="98.2" trend="+12.4% Intensity" icon={<Sparkles size={20} />} color="lavender" />
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Operations Console */}
        <div className="lg:col-span-8 space-y-10">
          <div className="command-card shadow-[0_20px_50px_rgba(0,0,0,0.02)] border-2 border-slate-50 overflow-hidden rounded-[2.5rem]">
            <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-white">
              <div>
                <h3 className="section-title text-base tracking-widest">Active Mission Matrix</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time lifecycle synchronization</p>
              </div>
              <button className="px-5 py-2.5 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 rounded-xl hover:bg-slate-900 hover:text-white transition-all">
                Full Registry
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                   <tr className="bg-slate-50/50">
                     <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Campaign Payload</th>
                     <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Operational Stage</th>
                     <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Health Sync</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 pb-4">
                    {CAMPAIGN_HEALTH.map((c) => (
                      <tr 
                        key={c.name} 
                        onClick={() => navigate('/campaign/123')}
                        className="group hover:bg-slate-50/80 transition-all cursor-pointer"
                      >
                        <td className="px-10 py-7">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                <Briefcase size={18} />
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 group-hover:text-[var(--gc-orange)] transition-colors">{c.name}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">{c.owner} • Mission Ops</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-10 py-7">
                           <div className="flex flex-col gap-3 max-w-[200px]">
                              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                 <span className="text-slate-400">{c.stage}</span>
                                 <span className="text-slate-900 tabular-nums">{c.progress}%</span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden p-[2px]">
                                 <div 
                                   className={cn(
                                     "h-full rounded-full transition-all duration-1000",
                                     c.health === 'Blocked' ? "bg-red-500" : "bg-slate-900"
                                   )} 
                                   style={{ width: `${c.progress}%` }} 
                                 />
                              </div>
                           </div>
                        </td>
                        <td className="px-10 py-7">
                           <div className={cn(
                             "flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-[0.2em] w-fit",
                             c.health === 'Healthy' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                             c.health === 'At Risk' ? "bg-amber-50 text-amber-500 border-amber-100" : 
                             "bg-red-50 text-red-500 border-red-100 animate-pulse"
                           )}>
                              {c.health}
                           </div>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
            </div>
          </div>

          <div className="command-card p-10 bg-slate-900 text-white overflow-hidden relative rounded-[2.5rem]">
             <div className="absolute top-0 right-0 p-10 text-white/5 pointer-events-none">
                <Globe size={180} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-10">
                <div className="flex items-center justify-between">
                   <h3 className="section-title text-white opacity-80 text-sm tracking-widest">Global Lifecycle Radar</h3>
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--gc-purple)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Completed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--gc-orange)]" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Current Lock</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-end gap-1 px-4 relative">
                   {STAGES.map((s, i) => {
                     const isCurrent = i === 7;
                     const isPast = i < 7;
                     return (
                      <div key={s} className="flex-1 group cursor-pointer">
                         <div className="relative h-24 flex flex-col justify-end items-center gap-4">
                            <div className={cn(
                              "w-1.5 rounded-full transition-all duration-500 group-hover:w-3",
                              isCurrent ? "h-full bg-[var(--gc-orange)] shadow-[0_0_20px_rgba(232,99,12,0.6)]" : 
                              isPast ? "h-16 bg-[var(--gc-purple)] opacity-50" : "h-4 bg-slate-800"
                            )} />
                            <div className="absolute -top-6 text-[9px] font-black rotate-[-45deg] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                               {s}
                            </div>
                         </div>
                      </div>
                     );
                   })}
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-3xl">
                   <ShieldAlert size={20} className="text-[var(--gc-orange)] flex-shrink-0" />
                   <p className="text-sm text-slate-300 leading-relaxed font-medium">
                      <strong className="text-white">Relay Obstruction Identified:</strong> 12 campaigns currently queued at <span className="text-[var(--gc-orange)] font-black">Execution</span>. Lead Team intervention required for hyper-local logistics verification in Riyadh & Jeddah clusters.
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Operational Live Feed */}
        <div className="lg:col-span-4 space-y-10">
           <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-white/10 group-hover:rotate-12 transition-transform duration-700">
                 <ShieldCheck size={120} strokeWidth={1} />
              </div>
              <p className="text-[10px] uppercase font-black tracking-widest text-indigo-300 opacity-80 mb-2">Confidence Score</p>
              <h4 className="text-6xl font-display font-black mb-4">92.4<span className="text-2xl text-indigo-400">%</span></h4>
              <p className="text-sm text-indigo-200 leading-relaxed font-medium italic">
                 Security gates verified across all 18 operational stages. Zero leaks detected in current intake cycle.
              </p>
           </div>

           <div className="command-card bg-white p-8 space-y-8 rounded-[2.5rem] border-2 border-slate-50 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              <div className="pb-6 border-b border-slate-50 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
                   <AlertTriangle size={18} />
                </div>
                <h3 className="section-title text-sm tracking-widest uppercase">Live Escalation Log</h3>
              </div>
              <div className="space-y-6">
                 {[
                   { issue: 'Visit Proof Non-Sync', ref: 'STC-992', user: '@lifestyle_sa', time: '12m ago' },
                   { issue: 'Payment Gateway Block', ref: 'ALM-142', user: '@foodie_riyadh', time: '42m ago' },
                   { issue: 'Media Extraction Failure', ref: 'RB-102', user: '@tech_omar', time: '1h ago' }
                 ].map((issue, idx) => (
                   <div key={idx} className="flex gap-4 items-start group cursor-pointer p-4 hover:bg-slate-50 rounded-2xl transition-all">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:bg-red-500 group-hover:text-white transition-all shadow-sm">
                         <AlertTriangle size={18} />
                      </div>
                      <div className="space-y-1">
                         <div className="flex justify-between items-center">
                            <p className="text-[11px] font-black text-slate-900 leading-none">{issue.issue}</p>
                            <span className="text-[9px] font-bold text-slate-400 tabular-nums uppercase">{issue.time}</span>
                         </div>
                         <p className="text-[10px] text-slate-400 font-mono italic">UNIT-{issue.ref} • {issue.user}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--gc-orange)] shadow-xl transition-all transform hover:translate-y-[-2px]">
                 Deploy Tactical Sweep
              </button>
           </div>

           <div className="command-card p-10 bg-emerald-900 rounded-[2.5rem] relative overflow-hidden text-white border-none group">
              <Activity className="absolute -bottom-4 -right-4 size-32 text-white/5 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-300 opacity-80 mb-4">Operations Velocity</h4>
              <p className="text-3xl font-display font-black leading-tight">Fast-track mode active for Riyadh cluster.</p>
              <div className="mt-8 h-1 bg-emerald-800 rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-emerald-400" 
                   initial={{ width: 0 }}
                   animate={{ width: '82%' }}
                   transition={{ duration: 2 }}
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function KPIBox({ label, value, trend, icon, color }: any) {
  const isOrange = color === 'orange';
  const isRed = color === 'red';
  const isPurple = color === 'purple';

  return (
    <div className="command-card p-8 group relative flex flex-col justify-between overflow-hidden">
       <div className={cn(
         "absolute top-0 right-0 p-8 text-slate-50 transition-colors group-hover:scale-110 duration-500",
         isOrange && "group-hover:text-[var(--gc-orange-soft)]",
         isRed && "group-hover:text-red-50",
         isPurple && "group-hover:text-[var(--gc-purple-soft)]"
       )}>
          {icon}
       </div>
       <div>
         <p className="data-label">{label}</p>
         <p className="text-4xl font-display font-black tracking-tight">{value}</p>
       </div>
       <div className="mt-4 flex items-center justify-between">
          <span className={cn(
            "text-[10px] font-display font-black uppercase tracking-widest px-2 py-0.5 rounded-full",
            isRed && "bg-red-50 text-red-600",
            isOrange && "bg-[var(--gc-orange-soft)] text-[var(--gc-orange)]",
            isPurple && "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)]",
            color === 'lavender' && "bg-blue-50 text-blue-600"
          )}>{trend}</span>
          <ArrowUpRight size={14} className="text-slate-200 group-hover:text-[var(--gc-orange)] transition-colors" />
       </div>
    </div>
  );
}
