/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, XCircle, AlertCircle, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';

const PENDING_QA = [
  { 
    id: 'QA-501', 
    influencer: 'tech_omar', 
    campaign: 'Red Bull Summer KSA', 
    link: 'https://tiktok.com/@tech_omar/video/123',
    receivedAt: '10m ago',
    SLA: '1h 50m remaining'
  },
  { 
    id: 'QA-502', 
    influencer: 'riyadh_fashion', 
    campaign: 'STC Pay Launch', 
    link: 'https://instagram.com/p/456',
    receivedAt: '45m ago',
    SLA: '1h 15m remaining'
  }
];

export default function QAReviewWorkspace() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">QA Review Center</h2>
          <p className="text-slate-500 text-sm italic">"Every post must be brief-compliant and verified."</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="stage-tag bg-amber-50 text-amber-700">12 Pending Review</span>
          <span className="stage-tag bg-emerald-50 text-emerald-700">98% Pass Rate</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PENDING_QA.map((item) => (
          <div key={item.id} className="command-card flex flex-col">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/25">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase">{item.id}</span>
                 <p className="text-xs font-bold">@{item.influencer}</p>
               </div>
               <p className="text-[10px] font-mono text-red-500 font-bold animate-pulse uppercase">SLA: {item.SLA}</p>
            </div>
            
            <div className="p-6 space-y-6 flex-1">
               <div className="space-y-1">
                 <p className="data-label">Campaign Reference</p>
                 <p className="text-sm font-semibold">{item.campaign}</p>
               </div>

               <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg flex justify-between items-center">
                 <div className="flex items-center gap-3 text-[var(--accent)] font-medium">
                   <ExternalLink size={16} />
                   <a href={item.link} className="text-sm border-b border-blue-200">Review Posting Coverage</a>
                 </div>
                 <p className="text-[10px] font-mono text-slate-400 uppercase">Received {item.receivedAt}</p>
               </div>

               <div className="grid grid-cols-3 gap-2">
                  <QACheck label="Tags Checked" />
                  <QACheck label="Mentions Checked" />
                  <QACheck label="Links Checked" />
                  <QACheck label="Timing Opt." />
                  <QACheck label="Brand Safe" />
                  <QACheck label="Brief Compliant" />
               </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
               <button className="flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
                 <ThumbsDown size={16} />
                 Reject / Fix
               </button>
               <button className="flex items-center justify-center gap-2 py-2 px-4 bg-[var(--success)] text-white rounded-lg text-sm font-bold hover:bg-opacity-90 transition-all shadow-md overflow-hidden relative">
                 <ThumbsUp size={16} />
                 Pass Review
                 <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="command-card p-6 border-l-4 border-l-[var(--accent)] bg-blue-50/30">
        <div className="flex gap-4">
          <ShieldCheck className="text-[var(--accent)]" size={32} />
          <div>
            <h4 className="font-bold text-sm">Quality Assurance Protocol</h4>
            <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
              Ensure all "Posting Coverage" matches the brief Exactly. Identify missing mentions or broken links before passing. 
              Once passed, the record will automatically reconcile the target achievement KPIs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function QACheck({ label }: { label: string }) {
  const [checked, setChecked] = React.useState(false);
  return (
    <button 
      onClick={() => setChecked(!checked)}
      className={`flex items-center gap-2 px-2 py-1.5 rounded border text-[10px] font-bold uppercase transition-all ${checked ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-400'}`}
    >
      {checked ? <ShieldCheck size={12} /> : <div className="w-3 h-3 rounded-sm border border-slate-300" />}
      {label}
    </button>
  );
}
