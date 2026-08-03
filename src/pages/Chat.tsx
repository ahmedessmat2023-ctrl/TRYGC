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
  Loader2,
  Bookmark,
  FileText,
  Copy,
  Check,
  Edit3,
  Trash2,
  FolderPlus,
  ArrowUpRight,
  Filter,
  Search,
  Tag,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface OutreachTemplate {
  id: string;
  title: string;
  category: 'Initial Outreach' | 'Paid Campaign' | 'Product Seeding' | 'Follow-Up' | 'Custom';
  subject: string;
  content: string;
  variables: string[];
  updatedAt: string;
}

const DEFAULT_TEMPLATES: OutreachTemplate[] = [
  {
    id: 'tmpl-1',
    title: 'GCC VIP Creator Invitation',
    category: 'Initial Outreach',
    subject: 'Exclusive Campaign Invitation for {{handle}} x TryGC',
    content: 'Hi {{handle}}, we loved your recent {{platform}} video performance (Avg Views: {{avgViews}})! TryGC is shortlisting top creators in {{niche}} for an exclusive paid campaign in Saudi Arabia. We would love to collaborate with you. Let us know if you are open to reviewing the brief!',
    variables: ['{{handle}}', '{{platform}}', '{{avgViews}}', '{{niche}}'],
    updatedAt: '2026-08-01'
  },
  {
    id: 'tmpl-2',
    title: 'Paid Reel & Short Sponsorship',
    category: 'Paid Campaign',
    subject: 'Paid Video Sponsorship Proposal for {{handle}}',
    content: 'Salam {{handle}}, your content performance in {{niche}} caught our team\'s attention! We are launching a high-priority campaign for {{campaign}} with direct budget for 1 dedicated reel + 2 story drops. Could you share your current rate sheet for GCC reach?',
    variables: ['{{handle}}', '{{niche}}', '{{campaign}}'],
    updatedAt: '2026-08-02'
  },
  {
    id: 'tmpl-3',
    title: 'Product Seeding & Gifting Box',
    category: 'Product Seeding',
    subject: 'Exclusive Premium Gifting Box for {{handle}}',
    content: 'Hi {{handle}}, we would love to send you our new flagship product bundle with zero posting obligations! Based on your audience in {{location}}, we know your followers will love it. Send us your preferred shipping address in {{location}} to dispatch your box.',
    variables: ['{{handle}}', '{{location}}'],
    updatedAt: '2026-07-28'
  },
  {
    id: 'tmpl-4',
    title: 'Campaign Roster Follow-Up',
    category: 'Follow-Up',
    subject: 'Quick follow-up regarding {{campaign}} campaign',
    content: 'Hi {{handle}}, just following up on our previous note regarding {{campaign}}! We are finalizing creator roster slots this week and would love to include your profile. Let us know if you have availability!',
    variables: ['{{handle}}', '{{campaign}}'],
    updatedAt: '2026-07-30'
  }
];

