/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  Search, 
  ChevronRight, 
  MoreVertical, 
  Plus, 
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { cn } from '../utils';
import { CampaignStage, STAGE_NAMES } from '../constants';
import { Campaign } from '../types';
import { dataService } from '../services/dataService';

export default function CampaignList() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(dataService.getCampaigns());
  const [selectedStage, setSelectedStage] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesStage = selectedStage === 'all' || campaign.stage === selectedStage;
      const matchesSearch = campaign.name?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStage && matchesSearch;
    });
  }, [selectedStage, searchQuery, campaigns]);

  const handleUpdateStatus = (id: string, status: Campaign['status']) => {
    const updated = dataService.updateCampaign(id, { status });
    setCampaigns(updated);
  };

  const handleUpdateHealth = (id: string, recordHealth: Campaign['recordHealth']) => {
    const updated = dataService.updateCampaign(id, { recordHealth });
    setCampaigns(updated);
  };

  const handleUpdateStage = (id: string, stage: CampaignStage) => {
    const updated = dataService.updateCampaign(id, { stage });
    setCampaigns(updated);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="section-title text-4xl">Campaign Registry</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-1">
            <Activity size={14} className="text-[var(--gc-orange)]" />
            Centralized hub for all 18-stage campaign lifecycle operations.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Campaign
        </button>
      </div>

      {/* Stage Filter Chips */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-display font-black uppercase tracking-widest text-slate-400">Lifecycle Phase Filter</p>
          <button 
            onClick={() => setSelectedStage('all')}
            className="text-[10px] font-display font-black uppercase text-[var(--gc-orange)] hover:underline"
          >
            Clear All Filters
          </button>
        </div>
        <div className="flex flex-wrap gap-2 pb-2">
          <button
            onClick={() => setSelectedStage('all')}
            className={cn(
              "px-4 py-2 rounded-xl text-[10px] font-display font-black uppercase tracking-widest transition-all border",
              selectedStage === 'all' 
                ? "bg-[var(--gc-purple)] text-white border-[var(--gc-purple)] shadow-lg" 
                : "bg-white text-slate-500 border-[var(--border)] hover:bg-slate-50"
            )}
          >
            All Stages
          </button>
          {Object.entries(STAGE_NAMES).map(([stage, name]) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(Number(stage))}
              className={cn(
                "px-4 py-2 rounded-xl text-[10px] font-display font-black uppercase tracking-widest transition-all border",
                selectedStage === Number(stage)
                  ? "bg-[var(--gc-orange)] text-white border-[var(--gc-orange)] shadow-lg"
                  : "bg-white text-slate-500 border-[var(--border)] hover:bg-slate-50"
              )}
            >
              {stage}. {name.split('–')[0].split('/')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign List */}
      <div className="command-card bg-white">
        <div className="p-4 border-b border-[var(--border)] flex items-center gap-4">
           <Search size={18} className="text-slate-400" />
           <input 
             className="flex-1 text-sm outline-none font-medium" 
             placeholder="Filter by brand, client, or reference ID..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
           />
           <div className="flex gap-2">
             <button className="flex items-center gap-2 px-4 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-500 bg-slate-50">
                <Filter size={14} /> Refine
             </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="grid-header-cell">Campaign Name</th>
                <th className="grid-header-cell">Current Stage</th>
                <th className="grid-header-cell text-center">Status</th>
                <th className="grid-header-cell">Market</th>
                <th className="grid-header-cell">Health</th>
                <th className="grid-header-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="group hover:bg-[var(--gc-purple-soft)]/20 transition-all cursor-default">
                    <td className="grid-row-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] flex items-center justify-center font-display font-black">
                          {campaign.name?.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <input 
                            className="text-sm font-bold text-slate-900 bg-transparent border-none outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] rounded px-1 -mx-1"
                            value={campaign.name}
                            onChange={(e) => {
                              const updated = dataService.updateCampaign(campaign.id, { name: e.target.value });
                              setCampaigns(updated);
                            }}
                          />
                          <p className="text-[10px] text-slate-400 font-mono mt-1">{campaign.id} · {campaign.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="grid-row-cell min-w-[220px]">
                       <div className="space-y-1.5">
                          <select 
                            value={campaign.stage}
                            onChange={(e) => handleUpdateStage(campaign.id, Number(e.target.value))}
                            className="stage-tag bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] border-none outline-none appearance-none cursor-pointer hover:bg-[var(--gc-purple)] hover:text-white transition-colors"
                          >
                            {Object.entries(STAGE_NAMES).map(([s, n]) => (
                              <option key={s} value={s}>{s}. {n}</option>
                            ))}
                          </select>
                          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-[var(--gc-purple)]" style={{ width: `${((campaign.stage || 1) / 18) * 100}%` }} />
                          </div>
                       </div>
                    </td>
                    <td className="grid-row-cell text-center">
                       <select 
                         value={campaign.status}
                         onChange={(e) => handleUpdateStatus(campaign.id, e.target.value as any)}
                         className={cn(
                           "text-[10px] font-display font-black uppercase tracking-widest px-3 py-1 rounded-full outline-none",
                           campaign.status === 'Active' ? "bg-emerald-50 text-emerald-600" :
                           campaign.status === 'Blocked' ? "bg-red-50 text-red-600" : "bg-slate-50 text-slate-500"
                         )}
                       >
                         {['Active', 'Blocked', 'Closed', 'On Hold'].map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </td>
                    <td className="grid-row-cell">
                       <input 
                         className="text-xs font-bold text-slate-600 bg-transparent border-none outline-none focus:ring-1 focus:ring-[var(--gc-orange-soft)] rounded px-1 -mx-1"
                         value={campaign.country}
                         onChange={(e) => {
                           const updated = dataService.updateCampaign(campaign.id, { country: e.target.value });
                           setCampaigns(updated);
                         }}
                       />
                    </td>
                    <td className="grid-row-cell">
                       <div className="flex items-center gap-1.5 font-display font-black uppercase text-[10px] tracking-widest cursor-pointer group/health">
                          <select 
                            value={campaign.recordHealth}
                            onChange={(e) => handleUpdateHealth(campaign.id, e.target.value as any)}
                            className={cn(
                              "bg-transparent outline-none appearance-none font-display font-black",
                              campaign.recordHealth === 'Healthy' ? "text-emerald-600" : 
                              campaign.recordHealth === 'At Risk' ? "text-amber-500" : "text-red-500"
                            )}
                          >
                            {['Healthy', 'At Risk', 'Critical'].map(h => <option key={h} value={h}>{h}</option>)}
                          </select>
                       </div>
                    </td>
                    <td className="grid-row-cell text-right">
                       <button className="p-2 text-slate-400 hover:text-[var(--gc-purple)] hover:bg-[var(--gc-purple-soft)] rounded-lg transition-all opacity-0 group-hover:opacity-100">
                          <MoreVertical size={16} />
                       </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-slate-200" />
                    </div>
                    <p className="text-sm font-bold text-slate-900">No campaigns found</p>
                    <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
