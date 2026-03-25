import { getWorkExperience } from '@/lib/cosmic';
import ExperienceCard from '@/components/ExperienceCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Experience | My AI Dev Portfolio',
  description: 'Work experience and professional journey in AI development and software engineering.',
};

export default async function ExperiencePage() {
  const experiences = await getWorkExperience();

  return (
    <div className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block mb-4 px-3 py-1 border border-cyber-green/30 rounded-full">
            <span className="font-mono text-xs text-cyber-green tracking-widest uppercase">
              // Experience
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-cyber-text mb-4">
            Work<span className="text-cyber-green">_</span>Experience
          </h1>
          <p className="font-mono text-cyber-muted text-sm max-w-2xl">
            &gt; A chronological record of roles, companies, and contributions.
            Each position another level in the game.
          </p>
        </div>

        {/* Timeline */}
        {experiences.length > 0 ? (
          <div className="relative">
            {/* Vertical line */}
            <div className="timeline-line" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <ExperienceCard
                  key={exp.id}
                  experience={exp}
                  index={index}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-mono text-cyber-muted text-sm">
              &gt; No experience data found. Compiling employment history...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}