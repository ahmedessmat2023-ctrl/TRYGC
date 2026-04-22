/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Search, 
  UserPlus, 
  Filter, 
  LayoutGrid, 
  List, 
  CheckCircle2,
  ExternalLink,
  CheckSquare,
  Square,
  X
} from 'lucide-react';
import { cn } from '../utils';
import { dataService } from '../services/dataService';
import { CampaignInfluencer } from '../types';

export default function InfluencerList() {
  const navigate = useNavigate();
  const [influencers, setInfluencers] = useState<CampaignInfluencer[]>(dataService.getInfluencers());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkUpdating, setIsBulkUpdating] = useState(false);

  const filteredInfluencers = influencers.filter(inf => 
    inf.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inf.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStatus = (id: string, status: CampaignInfluencer['status']) => {
    const updated = dataService.updateInfluencer(id, { status });
    setInfluencers(updated);
  };

  const handleUpdateCity = (id: string, city: string) => {
    const updated = dataService.updateInfluencer(id, { city });
    setInfluencers(updated);
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredInfluencers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredInfluencers.map(i => i.id));
    }
  };

  const handleBulkStatusChange = (status: CampaignInfluencer['status']) => {
    setIsBulkUpdating(true);
    setTimeout(() => {
      const updated = dataService.bulkUpdateInfluencerStatus(selectedIds, status);
      setInfluencers(updated);
      setSelectedIds([]);
      setIsBulkUpdating(false);
    }, 800);
  };

  return (
    <div className="max-w-[1240px] mx-auto space-y-8 animate-in fade-in duration-500 relative">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="section-kicker">Roster Integrity</div>
          <h2 className="section-title">Influencer Corps</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-2 font-mono text-[13px]">
            <Users size={16} className="text-[var(--gc-purple)]" />
            Managing active influencer roster across <span className="font-bold text-[var(--ink-900)]">{influencers.length}</span> operations.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-white border border-[var(--border)] rounded-full p-1.5 shadow-sm">
             <button 
               onClick={() => setViewMode('list')}
               className={cn("p-2 rounded-full transition-all", viewMode === 'list' ? "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)]" : "text-[var(--ink-500)] hover:bg-[var(--bg)]")}
             >
               <List size={18} />
             </button>
             <button 
               onClick={() => setViewMode('grid')}
               className={cn("p-2 rounded-full transition-all", viewMode === 'grid' ? "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)]" : "text-[var(--ink-500)] hover:bg-[var(--bg)]")}
             >
               <LayoutGrid size={18} />
             </button>
          </div>
          <button className="btn-primary flex items-center gap-2 shadow-[var(--shadow-sm)]">
            <UserPlus size={18} /> Recruit Influencer
          </button>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[var(--ink-900)] text-white px-8 py-5 rounded-full shadow-[var(--shadow-lg)] flex items-center gap-6 animate-in slide-in-from-bottom-8 duration-300 border border-[var(--ink-700)]">
           <div className="flex items-center gap-4 pr-6 border-r border-[var(--ink-700)]">
              <div className="w-8 h-8 rounded-full bg-[var(--gc-purple)] flex items-center justify-center font-bold text-sm">
                 {selectedIds.length}
              </div>
              <p className="text-sm font-bold tracking-tight text-white uppercase">Selected</p>
           </div>
           
           <div className="flex items-center gap-2">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--ink-300)] mr-3">Bulk Status Update:</p>
              {['Pending', 'Invited', 'Confirmed', 'Scheduled', 'Completed', 'Dropped'].map(s => (
                <button 
                  key={s}
                  onClick={() => handleBulkStatusChange(s as any)}
                  disabled={isBulkUpdating}
                  className="px-4 py-2 rounded-full text-[11px] font-display font-extrabold uppercase tracking-widest bg-[var(--ink-700)] hover:bg-[var(--gc-purple)] hover:text-white transition-colors border border-transparent disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
           </div>

           <div className="pl-6 border-l border-[var(--ink-700)] flex items-center gap-3">
              <button 
                onClick={() => setSelectedIds([])}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[var(--ink-700)] text-[var(--ink-300)] hover:text-white hover:bg-[var(--danger)] transition-colors"
                title="Cancel selection"
              >
                <X size={16} />
              </button>
           </div>
           
           {isBulkUpdating && (
             <div className="absolute inset-x-0 -bottom-1 px-4">
                <div className="h-1 w-full bg-[var(--ink-700)] rounded-full overflow-hidden">
                   <div className="h-full bg-[var(--gc-purple)] animate-pulse" style={{ width: '100%' }} />
                </div>
             </div>
           )}
        </div>
      )}

      <div className="command-card">
        <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg)]">
           <div className="relative w-[340px]">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-300)]" />
              <input 
                className="w-full pl-12 pr-4 py-3 text-sm outline-none font-medium bg-white border border-[var(--border)] rounded-full focus:border-[var(--gc-purple)] focus:ring-[4px] focus:ring-[var(--gc-purple-mid)] transition-all" 
                placeholder="Search by username, platform..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
           </div>
           <button className="flex items-center gap-2 px-5 py-3 border border-[var(--border)] rounded-full text-[12px] font-display font-bold uppercase tracking-widest text-[var(--ink-700)] bg-white hover:bg-[var(--bg)] transition-all">
              <Filter strokeWidth={2.5} size={16} /> Global Filters
           </button>
        </div>

        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="grid-header-cell w-[60px]">
                     <button 
                       onClick={toggleSelectAll}
                       className="p-1.5 hover:bg-[var(--border)] rounded transition-colors"
                     >
                       {selectedIds.length === filteredInfluencers.length && filteredInfluencers.length > 0 
                         ? <CheckSquare size={18} className="text-[var(--gc-purple)]" /> 
                         : <Square size={18} className="text-[var(--ink-300)]" />}
                     </button>
                  </th>
                  <th className="grid-header-cell">Influencer Identity</th>
                  <th className="grid-header-cell">Platform</th>
                  <th className="grid-header-cell">Operational Status</th>
                  <th className="grid-header-cell">City / Market</th>
                  <th className="grid-header-cell text-right">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {filteredInfluencers.length > 0 ? filteredInfluencers.map((inf) => (
                  <tr 
                    key={inf.id} 
                    className={cn(
                      "grid-row-cell group transition-all",
                      selectedIds.includes(inf.id) ? "bg-[var(--gc-purple-soft)]/50" : ""
                    )}
                  >
                    <td className="px-6 py-4 border-b border-[var(--border)]">
                       <button 
                         onClick={() => toggleSelect(inf.id)}
                         className="p-1.5"
                       >
                         {selectedIds.includes(inf.id) 
                           ? <CheckSquare size={18} className="text-[var(--gc-purple)]" /> 
                           : <Square size={18} className="text-[var(--ink-300)] group-hover:text-[var(--ink-500)] transition-colors" />}
                       </button>
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--bg)] flex items-center justify-center font-display font-black text-[var(--gc-purple)] border border-[var(--border)] shadow-sm">
                          {inf.username.substring(1, 2).toUpperCase()}
                        </div>
                        <div>
                          <input 
                            className="text-[15px] font-bold text-[var(--ink-900)] bg-transparent border-none outline-none focus:ring-[2px] focus:ring-[var(--gc-purple-mid)] rounded px-2 -mx-2 transition-all block w-full"
                            value={inf.username}
                            onChange={(e) => {
                              const updated = dataService.updateInfluencer(inf.id, { username: e.target.value });
                              setInfluencers(updated);
                            }}
                          />
                          <p className="text-[11px] text-[var(--ink-500)] font-mono mt-1 uppercase tracking-wider pl-1">ID-{inf.influencerId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)]">
                       <select 
                         value={inf.platform}
                         onChange={(e) => {
                           const updated = dataService.updateInfluencer(inf.id, { platform: e.target.value });
                           setInfluencers(updated);
                         }}
                         className="text-[14px] font-bold text-[var(--ink-700)] bg-transparent outline-none cursor-pointer hover:bg-[var(--bg)] px-2 py-1 -mx-2 rounded transition-colors"
                       >
                         {['Instagram', 'TikTok', 'Snapchat', 'YouTube'].map(p => <option key={p} value={p}>{p}</option>)}
                       </select>
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)]">
                       <select 
                         value={inf.status}
                         onChange={(e) => handleUpdateStatus(inf.id, e.target.value as any)}
                         className={cn(
                           "text-[10.5px] font-mono font-bold uppercase tracking-[1px] px-3.5 py-1.5 rounded-sm outline-none cursor-pointer transition-colors border",
                           inf.status === 'Confirmed' ? "bg-emerald-50 text-[var(--success)] border-emerald-200 hover:bg-emerald-100" :
                           inf.status === 'Pending' ? "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100" : "bg-[var(--bg)] text-[var(--ink-700)] border-[var(--border)] hover:bg-white"
                         )}
                       >
                         {['Pending', 'Invited', 'Confirmed', 'Scheduled', 'Completed', 'Dropped'].map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)]">
                       <input 
                         className="text-[14px] font-bold text-[var(--ink-700)] bg-transparent border-none outline-none focus:ring-[2px] focus:ring-[var(--gc-purple-mid)] rounded px-2 py-1 -mx-2 transition-all w-full"
                         value={inf.city || 'Riyadh'}
                         onChange={(e) => handleUpdateCity(inf.id, e.target.value)}
                       />
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)] text-right">
                       <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => navigate(`/influencer/${inf.id}`)}
                            className="p-2 text-[var(--ink-300)] hover:text-[var(--gc-purple)] hover:bg-[var(--gc-purple-soft)] rounded-md transition-all"
                            title="View Profile"
                          >
                             <ExternalLink size={20} />
                          </button>
                       </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="p-16 text-center text-[var(--ink-500)] italic font-mono text-[13px]">No influencer operational records found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[var(--bg)]">
             {filteredInfluencers.map(inf => (
               <div 
                 key={inf.id} 
                 onClick={() => toggleSelect(inf.id)}
                 className={cn(
                   "command-card p-8 flex flex-col items-center text-center group relative cursor-pointer outline outline-0 outline-[var(--gc-purple)]",
                   selectedIds.includes(inf.id) ? "outline-2 bg-[var(--gc-purple-soft)]/50 scale-[0.98] shadow-sm transform-none" : "hover:-translate-y-1 hover:shadow-[var(--shadow)]"
                 )}
               >
                  {selectedIds.includes(inf.id) && (
                    <div className="absolute top-4 right-4 text-[var(--gc-purple)]">
                       <CheckCircle2 size={24} />
                    </div>
                  )}
                  <div className="w-[84px] h-[84px] rounded-full bg-white border border-[var(--border)] text-[var(--gc-purple)] flex items-center justify-center font-display font-black text-3xl mb-6 group-hover:rotate-[10deg] transition-transform shadow-sm">
                    {inf.username.substring(1, 2).toUpperCase()}
                  </div>
                  <h3 className="text-xl font-bold text-[var(--ink-900)] mb-1 tracking-tight">{inf.username}</h3>
                  <p className="text-[12px] font-mono text-[var(--ink-500)] mb-5 uppercase tracking-wider">{inf.platform}</p>
                  
                  <div className={cn(
                    "w-full py-2.5 rounded-sm text-[11px] font-mono font-bold uppercase tracking-widest mb-6 border",
                    inf.status === 'Confirmed' ? "bg-emerald-50 border-emerald-200 text-[var(--success)]" : "bg-[var(--bg)] border-[var(--border)] text-[var(--ink-500)]"
                  )}>
                    {inf.status}
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/influencer/${inf.id}`);
                    }}
                    className="w-full py-3.5 border border-[var(--border-strong)] rounded-full text-[12px] font-display font-bold uppercase tracking-widest text-[var(--ink-700)] hover:bg-[var(--gc-purple)] hover:text-white hover:border-[var(--gc-purple)] transition-all shadow-[var(--shadow-sm)]"
                  >
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
