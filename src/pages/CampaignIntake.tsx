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
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Campaign Intake</h2>
          <p className="text-slate-500 text-sm">Enter core campaign details to initiate the validation phase.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium border border-slate-200 rounded-lg bg-white hover:bg-slate-50 transition-colors">
            Save Draft
          </button>
          <button 
            disabled={!isValid}
            className="px-4 py-2 text-sm font-medium bg-[var(--accent)] text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-sm"
          >
            Submit for Validation
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Basic Info */}
          <section className="command-card p-6 space-y-6">
            <h3 className="font-semibold text-sm border-b border-slate-100 pb-4">1. Identification & Logistics</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="data-label">Campaign Name *</label>
                <input name="name" onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="e.g. Summer Launch 2024" />
              </div>
              <div className="space-y-2">
                <label className="data-label">Client / Brand *</label>
                <select name="clientId" onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white">
                  <option value="">Select a Client...</option>
                  <option value="c1">Red Bull KSA</option>
                  <option value="c2">Almarai</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="data-label">Country *</label>
                <input name="country" onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Saudi Arabia" />
              </div>
              <div className="space-y-2">
                <label className="data-label">City / Area *</label>
                <input name="city" onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="Riyadh / Jeddah" />
              </div>
            </div>
          </section>

          {/* Section: Targets & Budget */}
          <section className="command-card p-6 space-y-6">
            <h3 className="font-semibold text-sm border-b border-slate-100 pb-4">2. Objectives & Targets</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="data-label">Target Influencers *</label>
                  <input type="number" name="targetInfluencers" onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="50" />
                </div>
                <div className="space-y-2">
                  <label className="data-label">Target Posting Coverage *</label>
                  <input type="number" name="targetPostingCoverage" onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                  <label className="data-label">Budget *</label>
                  <input type="number" name="budget" onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" placeholder="50000" />
                </div>
                <div className="space-y-2">
                  <label className="data-label">Budget Type *</label>
                  <select name="budgetType" onChange={handleInputChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white">
                    <option value="USD">USD</option>
                    <option value="SAR">SAR</option>
                    <option value="AED">AED</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="data-label">Platforms *</label>
              <div className="flex gap-2">
                {['Instagram', 'TikTok', 'Snapchat', 'YouTube'].map(p => (
                  <button 
                    key={p} 
                    onClick={() => handleTogglePlatform(p)}
                    className={`px-4 py-2 text-xs font-medium rounded-full border transition-all ${formData.platforms?.includes(p) ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)]' : 'border-slate-200 text-slate-500'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar: Validation Status */}
        <div className="space-y-6">
          <div className={`command-card p-6 border-l-4 ${isValid ? 'border-l-[var(--success)] shadow-md' : 'border-l-[var(--critical)] shadow-sm'}`}>
            <div className="flex items-center gap-2 mb-4">
              {isValid ? <CheckCircle2 className="text-[var(--success)]" size={20} /> : <AlertCircle className="text-[var(--critical)]" size={20} />}
              <h4 className="font-bold text-sm">Integrity Gatekeeper</h4>
            </div>
            
            {!isValid ? (
              <div className="space-y-4">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Campaign cannot proceed to <span className="font-bold">Ready for Setup</span> until the following critical fields are populated:
                </p>
                <ul className="space-y-1.5">
                  {missingFields.slice(0, 8).map(field => (
                    <li key={field} className="text-[10px] font-mono text-red-600 bg-red-50 px-2 py-0.5 rounded flex items-center justify-between">
                      <span>MISSING: {field}</span>
                    </li>
                  ))}
                  {missingFields.length > 8 && <li className="text-[10px] font-mono text-slate-400">+{missingFields.length - 8} more fields...</li>}
                </ul>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 mt-4">
                  <p className="text-[9px] uppercase font-bold text-slate-400 mb-1">Operational Rule #7</p>
                  <p className="text-[10px] text-slate-500 italic">"A campaign must not move forward if critical setup information is missing."</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-[var(--success)] font-medium">Validation Requirements Met.</p>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <p className="text-[10px] text-emerald-700">All 22 core entities detected. Ready for Stage 2 (Validation Queue).</p>
                </div>
              </div>
            )}
          </div>

          <div className="command-card p-6">
             <h4 className="font-bold text-sm mb-4">Internal Owners</h4>
             <div className="space-y-3">
               <div className="flex -space-x-2">
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold">JD</div>
                 <div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold">SM</div>
                 <button className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors">
                   <PlusCircle size={14} />
                 </button>
               </div>
               <p className="text-xs text-slate-500 italic font-medium">Account Manager needed...</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
