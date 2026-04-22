/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Settings2, 
  Save, 
  Link2, 
  Hash, 
  AtSign, 
  Package, 
  MapPin, 
  FileText, 
  Users, 
  Target, 
  ShieldCheck,
  Lock,
  UploadCloud,
  ChevronRight,
  Info,
  Search,
  X,
  Plus
} from 'lucide-react';
import { cn } from '../utils';
import { Campaign } from '../types';
import { dataService } from '../services/dataService';

const AVAILABLE_USERS = [
  { name: 'Sarah Ahmed', role: 'Ops Lead', avatar: 'SA', type: 'internal' },
  { name: 'Ahmed Essmat', role: 'Account Manager', avatar: 'AE', type: 'internal' },
  { name: 'Mona Khalid', role: 'Community Team', avatar: 'MK', type: 'internal' },
  { name: 'John Doe', role: 'Client Stakeholder', avatar: 'JD', type: 'client' },
  { name: 'Saleh Rashid', role: 'Brand Manager', avatar: 'SR', type: 'client' },
  { name: 'Yousuf Mansour', role: 'Marketing Director', avatar: 'YM', type: 'client' },
];

export default function CampaignSetup() {
  const [activeCampaign, setActiveCampaign] = useState<Partial<Campaign>>(dataService.getCampaigns()[0] || {});
  const [isSaving, setIsSaving] = useState(false);
  const [searchInternal, setSearchInternal] = useState('');
  const [searchClient, setSearchClient] = useState('');
  const [showInternalSearch, setShowInternalSearch] = useState(false);
  const [showClientSearch, setShowClientSearch] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string, date: string, type: string}[]>([
    { name: 'Red_Bull_Summer_KSA_Brief_V2.pdf', size: '2.4 MB', date: 'Oct 12, 2024', type: 'PDF' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setActiveCampaign(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    // Validation
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'image/jpeg',
      'image/png',
      'application/x-iwork-keynote-sffkey'
    ];
    const maxSize = 20 * 1024 * 1024; // 20MB

    if (file.size > maxSize) {
      // Inline error feedback would be better than alert
      return;
    }

    if (!allowedTypes.includes(file.type) && file.type !== '') {
       // Broadening check, though some systems don't report file.type for all extensions
    }

    // Simulate upload
    setUploadingProgress(0);
    const interval = setInterval(() => {
      setUploadingProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval);
          setUploadedFiles(prevFiles => [
            { 
              name: file.name, 
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`, 
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
              type: file.name.split('.').pop()?.toUpperCase() || 'FILE'
            },
            ...prevFiles
          ]);
          setTimeout(() => setUploadingProgress(null), 500);
          return 100;
        }
        return prev + 25;
      });
    }, 300);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      if (activeCampaign.id) {
        dataService.updateCampaign(activeCampaign.id, activeCampaign);
      }
      setIsSaving(false);
    }, 800);
  };

  const removeOwner = (target: 'internalOwners' | 'clientOwners', name: string) => {
    setActiveCampaign(prev => ({
      ...prev,
      [target]: (prev[target] || []).filter(o => o !== name)
    }));
  };

  const addOwner = (target: 'internalOwners' | 'clientOwners', name: string) => {
    if (!(activeCampaign[target] || []).includes(name)) {
      setActiveCampaign(prev => ({
        ...prev,
        [target]: [...(prev[target] || []), name]
      }));
    }
    setShowInternalSearch(false);
    setShowClientSearch(false);
    setSearchInternal('');
    setSearchClient('');
  };

  const filteredInternal = useMemo(() => 
    AVAILABLE_USERS.filter(u => u.type === 'internal' && u.name.toLowerCase().includes(searchInternal.toLowerCase())), 
    [searchInternal]
  );

  const filteredClient = useMemo(() => 
    AVAILABLE_USERS.filter(u => u.type === 'client' && u.name.toLowerCase().includes(searchClient.toLowerCase())), 
    [searchClient]
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-24 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-display font-black uppercase tracking-[0.2em] text-[var(--gc-orange)]">
            <Settings2 size={12} /> Stage 5: Operational Setup
          </div>
          <h1 className="section-title text-4xl">Campaign Architect</h1>
          <p className="text-[var(--ink-600)] text-sm italic">Define the logic, deliverables, and governance for <span className="font-bold text-[var(--ink-900)]">"{activeCampaign.name}"</span>.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={cn(
            "btn-primary flex items-center gap-2 min-w-[140px] justify-center transition-all",
            isSaving && "opacity-70 cursor-wait"
          )}
        >
          {isSaving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
          {isSaving ? 'Finalizing...' : 'Save Configuration'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Configuration Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section 1: Deliverables & Tracking */}
          <section className="command-card p-8 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] flex items-center justify-center">
                <Target size={18} />
              </div>
              <h3 className="font-display font-black uppercase text-xs tracking-widest text-slate-900">Execution & Tracking Logic</h3>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="data-label flex items-center gap-2">
                  Campaign Deliverables <Info size={12} className="text-slate-300" />
                </label>
                <textarea 
                  name="deliverables"
                  value={activeCampaign.deliverables || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-[var(--gc-orange-soft)] outline-none"
                  placeholder="e.g. 2 Instagram Stories with swipe up, 1 TikTok integration..."
                />
              </div>

              <div className="space-y-2">
                <label className="data-label flex items-center gap-2">Campaign Type <Info size={12} className="text-slate-300" /></label>
                <select 
                  name="type"
                  value={activeCampaign.type || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-[var(--gc-orange-soft)] outline-none appearance-none cursor-pointer"
                >
                  <option value="">Select Strategy...</option>
                  <option value="Influencer Marketing">Influencer Marketing</option>
                  <option value="Performance">Performance</option>
                  <option value="Brand Awareness">Brand Awareness</option>
                  <option value="Event Coverage">Event Coverage</option>
                  <option value="Product Launch">Product Launch</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="data-label flex items-center gap-2"><Hash size={12} /> Mandatory Hashtags</label>
                  <input 
                    name="tags"
                    value={activeCampaign.tags || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-[var(--gc-orange-soft)] outline-none"
                    placeholder="#CampaignName #Vibe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="data-label flex items-center gap-2"><AtSign size={12} /> Required Mentions</label>
                  <input 
                    name="mentions"
                    value={activeCampaign.mentions || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-[var(--gc-orange-soft)] outline-none"
                    placeholder="@BrandAccount @Partner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="data-label flex items-center gap-2"><Link2 size={12} /> Destination Links</label>
                <input 
                   name="links"
                   value={activeCampaign.links || ''}
                   onChange={handleInputChange}
                   className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-[var(--gc-orange-soft)] outline-none"
                   placeholder="https://brand.com/campaign-landing-page"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Product & Logistics */}
          <section className="command-card p-8 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] flex items-center justify-center">
                <Package size={18} />
              </div>
              <h3 className="font-display font-black uppercase text-xs tracking-widest text-slate-900">Product & Logistics Protocol</h3>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="space-y-2">
                <label className="data-label">Product / Service Details</label>
                <textarea 
                  name="productDetails"
                  value={activeCampaign.productDetails || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-[var(--gc-purple-soft)] outline-none"
                  placeholder="Describe the hero product, key features, or arrival process."
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                    activeCampaign.visitRequired ? "bg-[var(--gc-orange)] text-white" : "bg-slate-200 text-slate-400"
                  )}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Physical Visit Required?</p>
                    <p className="text-[10px] text-slate-500 italic">Toggle if influencers must visit a physical location.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveCampaign(prev => ({ ...prev, visitRequired: !prev.visitRequired }))}
                  className={cn(
                    "w-14 h-8 rounded-full relative transition-all duration-300 shadow-inner px-1 flex items-center",
                    activeCampaign.visitRequired ? "bg-emerald-500" : "bg-slate-300"
                  )}
                >
                  <div className={cn(
                    "w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300",
                    activeCampaign.visitRequired ? "translate-x-6" : "translate-x-0"
                  )} />
                </button>
              </div>
            </div>
          </section>

          {/* Section 3: Governance & Reporting */}
          <section className="command-card p-8 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <h3 className="font-display font-black uppercase text-xs tracking-widest text-slate-900">Governance & Systems</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="data-label">Approval Flow</label>
                <select 
                  name="approvalFlow"
                  value={activeCampaign.approvalFlow || 'Internal Only'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-200 outline-none appearance-none"
                >
                  <option value="Internal Only">Internal Only</option>
                  <option value="Client Approval Required">Client Approval Required</option>
                  <option value="Double Stage Verification">Double Stage Verification</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="data-label">Reporting Cadence</label>
                <select 
                  name="reportingCadence"
                  value={activeCampaign.reportingCadence || 'Weekly Cycle'}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-200 outline-none appearance-none"
                >
                  <option value="Daily Updates">Daily Updates</option>
                  <option value="Weekly Cycle">Weekly Cycle</option>
                  <option value="Post-Campaign Only">Post-Campaign Only</option>
                  <option value="Custom Real-Time">Custom Real-Time</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="data-label flex items-center gap-2"><Lock size={12} /> Strategic Restrictions</label>
                <textarea 
                  name="restrictions"
                  value={activeCampaign.restrictions || ''}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-emerald-200 outline-none focus:border-red-100"
                  placeholder="e.g. No competitor mentions (STC, Mobily), avoid religious topics..."
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Stakeholders & Assets */}
        <div className="space-y-8">
          
          {/* Section 4: Mission Stakeholders */}
          <section className="command-card p-6 space-y-6 bg-white overflow-visible">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={18} />
              </div>
              <h3 className="font-display font-black uppercase text-xs tracking-widest text-slate-900">Command Owners</h3>
            </div>

            <div className="space-y-6">
              {/* Internal Owners */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="data-label">Internal Ops Leads</label>
                  <button 
                    onClick={() => setShowInternalSearch(!showInternalSearch)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                {showInternalSearch && (
                  <div className="relative animate-in slide-in-from-top-2 duration-300">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      autoFocus
                      placeholder="Search internal leads..."
                      value={searchInternal}
                      onChange={(e) => setSearchInternal(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto overflow-x-hidden">
                       {filteredInternal.map(u => (
                         <button 
                           key={u.name}
                           onClick={() => addOwner('internalOwners', u.name)}
                           className="w-full text-left p-3 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50 last:border-none"
                         >
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">{u.avatar}</div>
                            <div>
                               <p className="text-[10px] font-bold text-slate-900">{u.name}</p>
                               <p className="text-[9px] text-slate-500">{u.role}</p>
                            </div>
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                   {(activeCampaign.internalOwners || []).map(ownerName => {
                     const userData = AVAILABLE_USERS.find(u => u.name === ownerName);
                     return (
                       <div key={ownerName} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                               {userData?.avatar || ownerName.substring(0, 2).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-900">{ownerName}</p>
                                <p className="text-[9px] text-slate-500">{userData?.role || 'Internal Staff'}</p>
                             </div>
                          </div>
                          <button 
                            onClick={() => removeOwner('internalOwners', ownerName)}
                            className="p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                             <X size={14} />
                          </button>
                       </div>
                     );
                   })}
                </div>
              </div>

              {/* Client Owners */}
              <div className="space-y-4 pt-4 border-t border-slate-50">
                <div className="flex items-center justify-between">
                  <label className="data-label">Client / Brand Leads</label>
                  <button 
                    onClick={() => setShowClientSearch(!showClientSearch)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                {showClientSearch && (
                  <div className="relative animate-in slide-in-from-top-2 duration-300">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                    <input 
                      autoFocus
                      placeholder="Search client leads..."
                      value={searchClient}
                      onChange={(e) => setSearchClient(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
                       {filteredClient.map(u => (
                         <button 
                           key={u.name}
                           onClick={() => addOwner('clientOwners', u.name)}
                           className="w-full text-left p-3 hover:bg-slate-50 flex items-center gap-3 border-b border-slate-50 last:border-none"
                         >
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">{u.avatar}</div>
                            <div>
                               <p className="text-[10px] font-bold text-slate-900">{u.name}</p>
                               <p className="text-[9px] text-slate-500">{u.role}</p>
                            </div>
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                   {(activeCampaign.clientOwners || []).map(ownerName => {
                     const userData = AVAILABLE_USERS.find(u => u.name === ownerName);
                     return (
                       <div key={ownerName} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                               {userData?.avatar || ownerName.substring(0, 2).toUpperCase()}
                             </div>
                             <div>
                                <p className="text-[10px] font-bold text-slate-900">{ownerName}</p>
                                <p className="text-[9px] text-slate-500">{userData?.role || 'Client Lead'}</p>
                             </div>
                          </div>
                          <button 
                            onClick={() => removeOwner('clientOwners', ownerName)}
                            className="p-1.5 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                          >
                             <X size={14} />
                          </button>
                       </div>
                     );
                   })}
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Target Criteria */}
          <section className="command-card p-6 space-y-6">
             <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] flex items-center justify-center">
                <Target size={18} />
              </div>
              <h3 className="font-display font-black uppercase text-xs tracking-widest text-slate-900">Influencer Criteria</h3>
            </div>
            <div className="space-y-4">
              <textarea 
                name="influencerCriteria"
                value={activeCampaign.influencerCriteria || ''}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[var(--gc-orange-soft)] outline-none"
                placeholder="Define required age, gender, niche, cities, and follower ranges. Be specific about brand affinity."
              />
              <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                 <Info size={14} className="text-amber-500 flex-shrink-0" />
                 <p className="text-[9px] text-amber-700 leading-relaxed font-bold uppercase tracking-tight">These criteria will be used to calibrate the AI Discovery engine in Stage 6.</p>
              </div>
            </div>
          </section>

          {/* Section 6: Assets & Briefs */}
          <section className="command-card p-6 space-y-6 overflow-hidden relative">
             <div className="absolute top-0 right-0 p-6 text-slate-50 opacity-10">
                <FileText size={80} strokeWidth={1} />
             </div>
             <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-50 pb-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <h3 className="font-display font-black uppercase text-xs tracking-widest text-slate-900">Mission Briefs</h3>
                </div>

                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => document.getElementById('brief-upload')?.click()}
                  className={cn(
                    "p-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 bg-slate-50/50 group cursor-pointer transition-all",
                    isDragging ? "border-[var(--gc-purple)] bg-[var(--gc-purple-soft)]/20 scale-[1.02]" : "border-slate-100 hover:border-[var(--gc-purple-soft)] hover:bg-[var(--gc-purple-soft)]/10"
                  )}
                >
                   <input 
                     id="brief-upload"
                     type="file" 
                     className="hidden" 
                     onChange={handleFileSelect}
                     accept=".pdf,.docx,.key"
                   />
                   <div className={cn(
                     "w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors",
                     isDragging ? "text-[var(--gc-purple)]" : "text-slate-400 group-hover:text-[var(--gc-purple)]"
                   )}>
                      <UploadCloud size={24} />
                   </div>
                   <div className="text-center">
                      <p className="text-xs font-bold text-slate-900">
                        {uploadingProgress !== null ? `Uploading... ${uploadingProgress}%` : 'Upload Brief Guidelines'}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">PDF, DOCX, or Keynote (Max 10MB)</p>
                   </div>
                   {uploadingProgress !== null && (
                     <div className="w-48 h-1 bg-slate-200 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-[var(--gc-purple)] transition-all duration-300" 
                          style={{ width: `${uploadingProgress}%` }}
                        />
                     </div>
                   )}
                </div>

                <div className="space-y-2">
                   {uploadedFiles.map((file, idx) => (
                     <div key={idx} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl hover:shadow-md transition-all cursor-pointer group/file">
                        <div className="flex items-center gap-3">
                           <div className={cn(
                             "w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black italic border transition-all",
                             file.type === 'PDF' ? "bg-red-50 text-red-500 border-red-100 group-hover/file:bg-red-500 group-hover/file:text-white" : "bg-blue-50 text-blue-500 border-blue-100 group-hover/file:bg-blue-500 group-hover/file:text-white"
                           )}>
                             {file.type}
                           </div>
                           <div>
                              <p className="text-[11px] font-bold text-slate-900 line-clamp-1">{file.name}</p>
                              <p className="text-[9px] text-slate-400 font-medium uppercase font-mono">{file.size} • {file.date}</p>
                           </div>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setUploadedFiles(prev => prev.filter((_, i) => i !== idx));
                          }}
                          className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
                        >
                           <X size={14} />
                        </button>
                     </div>
                   ))}
                </div>
             </div>
          </section>

        </div>
      </div>
    </div>
  );
}
