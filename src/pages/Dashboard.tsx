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
  ShieldAlert
} from 'lucide-react';
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
  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Tactical Hero SECTION */}
      <section className="relative overflow-hidden bg-[var(--ink-900)] rounded-[2.5rem] p-10 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-[var(--gc-orange)] to-transparent opacity-10 blur-[100px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gradient-to-tr from-[var(--gc-purple)] to-transparent opacity-10 blur-[100px] -ml-20 -mb-20" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-display font-black uppercase tracking-[0.2em] text-[var(--gc-orange)]">
              <Activity size={12} className="animate-pulse" /> Final Reconciliation Cycle Active
            </div>
            <h1 className="font-display font-black text-6xl leading-[1] tracking-tight">
              Operational <br /> 
              <span className="text-[var(--gc-orange)]">Heartbeat.</span>
            </h1>
            <p className="text-[var(--ink-300)] max-w-md text-sm leading-relaxed font-medium">
              E2E visibility across 24 active campaigns. Current system velocity is +12% relative to last integrity sweep.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <p className="text-[10px] font-display font-bold uppercase tracking-widest text-[var(--ink-300)] mb-1">Active Reach</p>
                <p className="text-4xl font-display font-black text-[var(--gc-orange)]">1.2M</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <p className="text-[10px] font-display font-bold uppercase tracking-widest text-[var(--ink-300)] mb-1">System Load</p>
                <p className="text-4xl font-display font-black text-white">42%</p>
             </div>
          </div>
        </div>
      </section>

      {/* KPI Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPIBox label="Campaigns In Flight" value="24" trend="+4" icon={<Briefcase size={16} />} color="orange" />
        <KPIBox label="Risk Blockers" value="3" trend="Critical" icon={<AlertTriangle size={16} />} color="red" />
        <KPIBox label="QA Velocity" value="112" trend="Pending" icon={<CheckCircle2 size={16} />} color="purple" />
        <KPIBox label="Daily PACE" value="8.4" trend="+1.2" icon={<TrendingUp size={16} />} color="lavender" />
      </div>

      {/* Main Tactical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Health Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="command-card">
            <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-slate-50/50">
              <h3 className="section-title text-sm tracking-widest">Active Health Monitor</h3>
              <button className="text-[10px] font-display font-black uppercase text-[var(--gc-orange)] hover:underline">View Fleet</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                   <tr>
                     <th className="grid-header-cell">Campaign Reference</th>
                     <th className="grid-header-cell">Lifecycle Stage</th>
                     <th className="grid-header-cell">Operational Progress</th>
                     <th className="grid-header-cell text-right">Health</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-[var(--border)]">
                    {CAMPAIGN_HEALTH.map((c) => (
                      <tr key={c.name} className="group hover:bg-[var(--gc-purple-soft)]/20 transition-all cursor-pointer">
                        <td className="grid-row-cell">
                          <p className="text-sm font-bold text-[var(--ink-900)] leading-tight">{c.name}</p>
                          <p className="text-[9px] font-display font-bold text-slate-400 uppercase mt-1">{c.owner}</p>
                        </td>
                        <td className="grid-row-cell">
                           <span className={cn(
                             "stage-tag tracking-widest",
                             c.health === 'Blocked' ? "bg-red-50 text-red-700" : "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)]"
                           )}>{c.stage}</span>
                        </td>
                        <td className="grid-row-cell min-w-[140px]">
                            <div className="flex items-center gap-3">
                               <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-[var(--gc-orange)]" style={{ width: `${c.progress}%` }} />
                               </div>
                               <span className="text-[10px] font-mono font-bold text-slate-500">{c.progress}%</span>
                            </div>
                        </td>
                        <td className="grid-row-cell text-right font-display font-black uppercase text-[10px] tracking-widest">
                           <span className={cn(
                             c.health === 'Healthy' ? "text-emerald-600" : c.health === 'At Risk' ? "text-amber-500" : "text-red-500"
                           )}>{c.health}</span>
                        </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
            </div>
          </div>

          <div className="command-card p-8 bg-white overflow-hidden relative">
             <div className="absolute top-0 right-0 p-8 text-slate-50">
                <Globe size={120} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-6">
                <h3 className="section-title text-sm tracking-widest">Global Lifecycle Bottle-Neck</h3>
                <div className="flex items-center gap-[2px]">
                   {STAGES.map((s, i) => (
                     <div key={s} className="flex-1 space-y-2">
                        <div className={cn(
                          "h-1.5 rounded-full transition-all",
                          i < 7 ? "bg-[var(--gc-purple)]" : i === 7 ? "bg-[var(--gc-orange)] animate-pulse shadow-[0_0_10px_rgba(232,99,12,0.5)]" : "bg-slate-100"
                        )} />
                        <p className={cn(
                          "text-[8px] font-display font-bold uppercase tracking-tighter text-center",
                          i === 7 ? "text-[var(--gc-orange)] font-black" : "text-slate-400"
                        )}>{s}</p>
                     </div>
                   ))}
                </div>
                <p className="text-xs text-[var(--ink-500)] italic border-l-2 border-[var(--gc-orange)] pl-4 py-1">
                   <strong>Critical Path:</strong> 12 campaigns currently queued at <span className="text-[var(--gc-orange)] font-bold">Execution</span>. Lead Team intervention required for Riyadh branch logistics.
                </p>
             </div>
          </div>
        </div>

        {/* Right: Tactical Radar */}
        <div className="space-y-6">
           <div className="command-card p-8 bg-[var(--gc-purple)] text-white shadow-xl shadow-purple-900/20">
              <p className="data-label text-purple-200">Total Operational Reconcile</p>
              <p className="text-5xl font-display font-black">92%</p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-display font-black uppercase tracking-widest text-purple-200">
                 <ShieldAlert size={14} /> Reconfirming Stage 18 Gates
              </div>
           </div>

           <div className="command-card bg-white p-6 space-y-6 border-b-4 border-b-[var(--gc-orange)]">
              <div className="pb-4 border-b border-slate-50">
                <h3 className="section-title text-xs tracking-widest">Live Escalation Radar</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { issue: 'Visit Proof Mismatch', ref: 'STC-992', user: '@lifestyle_sa' },
                   { issue: 'Failed recovery', ref: 'RB-102', user: '@tech_omar' }
                 ].map((issue, idx) => (
                   <div key={idx} className="flex gap-4 items-start py-1 group cursor-pointer">
                      <div className="w-8 h-8 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                         <AlertTriangle size={16} />
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-xs font-bold text-[var(--ink-900)] leading-none">{issue.issue}</p>
                         <p className="text-[10px] text-slate-400 font-mono italic">REF: {issue.ref} · {issue.user}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <button className="w-full py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-display font-black uppercase tracking-widest text-slate-400 hover:bg-[var(--gc-orange-soft)] hover:text-[var(--gc-orange)] transition-all">
                 System Sweep Log
              </button>
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
