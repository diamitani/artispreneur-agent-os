import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] px-6 transition-all duration-300" id="navbar">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between h-[72px]">
          <Link href="/" className="flex items-center gap-2.5 font-serif text-[22px] font-extrabold tracking-tight">
            Artis<span className="text-gold">preneur</span>
          </Link>
          <ul className="flex items-center gap-8">
            <li><Link href="#agents" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">Agents</Link></li>
            <li><Link href="#tools" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">Tools</Link></li>
            <li><Link href="#how" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">How It Works</Link></li>
            <li><Link href="/workspace" className="text-gray-400 text-sm font-medium hover:text-white transition-colors">Workspace</Link></li>
          </ul>
          <Link href="/workspace" className="bg-gold text-dark px-5 py-2.5 rounded-md font-bold text-sm hover:bg-gold-light hover:text-dark transition-all whitespace-nowrap">
            Get Started Free
          </Link>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-[120px] pb-20 overflow-hidden" id="hero">
        <div className="absolute inset-0 bg-radial-gradient from-gold/10 via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 grid-background opacity-25" style={{
          backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)'
        }} />

        <div className="relative z-10 max-w-[820px]">
          <div className="inline-flex items-center gap-2 bg-dark-300 border border-dark-500 rounded-full px-4 py-1.5 text-[13px] font-medium text-gray-400 mb-7">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Powered by AI Agents
          </div>

          <h1 className="font-serif text-[clamp(42px,6vw,76px)] font-black leading-[1.05] tracking-[-2px] mb-6">
            Your Music Business<br />
            <span className="text-gold">Operating System</span>
          </h1>

          <p className="text-[clamp(17px,2.2vw,21px)] text-gray-400 max-w-[620px] mx-auto mb-10 font-normal leading-relaxed">
            We help artists become entrepreneurs. Artispreneur OS equips you with a personalized AI assistant workspace that handles everything a label does — PROs, distribution, legal, finance, and more.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/workspace" className="inline-flex items-center gap-2 bg-gold text-dark px-7 py-3.5 rounded-lg font-bold text-base hover:bg-gold-light hover:text-dark transition-all hover:-translate-y-0.5">
              Get Started Free →
            </Link>
            <Link href="#agents" className="inline-flex items-center gap-2 bg-transparent text-white px-7 py-3.5 rounded-lg font-semibold text-base border border-dark-600 hover:border-gray-500 hover:bg-dark-300 transition-all">
              See the Agents
            </Link>
          </div>

          <div className="flex justify-center gap-12 mt-14">
            <div className="text-center">
              <div className="text-[32px] font-extrabold tracking-tight">6</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider mt-0.5">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-extrabold tracking-tight">1</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider mt-0.5">Workspace</div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-extrabold tracking-tight">∞</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider mt-0.5">Skills</div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-extrabold tracking-tight">$0</div>
              <div className="text-xs text-gray-600 uppercase tracking-wider mt-0.5">To Start</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-dark-200 border-t border-b border-dark-500 py-[100px]" id="agents">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-[2px] text-gold mb-3">Your AI Workforce</div>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight mb-4">Six Agents. One Mission.</h2>
            <p className="text-lg text-gray-400 max-w-[600px] mx-auto leading-relaxed">
              Each agent handles a core function of your music business — the same roles a major label fills, now working for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: 'P.R.O. Agent',
                icon: '♩',
                color: 'gold',
                desc: 'Registers you with a Performing Rights Organization and manages your entire catalog.',
                tasks: [
                  'Register with PRO as artist or business',
                  'Register music to track and claim royalties',
                  'Extract metadata from song files',
                  'Create splitsheet agreements'
                ]
              },
              {
                name: 'Distribution Agent',
                icon: '↗',
                color: 'green',
                desc: 'Manages your DSP presence, playlisting strategy, and promotional ad spend.',
                tasks: [
                  'Manage DSP accounts (UnitedMasters, CD Baby)',
                  'Create playlisting strategy & execute submissions',
                  'Manage ad spend for music content',
                  'Collaborative social media posts'
                ]
              },
              {
                name: 'Licensing Agent',
                icon: '⚡',
                color: 'purple',
                desc: 'Finds and submits your music for sync licensing, libraries, and supervisor placements.',
                tasks: [
                  'Create outreach templates for licensing',
                  'Research music libraries & platforms',
                  'Submit song profiles to supervisors',
                  'UGC campaign development'
                ]
              },
              {
                name: 'Legal & Business Agent',
                icon: '§',
                color: 'blue',
                desc: 'Sets up your business entity and generates all the contracts you need.',
                tasks: [
                  'EIN registration (Sole Proprietor or C-Corp)',
                  'LLC/C-Corp Operating Agreements',
                  'Create all business contract templates',
                  'Customized to your preferences'
                ]
              },
              {
                name: 'Finance Agent',
                icon: '$',
                color: 'cyan',
                desc: 'Manages your business banking, analyzes spending, and handles tax obligations.',
                tasks: [
                  'Set up business bank account',
                  'AI-powered transaction analysis',
                  'Manage tax obligations',
                  'Financial reporting & insights'
                ]
              },
              {
                name: 'General Manager Agent',
                icon: '◎',
                color: 'orange',
                desc: 'Your day-to-day operator — strategy, scheduling, content, and research.',
                tasks: [
                  'Business plans & roadmaps',
                  'Calendar & project management',
                  'Create content, sub-agents & skills',
                  'Industry research & outreach'
                ]
              }
            ].map((agent, i) => (
              <div key={i} className="relative bg-dark border border-dark-500 rounded-2xl p-8 transition-all duration-300 hover:border-dark-600 hover:-translate-y-1 overflow-hidden group">
                <div className={`absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl bg-${agent.color}-500`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[22px] mb-5 bg-${agent.color}-500/10 text-${agent.color}-500`}>
                  {agent.icon}
                </div>
                <h3 className="text-lg font-bold mb-2.5">{agent.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{agent.desc}</p>
                <div className="pt-4 border-t border-dark-500 space-y-2">
                  {agent.tasks.map((task, j) => (
                    <div key={j} className="text-xs text-gray-500 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-dark-600 flex-shrink-0" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[100px]" id="tools">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-[2px] text-gold mb-3">Platform Tools</div>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight mb-4">Everything You Need, Built In</h2>
            <p className="text-lg text-gray-400 max-w-[600px] mx-auto leading-relaxed">
              Beyond agents — a complete ecosystem of tools, templates, and resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '✦', title: 'Prompt Library', desc: 'Pre-built prompts designed for artists to accelerate every part of their career.' },
              { icon: '⚙', title: 'Skills Marketplace', desc: 'Browse, install, or create custom skills for specific music industry tasks.' },
              { icon: '📁', title: 'Output Manager', desc: 'Smart folder system tracks drafts and versions so you always know what's current.' },
              { icon: '📚', title: 'Centralized Knowledge Base', desc: 'All Artispreneur files — contracts, courses, articles, directories — in one searchable place.' },
              { icon: '👥', title: 'Contact Directory', desc: 'Quick access to artists, labels, supervisors, venues, radio, blogs, podcasts, and studios.' },
              { icon: '🎓', title: 'Academy', desc: 'Courses, articles, templates, video resources, and industry education.' }
            ].map((tool, i) => (
              <div key={i} className="bg-dark-300 border border-dark-500 rounded-lg p-6 transition-all hover:border-dark-600 hover:bg-dark-400">
                <h4 className="text-[15px] font-semibold mb-1.5">{tool.icon} {tool.title}</h4>
                <p className="text-[13px] text-gray-400 leading-relaxed">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-200 border-t border-dark-500 py-[100px]" id="how">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold uppercase tracking-[2px] text-gold mb-3">How It Works</div>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight">From Sign-Up to CEO</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'Sign Up Free', desc: 'Create your account. Get Gemini API free credits or bring your own key. No credit card needed.' },
              { num: '02', title: 'Connect Google Drive', desc: 'Link your drive so outputs, contracts, and EPKs auto-save to your folders.' },
              { num: '03', title: 'Deploy Your Agents', desc: 'Activate all six agents. They learn your project, catalog, and goals. Command via chat or Signal/Wire.' },
              { num: '04', title: 'Run Your Business', desc: 'Agents work around the clock — register music, submit to playlists, draft contracts, analyze finances.' }
            ].map((step, i) => (
              <div key={i} className="relative p-7 bg-dark border border-dark-500 rounded-2xl">
                <div className="absolute top-5 right-6 text-5xl font-black text-dark-500 leading-none">{step.num}</div>
                <h3 className="text-base font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-[120px] text-center">
        <div className="container max-w-[1200px] mx-auto px-6">
          <h2 className="font-serif text-[clamp(32px,4vw,52px)] font-black tracking-tight mb-5">
            Ready to run your business like a <span className="text-gold">label</span>?
          </h2>
          <p className="text-lg text-gray-400 max-w-[500px] mx-auto mb-9 leading-relaxed">
            Sign up free. No credit card. Start with Gemini API credits or bring your own key.
          </p>
          <Link href="/workspace" className="inline-flex items-center gap-2 bg-gold text-dark px-8 py-4 rounded-lg font-bold text-lg hover:bg-gold-light hover:text-dark transition-all hover:-translate-y-1">
            Get Started Free →
          </Link>
        </div>
      </section>

      <footer className="bg-dark-400 border-t border-dark-500 py-[60px] pb-8">
        <div className="container max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="font-serif text-[22px] font-extrabold mb-4">Artis<span className="text-gold">preneur</span></div>
              <p className="text-sm text-gray-400 leading-relaxed max-w-[280px]">
                Your Music Business Operating System. Run the business like a label.
              </p>
            </div>
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-wider mb-4">Product</h4>
              <div className="space-y-2">
                <Link href="#agents" className="block text-sm text-gray-400 hover:text-white transition-colors">Agents</Link>
                <Link href="#tools" className="block text-sm text-gray-400 hover:text-white transition-colors">Tools</Link>
                <Link href="/workspace" className="block text-sm text-gray-400 hover:text-white transition-colors">Workspace</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-wider mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-sm text-gray-400 hover:text-white transition-colors">About</Link>
                <Link href="/contact" className="block text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            <div>
              <h4 className="text-[13px] font-bold uppercase tracking-wider mb-4">Resources</h4>
              <div className="space-y-2">
                <a href="https://github.com/diamitani/artispreneur-agent-os" target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-400 hover:text-white transition-colors">GitHub</a>
                <Link href="/docs" className="block text-sm text-gray-400 hover:text-white transition-colors">Documentation</Link>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 border-t border-dark-500 text-[13px] text-gray-600">
            © 2026 Artispreneur. Built with the ROSTR Framework.
          </div>
        </div>
      </footer>
    </>
  );
}
