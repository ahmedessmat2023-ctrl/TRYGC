import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
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
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown
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
  const [sortConfig, setSortConfig] = useState<{ key: keyof CampaignInfluencer, direction: 'asc' | 'desc' } | null>(null);

  const [selectedNiche, setSelectedNiche] = useState<string>('all');
  const [selectedRange, setSelectedRange] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const niches = useMemo(() => {
    const list = influencers.map(i => i.niche).filter(Boolean) as string[];
    return ['all', ...Array.from(new Set(list))];
  }, [influencers]);

  const ranges = ['all', '10k-50k', '50k-100k', '100k-500k', '500k-1M'];

  const filteredInfluencers = influencers.filter(inf => {
    const matchesSearch = inf.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inf.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inf.city || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesNiche = selectedNiche === 'all' || inf.niche === selectedNiche;
    const matchesRange = selectedRange === 'all' || inf.followerRange === selectedRange;

    return matchesSearch && matchesNiche && matchesRange;
  });

  const sortedInfluencers = useMemo(() => {
    let sortableItems = [...filteredInfluencers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue = (a[sortConfig.key] || '').toString().toLowerCase();
        let bValue = (b[sortConfig.key] || '').toString().toLowerCase();
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredInfluencers, sortConfig]);

  const handleSort = (key: keyof CampaignInfluencer) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

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
    if (selectedIds.length === sortedInfluencers.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(sortedInfluencers.map(i => i.id));
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

  const SortableHeader = ({ label, sortKey }: { label: string, sortKey: keyof CampaignInfluencer }) => {
    const isActive = sortConfig?.key === sortKey;
    return (
      <button 
        onClick={() => handleSort(sortKey)} 
        className={cn(
          "flex items-center gap-2 hover:text-[var(--ink-900)] transition-colors outline-none",
          isActive ? "text-[var(--ink-900)]" : "text-[var(--ink-400)]"
        )}
      >
        {label}
        {isActive ? (
          sortConfig.direction === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
        ) : (
          <ArrowUpDown size={14} className="opacity-40" />
        )}
      </button>
    );
  };

  return (
    <div className="max-w-[1240px] mx-auto space-y-8 animate-in fade-in duration-500 relative pb-24">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="section-kicker">Roster Integrity</div>
          <h2 className="section-title text-4xl">Influencer Corps</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-2 font-mono text-[13px]">
            <Users size={16} className="text-[var(--gc-purple)]" />
            Managing active influencer roster across <span className="font-bold text-[var(--ink-900)]">{influencers.length}</span> operations.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-white border border-[var(--border)] rounded-full p-1.5 shadow-sm">
             <button 
               onClick={() => setViewMode('list')}
               className={cn("p-2.5 rounded-full transition-all", viewMode === 'list' ? "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] shadow-sm" : "text-[var(--ink-400)] hover:bg-[var(--bg)] hover:text-[var(--ink-700)]")}
             >
               <List size={20} />
             </button>
             <button 
               onClick={() => setViewMode('grid')}
               className={cn("p-2.5 rounded-full transition-all", viewMode === 'grid' ? "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] shadow-sm" : "text-[var(--ink-400)] hover:bg-[var(--bg)] hover:text-[var(--ink-700)]")}
             >
               <LayoutGrid size={20} />
             </button>
          </div>
          <button className="btn-primary flex items-center gap-2 shadow-[var(--shadow-lg)] px-6 py-3.5 h-auto text-[12px]">
            <UserPlus size={18} /> Recruit Influencer
          </button>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[var(--ink-900)] text-white px-8 py-5 rounded-full shadow-[var(--shadow-xl)] flex items-center gap-6 animate-in slide-in-from-bottom-8 duration-300 border border-[var(--ink-700)]">
           <div className="flex items-center gap-4 pr-6 border-r border-[var(--ink-700)]">
              <div className="w-8 h-8 rounded-full bg-[var(--gc-purple)] flex items-center justify-center font-bold text-[14px]">
                 {selectedIds.length}
              </div>
              <p className="text-[13px] font-bold tracking-tight text-white uppercase">Selected</p>
           </div>
           
           <div className="flex items-center gap-2">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-[var(--ink-300)] mr-3">Bulk Status Update:</p>
              {['Pending', 'Invited', 'Confirmed', 'Scheduled', 'Completed', 'Dropped'].map(s => (
                <button 
                  key={s}
                  onClick={() => handleBulkStatusChange(s as any)}
                  disabled={isBulkUpdating}
                  className="px-5 py-2.5 rounded-full text-[11px] font-display font-extrabold uppercase tracking-widest bg-[var(--ink-700)] hover:bg-[var(--gc-purple)] hover:text-white transition-colors border border-transparent disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
           </div>

           <div className="pl-6 border-l border-[var(--ink-700)] flex items-center gap-3">
              <button 
                onClick={() => setSelectedIds([])}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--ink-700)] text-[var(--ink-300)] hover:text-white hover:bg-[var(--danger)] transition-colors"
                title="Cancel selection"
              >
                <X size={18} />
              </button>
           </div>
           
           {isBulkUpdating && (
             <div className="absolute inset-x-0 -bottom-1 px-4">
                <div className="h-[3px] w-full bg-[var(--ink-700)] rounded-full overflow-hidden">
                   <div className="h-full bg-[var(--gc-purple)] animate-pulse" style={{ width: '100%' }} />
                </div>
             </div>
           )}
        </div>
      )}

      <div className="command-card shadow-sm border border-[var(--border)] bg-white overflow-hidden">
        <div className="p-6 border-b border-[var(--border)] flex flex-col gap-6 bg-[var(--bg)]/50">
           <div className="flex justify-between items-center">
              <div className="relative w-[380px]">
                 <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--ink-400)] peer-focus:text-[var(--gc-purple)] transition-colors" />
                 <input 
                   className="peer w-full pl-12 pr-4 py-3.5 text-[13px] outline-none font-bold bg-white border border-[var(--border-strong)] rounded-full focus:border-[var(--gc-purple)] focus:ring-[4px] focus:ring-[var(--gc-purple-soft)] transition-all shadow-sm placeholder:text-[var(--ink-300)] text-[var(--ink-900)]" 
                   placeholder="Search by username, platform, city..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                 />
              </div>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3.5 border rounded-full text-[12px] font-display font-bold uppercase tracking-widest transition-all shadow-sm",
                  isFilterOpen ? "bg-slate-900 text-white border-slate-900" : "bg-white text-[var(--ink-700)] border-[var(--border-strong)] hover:bg-[var(--bg)]"
                )}
              >
                 <Filter strokeWidth={2.5} size={16} /> Global Filters
              </button>
           </div>

           {isFilterOpen && (
             <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-2"
             >
                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Content Pillar (Niche)</label>
                   <select 
                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all cursor-pointer shadow-sm"
                     value={selectedNiche}
                     onChange={e => setSelectedNiche(e.target.value)}
                   >
                     {niches.map(n => <option key={n} value={n}>{n.toUpperCase()}</option>)}
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Follower Range</label>
                   <select 
                     className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all cursor-pointer shadow-sm"
                     value={selectedRange}
                     onChange={e => setSelectedRange(e.target.value)}
                   >
                     {ranges.map(r => <option key={r} value={r}>{r.toUpperCase()}</option>)}
                   </select>
                </div>

                <div className="flex items-end">
                   <button 
                     onClick={() => {
                       setSelectedNiche('all');
                       setSelectedRange('all');
                       setSearchQuery('');
                     }}
                     className="text-[10px] font-black uppercase tracking-widest text-[var(--gc-orange)] hover:underline underline-offset-4"
                   >
                      Reset All Filters
                   </button>
                </div>
             </motion.div>
           )}
        </div>

        {viewMode === 'list' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[var(--bg)]">
                <tr>
                  <th className="grid-header-cell w-[70px] pl-6 border-b border-[var(--border)] py-4">
                     <button 
                       onClick={toggleSelectAll}
                       className="p-1.5 hover:bg-[var(--ink-100)] rounded-md transition-colors"
                     >
                       {selectedIds.length === sortedInfluencers.length && sortedInfluencers.length > 0 
                         ? <CheckSquare size={20} className="text-[var(--gc-purple)]" /> 
                         : <Square size={20} className="text-[var(--ink-300)]" />}
                     </button>
                  </th>
                  <th className="grid-header-cell border-b border-[var(--border)] py-4"><SortableHeader label="Influencer Identity" sortKey="username" /></th>
                  <th className="grid-header-cell border-b border-[var(--border)] py-4"><SortableHeader label="Platform" sortKey="platform" /></th>
                  <th className="grid-header-cell border-b border-[var(--border)] py-4"><SortableHeader label="Operational Status" sortKey="status" /></th>
                  <th className="grid-header-cell border-b border-[var(--border)] py-4"><SortableHeader label="City / Market" sortKey="city" /></th>
                  <th className="grid-header-cell border-b border-[var(--border)] pr-6 text-right py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)] bg-white">
                {sortedInfluencers.length > 0 ? sortedInfluencers.map((inf) => (
                  <tr 
                    key={inf.id} 
                    className={cn(
                      "grid-row-cell group transition-all border-l-4 border-transparent",
                      selectedIds.includes(inf.id) ? "bg-[var(--gc-purple-soft)]/30 border-l-[var(--gc-purple)]" : "hover:bg-[var(--bg)] hover:border-l-[var(--ink-300)]"
                    )}
                  >
                    <td className="px-6 py-5">
                       <button 
                         onClick={() => toggleSelect(inf.id)}
                         className="p-1.5 rounded-md hover:bg-white"
                       >
                         {selectedIds.includes(inf.id) 
                           ? <CheckSquare size={20} className="text-[var(--gc-purple)]" /> 
                           : <Square size={20} className="text-[var(--ink-300)] group-hover:text-[var(--ink-500)] transition-colors" />}
                       </button>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[var(--bg)] flex items-center justify-center font-display font-black text-[var(--gc-purple)] border border-[var(--border-strong)] shadow-sm">
                          {inf.username.substring(1, 2).toUpperCase()}
                        </div>
                        <div>
                          <input 
                            className="text-[14px] font-bold text-[var(--ink-900)] bg-transparent border-none outline-none focus:ring-[2px] focus:ring-[var(--gc-purple-mid)] rounded px-1 -mx-1 transition-all block w-[160px] cursor-text hover:bg-[var(--ink-100)] focus:bg-white"
                            value={inf.username}
                            onChange={(e) => {
                              const updated = dataService.updateInfluencer(inf.id, { username: e.target.value });
                              setInfluencers(updated);
                            }}
                          />
                          <p className="text-[11px] text-[var(--ink-400)] font-mono mt-1 uppercase tracking-wider pl-1">ID-{inf.influencerId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                       <select 
                         value={inf.platform}
                         onChange={(e) => {
                           const updated = dataService.updateInfluencer(inf.id, { platform: e.target.value });
                           setInfluencers(updated);
                         }}
                         className="text-[12px] font-bold text-[var(--ink-700)] bg-transparent outline-none cursor-pointer hover:bg-[var(--ink-100)] px-2 py-1 -mx-2 rounded transition-colors"
                       >
                         {['Instagram', 'TikTok', 'Snapchat', 'YouTube'].map(p => <option key={p} value={p}>{p}</option>)}
                       </select>
                    </td>
                    <td className="px-6 py-5">
                       <select 
                         value={inf.status}
                         onChange={(e) => handleUpdateStatus(inf.id, e.target.value as any)}
                         className={cn(
                           "text-[10px] font-display font-black uppercase tracking-widest px-3.5 py-1.5 rounded-md outline-none cursor-pointer transition-colors border shadow-sm",
                           inf.status === 'Confirmed' || inf.status === 'Completed' ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20 hover:bg-[var(--success)]/20" :
                           inf.status === 'Pending' || inf.status === 'Scheduled' ? "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20 hover:bg-[var(--warning)]/20" : 
                           "bg-[var(--bg)] text-[var(--ink-700)] border-[var(--border-strong)] hover:bg-[var(--ink-100)]"
                         )}
                       >
                         {['Pending', 'Invited', 'Confirmed', 'Scheduled', 'Completed', 'Dropped'].map(s => <option key={s} value={s}>{s}</option>)}
                       </select>
                    </td>
                    <td className="px-6 py-5">
                       <input 
                         className="text-[13px] font-bold text-[var(--ink-700)] bg-transparent border-none outline-none focus:ring-[2px] focus:ring-[var(--gc-purple-mid)] rounded px-2 py-1 -mx-2 transition-all w-[120px] cursor-text hover:bg-[var(--ink-100)] focus:bg-white"
                         value={inf.city || 'Riyadh'}
                         onChange={(e) => handleUpdateCity(inf.id, e.target.value)}
                         placeholder="Enter city..."
                       />
                    </td>
                    <td className="px-6 py-5 pr-8 text-right">
                       <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => navigate(`/influencer/${inf.id}`)}
                            className="p-2.5 text-[var(--ink-400)] hover:text-[var(--gc-purple)] hover:bg-[var(--gc-purple-soft)] rounded-md transition-all shadow-sm bg-white border border-[var(--border)]"
                            title="View Profile"
                          >
                             <ExternalLink size={18} />
                          </button>
                       </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="p-16 text-center text-[var(--ink-400)] font-medium text-[14px]">No operations matched your filter.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 bg-[var(--bg)]/50">
             {sortedInfluencers.map(inf => (
               <div 
                 key={inf.id} 
                 onClick={() => toggleSelect(inf.id)}
                 className={cn(
                   "command-card p-8 flex flex-col items-center text-center group relative cursor-pointer outline outline-0 outline-[var(--gc-purple)] bg-white shadow-sm hover:shadow-[var(--shadow-md)]",
                   selectedIds.includes(inf.id) ? "outline-2 bg-[var(--gc-purple-soft)]/20 scale-[0.98] shadow-sm transform-none" : "hover:-translate-y-1"
                 )}
               >
                  {selectedIds.includes(inf.id) && (
                    <div className="absolute top-4 right-4 text-[var(--gc-purple)] bg-white rounded-full">
                       <CheckCircle2 size={24} />
                    </div>
                  )}
                  <div className="w-[84px] h-[84px] rounded-2xl bg-[var(--bg)] border border-[var(--border-strong)] text-[var(--gc-purple)] flex items-center justify-center font-display font-black text-3xl mb-6 group-hover:rotate-[10deg] transition-transform shadow-sm">
                    {inf.username.substring(1, 2).toUpperCase()}
                  </div>
                  <h3 className="text-[16px] font-bold text-[var(--ink-900)] mb-1 tracking-tight">{inf.username}</h3>
                  <p className="text-[12px] font-mono font-bold text-[var(--ink-500)] mb-6 uppercase tracking-wider">{inf.platform}</p>
                  
                  <div className={cn(
                    "w-full py-2.5 rounded-lg text-[10px] font-display font-black uppercase tracking-widest mb-6 border shadow-sm",
                    inf.status === 'Confirmed' || inf.status === 'Completed' ? "bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20" :
                    inf.status === 'Pending' || inf.status === 'Scheduled' ? "bg-[var(--warning)]/10 text-[var(--warning)] border-[var(--warning)]/20" : 
                    "bg-[var(--bg)] text-[var(--ink-500)] border-[var(--border-strong)]"
                  )}>
                    {inf.status}
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/influencer/${inf.id}`);
                    }}
                    className="w-full py-4 border border-[var(--border-strong)] rounded-xl text-[11px] font-display font-black uppercase tracking-widest text-[var(--ink-700)] hover:bg-[var(--gc-purple)] hover:text-white hover:border-[var(--gc-purple)] transition-all shadow-sm"
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
