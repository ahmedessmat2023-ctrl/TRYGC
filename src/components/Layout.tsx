/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Settings2,
  FileCheck, 
  Users, 
  Mail, 
  Calendar, 
  Camera, 
  AlertTriangle, 
  BarChart3, 
  Settings,
  Archive,
  Layers,
  CheckSquare,
  ShieldCheck,
  Search,
  Bell,
  Sparkles,
  FileCheck as FileCheckIcon
} from 'lucide-react';
import { cn } from '../utils';

const menuGroups = [
  {
    title: 'Mission Planning',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
      { icon: PlusCircle, label: 'Intake Stage', path: '/intake' },
      { icon: Settings2, label: 'Campaign Setup', path: '/setup' },
      { icon: Sparkles, label: 'AI Discovery', path: '/discovery' },
      { icon: Mail, label: 'Invitations', path: '/invitations' },
    ]
  },
  {
    title: 'Live Operations',
    items: [
      { icon: Layers, label: 'Campaign Registry', path: '/campaigns' },
      { icon: Users, label: 'Creator Roster', path: '/influencers' },
      { icon: CheckSquare, label: 'Task Console', path: '/tasks' },
      { icon: Calendar, label: 'Scheduler', path: '/scheduling' },
    ]
  },
  {
    title: 'Verification & QA',
    items: [
      { icon: FileCheck, label: 'Validation Hub', path: '/validation' },
      { icon: ShieldCheck, label: 'QA Review', path: '/qa' },
      { icon: Camera, label: 'Coverage Monitor', path: '/coverage' },
      { icon: AlertTriangle, label: 'Risk Blockers', path: '/blockers' },
    ]
  },
  {
    title: 'Intelligence',
    items: [
      { icon: BarChart3, label: 'Analytics', path: '/analytics' },
      { icon: Archive, label: 'Asset Index', path: '/assets' },
      { icon: FileCheckIcon, label: 'Closure Prep', path: '/closure' },
      { icon: Settings, label: 'Admin Settings', path: '/admin' },
    ]
  }
];

export function Sidebar() {
  return (
    <aside className="w-72 border-r border-[var(--border)] bg-[rgba(251,250,252,0.85)] backdrop-blur-xl h-screen flex flex-col flex-shrink-0 relative z-50">
      <div className="p-8 pb-10">
        <div className="flex items-center gap-3">
          <svg className="w-10 h-10" style={{ flexShrink: 0 }}>
            <symbol id="gc-mark-sidebar" viewBox="0 0 56 56">
              <circle cx="22" cy="20" r="15" stroke="#E8630C" strokeWidth="4.5" fill="none"/>
              <circle cx="22" cy="20" r="6.8" fill="#E8630C"/>
              <circle cx="40" cy="9" r="3.6" fill="#52358C"/>
              <path d="M 46 36 A 10 10 0 1 0 36 46 L 36 52 L 42 46 Z" fill="#52358C"/>
            </symbol>
            <use href="#gc-mark-sidebar"/>
          </svg>
          <div>
            <h2 className="font-display font-black text-[1.1rem] leading-none tracking-tight text-[var(--ink-900)] uppercase">
              TRY<span className="text-[var(--gc-orange)]">GC</span>
            </h2>
            <p className="font-mono text-[9px] uppercase tracking-widest text-[var(--ink-300)] mt-1 font-bold">Brand Portal V4</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto pb-10 space-y-6 custom-scrollbar">
        {menuGroups.map((group, idx) => (
          <div key={group.title} className="space-y-1">
            <p className="px-8 py-2 text-[9px] font-mono uppercase tracking-widest text-[var(--ink-300)] font-bold">
              {idx.toString().padStart(2, '0')} {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-8 py-2.5 text-[1.05rem] font-display font-semibold uppercase tracking-wider transition-all border-l-[3.5px]",
                    isActive 
                      ? "bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] border-l-[var(--gc-orange)] shadow-sm" 
                      : "text-[var(--ink-500)] border-l-transparent hover:bg-[var(--gc-orange-soft)] hover:text-[var(--gc-orange)] hover:border-l-[var(--gc-orange)]/50"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      
      <div className="p-8 border-t border-[var(--border)] bg-white/40">
        <div className="flex items-center justify-between mb-4">
           <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--gc-orange)]">Operational Status</span>
           <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)] shadow-[0_0_8px_var(--success)] animate-pulse" />
        </div>
        <div className="flex flex-wrap items-center gap-0 text-[10px] font-display font-black uppercase tracking-[1.5px]">
           <span className="text-[var(--gc-orange)]">SPEAK.</span> 
           <span className="text-[var(--gc-purple)] ml-1">CONNECT.</span> 
           <span className="text-[var(--gc-purple)] ml-1">IMPACT.</span>
        </div>
      </div>
    </aside>
  );
}

