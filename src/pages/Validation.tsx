/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  Search, 
  Filter, 
  MoreVertical, 
  MessageSquare,
  AlertCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  ArrowRight
} from 'lucide-react';
import { cn } from '../utils';

const VALIDATION_QUEUE = [
  { id: 1, campaign: 'Red Bull Summer', creator: '@tech_omar', type: 'Visit Proof', submitted: '12m ago', priority: 'High', status: 'Pending' },
  { id: 2, campaign: 'STC Pay Launch', creator: '@fashion.mona', type: 'Draft Video', submitted: '2h ago', priority: 'Standard', status: 'In Review' },
  { id: 3, campaign: 'Almarai Fresh', creator: '@riyadh_explorer', type: 'Final Post', submitted: '5h ago', priority: 'Standard', status: 'Approved' },
  { id: 4, campaign: 'Hungerstation EGY', creator: '@lifestyle_sa', type: 'Agreement', submitted: '1d ago', priority: 'High', status: 'Rejected' },
];

export default function Validation() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] flex items-center justify-center">
                 <ShieldCheck size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--gc-orange)]">Operational Integrity</span>
           </div>
           <h1 className="text-4xl font-display font-black tracking-tighter text-slate-900">Validation Console</h1>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Harmonize proof metadata with mission requirements</p>
        </div>
        <div className="flex gap-4">
           <div className="flex flex-col items-end mr-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Queue Integrity</span>
              <span className="text-xl font-display font-black text-slate-900 tabular-nums">98.4%</span>
           </div>
           <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[var(--gc-orange)] transition-colors flex items-center gap-3">
              Batch Process <ArrowRight size={16} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
         <StatBox label="Pending Assets" value="24" color="orange" />
         <StatBox label="Avg. Review Time" value="12m" color="purple" />
         <StatBox label="Daily Clearance" value="142" color="emerald" />
         <StatBox label="SLA Compliance" value="100%" color="slate" />
      </div>

      <div className="command-card bg-white border-2 border-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 bg-slate-50/20 flex justify-between items-center">
          <div className="flex items-center gap-6">
             <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Scan queue..." 
                  className="pl-12 pr-6 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest w-64 focus:outline-none focus:ring-4 focus:ring-slate-50"
                />
             </div>
             <div className="flex gap-2">
                {['All', 'High Priority', 'Drafts', 'Proofs'].map(v => (
                  <button key={v} className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                    v === 'All' ? "bg-slate-900 text-white" : "bg-white border border-slate-100 text-slate-500 hover:bg-slate-50"
                  )}>
                    {v}
                  </button>
                ))}
             </div>
          </div>
          <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
             <Filter size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Mission & Creator</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Asset Class</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Ingestion</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Security Status</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {VALIDATION_QUEUE.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                        <FileCheck size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 group-hover:text-[var(--gc-orange)] transition-colors">{item.campaign}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.creator}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                       <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-3 py-1 bg-slate-100 rounded-lg">{item.type}</span>
                       {item.priority === 'High' && <AlertCircle size={14} className="text-red-500" />}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-400 uppercase tracking-widest tabular-nums italic">
                     {item.submitted}
                  </td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                      item.status === 'Approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      item.status === 'In Review' ? "bg-amber-50 text-amber-500 border-amber-100" :
                      item.status === 'Rejected' ? "bg-red-50 text-red-500 border-red-100" :
                      "bg-slate-50 text-slate-400 border-slate-100 animate-pulse"
                    )}>
                      {item.status === 'Approved' ? <CheckCircle2 size={12} /> : 
                       item.status === 'In Review' ? <Clock size={12} /> : 
                       <XCircle size={12} />}
                      {item.status}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 hover:border-slate-200 transition-all shadow-sm">
                          <Eye size={16} />
                       </button>
                       <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 hover:border-slate-200 transition-all shadow-sm">
                          <MessageSquare size={16} />
                       </button>
                       <button className="p-2 bg-white border border-slate-100 rounded-lg text-slate-400 hover:text-slate-900 hover:border-slate-200 transition-all shadow-sm">
                          <MoreVertical size={16} />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatBox({ label, value, color }: any) {
  const isOrange = color === 'orange';
  const isPurple = color === 'purple';
  const isEmerald = color === 'emerald';

  return (
    <div className="command-card p-10 bg-white border-2 border-slate-50 rounded-[2.5rem] relative overflow-hidden group hover:border-slate-200 transition-all">
       <div className={cn(
         "absolute -bottom-6 -right-6 text-slate-50 size-24 transition-transform duration-700 group-hover:scale-125 opacity-20 group-hover:opacity-100",
         isOrange && "text-orange-100",
         isPurple && "text-purple-100",
         isEmerald && "text-emerald-100"
       )}>
          <FileCheck size={100} strokeWidth={1} />
       </div>
       <p className="data-label text-slate-400 mb-2">{label}</p>
       <p className={cn(
         "text-4xl font-display font-black",
         isOrange && "text-[var(--gc-orange)]",
         isPurple && "text-[var(--gc-purple)]",
         isEmerald && "text-emerald-600",
         color === 'slate' && "text-slate-900"
       )}>{value}</p>
    </div>
  );
}
