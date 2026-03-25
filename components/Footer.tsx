import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-cyber-border/30 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 border border-cyber-cyan/50 rounded flex items-center justify-center">
                <span className="font-display text-xs font-bold text-cyber-cyan">AI</span>
              </div>
              <span className="font-mono text-sm text-cyber-text">
                <span className="text-cyber-cyan">my</span>
                <span className="text-cyber-muted">.</span>
                <span className="text-cyber-magenta">portfolio</span>
              </span>
            </div>
            <p className="font-mono text-xs text-cyber-muted leading-relaxed">
              &gt; Building the future with artificial intelligence
              <br />
              &gt; and cybernetic engineering
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-xs text-cyber-cyan uppercase tracking-wider mb-4">
              // Navigation
            </h3>
            <div className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/projects', label: 'Projects' },
                { href: '/skills', label: 'Skills' },
                { href: '/experience', label: 'Experience' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-mono text-xs text-cyber-muted hover:text-cyber-cyan transition-colors"
                >
                  → {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="font-mono text-xs text-cyber-cyan uppercase tracking-wider mb-4">
              // System Status
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                <span className="font-mono text-xs text-cyber-muted">
                  All systems operational
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
                <span className="font-mono text-xs text-cyber-muted">
                  Powered by Cosmic CMS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyber-magenta" />
                <span className="font-mono text-xs text-cyber-muted">
                  Next.js 16 + React 19
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="neon-line my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-cyber-muted">
            © {currentYear} // All rights reserved
          </p>
          <p className="font-mono text-xs text-cyber-muted">
            <span className="text-cyber-cyan">{'<'}</span>
            built_with
            <span className="text-cyber-magenta"> ❤ </span>
            and_ai
            <span className="text-cyber-cyan">{' />'}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}