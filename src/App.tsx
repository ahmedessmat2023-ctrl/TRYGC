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
import Chat from './pages/Chat';
import OperationalAnalytics from './pages/Analytics';
import AssetRegistry from './pages/AssetRegistry';
import SettingsWorkspace from './pages/Settings';
import TasksCenter from './pages/Tasks';
import Dashboard from './pages/Dashboard';
import CampaignList from './pages/CampaignList';
import CampaignSetup from './pages/CampaignSetup';
import CampaignDetail from './pages/CampaignDetail';
import InfluencerProfile from './pages/InfluencerProfile';
import Invitations from './pages/Invitations';
import Scheduling from './pages/Scheduling';
import Validation from './pages/Validation';
import AdminConsole from './pages/Admin';
import { Users, FileCheck2 as FileCheckIcon, Activity } from 'lucide-react';
import { cn } from './utils';


// Placeholder Pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="command-card p-24 text-center bg-white shadow-2xl border-t-8 border-t-[var(--gc-orange)]">
    <div className="w-24 h-24 bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-12 transition-transform">
      <Activity size={48} />
    </div>
    <h2 className="section-title text-3xl mb-4">{title}</h2>
    <p className="text-[var(--ink-700)] max-w-md mx-auto text-lg leading-relaxed">
      This operational sector is currently undergoing its final integrity sweep.
    </p>
    <div className="mt-12 flex justify-center gap-3">
      {[0, 0.1, 0.2].map((delay, i) => (
        <div key={i} className="w-3 h-3 bg-[var(--gc-orange)] rounded-full animate-bounce" style={{ animationDelay: `${delay}s` }} />
      ))}
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="flex bg-[var(--bg)] min-h-screen selection:bg-[var(--gc-orange-soft)]">
        <Sidebar />
        <main className="flex-1 flex flex-col min-w-0 bg-[var(--bg)] custom-scrollbar">
          <Topbar />
          <div className="p-10 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/campaigns" element={<CampaignList />} />
              <Route path="/setup" element={<CampaignSetup />} />
              <Route path="/campaign/:id" element={<CampaignDetail />} />
              <Route path="/intake" element={<CampaignIntake />} />
              <Route path="/validation" element={<Validation />} />
              <Route path="/influencers" element={<InfluencerList />} />
              <Route path="/influencer/:id" element={<InfluencerProfile />} />
              <Route path="/discovery" element={<InfluencerDiscovery />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/invitations" element={<Invitations />} />
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/coverage" element={<PostingCoverageDashboard />} />
              <Route path="/qa" element={<QAReviewWorkspace />} />
              <Route path="/blockers" element={<BlockersWorkspace />} />
              <Route path="/tasks" element={<TasksCenter />} />
              <Route path="/analytics" element={<OperationalAnalytics />} />
              <Route path="/assets" element={<AssetRegistry />} />
              <Route path="/admin" element={<AdminConsole />} />
              <Route path="/closure" element={<CampaignClosure />} />
              <Route path="/settings" element={<SettingsWorkspace />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
