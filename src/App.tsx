/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar, Topbar } from './components/Layout';
import CampaignIntake from './pages/CampaignIntake';
import InfluencerList from './pages/InfluencerList';
import PostingCoverageDashboard from './pages/PostingCoverage';
import BlockersWorkspace from './pages/Blockers';
import QAReviewWorkspace from './pages/QAReview';
import CampaignClosure from './pages/CampaignClosure';
import InfluencerDiscovery from './pages/InfluencerDiscovery';
import { Users } from 'lucide-react';
import { cn } from './utils';

// Placeholder Pages
const Dashboard = () => (
  // ... (dashboard content)
  <div className="space-y-6">
    <div className="flex justify-between items-end">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Executive Health Dashboard</h2>
        <p className="text-slate-500 text-sm">Real-time status of all active operations</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-mono text-slate-400 uppercase">Last Integrity Sweep</p>
        <p className="text-sm font-medium">Today, 18:51:23</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {[
        { label: 'Active Campaigns', value: '24', color: 'blue' },
        { label: 'Blocked / Missing Inputs', value: '3', color: 'red' },
        { label: 'Pending QA Review', value: '112', color: 'amber' },
        { label: 'Ready for Closure', value: '5', color: 'emerald' },
      ].map((stat) => (
        <div key={stat.label} className="command-card p-4">
          <p className="kpi-label">{stat.label}</p>
          <p className="text-2xl font-bold font-mono tracking-tight text-[var(--ink)]">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="workflow-rail">
      {[
        'Intake', 'Validation', 'Ready', 'Setup', 'List Prep', 'Approval', 
        'Invites', 'Rem 1', 'Rem 2', 'Confirms', 'Schedule', 'Execution', 
        'Coverage', 'Recovery', 'QA Review', 'Reporting', 'Closure'
      ].map((step, i) => (
        <div key={step} className={cn(
          "step flex-1 h-8 text-[9px] flex items-center justify-center text-center px-1 rounded-[2px] transition-all",
          i < 12 ? "bg-[#1a1a1a] text-white" : i === 12 ? "bg-[var(--brand)] text-white border border-[var(--ink)]" : "bg-[#eee] text-[#aaa]"
        )}>
          {step}
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="command-card p-1">
          <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-semibold text-sm">Priority Validation Queue</h3>
            <button className="text-xs font-medium text-[var(--accent)]">View All</button>
          </div>
          <div className="p-0 overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="text-[10px] uppercase font-mono text-slate-400 bg-white">
                 <tr>
                    <th className="px-4 py-3 border-b border-slate-100 font-medium">Campaign</th>
                    <th className="px-4 py-3 border-b border-slate-100 font-medium text-center">Stage</th>
                    <th className="px-4 py-3 border-b border-slate-100 font-medium text-center">Health</th>
                    <th className="px-4 py-3 border-b border-slate-100 font-medium text-right">Owner</th>
                 </tr>
               </thead>
               <tbody>
                 {[
                   { name: 'Red Bull Summer KSA', stage: 'Validation', health: 'Healthy', owner: 'JD' },
                   { name: 'Almarai Fresh Juice', stage: 'Blocked', health: 'Critical', owner: 'SM' },
                   { name: 'STC Pay Launch', stage: 'Intake', health: 'At Risk', owner: 'AE' }
                 ].map((c) => (
                   <tr key={c.name} className="hover:bg-slate-50 transition-colors">
                     <td className="px-4 py-3 border-b border-slate-100 font-medium">{c.name}</td>
                     <td className="px-4 py-3 border-b border-slate-100 text-center">
                       <span className={`stage-tag ${c.stage === 'Blocked' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                         {c.stage}
                       </span>
                     </td>
                     <td className="px-4 py-3 border-b border-slate-100 text-center font-mono text-[10px] font-bold">
                       <span className={c.health === 'Critical' ? 'text-red-600' : c.health === 'At Risk' ? 'text-orange-500' : 'text-emerald-500'}>
                         {c.health}
                       </span>
                     </td>
                     <td className="px-4 py-3 border-b border-slate-100 text-right">
                       <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold ml-auto">{c.owner}</div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
         <div className="command-card p-6 bg-[var(--ink)] text-white border-none">
            <h4 className="data-label text-slate-400">Total Run-Rate</h4>
            <p className="text-2xl font-bold font-mono">82%</p>
            <div className="mt-4 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-[var(--accent)] w-[82%]" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 italic">Based on 14 active coverage streams.</p>
         </div>

         <div className="command-card p-1">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="font-semibold text-xs">Live Issue Monitor</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-[10px] font-bold text-red-600 uppercase mb-1">Escalation critical</p>
                <p className="text-xs font-medium">Influencer @AhmadX visit failed in Riyadh.</p>
              </div>
            </div>
         </div>
      </div>
    </div>
  </div>
);

const Placeholder = ({ title }: { title: string }) => (
  <div className="command-card p-12 text-center bg-white shadow-md border-b-4 border-b-[var(--line)]">
    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
      <Users size={32} className="text-slate-300" />
    </div>
    <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    <p className="text-slate-500 mt-2 max-w-sm mx-auto text-sm">Our operational engines are currently processing stage-gate logic for this workspace.</p>
    <div className="mt-8 flex justify-center gap-2">
      <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
      <div className="w-2 h-2 bg-[var(--accent)] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="flex bg-[var(--bg)] min-h-screen">
        <Sidebar />
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <Topbar />
          <div className="flex-1 overflow-y-auto p-8 bg-[var(--bg)]">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/intake" element={<CampaignIntake />} />
              <Route path="/validation" element={<Placeholder title="Validation & Stage Gates" />} />
              <Route path="/influencers" element={<InfluencerList />} />
              <Route path="/discovery" element={<InfluencerDiscovery />} />
              <Route path="/invitations" element={<Placeholder title="Invitation Tracker" />} />
              <Route path="/scheduling" element={<Placeholder title="Scheduling Calendar" />} />
              <Route path="/coverage" element={<PostingCoverageDashboard />} />
              <Route path="/qa" element={<QAReviewWorkspace />} />
              <Route path="/blockers" element={<BlockersWorkspace />} />
              <Route path="/tasks" element={<Placeholder title="Operational Tasks" />} />
              <Route path="/analytics" element={<Placeholder title="Insights & KPIs" />} />
              <Route path="/assets" element={<Placeholder title="Folder & Asset Registry" />} />
              <Route path="/admin" element={<Placeholder title="Admin Configuration" />} />
              <Route path="/closure" element={<CampaignClosure />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
