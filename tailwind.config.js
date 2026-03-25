/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a0f',
          surface: '#12121a',
          card: '#1a1a2e',
          border: '#2a2a4a',
          cyan: '#00f0ff',
          magenta: '#ff00e5',
          yellow: '#f0ff00',
          green: '#00ff88',
          purple: '#8b5cf6',
          text: '#e0e0f0',
          muted: '#8888aa',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Orbitron', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00f0ff, 0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
        'neon-magenta': '0 0 5px #ff00e5, 0 0 20px rgba(255, 0, 229, 0.3), 0 0 40px rgba(255, 0, 229, 0.1)',
        'neon-green': '0 0 5px #00ff88, 0 0 20px rgba(0, 255, 136, 0.3)',
        'card-glow': '0 0 15px rgba(0, 240, 255, 0.1), inset 0 0 15px rgba(0, 240, 255, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scanline': 'scanline 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { opacity: '0.5' },
          '100%': { opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid': '50px 50px',
      },
    },
  },
  plugins: [],
}