export default function Chat() {
  const [activeTab, setActiveTab] = useState<'chat' | 'templates'>('chat');
  
  // Chat state
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

  // Outreach Templates state
  const [templates, setTemplates] = useState<OutreachTemplate[]>(() => {
    try {
      const saved = localStorage.getItem('trygc_saved_outreach_templates');
      return saved ? JSON.parse(saved) : DEFAULT_TEMPLATES;
    } catch {
      return DEFAULT_TEMPLATES;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal State for Edit / Create
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Partial<OutreachTemplate>>({
    title: '',
    category: 'Initial Outreach',
    subject: '',
    content: ''
  });

  useEffect(() => {
    localStorage.setItem('trygc_saved_outreach_templates', JSON.stringify(templates));
  }, [templates]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, activeTab]);

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

  const handleCopyTemplate = (tmpl: OutreachTemplate) => {
    navigator.clipboard.writeText(`${tmpl.subject ? `Subject: ${tmpl.subject}\n\n` : ''}${tmpl.content}`);
    setCopiedId(tmpl.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleUseInChat = (tmpl: OutreachTemplate) => {
    setInput(`Subject: ${tmpl.subject}\n\n${tmpl.content}`);
    setActiveTab('chat');
  };

  const handleSaveTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate.title || !editingTemplate.content) return;

    if (editingTemplate.id) {
      // Edit existing
      setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? {
        ...t,
        title: editingTemplate.title!,
        category: editingTemplate.category as any || 'Initial Outreach',
        subject: editingTemplate.subject || '',
        content: editingTemplate.content!,
        updatedAt: new Date().toISOString().split('T')[0]
      } : t));
    } else {
      // Create new
      const newTmpl: OutreachTemplate = {
        id: `tmpl-${Date.now()}`,
        title: editingTemplate.title!,
        category: editingTemplate.category as any || 'Initial Outreach',
        subject: editingTemplate.subject || '',
        content: editingTemplate.content!,
        variables: ['{{handle}}', '{{platform}}', '{{avgViews}}'],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setTemplates(prev => [newTmpl, ...prev]);
    }

    setIsModalOpen(false);
    setEditingTemplate({ title: '', category: 'Initial Outreach', subject: '', content: '' });
  };

  const handleDeleteTemplate = (id: string) => {
    if (window.confirm("Are you sure you want to delete this outreach sequence template?")) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const insertVariableIntoContent = (variable: string) => {
    setEditingTemplate(prev => ({
      ...prev,
      content: (prev.content || '') + ` ${variable}`
    }));
  };

  const filteredTemplates = templates.filter(t => {
    const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
    const matchesQuery = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="h-[calc(100vh-140px)] flex gap-8 animate-in fade-in duration-700">
      {/* Sidebar - Context & Navigation */}
      <aside className="w-80 flex flex-col gap-6 h-full">
        {/* Module Switcher */}
        <div className="p-2 bg-slate-100 rounded-2xl border border-slate-200 flex gap-1">
          <button
            onClick={() => setActiveTab('chat')}
            className={cn(
              "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2",
              activeTab === 'chat' 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            <Bot size={15} className="text-[var(--gc-purple)]" />
            <span>AI Mission</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={cn(
              "flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 relative",
              activeTab === 'templates' 
                ? "bg-white text-slate-900 shadow-sm" 
                : "text-slate-500 hover:text-slate-900"
            )}
          >
            <Bookmark size={15} className="text-[var(--gc-orange)]" />
            <span>Templates</span>
            <span className="px-1.5 py-0.2 bg-[var(--gc-orange-soft)] text-[var(--gc-orange)] text-[9px] font-mono font-black rounded-md">
              {templates.length}
            </span>
          </button>
        </div>

        {activeTab === 'chat' ? (
          <>
            <div className="command-card flex-1 flex flex-col p-6 bg-white border border-[var(--border)] rounded-[2rem] shadow-sm">
              <div className="flex items-center justify-between mb-6">
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
               <p className="text-[11px] text-white/70 leading-relaxed font-medium mb-4">
                  AI analysis is synchronized with verified creator view metrics & Grounded Search.
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
          </>
        ) : (
          /* Templates Sidebar Controls */
          <div className="command-card flex-1 flex flex-col p-6 bg-white border border-[var(--border)] rounded-[2rem] shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="section-title text-[11px] tracking-widest uppercase text-[var(--ink-400)]">Outreach Library</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Save & manage influencer recruitment sequences for high conversion.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingTemplate({ title: '', category: 'Initial Outreach', subject: '', content: '' });
                setIsModalOpen(true);
              }}
              className="w-full py-3 bg-slate-900 hover:bg-[var(--gc-purple)] text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Plus size={16} />
              <span>Create Template</span>
            </button>

            <div className="space-y-3 pt-4 border-t border-slate-100">
              <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">Category Filter</label>
              <div className="space-y-1.5">
                {['All', 'Initial Outreach', 'Paid Campaign', 'Product Seeding', 'Follow-Up'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs font-bold text-left transition-all flex items-center justify-between",
                      categoryFilter === cat 
                        ? "bg-[var(--gc-purple-soft)] text-[var(--gc-purple)]" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {cat === 'All' ? templates.length : templates.filter(t => t.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-auto p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-2">
              <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
                <Sparkles size={14} className="text-[var(--gc-purple)]" />
                <span>Variable Tip</span>
              </div>
              <p className="text-[11px] text-purple-700 font-medium leading-relaxed">
                Use variables like <code className="bg-white px-1 py-0.5 rounded font-mono text-[10px]">{"{{handle}}"}</code> and <code className="bg-white px-1 py-0.5 rounded font-mono text-[10px]">{"{{avgViews}}"}</code> to auto-personalize DMs.
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* Main Interface */}
      <div className="flex-1 flex flex-col command-card bg-white border border-[var(--border)] rounded-[2.5rem] shadow-sm relative overflow-hidden">
        {activeTab === 'chat' ? (
          <>
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
                 <button 
                   onClick={() => setActiveTab('templates')}
                   className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] bg-white hover:border-[var(--gc-orange)] rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 hover:text-[var(--gc-orange)] transition-all shadow-sm"
                 >
                    <Bookmark size={14} className="text-[var(--gc-orange)]" /> Saved Templates
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
                       "p-6 rounded-[2rem] text-[15px] leading-relaxed font-medium whitespace-pre-wrap",
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
            <div className="p-8 border-t border-[var(--border)] bg-[var(--bg)]/20 space-y-3">
              <form 
                onSubmit={handleSend}
                className="flex items-center gap-4 bg-white border border-[var(--border-strong)] rounded-full p-2 pl-6 focus-within:ring-4 focus-within:ring-[var(--gc-orange-mid)] focus-within:border-[var(--gc-orange)] transition-all shadow-sm group"
              >
                <input 
                  type="text"
                  placeholder="Ask for strategy, recruitment advice, or type message..."
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
              <div className="flex items-center justify-between px-4">
                 <div className="flex items-center gap-6">
                   <ChatTool icon={Globe} label="Search Grounding" active />
                   <ChatTool icon={Target} label="Market Context" active />
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="text-[10px] text-slate-400 font-bold">Quick Insert:</span>
                   <select 
                     onChange={(e) => {
                       const found = templates.find(t => t.id === e.target.value);
                       if (found) handleUseInChat(found);
                       e.target.value = '';
                     }}
                     className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 outline-none cursor-pointer"
                   >
                     <option value="">Load Saved Template...</option>
                     {templates.map(t => (
                       <option key={t.id} value={t.id}>{t.title} ({t.category})</option>
                     ))}
                   </select>
                 </div>
              </div>
            </div>
          </>
        ) : (
          /* Saved Outreach Templates Library Grid */
          <div className="flex-1 flex flex-col h-full bg-slate-50/50">
            {/* Header */}
            <header className="p-6 bg-white border-b border-slate-200 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-display font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Bookmark className="text-[var(--gc-orange)]" size={22} />
                  <span>Saved Outreach Templates</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">Recruitment sequences, gifting proposals, and follow-up templates</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-[var(--gc-purple-soft)] w-60"
                  />
                </div>
                <button
                  onClick={() => {
                    setEditingTemplate({ title: '', category: 'Initial Outreach', subject: '', content: '' });
                    setIsModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[var(--gc-purple)] hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
                >
                  <Plus size={15} />
                  <span>New Template</span>
                </button>
              </div>
            </header>

            {/* Grid Content */}
            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-6">
              {filteredTemplates.length === 0 ? (
                <div className="min-h-[350px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <FileText size={48} className="text-slate-300 mb-4" />
                  <h4 className="text-lg font-bold text-slate-700">No Templates Found</h4>
                  <p className="text-xs text-slate-400 max-w-sm mt-1 mb-6">Create your first outreach sequence or clear your search filter to view templates.</p>
                  <button
                    onClick={() => {
                      setEditingTemplate({ title: '', category: 'Initial Outreach', subject: '', content: '' });
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    + Create Template
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTemplates.map(tmpl => (
                    <motion.div
                      key={tmpl.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="px-2.5 py-1 bg-purple-50 text-[var(--gc-purple)] border border-purple-100 rounded-lg text-[10px] font-black uppercase tracking-wider">
                              {tmpl.category}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 mt-2">{tmpl.title}</h3>
                          </div>

                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingTemplate(tmpl);
                                setIsModalOpen(true);
                              }}
                              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Edit Template"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteTemplate(tmpl.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete Template"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {tmpl.subject && (
                          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Subject</p>
                            <p className="text-xs font-bold text-slate-800">{tmpl.subject}</p>
                          </div>
                        )}

                        <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-100 text-xs text-slate-700 font-medium leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto">
                          {tmpl.content}
                        </div>

                        {tmpl.variables && tmpl.variables.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {tmpl.variables.map(v => (
                              <span key={v} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded font-mono text-[10px] font-bold">
                                {v}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-400">Updated: {tmpl.updatedAt}</span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyTemplate(tmpl)}
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                          >
                            {copiedId === tmpl.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                            <span>{copiedId === tmpl.id ? 'Copied!' : 'Copy'}</span>
                          </button>

                          <button
                            onClick={() => handleUseInChat(tmpl)}
                            className="px-3.5 py-1.5 bg-slate-900 hover:bg-[var(--gc-purple)] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <span>Use Template</span>
                            <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal for Creating / Editing Outreach Template */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden"
            >
              <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--gc-purple)] flex items-center justify-center text-white">
                    <Bookmark size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">{editingTemplate.id ? 'Edit Outreach Template' : 'Create New Outreach Template'}</h3>
                    <p className="text-xs text-slate-400 font-medium">Draft reusable recruitment sequence for creators</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveTemplateSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">Template Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Saudi Beauty VIP Invitation"
                      value={editingTemplate.title || ''}
                      onChange={e => setEditingTemplate({...editingTemplate, title: e.target.value})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[var(--gc-purple-soft)]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">Category</label>
                    <select
                      value={editingTemplate.category || 'Initial Outreach'}
                      onChange={e => setEditingTemplate({...editingTemplate, category: e.target.value as any})}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[var(--gc-purple-soft)]"
                    >
                      <option value="Initial Outreach">Initial Outreach</option>
                      <option value="Paid Campaign">Paid Campaign</option>
                      <option value="Product Seeding">Product Seeding</option>
                      <option value="Follow-Up">Follow-Up</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700">Subject Line (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Paid Reel Collaboration Proposal for {{handle}}"
                    value={editingTemplate.subject || ''}
                    onChange={e => setEditingTemplate({...editingTemplate, subject: e.target.value})}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:ring-2 focus:ring-[var(--gc-purple-soft)]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-700">Message Payload Body</label>
                    <span className="text-[10px] text-slate-400 font-bold">Click variable to insert:</span>
                  </div>

                  {/* Variable Helper Chips */}
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {['{{handle}}', '{{platform}}', '{{avgViews}}', '{{niche}}', '{{location}}', '{{campaign}}'].map(v => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => insertVariableIntoContent(v)}
                        className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-[var(--gc-purple)] rounded border border-purple-200 font-mono text-[10px] font-bold transition-all"
                      >
                        + {v}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={5}
                    required
                    placeholder="Write your recruitment message here..."
                    value={editingTemplate.content || ''}
                    onChange={e => setEditingTemplate({...editingTemplate, content: e.target.value})}
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-[var(--gc-purple-soft)] leading-relaxed"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-slate-900 hover:bg-[var(--gc-purple)] text-white text-xs font-bold rounded-xl shadow-md transition-all"
                  >
                    Save Template
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
