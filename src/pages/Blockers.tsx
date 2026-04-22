/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Plus, 
  Filter, 
  ChevronRight, 
  MoreHorizontal,
  Flame,
  ShieldAlert,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { cn } from '../utils';
import { BLOCKERS_DATA } from '../services/dataService';
import { Blocker } from '../types';

export default function BlockersWorkspace() {
  const [blockers, setBlockers] = useState<Blocker[]>(BLOCKERS_DATA);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlockers = blockers.filter(b => 
    b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.impact.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = (id: string, status: Blocker['status']) => {
    setBlockers(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const handleUpdateSeverity = (id: string, severity: Blocker['severity']) => {
    setBlockers(prev => prev.map(b => b.id === id ? { ...b, severity } : b));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="section-title text-4xl">Risk Radar</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-1">
            <ShieldAlert size={14} className="text-red-500" />
            Tracking {blockers.filter(b => b.status === 'Open').length} active systemic bottlenecks.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-display font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-red-600/20">
          <Plus size={18} /> Signal Escalation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="command-card bg-white overflow-hidden">
            <div className="p-4 border-b border-[var(--border)] flex items-center gap-4 bg-slate-50/30">
               <div className="relative flex-1">
                 <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   className="w-full pl-10 pr-4 py-2 text-sm outline-none font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-100 transition-all" 
                   placeholder="Search blockers, impacts, or owners..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <button className="flex items-center gap-2 px-4 py-2 h-[42px] border border-slate-200 rounded-xl text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 transition-all">
                  <Filter size={14} /> Severity Filter
               </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="grid-header-cell">Risk Summary</th>
                    <th className="grid-header-cell">Severity</th>
                    <th className="grid-header-cell">Status</th>
                    <th className="grid-header-cell">Owner</th>
                    <th className="grid-header-cell text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {filteredBlockers.length > 0 ? filteredBlockers.map((b) => (
                    <tr key={b.id} className="group hover:bg-red-50/30 transition-all">
                      <td className="grid-row-cell">
                        <div className="flex gap-4">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
                            b.severity === 'Critical' ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"
                          )}>
                            <AlertTriangle size={20} />
                          </div>
                          <div>
                            <input 
                              className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none focus:ring-1 focus:ring-red-100 rounded px-1 -mx-1 w-full"
                              value={b.summary}
                              onChange={(e) => {
                                setBlockers(prev => prev.map(item => item.id === b.id ? { ...item, summary: e.target.value } : item));
                              }}
                            />
                            <p className="text-[10px] text-slate-500 mt-1 max-w-md line-clamp-1 italic">{b.impact}</p>
                          </div>
                        </div>
                      </td>
                      <td className="grid-row-cell">
                         <select 
                           value={b.severity}
                           onChange={(e) => handleUpdateSeverity(b.id, e.target.value as any)}
                           className={cn(
                             "text-[10px] font-display font-black uppercase tracking-widest outline-none appearance-none cursor-pointer",
                             b.severity === 'Critical' ? "text-red-600" : 
                             b.severity === 'High' ? "text-orange-600" : "text-amber-600"
                           )}
                         >
                           {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                      </td>
                      <td className="grid-row-cell">
                         <select 
                           value={b.status}
                           onChange={(e) => handleUpdateStatus(b.id, e.target.value as any)}
                           className={cn(
                             "text-[10px] font-display font-black uppercase tracking-widest px-3 py-1 rounded-full outline-none leading-none",
                             b.status === 'Resolved' ? "bg-emerald-50 text-emerald-600" :
                             b.status === 'Escalated' ? "bg-red-50 text-red-600" : "bg-amber-50 text-amber-600"
                           )}
                         >
                           {['Open', 'Resolved', 'Escalated'].map(s => <option key={s} value={s}>{s}</option>)}
                         </select>
                      </td>
                      <td className="grid-row-cell">
                         <div className="flex items-center gap-2">
                           <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold">
                             {b.ownerId?.substring(0, 2).toUpperCase()}
                           </div>
                           <span className="text-xs font-bold text-slate-600">{b.ownerId}</span>
                         </div>
                      </td>
                      <td className="grid-row-cell text-right">
                         <button className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                            <MoreHorizontal size={16} />
                         </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-slate-400 italic">No mission-critical blockers detected.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="command-card p-8 bg-red-600 text-white shadow-xl shadow-red-900/20">
              <p className="data-label text-red-100">Escalation Velocity</p>
              <p className="text-5xl font-display font-black">2.4h</p>
              <div className="mt-6 flex items-center gap-2 text-[10px] font-display font-black uppercase tracking-widest text-red-100">
                 <Clock size={14} /> Median Response Lead
              </div>
           </div>

           <div className="command-card p-6 space-y-6">
              <div className="pb-4 border-b border-slate-100">
                 <h3 className="section-title text-xs tracking-widest">Resolution Summary</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'Systemic Resolution', value: '82%', icon: <CheckCircle2 className="text-emerald-500" /> },
                   { label: 'Unmitigated Risks', value: '3 Active', icon: <Flame className="text-orange-500" /> }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between group cursor-default">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-slate-100 transition-all">
                            {stat.icon}
                         </div>
                         <p className="text-xs font-bold text-slate-600">{stat.label}</p>
                      </div>
                      <p className="text-xs font-mono font-black text-slate-900">{stat.value}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
