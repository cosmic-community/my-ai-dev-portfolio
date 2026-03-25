'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home', code: '~/' },
  { href: '/projects', label: 'Projects', code: './projects' },
  { href: '/skills', label: 'Skills', code: './skills' },
  { href: '/experience', label: 'Experience', code: './experience' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-cyber-bg/80 border-b border-cyber-border/50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-cyber-cyan/50 rounded flex items-center justify-center group-hover:border-cyber-cyan group-hover:shadow-neon-cyan transition-all duration-300">
            <span className="font-display text-xs font-bold text-cyber-cyan">AI</span>
          </div>
          <span className="font-mono text-sm text-cyber-text hidden sm:inline">
            <span className="text-cyber-cyan">my</span>
            <span className="text-cyber-muted">.</span>
            <span className="text-cyber-magenta">portfolio</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 font-mono text-xs rounded transition-all duration-200 ${
                  isActive
                    ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30'
                    : 'text-cyber-muted hover:text-cyber-text hover:bg-cyber-card/50'
                }`}
              >
                <span className="text-cyber-muted/50 mr-1">{link.code}</span>
                {isActive && <span className="text-cyber-cyan animate-pulse">█</span>}
              </Link>
            );
          })}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-cyber-muted hover:text-cyber-cyan transition-colors"
          aria-label="Toggle navigation"
        >
          <div className="space-y-1.5">
            <div
              className={`w-5 h-0.5 bg-current transition-transform duration-200 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <div
              className={`w-5 h-0.5 bg-current transition-opacity duration-200 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <div
              className={`w-5 h-0.5 bg-current transition-transform duration-200 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-cyber-border/50 bg-cyber-bg/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 font-mono text-sm rounded transition-all ${
                    isActive
                      ? 'text-cyber-cyan bg-cyber-cyan/10 border border-cyber-cyan/30'
                      : 'text-cyber-muted hover:text-cyber-text hover:bg-cyber-card/50'
                  }`}
                >
                  <span className="text-cyber-muted/50 mr-2">{link.code}</span>
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}