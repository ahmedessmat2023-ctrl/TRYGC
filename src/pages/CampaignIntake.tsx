/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, AlertCircle, CheckCircle2, ArrowRight, PlusCircle } from 'lucide-react';
import { CampaignStage } from '../constants';
import { validateCampaign, cn } from '../utils';
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
           <div className="section-kicker">Stage 01: Initiation</div>
           <h2 className="section-title">Campaign Intake</h2>
           <p className="text-[13px] font-mono text-[var(--ink-500)] tracking-wide mt-2">Enter core mission parameters to initialize the validation phase.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-8 py-3.5 text-[11px] font-display font-black uppercase tracking-widest border border-[var(--border)] rounded-full bg-white shadow-sm hover:bg-[var(--bg)] transition-all active:scale-95 text-[var(--ink-900)]">
            Save Draft
          </button>
          <button 
            disabled={!isValid}
            className="px-8 py-3.5 text-[11px] font-display font-black uppercase tracking-widest bg-[var(--ink-900)] text-white rounded-full hover:bg-[var(--gc-purple)] disabled:bg-[var(--ink-300)] disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-[var(--shadow-md)] active:scale-95 group"
          >
            Deploy Mission
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Section: Basic Info */}
          <section className="command-card p-10 space-y-8 bg-white border border-[var(--border)] rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 border-b border-[var(--border)] pb-6">
               <div className="w-10 h-10 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--ink-500)] font-display font-black">01</div>
               <h3 className="text-[13px] font-display font-bold tracking-widest uppercase text-[var(--ink-900)]">Logistics & Identity</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="data-label text-[var(--ink-500)]">Campaign Designation *</label>
                <input name="name" onChange={handleInputChange} className="w-full px-5 py-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--ink-900)] outline-none focus:ring-[3px] focus:ring-[var(--gc-purple-soft)] focus:border-[var(--gc-purple)] transition-all placeholder-[var(--ink-300)]" placeholder="e.g. MISSION: SUMMER LAUNCH" />
              </div>
              <div className="space-y-3">
                <label className="data-label text-[var(--ink-500)]">Target Asset / Brand *</label>
                <select name="clientId" onChange={handleInputChange} className="w-full px-5 py-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--ink-900)] outline-none focus:ring-[3px] focus:ring-[var(--gc-purple-soft)] focus:border-[var(--gc-purple)] transition-all appearance-none cursor-pointer">
                  <option value="">Select a Client Proxy...</option>
                  <option value="c1">Red Bull (KSA Operations)</option>
                  <option value="c2">Almarai (Regional Hub)</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="data-label text-[var(--ink-500)]">Primary Market *</label>
                <input name="country" onChange={handleInputChange} className="w-full px-5 py-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--ink-900)] outline-none focus:ring-[3px] focus:ring-[var(--gc-purple-soft)] focus:border-[var(--gc-purple)] transition-all placeholder-[var(--ink-300)]" placeholder="Saudi Arabia" />
              </div>
              <div className="space-y-3">
                <label className="data-label text-[var(--ink-500)]">Operational Hub *</label>
                <input name="city" onChange={handleInputChange} className="w-full px-5 py-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--ink-900)] outline-none focus:ring-[3px] focus:ring-[var(--gc-purple-soft)] focus:border-[var(--gc-purple)] transition-all placeholder-[var(--ink-300)]" placeholder="Riyadh / Jeddah" />
              </div>
            </div>
          </section>

          {/* Section: Targets & Budget */}
          <section className="command-card p-10 space-y-8 bg-white border border-[var(--border)] rounded-3xl shadow-sm">
            <div className="flex items-center gap-4 border-b border-[var(--border)] pb-6">
               <div className="w-10 h-10 rounded-full bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--ink-500)] font-display font-black">02</div>
               <h3 className="text-[13px] font-display font-bold tracking-widest uppercase text-[var(--ink-900)]">Objectives & Financials</h3>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="data-label text-[var(--ink-500)]">Target Reach *</label>
                  <input type="number" name="targetInfluencers" onChange={handleInputChange} className="w-full px-5 py-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--ink-900)] outline-none focus:ring-[3px] focus:ring-[var(--gc-purple-soft)] focus:border-[var(--gc-purple)] transition-all placeholder-[var(--ink-300)]" placeholder="50" />
                </div>
                <div className="space-y-3">
                  <label className="data-label text-[var(--ink-500)]">Posting Vol. *</label>
                  <input type="number" name="targetPostingCoverage" onChange={handleInputChange} className="w-full px-5 py-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--ink-900)] outline-none focus:ring-[3px] focus:ring-[var(--gc-purple-soft)] focus:border-[var(--gc-purple)] transition-all placeholder-[var(--ink-300)]" placeholder="100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-3">
                  <label className="data-label text-[var(--ink-500)]">Budget Allocation *</label>
                  <input type="number" name="budget" onChange={handleInputChange} className="w-full px-5 py-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--ink-900)] outline-none focus:ring-[3px] focus:ring-[var(--gc-purple-soft)] focus:border-[var(--gc-purple)] transition-all placeholder-[var(--ink-300)]" placeholder="50000" />
                </div>
                <div className="space-y-3">
                  <label className="data-label text-[var(--ink-500)]">Currency *</label>
                  <select name="budgetType" onChange={handleInputChange} className="w-full px-5 py-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-[14px] font-bold text-[var(--ink-900)] outline-none focus:ring-[3px] focus:ring-[var(--gc-purple-soft)] focus:border-[var(--gc-purple)] transition-all appearance-none cursor-pointer">
                    <option value="USD">USD</option>
                    <option value="SAR">SAR</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <label className="data-label text-[var(--ink-500)]">Tactical Delivery Platforms *</label>
              <div className="flex flex-wrap gap-4 mt-2">
                {['Instagram', 'TikTok', 'Snapchat', 'YouTube'].map(p => (
                  <button 
                    key={p} 
                    type="button"
                    onClick={() => handleTogglePlatform(p)}
                    className={cn(
                      "px-6 py-2.5 text-[11px] font-display font-black uppercase tracking-widest rounded-full border-2 transition-all block",
                      formData.platforms?.includes(p) 
                        ? "bg-[var(--ink-900)] border-[var(--ink-900)] text-white shadow-md shadow-slate-300/50" 
                        : "bg-white border-[var(--border)] text-[var(--ink-500)] hover:border-[var(--ink-300)]"
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
            "command-card p-10 bg-white border-2 rounded-3xl shadow-[var(--shadow-lg)] relative overflow-hidden transition-colors duration-500",
            isValid ? "border-emerald-200 bg-emerald-50/10" : "border-[var(--border)]"
          )}>
            <div className="flex items-center justify-between mb-8">
               <h4 className="font-display font-black text-[11px] uppercase tracking-widest text-[var(--ink-900)]">Integrity Gate</h4>
               <div className={cn(
                 "w-3.5 h-3.5 rounded-full",
                 isValid ? "bg-[var(--success)] shadow-[0_0_12px_rgba(16,185,129,0.5)]" : "bg-[var(--ink-300)] shadow-none"
               )} />
            </div>
            
            {!isValid ? (
              <div className="space-y-6">
                <p className="text-[13px] text-[var(--ink-700)] leading-relaxed font-medium">
                  The mission cannot proceed to <span className="text-[var(--ink-900)] font-black">Ready for Setup</span> until the following critical fields are synchronized:
                </p>
                <div className="space-y-3 bg-[var(--bg)] p-4 rounded-xl border border-[var(--border)]">
                  {missingFields.slice(0, 8).map(field => (
                    <div key={field} className="group flex items-center gap-3">
                       <div className="w-1.5 h-1.5 bg-[var(--danger)] rounded-full shrink-0" />
                       <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-[var(--ink-700)] group-hover:text-[var(--danger)] transition-colors">{field.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-[var(--gc-orange-soft)] rounded-2xl border border-[var(--gc-orange)]/20 mt-8 relative overflow-hidden">
                   <AlertCircle className="absolute -bottom-2 -right-2 text-[var(--gc-orange)] opacity-10" size={60} />
                   <p className="text-[10px] uppercase font-display font-black tracking-widest text-[var(--gc-orange)] mb-2">Protocol 7.4</p>
                   <p className="text-[12px] text-[var(--gc-orange)]/80 italic font-medium leading-relaxed">"Mission integrity must exceed 100% before cluster deployment. No record orphans allowed."</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 bg-emerald-100 text-[var(--success)] rounded-full flex items-center justify-center mb-6">
                   <CheckCircle2 size={32} />
                </div>
                <p className="text-[16px] font-bold text-[var(--ink-900)]">Integrity Check Passed.</p>
                <p className="text-[13px] text-[var(--ink-500)] leading-relaxed font-medium">
                   Mission signature is valid. All tactical entities detected. System is green for Stage 02: Verification Hub.
                </p>
                <div className="pt-6 border-t border-emerald-100">
                    <p className="text-[10px] font-display font-black uppercase tracking-[0.2em] text-[var(--success)]">Authorized for Deployment</p>
                </div>
              </div>
            )}
          </div>

          <div className="command-card p-10 bg-[var(--ink-900)] text-white rounded-3xl shadow-[var(--shadow-xl)] relative overflow-hidden group">
             <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity">
                <PlusCircle size={160} />
             </div>
             <h4 className="font-display font-black text-[11px] uppercase tracking-widest text-white/60 mb-8">Internal Resource Roster</h4>
             <div className="space-y-6 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[var(--ink-700)] border border-[var(--ink-500)] flex items-center justify-center text-[11px] font-black font-display text-[var(--ink-300)]">AE</div>
                  <div>
                    <p className="text-[14px] font-bold text-white">Ahmed Essmat</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--ink-300)] mt-1">Mission Lead</p>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-[var(--gc-purple)] flex items-center justify-center text-[11px] font-black font-display text-white shadow-lg border border-[var(--gc-purple)]/50">MK</div>
                   <div>
                    <p className="text-[14px] font-bold text-white">Mona Khalid</p>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--ink-300)] mt-1">Account Strategy</p>
                  </div>
               </div>
               <button className="w-full mt-6 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-[var(--ink-700)] transition-colors border border-[var(--ink-700)] bg-[var(--ink-900)]">
                 <PlusCircle size={16} className="text-[var(--gc-orange)]" />
                 <span className="text-[11px] font-display font-black uppercase tracking-widest text-[var(--ink-300)]">Add Strategic Owner</span>
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
