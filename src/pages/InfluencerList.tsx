/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  UserPlus, 
  Filter, 
  LayoutGrid, 
  List, 
  MoreVertical,
  CheckCircle2,
  Clock,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { cn } from '../utils';
import { INFLUENCERS_DATA } from '../services/dataService';
import { CampaignInfluencer } from '../types';

export default function InfluencerList() {
  const [influencers, setInfluencers] = useState<CampaignInfluencer[]>(INFLUENCERS_DATA);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInfluencers = influencers.filter(inf => 
    inf.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inf.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = (id: string, status: CampaignInfluencer['status']) => {
    setInfluencers(prev => prev.map(inf => inf.id === id ? { ...inf, status } : inf));
  };

  const handleUpdateCity = (id: string, city: string) => {
    setInfluencers(prev => prev.map(inf => inf.id === id ? { ...inf, city } : inf));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="section-title text-4xl">Influencer Corps</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-1">
            <Users size={14} className="text-[var(--gc-purple)]" />
            Managing active influencer roster across {influencers.length} operations.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex bg-white border border-[var(--border)] rounded-xl p-1 shadow-sm">
             <button 
               onClick={() => setViewMode('list')}
               className={cn("p-2 rounded-lg transition-all", viewMode === 'list' ? "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)]" : "text-slate-400")}
             >
               <List size={18} />
             </button>
             <button 
               onClick={() => setViewMode('grid')}
               className={cn("p-2 rounded-lg transition-all", viewMode === 'grid' ? "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)]" : "text-slate-400")}
             >
               <LayoutGrid size={18} />
             </button>
          </div>
          <button className="btn-primary flex items-center gap-2">
            <UserPlus size={18} /> Recruit Influencer
          </button>
        </div>
      </div>

      <div className="command-card bg-white overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-4 bg-slate-50/30">
           <div className="relative flex-1">
             <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
             <input 
               className="w-full pl-10 pr-4 py-2 text-sm outline-none font-medium bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-[var(--gc-purple-soft)] transition-all" 
               placeholder="Search by username, niche, or city..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
           <button className="flex items-center gap-2 px-4 py-2 h-[42px] border border-slate-200 rounded-xl text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 transition-all">
              <Filter size={14} /> Global Filters
           </button>
        </div>

        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="grid-header-cell">Influencer Identity</th>
                  <th className="grid-header-cell">Platform</th>
                  <th className="grid-header-cell">Operational Status</th>
                  <th className="grid-header-cell">City / Market</th>
                  <th className="grid-header-cell text-right">Engagement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredInfluencers.length > 0 ? filteredInfluencers.map((inf) => (
                  <tr key={inf.id} className="group hover:bg-[var(--gc-purple-soft)]/20 transition-all">
                    <td className="grid-row-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[var(--gc-purple)] border-2 border-white shadow-sm">
                          {inf.username.substring(1, 2).toUpperCase()}
                        </div>
                        <div>
                          <input 
                            className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none focus:ring-1 focus:ring-[var(--gc-purple-soft)] rounded px-1 -mx-1"
                            value={inf.username}
                            onChange={(e) => {
                              setInfluencers(prev => prev.map(i => i.id === inf.id ? { ...i, username: e.target.value } : i));
                            }}
                          />
                          <p className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-tighter">ID: {inf.influencerId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="grid-row-cell">
                       <select 
                         value={inf.platform}
                         onChange={(e) => {
                           setInfluencers(prev => prev.map(i => i.id === inf.id ? { ...i, platform: e.target.value } : i));
                         }}
                         className="text-xs font-bold text-slate-600 bg-transparent outline-none cursor-pointer"
                       >
                         {['Instagram', 'TikTok', 'Snapchat', 'YouTube'].map(p => <option key={p} value={p}>{p}</option>)}
                       </select>
                    </td>
                    <td className="grid-row-cell">
                       <select 
                         value={inf.status}
                         onChange={(e) => handleUpdateStatus(inf.id, e.target.value as any)}
                         className={cn(
                           "text-[10px] font-display font-black uppercase tracking-widest px-3 py-1 rounded-full outline-none leading-none",
                           inf.status === 'Confirmed' ? "bg-emerald-50 text-emerald-600" :
                           inf.status === 'Pending' ? "bg-amber-50 text-amber-600" : "bg-slate-50 text-slate-500"
                         )}
                       >
                         {['Pending', 'Invited', 'Confirmed', 'Scheduled', 'Completed', 'Dropped'].map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </td>
                    <td className="grid-row-cell">
                       <input 
                         className="text-xs font-bold text-slate-600 bg-transparent border-none outline-none focus:ring-1 focus:ring-[var(--gc-purple-soft)] rounded px-1 -mx-1"
                         value={inf.city || 'Riyadh'}
                         onChange={(e) => handleUpdateCity(inf.id, e.target.value)}
                       />
                    </td>
                    <td className="grid-row-cell text-right">
                       <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-[var(--gc-orange)] hover:bg-[var(--gc-orange-soft)] rounded-lg transition-all">
                             <MessageSquare size={16} />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-[var(--gc-purple)] hover:bg-[var(--gc-purple-soft)] rounded-lg transition-all">
                             <ExternalLink size={16} />
                          </button>
                       </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-slate-400 italic">No influencer operational records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
             {filteredInfluencers.map(inf => (
               <div key={inf.id} className="command-card p-6 flex flex-col items-center text-center group">
                  <div className="w-20 h-20 rounded-3xl bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] flex items-center justify-center font-display font-black text-2xl mb-4 group-hover:rotate-6 transition-transform">
                    {inf.username.substring(1, 2).toUpperCase()}
                  </div>
                  <h3 className="font-bold text-slate-900">{inf.username}</h3>
                  <p className="text-[10px] uppercase font-display font-black text-slate-400 mb-4">{inf.platform}</p>
                  <div className={cn(
                    "w-full py-2 rounded-xl text-[10px] font-display font-black uppercase tracking-widest mb-4",
                    inf.status === 'Confirmed' ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-400"
                  )}>
                    {inf.status}
                  </div>
                  <button className="w-full py-2 border border-slate-100 rounded-xl text-[10px] font-display font-black uppercase tracking-widest text-slate-400 hover:bg-[var(--gc-purple)] hover:text-white transition-all shadow-sm">
                    Operational Detail
                  </button>
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
}
