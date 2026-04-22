/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, AlertCircle, CheckCircle2, ArrowRight, PlusCircle } from 'lucide-react';
import { CampaignStage } from '../constants';
import { validateCampaign } from '../utils';
import { Campaign } from '../types';

export default function CampaignIntake() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Campaign>>({
    stage: CampaignStage.INTAKE,
    status: 'Active',
    platforms: [],
    internalOwners: [],
    clientOwners: []
  });

  const { isValid, missingFields } = validateCampaign(formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleTogglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms?.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...(prev.platforms || []), platform]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] rounded-lg text-[10px] font-black uppercase tracking-widest mb-4">
              <PlusCircle size={12} /> Stage 01: Initiation
           </div>
           <h2 className="text-5xl font-display font-black tracking-tighter text-slate-900">Campaign Intake</h2>
           <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Enter core mission parameters to initialize the validation phase.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-8 py-4 text-xs font-black uppercase tracking-widest border border-slate-200 rounded-2xl bg-white shadow-sm hover:bg-slate-50 transition-all active:scale-95">
            Save Draft
          </button>
          <button 
            disabled={!isValid}
            className="px-8 py-4 text-xs font-black uppercase tracking-widest bg-slate-900 text-white rounded-2xl hover:bg-[var(--gc-orange)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-xl active:scale-95 group"
          >
            Deploy Mission
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Section: Basic Info */}
          <section className="command-card p-10 space-y-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
               <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-display font-black">01</div>
               <h3 className="section-title text-sm tracking-widest uppercase">Logistics & Identity</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="data-label text-slate-400">Campaign Designation *</label>
                <input name="name" onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] transition-all" placeholder="e.g. MISSION: SUMMER LAUNCH" />
              </div>
              <div className="space-y-3">
                <label className="data-label text-slate-400">Target Asset / Brand *</label>
                <select name="clientId" onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] transition-all appearance-none cursor-pointer">
                  <option value="">Select a Client Proxy...</option>
                  <option value="c1">Red Bull (KSA Operations)</option>
                  <option value="c2">Almarai (Regional Hub)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="data-label text-slate-400">Primary Market *</label>
                <input name="country" onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] transition-all" placeholder="Saudi Arabia" />
              </div>
              <div className="space-y-3">
                <label className="data-label text-slate-400">Operational Hub *</label>
                <input name="city" onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] transition-all" placeholder="Riyadh / Jeddah" />
              </div>
            </div>
          </section>

          {/* Section: Targets & Budget */}
          <section className="command-card p-10 space-y-8 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-50 pb-6">
               <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-display font-black">02</div>
               <h3 className="section-title text-sm tracking-widest uppercase">Objectives & Financials</h3>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="data-label text-slate-400">Target Reach *</label>
                  <input type="number" name="targetInfluencers" onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] transition-all" placeholder="50" />
                </div>
                <div className="space-y-3">
                  <label className="data-label text-slate-400">Posting Vol. *</label>
                  <input type="number" name="targetPostingCoverage" onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] transition-all" placeholder="100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-3">
                  <label className="data-label text-slate-400">Budget Allocation *</label>
                  <input type="number" name="budget" onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] transition-all" placeholder="50000" />
                </div>
                <div className="space-y-3">
                  <label className="data-label text-slate-400">Currency *</label>
                  <select name="budgetType" onChange={handleInputChange} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[var(--gc-orange-soft)] transition-all appearance-none cursor-pointer">
                    <option value="USD">USD</option>
                    <option value="SAR">SAR</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="data-label text-slate-400 uppercase tracking-[0.2em] text-[10px]">Tactical Delivery Platforms *</label>
              <div className="flex flex-wrap gap-3">
                {['Instagram', 'TikTok', 'Snapchat', 'YouTube'].map(p => (
                  <button 
                    key={p} 
                    type="button"
                    onClick={() => handleTogglePlatform(p)}
                    className={cn(
                      "px-6 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-full border-2 transition-all",
                      formData.platforms?.includes(p) 
                        ? "bg-slate-900 border-slate-900 text-white shadow-lg" 
                        : "bg-white border-slate-50 text-slate-400 hover:border-slate-200"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Validation Status */}
        <div className="lg:col-span-4 space-y-8">
          <div className={cn(
            "command-card p-10 bg-white border-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden transition-all duration-500",
            isValid ? "border-emerald-100" : "border-slate-50"
          )}>
            <div className="flex items-center justify-between mb-8">
               <h4 className="font-display font-black text-xs uppercase tracking-widest text-slate-900">Integrity Gate</h4>
               <div className={cn(
                 "w-3 h-3 rounded-full animate-pulse",
                 isValid ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]"
               )} />
            </div>
            
            {!isValid ? (
              <div className="space-y-6">
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  The mission cannot proceed to <span className="text-slate-900 font-black">Ready for Setup</span> until the following critical fields are synchronized:
                </p>
                <div className="space-y-2">
                  {missingFields.slice(0, 8).map(field => (
                    <div key={field} className="group flex items-center gap-3">
                       <div className="w-1 h-1 bg-red-500 rounded-full" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-red-500 transition-colors uppercase">{field.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-50 mt-8 relative overflow-hidden">
                   <AlertCircle className="absolute -bottom-2 -right-2 text-slate-200 opacity-20" size={60} />
                   <p className="text-[9px] uppercase font-black tracking-widest text-slate-400 mb-2">Protocol 7.4</p>
                   <p className="text-[11px] text-slate-500 italic font-medium leading-relaxed">"Mission integrity must exceed 100% before cluster deployment. No record orphans allowed."</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mb-6">
                   <CheckCircle2 size={32} />
                </div>
                <p className="text-sm font-bold text-slate-900">Integrity Check Passed.</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                   Mission signature is valid. All tactical entities detected. System is green for Stage 02: Verification Hub.
                </p>
                <div className="pt-6 border-t border-slate-50">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500">Authorized for Deployment</p>
                </div>
              </div>
            )}
          </div>

          <div className="command-card p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                <PlusCircle size={160} />
             </div>
             <h4 className="font-display font-black text-xs uppercase tracking-widest text-white/60 mb-8">Internal Resource Roster</h4>
             <div className="space-y-6 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-black">AE</div>
                  <div>
                    <p className="text-xs font-black">Ahmed Essmat</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Mission Lead</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--gc-purple)] flex items-center justify-center text-[10px] font-black shadow-lg">MK</div>
                   <div>
                    <p className="text-xs font-black">Mona Khalid</p>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Account Strategy</p>
                  </div>
               </div>
               <button className="w-full mt-4 py-4 border border-white/10 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                 <PlusCircle size={14} className="text-[var(--gc-orange)]" />
                 <span className="text-[10px] font-black uppercase tracking-widest">Add Strategic Owner</span>
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
