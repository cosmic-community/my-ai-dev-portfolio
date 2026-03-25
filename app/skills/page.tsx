import { getSkills } from '@/lib/cosmic';
import SkillBar from '@/components/SkillBar';
import { getMetafieldValue } from '@/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills | My AI Dev Portfolio',
  description: 'Explore technical skills and expertise across AI, machine learning, and software development.',
};

export default async function SkillsPage() {
  const skills = await getSkills();

  // Group skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  skills.forEach((skill) => {
    const cat = getMetafieldValue(skill.metadata?.category) || 'General';
    if (!skillsByCategory[cat]) {
      skillsByCategory[cat] = [];
    }
    skillsByCategory[cat]!.push(skill);
  });

  const categoryColors: Record<string, string> = {
    'AI & Machine Learning': 'cyber-cyan',
    'Programming Languages': 'cyber-magenta',
    'Frameworks': 'cyber-green',
    'Tools & Platforms': 'cyber-yellow',
    'Databases': 'cyber-purple',
  };

  const getCategoryColor = (category: string): string => {
    return categoryColors[category] || 'cyber-cyan';
  };

  const categories = Object.keys(skillsByCategory);

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block mb-4 px-3 py-1 border border-cyber-magenta/30 rounded-full">
            <span className="font-mono text-xs text-cyber-magenta tracking-widest uppercase">
              // Skills
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-cyber-text mb-4">
            Tech<span className="text-cyber-magenta text-glow-magenta">_</span>Stack
          </h1>
          <p className="font-mono text-cyber-muted text-sm max-w-2xl">
            &gt; A comprehensive overview of tools, languages, and frameworks in my
            neural toolkit. Constantly upgrading and evolving.
          </p>
        </div>

        {/* Skills Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => {
              const categorySkills = skillsByCategory[category];
              if (!categorySkills || categorySkills.length === 0) {
                return null;
              }
              const color = getCategoryColor(category);

              return (
                <div key={category} className="cyber-card rounded-lg p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-3 h-3 rounded-full bg-${color}`}
                      style={{
                        boxShadow:
                          color === 'cyber-cyan'
                            ? '0 0 10px #00f0ff'
                            : color === 'cyber-magenta'
                            ? '0 0 10px #ff00e5'
                            : color === 'cyber-green'
                            ? '0 0 10px #00ff88'
                            : color === 'cyber-yellow'
                            ? '0 0 10px #f0ff00'
                            : '0 0 10px #8b5cf6',
                      }}
                    />
                    <h2 className="font-mono text-sm uppercase tracking-wider text-cyber-text">
                      // {category}
                    </h2>
                    <span className="font-mono text-xs text-cyber-muted ml-auto">
                      [{categorySkills.length}]
                    </span>
                  </div>
                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <SkillBar key={skill.id} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-mono text-cyber-muted text-sm">
              &gt; No skills data found. Retraining neural network...
            </p>
          </div>
        )}

        {/* Summary Stats */}
        {skills.length > 0 && (
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="cyber-card rounded-lg p-5 text-center">
              <p className="font-display text-2xl font-bold text-cyber-cyan text-glow-cyan">
                {skills.length}
              </p>
              <p className="font-mono text-xs text-cyber-muted mt-1">Total Skills</p>
            </div>
            <div className="cyber-card rounded-lg p-5 text-center">
              <p className="font-display text-2xl font-bold text-cyber-magenta text-glow-magenta">
                {categories.length}
              </p>
              <p className="font-mono text-xs text-cyber-muted mt-1">Categories</p>
            </div>
            <div className="cyber-card rounded-lg p-5 text-center">
              <p className="font-display text-2xl font-bold text-cyber-green">
                {skills.filter((s) => {
                  const p = getMetafieldValue(s.metadata?.proficiency).toLowerCase();
                  return p === 'expert' || p === 'advanced';
                }).length}
              </p>
              <p className="font-mono text-xs text-cyber-muted mt-1">Expert/Advanced</p>
            </div>
            <div className="cyber-card rounded-lg p-5 text-center">
              <p className="font-display text-2xl font-bold text-cyber-yellow">∞</p>
              <p className="font-mono text-xs text-cyber-muted mt-1">Learning</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}