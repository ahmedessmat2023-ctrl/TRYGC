import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Plus, 
  Filter, 
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
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="section-kicker text-[var(--danger)]/80">Crisis Management</div>
          <h2 className="section-title text-4xl">Risk Radar</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-2 font-medium">
            <ShieldAlert size={16} className="text-[var(--danger)]" />
            Tracking {blockers.filter(b => b.status === 'Open').length} active systemic bottlenecks.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3.5 bg-[var(--danger)] text-white rounded-2xl text-[12px] font-display font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-[var(--shadow-lg)] shadow-[var(--danger)]/20">
          <Plus size={18} /> Signal Escalation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="command-card bg-[var(--bg)] overflow-hidden">
            <div className="p-5 border-b border-[var(--border)] flex items-center gap-4 bg-[var(--bg)]/50">
               <div className="relative flex-1">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-400)] transition-colors peer-focus:text-[var(--danger)]" />
                 <input 
                   className="peer w-full pl-12 pr-4 py-3 text-[14px] outline-none font-bold text-[var(--ink-900)] bg-[var(--bg)] border border-[var(--border-strong)] rounded-xl focus:ring-[4px] focus:ring-[rgba(180,35,24,0.1)] focus:border-[var(--danger)] transition-all shadow-sm placeholder:text-[var(--ink-300)] placeholder:font-medium" 
                   placeholder="Search blockers, impacts, or owners..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
               </div>
               <button className="flex items-center gap-2 px-5 py-3 h-[46px] border border-[var(--border-strong)] rounded-xl text-[12px] font-bold text-[var(--ink-700)] bg-[var(--bg)] hover:bg-[var(--ink-100)] hover:border-[var(--ink-300)] transition-all shadow-sm">
                  <Filter size={16} /> Severity Filter
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
                <tbody className="divide-y divide-[var(--border)] bg-white">
                  {filteredBlockers.length > 0 ? filteredBlockers.map((b) => (
                    <tr key={b.id} className="group hover:bg-[var(--danger-soft)]/20 transition-all border-l-4 border-transparent hover:border-l-[var(--danger)]">
                      <td className="grid-row-cell pl-5">
                        <div className="flex gap-4">
                          <div className={cn(
                            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border",
                            b.severity === 'Critical' ? "bg-red-50 text-[var(--danger)] border-red-200" : "bg-orange-50 text-[var(--warning)] border-orange-200"
                          )}>
                            <AlertTriangle size={22} strokeWidth={2.5} />
                          </div>
                          <div>
                            <input 
                              className="text-[14px] font-bold text-[var(--ink-900)] bg-transparent border-none outline-none focus:ring-2 focus:ring-[var(--danger-soft)] rounded px-1 -mx-1 w-full placeholder:text-[var(--ink-300)] transition-all"
                              value={b.summary}
                              onChange={(e) => {
                                setBlockers(prev => prev.map(item => item.id === b.id ? { ...item, summary: e.target.value } : item));
                              }}
                            />
                            <p className="text-[12px] text-[var(--ink-500)] mt-1 max-w-md line-clamp-1 italic">{b.impact}</p>
                          </div>
                        </div>
                      </td>
                      <td className="grid-row-cell">
                         <select 
                           value={b.severity}
                           onChange={(e) => handleUpdateSeverity(b.id, e.target.value as any)}
                           className={cn(
                             "text-[11px] font-display font-black uppercase tracking-widest outline-none appearance-none cursor-pointer bg-transparent",
                             b.severity === 'Critical' ? "text-[var(--danger)]" : 
                             b.severity === 'High' ? "text-orange-600" : "text-[var(--warning)]"
                           )}
                         >
                           {['Low', 'Medium', 'High', 'Critical'].map(s => <option key={s} value={s} className="text-[var(--ink-900)]">{s}</option>)}
                         </select>
                      </td>
                      <td className="grid-row-cell">
                         <select 
                           value={b.status}
                           onChange={(e) => handleUpdateStatus(b.id, e.target.value as any)}
                           className={cn(
                             "text-[10px] font-display font-black uppercase tracking-widest px-3 py-1.5 rounded-full outline-none leading-none shadow-sm cursor-pointer",
                             b.status === 'Resolved' ? "bg-[var(--success)]/10 text-[var(--success)]" :
                             b.status === 'Escalated' ? "bg-[var(--danger-soft)] text-[var(--danger)]" : "bg-[var(--warning)]/10 text-[var(--warning)]"
                           )}
                         >
                           {['Open', 'Resolved', 'Escalated'].map(s => <option key={s} value={s} className="text-[var(--ink-900)] font-sans tracking-normal font-medium">{s}</option>)}
                         </select>
                      </td>
                      <td className="grid-row-cell">
                         <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[10px] font-bold text-[var(--ink-700)]">
                             {b.ownerId?.substring(0, 2).toUpperCase()}
                           </div>
                           <span className="text-[13px] font-bold text-[var(--ink-900)]">{b.ownerId}</span>
                         </div>
                       </td>
                      <td className="grid-row-cell text-right pr-5">
                         <button className="p-2 text-[var(--ink-400)] hover:text-[var(--danger)] hover:bg-[var(--danger-soft)] rounded-lg transition-all opacity-0 group-hover:opacity-100">
                            <MoreHorizontal size={20} />
                         </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="p-16 text-center">
                        <div className="flex flex-col items-center justify-center text-[var(--ink-300)] gap-3">
                          <CheckCircle2 size={40} strokeWidth={1.5} className="text-[var(--success)]/50" />
                          <p className="italic font-medium">No mission-critical blockers detected.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
           <div className="command-card p-8 bg-[var(--danger)] text-white shadow-xl shadow-[var(--danger)]/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShieldAlert size={100} strokeWidth={1} />
              </div>
              <p className="data-label text-white/70 relative z-10">Escalation Velocity</p>
              <p className="text-6xl font-display font-black tracking-tight relative z-10 mt-2">2.4<span className="text-4xl text-white/50">h</span></p>
              <div className="mt-8 flex items-center gap-2 text-[11px] font-display font-black uppercase tracking-widest text-white/80 relative z-10">
                 <Clock size={16} strokeWidth={2.5} /> Median Response Lead
              </div>
           </div>

           <div className="command-card p-6 space-y-6 bg-[var(--bg)]">
              <div className="pb-4 border-b border-[var(--border)]">
                 <h3 className="section-title text-[13px] tracking-widest">Resolution Summary</h3>
              </div>
              <div className="space-y-4">
                 {[
                   { label: 'Systemic Resolution', value: '82%', icon: <CheckCircle2 className="text-[var(--success)]" size={18} /> },
                   { label: 'Unmitigated Risks', value: '3 Active', icon: <Flame className="text-[var(--warning)]" size={18} /> }
                 ].map((stat, i) => (
                   <div key={i} className="flex items-center justify-between group cursor-default">
                      <div className="flex items-center gap-3">
                         <div className="p-2.5 bg-white border border-[var(--border)] rounded-xl group-hover:bg-[var(--ink-100)] transition-all shadow-sm">
                            {stat.icon}
                         </div>
                         <p className="text-[13px] font-bold text-[var(--ink-900)]">{stat.label}</p>
                      </div>
                      <p className="text-[14px] font-mono font-black text-[var(--ink-900)]">{stat.value}</p>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
