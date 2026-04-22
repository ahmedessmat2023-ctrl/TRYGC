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
  Clock,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils';
import { CampaignStage, STAGE_NAMES } from '../constants';
import { Campaign } from '../types';
import { dataService } from '../services/dataService';

export default function CampaignList() {
  const navigate = useNavigate();
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
    <div className="max-w-[1240px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="section-kicker">Operations Core</div>
          <h2 className="section-title">Campaign Registry</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-2 font-mono text-[13px]">
            <Activity size={16} className="text-[var(--gc-orange)]" />
            Centralized hub for all <span className="font-bold text-[var(--ink-900)]">18-stage</span> campaign lifecycle operations.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2 shadow-[var(--shadow-sm)]">
          <Plus strokeWidth={3} size={16} /> New Campaign
        </button>
      </div>

      {/* Stage Filter Chips */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-display font-black uppercase tracking-[1.5px] text-[var(--ink-500)]">Lifecycle Phase Filter</p>
          <button 
            onClick={() => setSelectedStage('all')}
            className="text-[11px] font-display font-black uppercase tracking-widest text-[var(--gc-orange)] hover:text-[#D14F1C] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
        <div className="flex flex-wrap gap-2 pb-2">
          <button
            onClick={() => setSelectedStage('all')}
            className={cn(
              "px-5 py-2.5 rounded-full text-[10.5px] font-display font-black uppercase tracking-widest transition-all border",
              selectedStage === 'all' 
                ? "bg-[var(--gc-purple)] text-white border-[var(--gc-purple)] shadow-[var(--shadow-md)] shadow-purple-900/10" 
                : "bg-white text-[var(--ink-500)] border-[var(--border)] hover:bg-[var(--bg)] hover:text-[var(--ink-700)]"
            )}
          >
            All Stages
          </button>
          {Object.entries(STAGE_NAMES).map(([stage, name]) => (
            <button
              key={stage}
              onClick={() => setSelectedStage(Number(stage))}
              className={cn(
                "px-5 py-2.5 rounded-full text-[10.5px] font-display font-black uppercase tracking-widest transition-all border",
                selectedStage === Number(stage)
                  ? "bg-[var(--gc-orange)] text-white border-[var(--gc-orange)] shadow-[var(--shadow-md)] shadow-orange-900/10"
                  : "bg-white text-[var(--ink-500)] border-[var(--border)] hover:bg-[var(--bg)] hover:text-[var(--ink-700)] hover:border-[var(--ink-300)]"
              )}
            >
              {stage}. {name.split('–')[0].split('/')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign List */}
      <div className="command-card">
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg)]">
           <div className="relative w-[380px]">
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-300)]" />
             <input 
               className="w-full pl-12 pr-4 py-3 text-sm outline-none font-medium bg-white border border-[var(--border)] rounded-full focus:border-[var(--gc-purple)] focus:ring-[4px] focus:ring-[var(--gc-purple-mid)] transition-all" 
               placeholder="Filter by brand, client, or reference ID..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
             />
           </div>
           <button className="flex items-center gap-2 px-5 py-3 border border-[var(--border)] rounded-full text-[12px] font-display font-bold uppercase tracking-widest text-[var(--ink-700)] bg-white hover:bg-[var(--bg)] hover:border-[var(--border-strong)] transition-all">
              <Filter strokeWidth={2.5} size={16} /> Refine
           </button>
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
                  <tr key={campaign.id} className="grid-row-cell group hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all cursor-default bg-white z-0 hover:z-10 relative">
                    <td className="px-6 py-4 border-b border-[var(--border)]">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--gc-orange-soft)] border border-[var(--gc-orange)]/20 text-[var(--gc-orange)] flex items-center justify-center font-display font-black shadow-sm">
                          {campaign.name?.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <input 
                            className="text-[15px] font-bold text-[var(--ink-900)] bg-transparent border-none outline-none focus:ring-[2px] focus:ring-[var(--gc-orange-soft)] rounded px-2 -mx-2 transition-all block w-full"
                            value={campaign.name}
                            onChange={(e) => {
                              const updated = dataService.updateCampaign(campaign.id, { name: e.target.value });
                              setCampaigns(updated);
                            }}
                          />
                          <p className="text-[11px] text-[var(--ink-500)] font-mono mt-1 tracking-wider uppercase pl-1">{campaign.id} · {campaign.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)] min-w-[240px]">
                       <div className="space-y-2.5">
                          <select 
                            value={campaign.stage}
                            onChange={(e) => handleUpdateStage(campaign.id, Number(e.target.value))}
                            className="w-full stage-tag bg-[var(--bg)] border border-[var(--border)] text-[var(--ink-900)] outline-none appearance-none cursor-pointer hover:bg-[var(--gc-purple)] hover:border-[var(--gc-purple)] hover:text-white transition-colors"
                          >
                            {Object.entries(STAGE_NAMES).map(([s, n]) => (
                              <option key={s} value={s}>{s}. {n}</option>
                            ))}
                          </select>
                          <div className="h-1.5 w-full bg-[var(--bg)] rounded-full overflow-hidden border border-[var(--border)]">
                             <div className="h-full bg-[var(--gc-purple)] transition-all duration-700 ease-out" style={{ width: `${((campaign.stage || 1) / 18) * 100}%` }} />
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)] text-center">
                       <select 
                         value={campaign.status}
                         onChange={(e) => handleUpdateStatus(campaign.id, e.target.value as any)}
                         className={cn(
                           "text-[10.5px] font-mono font-bold uppercase tracking-[1px] px-3.5 py-1.5 rounded-sm outline-none cursor-pointer transition-colors border appearance-none text-center",
                           campaign.status === 'Active' ? "bg-emerald-50 text-[var(--success)] border-emerald-200" :
                           campaign.status === 'Blocked' ? "bg-red-50 text-[var(--danger)] border-red-200" : "bg-[var(--bg)] text-[var(--ink-700)] border-[var(--border)]"
                         )}
                       >
                         {['Active', 'Blocked', 'Closed', 'On Hold'].map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)]">
                       <input 
                         className="text-[14px] font-bold text-[var(--ink-700)] bg-transparent border-none outline-none focus:ring-[2px] focus:ring-[var(--gc-orange-soft)] rounded px-2 py-1 -mx-2 transition-all w-full"
                         value={campaign.country}
                         onChange={(e) => {
                           const updated = dataService.updateCampaign(campaign.id, { country: e.target.value });
                           setCampaigns(updated);
                         }}
                       />
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)]">
                       <div className="flex items-center gap-1.5 font-display font-black uppercase text-[11px] tracking-widest cursor-pointer group/health">
                          <select 
                            value={campaign.recordHealth}
                            onChange={(e) => handleUpdateHealth(campaign.id, e.target.value as any)}
                            className={cn(
                              "bg-transparent outline-none appearance-none font-mono font-bold tracking-widest uppercase cursor-pointer hover:underline underline-offset-4 decoration-2",
                              campaign.recordHealth === 'Healthy' ? "text-[var(--success)] decoration-emerald-200" : 
                              campaign.recordHealth === 'At Risk' ? "text-amber-500 decoration-amber-200" : "text-[var(--danger)] decoration-red-200"
                            )}
                          >
                            {['Healthy', 'At Risk', 'Critical'].map(h => <option key={h} value={h}>{h}</option>)}
                          </select>
                       </div>
                    </td>
                    <td className="px-6 py-4 border-b border-[var(--border)] text-right">
                       <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => navigate(`/campaign/${campaign.id}`)}
                            className="p-2.5 text-[var(--ink-300)] hover:text-[var(--gc-purple)] hover:bg-[var(--gc-purple-soft)] rounded-md transition-all shadow-sm shadow-transparent hover:shadow-[var(--shadow-sm)]"
                            title="View Mission Detail"
                          >
                             <Eye size={18} />
                          </button>
                          <button className="p-2.5 text-[var(--ink-300)] hover:text-[var(--ink-900)] hover:bg-[var(--bg)] rounded-md transition-all shadow-sm shadow-transparent hover:shadow-[var(--shadow-sm)]">
                             <MoreVertical size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-16 text-center">
                    <div className="w-20 h-20 bg-[var(--bg)] border border-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                      <Search size={28} className="text-[var(--ink-300)]" />
                    </div>
                    <p className="text-[18px] font-bold text-[var(--ink-900)] tracking-tight">No campaigns found</p>
                    <p className="text-[13px] font-mono text-[var(--ink-500)] mt-2">Try adjusting your filters or search query.</p>
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
