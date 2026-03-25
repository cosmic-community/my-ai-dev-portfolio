import { getProjects } from '@/lib/cosmic';
import ProjectCard from '@/components/ProjectCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | My AI Dev Portfolio',
  description: 'Explore AI-powered projects, experiments, and open-source contributions.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="inline-block mb-4 px-3 py-1 border border-cyber-cyan/30 rounded-full">
            <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase">
              // Projects
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-cyber-text mb-4">
            My<span className="text-cyber-cyan text-glow-cyan">_</span>Projects
          </h1>
          <p className="font-mono text-cyber-muted text-sm max-w-2xl">
            &gt; A collection of AI-powered applications, experiments, and open-source
            contributions. Each project pushes the boundaries of what&apos;s possible.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-mono text-cyber-muted text-sm">
              &gt; No projects found. Initializing new neural network...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}