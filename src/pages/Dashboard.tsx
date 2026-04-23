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
    <div className="max-w-[1240px] mx-auto space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Executive Summary Section */}
      <section className="relative overflow-hidden bg-white rounded-[var(--radius-xl)] px-10 py-14 md:p-14 text-[var(--ink-900)] shadow-[var(--shadow-lg)] border border-slate-200">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--gc-orange)] opacity-[0.05] blur-[120px] -mr-60 -mt-60" />
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-[var(--gc-purple)] opacity-[0.05] blur-[100px] -ml-20 rounded-full" />
        
        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-12 gap-16 items-center">
          <div className="xl:col-span-7 space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] text-slate-500">
                <Activity size={14} className="animate-pulse text-[var(--gc-orange)]" /> Global Reconciliation Sync
              </div>
              <div className="h-px w-16 bg-slate-200" />
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-slate-400">System Uptime: 99.98%</span>
            </div>

            <div>
              <h1 className="font-display font-black text-6xl md:text-7xl leading-[0.9] tracking-tighter mb-4 text-[var(--ink-900)]">
                Operational <br className="hidden md:block" /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--ink-900)] via-[var(--ink-700)] to-[var(--gc-orange)]">Heartbeat.</span>
              </h1>
              <p className="text-slate-500 max-w-lg text-[1.05rem] leading-[1.75] font-sans">
                Supervising <strong className="text-[var(--ink-900)] font-bold">24 active campaigns</strong> across 4 regions. System velocity is optimized with <strong className="text-[var(--gc-orange)] font-bold">+14.2%</strong> efficiency gains this quarter.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
               <button onClick={() => navigate('/setup')} className="px-8 py-4 bg-[var(--gc-purple)] text-white rounded-full font-display font-black uppercase text-sm tracking-widest hover:bg-[var(--gc-orange)] transition-all shadow-xl">
                  Deploy Campaign <ArrowUpRight size={18} />
               </button>
               <button className="px-8 py-4 bg-slate-100 text-slate-600 border border-slate-200 rounded-full font-display font-black uppercase text-sm tracking-widest hover:bg-slate-200 transition-colors">
                  System Audit
               </button>
            </div>
          </div>

          <div className="xl:col-span-5 grid grid-cols-2 gap-5 h-full">
             <div className="bg-slate-50 border border-slate-100 rounded-[var(--radius-lg)] p-8 flex flex-col justify-between group hover:border-[var(--gc-orange)]/30 transition-colors">
                <div>
                   <Globe strokeWidth={1.5} size={28} className="text-[var(--gc-orange)] mb-4" />
                   <p className="text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">Active Reach</p>
                </div>
                <p className="text-5xl font-display font-black text-slate-900 group-hover:scale-105 transition-transform origin-left tabular-nums mt-6">1.2<span className="text-3xl">M</span></p>
             </div>
             <div className="bg-slate-50 border border-slate-100 rounded-[var(--radius-lg)] p-8 flex flex-col justify-between group hover:border-[var(--gc-purple)]/30 transition-colors">
                <div>
                   <Zap strokeWidth={1.5} size={28} className="text-[var(--gc-purple)] mb-4" />
                   <p className="text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">System Load</p>
                </div>
                <p className="text-5xl font-display font-black text-slate-900 group-hover:scale-105 transition-transform origin-left tabular-nums mt-6">42<span className="text-3xl text-slate-400">%</span></p>
             </div>
             <div className="col-span-2 bg-gradient-to-r from-[var(--gc-orange)] to-[#FF8A40] rounded-[var(--radius-xl)] p-8 md:p-10 flex items-center justify-between shadow-[0_20px_40px_rgba(232,99,12,0.25)] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2)_20%,transparent_20%),radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.1)_15%,transparent_15%)] bg-[length:40px_40px] opacity-40 pointer-events-none" />
                <div className="space-y-1 text-white relative z-10">
                   <p className="text-[10.5px] font-mono font-bold uppercase tracking-widest text-white/80">Total Revenue Recovery</p>
                   <p className="text-5xl font-display font-black tracking-tight">$482<span className="text-3xl text-white/80">.4K</span></p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 relative z-10 shrink-0">
                   <TrendingUp strokeWidth={2} size={32} />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox label="Campaigns In Flight" value="24" trend="+4 This Week" icon={<Briefcase size={22} />} color="orange" />
        <KPIBox label="Critical Blockers" value="03" trend="Action Required" icon={<ShieldAlert size={22} />} color="red" />
        <KPIBox label="QA Extraction" value="112" trend="Pending Audit" icon={<CheckCircle2 size={22} />} color="purple" />
        <KPIBox label="Discovery Pace" value="98.2" trend="+12.4% Intensity" icon={<Sparkles size={22} />} color="lavender" />
      </div>

      {/* Primary Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left: Operations Console */}
        <div className="xl:col-span-8 space-y-8">
          <div className="command-card">
            <div className="px-8 py-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg)]">
              <div>
                <div className="section-kicker">Status Panel</div>
                <h3 className="section-title text-2xl mb-0">Active Mission Matrix</h3>
              </div>
              <button className="px-5 py-2.5 bg-white border border-[var(--border)] text-[11px] font-display font-bold uppercase tracking-[1px] text-[var(--ink-500)] rounded-full hover:bg-[var(--ink-900)] hover:text-white hover:border-[var(--ink-900)] transition-all">
                Full Registry
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                   <tr>
                     <th className="grid-header-cell">Campaign Payload</th>
                     <th className="grid-header-cell">Operational Stage</th>
                     <th className="grid-header-cell">Health Sync</th>
                   </tr>
                 </thead>
                 <tbody>
                    {CAMPAIGN_HEALTH.map((c) => (
                      <tr 
                        key={c.name} 
                        onClick={() => navigate('/campaign/123')}
                        className="grid-row-cell group cursor-pointer"
                      >
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-[var(--gc-orange-soft)] border border-[rgba(232,99,12,0.15)] flex items-center justify-center text-[var(--gc-orange)] group-hover:bg-[var(--gc-orange)] group-hover:text-white transition-all">
                                <Briefcase size={20} />
                             </div>
                             <div>
                                <p className="text-[15px] font-display font-bold text-[var(--ink-900)] group-hover:text-[var(--gc-orange)] transition-colors tracking-tight">{c.name}</p>
                                <p className="text-[11px] font-mono text-[var(--ink-500)] uppercase tracking-wider mt-1.5">{c.owner} • Mission Ops</p>
                             </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex flex-col gap-3 max-w-[220px]">
                              <div className="flex justify-between items-center text-[11px] font-display font-bold uppercase tracking-widest">
                                 <span className="text-[var(--ink-700)]">{c.stage}</span>
                                 <span className="text-[var(--ink-900)] tabular-nums">{c.progress}%</span>
                              </div>
                              <div className="h-2.5 bg-[var(--bg)] border border-[var(--border)] rounded-full overflow-hidden p-[2px]">
                                 <div 
                                   className={cn(
                                     "h-full rounded-full transition-all duration-1000",
                                     c.health === 'Blocked' ? "bg-[var(--danger)]" : "bg-[var(--gc-purple)]"
                                   )} 
                                   style={{ width: `${c.progress}%` }} 
                                 />
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className={cn(
                             "inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-mono font-bold uppercase tracking-wider",
                             c.health === 'Healthy' ? "bg-emerald-50 text-[var(--success)] border-emerald-200" : 
                             c.health === 'At Risk' ? "bg-amber-50 text-amber-600 border-amber-200" : 
                             "bg-[var(--danger-soft)] text-[var(--danger)] border-[rgba(180,35,24,0.2)] animate-pulse"
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

          <div className="command-card p-10 bg-[var(--ink-900)] text-white relative">
             <div className="absolute top-0 right-0 p-10 text-white/5 pointer-events-none">
                <Globe strokeWidth={1} size={180} />
             </div>
             <div className="relative z-10 space-y-10">
                <div className="flex items-center justify-between">
                   <div>
                     <div className="section-kicker">Stage Mapping</div>
                     <h3 className="section-title text-white text-2xl mb-0">Global Lifecycle Radar</h3>
                   </div>
                   <div className="flex items-center gap-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--gc-purple)]" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--ink-300)]">Completed</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--gc-orange)]" />
                        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-white">Current Lock</span>
                      </div>
                   </div>
                </div>

                <div className="flex items-end gap-[2px] px-2 relative pt-8">
                   {STAGES.map((s, i) => {
                     const isCurrent = i === 7;
                     const isPast = i < 7;
                     return (
                      <div key={s} className="flex-1 group cursor-pointer">
                         <div className="relative h-24 flex flex-col justify-end items-center gap-4">
                            <div className={cn(
                              "w-1.5 rounded-full transition-all duration-500 group-hover:w-3",
                              isCurrent ? "h-full bg-[var(--gc-orange)] shadow-[0_0_20px_rgba(232,99,12,0.6)]" : 
                              isPast ? "h-16 bg-[var(--gc-purple)] opacity-60" : "h-6 bg-[var(--ink-700)]"
                            )} />
                            <div className="absolute -top-10 text-[10px] font-display font-bold rotate-[-45deg] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase">
                               {s}
                            </div>
                         </div>
                      </div>
                     );
                   })}
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-[var(--radius-lg)]">
                   <ShieldAlert size={24} className="text-[var(--gc-orange)] flex-shrink-0 mt-0.5" />
                   <p className="text-[14px] text-[var(--ink-100)] leading-relaxed font-sans">
                      <strong className="text-white">Relay Obstruction Identified:</strong> 12 campaigns currently queued at <span className="text-[var(--gc-orange)] font-bold">Execution</span>. Lead Team intervention required for hyper-local logistics verification in Riyadh & Jeddah clusters.
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Operational Live Feed */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-white rounded-[var(--radius-xl)] p-10 text-[var(--ink-900)] shadow-[var(--shadow-lg)] border border-slate-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 text-slate-100 group-hover:rotate-[15deg] transition-transform duration-700">
                 <ShieldCheck size={140} strokeWidth={1} />
              </div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">Confidence Score</p>
              <h4 className="text-6xl font-display font-black mb-4 tracking-tighter text-slate-900">92.4<span className="text-3xl text-slate-400">%</span></h4>
              <p className="text-[14.5px] text-slate-500 leading-[1.65] font-sans relative z-10">
                 Security gates verified across all 18 operational stages. Zero leaks detected in current intake cycle.
              </p>
           </div>

           <div className="command-card relative group">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[var(--danger)] group-hover:w-full transition-all duration-300 opacity-10" />
              <div className="p-8 pb-6 border-b border-[var(--border)] relative z-10">
                <div className="section-kicker !text-[var(--danger)] before:!bg-[var(--danger)]">Escalations</div>
                <h3 className="section-title text-[22px] mb-0 inline-flex items-center gap-3">
                   Live Alert Log
                </h3>
              </div>
              <div className="px-6 py-4 space-y-2 relative z-10">
                 {[
                   { issue: 'Visit Proof Non-Sync', ref: 'STC-992', user: '@lifestyle_sa', time: '12m ago' },
                   { issue: 'Payment Gateway Block', ref: 'ALM-142', user: '@foodie_riyadh', time: '42m ago' },
                   { issue: 'Media Extraction Failure', ref: 'RB-102', user: '@tech_omar', time: '1h ago' }
                 ].map((issue, idx) => (
                   <div key={idx} className="flex gap-4 items-start cursor-pointer p-4 hover:bg-[var(--bg)] rounded-[var(--radius-lg)] transition-all border border-transparent hover:border-[var(--border)]">
                      <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--danger-soft)] text-[var(--danger)] flex items-center justify-center flex-shrink-0 transition-transform">
                         <AlertTriangle size={18} />
                      </div>
                      <div className="space-y-1 w-full">
                         <div className="flex justify-between items-center w-full">
                            <p className="text-[13px] font-bold text-[var(--ink-900)] leading-none">{issue.issue}</p>
                            <span className="text-[10px] font-mono font-bold text-[var(--ink-500)] uppercase">{issue.time}</span>
                         </div>
                         <p className="text-[11px] text-[var(--ink-500)] font-mono">UNIT-{issue.ref} • {issue.user}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <div className="p-6 pt-2 relative z-10">
                 <button className="w-full py-4 border-2 border-[var(--ink-900)] bg-white text-[var(--ink-900)] rounded-full text-[12px] font-display font-extrabold uppercase tracking-widest hover:bg-[var(--ink-900)] hover:text-white transition-all">
                    Deploy Tactical Sweep
                 </button>
              </div>
           </div>

           <div className="bg-[#106A42] rounded-[var(--radius-xl)] p-10 relative overflow-hidden text-white border-none shadow-[var(--shadow)] group">
              <Activity className="absolute -bottom-4 -right-4 size-32 text-white/5 opacity-0 group-hover:opacity-100 group-hover:-translate-y-4 transition-all duration-700" />
              <h4 className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8ADBAF] mb-4">Operations Velocity</h4>
              <p className="text-3xl font-display font-black leading-tight tracking-tight">Fast-track mode active for Riyadh cluster.</p>
              <div className="mt-8 h-1.5 bg-[#0A482C] rounded-full overflow-hidden">
                 <motion.div 
                   className="h-full bg-[#4FE08D]" 
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
  const isLavender = color === 'lavender';

  return (
    <div className="command-card p-6 flex flex-col relative group before:content-[''] before:absolute before:top-0 before:left-0 before:w-12 before:h-1 before:bg-[var(--border)] before:transition-all hover:before:w-full">
       <style dangerouslySetInnerHTML={{__html:`
         .command-card:hover:has(.kpi-orange)::before { background-color: var(--gc-orange); }
         .command-card:hover:has(.kpi-red)::before { background-color: var(--danger); }
         .command-card:hover:has(.kpi-purple)::before { background-color: var(--gc-purple); }
         .command-card:hover:has(.kpi-lavender)::before { background-color: var(--gc-lavender); }
       `}} />
       <div className={cn(
         "w-12 h-12 rounded-[var(--radius-sm)] flex items-center justify-center mb-6",
         isOrange && "bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] kpi-orange",
         isRed && "bg-[var(--danger-soft)] text-[var(--danger)] kpi-red",
         isPurple && "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] kpi-purple",
         isLavender && "bg-[var(--gc-lavender-soft)] text-[var(--gc-lavender)] kpi-lavender"
       )}>
          {icon}
       </div>
       <div>
         <p className="text-[14px] font-display font-bold text-[var(--ink-700)] mb-1 leading-none">{label}</p>
         <p className="text-[38px] font-display font-black tracking-tight text-[var(--ink-900)] leading-none">{value}</p>
       </div>
       <div className="mt-6 flex items-center justify-between border-t border-[var(--border)] pt-4">
          <span className={cn(
            "text-[10.5px] font-mono font-bold uppercase tracking-[1px] px-2.5 py-1 rounded-sm border",
            isRed ? "bg-[var(--danger-soft)] text-[var(--danger)] border-[rgba(180,35,24,0.15)]" :
            isOrange ? "bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] border-[rgba(232,99,12,0.15)]" :
            isPurple ? "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] border-[rgba(82,53,140,0.15)]" :
            "bg-[var(--gc-lavender-soft)] text-[var(--gc-lavender)] border-[rgba(167,152,191,0.15)]"
          )}>{trend}</span>
          <ArrowUpRight size={18} className="text-[var(--ink-300)] group-hover:text-[var(--gc-orange)] transition-colors" />
       </div>
    </div>
  );
}
