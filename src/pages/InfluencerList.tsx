/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Filter, Download, UserPlus, MoreHorizontal, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { CampaignInfluencer } from '../types';

const MOCK_INFLUENCERS: Partial<CampaignInfluencer>[] = [
  { id: '1', username: 'sarah_lifestyle', platform: 'Instagram', status: 'Confirmed', followerRange: '100k-500k', gender: 'Female', niche: 'Lifestyle' },
  { id: '2', username: 'tech_omar', platform: 'TikTok', status: 'Invited', followerRange: '500k-1M', gender: 'Male', niche: 'Technology' },
  { id: '3', username: 'riyadh_foodie', platform: 'Instagram', status: 'Scheduled', followerRange: '50k-100k', gender: 'Female', niche: 'Food' },
  { id: '4', username: 'hassan_explores', platform: 'Snapchat', status: 'Pending', followerRange: '1M+', gender: 'Male', niche: 'Travel' },
];

export default function InfluencerList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Influencer Operations</h2>
          <p className="text-slate-500 text-sm">Managing lists across Stage 6 (Preparation) and Stage 7 (Approval).</p>
        </div>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors">
            <Download size={16} />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--accent)] text-white rounded-lg hover:opacity-90 transition-all shadow-sm">
            <UserPlus size={16} />
            Add Influencer
          </button>
        </div>
      </div>

      <div className="command-card bg-white p-0">
        <div className="p-4 border-b border-slate-100 flex gap-4 items-center bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input 
              type="text" 
              placeholder="Filter by username, platform, niche..." 
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-[var(--accent)] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white hover:bg-slate-50">
            <Filter size={14} />
            All Platforms
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-white hover:bg-slate-50">
            Status: All
          </button>
          <div className="flex-1" />
          <p className="text-[10px] font-mono text-slate-400 uppercase">Showing {MOCK_INFLUENCERS.length} records</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="grid-header-cell">Influencer</th>
                <th className="grid-header-cell">Platform</th>
                <th className="grid-header-cell">Niche/Size</th>
                <th className="grid-header-cell">Status</th>
                <th className="grid-header-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INFLUENCERS.map((inf) => (
                <tr key={inf.id} className="group">
                  <td className="grid-row-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[4px] bg-[#f0f0f0] flex items-center justify-center text-[var(--ink)] font-bold text-xs uppercase border border-[var(--line)]">
                        {inf.username?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">@{inf.username}</p>
                        <p className="text-[10px] text-slate-500 font-mono italic">USER_{inf.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="grid-row-cell">
                    <span className="text-xs font-medium text-[#666]">{inf.platform}</span>
                  </td>
                  <td className="grid-row-cell">
                    <div>
                      <p className="text-xs font-bold text-[#1a1a1a]">{inf.niche}</p>
                      <p className="text-[10px] text-[#888] font-mono">{inf.followerRange}</p>
                    </div>
                  </td>
                  <td className="grid-row-cell">
                    <span className={infoStatusStyle(inf.status || '')}>
                      {inf.status}
                    </span>
                  </td>
                  <td className="grid-row-cell text-right">
                    <button className="p-1 text-slate-400 hover:text-slate-600">
                      <MoreHorizontal size={18} />
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

function infoStatusStyle(status: string) {
  const base = "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight inline-flex items-center";
  switch(status) {
    case 'Confirmed': return `${base} bg-emerald-50 text-emerald-700`;
    case 'Invited': return `${base} bg-blue-50 text-blue-700`;
    case 'Scheduled': return `${base} bg-amber-50 text-amber-700`;
    default: return `${base} bg-slate-100 text-slate-600`;
  }
}
