'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Plus,
  MessageSquare,
  Folder,
  FolderOpen,
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
  ArrowLeft,
  Paperclip,
  Mic,
  ChevronsUpDown,
  Bot,
  History,
  Share,
  Upload,
  ChevronRight,
  File,
  FileText,
  FileAudio,
  Image,
  Table,
  Download,
  Search,
} from 'lucide-react';

// Agent definitions
const AGENTS = [
  { key: 'pro', name: 'Publishing Agent', icon: Music, desc: 'PROs · splits · royalties' },
  { key: 'dist', name: 'Distribution Agent', icon: Radio, desc: 'releases · DSPs · rollout' },
  { key: 'lic', name: 'Licensing Agent', icon: BadgeDollarSign, desc: 'sync · film · TV · games' },
  { key: 'biz', name: 'Business Agent', icon: Building2, desc: 'LLC · EIN · banking' },
  { key: 'tax', name: 'Accounting Agent', icon: Calculator, desc: 'books · taxes · income' },
  { key: 'brand', name: 'Brand Agent', icon: Sparkles, desc: 'EPK · trademark · socials' },
];

// Soul personalities
const SOULS = [
  { key: 'manager', name: 'The Manager', desc: 'Direct, deadline-driven, keeps you on schedule' },
  { key: 'mentor', name: 'The Mentor', desc: 'Explains the why behind every step' },
  { key: 'executive', name: 'The Executive', desc: 'Short reports, big picture, no fluff' },
  { key: 'hustler', name: 'The Hustler', desc: 'Aggressive outreach energy, always pitching' },
];

// Demo responses per agent
const AGENT_REPLIES: Record<string, string> = {
  pro: `Checking your catalogue... found 12 registered works and 2 unregistered: "Midnight Run" and "Cold Water".

For "Midnight Run" I have a split sheet on file — you 60% / J. Rivera 40%. I can draft the BMI work registration now with titles, writers, IPI numbers, and publisher share pre-filled.`,
  dist: `Here's a rollout I'd recommend for an October 10 release:

• Aug 15 — master + artwork locked
• Aug 22 — distribute (4–6 wk lead for editorial)
• Sep 12 — pre-save live, pitch via Spotify for Artists
• Oct 10 — release + content push

Want me to build this as a checklist with reminders?`,
  lic: `I scanned your catalogue metadata for sync-readiness. 8 of 14 tracks have instrumentals — good. 3 are missing publisher clearance info, which most supervisors require.

I can fix the metadata gaps and shortlist sync platforms that fit your genre.`,
  biz: `For a solo artist in your state, a single-member LLC is usually the move. Here's the path:

1. Name check + articles of organization
2. EIN (free, ~10 min, IRS direct)
3. Business bank account

I can pre-fill the EIN application from your profile right now.`,
  tax: `Pulling your linked accounts... Q3 music income so far: $4,218 (streaming $1,940 · shows $1,850 · sync $428).

Deductions I'm tracking: $1,120 in gear, travel, and studio time. Estimated Q3 set-aside: ~$620. Want the full breakdown as a report?`,
  brand: `Your EPK is 80% complete — missing a high-res press photo and one recent press quote.

On trademark: your artist name is clear in Class 41 (entertainment) at first pass. I can start the knockout search and draft the filing.`,
};

// Skills marketplace data
const SKILLS = [
  { icon: 'music', name: 'PRO Work Registration', author: 'Artispreneur', installs: '2.4k installs', desc: 'Registers songs with BMI/ASCAP/SESAC — titles, writers, IPI numbers, splits.', price: 'Free', cat: 1 },
  { icon: 'file-signature', name: 'Split Sheet Generator', author: 'Artispreneur', installs: '1.9k installs', desc: 'Drafts and routes split sheets to collaborators for e-signature.', price: 'Free', cat: 1 },
  { icon: 'radio', name: 'Release Rollout Planner', author: 'Artispreneur', installs: '1.2k installs', desc: 'Builds a full release timeline with distributor deadlines and pre-save setup.', price: '$19', cat: 2 },
  { icon: 'clapperboard', name: 'Sync Pitch Writer', author: 'SyncLab', installs: '840 installs', desc: 'Writes supervisor-ready pitch emails matched to briefs in film, TV, and ads.', price: '$29', cat: 2 },
  { icon: 'building-2', name: 'EIN Filing Assistant', author: 'Artispreneur', installs: '3.1k installs', desc: 'Walks the IRS EIN application end-to-end and stores your confirmation.', price: 'Free', cat: 3 },
  { icon: 'search-check', name: 'Royalty Audit', author: 'AuditWorks', installs: '620 installs', desc: 'Cross-checks PRO, distributor, and publisher statements for missing money.', price: '$49', cat: 1 },
];

