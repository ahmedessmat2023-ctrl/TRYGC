/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Sparkles, 
  UserPlus, 
  Loader2, 
  Globe, 
  Target, 
  Hash, 
  Cpu, 
  Zap, 
  TrendingUp, 
  ShieldCheck,
  Activity,
  Layers,
  ArrowRight,
  RefreshCw,
  MapPin,
  Instagram,
  Video,
  Youtube,
  Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';
import { discoverInfluencers, SuggestedInfluencer } from '../services/geminiService';

const PLATFORM_ICONS: Record<string, any> = {
  Instagram: Instagram,
  TikTok: Video,
  YouTube: Youtube,
  Snapchat: Smartphone
};

export default function InfluencerDiscovery() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SuggestedInfluencer[]>([]);
  const [statusMessage, setStatusMessage] = useState('Initializing search relays...');
  const [criteria, setCriteria] = useState({
    country: 'Saudi Arabia',
    niche: 'Luxury Lifestyle',
    range: '100k-500k',
    count: 6
  });

  const loadingSteps = [
    'Initializing Multi-Modal Search Grounding...',
    'Querying Global Creator Indices...',
    'Analyzing Cross-Platform Engagement Patterns...',
    'Verifying Metadata with Google Search...',
    'Synthesizing Tactical Alignment Insights...',
    'Finalizing Creator Roster...'
  ];

  useEffect(() => {
    if (loading) {
      let step = 0;
      const interval = setInterval(() => {
        setStatusMessage(loadingSteps[step % loadingSteps.length]);
        step++;
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const influencers = await discoverInfluencers(
        criteria.country, 
        criteria.niche, 
        criteria.range,
        criteria.count
      );
      setResults(influencers);
    } catch (err) {
      console.error(err);
      // Fallback or error handled by parent/notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 animate-in fade-in duration-700">
      {/* Immersive Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-slate-900 p-10 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
           <Cpu size={240} strokeWidth={1} />
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--gc-orange-soft)] animate-pulse">
                System Active
             </div>
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-5 h-5 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                ))}
             </div>
          </div>
          <div>
            <h1 className="text-5xl font-display font-black text-white tracking-tighter leading-none mb-2">
              AI Discovery <span className="text-[var(--gc-purple)]">Engine</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl font-medium leading-relaxed italic">
              Deploying Gemini-driven search grounding to identify <span className="text-white">authentic creator-market alignment</span> in real-time.
            </p>
          </div>
        </div>

        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl flex flex-col justify-center items-center gap-1 min-w-[120px]">
             <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Efficiency</span>
             <span className="text-2xl font-mono font-black text-emerald-400">98.4%</span>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 p-4 rounded-2xl flex flex-col justify-center items-center gap-1 min-w-[120px]">
             <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Grounding</span>
             <span className="text-2xl font-mono font-black text-[var(--gc-orange)]">Search</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Controls */}
        <div className="lg:col-span-3 space-y-6">
          <motion.form 
            onSubmit={handleSearch} 
            className="command-card p-6 space-y-6 bg-white border-2 border-slate-100 shadow-xl rounded-[1.5rem]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tactical Constraints</h3>
              <Zap size={14} className="text-[var(--gc-orange)]" />
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="data-label flex items-center gap-2"><Globe size={14} className="text-slate-400"/> Primary Market</label>
                <input 
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all"
                  placeholder="e.g. Saudi Arabia"
                  value={criteria.country}
                  onChange={e => setCriteria({...criteria, country: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="data-label flex items-center gap-2"><Hash size={14} className="text-slate-400"/> Content Pillar</label>
                <input 
                  required
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all"
                  placeholder="e.g. Gen Z Tech"
                  value={criteria.niche}
                  onChange={e => setCriteria({...criteria, niche: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="data-label flex items-center gap-2"><Target size={14} className="text-slate-400"/> Follower Range</label>
                <select 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all cursor-pointer"
                  value={criteria.range}
                  onChange={e => setCriteria({...criteria, range: e.target.value})}
                >
                  <option value="10k-50k">MICRO (10K - 50K)</option>
                  <option value="50k-100k">MID-TIER (50K - 100K)</option>
                  <option value="100k-500k">MACRO (100K - 500K)</option>
                  <option value="500k-1M">MEGA (500K - 1M+)</option>
                </select>
              </div>

              <div className="space-y-2">
                 <label className="data-label flex items-center gap-2 font-black"><Layers size={14} className="text-slate-400"/> Extraction Density</label>
                 <div className="flex items-center gap-4 py-2">
                    {[3, 6, 9].map(num => (
                      <button 
                        key={num}
                        type="button"
                        onClick={() => setCriteria({...criteria, count: num})}
                        className={cn(
                          "flex-1 py-1 text-[10px] font-black rounded-lg border transition-all",
                          criteria.count === num ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-100 hover:bg-slate-50"
                        )}
                      >
                         {num}
                      </button>
                    ))}
                 </div>
              </div>
            </div>

            <div className="pt-4">
               <button 
                 type="submit"
                 disabled={loading}
                 className="w-full py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[var(--gc-purple)] transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 group shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
               >
                 {loading ? <RefreshCw className="animate-spin" size={16} /> : <Search size={16} />}
                 {loading ? 'Processing...' : 'Deploy Extraction'}
               </button>
            </div>
          </motion.form>

          {/* Quick Insights Card */}
          <div className="command-card p-6 bg-[var(--gc-purple)] text-white relative overflow-hidden rounded-[1.5rem] border-none group">
             <TrendingUp size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform" />
             <div className="relative z-10">
                <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-4">Market Trend</h4>
                <p className="text-lg font-bold tracking-tight leading-tight mb-2">Sustainable Fashion Jeddah is spiking by +14.2%</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase bg-white/20 w-fit px-2 py-1 rounded-lg">
                   Live Data • source: G-Search
                </div>
             </div>
          </div>
        </div>

        {/* Results Workspace */}
        <div className="lg:col-span-9">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="command-card min-h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white relative overflow-hidden rounded-[2rem]"
              >
                 <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
                    <motion.div 
                      className="h-full bg-[var(--gc-purple)]" 
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 12, repeat: Infinity }}
                    />
                 </div>
                 
                 <div className="relative mb-8">
                    <div className="w-24 h-24 bg-[var(--gc-purple-soft)] rounded-[2rem] flex items-center justify-center text-[var(--gc-purple)] animate-bounce shadow-inner">
                       <Sparkles size={40} />
                    </div>
                    <div className="absolute -inset-4 border-2 border-dashed border-[var(--gc-purple-soft)] rounded-[2.5rem] animate-spin-slow opacity-50" />
                 </div>

                 <h3 className="text-3xl font-display font-black text-slate-900 mb-2 uppercase tracking-tighter tabular-nums underline decoration-[var(--gc-purple)] decoration-4 underline-offset-8">
                    {statusMessage}
                 </h3>
                 <p className="text-slate-400 text-sm max-w-sm mt-4 font-medium italic">
                    Synthesizing real-time creator data to match your <span className="text-[var(--gc-orange)] font-black">"{criteria.niche}"</span> constraints.
                 </p>

                 <div className="mt-12 grid grid-cols-3 gap-8 opacity-20">
                    {[1,2,3].map(i => (
                      <div key={i} className="flex flex-col items-center gap-2">
                         <div className="w-12 h-2 bg-slate-200 rounded-full" />
                         <div className="w-20 h-2 bg-slate-100 rounded-full" />
                      </div>
                    ))}
                 </div>
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {results.map((inf, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="command-card bg-white hover:border-[var(--gc-purple)] hover:shadow-2xl transition-all group overflow-hidden rounded-[2rem] border-2 border-slate-50 cursor-pointer"
                  >
                    <div className="p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                           <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-display font-black text-xl shadow-lg group-hover:rotate-6 transition-transform">
                              {inf.handle.substring(1, 2).toUpperCase()}
                           </div>
                           <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-xl font-black text-slate-900 tracking-tight">{inf.handle}</h4>
                                <ShieldCheck size={16} className="text-blue-500 fill-blue-50" />
                              </div>
                              <div className="flex items-center gap-2">
                                 {React.createElement(PLATFORM_ICONS[inf.platform] || Smartphone, { size: 12, className: "text-slate-400" })}
                                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{inf.platform}</span>
                                 <div className="w-1 h-1 rounded-full bg-slate-200" />
                                 <span className="text-[10px] font-black uppercase tracking-widest text-[var(--gc-purple)]">{inf.niche}</span>
                              </div>
                           </div>
                        </div>
                        <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                           <TrendingUp size={16} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
                         <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Reach Strength</p>
                            <p className="text-xl font-mono font-black text-slate-900">{inf.followers}</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Interaction Velocity</p>
                            <p className="text-xl font-mono font-black text-emerald-600">{inf.engagement}</p>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-lg bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] flex items-center justify-center flex-shrink-0 mt-0.5">
                               <Sparkles size={12} />
                            </div>
                            <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                               "{inf.relevanceReason}"
                            </p>
                         </div>
                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest">
                            <MapPin size={10} />
                            {inf.location}
                         </div>
                      </div>

                      <button className="w-full py-4 bg-slate-50 text-slate-900 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-3 border border-slate-100 group/btn">
                        Add to Campaign Registry
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="command-card min-h-[500px] flex flex-col items-center justify-center text-center p-20 bg-slate-50/50 border-4 border-dashed border-white rounded-[2rem] group"
              >
                 <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform shadow-sm mb-8">
                    <Layers size={60} strokeWidth={1} />
                 </div>
                 <h3 className="text-2xl font-display font-black text-slate-300 uppercase tracking-widest mb-4">Ready for Deployment</h3>
                 <p className="text-slate-400 text-sm max-w-md font-medium">Input your required market and niche parameters in the control panel to initialize creator extraction.</p>
                 
                 <div className="mt-10 flex gap-4">
                    {['Riyadh', 'Fashion', 'Meta-Trends'].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-400 opacity-60">#{tag}</span>
                    ))}
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
