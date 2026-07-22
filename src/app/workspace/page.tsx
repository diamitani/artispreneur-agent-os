'use client';

import { useState } from 'react';
import {
  Plus,
  MessageSquare,
  Folder,
  Zap,
  FileOutput,
  Music,
  Radio,
  BadgeDollarSign,
  Building2,
  Calculator,
  Sparkles,
  Settings,
  ArrowUp,
  Paperclip,
  Mic,
  ChevronsUpDown,
  Bot,
} from 'lucide-react';

const AGENTS = [
  { key: 'pro', name: 'Publishing Agent', icon: Music, desc: 'PROs · splits · royalties' },
  { key: 'dist', name: 'Distribution Agent', icon: Radio, desc: 'releases · DSPs · rollout' },
  { key: 'lic', name: 'Licensing Agent', icon: BadgeDollarSign, desc: 'sync · film · TV · games' },
  { key: 'biz', name: 'Business Agent', icon: Building2, desc: 'LLC · EIN · banking' },
  { key: 'tax', name: 'Accounting Agent', icon: Calculator, desc: 'books · taxes · income' },
  { key: 'brand', name: 'Brand Agent', icon: Sparkles, desc: 'EPK · trademark · socials' },
];

export default function WorkspacePage() {
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([]);
  const [thinking, setThinking] = useState(false);
  const [activeView, setActiveView] = useState<'chat' | 'projects' | 'skills' | 'outputs'>('chat');

  const activeAgent = AGENTS[activeAgentIndex];
  const AgentIcon = activeAgent.icon;

  const handleSend = () => {
    if (!draft.trim() || thinking) return;

    const userMessage = draft.trim();
    setMessages([...messages, { role: 'user', text: userMessage }]);
    setDraft('');
    setThinking(true);

    // Simulate agent response
    setTimeout(() => {
      setThinking(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: `I'm the ${activeAgent.name}. I've received your request: "${userMessage}". This is a demo response. In production, I would use the ROSTR framework to process your intent through PAL compilation, classify the phase, and execute the appropriate workflow.`,
        },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed inset-0 grid grid-cols-[280px_1fr] bg-dark">
      {/* Sidebar */}
      <div className="bg-dark-200 border-r border-dark-500 flex flex-col min-h-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-dark-500">
          <div className="w-8 h-8 bg-crimson rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-serif font-bold">A</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-white text-base leading-tight">
              Artispreneur
            </span>
            <span className="font-mono text-[10px] font-semibold tracking-[3px] text-gold uppercase">
              Agent OS
            </span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button className="w-full flex items-center gap-2.5 bg-crimson hover:bg-crimson-dark text-white rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors">
            <Plus size={16} />
            New chat
          </button>
        </div>

        {/* Navigation */}
        <div className="px-2.5 pb-3.5 flex flex-col gap-0.5">
          {[
            { key: 'projects', name: 'Projects', icon: Folder, count: '0' },
            { key: 'skills', name: 'Skills', icon: Zap, count: '0' },
            { key: 'outputs', name: 'Outputs', icon: FileOutput, count: '0' },
          ].map((item) => {
            const ItemIcon = item.icon;
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveView(item.key as any)}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-dark-400 text-white'
                    : 'text-gray-400 hover:bg-dark-400 hover:text-white'
                }`}
              >
                <ItemIcon size={16} className={isActive ? 'text-gold' : 'text-gray-500'} />
                <span className="text-[13px] font-medium flex-1 text-left">{item.name}</span>
                <span className="font-mono text-[10.5px] text-gray-600">{item.count}</span>
              </button>
            );
          })}
        </div>

        {/* Agents */}
        <div className="px-5 pb-2 font-mono text-[10.5px] font-semibold tracking-[2px] uppercase text-gray-600">
          // Agents
        </div>
        <div className="flex-1 overflow-y-auto px-2.5 pb-4">
          {AGENTS.map((agent, i) => {
            const Icon = agent.icon;
            const isActive = i === activeAgentIndex;
            return (
              <button
                key={agent.key}
                onClick={() => setActiveAgentIndex(i)}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg mb-0.5 transition-colors ${
                  isActive
                    ? 'bg-dark-400 text-white'
                    : 'text-gray-400 hover:bg-dark-400 hover:text-white'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                    isActive ? 'bg-crimson' : 'bg-dark-500'
                  }`}
                >
                  <Icon size={16} className="text-white" />
                </div>
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="text-[13px] font-medium truncate w-full text-left">
                    {agent.name.replace(' Agent', '')}
                  </span>
                  <span className="text-[10.5px] text-gray-600 truncate w-full text-left">
                    {agent.desc}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* User Profile */}
        <div className="border-t border-dark-500 p-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gold text-dark font-bold flex items-center justify-center flex-shrink-0">
            P
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[13px] font-semibold text-white">Pat</span>
            <span className="text-[11.5px] text-gray-500">Agent plan · $99/mo</span>
          </div>
          <Settings size={16} className="text-gray-500 cursor-pointer hover:text-white flex-shrink-0" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-h-0 min-w-0 relative grid-background">
        <div className="absolute inset-0 radial-overlay pointer-events-none"></div>

        {activeView === 'chat' && (
          <>
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-7 py-3.5 border-b border-dark-500 bg-dark/70 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] bg-crimson rounded-md flex items-center justify-center">
                  <AgentIcon size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{activeAgent.name}</span>
                  <span className="font-mono text-[10.5px] text-gray-600">{activeAgent.desc}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] font-medium tracking-[1.5px] uppercase text-gold">
                <span className="w-1.5 h-1.5 rounded-full bg-gold animate-blink"></span>
                Online
              </div>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 overflow-y-auto min-h-0">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-10 text-center">
                  <div className="w-13 h-13 mb-5.5">
                    <AgentIcon size={52} className="text-crimson opacity-90" />
                  </div>
                  <h2 className="font-serif font-bold text-[30px] text-white mb-2.5">
                    What do you want to work on?
                  </h2>
                  <p className="text-[14.5px] text-gray-500 mb-8.5 max-w-[440px]">
                    Ask anything, or tell me what you need help with.
                  </p>
                </div>
              ) : (
                <div className="max-w-[820px] mx-auto py-8 px-7 flex flex-col gap-6.5">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex gap-3.5 animate-rise-in">
                      <div
                        className={`w-[30px] h-[30px] rounded-md flex items-center justify-center flex-shrink-0 ${
                          msg.role === 'user' ? 'bg-gold text-dark' : 'bg-crimson text-white'
                        }`}
                      >
                        {msg.role === 'user' ? (
                          <span className="font-bold text-[12.5px]">P</span>
                        ) : (
                          <Bot size={16} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[12.5px] font-bold mb-1.5 ${
                            msg.role === 'user' ? 'text-gold' : 'text-white'
                          }`}
                        >
                          {msg.role === 'user' ? 'You' : activeAgent.name}
                        </div>
                        <div className="text-[14.5px] leading-relaxed text-gray-300 whitespace-pre-wrap">
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {thinking && (
                    <div className="flex gap-3.5">
                      <div className="w-[30px] h-[30px] bg-crimson rounded-md flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="flex items-center gap-1.5 pt-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-dot-pulse"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-dot-pulse [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold animate-dot-pulse [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="relative z-10 px-7 py-3 pb-5">
              <div className="max-w-[820px] mx-auto">
                <div className="bg-dark-300 border border-dark-600 rounded-xl overflow-hidden focus-within:border-crimson transition-colors">
                  <textarea
                    rows={Math.min(6, Math.max(1, draft.split('\n').length))}
                    placeholder={`Message your ${activeAgent.name}...`}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none resize-none px-4.5 py-4 pt-4 pb-1.5 font-sans text-[14.5px] leading-relaxed text-white placeholder:text-gray-600"
                  />
                  <div className="flex items-center justify-between px-3 py-2 pb-3">
                    <div className="flex items-center gap-1.5">
                      <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-dark-500 hover:text-white transition-colors">
                        <Paperclip size={16} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-dark-500 hover:text-white transition-colors">
                        <Mic size={16} />
                      </button>
                      <button className="flex items-center gap-1.5 font-mono text-[11.5px] font-medium text-gray-400 border border-dark-600 rounded-md px-3 py-1.5 hover:text-gold hover:border-gold transition-colors">
                        <AgentIcon size={13} />
                        {activeAgent.name.replace(' Agent', '')}
                        <ChevronsUpDown size={12} />
                      </button>
                    </div>
                    <button
                      onClick={handleSend}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        draft.trim() ? 'bg-crimson hover:bg-crimson-dark' : 'bg-dark-600'
                      }`}
                    >
                      <ArrowUp size={18} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="text-center text-[11.5px] text-gray-600 mt-2.5">
                  Agents can make mistakes. Verify filings before you submit. ·{' '}
                  <span className="text-gray-500">agent.artispreneur.com</span>
                </div>
              </div>
            </div>
          </>
        )}

        {activeView !== 'chat' && (
          <div className="relative z-10 flex-1 overflow-y-auto px-12 py-10">
            <div className="font-mono text-crimson text-xs font-semibold tracking-[3px] uppercase mb-3">
              // {activeView}
            </div>
            <h1 className="font-serif font-bold text-[32px] text-white mb-2">
              {activeView === 'projects' && 'Project Folders'}
              {activeView === 'skills' && 'Skills Marketplace'}
              {activeView === 'outputs' && 'Agent Outputs'}
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              {activeView === 'projects' &&
                'Each project keeps its own files, instructions, soul, and conversations.'}
              {activeView === 'skills' &&
                'Install workflows and specialist abilities — free or paid.'}
              {activeView === 'outputs' &&
                'Everything your agents produced — filings, plans, drafts, and reports.'}
            </p>
            <div className="text-gray-600 text-sm">Coming soon...</div>
          </div>
        )}
      </div>
    </div>
  );
}
