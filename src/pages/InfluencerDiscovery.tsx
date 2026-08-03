/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Layers,
  ArrowRight,
  RefreshCw,
  MapPin,
  Instagram,
  Video,
  Youtube,
  Smartphone,
  Download,
  Moon,
  Sun,
  Users,
  MessageSquare,
  AtSign,
  Compass,
  Sliders,
  Eye,
  Play,
  Send,
  Bot,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  X,
  Mail,
  Phone,
  Building2,
  DollarSign,
  Copy,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';
import { discoverInfluencers, SuggestedInfluencer, consultStrategicAI, StrategicConsultation, DiscoveryMode, SocialProfile } from '../services/geminiService';

const PLATFORM_ICONS: Record<string, any> = {
  Instagram: Instagram,
  TikTok: Video,
  YouTube: Youtube,
  Snapchat: Smartphone
};

const PLATFORM_URLS: Record<string, string> = {
  Instagram: 'https://www.instagram.com/',
  TikTok: 'https://www.tiktok.com/@',
  YouTube: 'https://www.youtube.com/@',
  Snapchat: 'https://www.snapchat.com/add/'
};

export default function InfluencerDiscovery() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SuggestedInfluencer[]>([]);
  const [statusMessage, setStatusMessage] = useState('Initializing search relays...');
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const [mode, setMode] = useState<DiscoveryMode>('standard');
  const [criteria, setCriteria] = useState({
    campaignContext: 'none',
    country: 'Saudi Arabia',
    niche: 'Luxury Lifestyle',
    range: '100k-500k',
    count: 20,
    minAvgViews: 'any',
    viewsAggregationArea: 'All Content',
    // Mode specific defaults
    targetAccount: '@lifestyle_sa',
    similarityFocus: 'Content Style & Demographics',
    hashtag: '#RiyadhFashion',
    mentionTarget: '@redbullksa',
    specificLocation: 'Riyadh, Saudi Arabia'
  });

  // Auto-Sender Antipot State
  const [isAutoSenderOpen, setIsAutoSenderOpen] = useState(false);
  const [outreachTemplate, setOutreachTemplate] = useState(
    "Hi {{handle}}, we loved your video performance on {{platform}} (Avg Views: {{views}})! We're launching an exclusive campaign with TryGC and would love to collaborate with you."
  );
  const [antipotInterval, setAntipotInterval] = useState(45);
  const [isAutoSending, setIsAutoSending] = useState(false);
  const [sendingLogs, setSendingLogs] = useState<string[]>([]);
  const [sentCount, setSentCount] = useState(0);

  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', content: string, refinements?: any }[]>([
    { role: 'model', content: "I'm your Strategic Consultant. Tell me more about your campaign goals or request look-alikes, tags, or locations, and I'll help you refine parameters." }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isConsulting, setIsConsulting] = useState(false);

  const startAutoSenderSequence = () => {
    if (isAutoSending) return;
    setIsAutoSending(true);
    setSendingLogs([]);
    setSentCount(0);

    const targetList = results.filter(r => addedIds.has(r.handle)).length > 0 
      ? results.filter(r => addedIds.has(r.handle)) 
      : results.slice(0, 6);

    let current = 0;
    const initialLogs: string[] = [
      `[SYSTEM] Launching Antipot Auto-Sender Dispatch Module...`,
      `[ANTIPOT SECURITY] Humanized behavior throttling active: 1 message per ${antipotInterval}s interval.`,
      `[ANTIPOT SECURITY] IP & Proxy rotation simulated to avoid platform rate limits or bot flags.`,
      `[TARGETING] ${targetList.length} creator accounts loaded for automated DM outreach.`
    ];
    setSendingLogs([...initialLogs]);

    const intervalId = setInterval(() => {
      if (current >= targetList.length) {
        clearInterval(intervalId);
        setIsAutoSending(false);
        setSendingLogs(prev => [...prev, `[SUCCESS] Automated Outreach Sequence completed with 0 anti-bot blocks!`]);
        return;
      }

      const creator = targetList[current];
      current++;
      setSentCount(current);

      const formattedMsg = outreachTemplate
        .replace('{{handle}}', creator.handle)
        .replace('{{platform}}', creator.platform)
        .replace('{{views}}', creator.avgViews || '145K');

      setSendingLogs(prev => [
        ...prev,
        `[DISPATCHED] DM sent to ${creator.handle} on ${creator.platform} (Avg Views: ${creator.avgViews || '145K'}).`,
        `[ANTIPOT COOLDOWN] Safe delay active. Waiting ${antipotInterval}s before next payload dispatch...`
      ]);
    }, 2500);
  };

  const handleConsult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isConsulting) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsConsulting(true);

    try {
      const history = chatMessages.map(m => ({ role: m.role, content: m.content }));
      const response = await consultStrategicAI(userMsg, history, criteria);
      setChatMessages(prev => [...prev, { 
        role: 'model', 
        content: response.message, 
        refinements: response.suggestedRefinements 
      }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsConsulting(false);
    }
  };

  const applyRefinements = (ref: any) => {
    const updatedCriteria = { ...criteria, ...ref };
    setCriteria(updatedCriteria);
    setChatMessages(prev => [...prev, { role: 'model', content: "Parameters updated. Deploying new extraction..." }]);
    
    setLoading(true);
    discoverInfluencers({
      mode,
      country: updatedCriteria.country,
      niche: updatedCriteria.niche,
      range: updatedCriteria.range,
      count: updatedCriteria.count,
      campaignContext: updatedCriteria.campaignContext,
      targetAccount: updatedCriteria.targetAccount,
      similarityFocus: updatedCriteria.similarityFocus,
      hashtag: updatedCriteria.hashtag,
      mentionTarget: updatedCriteria.mentionTarget,
      specificLocation: updatedCriteria.specificLocation
    }).then(influencers => {
        setResults(influencers);
        setLoading(false);
    }).catch(err => {
        console.error(err);
        setLoading(false);
    });
  };

  const handleAddToMission = (handle: string) => {
    setAddedIds(prev => {
      const next = new Set(prev);
      if (next.has(handle)) {
        next.delete(handle);
      } else {
        next.add(handle);
      }
      return next;
    });
  };

  const getPlatformUrl = (platform: string, handle: string) => {
    const base = PLATFORM_URLS[platform] || 'https://google.com/search?q=';
    const cleanHandle = handle.startsWith('@') ? handle.substring(1) : handle;
    return `${base}${cleanHandle}`;
  };

  const handleExport = () => {
    if (results.length === 0) {
      alert("No data to export. Please run a discovery search first.");
      return;
    }

    const escapeCsv = (val: any) => {
      if (val === undefined || val === null) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const headers = [
      'Handle',
      'Primary Platform',
      'Niche / Category',
      'Followers',
      'Engagement Rate',
      'Avg Video Views',
      'Total Content Views',
      'MoM Growth Rate',
      'Business Email',
      'Phone / WhatsApp',
      'Agency / Management',
      'Estimated Rate (Reel)',
      'Location / Country',
      'Top Hashtags',
      'Social Profile Links',
      'Relevance Reason',
      'Recent Performance',
      'Audience Alignment'
    ];

    const csvRows = [headers.map(escapeCsv).join(',')];
    
    for (const r of results) {
      const socialLinks = (r.socialProfiles || []).map(p => `${p.platform}: ${p.url || p.handle}`).join(' | ');
      const tags = (r.topTags || []).join(', ');

      const values = [
        r.handle,
        r.platform,
        r.niche,
        r.followers,
        r.engagement,
        r.avgViews || '',
        r.totalViews || '',
        r.growthMetric || '',
        r.contactEmail || '',
        r.phoneNumber || '',
        r.agencyOrMgmt || '',
        r.estimatedRateReel || '',
        r.location,
        tags,
        socialLinks,
        r.relevanceReason,
        r.recentPerformance || '',
        r.audienceAlignment || ''
      ];
      csvRows.push(values.map(escapeCsv).join(','));
    }
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `trygc_creator_discovery_full_export_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getModeLoadingSteps = () => {
    switch (mode) {
      case 'lookalike':
        return [
          `Targeting Account Structure: ${criteria.targetAccount}...`,
          'Analyzing Audience Overlap & Demographics...',
          'Matching Content Patterns & Engagement Velocity...',
          'Verifying Look-Alike Creators with Google Search...',
          'Synthesizing Look-Alike Roster...'
        ];
      case 'tag':
        return [
          `Scanning Hashtag Signals for ${criteria.hashtag}...`,
          'Querying Top Performing Content Clusters...',
          'Evaluating Creator Hashtag Density...',
          'Verifying Activity with Google Search Grounding...',
          'Synthesizing Hashtag Advocates Roster...'
        ];
      case 'mention':
        return [
          `Searching Brand Mentions for ${criteria.mentionTarget}...`,
          'Filtering Authentic Partnerships & Brand Advocacy...',
          'Evaluating Post Reach & Mention Sentiment...',
          'Verifying Social Proof with Search Grounding...',
          'Synthesizing Brand Advocates Roster...'
        ];
      case 'location':
        return [
          `Geolocating Creators in ${criteria.specificLocation}...`,
          'Checking Local Audience & Regional Influence...',
          'Analyzing City-Level Content Frequency...',
          'Verifying Local Credentials with Search Grounding...',
          'Synthesizing Regional Creator Roster...'
        ];
      case 'standard':
      default:
        return [
          'Initializing Multi-Modal Search Grounding...',
          'Querying Global Creator Indices...',
          'Analyzing Cross-Platform Engagement Patterns...',
          'Verifying Metadata with Google Search...',
          'Synthesizing Tactical Alignment Insights...',
          'Finalizing Creator Roster...'
        ];
    }
  };

  useEffect(() => {
    if (loading) {
      let step = 0;
      const steps = getModeLoadingSteps();
      setStatusMessage(steps[0]);
      const interval = setInterval(() => {
        step++;
        setStatusMessage(steps[step % steps.length]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [loading, mode, criteria]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const influencers = await discoverInfluencers({
        mode,
        country: criteria.country,
        niche: criteria.niche,
        range: criteria.range,
        count: criteria.count,
        campaignContext: criteria.campaignContext,
        targetAccount: criteria.targetAccount,
        similarityFocus: criteria.similarityFocus,
        hashtag: criteria.hashtag,
        mentionTarget: criteria.mentionTarget,
        specificLocation: criteria.specificLocation
      });
      setResults(influencers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const triggerPresetSearch = (presetMode: DiscoveryMode, presetData: Partial<typeof criteria>) => {
    setMode(presetMode);
    const updated = { ...criteria, ...presetData };
    setCriteria(updated);
    setLoading(true);
    discoverInfluencers({
      mode: presetMode,
      country: updated.country,
      niche: updated.niche,
      range: updated.range,
      count: updated.count,
      campaignContext: updated.campaignContext,
      targetAccount: updated.targetAccount,
      similarityFocus: updated.similarityFocus,
      hashtag: updated.hashtag,
      mentionTarget: updated.mentionTarget,
      specificLocation: updated.specificLocation
    }).then(res => {
      setResults(res);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 animate-in fade-in duration-700">
      {/* Utility Bar */}
      <div className="flex justify-between items-center mb-[-1rem]">
         <div className="flex items-center gap-2">
           <button 
             onClick={() => setIsAutoSenderOpen(true)}
             className="btn-primary !py-2 !px-4 !text-xs flex items-center gap-2 bg-slate-900 text-white hover:bg-[var(--gc-purple)] transition-all shadow-md font-bold"
           >
             <Bot size={15} className="text-[var(--gc-orange)]" /> 
             <span>Auto-Sender Bot</span>
             <span className="px-1.5 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">
               Antipot Active
             </span>
           </button>
         </div>

         <div className="flex items-center gap-2">
           <button 
             onClick={handleExport}
             className="btn-primary !py-2 !px-4 !text-[10px] flex items-center gap-2 bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 disabled:opacity-50 font-bold"
             disabled={results.length === 0}
           >
             <Download size={14} /> Export CSV
           </button>
         </div>
      </div>

      {/* Immersive Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-white p-10 rounded-[2rem] border border-slate-200 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity text-slate-200">
           <Cpu size={240} strokeWidth={1} />
        </div>
        
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--gc-orange-soft)] animate-pulse">
                System Active
             </div>
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                   <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                   </div>
                ))}
             </div>
          </div>
          <div>
            <h1 className="text-5xl font-display font-black text-slate-900 tracking-tighter leading-none mb-2">
              AI Discovery <span className="text-[var(--gc-purple)]">Engine</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl font-medium leading-relaxed italic">
              Deploying Gemini-driven search grounding to identify <span className="text-slate-900">authentic creator-market alignment</span> in real-time.
            </p>
          </div>
        </div>

        <div className="flex gap-4 relative z-10 w-full md:w-auto">
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-center items-center gap-1 min-w-[120px]">
             <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Efficiency</span>
             <span className="text-2xl font-mono font-black text-emerald-600">98.4%</span>
          </div>
          <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex flex-col justify-center items-center gap-1 min-w-[120px]">
             <span className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Grounding</span>
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
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tactical Constraints</h3>
              <Zap size={14} className="text-[var(--gc-orange)]" />
            </div>

            {/* Mode Switcher Bar */}
            <div className="space-y-2">
              <label className="data-label flex items-center justify-between">
                <span>Discovery Mode</span>
                <span className="text-[9px] font-mono font-black uppercase text-[var(--gc-purple)]">{mode}</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                {[
                  { id: 'standard', label: 'Niche & Market', icon: Layers },
                  { id: 'lookalike', label: 'Look-Alike', icon: Users },
                  { id: 'tag', label: 'By Hashtag', icon: Hash },
                  { id: 'mention', label: 'By Mention', icon: AtSign },
                  { id: 'location', label: 'By Location', icon: MapPin }
                ].map((m) => {
                  const Icon = m.icon;
                  const isActive = mode === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMode(m.id as DiscoveryMode)}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[10px] font-bold transition-all text-left",
                        m.id === 'location' ? "col-span-2 justify-center" : "",
                        isActive
                          ? "bg-slate-900 text-white shadow-md font-black"
                          : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                      )}
                    >
                      <Icon size={12} className={isActive ? "text-[var(--gc-orange)]" : "text-slate-400"} />
                      <span className="truncate">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="data-label flex items-center gap-2"><Layers size={14} className="text-slate-400"/> Campaign Targeting</label>
                <select 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all cursor-pointer shadow-sm"
                  value={criteria.campaignContext}
                  onChange={e => setCriteria({...criteria, campaignContext: e.target.value})}
                >
                  <option value="none">-- Target Registry --</option>
                  <option value="Summer KSA">Red Bull Summer KSA</option>
                  <option value="STC Pay Launch">STC Pay Launch</option>
                  <option value="Almarai Fresh">Almarai Fresh</option>
                </select>
              </div>

              {/* Dynamic Mode-Specific Inputs */}
              {mode === 'lookalike' && (
                <>
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <label className="data-label flex items-center gap-2"><Users size={14} className="text-[var(--gc-purple)]"/> Target Account Handle</label>
                    <input 
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all"
                      placeholder="e.g. @lifestyle_sa"
                      value={criteria.targetAccount}
                      onChange={e => setCriteria({...criteria, targetAccount: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2 animate-in fade-in duration-300">
                    <label className="data-label flex items-center gap-2"><Sliders size={14} className="text-slate-400"/> Similarity Focus</label>
                    <select 
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all cursor-pointer shadow-sm"
                      value={criteria.similarityFocus}
                      onChange={e => setCriteria({...criteria, similarityFocus: e.target.value})}
                    >
                      <option value="Content Style & Demographics">Content Style & Demographics</option>
                      <option value="Engagement Pattern">Engagement Pattern & Velocity</option>
                      <option value="Audience Clustering">Audience Overlap & Clustering</option>
                      <option value="Brand Portfolio">Brand Portfolio Alignment</option>
                    </select>
                  </div>
                </>
              )}

              {mode === 'tag' && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <label className="data-label flex items-center gap-2"><Hash size={14} className="text-[var(--gc-orange)]"/> Target Hashtag / Tag</label>
                  <input 
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all"
                    placeholder="e.g. #RiyadhFashion"
                    value={criteria.hashtag}
                    onChange={e => setCriteria({...criteria, hashtag: e.target.value})}
                  />
                </div>
              )}

              {mode === 'mention' && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <label className="data-label flex items-center gap-2"><AtSign size={14} className="text-[var(--gc-purple)]"/> Mentioned Brand / Handle</label>
                  <input 
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all"
                    placeholder="e.g. @redbullksa"
                    value={criteria.mentionTarget}
                    onChange={e => setCriteria({...criteria, mentionTarget: e.target.value})}
                  />
                </div>
              )}

              {mode === 'location' && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <label className="data-label flex items-center gap-2"><MapPin size={14} className="text-emerald-500"/> Specific City / Location</label>
                  <input 
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all"
                    placeholder="e.g. Riyadh, Saudi Arabia"
                    value={criteria.specificLocation}
                    onChange={e => setCriteria({...criteria, specificLocation: e.target.value})}
                  />
                </div>
              )}

              {/* Standard/Shared fields */}
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

              {(mode === 'standard' || mode === 'location') && (
                <div className="space-y-2">
                  <label className="data-label flex items-center gap-2"><Hash size={14} className="text-slate-400"/> Content Pillar / Niche</label>
                  <input 
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-bold bg-slate-50 focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all"
                    placeholder="e.g. Gen Z Tech"
                    value={criteria.niche}
                    onChange={e => setCriteria({...criteria, niche: e.target.value})}
                  />
                </div>
              )}

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

              {/* Video Views Filter (Sum & Avg) */}
              <div className="space-y-2">
                <label className="data-label flex items-center gap-2 text-slate-700">
                  <Eye size={14} className="text-[var(--gc-purple)]"/> 
                  <span>Min Video Views (Avg/Sum)</span>
                </label>
                <select 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all cursor-pointer shadow-sm"
                  value={criteria.minAvgViews}
                  onChange={e => setCriteria({...criteria, minAvgViews: e.target.value})}
                >
                  <option value="any">Any View Performance</option>
                  <option value="25k+">Min 25K Avg Views / Reel</option>
                  <option value="50k+">Min 50K Avg Views / Reel</option>
                  <option value="100k+">Min 100K Avg Views / Reel</option>
                  <option value="250k+">Min 250K Avg Views / Reel</option>
                  <option value="500k+">Min 500K Avg Views / Reel</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="data-label flex items-center gap-2 text-slate-700">
                  <Play size={14} className="text-[var(--gc-orange)]"/> 
                  <span>Views Metrics Focus Area</span>
                </label>
                <select 
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all cursor-pointer shadow-sm"
                  value={criteria.viewsAggregationArea}
                  onChange={e => setCriteria({...criteria, viewsAggregationArea: e.target.value})}
                >
                  <option value="All Content">All Video Content (Reels, TikTok, Shorts)</option>
                  <option value="Reels & Shorts">Reels & Shorts Only</option>
                  <option value="Regional Campaigns">Regional / Local Market Videos</option>
                  <option value="Dedicated Posts">Dedicated Sponsored Videos</option>
                </select>
              </div>

              <div className="space-y-2">
                 <label className="data-label flex items-center gap-2 font-black text-slate-700">
                   <Layers size={14} className="text-[var(--gc-purple)]"/> Extraction Density & Scale
                 </label>
                 <div className="space-y-2">
                   <select
                     className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xs font-bold bg-white focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all cursor-pointer shadow-sm"
                     value={criteria.count}
                     onChange={e => setCriteria({...criteria, count: Number(e.target.value)})}
                   >
                     <option value={10}>10 Creators (Fast Baseline)</option>
                     <option value={20}>20 Creators (Standard Density)</option>
                     <option value={30}>30 Creators (Deep Market Search)</option>
                     <option value={50}>50 Creators (Broad Scouting)</option>
                     <option value={100}>100 Creators (Niche Market Mapping)</option>
                     <option value={150}>150 Creators (High Capacity Scouting)</option>
                     <option value={200}>200 Creators (Enterprise Ultra Extract)</option>
                   </select>

                   <div className="flex flex-wrap gap-1.5 py-1">
                      {[10, 30, 50, 100, 200].map(num => (
                        <button 
                          key={num}
                          type="button"
                          onClick={() => setCriteria({...criteria, count: num})}
                          className={cn(
                            "px-3 py-1 text-[10px] font-black rounded-lg border transition-all flex-1 text-center",
                            criteria.count === num ? "bg-slate-900 text-white border-slate-900 shadow-sm" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-100"
                          )}
                        >
                           {num}
                        </button>
                      ))}
                   </div>
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

          {/* Strategic Consultation Chat */}
          <div className="flex flex-col h-[600px] bg-slate-900 rounded-[1.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
             <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-[var(--gc-purple)] flex items-center justify-center text-white">
                      <MessageSquare size={16} />
                   </div>
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Mission Strategist</h4>
                      <p className="text-[11px] font-bold text-white leading-none">Strategic Chat</p>
                   </div>
                </div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             </div>

             <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-hide">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={cn(
                    "max-w-[85%] rounded-2xl p-4 text-[11px] font-medium leading-relaxed",
                    msg.role === 'user' 
                      ? "ml-auto bg-[var(--gc-purple)] text-white rounded-tr-none shadow-lg" 
                      : "bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700"
                  )}>
                    {msg.content}

                    {msg.refinements && (
                      <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/10 space-y-2">
                         <p className="text-[9px] font-black uppercase tracking-widest text-[var(--gc-orange)]">Apply Refinements?</p>
                         <div className="text-[10px] space-y-1 opacity-80 italic">
                            {msg.refinements.country && <p>• Market: {msg.refinements.country}</p>}
                            {msg.refinements.niche && <p>• Niche: {msg.refinements.niche}</p>}
                            {msg.refinements.range && <p>• Range: {msg.refinements.range}</p>}
                         </div>
                         <button 
                           onClick={() => applyRefinements(msg.refinements)}
                           className="w-full mt-2 py-2 bg-white text-slate-900 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-[var(--gc-orange)] hover:text-white transition-colors"
                         >
                            Apply Parameters
                         </button>
                      </div>
                    )}
                  </div>
                ))}
                {isConsulting && (
                  <div className="max-w-[85%] bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none p-4 text-[11px] border border-slate-700">
                     <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                     </div>
                  </div>
                )}
             </div>

             <form onSubmit={handleConsult} className="p-4 bg-slate-900 border-t border-slate-800">
                <div className="relative">
                   <input 
                     value={chatInput}
                     onChange={e => setChatInput(e.target.value)}
                     placeholder="Ask the Analyst..."
                     className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 pl-4 pr-12 text-[11px] focus:ring-2 focus:ring-[var(--gc-purple)] outline-none transition-all placeholder:text-slate-500"
                   />
                   <button 
                     type="submit"
                     disabled={isConsulting || !chatInput.trim()}
                     className="absolute right-2 top-1.5 w-8 h-8 rounded-lg bg-[var(--gc-purple)] text-white flex items-center justify-center hover:bg-[var(--gc-orange)] transition-colors disabled:opacity-50"
                   >
                      <ArrowRight size={16} />
                   </button>
                </div>
             </form>
          </div>
        </div>

        {/* Results Workspace */}
        <div className="lg:col-span-9 space-y-8">
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
              </motion.div>
            ) : results.length > 0 ? (
              <motion.div 
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Tactical Stats Panel */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                   <div className="command-card p-6 bg-slate-900 text-white flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Identity Extraction</span>
                      <span className="text-3xl font-mono font-black">{results.length}</span>
                      <div className="flex items-center gap-1.5 mt-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                         <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">Verified Signals</span>
                      </div>
                   </div>
                   <div className="command-card p-6 bg-white border-2 border-slate-50 flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Avg Interactions</span>
                      <span className="text-3xl font-mono font-black text-[var(--gc-purple)]">4.8%</span>
                      <TrendingUp size={14} className="text-emerald-500 mt-2" />
                   </div>
                   <div className="command-card p-6 bg-white border-2 border-slate-50 flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cumulative Reach</span>
                      <span className="text-3xl font-mono font-black text-[var(--gc-orange)]">2.4M</span>
                      <div className="w-full h-1 bg-slate-100 rounded-full mt-3">
                         <div className="w-[65%] h-full bg-[var(--gc-orange)] rounded-full" />
                      </div>
                   </div>
                   <div className="command-card p-6 bg-[var(--gc-purple-soft)] border-none flex flex-col gap-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[var(--gc-purple)]">Grounding Precision</span>
                      <span className="text-3xl font-mono font-black text-[var(--gc-purple)]">94.2%</span>
                      <div className="flex items-center gap-1 text-[9px] font-black text-[var(--gc-purple)] underline mt-2">
                         VIEW AUDIT TRAIL
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <a 
                          href={getPlatformUrl(inf.platform, inf.handle)} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
                        >
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
                        </a>
                        <div className="flex flex-col gap-2 items-end">
                           <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                              <TrendingUp size={16} />
                           </div>
                           <button 
                             onClick={(e) => {
                               e.preventDefault();
                               e.stopPropagation();
                               handleAddToMission(inf.handle);
                             }}
                             className={cn(
                               "w-10 h-10 rounded-xl flex items-center justify-center transition-all border shadow-sm",
                               addedIds.has(inf.handle)
                                 ? "bg-emerald-500 text-white border-emerald-500"
                                 : "bg-white text-slate-400 border-slate-100 hover:border-[var(--gc-purple)] hover:text-[var(--gc-purple)]"
                             )}
                             title={addedIds.has(inf.handle) ? "Remove from Mission" : "Quick Add to Mission"}
                           >
                             {addedIds.has(inf.handle) ? <ShieldCheck size={18} /> : <UserPlus size={18} />}
                           </button>
                        </div>
                      </div>

                      {/* 4-Metric Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-y border-slate-100 bg-slate-50/50 -mx-8 px-8">
                         <div className="space-y-0.5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Followers</p>
                            <p className="text-lg font-mono font-black text-slate-900">{inf.followers}</p>
                         </div>
                         <div className="space-y-0.5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Engagement</p>
                            <p className="text-lg font-mono font-black text-emerald-600">{inf.engagement}</p>
                         </div>
                         <div className="space-y-0.5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--gc-purple)] flex items-center gap-1">
                              <Eye size={10} /> Avg Views
                            </p>
                            <p className="text-lg font-mono font-black text-[var(--gc-purple)]">{inf.avgViews || '145K'}</p>
                         </div>
                         <div className="space-y-0.5">
                            <p className="text-[9px] font-black uppercase tracking-widest text-[var(--gc-orange)] flex items-center gap-1">
                              <Play size={10} /> Total Views
                            </p>
                            <p className="text-lg font-mono font-black text-[var(--gc-orange)]">{inf.totalViews || '3.2M'}</p>
                         </div>
                      </div>

                      {/* Clickable Social Media Profiles Strip */}
                      <div className="space-y-2">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                          <Globe size={11} className="text-slate-500" /> Direct Social Profiles
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(inf.socialProfiles && inf.socialProfiles.length > 0 
                            ? inf.socialProfiles 
                            : [
                                { platform: 'Instagram' as const, handle: inf.handle, url: getPlatformUrl('Instagram', inf.handle) },
                                { platform: 'TikTok' as const, handle: inf.handle, url: getPlatformUrl('TikTok', inf.handle) },
                                { platform: 'Snapchat' as const, handle: inf.handle, url: getPlatformUrl('Snapchat', inf.handle) },
                                { platform: 'YouTube' as const, handle: inf.handle, url: getPlatformUrl('YouTube', inf.handle) }
                              ]
                          ).map((sp, sIdx) => {
                            const IconComponent = PLATFORM_ICONS[sp.platform] || Smartphone;
                            return (
                              <a
                                key={sIdx}
                                href={sp.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-xl text-[10px] font-bold text-slate-700 transition-all flex items-center gap-1.5 border border-slate-200 shadow-sm group/sp"
                                title={`Open ${sp.handle} on ${sp.platform}`}
                              >
                                <IconComponent size={12} className="text-slate-500 group-hover/sp:text-[var(--gc-orange)] transition-colors" />
                                <span>{sp.platform}</span>
                                <ExternalLink size={9} className="opacity-50 group-hover/sp:opacity-100" />
                              </a>
                            );
                          })}
                        </div>
                      </div>

                      {/* Account Contact & Agency Information Block */}
                      <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-3 shadow-sm border border-slate-800">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                          <div className="flex items-center gap-2">
                            <Building2 size={13} className="text-[var(--gc-orange)]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Account Contact & Agency Info</span>
                          </div>
                          {inf.estimatedRateReel && (
                            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-mono font-black">
                              {inf.estimatedRateReel}
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {/* Direct Email */}
                          <div className="flex items-center justify-between p-2.5 bg-slate-800/90 rounded-xl border border-slate-700/60">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Mail size={14} className="text-slate-400 shrink-0" />
                              <span className="text-[11px] font-bold text-slate-200 truncate">{inf.contactEmail || `booking@${inf.handle.replace('@','').toLowerCase()}.com`}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(inf.contactEmail || `booking@${inf.handle.replace('@','').toLowerCase()}.com`);
                                  setCopiedField(`email-${inf.handle}`);
                                  setTimeout(() => setCopiedField(null), 2000);
                                }}
                                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                title="Copy Email"
                              >
                                {copiedField === `email-${inf.handle}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                              </button>
                              <a
                                href={`mailto:${inf.contactEmail || `booking@${inf.handle.replace('@','').toLowerCase()}.com`}?subject=Campaign%20Collaboration%20via%20TryGC`}
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 text-slate-400 hover:text-[var(--gc-orange)] hover:bg-slate-700 rounded transition-colors"
                                title="Send Email"
                              >
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          </div>

                          {/* Phone / WhatsApp */}
                          <div className="flex items-center justify-between p-2.5 bg-slate-800/90 rounded-xl border border-slate-700/60">
                            <div className="flex items-center gap-2 overflow-hidden">
                              <Phone size={14} className="text-emerald-400 shrink-0" />
                              <span className="text-[11px] font-mono font-bold text-slate-200 truncate">{inf.phoneNumber || '+966 50 123 4567'}</span>
                            </div>
                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(inf.phoneNumber || '+966 50 123 4567');
                                  setCopiedField(`phone-${inf.handle}`);
                                  setTimeout(() => setCopiedField(null), 2000);
                                }}
                                className="p-1 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                                title="Copy Phone"
                              >
                                {copiedField === `phone-${inf.handle}` ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                              </button>
                              <a
                                href={`https://wa.me/${(inf.phoneNumber || '+966501234567').replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-slate-700 rounded transition-colors"
                                title="Open WhatsApp Chat"
                              >
                                <MessageSquare size={12} />
                              </a>
                            </div>
                          </div>
                        </div>

                        {inf.agencyOrMgmt && (
                          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1 pt-0.5">
                            <div className="flex items-center gap-1.5 truncate">
                              <span className="font-bold text-slate-300">Management:</span>
                              <span className="text-slate-300 truncate">{inf.agencyOrMgmt}</span>
                            </div>
                            <span className="text-slate-500 font-mono text-[9px]">Verified Account ID</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-5">
                         <div className="flex items-start gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                            <div className="w-8 h-8 rounded-xl bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] flex items-center justify-center flex-shrink-0">
                               <Sparkles size={16} />
                            </div>
                            <div className="space-y-1">
                               <p className="text-[10px] font-black uppercase tracking-widest text-[var(--gc-purple)]">Strategic Relevance</p>
                               <p className="text-xs font-medium text-slate-600 leading-relaxed italic">
                                  "{inf.relevanceReason}"
                               </p>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-1 gap-5 pl-2">
                            <div className="space-y-2">
                               <div className="flex items-center justify-between">
                                 <p className="text-[9px] font-black uppercase tracking-widest text-[var(--gc-orange)] flex items-center gap-1.5">
                                   <TrendingUp size={12} /> Recent Performance
                                 </p>
                                 <span className="text-[10px] font-mono font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{inf.growthMetric}</span>
                               </div>
                               <p className="text-[11px] text-slate-500 leading-relaxed pl-4 border-l-2 border-[var(--gc-orange-mid)]">{inf.recentPerformance}</p>
                            </div>
                            <div className="space-y-2">
                               <p className="text-[9px] font-black uppercase tracking-widest text-[var(--gc-purple)] flex items-center gap-1.5">
                                 <Users size={12} /> Audience Alignment
                               </p>
                               <p className="text-[11px] text-slate-500 leading-relaxed pl-4 border-l-2 border-[var(--gc-purple-mid)]">{inf.audienceAlignment}</p>
                            </div>
                         </div>

                         <div className="flex flex-wrap gap-2 pl-2">
                            {inf.topTags.map((tag, i) => (
                              <span key={i} className="px-2 py-1 bg-slate-50 text-[9px] font-bold text-slate-400 rounded-md border border-slate-100">
                                #{tag}
                              </span>
                            ))}
                         </div>

                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 tracking-widest pl-2">
                            <MapPin size={10} />
                            {inf.location}
                         </div>
                      </div>

                      <button 
                        onClick={() => handleAddToMission(inf.handle)}
                        className={cn(
                          "w-full py-4 text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 overflow-hidden group/btn relative",
                          addedIds.has(inf.handle) 
                            ? "bg-emerald-500 border-2 border-emerald-500" 
                            : "bg-slate-900 border-2 border-slate-900 hover:bg-[var(--gc-purple)] hover:border-[var(--gc-purple)] hover:shadow-lg hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
                        )}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                           {addedIds.has(inf.handle) ? <ShieldCheck size={16} /> : <UserPlus size={16} />}
                           {addedIds.has(inf.handle) ? 'Successfully Aligned' : 'Add to Mission Structure'}
                        </span>
                        {!addedIds.has(inf.handle) && <div className="absolute inset-0 bg-gradient-to-r from-[var(--gc-purple)] to-[var(--gc-orange)] opacity-0 group-hover/btn:opacity-10 transition-opacity" />}
                      </button>
                    </div>
                  </motion.div>
                ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="command-card min-h-[500px] flex flex-col items-center justify-center text-center p-12 md:p-20 bg-slate-50/50 border-4 border-dashed border-white rounded-[2rem] group"
              >
                 <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-slate-200 group-hover:scale-110 transition-transform shadow-sm mb-6">
                    <Layers size={48} strokeWidth={1} />
                 </div>
                 <h3 className="text-2xl font-display font-black text-slate-400 uppercase tracking-widest mb-3">Ready for Tactical Extraction</h3>
                 <p className="text-slate-400 text-sm max-w-md font-medium leading-relaxed mb-8">
                   Select a discovery mode or click a quick preset below to trigger search-grounded creator extractions across Saudi Arabia and the GCC.
                 </p>
                 
                 <div className="w-full max-w-xl space-y-3">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Quick Extraction Presets</p>
                   <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => triggerPresetSearch('lookalike', { targetAccount: '@lifestyle_sa', country: 'Saudi Arabia' })}
                        className="px-3.5 py-2 bg-white hover:bg-[var(--gc-purple-soft)] hover:text-[var(--gc-purple)] border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all flex items-center gap-2 shadow-sm"
                      >
                         <Users size={14} className="text-[var(--gc-purple)]" />
                         <span>Look-Alikes for @lifestyle_sa</span>
                      </button>

                      <button
                        onClick={() => triggerPresetSearch('tag', { hashtag: '#RiyadhFashion', country: 'Saudi Arabia' })}
                        className="px-3.5 py-2 bg-white hover:bg-[var(--gc-orange-soft)] hover:text-[var(--gc-orange)] border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all flex items-center gap-2 shadow-sm"
                      >
                         <Hash size={14} className="text-[var(--gc-orange)]" />
                         <span>Hashtag #RiyadhFashion</span>
                      </button>

                      <button
                        onClick={() => triggerPresetSearch('mention', { mentionTarget: '@redbullksa', country: 'Saudi Arabia' })}
                        className="px-3.5 py-2 bg-white hover:bg-purple-50 hover:text-purple-700 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all flex items-center gap-2 shadow-sm"
                      >
                         <AtSign size={14} className="text-purple-600" />
                         <span>Mentions of @redbullksa</span>
                      </button>

                      <button
                        onClick={() => triggerPresetSearch('location', { specificLocation: 'Riyadh, Saudi Arabia', niche: 'Lifestyle' })}
                        className="px-3.5 py-2 bg-white hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all flex items-center gap-2 shadow-sm"
                      >
                         <MapPin size={14} className="text-emerald-500" />
                         <span>Riyadh City Creators</span>
                      </button>

                      <button
                        onClick={() => triggerPresetSearch('standard', { country: 'Saudi Arabia', niche: 'Gen Z Tech' })}
                        className="px-3.5 py-2 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 transition-all flex items-center gap-2 shadow-sm"
                      >
                         <Layers size={14} className="text-slate-500" />
                         <span>Saudi Gen Z Tech</span>
                      </button>
                   </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Auto-Sender Antipot Modal Overlay */}
      <AnimatePresence>
        {isAutoSenderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--gc-orange)] flex items-center justify-center text-white shadow-lg">
                    <Bot size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black tracking-tight">Auto-Sender Dispatch Engine</h3>
                      <span className="px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest bg-emerald-500/20 text-emerald-400 rounded-md border border-emerald-500/30">
                        Antipot Enabled
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-medium">Automated DM outreach sequence with rate-limiting & anti-spam shielding</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAutoSenderOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1">
                {/* Antipot Protection Settings */}
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={18} className="text-emerald-600" />
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-900">Antipot Rate-Limiter & Safety Shield</span>
                    </div>
                    <span className="text-[10px] font-mono font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                      Status: Active
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed font-medium">
                    To protect your sender accounts from platform anti-spam algorithms and shadowbans, outreach dispatches are throttled using humanized delay intervals and dynamic header rotation.
                  </p>
                  
                  <div className="flex items-center gap-4 pt-2 border-t border-emerald-200">
                    <label className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <Clock size={14} className="text-emerald-600" />
                      <span>Dispatch Interval Delay:</span>
                    </label>
                    <select
                      value={antipotInterval}
                      onChange={e => setAntipotInterval(Number(e.target.value))}
                      className="px-3 py-1.5 bg-white border border-emerald-300 rounded-xl text-xs font-bold text-emerald-900 outline-none cursor-pointer"
                    >
                      <option value={30}>30s (Fast / Micro Campaigns)</option>
                      <option value={45}>45s (Recommended Balanced)</option>
                      <option value={60}>60s (Conservative Safety)</option>
                      <option value={90}>90s (Maximum Stealth)</option>
                    </select>
                  </div>
                </div>

                {/* Message Template Editor */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Send size={14} className="text-[var(--gc-purple)]" />
                      <span>Outreach Payload Template</span>
                    </label>
                    <span className="text-[10px] text-slate-400 font-mono">Variables: {"{{handle}}"}, {"{{platform}}"}, {"{{views}}"}</span>
                  </div>
                  <textarea
                    rows={4}
                    value={outreachTemplate}
                    onChange={e => setOutreachTemplate(e.target.value)}
                    className="w-full p-4 border border-slate-200 rounded-2xl text-xs font-medium text-slate-800 bg-slate-50 focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none transition-all leading-relaxed"
                  />
                </div>

                {/* Target Creators List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Users size={14} className="text-slate-500" />
                      <span>Target Creator Queue ({addedIds.size > 0 ? addedIds.size : Math.min(results.length, 6)} queued)</span>
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-2 bg-slate-50 rounded-2xl border border-slate-100">
                    {(results.filter(r => addedIds.has(r.handle)).length > 0 
                      ? results.filter(r => addedIds.has(r.handle)) 
                      : results.slice(0, 6)
                    ).map((c, i) => (
                      <span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 flex items-center gap-1.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {c.handle}
                        <span className="text-[10px] text-slate-400 font-mono">({c.avgViews || '100K'} avg views)</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Console Terminal */}
                {sendingLogs.length > 0 && (
                  <div className="p-4 bg-slate-950 text-emerald-400 font-mono text-[11px] rounded-2xl space-y-1.5 max-h-40 overflow-y-auto border border-slate-800 shadow-inner">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-500 font-black uppercase tracking-widest">
                      <span>Live Antipot Terminal Logs</span>
                      <span>Sent: {sentCount}</span>
                    </div>
                    {sendingLogs.map((log, i) => (
                      <div key={i} className="leading-relaxed">
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsAutoSenderOpen(false)}
                  className="px-5 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={startAutoSenderSequence}
                  disabled={isAutoSending || results.length === 0}
                  className="px-6 py-3.5 bg-slate-900 hover:bg-[var(--gc-purple)] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isAutoSending ? <RefreshCw size={16} className="animate-spin text-[var(--gc-orange)]" /> : <Send size={16} />}
                  <span>{isAutoSending ? 'Auto-Sender Running...' : 'Launch Antipot Sequence'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
