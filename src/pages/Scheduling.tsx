/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users, ChevronLeft, ChevronRight, Filter, Search, Plus } from 'lucide-react';
import { cn } from '../utils';

export default function Scheduling() {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-display font-black tracking-tighter text-slate-900">Operational Scheduler</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Harmonize creator visits & content distribution timelines</p>
        </div>
        <div className="flex gap-4">
           <button className="px-6 py-4 bg-white border-2 border-slate-50 text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest hover:border-slate-200 transition-all">
              Timeline View
           </button>
           <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-[var(--gc-orange)] transition-colors flex items-center gap-3">
              Add Event <Plus size={16} />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
         {/* Calendar Control */}
         <div className="lg:col-span-8 space-y-6">
            <div className="command-card bg-white border-2 border-slate-50 rounded-[2.5rem] overflow-hidden shadow-sm">
               <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
                  <div className="flex items-center gap-6">
                     <h3 className="text-2xl font-display font-black tracking-tight text-slate-900">October 2024</h3>
                     <div className="flex items-center gap-1 border border-slate-100 rounded-xl p-1 bg-white">
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                           <ChevronLeft size={18} />
                        </button>
                        <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-900 transition-colors">
                           <ChevronRight size={18} />
                        </button>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     {['M', 'W', 'D'].map(v => (
                       <button key={v} className="w-10 h-10 flex items-center justify-center border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                          {v}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-7 border-b border-slate-50 bg-slate-50/50">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400 border-r border-slate-50 last:border-r-0">
                       {day}
                    </div>
                  ))}
               </div>

               <div className="grid grid-cols-7">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - 2;
                    const isToday = day === 22;
                    const hasEvent = [12, 15, 18, 22, 25, 28].includes(day);
                    
                    return (
                      <div key={i} className={cn(
                        "h-32 p-4 border-r border-b border-slate-50 relative group cursor-pointer transition-all hover:bg-slate-50/50",
                        (i + 1) % 7 === 0 && "border-r-0",
                        day < 1 || day > 31 ? "bg-slate-50/30 opacity-20" : ""
                      )}>
                         <span className={cn(
                           "text-xs font-black tabular-nums",
                           isToday ? "text-[var(--gc-orange)]" : "text-slate-400"
                         )}>{day > 0 && day <= 31 ? day : ''}</span>

                         {hasEvent && day > 0 && (
                           <div className="mt-2 space-y-1">
                              <div className="px-2 py-1 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] text-[8px] font-black uppercase tracking-widest rounded-lg truncate border border-[var(--gc-orange-soft)]">
                                 Visit: Red Bull
                              </div>
                              {day === 22 && (
                                <div className="px-2 py-1 bg-[var(--gc-purple-soft)] text-[var(--gc-purple)] text-[8px] font-black uppercase tracking-widest rounded-lg truncate border border-[var(--gc-purple-soft)]">
                                   Post: STC Pay
                                </div>
                              )}
                           </div>
                         )}
                         
                         {isToday && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--gc-orange)] animate-pulse shadow-[0_0_8px_rgba(232,99,12,0.5)]" />}
                      </div>
                    );
                  })}
               </div>
            </div>
         </div>

         {/* Selection Intelligence */}
         <div className="lg:col-span-4 space-y-8">
            <div className="command-card p-10 bg-slate-900 rounded-[3rem] text-white space-y-10 shadow-2xl relative overflow-hidden border border-slate-800">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--gc-orange)] opacity-10 blur-[80px]" />
               <div className="space-y-6 relative z-10">
                  <h3 className="section-title text-base tracking-widest uppercase opacity-70">Agenda: Today</h3>
                  <div className="space-y-6">
                     {[
                       { title: 'Jeddah Experience Visit', creator: '@tech_omar', time: '14:00 - 18:00', type: 'Visit' },
                       { title: 'Content Mirror Validation', creator: 'Internal System', time: '19:00', type: 'Sync' }
                     ].map((item, idx) => (
                       <div key={idx} className="flex gap-5 p-5 bg-white/5 border border-white/10 rounded-[2rem] group hover:bg-white/10 transition-colors">
                          <div className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform",
                            item.type === 'Visit' ? "bg-[var(--gc-orange)]" : "bg-[var(--gc-purple)]"
                          )}>
                             {item.type === 'Visit' ? <MapPin size={24} /> : <CalendarIcon size={24} />}
                          </div>
                          <div>
                             <p className="text-xs font-black uppercase tracking-widest text-white">{item.title}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{item.creator} • {item.time}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="pt-8 border-t border-white/5 relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Team Capacity</p>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[72%]" />
                  </div>
                  <p className="text-[9px] font-bold text-emerald-400 mt-2 uppercase tracking-wide">Sync level: Optimal</p>
               </div>
            </div>

            <div className="command-card p-8 bg-white border-2 border-slate-50 rounded-[2.5rem] space-y-6">
               <div className="flex items-center gap-3">
                  <Clock size={18} className="text-slate-400" />
                  <h4 className="section-title text-[10px] tracking-widest uppercase opacity-60">Pending Approvals</h4>
               </div>
               <div className="space-y-4">
                  {[1, 2].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl group cursor-pointer hover:bg-slate-50">
                       <div className="flex gap-3 items-center">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500">
                             RB
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900 opacity-80">RB Visit Reschedule</span>
                       </div>
                       <ChevronRight size={14} className="text-slate-200 group-hover:text-slate-900 transition-colors" />
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
