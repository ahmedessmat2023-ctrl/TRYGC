/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
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
    <aside className="w-[240px] border-r border-[var(--line)] bg-white h-screen flex flex-col flex-shrink-0">
      <div className="p-6 pb-2">
        <h1 className="text-xl font-[900] tracking-[-0.05em] text-[var(--ink)]">
          TryGC<span className="text-[var(--brand)]">OPS</span>
        </h1>
        <p className="text-[10px] font-mono text-slate-400 uppercase mt-1">Command Center v1.0</p>
      </div>
      
      <nav className="flex-1 px-3 mt-6 overflow-y-auto pb-6">
        <div className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-[6px] text-[14px] font-[500] transition-colors",
                isActive 
                  ? "bg-[#f0f0f0] text-[var(--ink)]" 
                  : "text-[#666] hover:bg-[#fafafa] hover:text-slate-900"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-[var(--line)] bg-white">
        <div className="kpi-label mb-2">Systems Status</div>
        <div className="flex items-center gap-2 text-[12px]">
          <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
          <span className="font-medium">All Systems Operational</span>
        </div>
      </div>
    </aside>
  );
}

export function Topbar() {
  return (
    <header className="h-[64px] border-b border-[var(--line)] bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search campaigns, influencers, or coverage links..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-[var(--accent)] transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--critical)] text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">3</span>
        </button>
        <div className="flex items-center gap-2 text-sm font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
          <span>Systems Optimal</span>
        </div>
      </div>
    </header>
  );
}
