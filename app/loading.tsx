export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-16 h-16 border-2 border-cyber-cyan/20 rounded-full" />
          <div className="absolute top-0 left-0 w-16 h-16 border-2 border-transparent border-t-cyber-cyan rounded-full animate-spin" />
          <div className="absolute top-1 left-1 w-14 h-14 border border-transparent border-b-cyber-magenta rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
        <p className="mt-6 font-mono text-sm text-cyber-cyan animate-pulse">
          &gt; Loading neural pathways...
        </p>
      </div>
    </div>
  );
}