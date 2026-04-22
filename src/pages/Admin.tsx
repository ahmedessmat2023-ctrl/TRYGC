/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Settings, 
  Users, 
  ShieldCheck, 
  Database, 
  Key, 
  Activity, 
  Globe, 
  Cloud, 
  Lock,
  ChevronRight,
  Zap,
  Server
} from 'lucide-react';
import { cn } from '../utils';

export default function Admin() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">
              <Lock size={12} /> Root Access Level
           </div>
           <h1 className="text-4xl font-display font-black tracking-tighter text-slate-900">Admin Control Center</h1>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Global system configuration & operational security</p>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Environment</span>
           <span className="text-xl font-display font-black text-emerald-500 uppercase tracking-tighter">Production Grid</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         <div className="lg:col-span-2 space-y-10">
            {/* System Pulse */}
            <div className="command-card p-10 bg-slate-900 text-white rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-10 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Activity size={240} strokeWidth={1} />
               </div>
               <div className="relative z-10 space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[var(--gc-orange)] shadow-xl">
                        <Zap size={24} />
                     </div>
                     <div>
                        <h3 className="text-xl font-display font-black tracking-tight uppercase">System Efficiency Matrix</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Cross-regional cluster optimization</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-10">
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">API Response</p>
                        <p className="text-3xl font-display font-black tabular-nums">42<span className="text-sm text-slate-500 font-bold ml-1">ms</span></p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Query Density</p>
                        <p className="text-3xl font-display font-black tabular-nums">1.2K<span className="text-sm text-slate-500 font-bold ml-1">r/s</span></p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Sync Delay</p>
                        <p className="text-3xl font-display font-black tabular-nums">0.02<span className="text-sm text-slate-500 font-bold ml-1">s</span></p>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 space-y-4">
                     <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-500">
                        <span>Database Allocation</span>
                        <span className="text-white">Active Mirroring: GCC-East-1</span>
                     </div>
                     <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[62%]" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Admin Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <AdminTile 
                  icon={<Users size={24} />} 
                  title="Team Governance" 
                  desc="Manage internal mission leads & client profile access tiers."
                  count="12 Admins"
               />
               <AdminTile 
                  icon={<ShieldCheck size={24} />} 
                  title="Security Protocals" 
                  desc="Audit 2FA logs, session integrity, and IP permit-lists."
                  count="98.2% Secure"
               />
               <AdminTile 
                  icon={<Database size={24} />} 
                  title="Data Persistence" 
                  desc="Firestore backup indices & real-time sync orchestration."
                  count="14 Backup Sets"
               />
               <AdminTile 
                  icon={<Key size={24} />} 
                  title="API Lifecycle" 
                  desc="Rotate keys, manage rate limits for Gemini & Search tools."
                  count="4 Active Keys"
               />
            </div>
         </div>

         {/* Sidebar: System Specs */}
         <div className="space-y-8">
            <div className="command-card p-10 bg-white border-2 border-slate-50 rounded-[3rem] shadow-sm space-y-8">
               <h3 className="section-title text-sm tracking-widest uppercase opacity-70">Machine Infrastructure</h3>
               <div className="space-y-6">
                  <SpecItem icon={<Cloud size={16} />} label="Cloud Provider" val="Google Cloud Platform" />
                  <SpecItem icon={<Globe size={16} />} label="Operational Region" val="Europe-West-2 (London)" />
                  <SpecItem icon={<Server size={16} />} label="Compute Tier" val="Enterprise / Standard x4" />
               </div>
               <button className="w-full py-4 bg-slate-50 text-slate-900 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                  View Infrastructure Map <ChevronRight size={14} />
               </button>
            </div>

            <div className="command-card p-10 bg-[var(--gc-purple)] rounded-[3rem] text-white shadow-xl shadow-purple-900/20 relative overflow-hidden group">
               <ShieldCheck className="absolute -bottom-6 -right-6 size-32 text-white/5 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-700" />
               <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-6">Integrity Report</p>
               <h4 className="text-3xl font-display font-black leading-tight mb-6">Zero critical vulnerabilities detected in last audit.</h4>
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-[var(--gc-purple)] backdrop-blur-md" />
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function AdminTile({ icon, title, desc, count }: any) {
  return (
    <div className="command-card p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] group hover:border-[var(--gc-orange-soft)] transition-all">
       <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all">
          {icon}
       </div>
       <div className="space-y-2">
          <h4 className="text-lg font-display font-black text-slate-900">{title}</h4>
          <p className="text-xs text-slate-400 font-medium leading-relaxed">{desc}</p>
       </div>
       <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-[var(--gc-orange)]">{count}</span>
          <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
       </div>
    </div>
  );
}

function SpecItem({ icon, label, val }: any) {
  return (
    <div className="flex items-center gap-4 group">
       <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
          {icon}
       </div>
       <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>
          <p className="text-[11px] font-bold text-slate-700">{val}</p>
       </div>
    </div>
  );
}