export function Topbar() {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  return (
    <header className="h-[88px] border-b border-[var(--border)] bg-[rgba(251,250,252,0.86)] backdrop-blur-md flex items-center justify-between px-10 sticky top-0 z-30 shadow-[var(--shadow-sm)]">
      <div className="flex items-center gap-8 flex-1">
        <div className={cn(
          "relative w-full max-w-2xl transition-all duration-300 group"
        )}>
          <Search className={cn(
            "absolute left-5 top-1/2 -translate-y-1/2 transition-colors",
            isSearchFocused ? "text-[var(--gc-orange)]" : "text-[var(--ink-300)]"
          )} size={18} />
          <input 
            type="text" 
            placeholder="Search campaigns, influencers, or operational data..." 
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-[var(--border)] focus:border-[var(--gc-orange)] focus:ring-[4px] focus:ring-[var(--gc-orange-mid)] rounded-full text-[15px] font-sans transition-all outline-none placeholder:text-[var(--ink-300)]"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1 bg-[var(--bg)] border border-[var(--border)] rounded-full shadow-sm">
             <span className="text-[11px] font-mono font-bold text-[var(--ink-500)]">⌘K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end invisible lg:visible pt-1">
           <span className="text-[15px] font-display font-bold text-[var(--ink-900)] leading-none">Ahmed Essmat</span>
           <span className="text-[11px] font-display font-bold text-[var(--gc-orange)] uppercase tracking-[0.1em] mt-1.5">Ops Master</span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
               "w-12 h-12 flex items-center justify-center rounded-full transition-all relative border",
               showNotifications 
                 ? "bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] border-[rgba(232,99,12,0.15)]" 
                 : "bg-white text-[var(--ink-700)] border-[var(--border)] hover:bg-[var(--bg)]"
             )}
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-[var(--danger)] rounded-full border-2 border-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-[380px] bg-white border border-[var(--border-strong)] rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)] z-50 animate-in fade-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg)] rounded-t-[var(--radius-xl)]">
                  <h4 className="font-display font-bold text-[13px] uppercase tracking-[2px] text-[var(--ink-900)]">Operational Log</h4>
                  <span className="px-3 py-1 bg-[var(--danger-soft)] text-[var(--danger)] rounded-full text-[11px] font-display font-extrabold uppercase tracking-wide">3 Critical</span>
               </div>
               <div className="p-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <NotificationItem title="SLA Breach Risk" desc="Campaign 'Red Bull KSA' missing 3 recoverables." time="12m ago" priority="high" />
                  <NotificationItem title="Influencer Approved" desc="@tech_omar joined list prep stage." time="45m ago" priority="low" />
                  <NotificationItem title="Database Sync" desc="Firestore mirror complete for GCC Area. Cache invalidation required for performance indexing." time="2h ago" priority="low" />
               </div>
               <div className="p-4 bg-[var(--bg)] rounded-b-[var(--radius-xl)] text-center border-t border-[var(--border)]">
                  <button className="text-[11px] font-display font-bold uppercase text-[var(--ink-500)] tracking-widest hover:text-[var(--gc-orange)] transition-colors">Clear Mission Log</button>
               </div>
            </div>
          )}
        </div>

        <button className="w-12 h-12 border border-[var(--border)] rounded-full overflow-hidden hover:border-[var(--gc-orange)] transition-all shadow-sm group">
          <div className="w-full h-full bg-[var(--gc-purple)] flex items-center justify-center text-[15px] font-display font-extrabold text-white group-hover:bg-[var(--gc-orange)] transition-colors">AE</div>
        </button>
      </div>
    </header>
  );
}

function NotificationItem({ title, desc, time, priority }: any) {
  return (
    <div className="p-4 mb-2 hover:bg-[var(--bg)] rounded-[var(--radius-lg)] transition-colors cursor-pointer border border-transparent hover:border-[var(--border)] group">
       <div className="flex gap-4">
          <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${priority === 'high' ? 'bg-[var(--danger-soft)] text-[var(--danger)]' : 'bg-[var(--gc-orange-soft)] text-[var(--gc-orange)]'}`}>
             <Bell size={18} />
          </div>
          <div className="space-y-1">
             <p className="text-[14px] font-bold text-[var(--ink-900)] group-hover:text-[var(--gc-orange)] transition-colors">{title}</p>
             <p className="text-[12px] text-[var(--ink-700)] font-sans leading-relaxed">{desc}</p>
             <p className="text-[10px] font-mono text-[var(--ink-500)] mt-2 uppercase">{time}</p>
          </div>
       </div>
    </div>
  );
}
