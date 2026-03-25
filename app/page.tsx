import Link from 'next/link';
import { getProjects, getSkills, getWorkExperience } from '@/lib/cosmic';
import ProjectCard from '@/components/ProjectCard';
import SkillBar from '@/components/SkillBar';
import ExperienceCard from '@/components/ExperienceCard';
import { getMetafieldValue } from '@/types';

export default async function HomePage() {
  const [projects, skills, experiences] = await Promise.all([
    getProjects(),
    getSkills(),
    getWorkExperience(),
  ]);

  const featuredProjects = projects.filter((p) => p.metadata?.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3);

  // Group skills by category
  const skillsByCategory: Record<string, typeof skills> = {};
  skills.forEach((skill) => {
    const cat = getMetafieldValue(skill.metadata?.category) || 'General';
    if (!skillsByCategory[cat]) {
      skillsByCategory[cat] = [];
    }
    skillsByCategory[cat]!.push(skill);
  });

  const recentExperiences = experiences.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-24 md:py-36 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-1.5 border border-cyber-cyan/30 rounded-full">
            <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase">
              // AI Developer Portfolio
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-cyber-text">Building the</span>
            <br />
            <span className="text-cyber-cyan text-glow-cyan">Future</span>
            <span className="text-cyber-muted mx-3">//</span>
            <span className="text-cyber-magenta text-glow-magenta">With AI</span>
          </h1>

          <p className="font-mono text-cyber-muted text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            &gt; Crafting intelligent systems, neural architectures, and digital
            experiences at the intersection of human creativity and machine learning.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="cyber-btn">
              <span>&#123;</span> View Projects <span>&#125;</span>
            </Link>
            <Link href="/skills" className="cyber-btn cyber-btn-magenta">
              <span>&#60;</span> Explore Skills <span>/&#62;</span>
            </Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-cyan/20 to-transparent" />
      </section>

      {/* Neon divider */}
      <div className="neon-line max-w-4xl mx-auto" />

      {/* Featured Projects Section */}
      {displayProjects.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-cyber-cyan text-sm">01</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cyber-text">
                Featured<span className="text-cyber-cyan">_</span>Projects
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-cyber-cyan/30 to-transparent" />
              <Link
                href="/projects"
                className="font-mono text-xs text-cyber-muted hover:text-cyber-cyan transition-colors"
              >
                view_all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="neon-line max-w-4xl mx-auto" />

      {/* Skills Overview Section */}
      {skills.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-cyber-magenta text-sm">02</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cyber-text">
                Tech<span className="text-cyber-magenta">_</span>Stack
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-cyber-magenta/30 to-transparent" />
              <Link
                href="/skills"
                className="font-mono text-xs text-cyber-muted hover:text-cyber-magenta transition-colors"
              >
                view_all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.keys(skillsByCategory).slice(0, 4).map((category) => {
                const categorySkills = skillsByCategory[category];
                if (!categorySkills || categorySkills.length === 0) {
                  return null;
                }
                return (
                  <div key={category} className="cyber-card rounded-lg p-6">
                    <h3 className="font-mono text-cyber-cyan text-sm uppercase tracking-wider mb-5">
                      // {category}
                    </h3>
                    <div className="space-y-4">
                      {categorySkills.slice(0, 4).map((skill) => (
                        <SkillBar key={skill.id} skill={skill} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <div className="neon-line max-w-4xl mx-auto" />

      {/* Experience Section */}
      {recentExperiences.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-12">
              <span className="font-mono text-cyber-green text-sm">03</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-cyber-text">
                Work<span className="text-cyber-green">_</span>Experience
              </h2>
              <div className="flex-grow h-px bg-gradient-to-r from-cyber-green/30 to-transparent" />
              <Link
                href="/experience"
                className="font-mono text-xs text-cyber-muted hover:text-cyber-green transition-colors"
              >
                view_all →
              </Link>
            </div>

            <div className="space-y-6">
              {recentExperiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="cyber-card rounded-xl p-10 md:p-14">
            <h2 className="font-display text-2xl md:text-4xl font-bold text-cyber-text mb-4">
              Ready to <span className="text-cyber-cyan text-glow-cyan">Connect</span>?
            </h2>
            <p className="font-mono text-cyber-muted text-sm mb-8 max-w-lg mx-auto">
              &gt; Looking for an AI developer who can bring your vision to the next level?
              Let&apos;s build something extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" className="cyber-btn">
                Explore My Work
              </Link>
              <Link href="/experience" className="cyber-btn cyber-btn-magenta">
                View Experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}