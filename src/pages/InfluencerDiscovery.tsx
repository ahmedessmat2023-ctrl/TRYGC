/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Sparkles, UserPlus, Loader2, Globe, Target, Hash } from 'lucide-react';
import { discoverInfluencers, SuggestedInfluencer } from '../services/geminiService';

export default function InfluencerDiscovery() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SuggestedInfluencer[]>([]);
  const [criteria, setCriteria] = useState({
    country: '',
    niche: '',
    range: '100k-500k',
    count: 5
  });

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
      alert("Discovery failed. Please verify your Gemini API key in secrets.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
            <Sparkles className="text-[var(--accent)]" size={24} />
            AI Influencer Discovery
          </h2>
          <p className="text-slate-500 text-sm">Grounding-driven search powered by Google Gemini & Search.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Search Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <form onSubmit={handleSearch} className="command-card p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Discovery Criteria</h3>
            
            <div className="space-y-2">
              <label className="data-label flex items-center gap-1.5"><Globe size={10}/> Country</label>
              <input 
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50"
                placeholder="e.g. Saudi Arabia"
                value={criteria.country}
                onChange={e => setCriteria({...criteria, country: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="data-label flex items-center gap-1.5"><Hash size={10}/> Niche</label>
              <input 
                required
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50"
                placeholder="e.g. Luxury Lifestyle"
                value={criteria.niche}
                onChange={e => setCriteria({...criteria, niche: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="data-label flex items-center gap-1.5"><Target size={10}/> Follower Range</label>
              <select 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                value={criteria.range}
                onChange={e => setCriteria({...criteria, range: e.target.value})}
              >
                <option value="10k-50k">Micro (10k-50k)</option>
                <option value="50k-100k">Mid-Tier (50k-100k)</option>
                <option value="100k-500k">Macro (100k-500k)</option>
                <option value="500k-1M">Mega (500k-1M+)</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100">
               <button 
                 type="submit"
                 disabled={loading}
                 className="w-full py-2 bg-[var(--accent)] text-white text-sm font-bold rounded-lg hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
               >
                 {loading ? <Loader2 className="animate-spin" size={16} /> : <Search size={16} />}
                 {loading ? 'Searching...' : 'Extract Data'}
               </button>
            </div>
          </form>
        </div>

        {/* Results Workspace */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="command-card p-12 text-center bg-white flex flex-col items-center gap-4">
               <div className="w-12 h-12 bg-blue-50 text-[var(--accent)] rounded-full flex items-center justify-center animate-pulse">
                  <Globe size={24} />
               </div>
               <h3 className="font-bold text-lg">Cross-referencing Global Data Streams</h3>
               <p className="text-sm text-slate-500 max-w-md">Our AI is currently using Google Search to identify and verify creators that match your ${criteria.niche} requirements in ${criteria.country}.</p>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              {results.map((inf, idx) => (
                <div key={idx} className="command-card p-6 bg-white hover:border-[var(--accent)] transition-all group relative overflow-hidden">
                  <div className="flex justify-between items-start relative z-10">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-slate-900">@{inf.handle}</h4>
                        <span className="stage-tag bg-blue-50 text-blue-700">{inf.platform}</span>
                      </div>
                      <p className="text-sm text-slate-600 font-medium">{inf.location} • {inf.niche}</p>
                      <p className="text-xs text-slate-400 mt-2 italic leading-relaxed max-w-2xl font-mono">
                        " {inf.relevanceReason} "
                      </p>
                    </div>
                    
                    <div className="flex gap-6 text-right">
                       <div className="space-y-0.5">
                         <p className="data-label">Followers</p>
                         <p className="text-lg font-bold font-mono tracking-tight">{inf.followers}</p>
                       </div>
                       <div className="space-y-0.5">
                         <p className="data-label text-[var(--success)]">Engagement</p>
                         <p className="text-lg font-bold font-mono tracking-tight text-emerald-600">{inf.engagement}</p>
                       </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-50 flex justify-end">
                    <button className="flex items-center gap-2 px-3 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded hover:bg-[var(--accent)] hover:text-white transition-all">
                      <UserPlus size={14} />
                      Add to Campaign Registry
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="command-card p-20 text-center bg-slate-50 border-dashed">
               <Globe className="mx-auto text-slate-300 mb-4" size={48} />
               <h3 className="font-bold text-slate-400 uppercase tracking-widest text-sm">Awaiting Input Parameters</h3>
               <p className="text-slate-400 text-sm mt-2">Enter search criteria to generate high-performance influencer targets.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