// Output folders
const FOLDERS = [
  { name: 'Publishing', files: [
    { icon: 'file-text', name: 'BMI work registration — Midnight Run', type: 'FILING', date: 'Jul 20' },
    { icon: 'file-signature', name: 'Split sheet — Midnight Run (60/40)', type: 'PDF', date: 'Jul 19' },
  ]},
  { name: 'Distribution', files: [
    { icon: 'calendar', name: 'October EP rollout timeline', type: 'PLAN', date: 'Jul 21' },
    { icon: 'file-text', name: 'Distributor comparison — 2026', type: 'REPORT', date: 'Jul 16' },
  ]},
  { name: 'Licensing', files: [
    { icon: 'file-text', name: 'Sync-readiness scan — full catalogue', type: 'REPORT', date: 'Jul 18' },
  ]},
  { name: 'Business', files: [
    { icon: 'file-text', name: 'Georgia LLC — articles of organization', type: 'FILING', date: 'Jul 11' },
    { icon: 'file-check', name: 'EIN confirmation — CP 575', type: 'PDF', date: 'Jul 11' },
  ]},
  { name: 'Accounting', files: [
    { icon: 'file-text', name: 'Q3 income summary', type: 'REPORT', date: 'Jul 20' },
  ]},
  { name: 'Brand', files: [
    { icon: 'id-card', name: 'EPK v3 — booking edition', type: 'EPK', date: 'Jul 21' },
  ]},
];

// Demo projects
const DEMO_PROJECTS = [
  { name: 'October EP — "Night Shift"', soul: 'The Manager', instr: 'Everything for the October 10 EP release. Five tracks, masters locked Aug 15.', files: ['nightshift-masters.zip', 'artwork-final.png', 'lyric-sheets.pdf'], convos: ['Rollout timeline', 'DSP pitch draft'] },
  { name: 'Midnight Run — single', soul: 'The Mentor', instr: 'PRO registration and royalty setup. Splits: me 60% / J. Rivera 40%.', files: ['midnight-run-master.wav', 'split-sheet-signed.pdf'], convos: ['BMI registration'] },
  { name: 'Georgia LLC', soul: 'The Executive', instr: 'Form the LLC, get the EIN, open business banking.', files: ['articles-draft.pdf'], convos: ['EIN application'] },
];

type ViewType = 'chat' | 'projects' | 'skills' | 'outputs';

