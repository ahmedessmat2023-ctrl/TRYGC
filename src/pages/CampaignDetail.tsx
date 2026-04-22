import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  BarChart3, 
  Download,
  Share2,
  MoreVertical,
  CheckCircle2,
  Clock,
  Camera,
  PlayCircle
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { cn } from '../utils';
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
        <h2 className="text-2xl font-black text-[var(--ink-400)] uppercase tracking-widest">Mission ID Not Found</h2>
        <button onClick={() => navigate('/campaigns')} className="btn-primary">Return to Registry</button>
      </div>
    );
  }

  return (
    <div className="max-w-[1240px] mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* Precision Header */}
      <header className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
           <button 
             onClick={() => navigate('/campaigns')}
             className="group flex items-center gap-4 text-[var(--ink-400)] hover:text-[var(--ink-900)] transition-colors"
           >
              <div className="w-12 h-12 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center group-hover:bg-[var(--ink-900)] group-hover:text-white group-hover:border-[var(--ink-900)] transition-all shadow-sm">
                 <ArrowLeft size={20} />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest">Exit to Registry</span>
           </button>

           <div className="flex items-center gap-4">
              <button className="px-6 py-3.5 bg-white border border-[var(--border-strong)] text-[var(--ink-700)] rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[var(--bg)] transition-all flex items-center gap-2 shadow-sm">
                 <Share2 size={16} /> Global Link
              </button>
              <button className="px-6 py-3.5 bg-[var(--ink-900)] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[var(--gc-orange)] shadow-[var(--shadow-md)] transition-all flex items-center gap-2">
                 <Download size={16} /> Export Report
              </button>
              <button className="w-12 h-12 bg-white border border-[var(--border-strong)] text-[var(--ink-500)] rounded-xl flex items-center justify-center hover:bg-[var(--bg)] hover:text-[var(--ink-900)] transition-colors shadow-sm">
                 <MoreVertical size={20} />
              </button>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="px-3.5 py-1.5 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] rounded-lg text-[11px] font-black uppercase tracking-widest">
                    {STAGE_NAMES[campaign.stage as keyof typeof STAGE_NAMES] || 'Execution Phase'}
                 </div>
                 <div className="w-1.5 h-1.5 rounded-full bg-[var(--ink-300)]" />
                 <span className="text-[11px] font-black uppercase tracking-widest text-[var(--ink-400)]">ID: {campaign.id}</span>
              </div>
              <h1 className="text-6xl font-display font-black tracking-tight text-[var(--ink-900)]">
                 {campaign.name.split(' ').slice(0, -1).join(' ')} <br />
                 <span className="text-[var(--gc-purple)]">{campaign.name.split(' ').slice(-1)} Heartbeat.</span>
              </h1>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                 <div className="flex items-center gap-2 text-[var(--ink-500)]">
                    <MapPin size={18} className="text-[var(--ink-400)]" />
                    <span className="text-[12px] font-bold uppercase tracking-widest">{campaign.city || 'Regional Markets'}</span>
                 </div>
                 <div className="flex items-center gap-2 text-[var(--ink-500)]">
                    <Calendar size={18} className="text-[var(--ink-400)]" />
                    <span className="text-[12px] font-bold uppercase tracking-widest">{campaign.startDate ? `${campaign.startDate} - ${campaign.endDate}` : 'Timeline Undefined'}</span>
                 </div>
                 <div className="flex items-center gap-2 text-[var(--ink-500)]">
                    <Users size={18} className="text-[var(--ink-400)]" />
                    <span className="text-[12px] font-bold uppercase tracking-widest">{campaign.targetInfluencers} Target Creators</span>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-2 p-1.5 bg-[var(--bg)] border border-[var(--border)] rounded-2xl w-fit">
              <button className="px-6 py-3 bg-white text-[var(--ink-900)] rounded-xl text-[11px] font-black uppercase tracking-widest shadow-sm">Overview</button>
              <button className="px-6 py-3 text-[var(--ink-500)] rounded-xl text-[11px] font-black uppercase tracking-widest hover:text-[var(--ink-900)] transition-colors">Creators</button>
              <button className="px-6 py-3 text-[var(--ink-500)] rounded-xl text-[11px] font-black uppercase tracking-widest hover:text-[var(--ink-900)] transition-colors">Media</button>
              <button className="px-6 py-3 text-[var(--ink-500)] rounded-xl text-[11px] font-black uppercase tracking-widest hover:text-[var(--ink-900)] transition-colors">Payouts</button>
           </div>
        </div>
      </header>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {CAMPAIGN_STATS.map((stat, idx) => (
           <div key={idx} className="command-card p-8 bg-white border border-[var(--border)] rounded-3xl hover:border-[var(--gc-orange-soft)] transition-all shadow-sm">
              <p className="data-label mb-2 text-[var(--ink-500)]">{stat.label}</p>
              <div className="flex items-baseline gap-3">
                 <p className="text-4xl font-display font-black text-[var(--ink-900)] tracking-tight">{stat.value}</p>
                 <span className={cn(
                   "text-[12px] font-black tabular-nums tracking-wide",
                   stat.change.includes('+') ? "text-[var(--success)]" : "text-[var(--gc-orange)]"
                 )}>{stat.change}</span>
              </div>
              <p className="text-[11px] font-bold text-[var(--ink-400)] uppercase tracking-widest mt-4 opacity-80">{stat.sub}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         {/* Live Performance Feed */}
         <div className="lg:col-span-8 space-y-8">
            <div className="command-card rounded-3xl bg-white border border-[var(--border)] overflow-hidden shadow-sm">
               <div className="p-8 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg)]/50">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] rounded-2xl flex items-center justify-center">
                        <Camera size={24} />
                     </div>
                     <div>
                        <h3 className="section-title text-[14px]">Verified Content Stream</h3>
                        <p className="text-[11px] text-[var(--ink-500)] font-bold uppercase tracking-widest mt-1">Live validation across verified handles</p>
                     </div>
                  </div>
                  <button className="px-6 py-3.5 bg-[var(--ink-900)] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[var(--gc-orange)] transition-colors shadow-sm">
                     Batch Validate
                  </button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-[var(--bg)]">
                        <tr>
                           <th className="grid-header-cell pl-8">Creator Asset</th>
                           <th className="grid-header-cell">Tactical Status</th>
                           <th className="grid-header-cell">Reach Sync</th>
                           <th className="grid-header-cell pr-8"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-[var(--border)]">
                        {CONTENT_FEED.map((item) => (
                           <tr key={item.id} className="group hover:bg-[var(--bg)] transition-colors border-l-4 border-transparent hover:border-l-[var(--gc-orange)]">
                              <td className="grid-row-cell pl-8 py-6">
                                 <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white border border-[var(--border-strong)] rounded-xl flex items-center justify-center text-[var(--ink-400)] relative shadow-sm group-hover:text-[var(--gc-orange)] transition-colors">
                                       <PlayCircle size={22} />
                                       {item.platform === 'TikTok' && <div className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--ink-900)] rounded-full border border-white" />}
                                    </div>
                                    <div>
                                       <p className="text-[14px] font-black text-[var(--ink-900)] group-hover:text-[var(--gc-orange)] transition-colors">{item.creator}</p>
                                       <p className="text-[11px] font-bold text-[var(--ink-500)] uppercase tracking-widest mt-0.5">{item.platform} • {item.type}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="grid-row-cell py-6">
                                 <div className={cn(
                                   "w-fit px-3.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border shadow-sm",
                                   item.status === 'Approved' ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20" :
                                   item.status === 'Reviewing' ? "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20" :
                                   item.status === 'Rejected' ? "bg-[var(--danger)]/10 text-[var(--danger)] border-[var(--danger)]/20" :
                                   "bg-[var(--bg)] text-[var(--ink-500)] border-[var(--border-strong)]"
                                 )}>
                                    {item.status}
                                 </div>
                              </td>
                              <td className="grid-row-cell py-6">
                                 <div className="space-y-1">
                                    <p className="text-[13px] font-black text-[var(--ink-900)] tabular-nums">{item.reach} Impressions</p>
                                    <p className="text-[11px] font-bold text-[var(--ink-500)] uppercase tracking-widest">{item.engagement} Velocity</p>
                                 </div>
                              </td>
                              <td className="grid-row-cell py-6 pr-8 text-right">
                                 <button className="p-2.5 text-[var(--ink-400)] hover:text-[var(--ink-900)] hover:bg-[var(--ink-100)] rounded-xl transition-colors">
                                    <MoreVertical size={20} />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
               <div className="p-6 bg-[var(--bg)] text-center border-t border-[var(--border)]">
                  <button className="text-[11px] font-black uppercase tracking-widest text-[var(--ink-500)] hover:text-[var(--ink-900)] transition-colors">View All Archive Operations</button>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
               <div className="command-card p-10 bg-[var(--gc-purple)] text-white rounded-3xl shadow-[var(--shadow-xl)] relative overflow-hidden group">
                  <Users className="absolute -bottom-6 -right-6 text-white/5 size-48 group-hover:scale-110 transition-transform duration-700" />
                  <p className="text-[12px] font-black uppercase tracking-widest opacity-70 mb-4">Creator Sentiment</p>
                  <h4 className="text-5xl font-display font-black tracking-tight mb-8">Very High</h4>
                  <div className="space-y-6 relative z-10">
                     <p className="text-[13px] text-white/90 italic font-medium leading-relaxed border-l-2 border-white/30 pl-5 py-1">
                        "Unrivaled brand alignment with the current summer vibe tracker. Extractions show high organic ripple effect."
                     </p>
                     <div className="flex -space-x-2">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full bg-white/10 border-2 border-[var(--gc-purple)] backdrop-blur-md shadow-sm" />
                        ))}
                        <div className="w-10 h-10 rounded-full bg-white text-[var(--gc-purple)] flex items-center justify-center text-[12px] font-black border-2 border-[var(--gc-purple)] shadow-sm">
                           +8
                        </div>
                     </div>
                  </div>
               </div>
               <div className="command-card p-10 bg-[var(--ink-900)] text-white rounded-3xl relative overflow-hidden shadow-[var(--shadow-lg)]">
                  <p className="text-[12px] font-black uppercase tracking-widest opacity-70 mb-4">Market Coverage</p>
                  <h4 className="text-5xl font-display font-black tracking-tight mb-8">Operational</h4>
                  <div className="space-y-8 relative z-10">
                     <div>
                       <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest mb-3">
                          <span className="text-[var(--ink-400)]">GCC Integration</span>
                          <span className="text-white">82%</span>
                       </div>
                       <div className="h-2 bg-[var(--ink-800)] rounded-full overflow-hidden shadow-inner">
                          <div className="h-full bg-[var(--gc-orange)] shadow-[0_0_10px_var(--gc-orange-soft)]" style={{ width: '82%' }} />
                       </div>
                     </div>
                     <div className="flex items-center gap-5 text-[11px] font-black uppercase tracking-widest text-[var(--ink-500)]">
                        <div className="flex items-center gap-2">
                           <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)] shadow-[0_0_8px_var(--success)]" /> Tier 1
                        </div>
                        <div className="flex items-center gap-2">
                           <div className="w-2.5 h-2.5 rounded-full bg-[var(--warning)] shadow-[0_0_8px_var(--warning)]" /> Tier 2
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Sidebar: Operational Roadmap */}
         <div className="lg:col-span-4 space-y-8">
            <div className="command-card p-10 bg-white border border-[var(--border)] rounded-3xl shadow-sm">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="section-title text-[13px] tracking-widest">Mission Roadmap</h3>
                  <div className="px-3.5 py-1.5 bg-[var(--success)]/10 text-[var(--success)] rounded-lg text-[10px] font-black uppercase tracking-widest">
                     In-Progress
                  </div>
               </div>

               <div className="relative space-y-10">
                  <div className="absolute left-[13px] top-4 bottom-4 w-[2px] bg-[var(--border-strong)]" />
                  {MILESTONES.map((step, idx) => (
                    <div key={idx} className="relative pl-12 group">
                       <div className={cn(
                         "absolute left-0 top-1 w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm border",
                         step.status === 'completed' ? "bg-[var(--success)] text-white shadow-[var(--success)]/20 border-transparent scale-110" :
                         step.status === 'active' ? "bg-[var(--gc-orange)] text-white shadow-[var(--gc-orange-soft)] animate-pulse scale-[1.2] border-transparent" :
                         "bg-[var(--bg)] text-[var(--ink-400)] border-[var(--border-strong)]"
                       )}>
                          {step.status === 'completed' ? <CheckCircle2 size={16} strokeWidth={3} /> : 
                           step.status === 'active' ? <Clock size={16} strokeWidth={3} /> : 
                           <div className="w-2 h-2 rounded-full bg-[var(--ink-300)]" />}
                       </div>
                       <div className="space-y-1">
                          <p className={cn(
                            "text-[13px] font-black uppercase tracking-widest transition-colors",
                            step.status === 'active' ? "text-[var(--ink-900)]" : "text-[var(--ink-500)]"
                          )}>{step.stage}</p>
                          <p className="text-[11px] font-bold text-[var(--ink-400)] tabular-nums uppercase tracking-wide mt-1">{step.date} • <span className={step.status==='active' ? 'text-[var(--gc-orange)]' : ''}>{step.status}</span></p>
                          {step.progress && (
                            <div className="pt-4 space-y-2">
                               <div className="h-1.5 bg-[var(--bg)] border border-[var(--border-strong)] rounded-full overflow-hidden shadow-inner">
                                  <div className="h-full bg-[var(--gc-orange)]" style={{ width: `${step.progress}%` }} />
                               </div>
                               <p className="text-[10px] font-black text-[var(--gc-orange)] uppercase tracking-widest text-right">{step.progress}% Capacity reached</p>
                            </div>
                          )}
                       </div>
                    </div>
                  ))}
               </div>

               <button className="w-full mt-12 py-4 border border-[var(--border-strong)] text-[var(--ink-900)] rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[var(--ink-900)] hover:text-white hover:border-[var(--ink-900)] transition-all shadow-sm">
                  Strategic Oversight Audit
               </button>
            </div>

            <div className="command-card p-10 bg-[var(--bg)] border border-[var(--border)] rounded-3xl shadow-sm group relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 text-[var(--ink-300)] opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
                  <BarChart3 size={140} strokeWidth={1} />
               </div>
               <h4 className="section-title text-[12px] tracking-widest uppercase opacity-70 mb-8 relative z-10">Internal Resource Sync</h4>
               <div className="space-y-6 relative z-10">
                  <div className="flex gap-4 items-center">
                     <div className="w-14 h-14 rounded-2xl bg-white border border-[var(--border-strong)] flex items-center justify-center text-[var(--ink-900)] shadow-sm font-display font-black text-[14px]">
                        AE
                     </div>
                     <div>
                        <p className="text-[14px] font-black text-[var(--ink-900)]">Ahmed Essmat</p>
                        <p className="text-[11px] font-bold text-[var(--ink-500)] uppercase tracking-widest mt-1">Internal Mission Lead</p>
                     </div>
                  </div>
                  <div className="flex gap-4 items-center">
                     <div className="w-14 h-14 rounded-2xl bg-[var(--ink-900)] flex items-center justify-center text-white shadow-[var(--shadow-md)] font-display font-black text-[14px]">
                        MK
                     </div>
                     <div>
                        <p className="text-[14px] font-black text-[var(--ink-900)]">Mona Khalid <span className="text-[var(--ink-400)]">(STC)</span></p>
                        <p className="text-[11px] font-bold text-[var(--ink-500)] uppercase tracking-widest mt-1">Client Primary Owner</p>
                     </div>
                  </div>
               </div>
               <div className="mt-8 p-4 bg-white border border-[var(--border-strong)] rounded-2xl shadow-sm relative z-10">
                  <div className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-[var(--ink-500)]">
                     <Clock size={16} className="text-[var(--gc-orange)]" /> Last Activity Sync: 4m ago
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
