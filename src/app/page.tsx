import Link from 'next/link';
import { ArrowRight, Music, Radio, BadgeDollarSign, Building2, Calculator, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-100 flex flex-col">
      {/* Header */}
      <header className="border-b border-dark-500 bg-dark-200/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-crimson rounded-lg flex items-center justify-center">
              <span className="text-white font-serif font-bold text-lg">A</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-white text-lg leading-tight">
                Artispreneur
              </span>
              <span className="font-mono text-[10px] font-semibold tracking-[3px] text-gold uppercase">
                Agent OS
              </span>
            </div>
          </div>
          <Link
            href="/workspace"
            className="bg-crimson hover:bg-crimson-dark text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            Launch Workspace
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-background opacity-50"></div>
        <div className="absolute inset-0 radial-overlay"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="font-serif font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Run the Business<br />Like You Mean It
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Six specialized AI agents handle publishing, distribution, licensing, business formation,
            accounting, and branding — so you can focus on the music.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              Get Started <ArrowRight size={20} />
            </Link>
            <Link
              href="#agents"
              className="inline-flex items-center gap-2 bg-dark-400 hover:bg-dark-500 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Explore Agents
            </Link>
          </div>

          {/* Agents Grid */}
          <div id="agents" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-20">
            {[
              { icon: Music, name: 'Publishing', desc: 'PROs · Splits', color: 'crimson' },
              { icon: Radio, name: 'Distribution', desc: 'DSPs · Releases', color: 'gold' },
              { icon: BadgeDollarSign, name: 'Licensing', desc: 'Sync · Film/TV', color: 'crimson' },
              { icon: Building2, name: 'Business', desc: 'LLC · EIN', color: 'gold' },
              { icon: Calculator, name: 'Accounting', desc: 'Taxes · Books', color: 'crimson' },
              { icon: Sparkles, name: 'Brand', desc: 'EPK · Trademark', color: 'gold' },
            ].map((agent, i) => (
              <div
                key={i}
                className="bg-dark-300 border border-dark-500 rounded-xl p-6 hover:border-crimson transition-colors group"
              >
                <div
                  className={`w-12 h-12 rounded-lg bg-${agent.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:bg-opacity-30 transition-all`}
                >
                  <agent.icon className={`text-${agent.color}`} size={24} />
                </div>
                <h3 className="font-bold text-white text-sm mb-1">{agent.name}</h3>
                <p className="font-mono text-xs text-gray-500">{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-500 py-8 text-center text-sm text-gray-600">
        <div className="container mx-auto px-6">
          <p>
            Powered by <span className="font-mono text-gold">ROSTR Framework</span> · Built with Claude by Anthropic
          </p>
        </div>
      </footer>
    </div>
  );
}
