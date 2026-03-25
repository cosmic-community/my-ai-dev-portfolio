import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CosmicBadge from '@/components/CosmicBadge';

export const metadata: Metadata = {
  title: 'My AI Dev Portfolio | Cyberpunk Developer',
  description: 'AI Developer portfolio showcasing projects, skills, and experience with a cyberpunk aesthetic. Built with Next.js and Cosmic CMS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen bg-cyber-bg font-sans text-cyber-text antialiased">
        {/* Scanline overlay effect */}
        <div className="scanline-overlay" />

        {/* Grid background */}
        <div
          className="fixed inset-0 bg-grid-pattern bg-grid opacity-100 pointer-events-none"
          aria-hidden="true"
        />

        {/* Gradient orbs */}
        <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyber-magenta/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>

        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}