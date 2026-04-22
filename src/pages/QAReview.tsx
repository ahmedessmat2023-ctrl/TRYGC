/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  MoreVertical,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Zap,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { cn } from '../utils';

const MOCK_QA_QUEUE = [
  { id: 'QA-501', influencer: 'tech_omar', campaign: 'Red Bull Summer KSA', link: 'https://tiktok.com/@tech_omar/video/123', receivedAt: '10m ago', status: 'Pending', type: 'Story x2' },
  { id: 'QA-502', influencer: 'riyadh_fashion', campaign: 'STC Pay Launch', link: 'https://instagram.com/p/456', receivedAt: '45m ago', status: 'Approved', type: 'Video x1' },
];

export default function QAReviewWorkspace() {
  const [queue, setQueue] = useState(MOCK_QA_QUEUE);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQueue = queue.filter(item => 
    item.influencer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.campaign.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = (id: string, status: string) => {
    setQueue(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="section-title text-4xl">Quality Protocol</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-1">
            <ShieldCheck size={14} className="text-[var(--gc-purple)]" />
            Stage 16: Verifying posting compliance across active coverage streams.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 border border-[var(--border)] rounded-2xl text-[10px] font-display font-black uppercase tracking-widest text-slate-500 bg-white hover:bg-slate-50 transition-all">
            Batch Approval
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Zap size={18} /> Forced Compliance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredQueue.map((item) => (
          <div key={item.id} className="command-card flex flex-col group overflow-hidden bg-white">
            <div className={cn(
              "p-4 border-b border-slate-100 flex justify-between items-center transition-colors",
              item.status === 'Approved' ? "bg-emerald-50/50" : "bg-slate-50/25"
            )}>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-mono font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded uppercase">{item.id}</span>
                 <input 
                   className="text-xs font-bold bg-transparent outline-none border-none focus:ring-1 focus:ring-[var(--gc-purple-soft)] rounded px-1 -mx-1"
                   value={item.influencer}
                   onChange={(e) => {
                     setQueue(prev => prev.map(i => i.id === item.id ? { ...i, influencer: e.target.value } : i));
                   }}
                 />
               </div>
               <div className={cn(
                 "text-[10px] font-display font-black uppercase tracking-widest px-3 py-1 rounded-full",
                 item.status === 'Approved' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
               )}>
                 {item.status}
               </div>
            </div>
            
            <div className="p-6 space-y-6 flex-1">
               <div className="space-y-1">
                 <p className="data-label">Campaign Context</p>
                 <input 
                   className="text-sm font-semibold text-slate-900 bg-transparent border-none outline-none focus:ring-1 focus:ring-[var(--gc-purple-soft)] rounded px-1 -mx-1 w-full"
                   value={item.campaign}
                   onChange={(e) => {
                     setQueue(prev => prev.map(i => i.id === item.id ? { ...i, campaign: e.target.value } : i));
                   }}
                 />
               </div>

               <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex justify-between items-center hover:bg-slate-100 transition-colors group/link cursor-pointer">
                 <div className="flex items-center gap-3 text-[var(--gc-purple)] font-medium">
                   <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform" />
                   <span className="text-sm border-b border-purple-200">Review Posting Coverage</span>
                 </div>
                 <p className="text-[10px] font-mono text-slate-400 uppercase">Received {item.receivedAt}</p>
               </div>

               <div className="grid grid-cols-2 gap-2">
                  <QACheck label="Tags Checked" checked={true} />
                  <QACheck label="Mentions Checked" checked={true} />
                  <QACheck label="Links Checked" checked={false} />
                  <QACheck label="Timing Opt." checked={true} />
               </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
               <button 
                  onClick={() => handleUpdateStatus(item.id, 'Fix Required')}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl text-[10px] font-display font-black uppercase tracking-widest text-red-600 hover:bg-red-50 transition-all shadow-sm"
               >
                 <ThumbsDown size={16} />
                 Signal Fix
               </button>
               <button 
                  onClick={() => handleUpdateStatus(item.id, 'Approved')}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-[var(--gc-purple)] text-white rounded-xl text-[10px] font-display font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-lg shadow-purple-600/20"
               >
                 <ThumbsUp size={16} />
                 Pass Review
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="command-card p-6 border-l-4 border-l-[var(--gc-purple)] bg-white shadow-sm flex items-center justify-between">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] flex items-center justify-center">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h4 className="font-display font-black uppercase text-xs tracking-widest text-slate-900">Quality Assurance Active</h4>
            <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
              Verify all "Posting Coverage" against operational briefs. Identify missing mentions or broken links before finalizing verification.
            </p>
          </div>
        </div>
        <div className="flex gap-8">
           <div className="text-right">
              <p className="data-label">Pass Rate</p>
              <p className="text-xl font-display font-black text-emerald-600">98.2%</p>
           </div>
           <div className="text-right">
              <p className="data-label">Review Velocity</p>
              <p className="text-xl font-display font-black text-[var(--gc-purple)]">1.4m</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function QACheck({ label, checked }: { label: string, checked: boolean }) {
  return (
    <div className={cn(
      "flex items-center justify-between p-2 rounded-lg border text-[10px] font-display font-black uppercase tracking-widest transition-all",
      checked ? "bg-emerald-50 border-emerald-100 text-emerald-600" : "bg-slate-50 border-slate-100 text-slate-400"
    )}>
      {label}
      {checked ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
    </div>
  );
}
