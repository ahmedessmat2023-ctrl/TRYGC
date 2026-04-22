/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  Target, 
  BarChart3, 
  Download,
  Share2,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Camera,
  PlayCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../utils';
import { motion, AnimatePresence } from 'motion/react';
import { dataService } from '../services/dataService';
import { STAGE_NAMES } from '../constants';

const CAMPAIGN_STATS = [
  { label: 'Total Reach', value: '482K', change: '+12%', sub: 'Target: 500K' },
  { label: 'Engagement', value: '8.4%', change: '+2.1%', sub: 'Target: 6.5%' },
  { label: 'Validated Content', value: '142', change: '84%', sub: 'Goal: 170' },
  { label: 'ROI Projection', value: '3.2x', change: 'Live', sub: 'Est: 2.8x' },
];

const MILESTONES = [
  { stage: 'Strategy & Brief', status: 'completed', date: 'Oct 12' },
  { stage: 'Creator Sourcing', status: 'completed', date: 'Oct 15' },
  { stage: 'Contractual Loop', status: 'completed', date: 'Oct 18' },
  { stage: 'Content Production', status: 'active', date: 'Oct 22', progress: 65 },
  { stage: 'Distribution Pulse', status: 'pending', date: 'Oct 28' },
  { stage: 'Final Reporting', status: 'pending', date: 'Nov 05' },
];

const CONTENT_FEED = [
  { id: 1, creator: '@tech_omar', platform: 'Instagram', type: 'Reel', status: 'Approved', reach: '42K', engagement: '9.2%' },
  { id: 2, creator: '@lifestyle_sa', platform: 'TikTok', type: 'Video', status: 'Reviewing', reach: '128K', engagement: '12.4%' },
  { id: 3, creator: '@riyadh_explorer', platform: 'Instagram', type: 'Stories', status: 'Pending', reach: '12K', engagement: '-' },
  { id: 4, creator: '@fashion.mona', platform: 'Snapchat', type: 'Spotlight', status: 'Rejected', reach: '5K', engagement: '2.1%' },
];

