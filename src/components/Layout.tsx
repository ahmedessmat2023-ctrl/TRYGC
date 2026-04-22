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
    <aside className="w-[280px] border-r border-slate-100 bg-white h-screen flex flex-col flex-shrink-0 shadow-2xl relative z-20">
      <div className="p-8 pb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] flex items-center justify-center font-display font-black text-2xl group cursor-pointer transition-transform hover:scale-110">
             GC
          </div>
          <div>
            <h1 className="text-2xl font-display font-black tracking-tighter text-slate-900 leading-none">
              TRY<span className="text-[var(--gc-orange)]">GC</span>
            </h1>
            <p className="text-[10px] font-display font-black text-slate-400 uppercase tracking-widest mt-1.5 opacity-60">Ops Engine v2.4</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 overflow-y-auto pb-10 space-y-8 custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h4 className="px-4 text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4 opacity-70">{group.title}</h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl text-[12px] font-display font-black uppercase tracking-widest transition-all group/nav",
                    isActive 
                      ? "bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <item.icon size={16} className={cn(
                    "transition-transform",
                    "group-hover/nav:scale-110"
                  )} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
      
      <div className="p-8 border-t border-slate-50 bg-slate-50/30">
        <div className="flex items-center justify-between mb-3">
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Link</span>
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck size={16} />
           </div>
           <p className="text-[11px] font-bold text-slate-700 leading-none">Operational Security: High</p>
        </div>
      </div>
    </aside>
  );
}

export function Topbar() {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);

  return (
    <header className="h-[80px] border-b border-slate-100 bg-white flex items-center justify-between px-10 sticky top-0 z-30 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      <div className="flex items-center gap-8 flex-1">
        <div className={cn(
          "relative w-full max-w-xl transition-all duration-300 group",
          isSearchFocused ? "max-w-2xl" : "max-w-xl"
        )}>
          <Search className={cn(
            "absolute left-5 top-1/2 -translate-y-1/2 transition-colors",
            isSearchFocused ? "text-[var(--gc-orange)]" : "text-slate-400"
          )} size={18} />
          <input 
            type="text" 
            placeholder="Command + K to search campaigns or roster..." 
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="w-full pl-14 pr-6 py-3.5 bg-slate-50 border-2 border-transparent focus:border-slate-100 focus:bg-white focus:ring-8 focus:ring-slate-50 rounded-[1.25rem] text-sm font-bold tracking-tight transition-all outline-none placeholder:text-slate-400 placeholder:font-medium"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-100 rounded-lg shadow-sm">
             <span className="text-[10px] font-black text-slate-400 tracking-tighter">⌘</span>
             <span className="text-[10px] font-black text-slate-400 tracking-tighter">K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end invisible lg:visible pt-1">
           <span className="text-sm font-display font-black text-slate-900 leading-none">Ahmed Essmat</span>
           <span className="text-[10px] font-display font-black text-[var(--gc-purple)] uppercase tracking-[0.2em] mt-1.5">Ops Master</span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-2xl transition-all relative border border-transparent",
              showNotifications ? "bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] border-[var(--gc-orange-soft)]" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
            )}
          >
            <Bell size={22} />
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[var(--gc-orange)] rounded-full border-2 border-white shadow-[0_0_10px_rgba(232,99,12,0.4)]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-6 w-[360px] bg-white border border-slate-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 animate-in fade-in zoom-in-95 duration-200">
               <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50 rounded-t-[2rem]">
                  <h4 className="font-display font-black text-[10px] uppercase tracking-[0.25em] text-slate-900">Operational Log</h4>
                  <span className="px-2 py-0.5 bg-red-50 text-red-500 rounded-full text-[9px] font-black uppercase">3 Critical</span>
               </div>
               <div className="p-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                  <NotificationItem title="SLA Breach Risk" desc="Campaign 'Red Bull KSA' missing 3 recoverables." time="12m ago" priority="high" />
                  <NotificationItem title="Influencer Approved" desc="@tech_omar joined list prep stage." time="45m ago" priority="low" />
                  <NotificationItem title="Database Sync" desc="Firestore mirror complete for GCC Area. Cache invalidation required for performance indexing." time="2h ago" priority="low" />
               </div>
               <div className="p-4 bg-slate-50/80 rounded-b-[2rem] text-center border-t border-slate-50">
                  <button className="text-[10px] font-display font-black uppercase text-slate-900 tracking-widest hover:text-[var(--gc-orange)] transition-colors">Clear Mission Log</button>
               </div>
            </div>
          )}
        </div>

        <button className="w-14 h-14 border-2 border-slate-100 rounded-2xl overflow-hidden hover:border-[var(--gc-orange)] transition-all shadow-sm group">
          <div className="w-full h-full bg-slate-900 flex items-center justify-center text-sm font-display font-black text-white group-hover:scale-110 transition-transform">AE</div>
        </button>
      </div>
    </header>
  );
}

function NotificationItem({ title, desc, time, priority }: any) {
  return (
    <div className="p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
       <div className="flex gap-3">
          <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${priority === 'high' ? 'bg-red-500' : 'bg-emerald-500'}`} />
          <div className="space-y-0.5">
             <p className="text-xs font-bold text-[var(--ink-900)] group-hover:text-[var(--gc-orange)] transition-colors">{title}</p>
             <p className="text-[10px] text-[var(--ink-500)] leading-relaxed">{desc}</p>
             <p className="text-[9px] font-mono text-slate-400 mt-1 uppercase">{time}</p>
          </div>
       </div>
    </div>
  );
}
