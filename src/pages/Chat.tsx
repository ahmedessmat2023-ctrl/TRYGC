/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  User, 
  Bot, 
  MessageSquare, 
  Hash, 
  Plus, 
  MoreVertical,
  ChevronRight,
  TrendingUp,
  Target,
  Zap,
  Globe,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Welcome, Ahmed. I'm your AI Mission Strategist. How can I assist you with your campaign discovery or creator roster today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Analyzing "${userMsg.content}" across our operational indices. Based on current trends in Saudi Arabia and your active campaigns, I recommend focusing on micro-creators in the tech-lifestyle niche for maximum ROI. Would you like me to pull some specific handle suggestions?`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex gap-8 animate-in fade-in duration-700">
      {/* Sidebar - Context & History */}
      <aside className="w-80 flex flex-col gap-6 h-full">
        <div className="command-card flex-1 flex flex-col p-6 bg-white border border-[var(--border)] rounded-[2rem] shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="section-title text-[11px] tracking-widest uppercase text-[var(--ink-400)]">Active Threads</h3>
            <button className="w-8 h-8 rounded-xl bg-[var(--bg)] border border-[var(--border)] flex items-center justify-center text-[var(--ink-500)] hover:bg-[var(--gc-orange-soft)] hover:text-[var(--gc-orange)] transition-all">
              <Plus size={16} />
            </button>
          </div>
          
          <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pr-2">
            {[
              { title: 'Influencer Mapping KSA', active: true },
              { title: 'Red Bull Summer ROI', active: false },
              { title: 'STC Pay Sentiment Analysis', active: false },
              { title: 'Gaming Creator Pulse', active: false },
            ].map((thread, i) => (
              <button 
                key={i}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-left group",
                  thread.active ? "bg-[var(--gc-purple)] text-white shadow-md shadow-purple-900/10" : "hover:bg-[var(--bg)] text-[var(--ink-700)] hover:text-[var(--gc-purple)]"
                )}
              >
                <Hash size={16} className={cn("shrink-0", thread.active ? "text-purple-300" : "text-[var(--ink-300)]")} />
                <span className="text-[13px] font-bold truncate flex-1">{thread.title}</span>
                <ChevronRight size={14} className={cn("opacity-0 group-hover:opacity-100 transition-opacity", thread.active ? "text-white" : "text-[var(--ink-300)]")} />
              </button>
            ))}
          </div>
        </div>

        <div className="command-card p-6 bg-[var(--ink-900)] text-white rounded-[2rem] border-none">
           <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[var(--gc-orange)]">
                 <Sparkles size={20} />
              </div>
              <h4 className="font-display font-black text-sm uppercase tracking-widest">Power Insights</h4>
           </div>
           <p className="text-[11px] text-white/70 leading-relaxed font-medium mb-6">
              AI analysis is currently synchronized with Google Search grounding for real-time market accuracy.
           </p>
           <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest">
                 <span className="text-white/50">Market Drift</span>
                 <span className="text-emerald-400">+12.4%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-[var(--gc-orange)] w-[75%]" />
              </div>
           </div>
        </div>
      </aside>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col command-card bg-white border border-[var(--border)] rounded-[2.5rem] shadow-sm relative overflow-hidden">
        {/* Header */}
        <header className="p-6 border-b border-[var(--border)] flex justify-between items-center bg-[var(--bg)]/30">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-[var(--gc-purple)] text-white rounded-2xl flex items-center justify-center shadow-md">
                <Bot size={24} />
             </div>
             <div>
                <h2 className="text-[15px] font-display font-black text-[var(--ink-900)] tracking-tight">AI Mission Strategist</h2>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                   <span className="text-[10px] font-mono font-bold text-[var(--ink-400)] uppercase tracking-widest">Neural Link Active</span>
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-xl text-[10px] font-black uppercase tracking-widest text-[var(--ink-500)] hover:bg-white hover:text-[var(--ink-900)] transition-all">
                <TrendingUp size={14} /> Trends
             </button>
             <button className="w-10 h-10 flex items-center justify-center border border-[var(--border)] rounded-xl text-[var(--ink-400)] hover:text-[var(--ink-900)] hover:bg-white transition-all">
                <MoreVertical size={18} />
             </button>
          </div>
        </header>

        {/* Messages */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar"
        >
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex gap-6 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-sm",
                msg.role === 'user' ? "bg-[var(--gc-orange)] text-white" : "bg-white border border-[var(--border)] text-[var(--gc-purple)]"
              )}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={cn(
                "space-y-3",
                msg.role === 'user' ? "text-right" : ""
              )}>
                 <div className={cn(
                   "p-6 rounded-[2rem] text-[15px] leading-relaxed font-medium",
                   msg.role === 'user' 
                     ? "bg-[var(--gc-orange)] text-white rounded-tr-none shadow-md shadow-orange-900/10" 
                     : "bg-[var(--bg)] text-[var(--ink-900)] rounded-tl-none border border-[var(--border)]"
                 )}>
                   {msg.content}
                 </div>
                 <p className="text-[9px] font-mono font-bold text-[var(--ink-400)] uppercase tracking-widest">
                   {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                 </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-6 animate-in slide-in-from-left-4 duration-300">
               <div className="w-12 h-12 rounded-2xl bg-white border border-[var(--border)] flex items-center justify-center text-[var(--gc-purple)] shadow-sm">
                  <Bot size={20} />
               </div>
               <div className="bg-[var(--bg)] p-6 rounded-[2rem] rounded-tl-none border border-[var(--border)]">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[var(--gc-purple)] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-[var(--gc-purple)] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-[var(--gc-purple)] rounded-full animate-bounce" />
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-8 border-t border-[var(--border)] bg-[var(--bg)]/20">
          <form 
            onSubmit={handleSend}
            className="flex items-center gap-4 bg-white border border-[var(--border-strong)] rounded-full p-2 pl-6 focus-within:ring-4 focus-within:ring-[var(--gc-orange-mid)] focus-within:border-[var(--gc-orange)] transition-all shadow-sm group"
          >
            <input 
              type="text"
              placeholder="Ask for strategy, discovery, or operational advice..."
              className="flex-1 bg-transparent outline-none text-sm font-bold text-[var(--ink-900)] placeholder:text-[var(--ink-300)]"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-12 h-12 bg-[var(--ink-900)] text-white rounded-full flex items-center justify-center hover:bg-[var(--gc-orange)] disabled:opacity-50 disabled:hover:bg-[var(--ink-900)] transition-all shadow-md group-hover:scale-105 active:scale-95"
            >
              <Send size={18} />
            </button>
          </form>
          <div className="flex items-center justify-center gap-8 mt-4">
             <ChatTool icon={Globe} label="Search Grounding" active />
             <ChatTool icon={Target} label="Market Context" active />
             <ChatTool icon={Zap} label="Real-time Pulse" active />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatTool({ icon: Icon, label, active }: any) {
  return (
    <div className={cn(
      "flex items-center gap-2 text-[9px] font-black uppercase tracking-[1.5px] transition-all",
      active ? "text-[var(--gc-orange)]" : "text-[var(--ink-300)]"
    )}>
       <div className={cn(
         "w-2 h-2 rounded-full",
          active ? "bg-[var(--gc-orange)] animate-pulse shadow-[0_0_8px_var(--gc-orange)]" : "bg-[var(--ink-200)]"
       )} />
       <Icon size={12} />
       {label}
    </div>
  );
}