export default function CampaignDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const campaign = React.useMemo(() => {
    return dataService.getCampaigns().find(c => c.id === id);
  }, [id]);

  if (!campaign) {
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <h2 className="text-2xl font-black text-slate-400 uppercase tracking-widest">Mission ID Not Found</h2>
        <button onClick={() => navigate('/campaigns')} className="btn-primary">Return to Registry</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* Precision Header */}
      <header className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
           <button 
             onClick={() => navigate('/campaigns')}
             className="group flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors"
           >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
                 <ArrowLeft size={18} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exit to Registry</span>
           </button>

           <div className="flex items-center gap-4">
              <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2">
                 <Share2 size={14} /> Global Link
              </button>
              <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--gc-orange)] shadow-lg transition-all flex items-center gap-2">
                 <Download size={14} /> Export Report
              </button>
              <button className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
                 <MoreVertical size={18} />
              </button>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="px-3 py-1 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] rounded-lg text-[10px] font-black uppercase tracking-widest">
                    {STAGE_NAMES[campaign.stage as keyof typeof STAGE_NAMES] || 'Execution Phase'}
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID: {campaign.id}</span>
              </div>
              <h1 className="text-6xl font-display font-black tracking-tighter text-slate-900">
                 {campaign.name.split(' ').slice(0, -1).join(' ')} <br />
                 <span className="text-[var(--gc-purple)]">{campaign.name.split(' ').slice(-1)} Heartbeat.</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                 <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">{campaign.city || 'Regional Markets'}</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">{campaign.startDate ? `${campaign.startDate} - ${campaign.endDate}` : 'Timeline Undefined'}</span>
                 </div>
                 <div className="flex items-center gap-2 text-slate-500">
                    <Users size={16} className="text-slate-400" />
                    <span className="text-xs font-bold uppercase tracking-widest">{campaign.targetInfluencers} Target Creators</span>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-2 p-1 bg-slate-100/50 border border-slate-100 rounded-2xl w-fit">
              <button className="px-6 py-3 bg-white text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm">Overview</button>
              <button className="px-6 py-3 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors">Creators</button>
              <button className="px-6 py-3 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors">Media</button>
              <button className="px-6 py-3 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors">Payouts</button>
           </div>
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         {CAMPAIGN_STATS.map((stat, idx) => (
           <div key={idx} className="command-card p-8 bg-white border-2 border-slate-50 rounded-[2rem] hover:border-[var(--gc-orange-soft)] transition-all">
              <p className="data-label mb-1 text-slate-400">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                 <p className="text-4xl font-display font-black text-slate-900">{stat.value}</p>
                 <span className={cn(
                   "text-[10px] font-black tabular-nums",
                   stat.change.includes('+') ? "text-emerald-500" : "text-[var(--gc-orange)]"
                 )}>{stat.change}</span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-4 opacity-60">{stat.sub}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Live Performance Feed */}
         <div className="lg:col-span-8 space-y-10">
            <div className="command-card rounded-[2.5rem] bg-white border-2 border-slate-50 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
               <div className="p-10 border-b border-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] rounded-2xl flex items-center justify-center">
                        <Camera size={24} />
                     </div>
                     <div>
                        <h3 className="section-title text-base tracking-widest uppercase">Verified Content Stream</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Live validation across verified handles</p>
                     </div>
                  </div>
                  <button className="px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--gc-orange)] transition-colors">
                     Batch Validate
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50/50">
                        <tr>
                           <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Creator Asset</th>
                           <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Tactical Status</th>
                           <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Reach Sync</th>
                           <th className="px-10 py-4"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {CONTENT_FEED.map((item) => (
                           <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                              <td className="px-10 py-6">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 relative">
                                       <PlayCircle size={20} />
                                       {item.platform === 'TikTok' && <div className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full border border-white" />}
                                    </div>
                                    <div>
                                       <p className="text-sm font-black text-slate-900">{item.creator}</p>
                                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.platform} • {item.type}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-10 py-6">
                                 <div className={cn(
                                   "w-fit px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                   item.status === 'Approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                   item.status === 'Reviewing' ? "bg-amber-50 text-amber-500 border-amber-100" :
                                   item.status === 'Rejected' ? "bg-red-50 text-red-500 border-red-100" :
                                   "bg-slate-50 text-slate-400 border-slate-100"
                                 )}>
                                    {item.status}
                                 </div>
                              </td>
                              <td className="px-10 py-6">
                                 <div className="space-y-1">
                                    <p className="text-[11px] font-black text-slate-900 tabular-nums">{item.reach} Impressions</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.engagement} Velocity</p>
                                 </div>
                              </td>
                              <td className="px-10 py-6 text-right">
                                 <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                    <MoreVertical size={16} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="p-8 bg-slate-50/50 text-center border-t border-slate-50">
                  <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">View All Archive Operations</button>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div className="command-card p-10 bg-[var(--gc-purple)] text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <Users className="absolute -bottom-6 -right-6 text-white/5 size-40 group-hover:scale-110 transition-transform duration-700" />
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Creator Sentiment</p>
                  <h4 className="text-4xl font-display font-black mb-6">Very High</h4>
                  <div className="space-y-4">
                     <p className="text-xs text-purple-100 italic leading-relaxed border-l-2 border-white/20 pl-4 py-1">
                        "Unrivaled brand alignment with the current summer vibe tracker. Extractions show high organic ripple effect."
                     </p>
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full bg-white/20 border-2 border-[var(--gc-purple)] backdrop-blur-md" />
                        ))}
                        <div className="w-8 h-8 rounded-full bg-white text-[var(--gc-purple)] flex items-center justify-center text-[10px] font-black border-2 border-[var(--gc-purple)]">
                           +8
                        </div>
                     </div>
                  </div>
               </div>
               <div className="command-card p-10 bg-slate-900 text-white rounded-[2.5rem] relative overflow-hidden">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-4">Market Coverage</p>
                  <h4 className="text-4xl font-display font-black mb-6">Operational</h4>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                        <span className="text-slate-400">GCC Integration</span>
                        <span className="text-white">82%</span>
                     </div>
                     <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[var(--gc-orange)]" style={{ width: '82%' }} />
                     </div>
                     <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-emerald-500" /> Tier 1
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-2 h-2 rounded-full bg-amber-500" /> Tier 2
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar: Operational Roadmap */}
         <div className="lg:col-span-4 space-y-10">
            <div className="command-card p-10 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="section-title text-sm tracking-[0.2em]">Mission Roadmap</h3>
                  <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[9px] font-black uppercase tracking-widest">
                     In-Progress
                  </div>
               </div>

               <div className="relative space-y-10">
                  <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-100" />
                  {MILESTONES.map((step, idx) => (
                    <div key={idx} className="relative pl-10 group">
                       <div className={cn(
                         "absolute left-0 top-1 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300",
                         step.status === 'completed' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-110" :
                         step.status === 'active' ? "bg-[var(--gc-orange)] text-white shadow-xl shadow-orange-200 animate-pulse scale-125" :
                         "bg-slate-100 text-slate-400"
                       )}>
                          {step.status === 'completed' ? <CheckCircle2 size={12} /> : 
                           step.status === 'active' ? <Clock size={12} /> : 
                           <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />}
                       </div>
                       <div className="space-y-1">
                          <p className={cn(
                            "text-xs font-black uppercase tracking-widest transition-colors",
                            step.status === 'active' ? "text-slate-900" : "text-slate-500"
                          )}>{step.stage}</p>
                          <p className="text-[10px] font-bold text-slate-400 tabular-nums uppercase">{step.date} • {step.status}</p>
                          {step.progress && (
                            <div className="pt-3 space-y-2">
                               <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                                  <div className="h-full bg-[var(--gc-orange)]" style={{ width: `${step.progress}%` }} />
                               </div>
                               <p className="text-[9px] font-black text-[var(--gc-orange)] uppercase tracking-wider text-right">{step.progress}% Capacity reached</p>
                            </div>
                          )}
                       </div>
                    </div>
                  ))}
               </div>

               <button className="w-full mt-12 py-5 border-2 border-slate-50 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                  Strategic Oversight Audit
               </button>
            </div>

            <div className="command-card p-10 bg-slate-50 border-2 border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.01)] group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-slate-200 opacity-20 group-hover:scale-110 transition-transform duration-700">
                  <BarChart3 size={120} strokeWidth={1} />
               </div>
               <h4 className="section-title text-xs tracking-widest uppercase opacity-60 mb-6">Internal Resource Sync</h4>
               <div className="space-y-6 relative z-10">
                  <div className="flex gap-4 items-center">
                     <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm">
                        AE
                     </div>
                     <div>
                        <p className="text-xs font-black text-slate-900">Ahmed Essmat</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal Mission Lead</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-center">
                     <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl">
                        MK
                     </div>
                     <div>
                        <p className="text-xs font-black text-slate-900">Mona Khalid (STC)</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Client Primary Owner</p>
                     </div>
                  </div>
               </div>
               <div className="mt-8 p-4 bg-white/50 border border-white rounded-2xl">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                     <Clock size={14} className="text-[var(--gc-orange)]" /> Last Activity Sync: 4m ago
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
