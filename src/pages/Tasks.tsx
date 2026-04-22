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
    <div className="space-y-8 pb-12 animate-in fade-in duration-500">
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
              <span className="text-[10px] font-display font-black uppercase tracking-widest text-slate-400">Quick Sort:</span>
              <SortTrigger label="Priority" active={sortConfig?.key === 'priority'} direction={sortConfig?.direction} onClick={() => handleSort('priority')} />
              <SortTrigger label="Due Date" active={sortConfig?.key === 'dueDate'} direction={sortConfig?.direction} onClick={() => handleSort('dueDate')} />
              <SortTrigger label="Campaign" active={sortConfig?.key === 'campaignId'} direction={sortConfig?.direction} onClick={() => handleSort('campaignId')} />
           </div>
           <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" /> Overdue Risk</span>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="grid-header-cell w-[80px]">State</th>
                <th 
                  className="grid-header-cell cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-2">
                    Task Description {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                  </div>
                </th>
                <th 
                  className="grid-header-cell cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => handleSort('campaignId')}
                >
                  <div className="flex items-center gap-2">
                    Campaign {sortConfig.key === 'campaignId' && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                  </div>
                </th>
                <th 
                  className="grid-header-cell cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => handleSort('priority')}
                >
                  <div className="flex items-center gap-2">
                    Priority {sortConfig.key === 'priority' && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                  </div>
                </th>
                <th 
                  className="grid-header-cell cursor-pointer hover:bg-slate-50 transition-colors"
                  onClick={() => handleSort('dueDate')}
                >
                  <div className="flex items-center gap-2">
                    Due Date {sortConfig.key === 'dueDate' && (sortConfig.direction === 'asc' ? <ChevronUp size={12}/> : <ChevronDown size={12}/>)}
                  </div>
                </th>
                <th className="grid-header-cell text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {sortedTasks.map((task) => {
                const isEditing = editingId === task.id;
                const overdue = isPast(task.dueDate) && !task.completed;

                return (
                  <tr key={task.id} className={cn(
                    "group transition-all duration-300", 
                    overdue && !isEditing ? "bg-red-50/10 hover:bg-red-50/20" : "hover:bg-[var(--gc-purple-soft)]/20",
                    isEditing && "bg-[var(--gc-orange-soft)]/20"
                  )}>
                    <td className="grid-row-cell">
                       <button 
                         onClick={() => toggleStatus(task)}
                         className={cn(
                           "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all shadow-sm",
                           task.completed ? "bg-emerald-500 border-emerald-500 text-white" : "bg-white border-slate-200 text-transparent hover:border-[var(--gc-orange)]"
                         )}
                       >
                         <Check size={14} strokeWidth={3} />
                       </button>
                    </td>
                    <td 
                      className="grid-row-cell min-w-[350px] cursor-text"
                      onDoubleClick={() => !isEditing && startEdit(task)}
                    >
                      {isEditing ? (
                        <input 
                          className="w-full px-3 py-2 bg-white border-2 border-[var(--gc-orange)] rounded-xl text-sm font-bold outline-none shadow-lg animate-in zoom-in-95 duration-200"
                          value={editBuffer.title}
                          onChange={e => setEditBuffer({ ...editBuffer, title: e.target.value })}
                          autoFocus
                          onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        />
                      ) : (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-3">
                            <span className={cn(
                              "text-sm font-bold text-slate-900 transition-colors",
                              task.completed && "text-slate-400 line-through decoration-emerald-500/30"
                            )}>
                              {task.title}
                            </span>
                            {overdue && (
                              <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-sm shadow-red-500/40"></span>
                              </div>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 mt-1 uppercase tracking-widest">{task.id}</span>
                        </div>
                      )}
                    </td>
                    <td className="grid-row-cell">
                       <span className="px-3 py-1 bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] rounded-lg text-[10px] font-display font-black uppercase tracking-tight border border-[var(--gc-purple-soft)]">
                         {task.campaignId}
                       </span>
                    </td>
                    <td className="grid-row-cell">
                       <PriorityBadge level={task.priority} />
                    </td>
                    <td 
                      className="grid-row-cell"
                      onDoubleClick={() => !isEditing && startEdit(task)}
                    >
                      {isEditing ? (
                        <input 
                          type="date"
                          className="px-3 py-2 bg-white border-2 border-[var(--gc-orange)] rounded-xl text-xs font-mono font-bold outline-none shadow-lg animate-in zoom-in-95 duration-200"
                          value={editBuffer.dueDate ? format(editBuffer.dueDate, 'yyyy-MM-dd') : ''}
                          onChange={e => setEditBuffer({ ...editBuffer, dueDate: new Date(e.target.value).getTime() })}
                        />
                      ) : (
                        <div className={cn(
                          "flex items-center gap-2 text-xs font-mono font-black transition-colors",
                          overdue ? "text-red-600" : "text-slate-600"
                        )}>
                           <Calendar size={14} className={overdue ? "text-red-500 animate-pulse" : "text-slate-300"} />
                           {format(task.dueDate, 'MMM dd, yyyy')}
                        </div>
                      )}
                    </td>
                    <td className="grid-row-cell text-right">
                      {isEditing ? (
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={saveEdit} 
                            className="w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                            title="Commit Changes"
                          >
                            <Check size={16} strokeWidth={3} />
                          </button>
                          <button 
                            onClick={cancelEdit} 
                            className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-200 active:scale-95 transition-all"
                            title="Discard"
                          >
                            <X size={16} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <button 
                            onClick={() => startEdit(task)}
                            className="p-2 text-slate-400 hover:text-[var(--gc-orange)] hover:bg-[var(--gc-orange-soft)] rounded-xl transition-all"
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
