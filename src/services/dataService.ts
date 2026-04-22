/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CampaignStage } from '../constants';
import { Campaign, CampaignInfluencer, Blocker, Task } from '../types';

// Mock Data Initial State
export let CAMPAIGNS_DATA: Campaign[] = [
  { 
    id: 'C-001', 
    name: 'Red Bull Summer KSA', 
    clientId: 'c1', 
    brandId: 'b1',
    stage: CampaignStage.COVERAGE_IN_PROGRESS, 
    status: 'Active', 
    country: 'KSA', 
    budget: 50000, 
    budgetType: 'USD',
    recordHealth: 'Healthy',
    targetInfluencers: 50,
    targetPostingCoverage: 100,
    currentOwner: 'Sarah A.',
    nextAction: 'Reconcile visit logs',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now(),
    createdBy: 'system',
    city: 'Riyadh',
    objective: 'Brand Awareness',
    platforms: ['Instagram', 'TikTok'],
    type: 'Influencer Marketing',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    deliverables: '2 Stories, 1 Reel',
    tags: '#RedBullSummer',
    mentions: '@redbullksa',
    links: 'redbull.com/summer',
    visitRequired: true,
    productDetails: 'Summer Edition Cans',
    approvalFlow: 'Standard',
    reportingCadence: 'Weekly',
    restrictions: 'None',
    internalOwners: ['Sarah A.'],
    clientOwners: ['John D.'],
    influencerCriteria: 'Gen Z, Outdoor lifestyle'
  },
  { 
    id: 'C-002', 
    name: 'STC Pay Launch', 
    clientId: 'c2', 
    brandId: 'b2',
    stage: CampaignStage.LIST_PREPARATION, 
    status: 'Active', 
    country: 'UAE', 
    budget: 120000, 
    budgetType: 'USD',
    recordHealth: 'Healthy',
    targetInfluencers: 200,
    targetPostingCoverage: 400,
    currentOwner: 'Ahmed E.',
    nextAction: 'Finalize influencer selection',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now(),
    createdBy: 'system',
    city: 'Dubai',
    objective: 'User Acquisition',
    platforms: ['Snapchat', 'TikTok'],
    type: 'Performance',
    startDate: '2024-07-01',
    endDate: '2024-07-15',
    deliverables: '1 Snap Ad, 1 TikTok Spark',
    tags: '#STCPayUAE',
    mentions: '@stcpay_uae',
    links: 'stcpay.com.ae/launch',
    visitRequired: false,
    productDetails: 'Mobile App',
    approvalFlow: 'High Priority',
    reportingCadence: 'Daily',
    restrictions: 'No competitors',
    internalOwners: ['Ahmed E.'],
    clientOwners: ['Sarah M.'],
    influencerCriteria: 'Tech savvy, UAE based'
  }
];

export let INFLUENCERS_DATA: CampaignInfluencer[] = [
  {
    id: 'CI-001',
    campaignId: 'C-001',
    influencerId: 'INF-101',
    username: '@lifestyle_sa',
    platform: 'Instagram',
    status: 'Confirmed',
    invitationWave: 1,
    reminder1Sent: true,
    reminder2Sent: false,
    visitCompleted: true,
    coverageReceived: true,
    qaStatus: 'Approved',
    ownerId: 'Sarah A.',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    createdBy: 'system'
  }
];

export let BLOCKERS_DATA: Blocker[] = [
  {
    id: 'B-001',
    campaignId: 'C-001',
    summary: 'Visit Proof Mismatch for @lifestyle_sa',
    impact: 'QA blocking for 12 posts',
    status: 'Open',
    severity: 'Critical',
    ownerId: 'Sarah A.',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    createdBy: 'system'
  }
];

// Service Methods
export const dataService = {
  getCampaigns: () => [...CAMPAIGNS_DATA],
  updateCampaign: (id: string, updates: Partial<Campaign>) => {
    CAMPAIGNS_DATA = CAMPAIGNS_DATA.map(c => c.id === id ? { ...c, ...updates, updatedAt: Date.now() } : c);
    return [...CAMPAIGNS_DATA];
  },
  addCampaign: (campaign: Campaign) => {
    CAMPAIGNS_DATA = [{ ...campaign, createdAt: Date.now(), updatedAt: Date.now() }, ...CAMPAIGNS_DATA];
    return [...CAMPAIGNS_DATA];
  }
};
