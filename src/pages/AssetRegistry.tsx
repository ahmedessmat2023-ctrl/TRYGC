/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HardDrive, Folder, FileText, ChevronRight, Search, Plus, Filter, ExternalLink } from 'lucide-react';

const REGISTRY = [
  { id: '1', brand: 'Red Bull', type: 'Active', country: 'KSA', date: '2024-04', size: '1.2 GB' },
  { id: '2', brand: 'STC Pay', type: 'Closed', country: 'UAE', date: '2024-03', size: '4.8 GB' },
  { id: '3', brand: 'Hungerstation', type: 'Ready', country: 'KSA', date: '2024-05', size: '512 MB' },
];

export default function AssetRegistry() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="section-title text-4xl">Asset Registry</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-1">
            <HardDrive size={14} className="text-[var(--gc-orange)]" />
            PCloud Protocol Archive & Evidence Storage.
          </p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-6 py-2 bg-[var(--gc-purple)] text-white text-xs font-display font-black uppercase tracking-widest rounded-xl hover:shadow-lg transition-all">
             <Plus size={16} /> Sync PCloud
           </button>
        </div>
      </div>

      <div className="command-card p-4 bg-white flex items-center gap-4">
         <Search size={18} className="text-slate-400 ml-2" />
         <input className="flex-1 text-sm outline-none font-medium" placeholder="Search Brand, Market or Campaign Reference..." />
         <button className="flex items-center gap-2 px-4 py-2 border border-slate-100 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50">
            <Filter size={14} /> Filter
         </button>
      </div>

      <div className="command-card bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="grid-header-cell">Directory Path</th>
                <th className="grid-header-cell">Region</th>
                <th className="grid-header-cell">Retention</th>
                <th className="grid-header-cell">Size</th>
                <th className="grid-header-cell text-right">Access</th>
              </tr>
            </thead>
            <tbody>
              {REGISTRY.map((item) => (
                <tr key={item.id} className="group">
                  <td className="grid-row-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] flex items-center justify-center">
                        <Folder size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 leading-tight">{item.brand}</p>
                        <p className="text-[10px] text-slate-400 font-mono">/Active_Campaigns/{item.brand}/{item.date}</p>
                      </div>
                    </div>
                  </td>
                  <td className="grid-row-cell">
                     <span className="stage-tag bg-[var(--gc-orange-soft)] text-[var(--gc-orange)]">{item.country}</span>
                  </td>
                  <td className="grid-row-cell">
                     <span className="text-xs font-bold text-slate-600">{item.type}</span>
                  </td>
                  <td className="grid-row-cell font-mono text-xs text-slate-500">
                    {item.size}
                  </td>
                  <td className="grid-row-cell text-right">
                    <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-[var(--gc-purple)] hover:bg-[var(--gc-purple-soft)] transition-all">
                      <ExternalLink size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
