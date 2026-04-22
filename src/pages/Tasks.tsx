/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  ChevronUp, 
  ChevronDown, 
  Calendar, 
  AlertCircle, 
  Edit2, 
  Check, 
  X,
  Filter,
  Plus
} from 'lucide-react';
import { cn } from '../utils';
import { format, isPast, parseISO } from 'date-fns';

interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  campaign: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

const INITIAL_TASKS: Task[] = [
  { id: 'TSK-101', title: 'Verify visit proof for @tech_omar', priority: 'High', dueDate: '2026-04-20', campaign: 'Red Bull Summer', status: 'In Progress' },
  { id: 'TSK-102', title: 'Prepare influencer list for STC launch', priority: 'Medium', dueDate: '2026-04-25', campaign: 'STC Pay Launch', status: 'Pending' },
  { id: 'TSK-103', title: 'Archive June coverage receipts', priority: 'Low', dueDate: '2026-04-22', campaign: 'Generic Ops', status: 'Pending' },
  { id: 'TSK-104', title: 'Escalation: Missing recovery Jeddah', priority: 'High', dueDate: '2026-04-18', campaign: 'Hungerstation', status: 'In Progress' },
];

export default function TasksCenter() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Task; direction: 'asc' | 'desc' } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBuffer, setEditBuffer] = useState<Partial<Task>>({});

  const handleSort = (key: keyof Task) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = useMemo(() => {
    const sortableTasks = [...tasks];
    if (sortConfig !== null) {
      sortableTasks.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTasks;
  }, [tasks, sortConfig]);

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditBuffer({ ...task });
  };

  const saveEdit = () => {
    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? { ...t, ...editBuffer } : t));
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditBuffer({});
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="section-title text-4xl">Tasks Center</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-1">
            <CheckSquare size={14} className="text-[var(--gc-orange)]" />
            Operational queue management and inline reconciliation.
          </p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> New Task
        </button>
      </div>

      <div className="command-card bg-white overflow-hidden">
        <div className="p-4 border-b border-[var(--border)] bg-slate-50/50 flex justify-between items-center">
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-display font-black uppercase tracking-widest text-slate-400">Sort by:</span>
              <SortTrigger label="Priority" active={sortConfig?.key === 'priority'} direction={sortConfig?.direction} onClick={() => handleSort('priority')} />
              <SortTrigger label="Due Date" active={sortConfig?.key === 'dueDate'} direction={sortConfig?.direction} onClick={() => handleSort('dueDate')} />
              <SortTrigger label="Campaign" active={sortConfig?.key === 'campaign'} direction={sortConfig?.direction} onClick={() => handleSort('campaign')} />
           </div>
           <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white rounded-lg text-slate-400 transition-colors border border-transparent hover:border-[var(--border)]">
                 <Filter size={16} />
              </button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="grid-header-cell w-[100px]">Status</th>
                <th className="grid-header-cell">Task Description</th>
                <th className="grid-header-cell">Campaign</th>
                <th className="grid-header-cell">Priority</th>
                <th className="grid-header-cell">Due Date</th>
                <th className="grid-header-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTasks.map((task) => {
                const isEditing = editingId === task.id;
                const overdue = isPast(parseISO(task.dueDate)) && task.status !== 'Completed';

                return (
                  <tr key={task.id} className={cn("group transition-colors", overdue && !isEditing ? "bg-red-50/30" : "bg-white")}>
                    <td className="grid-row-cell">
                       <button className={cn(
                         "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                         task.status === 'Completed' ? "bg-emerald-500 border-emerald-500 text-white" : "border-[var(--border)] text-transparent hover:border-[var(--gc-orange)]"
                       )}>
                         <Check size={14} />
                       </button>
                    </td>
                    <td className="grid-row-cell min-w-[300px]">
                      {isEditing ? (
                        <input 
                          className="w-full px-2 py-1 bg-slate-50 border border-[var(--gc-orange)] rounded-md text-sm font-bold outline-none"
                          value={editBuffer.title}
                          onChange={e => setEditBuffer({ ...editBuffer, title: e.target.value })}
                          autoFocus
                        />
                      ) : (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 leading-tight">{task.title}</span>
                            {overdue && (
                              <span className="flex items-center gap-1 text-[9px] font-display font-black uppercase text-red-600 bg-red-100 px-1.5 py-0.5 rounded animate-pulse">
                                <AlertCircle size={10} /> Overdue
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 mt-0.5">{task.id}</span>
                        </div>
                      )}
                    </td>
                    <td className="grid-row-cell">
                       <span className="stage-tag bg-[var(--gc-purple-soft)] text-[var(--gc-purple)]">{task.campaign}</span>
                    </td>
                    <td className="grid-row-cell">
                       <PriorityBadge level={task.priority} />
                    </td>
                    <td className="grid-row-cell">
                      {isEditing ? (
                        <input 
                          type="date"
                          className="px-2 py-1 bg-slate-50 border border-[var(--gc-orange)] rounded-md text-xs font-mono outline-none"
                          value={editBuffer.dueDate}
                          onChange={e => setEditBuffer({ ...editBuffer, dueDate: e.target.value })}
                        />
                      ) : (
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-600">
                           <Calendar size={12} className={overdue ? "text-red-500" : "text-slate-300"} />
                           {format(parseISO(task.dueDate), 'MMM dd, yyyy')}
                        </div>
                      )}
                    </td>
                    <td className="grid-row-cell text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={saveEdit} className="p-1.5 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">
                            <Check size={14} />
                          </button>
                          <button onClick={cancelEdit} className="p-1.5 bg-slate-200 text-slate-600 rounded-md hover:bg-slate-300">
                            <X size={14} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => startEdit(task)}
                          className="p-2 text-slate-400 hover:text-[var(--gc-orange)] hover:bg-[var(--gc-orange-soft)] rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        >
                          <Edit2 size={14} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SortTrigger({ label, active, direction, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1 transparent rounded-full text-[10px] font-display font-black uppercase tracking-widest transition-all",
        active ? "bg-[var(--gc-orange)] text-white" : "text-slate-400 hover:bg-slate-200 hover:text-slate-600"
      )}
    >
      {label}
      {active && (direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
    </button>
  );
}

function PriorityBadge({ level }: { level: string }) {
  const colors = {
    High: 'bg-red-50 text-red-700 border-red-100',
    Medium: 'bg-amber-50 text-amber-700 border-amber-100',
    Low: 'bg-slate-50 text-slate-600 border-slate-100'
  };
  return (
    <span className={cn("px-2 py-0.5 rounded-[4px] border text-[9px] font-display font-black uppercase tracking-wider", (colors as any)[level])}>
      {level}
    </span>
  );
}