export default function DashboardPage() {
  const [activeAgentIndex, setActiveAgentIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Array<{ role: string; text: string; actions?: boolean }>>([]);
  const [thinking, setThinking] = useState(false);
  const [activeView, setActiveView] = useState<ViewType>('chat');

  // Projects state
  const [projOpen, setProjOpen] = useState(-1);
  const [projCreating, setProjCreating] = useState(false);
  const [formName, setFormName] = useState('');
  const [formSoul, setFormSoul] = useState(0);
  const [formInstr, setFormInstr] = useState('');
  const [formFiles, setFormFiles] = useState<string[]>([]);
  const [projects, setProjects] = useState(DEMO_PROJECTS);

  // Skills state
  const [skillCat, setSkillCat] = useState(0);
  const [installed, setInstalled] = useState([0, 4]);

  // Outputs state
  const [openFolder, setOpenFolder] = useState(0);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const activeAgent = AGENTS[activeAgentIndex];
  const AgentIcon = activeAgent.icon;

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, thinking]);

  const handleSend = (text?: string) => {
    const messageText = text || draft.trim();
    if (!messageText || thinking) return;

    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setDraft('');
    setThinking(true);

    setTimeout(() => {
      setThinking(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: AGENT_REPLIES[activeAgent.key] || `I'm the ${activeAgent.name}. How can I help you today?`,
          actions: true,
        },
      ]);
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getFileIcon = (name: string) => {
    if (/\.(png|jpg|jpeg|gif)$/i.test(name)) return Image;
    if (/\.(wav|mp3|zip)$/i.test(name)) return FileAudio;
    if (/\.(xlsx|csv)$/i.test(name)) return Table;
    return FileText;
  };

  return (
    <div className="fixed inset-0 grid grid-cols-[280px_1fr] bg-[#111111]">
      {/* Sidebar */}
      <div className="bg-[#161616] border-r border-[#262626] flex flex-col min-h-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-4">
          <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-8 h-8" onError={(e) => {
            e.currentTarget.style.display = 'none';
            const span = document.createElement('span');
            span.className = 'w-8 h-8 bg-[#CC0000] rounded-lg flex items-center justify-center text-white font-serif font-bold';
            span.textContent = 'A';
            e.currentTarget.parentElement?.appendChild(span);
          }} />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-white text-base leading-tight">Artispreneur</span>
            <span className="font-mono text-[10px] font-semibold tracking-[3px] text-[#FED001] uppercase">Agent OS</span>
          </div>
        </div>

        {/* New Chat */}
        <div className="px-4 pb-4">
          <button
            onClick={() => { setMessages([]); setActiveView('chat'); }}
            className="w-full flex items-center gap-2.5 bg-[#CC0000] hover:bg-[#A30000] text-white rounded-md px-4 py-2.5 text-[13.5px] font-semibold transition-colors"
          >
            <Plus size={16} />
            New chat
          </button>
        </div>

        {/* Navigation */}
        <div className="px-2.5 pb-3.5 flex flex-col gap-0.5">
          {[
            { key: 'projects' as ViewType, name: 'Projects', icon: Folder, count: projects.length.toString() },
            { key: 'skills' as ViewType, name: 'Skills', icon: Zap, count: '12' },
            { key: 'outputs' as ViewType, name: 'Outputs', icon: FileOutput, count: '23' },
          ].map((item) => {
            const ItemIcon = item.icon;
            const isActive = activeView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveView(item.key)}
                className={`flex items-center gap-3 px-2.5 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-[#222222]' : 'hover:bg-[#222222]'
                }`}
              >
                <ItemIcon size={16} className={isActive ? 'text-[#FED001]' : 'text-[#777777]'} />
                <span className={`text-[13px] font-medium flex-1 text-left ${isActive ? 'text-white' : 'text-[#AAAAAA]'}`}>
                  {item.name}
                </span>
                <span className="font-mono text-[10.5px] text-[#555555]">{item.count}</span>
              </button>
            );
          })}

          {/* Project shortcuts */}
          {projects.map((proj, i) => (
            <button
              key={i}
              onClick={() => { setActiveView('projects'); setProjOpen(i); setProjCreating(false); }}
              className="flex items-center gap-2 px-2.5 py-1.5 pl-7 rounded-md hover:bg-[#222222] transition-colors"
            >
              <Folder size={13} className="text-[#666666] flex-shrink-0" />
              <span className="text-[12.5px] text-[#999999] truncate">{proj.name}</span>
            </button>
          ))}
        </div>

        {/* Tasks */}
        <div className="px-5 pb-2 font-mono text-[10.5px] font-semibold tracking-[2px] uppercase text-[#666666]">// Tasks</div>
        <div className="flex flex-col gap-0.5 px-2.5 pb-4">
          {[
            { name: 'BMI registration — Midnight Run', status: 'IN PROGRESS · 80%', dot: '#FED001' },
            { name: 'EIN application', status: 'WAITING ON YOU', dot: '#CC0000' },
            { name: 'October EP rollout', status: 'SCHEDULED', dot: '#777777' },
          ].map((task, i) => (
            <div key={i} className="flex items-center gap-2.5 px-2.5 py-2 rounded-md hover:bg-[#222222] cursor-pointer">
              <span className="w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: task.dot }} />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-[12.5px] font-medium text-[#CCCCCC] truncate">{task.name}</span>
                <span className="font-mono text-[10px] text-[#666666]">{task.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Conversation History */}
        <div className="flex-1 overflow-y-auto min-h-0 pb-2">
          <div className="px-5 pb-2 font-mono text-[10.5px] font-semibold tracking-[2px] uppercase text-[#666666]">// Today</div>
          <div className="flex flex-col gap-0.5 px-2.5 pb-3.5">
            {['BMI registration — Midnight Run', 'October EP rollout plan', 'Venue contract review'].map((c, i) => (
              <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-md hover:bg-[#222222] cursor-pointer">
                <MessageSquare size={13} className="text-[#555555] flex-shrink-0" />
                <span className="text-[13px] text-[#AAAAAA] truncate">{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="border-t border-[#262626] p-3.5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FED001] text-[#111111] font-bold flex items-center justify-center flex-shrink-0 text-[13px]">
            P
          </div>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-[13px] font-semibold text-white">Pat</span>
            <span className="text-[11.5px] text-[#777777]">Agent plan · $99/mo</span>
          </div>
          <Settings size={16} className="text-[#777777] cursor-pointer hover:text-white flex-shrink-0" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-h-0 min-w-0 relative" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 65% 50% at 50% 30%, rgba(204,0,0,0.10) 0%, rgba(17,17,17,0) 65%)'
        }} />

        {/* Chat View */}
        {activeView === 'chat' && (
          <>
            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-7 py-3.5 border-b border-[#262626] bg-[rgba(17,17,17,0.7)] backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-[30px] h-[30px] bg-[#CC0000] rounded-md flex items-center justify-center">
                  <AgentIcon size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">{activeAgent.name}</span>
                  <span className="font-mono text-[10.5px] text-[#666666]">{activeAgent.desc}</span>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <span className="font-mono flex items-center gap-1.5 text-[11px] font-medium tracking-[1.5px] text-[#FED001] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FED001] animate-pulse" />
                  Online
                </span>
                <History size={17} className="text-[#777777] cursor-pointer hover:text-white" />
                <Share size={17} className="text-[#777777] cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Messages */}
            <div ref={chatScrollRef} className="relative z-10 flex-1 overflow-y-auto min-h-0">
              {messages.length === 0 && !thinking ? (
                <div className="h-full flex flex-col items-center justify-center px-10 text-center">
                  <AgentIcon size={52} className="text-[#CC0000] opacity-90 mb-5" />
                  <h2 className="font-serif font-bold text-[30px] text-white mb-2.5">What do you want to work on?</h2>
                  <p className="text-[14.5px] text-[#888888] mb-8 max-w-[440px]">Ask anything, or start from one of these.</p>
                  <div className="grid grid-cols-2 gap-3 max-w-[640px] w-full">
                    {[
                      { icon: Music, title: 'Register a song with my PRO', sub: 'Work registration, splits, and IPI numbers — done for you.' },
                      { icon: Building2, title: 'Set up my LLC + EIN', sub: 'Business formation from zero, step by step.' },
                      { icon: Radio, title: 'Plan my next release', sub: 'Timeline, distributor, pre-save, and pitch strategy.' },
                      { icon: FileText, title: 'Review a contract', sub: 'Plain-language breakdown before you sign anything.' },
                    ].map((s, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(s.title)}
                        className="flex items-start gap-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-4 text-left hover:border-[#CC0000] hover:bg-[#1E1A1A] transition-colors"
                      >
                        <s.icon size={17} className="text-[#FED001] flex-shrink-0 mt-0.5" />
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[13.5px] font-semibold text-white">{s.title}</span>
                          <span className="text-[12.5px] text-[#888888] leading-relaxed">{s.sub}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="max-w-[820px] mx-auto py-8 px-7 flex flex-col gap-6">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex gap-3.5 animate-[riseIn_300ms_ease_both]">
                      <div className={`w-[30px] h-[30px] rounded-md flex items-center justify-center flex-shrink-0 ${
                        msg.role === 'user' ? 'bg-[#FED001] text-[#111111]' : 'bg-[#CC0000] text-white'
                      }`}>
                        {msg.role === 'user' ? (
                          <span className="font-bold text-[12.5px]">P</span>
                        ) : (
                          <Bot size={16} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[12.5px] font-bold mb-1.5 ${
                          msg.role === 'user' ? 'text-[#FED001]' : 'text-white'
                        }`}>
                          {msg.role === 'user' ? 'You' : activeAgent.name}
                        </div>
                        <div className="text-[14.5px] leading-relaxed text-[#DDDDDD] whitespace-pre-wrap">{msg.text}</div>
                        {msg.actions && (
                          <div className="flex gap-2.5 mt-3.5 flex-wrap">
                            <button
                              onClick={() => handleSend('Looks good — continue')}
                              className="bg-[#CC0000] hover:bg-[#A30000] text-white text-[12.5px] font-semibold px-4 py-2 rounded-md transition-colors"
                            >
                              Review & continue
                            </button>
                            <button
                              onClick={() => handleSend('Show me the details')}
                              className="bg-[#CC0000] hover:bg-[#A30000] text-white text-[12.5px] font-semibold px-4 py-2 rounded-md transition-colors"
                            >
                              Show details
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {thinking && (
                    <div className="flex gap-3.5">
                      <div className="w-[30px] h-[30px] bg-[#CC0000] rounded-md flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="flex items-center gap-1.5 pt-2">
                        <span className="w-[7px] h-[7px] rounded-full bg-[#FED001] animate-[dotPulse_1.2s_ease_infinite]" />
                        <span className="w-[7px] h-[7px] rounded-full bg-[#FED001] animate-[dotPulse_1.2s_ease_0.2s_infinite]" />
                        <span className="w-[7px] h-[7px] rounded-full bg-[#FED001] animate-[dotPulse_1.2s_ease_0.4s_infinite]" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="relative z-10 px-7 py-3 pb-5">
              <div className="max-w-[820px] mx-auto">
                <div className="bg-[#1A1A1A] border border-[#333333] rounded-xl overflow-hidden focus-within:border-[#CC0000] transition-colors">
                  <textarea
                    rows={Math.min(6, Math.max(1, draft.split('\n').length))}
                    placeholder={`Message your ${activeAgent.name}...`}
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none resize-none px-4 py-4 pb-1.5 font-sans text-[14.5px] leading-relaxed text-white placeholder:text-[#666666] outline-none"
                  />
                  <div className="flex items-center justify-between px-3 py-2 pb-3">
                    <div className="flex items-center gap-1.5">
                      <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#777777] hover:bg-[#262626] hover:text-white transition-colors">
                        <Paperclip size={16} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#777777] hover:bg-[#262626] hover:text-white transition-colors">
                        <Mic size={16} />
                      </button>
                      <button
                        onClick={() => setActiveAgentIndex((activeAgentIndex + 1) % AGENTS.length)}
                        className="flex items-center gap-1.5 font-mono text-[11.5px] font-medium text-[#AAAAAA] border border-[#333333] rounded-md px-3 py-1.5 hover:text-[#FED001] hover:border-[#FED001] transition-colors"
                      >
                        <AgentIcon size={13} />
                        {activeAgent.name.replace(' Agent', '')}
                        <ChevronsUpDown size={12} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleSend()}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        draft.trim() ? 'bg-[#CC0000] hover:bg-[#A30000]' : 'bg-[#333333]'
                      }`}
                    >
                      <ArrowUp size={18} className="text-white" />
                    </button>
                  </div>
                </div>
                <div className="text-center text-[11.5px] text-[#555555] mt-2.5">
                  Agents can make mistakes. Verify filings before you submit. · <span className="text-[#777777]">agent.artispreneur.com</span>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Projects View */}
        {activeView === 'projects' && (
          <div className="relative z-10 flex-1 overflow-y-auto min-h-0 p-10 pb-0">
            {projOpen === -1 && !projCreating && (
              <>
                <div className="font-mono text-[#CC0000] text-xs font-semibold tracking-[3px] uppercase mb-3">// Projects</div>
                <h1 className="font-serif font-bold text-[32px] text-white mb-2">Project Folders</h1>
                <p className="text-sm text-[#888888] mb-8">Each project keeps its own files, instructions, soul, and conversations — every chat inside it knows the context.</p>
                <div className="grid grid-cols-3 gap-4.5 max-w-[1150px]">
                  <button
                    onClick={() => setProjCreating(true)}
                    className="border-[1.5px] border-dashed border-[#3A3A3A] rounded-xl p-6 flex flex-col items-center justify-center gap-2.5 min-h-[180px] hover:border-[#CC0000] transition-colors"
                  >
                    <div className="w-[42px] h-[42px] rounded-lg bg-[#CC0000] flex items-center justify-center">
                      <Plus size={20} className="text-white" />
                    </div>
                    <span className="text-[14.5px] font-semibold text-white">New project</span>
                    <span className="text-xs text-[#777777] text-center">Uploads · instructions · soul</span>
                  </button>
                  {projects.map((proj, i) => (
                    <button
                      key={i}
                      onClick={() => setProjOpen(i)}
                      className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 flex flex-col gap-3 text-left hover:border-[#CC0000] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-[38px] h-[38px] rounded-lg bg-[#262626] flex items-center justify-center">
                          <Folder size={18} className="text-[#FED001]" />
                        </div>
                        <span className="font-mono text-[10px] font-semibold tracking-[1.5px] uppercase text-[#FED001] border border-[rgba(254,208,1,0.4)] rounded px-2 py-1">
                          {proj.soul}
                        </span>
                      </div>
                      <div className="text-base font-bold text-white">{proj.name}</div>
                      <div className="text-[12.5px] text-[#888888] leading-relaxed flex-1">{proj.instr}</div>
                      <div className="flex gap-4 font-mono text-[10.5px] text-[#666666]">
                        <span>{proj.files.length} files</span>
                        <span>{proj.convos.length} chats</span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}

            {projCreating && (
              <div className="max-w-[720px]">
                <button
                  onClick={() => setProjCreating(false)}
                  className="flex items-center gap-2 font-mono text-[11.5px] text-[#888888] hover:text-[#FED001] mb-6 transition-colors"
                >
                  <ArrowLeft size={14} />
                  All projects
                </button>
                <h1 className="font-serif font-bold text-[30px] text-white mb-7">New Project</h1>
                <div className="flex flex-col gap-6">
                  <div>
                    <label className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-[#888888] mb-2.5 block">Project name</label>
                    <input
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Spring Tour 2027"
                      className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3.5 text-[14.5px] text-white placeholder:text-[#666666] outline-none focus:border-[#CC0000] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-[#888888] mb-2.5 block">Soul</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {SOULS.map((soul, i) => (
                        <button
                          key={i}
                          onClick={() => setFormSoul(i)}
                          className={`border rounded-lg p-3.5 text-left transition-colors ${
                            formSoul === i
                              ? 'border-[#FED001] bg-[#221E12]'
                              : 'border-[#333333] bg-[#1A1A1A] hover:border-[#FED001]'
                          }`}
                        >
                          <div className="text-[13.5px] font-bold text-white mb-0.5">{soul.name}</div>
                          <div className="text-xs text-[#888888]">{soul.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-[#888888] mb-2.5 block">Project instructions</label>
                    <textarea
                      rows={4}
                      value={formInstr}
                      onChange={(e) => setFormInstr(e.target.value)}
                      placeholder="What should every agent in this project know? Goals, deadlines, constraints, tone..."
                      className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-3.5 text-sm text-white placeholder:text-[#666666] outline-none focus:border-[#CC0000] resize-y leading-relaxed transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-[#888888] mb-2.5 block">Files</label>
                    <div
                      onClick={() => setFormFiles([...formFiles, 'upload-' + (formFiles.length + 1) + '.pdf'])}
                      className="border-[1.5px] border-dashed border-[#3A3A3A] rounded-lg p-5 text-center cursor-pointer hover:border-[#FED001] transition-colors"
                    >
                      <span className="text-[13px] text-[#AAAAAA]">
                        <Upload size={15} className="inline-block text-[#FED001] mr-1 -mt-0.5" />
                        Drop files or click to upload — masters, artwork, contracts, lyric sheets
                      </span>
                    </div>
                    {formFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-2.5 py-2.5 px-1 text-[13px] text-[#CCCCCC]">
                        <File size={14} className="text-[#FED001]" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        if (!formName.trim()) return;
                        setProjects([...projects, {
                          name: formName.trim(),
                          soul: SOULS[formSoul].name,
                          instr: formInstr.trim() || 'No instructions yet.',
                          files: formFiles,
                          convos: [],
                        }]);
                        setProjCreating(false);
                        setProjOpen(projects.length);
                        setFormName('');
                        setFormSoul(0);
                        setFormInstr('');
                        setFormFiles([]);
                      }}
                      className={`px-7 py-3 rounded-md font-bold text-sm text-white transition-colors ${
                        formName.trim() ? 'bg-[#CC0000] hover:bg-[#A30000]' : 'bg-[#333333] cursor-not-allowed'
                      }`}
                    >
                      Create project
                    </button>
                    <button
                      onClick={() => setProjCreating(false)}
                      className="px-4 py-3 text-[#888888] font-semibold text-sm hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {projOpen >= 0 && !projCreating && projects[projOpen] && (
              <div className="max-w-[900px]">
                <button
                  onClick={() => setProjOpen(-1)}
                  className="flex items-center gap-2 font-mono text-[11.5px] text-[#888888] hover:text-[#FED001] mb-6 transition-colors"
                >
                  <ArrowLeft size={14} />
                  All projects
                </button>
                <div className="flex items-center justify-between gap-5 mb-7">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#CC0000] flex items-center justify-center">
                      <FolderOpen size={23} className="text-white" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-serif font-bold text-[26px] text-white">{projects[projOpen].name}</span>
                      <span className="font-mono text-[11px] text-[#FED001] tracking-[1.5px] uppercase">Soul: {projects[projOpen].soul}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setProjOpen(-1); setActiveView('chat'); setMessages([]); }}
                    className="flex items-center gap-2 bg-[#CC0000] hover:bg-[#A30000] text-white text-[13.5px] font-semibold px-5 py-3 rounded-md flex-shrink-0 transition-colors"
                  >
                    <Plus size={15} />
                    New chat in project
                  </button>
                </div>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 mb-6">
                  <div className="font-mono text-[10.5px] font-semibold tracking-[2px] uppercase text-[#666666] mb-2">// Instructions</div>
                  <div className="text-sm text-[#CCCCCC] leading-relaxed">{projects[projOpen].instr}</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-mono text-[10.5px] font-semibold tracking-[2px] uppercase text-[#666666]">// Files</div>
                      <span className="text-xs font-semibold text-[#FED001] cursor-pointer">+ Upload</span>
                    </div>
                    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
                      {projects[projOpen].files.map((file, i) => {
                        const FileIcon = getFileIcon(file);
                        return (
                          <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-[#232323] last:border-b-0 hover:bg-[#202020] transition-colors">
                            <FileIcon size={15} className="text-[#FED001] flex-shrink-0" />
                            <span className="text-[13px] text-[#DDDDDD] truncate flex-1">{file}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] font-semibold tracking-[2px] uppercase text-[#666666] mb-3">// Conversations</div>
                    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
                      {projects[projOpen].convos.map((convo, i) => (
                        <button
                          key={i}
                          onClick={() => { setProjOpen(-1); setActiveView('chat'); setMessages([]); }}
                          className="w-full flex items-center gap-3 px-4 py-3 border-b border-[#232323] last:border-b-0 hover:bg-[#202020] cursor-pointer text-left transition-colors"
                        >
                          <MessageSquare size={14} className="text-[#777777] flex-shrink-0" />
                          <span className="text-[13px] text-[#DDDDDD] truncate flex-1">{convo}</span>
                          <ChevronRight size={14} className="text-[#555555]" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Skills View */}
        {activeView === 'skills' && (
          <div className="relative z-10 flex-1 overflow-y-auto min-h-0 p-10">
            <div className="font-mono text-[#CC0000] text-xs font-semibold tracking-[3px] uppercase mb-3">// Skills Marketplace</div>
            <h1 className="font-serif font-bold text-[32px] text-white mb-2">Give Your Agents New Skills</h1>
            <p className="text-sm text-[#888888] mb-7">Install workflows and specialist abilities — free or paid. Installed skills run inside any chat.</p>
            <div className="flex gap-2 mb-7 flex-wrap">
              {['All', 'Publishing', 'Releases', 'Business', 'Brand'].map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setSkillCat(i)}
                  className={`font-mono text-[11.5px] font-medium border rounded-full px-4 py-1.5 transition-colors ${
                    skillCat === i
                      ? 'border-[#FED001] text-[#FED001]'
                      : 'border-[#333333] text-[#AAAAAA] hover:border-[#FED001] hover:text-[#FED001]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4.5 max-w-[1200px]">
              {SKILLS.filter((_, i) => skillCat === 0 || SKILLS[i].cat === skillCat).map((skill, i) => {
                const isInstalled = installed.includes(i);
                return (
                  <div key={i} className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 flex flex-col gap-3 hover:border-[#444444] transition-colors">
                    <div className="flex items-center justify-between">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isInstalled ? 'bg-[#CC0000]' : 'bg-[#262626]'
                      }`}>
                        <Music size={17} className={isInstalled ? 'text-white' : 'text-[#FED001]'} />
                      </div>
                      <span className={`font-mono text-[11px] font-semibold ${
                        skill.price === 'Free' ? 'text-[#FED001]' : 'text-white'
                      }`}>
                        {skill.price}
                      </span>
                    </div>
                    <div>
                      <div className="text-[15px] font-bold text-white mb-0.5">{skill.name}</div>
                      <div className="font-mono text-[10.5px] text-[#666666] mb-1.5">{skill.author} · {skill.installs}</div>
                      <div className="text-[12.5px] text-[#999999] leading-relaxed">{skill.desc}</div>
                    </div>
                    <button
                      onClick={() => setInstalled(isInstalled ? installed.filter(x => x !== i) : [...installed, i])}
                      className={`mt-auto text-center text-[13px] font-semibold rounded-md py-2 transition-colors ${
                        isInstalled
                          ? 'bg-transparent border border-[#FED001] text-[#FED001]'
                          : 'bg-[#CC0000] text-white hover:bg-[#A30000]'
                      }`}
                    >
                      {isInstalled ? 'Installed ✓' : skill.price === 'Free' ? 'Install' : `Buy · ${skill.price}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Outputs View */}
        {activeView === 'outputs' && (
          <div className="relative z-10 flex-1 overflow-y-auto min-h-0 p-10">
            <div className="font-mono text-[#CC0000] text-xs font-semibold tracking-[3px] uppercase mb-3">// Outputs</div>
            <h1 className="font-serif font-bold text-[32px] text-white mb-2">Everything Your Agents Produced</h1>
            <p className="text-sm text-[#888888] mb-8">Filings, plans, drafts, and reports — organized by department.</p>
            <div className="grid grid-cols-3 gap-4 max-w-[1100px] mb-9">
              {FOLDERS.map((folder, i) => (
                <button
                  key={i}
                  onClick={() => setOpenFolder(i)}
                  className={`flex items-center gap-3.5 rounded-xl p-5 border transition-colors ${
                    openFolder === i
                      ? 'bg-[#1E1A1A] border-[#CC0000]'
                      : 'bg-[#1A1A1A] border-[#2A2A2A] hover:border-[#CC0000]'
                  }`}
                >
                  <div className={`w-[42px] h-[42px] rounded-lg flex items-center justify-center ${
                    openFolder === i ? 'bg-[#CC0000]' : 'bg-[#262626]'
                  }`}>
                    <Folder size={20} className={openFolder === i ? 'text-white' : 'text-[#FED001]'} />
                  </div>
                  <div className="flex flex-col gap-0.5 text-left">
                    <span className="text-[14.5px] font-bold text-white">{folder.name}</span>
                    <span className="font-mono text-[10.5px] text-[#777777]">{folder.files.length} files</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="font-mono text-[11px] font-semibold tracking-[2px] uppercase text-[#666666] mb-3.5">// {FOLDERS[openFolder].name}</div>
            <div className="max-w-[1100px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl overflow-hidden">
              {FOLDERS[openFolder].files.map((file, i) => (
                <div key={i} className="flex items-center gap-3.5 px-5 py-3.5 border-b border-[#232323] last:border-b-0 hover:bg-[#202020] cursor-pointer transition-colors">
                  <FileText size={16} className="text-[#FED001] flex-shrink-0" />
                  <span className="text-[13.5px] font-medium text-[#DDDDDD] flex-1">{file.name}</span>
                  <span className="font-mono text-[11px] text-[#666666]">{file.type}</span>
                  <span className="font-mono text-[11px] text-[#666666] w-[90px] text-right">{file.date}</span>
                  <Download size={15} className="text-[#777777]" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
