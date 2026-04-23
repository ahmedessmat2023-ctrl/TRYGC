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
  AlertTriangle,
  Zap,
  Minus,
  Edit2, 
  Check, 
  X,
  Filter,
  Plus
} from 'lucide-react';
import { cn } from '../utils';
import { format, isPast, parseISO } from 'date-fns';
import { dataService } from '../services/dataService';
import { Task } from '../types';

export default function TasksCenter() {
  const [tasks, setTasks] = useState<Task[]>(dataService.getTasks());
  const [sortConfig, setSortConfig] = useState<{ key: keyof Task; direction: 'asc' | 'desc' }>({ key: 'dueDate', direction: 'asc' });
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
    const priorityWeight = { High: 3, Medium: 2, Low: 1, Critical: 4 };

    sortableTasks.sort((a, b) => {
      const aVal = a[sortConfig.key] as any;
      const bVal = b[sortConfig.key] as any;

      if (sortConfig.key === 'priority') {
        const aWeight = priorityWeight[a.priority as keyof typeof priorityWeight] || 0;
        const bWeight = priorityWeight[b.priority as keyof typeof priorityWeight] || 0;
        return sortConfig.direction === 'asc' ? aWeight - bWeight : bWeight - aWeight;
      }

      if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sortableTasks;
  }, [tasks, sortConfig]);

  const startEdit = (task: Task) => {
    setEditingId(task.id);
    setEditBuffer({ ...task });
  };

  const saveEdit = () => {
    if (editingId) {
      const updated = dataService.updateTask(editingId, editBuffer);
      setTasks(updated);
      setEditingId(null);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditBuffer({});
  };

  const toggleStatus = (task: Task) => {
    const updated = dataService.updateTask(task.id, { completed: !task.completed });
    setTasks(updated);
  };

  return (
    <div className="max-w-[1240px] mx-auto space-y-8 pb-12 animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="section-kicker">Core Operations</div>
          <h2 className="section-title text-4xl">Tasks Center</h2>
          <p className="text-[var(--ink-700)] flex items-center gap-2 mt-2 font-mono text-[13px]">
            <CheckSquare size={16} className="text-[var(--gc-orange)]" />
            Operational queue management and inline reconciliation.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[var(--gc-purple)] text-white text-[12px] font-display font-black uppercase tracking-widest rounded-full hover:opacity-90 shadow-[var(--shadow-sm)] transition-all">
          <Plus size={18} /> New Task
        </button>
      </div>

      <div className="command-card bg-white overflow-hidden">
        <div className="p-5 border-b border-[var(--border)] bg-[var(--bg)] flex flex-wrap gap-4 justify-between items-center">
           <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--ink-500)]">Quick Sort:</span>
              <SortTrigger label="Priority" active={sortConfig?.key === 'priority'} direction={sortConfig?.direction} onClick={() => handleSort('priority')} />
              <SortTrigger label="Due Date" active={sortConfig?.key === 'dueDate'} direction={sortConfig?.direction} onClick={() => handleSort('dueDate')} />
              <SortTrigger label="Campaign" active={sortConfig?.key === 'campaignId'} direction={sortConfig?.direction} onClick={() => handleSort('campaignId')} />
           </div>
           <div className="flex items-center gap-2 text-xs font-bold text-[var(--ink-500)] bg-white px-4 py-2 border border-[var(--border)] rounded-full shadow-sm">
              <span className="flex items-center gap-2 uppercase tracking-wide text-[10px] font-mono"><div className="w-2.5 h-2.5 rounded-full bg-[var(--danger)] shadow-[0_0_8px_rgba(180,35,24,0.4)]" /> Overdue Risk</span>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="grid-header-cell w-[80px]">State</th>
                <th 
                  className="grid-header-cell cursor-pointer hover:bg-[var(--bg)] transition-colors"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-2">
                    Task Description {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                  </div>
                </th>
                <th 
                  className="grid-header-cell cursor-pointer hover:bg-[var(--bg)] transition-colors"
                  onClick={() => handleSort('campaignId')}
                >
                  <div className="flex items-center gap-2">
                    Campaign {sortConfig.key === 'campaignId' && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                  </div>
                </th>
                <th 
                  className="grid-header-cell cursor-pointer hover:bg-[var(--bg)] transition-colors"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center gap-2">
                    Priority {sortConfig.key === 'priority' && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                  </div>
                </th>
                <th 
                  className="grid-header-cell cursor-pointer hover:bg-[var(--bg)] transition-colors"
                  onClick={() => handleSort('dueDate')}
                >
                  <div className="flex items-center gap-2">
                    Due Date {sortConfig.key === 'dueDate' && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                  </div>
                </th>
                <th className="grid-header-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] relative">
              {sortedTasks.map((task) => {
                const isEditing = editingId === task.id;
                const overdue = isPast(task.dueDate) && !task.completed;

                return (
                  <tr key={task.id} className={cn(
                    "group transition-all duration-300 relative bg-white z-0 hover:z-10", 
                    overdue && !isEditing ? "bg-[var(--danger)]/5 hover:bg-[var(--danger)]/10" : "hover:bg-[var(--gc-purple-soft)]",
                    isEditing && "bg-[var(--gc-orange-soft)] shadow-md"
                  )}>
                    <td className="grid-row-cell px-6 py-5">
                       <button 
                         onClick={() => toggleStatus(task)}
                         className={cn(
                           "w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm",
                           task.completed ? "bg-[var(--success)] border-[var(--success)] text-white" : "bg-white border-[var(--border-strong)] text-transparent hover:border-[var(--gc-orange)]"
                         )}
                       >
                         <Check size={16} strokeWidth={3} />
                       </button>
                    </td>
                    <td 
                      className="grid-row-cell px-6 py-5 min-w-[350px] cursor-text"
                      onDoubleClick={() => !isEditing && startEdit(task)}
                    >
                      {isEditing ? (
                        <input 
                          className="w-full px-4 py-3 bg-white border-2 border-[var(--gc-orange)] rounded-xl text-[14px] font-bold outline-none shadow-lg animate-in zoom-in-95 duration-200"
                          value={editBuffer.title}
                          onChange={e => setEditBuffer({ ...editBuffer, title: e.target.value })}
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        />
                      ) : (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "text-[15px] font-bold transition-colors",
                              task.completed ? "text-[var(--ink-300)] line-through decoration-[var(--success)]/30" : "text-[var(--ink-900)]"
                            )}>
                              {task.title}
                            </span>
                            {overdue && (
                              <div className="flex items-center gap-2">
                                <span className="px-2 py-0.5 bg-[var(--danger)] text-white text-[8px] font-black uppercase tracking-widest rounded transition-all animate-pulse shadow-sm shadow-[var(--danger)]/40">
                                  Overdue
                                </span>
                                <div className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--danger)] opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--danger)] shadow-sm"></span>
                                </div>
                              </div>
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-[var(--ink-500)] mt-1.5 uppercase tracking-wider">UNIT-{task.id}</span>
                        </div>
                      )}
                    </td>
                    <td className="grid-row-cell px-6 py-5">
                       <span className="px-3.5 py-1.5 bg-[var(--bg)] text-[var(--ink-700)] rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border border-[var(--border)] shadow-sm">
                         {task.campaignId}
                       </span>
                    </td>
                    <td className="grid-row-cell px-6 py-5">
                       <PriorityBadge level={task.priority} />
                    </td>
                    <td 
                      className="grid-row-cell px-6 py-5"
                      onDoubleClick={() => !isEditing && startEdit(task)}
                    >
                      {isEditing ? (
                        <input 
                          type="date"
                          className="px-4 py-3 bg-white border-2 border-[var(--gc-orange)] rounded-xl text-[13px] font-mono font-bold outline-none shadow-lg animate-in zoom-in-95 duration-200"
                          value={editBuffer.dueDate ? format(editBuffer.dueDate, 'yyyy-MM-dd') : ''}
                          onChange={e => setEditBuffer({ ...editBuffer, dueDate: new Date(e.target.value).getTime() })}
                        />
                      ) : (
                        <div className={cn(
                          "flex items-center gap-2 text-[13px] font-mono font-bold transition-colors",
                          overdue ? "text-[var(--danger)]" : "text-[var(--ink-700)]"
                        )}>
                           <Calendar size={16} className={overdue ? "text-[var(--danger)] animate-pulse" : "text-[var(--ink-300)]"} />
                           {format(task.dueDate, 'MMM dd, yyyy')}
                        </div>
                      )}
                    </td>
                    <td className="grid-row-cell px-6 py-5 text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={saveEdit} 
                            className="w-10 h-10 flex items-center justify-center bg-[var(--success)] text-white rounded-xl hover:opacity-90 shadow-lg shadow-[var(--success)]/20 active:scale-95 transition-all"
                            title="Commit Changes"
                          >
                            <Check size={18} strokeWidth={3} />
                          </button>
                          <button 
                            onClick={cancelEdit} 
                            className="w-10 h-10 flex items-center justify-center bg-[var(--bg)] text-[var(--ink-500)] border border-[var(--border)] rounded-xl hover:bg-[var(--border)] hover:text-[var(--ink-900)] active:scale-95 transition-all"
                            title="Discard"
                          >
                            <X size={18} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => startEdit(task)}
                            className="p-2.5 text-[var(--ink-300)] hover:text-[var(--gc-orange)] hover:bg-[var(--gc-orange-soft)] rounded-md transition-all shadow-sm shadow-transparent hover:shadow-[var(--shadow-sm)]"
                            title="Edit Task"
                          >
                            <Edit2 size={16} />
                          </button>
                        </div>
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
        "flex items-center gap-1.5 px-3.5 py-1.5 transparent rounded-full text-[10px] font-display font-black uppercase tracking-[1.5px] transition-all border",
        active ? "bg-[var(--ink-900)] text-white border-[var(--ink-900)] shadow-sm" : "border-transparent text-[var(--ink-500)] hover:bg-white hover:border-[var(--border)] hover:text-[var(--ink-900)] hover:shadow-sm"
      )}
    >
      {label}
      {active && (direction === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
    </button>
  );
}

function PriorityBadge({ level }: { level: string }) {
  const configs: Record<string, { styles: string, icon: any }> = {
    Critical: { 
      styles: 'bg-red-600 text-white border-red-700 shadow-[0_0_12px_rgba(220,38,38,0.3)]', 
      icon: AlertTriangle 
    },
    High: { 
      styles: 'bg-red-50 text-red-700 border-red-200', 
      icon: Zap 
    },
    Medium: { 
      styles: 'bg-amber-50 text-amber-700 border-amber-200', 
      icon: ChevronUp 
    },
    Low: { 
      styles: 'bg-slate-50 text-slate-500 border-slate-200', 
      icon: Minus 
    }
  };

  const config = configs[level] || configs.Low;
  const Icon = config.icon;

  return (
    <span className={cn(
      "px-3 py-1.5 rounded-lg border text-[9px] font-display font-black uppercase tracking-[1.5px] flex items-center gap-2 w-fit transition-all hover:scale-105", 
      config.styles
    )}>
      <Icon size={12} strokeWidth={3} />
      {level}
    </span>
  );
}
