/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Database, 
  Cloud, 
  Key, 
  Sliders,
  ChevronRight,
  Info
} from 'lucide-react';

export default function SettingsWorkspace() {
  const [activeRoot, setActiveRoot] = useState('general');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="section-title text-4xl">System Configuration</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-1">
            <SettingsIcon size={14} className="text-[var(--gc-orange)]" />
            Control center for platform variables and operational permissions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Nav Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {SETTING_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveRoot(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-display font-bold uppercase tracking-wider text-sm ${activeRoot === section.id ? 'bg-[var(--gc-purple)] text-white shadow-lg' : 'text-[var(--ink-700)] hover:bg-[var(--gc-purple-soft)]'}`}
            >
              <section.icon size={18} />
              {section.label}
              {activeRoot === section.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 space-y-6">
           <div className="command-card p-8 bg-white border-t-4 border-t-[var(--gc-orange)]">
              <h3 className="section-title text-xl mb-6">Security & Access Control</h3>
              
              <div className="space-y-6">
                <SettingRow 
                  icon={<Key className="text-[var(--gc-orange)]" />}
                  title="Gemini API Integration"
                  desc="Manage your LLM endpoint and search grounding parameters."
                  action={<button className="btn-primary text-[10px] px-3 py-1.5">Configure</button>}
                />
                <SettingRow 
                  icon={<Shield className="text-[var(--gc-purple)]" />}
                  title="RBAC Roles"
                  desc="Define what Account Managers vs Coverage Teams can edit."
                  action={<button className="text-[var(--gc-purple)] font-bold text-xs">Manage Permissions</button>}
                />
                <SettingRow 
                  icon={<Database className="text-[var(--gc-lavender)]" />}
                  title="Firestore Mirroring"
                  desc="Sync local state with production Firebase instance."
                  toggle
                />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="command-card p-6 border-l-4 border-l-[var(--gc-purple)]">
                 <h4 className="font-display font-black text-sm uppercase tracking-widest text-[var(--gc-purple)] mb-2">System Memory</h4>
                 <p className="text-xs text-[var(--ink-700)] mb-4">Total database occupancy across all active operational campaigns.</p>
                 <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--gc-purple)] w-[42%]" />
                 </div>
                 <p className="text-[10px] font-mono mt-2 text-right">4.2MB / 10MB (Spark)</p>
              </div>
              <div className="command-card p-6 border-l-4 border-l-[var(--gc-orange)]">
                 <h4 className="font-display font-black text-sm uppercase tracking-widest text-[var(--gc-orange)] mb-2">Audit Integrity</h4>
                 <p className="text-xs text-[var(--ink-700)] mb-4">Verification logs for all Campaign Closure Gatekeeper events.</p>
                 <button className="text-[10px] font-bold uppercase tracking-widest border border-[var(--border)] px-4 py-2 rounded-lg hover:bg-slate-50">Download Audit Trail</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function SettingRow({ icon, title, desc, action, toggle }: any) {
  return (
    <div className="flex items-center justify-between py-4 border-b border-[var(--border)] last:border-0">
      <div className="flex items-start gap-4">
        <div className="mt-1">{icon}</div>
        <div>
          <p className="font-bold text-[var(--ink-900)]">{title}</p>
          <p className="text-xs text-[var(--ink-500)]">{desc}</p>
        </div>
      </div>
      <div>
        {action}
        {toggle && (
          <div className="w-10 h-5 bg-emerald-500 rounded-full relative">
            <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
          </div>
        )}
      </div>
    </div>
  );
}

const SETTING_SECTIONS = [
  { id: 'general', label: 'General Info', icon: Sliders },
  { id: 'team', label: 'Team Management', icon: User },
  { id: 'security', label: 'Security & API', icon: Shield },
  { id: 'notifications', label: 'Alert Protocols', icon: Bell },
  { id: 'cloud', label: 'Cloud Resources', icon: Cloud },
];
