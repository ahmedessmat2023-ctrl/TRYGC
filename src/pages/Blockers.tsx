/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OctagonAlert, TrendingUp, UserCheck, Timer } from 'lucide-react';

const BLOCKERS = [
  { 
    id: 'B-001', 
    campaign: 'Red Bull Summer KSA', 
    issue: 'Influencer @Zahra_99 has private account; cannot verify story.', 
    impact: 'Posting Coverage Unverifiable',
    status: 'Escalated',
    severity: 'High',
    owner: 'Ops Lead (AE)',
    deadline: '2h remaining'
  },
  { 
    id: 'B-002', 
    campaign: 'Almarai Juice Launch', 
    issue: 'Brand sample delivery delayed by courier.', 
    impact: 'Visit Scheduling Blocked',
    status: 'Open',
    severity: 'Critical',
    owner: 'Coordination (SM)',
    deadline: '1h overdue'
  },
];

export default function BlockersWorkspace() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Blockers & Escalations</h2>
          <p className="text-slate-500 text-sm italic">"Escalate early before risks become failures."</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--critical)] text-white rounded-lg hover:opacity-90 transition-all shadow-sm">
          <OctagonAlert size={16} />
          Report New Blocker
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Open Escalations', value: '8', icon: TrendingUp, color: 'red' },
          { label: 'Avg Resolution Time', value: '2.5h', icon: Timer, color: 'blue' },
          { label: 'Escalation Owners', value: '4', icon: UserCheck, color: 'emerald' },
        ].map((stat) => (
          <div key={stat.label} className="command-card p-6 flex justify-between items-center bg-white shadow-sm">
            <div>
              <p className="data-label">{stat.label}</p>
              <p className="text-2xl font-bold font-mono tracking-tight">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full bg-${stat.color}-50 text-${stat.color}-600`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {BLOCKERS.map((blocker) => (
          <div key={blocker.id} className="command-card bg-white border-l-[4px] border-l-red-500 p-6 flex justify-between items-center hover:bg-[#fafafa] transition-all">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-3">
                 <span className="text-[10px] font-mono font-bold bg-[#f3f4f6] px-2 py-0.5 rounded-[2px] border border-[var(--line)] uppercase tracking-widest">{blocker.id}</span>
                 <span className="text-sm font-bold text-[var(--ink)]">{blocker.campaign}</span>
                 <span className={`px-2 py-0.5 rounded-[2px] text-[10px] font-bold uppercase ${blocker.status === 'Escalated' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                   {blocker.status}
                 </span>
              </div>
              <p className="text-sm font-medium text-slate-800">{blocker.issue}</p>
              <p className="text-[11px] text-[#666] italic"><span className="font-bold uppercase text-[9px] mr-1 text-[#888]">Impact:</span> {blocker.impact}</p>
            </div>
            <div className="text-right space-y-2">
               <div className="flex flex-col items-end">
                 <p className="data-label">Action Owner</p>
                 <p className="text-xs font-bold">{blocker.owner}</p>
               </div>
               <div className="flex flex-col items-end">
                 <p className="data-label">SLA Deadline</p>
                 <p className={`text-xs font-mono font-black ${blocker.deadline.includes('overdue') ? 'text-red-600 animate-pulse' : 'text-slate-900'}`}>{blocker.deadline}</p>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
