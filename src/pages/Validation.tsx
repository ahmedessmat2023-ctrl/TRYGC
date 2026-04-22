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
    <div className="max-w-[1240px] mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
           <div className="section-kicker text-[var(--gc-orange)]">Operational Integrity</div>
           <h1 className="section-title text-4xl">Validation Console</h1>
           <p className="text-[13px] font-bold text-[var(--ink-500)] uppercase tracking-widest mt-2">Harmonize proof metadata with mission requirements</p>
        </div>
        <div className="flex gap-6">
           <div className="flex flex-col items-end mr-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-[var(--ink-400)]">Queue Integrity</span>
              <span className="text-2xl font-display font-black text-[var(--ink-900)] tabular-nums tracking-tight">98.4%</span>
           </div>
           <button className="px-8 py-4 bg-[var(--ink-900)] text-white rounded-2xl font-black uppercase text-[12px] tracking-widest shadow-[var(--shadow-lg)] hover:bg-[var(--gc-orange)] transition-colors flex items-center gap-3">
              Batch Process <ArrowRight size={18} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
         <StatBox label="Pending Assets" value="24" color="orange" />
         <StatBox label="Avg. Review Time" value="12m" color="purple" />
         <StatBox label="Daily Clearance" value="142" color="success" />
         <StatBox label="SLA Compliance" value="100%" color="slate" />
      </div>

      <div className="command-card bg-[var(--bg)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border)] bg-[var(--bg)]/50 flex justify-between items-center">
          <div className="flex items-center gap-6">
             <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-400)]" />
                <input 
                  type="text" 
                  placeholder="Scan queue..." 
                  className="pl-12 pr-6 py-3 bg-white border border-[var(--border-strong)] rounded-xl text-[12px] font-bold uppercase tracking-widest w-[280px] focus:outline-none focus:ring-[4px] focus:ring-[var(--gc-orange-soft)] focus:border-[var(--gc-orange)] shadow-sm transition-all text-[var(--ink-900)] placeholder:text-[var(--ink-300)]"
                />
             </div>
             <div className="flex gap-2">
                {['All', 'High Priority', 'Drafts', 'Proofs'].map(v => (
                  <button key={v} className={cn(
                    "px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                    v === 'All' ? "bg-[var(--ink-900)] text-white shadow-sm" : "bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--ink-500)] hover:bg-[var(--ink-100)] hover:text-[var(--ink-900)] shadow-sm"
                  )}>
                    {v}
                  </button>
                ))}
             </div>
          </div>
          <button className="p-3 text-[var(--ink-400)] hover:text-[var(--ink-900)] hover:bg-[var(--ink-100)] rounded-xl transition-all border border-transparent hover:border-[var(--border)] shadow-sm">
             <Filter size={20} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[var(--bg)]">
                <th className="grid-header-cell pl-8">Mission & Creator</th>
                <th className="grid-header-cell">Asset Class</th>
                <th className="grid-header-cell">Ingestion</th>
                <th className="grid-header-cell">Security Status</th>
                <th className="grid-header-cell pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] bg-white">
              {VALIDATION_QUEUE.map((item) => (
                <tr key={item.id} className="group hover:bg-[var(--gc-orange-soft)]/20 transition-all cursor-pointer border-l-4 border-transparent hover:border-l-[var(--gc-orange)]">
                  <td className="grid-row-cell pl-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--ink-400)] group-hover:bg-[var(--gc-orange)] group-hover:text-white group-hover:border-[var(--gc-orange)] transition-all shadow-sm">
                        <FileCheck size={22} />
                      </div>
                      <div>
                        <p className="text-[14px] font-black text-[var(--ink-900)] group-hover:text-[var(--gc-orange)] transition-colors">{item.campaign}</p>
                        <p className="text-[11px] font-bold text-[var(--ink-500)] uppercase tracking-widest mt-0.5">{item.creator}</p>
                      </div>
                    </div>
                  </td>
                  <td className="grid-row-cell py-6">
                    <div className="flex items-center gap-2">
                       <span className="text-[11px] font-black text-[var(--ink-700)] uppercase tracking-widest px-3.5 py-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-full shadow-sm">{item.type}</span>
                       {item.priority === 'High' && <AlertCircle size={16} className="text-[var(--danger)]" />}
                    </div>
                  </td>
                  <td className="grid-row-cell py-6 text-[12px] font-bold text-[var(--ink-500)] uppercase tracking-widest tabular-nums italic">
                     {item.submitted}
                  </td>
                  <td className="grid-row-cell py-6">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border shadow-sm",
                      item.status === 'Approved' ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20" :
                      item.status === 'In Review' ? "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20" :
                      item.status === 'Rejected' ? "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20" :
                      "bg-[var(--bg)] text-[var(--ink-500)] border-[var(--border-strong)]"
                    )}>
                      {item.status === 'Approved' ? <CheckCircle2 size={14} strokeWidth={2.5} /> : 
                       item.status === 'In Review' ? <Clock size={14} strokeWidth={2.5} /> : 
                       <XCircle size={14} strokeWidth={2.5} />}
                      {item.status}
                    </div>
                  </td>
                  <td className="grid-row-cell py-6 pr-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button className="p-2.5 bg-white border border-[var(--border-strong)] rounded-xl text-[var(--ink-400)] hover:text-[var(--gc-purple)] hover:border-[var(--gc-purple-soft)] hover:bg-[var(--gc-purple-soft)]/20 transition-all shadow-sm">
                          <Eye size={18} />
                       </button>
                       <button className="p-2.5 bg-white border border-[var(--border-strong)] rounded-xl text-[var(--ink-400)] hover:text-[var(--gc-purple)] hover:border-[var(--gc-purple-soft)] hover:bg-[var(--gc-purple-soft)]/20 transition-all shadow-sm">
                          <MessageSquare size={18} />
                       </button>
                       <button className="p-2.5 bg-white border border-[var(--border-strong)] rounded-xl text-[var(--ink-400)] hover:text-[var(--ink-900)] hover:border-[var(--ink-300)] hover:bg-[var(--ink-100)] transition-all shadow-sm">
                          <MoreVertical size={18} />
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
  const isEmerald = color === 'success';

  return (
    <div className="command-card p-8 bg-white border border-[var(--border)] rounded-3xl relative overflow-hidden group hover:border-[var(--ink-300)] transition-all shadow-sm">
       <div className={cn(
         "absolute -bottom-6 -right-6 text-[var(--border)] size-28 transition-transform duration-700 group-hover:scale-125 opacity-30 group-hover:opacity-100",
         isOrange && "group-hover:text-[var(--gc-orange-soft)]",
         isPurple && "group-hover:text-[var(--gc-purple-soft)]",
         isEmerald && "group-hover:text-[var(--success)]/20"
       )}>
          <FileCheck size={110} strokeWidth={1} />
       </div>
       <p className="text-[11px] font-black uppercase tracking-widest text-[var(--ink-400)] mb-2 relative z-10">{label}</p>
       <p className={cn(
         "text-5xl font-display font-black tracking-tight relative z-10",
         isOrange && "text-[var(--gc-orange)]",
         isPurple && "text-[var(--gc-purple)]",
         isEmerald && "text-[var(--success)]",
         color === 'slate' && "text-[var(--ink-900)]"
       )}>{value}</p>
    </div>
  );
}
