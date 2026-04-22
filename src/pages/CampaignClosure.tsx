/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Archive, CheckCircle2, AlertTriangle, FileText, BarChart, HardDrive } from 'lucide-react';
import { ClosureOutcome } from '../constants';

export default function CampaignClosure() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Campaign Closure</h2>
          <p className="text-slate-500 text-sm">Final reconciliation and archive procedures for Stage 18.</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white font-medium outline-none">
            <option>{ClosureOutcome.COMPLETED}</option>
            <option>{ClosureOutcome.PARTIAL}</option>
            <option>{ClosureOutcome.CANCELLED}</option>
          </select>
          <button className="px-6 py-2 bg-[var(--ink)] text-white text-sm font-bold rounded-lg hover:bg-opacity-90 shadow-lg disabled:opacity-50">
            Terminate & Archive
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
        <div className="bg-red-50 p-4 border-b border-red-100 flex items-center gap-3">
          <AlertTriangle className="text-red-600" size={20} />
          <h3 className="text-sm font-bold text-red-900 uppercase tracking-tight">System Locked: Closure Conditions Incomplete</h3>
        </div>
        <div className="p-6 space-y-4">
           {[
             { label: 'Posting Coverage Reconciled', status: 'Incomplete', detail: '3 records still pending recovery status.' },
             { label: 'QA Review Completed', status: 'Complete', detail: 'All 68 received posts have been verified.' },
             { label: 'Client Reporting Uploaded', status: 'Incomplete', detail: 'Final report has not been detected in MOM folder.' },
             { label: 'Lessons Learned Documented', status: 'Incomplete', detail: 'Root Cause / Action Plan log is missing 2 entries.' }
           ].map((cond, i) => (
             <div key={i} className="flex gap-4 items-start border-b border-slate-50 pb-4 last:border-0 last:pb-0">
                <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${cond.status === 'Complete' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                  {cond.status === 'Complete' ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />}
                </div>
                <div>
                   <p className={`text-sm font-bold ${cond.status === 'Complete' ? 'text-slate-900' : 'text-red-900'}`}>{cond.label}</p>
                   <p className="text-xs text-slate-500 mt-0.5">{cond.detail}</p>
                </div>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="command-card p-6 flex flex-col items-center gap-3 hover:bg-slate-50 transition-colors">
          <FileText className="text-slate-400" size={32} />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Draft Report</p>
        </button>
        <button className="command-card p-6 flex flex-col items-center gap-3 hover:bg-slate-50 transition-colors">
          <BarChart className="text-slate-400" size={32} />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Export Final KPIs</p>
        </button>
        <button className="command-card p-6 flex flex-col items-center gap-3 hover:bg-slate-50 transition-colors">
          <HardDrive className="text-slate-400" size={32} />
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Sync Asset Mirror</p>
        </button>
      </div>

      <div className="command-card p-8 bg-slate-50">
        <h4 className="font-bold text-sm mb-4">Post-Campaign Analysis (Lessons Learned)</h4>
        <textarea 
          className="w-full min-h-[120px] p-4 border border-slate-200 rounded-xl text-sm italic"
          placeholder="Document operational blockers, influencer behavior, and recommendations for future campaigns with this client..."
        />
      </div>
    </div>
  );
}
