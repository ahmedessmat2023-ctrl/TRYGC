/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, CheckCircle2, XCircle, Clock, Search, Filter, MoreVertical, Send } from 'lucide-react';
import { cn } from '../utils';

const INVITES = [
  { id: 1, creator: '@tech_omar', campaign: 'Red Bull Summer', sentAt: '2h ago', status: 'Pending', response: '-' },
  { id: 2, creator: '@fashion.mona', campaign: 'STC Pay Launch', sentAt: '1d ago', status: 'Accepted', response: 'Confirmed' },
  { id: 3, creator: '@riyadh_explorer', campaign: 'Almarai Fresh', sentAt: '3d ago', status: 'Declined', response: 'Conflict' },
  { id: 4, creator: '@lifestyle_sa', campaign: 'Hungerstation', sentAt: '4h ago', status: 'Pending', response: '-' },
];

export default function Invitations() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tighter text-slate-900">Invitations Hub</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Manage creator outreach & response logs</p>
        </div>
        <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[var(--gc-orange)] transition-colors flex items-center gap-3">
           Dispatch New Batch <Send size={16} />
        </button>
      </div>

      <div className="command-card bg-white border-2 border-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
          <div className="flex items-center gap-6">
             <div className="relative group">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--gc-orange)] transition-colors" />
                <input 
                  type="text" 
                  placeholder="Filter by creator or campaign..." 
                  className="pl-12 pr-6 py-2.5 bg-white border border-slate-100 rounded-xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-slate-50 transition-all w-64"
                />
             </div>
             <button className="flex items-center gap-2 px-4 py-2 border border-slate-100 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50">
                <Filter size={14} /> Filters
             </button>
          </div>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 py-1 bg-slate-100 rounded-lg">Active Transmissions: 12</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Creator Instance</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Mission Link</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Dispatch Time</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Synch Status</th>
                <th className="px-8 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {INVITES.map((invite) => (
                <tr key={invite.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs">
                        {invite.creator[1].toUpperCase()}
                      </div>
                      <span className="text-sm font-black text-slate-900">{invite.creator}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded-lg">{invite.campaign}</span>
                  </td>
                  <td className="px-8 py-6 text-xs font-bold text-slate-400 tabular-nums uppercase">{invite.sentAt}</td>
                  <td className="px-8 py-6">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                      invite.status === 'Accepted' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                      invite.status === 'Pending' ? "bg-amber-50 text-amber-500 border-amber-100 animate-pulse" :
                      "bg-red-50 text-red-500 border-red-100"
                    )}>
                      {invite.status === 'Accepted' ? <CheckCircle2 size={12} /> : 
                       invite.status === 'Pending' ? <Clock size={12} /> : 
                       <XCircle size={12} />}
                      {invite.status}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                      <MoreVertical size={18} />
                    </button>
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
