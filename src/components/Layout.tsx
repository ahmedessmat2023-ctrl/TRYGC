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

const navItems = [
  { icon: LayoutDashboard, label: 'Command Center', path: '/' },
  { icon: Layers, label: 'Campaign Registry', path: '/campaigns' },
  { icon: Settings2, label: 'Campaign Setup', path: '/setup' },
  { icon: PlusCircle, label: 'Campaign Intake', path: '/intake' },
  { icon: FileCheck, label: 'Validation Queue', path: '/validation' },
  { icon: Sparkles, label: 'AI Discovery', path: '/discovery' },
  { icon: Users, label: 'Influencer Lists', path: '/influencers' },
  { icon: Mail, label: 'Invitations', path: '/invitations' },
  { icon: Calendar, label: 'Scheduling', path: '/scheduling' },
  { icon: Camera, label: 'Coverage Monitor', path: '/coverage' },
  { icon: ShieldCheck, label: 'QA Review', path: '/qa' },
  { icon: AlertTriangle, label: 'Blockers', path: '/blockers' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Archive, label: 'Asset Registry', path: '/assets' },
  { icon: FileCheck, label: 'Campaign Closure', path: '/closure' },
  { icon: Settings, label: 'Admin Settings', path: '/admin' },
];

export function Sidebar() {
  return (
    <aside className="w-[260px] border-r border-[var(--border)] bg-white h-screen flex flex-col flex-shrink-0 shadow-sm relative z-20">
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--gc-orange)] text-white rounded-xl shadow-lg flex items-center justify-center font-display font-black text-xl">
             GC
          </div>
          <div>
            <h1 className="text-xl font-display font-black tracking-tight text-[var(--ink-900)] leading-none">
              TRY<span className="text-[var(--gc-orange)]">GC</span>
            </h1>
            <p className="text-[9px] font-display font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Operational Center</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 mt-8 overflow-y-auto pb-6 custom-scrollbar">
        <div className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-display font-bold uppercase tracking-widest transition-all",
                isActive 
                  ? "bg-[var(--gc-purple)] text-white shadow-xl shadow-purple-900/10" 
                  : "text-[var(--ink-700)] hover:bg-[var(--gc-purple-soft)] hover:text-[var(--gc-purple)]"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      
      <div className="p-6 border-t border-[var(--border)] bg-slate-50/50">
        <div className="data-label mb-2">Machine Status</div>
        <div className="flex items-center gap-2 text-[12px] font-display font-bold uppercase tracking-wider text-[var(--ink-700)]">
          <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
          System Optimal
        </div>
      </div>
    </aside>
  );
}

export function Topbar() {
  const [showNotifications, setShowNotifications] = React.useState(false);

  return (
    <header className="h-[72px] border-b border-[var(--border)] bg-white flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-lg group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[var(--gc-orange)] transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search campaigns, influencers, or registry entries..." 
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50/80 border border-transparent focus:border-[var(--gc-orange-soft)] focus:bg-white focus:ring-4 focus:ring-[var(--gc-orange-soft)] rounded-2xl text-sm font-medium transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end mr-4 invisible md:visible">
           <span className="text-xs font-display font-black text-[var(--ink-900)]">Ahmed Essmat</span>
           <span className="text-[10px] font-display font-bold text-[var(--gc-purple)] uppercase tracking-widest">Ops Lead</span>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-[var(--gc-orange)] hover:bg-[var(--gc-orange-soft)] rounded-xl transition-all relative"
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--gc-orange)] rounded-full border-2 border-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-4 w-[320px] bg-white border border-[var(--border)] rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
               <div className="p-4 border-b border-[var(--border)] bg-slate-50 flex justify-between items-center">
                  <h4 className="font-display font-black text-xs uppercase tracking-widest text-[var(--ink-900)]">Operational Alerts</h4>
                  <span className="text-[10px] font-bold text-[var(--gc-orange)]">3 New</span>
               </div>
               <div className="p-2 space-y-1">
                  <NotificationItem title="SLA Breach Risk" desc="Campaign 'Red Bull KSA' missing 3 recoverables." time="12m ago" priority="high" />
                  <NotificationItem title="Influencer Approved" desc="@tech_omar joined list prep stage." time="45m ago" priority="low" />
                  <NotificationItem title="Database Sync" desc="Firestore mirror complete for GCC." time="2h ago" priority="low" />
               </div>
               <div className="p-3 bg-slate-50 text-center">
                  <button className="text-[10px] font-display font-black uppercase text-[var(--gc-purple)] tracking-widest hover:underline">Clear all alerts</button>
               </div>
            </div>
          )}
        </div>

        <button className="w-10 h-10 border-2 border-[var(--border)] rounded-xl overflow-hidden hover:border-[var(--gc-orange)] transition-all">
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">AE</div>
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
