// app/projects/[slug]/page.tsx
import { getProjectBySlug, getProjects } from '@/lib/cosmic';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Changed: Added helper function to safely parse tech_stack regardless of its type
function parseTechStack(techStack: unknown): string[] {
  if (!techStack) return [];
  if (Array.isArray(techStack)) {
    return techStack
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (typeof item === 'object' && item !== null && 'value' in item) {
          return String((item as { value: unknown }).value).trim();
        }
        if (typeof item === 'object' && item !== null && 'key' in item) {
          return String((item as { key: unknown }).key).trim();
        }
        return String(item).trim();
      })
      .filter(Boolean);
  }
  if (typeof techStack === 'string') {
    return techStack.split(',').map((t) => t.trim()).filter(Boolean);
  }
  if (typeof techStack === 'object' && techStack !== null && 'value' in techStack) {
    const val = String((techStack as { value: unknown }).value);
    return val.split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return {
    title: `${project.title} | My AI Dev Portfolio`,
    description: project.metadata?.description || 'View project details.',
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Changed: Use safe parseTechStack helper instead of direct .split()
  const techItems = parseTechStack(project.metadata?.tech_stack);

  const screenshots = project.metadata?.screenshots;
  const liveUrl = project.metadata?.live_url;
  const sourceUrl = project.metadata?.source_code_url;

  return (
    <div className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10 font-mono text-xs text-cyber-muted">
          <Link href="/" className="hover:text-cyber-cyan transition-colors">
            home
          </Link>
          <span>/</span>
          <Link href="/projects" className="hover:text-cyber-cyan transition-colors">
            projects
          </Link>
          <span>/</span>
          <span className="text-cyber-cyan">{project.slug}</span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <div className="inline-block mb-4 px-3 py-1 border border-cyber-cyan/30 rounded-full">
            <span className="font-mono text-xs text-cyber-cyan tracking-widest uppercase">
              // Project Detail
            </span>
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-cyber-text mb-4">
            {project.title}
          </h1>
          {project.metadata?.description && (
            <p className="font-mono text-cyber-muted text-sm leading-relaxed max-w-3xl">
              {project.metadata.description}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn"
            >
              ▶ Live Demo
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cyber-btn cyber-btn-magenta"
            >
              {'</>'} Source Code
            </a>
          )}
        </div>

        {/* Tech Stack */}
        {techItems.length > 0 && (
          <div className="mb-10">
            <h2 className="font-mono text-sm text-cyber-cyan uppercase tracking-wider mb-4">
              // Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {techItems.map((tech: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-xs font-mono bg-cyber-card border border-cyber-cyan/20 text-cyber-cyan rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="neon-line mb-10" />

        {/* Screenshots */}
        {screenshots && screenshots.length > 0 && (
          <div className="mb-10">
            <h2 className="font-mono text-sm text-cyber-magenta uppercase tracking-wider mb-6">
              // Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {screenshots.map((shot, i: number) => (
                <div
                  key={i}
                  className="cyber-card rounded-lg overflow-hidden"
                >
                  <img
                    src={`${shot.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={400}
                    height={250}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {project.content && (
          <div className="mb-10">
            <h2 className="font-mono text-sm text-cyber-green uppercase tracking-wider mb-6">
              // Details
            </h2>
            <div
              className="prose prose-invert prose-sm max-w-none font-mono text-cyber-muted leading-relaxed [&_a]:text-cyber-cyan [&_a:hover]:text-cyber-magenta [&_h2]:text-cyber-text [&_h3]:text-cyber-text [&_strong]:text-cyber-text"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        )}

        {/* Back Link */}
        <div className="mt-14">
          <Link
            href="/projects"
            className="font-mono text-sm text-cyber-muted hover:text-cyber-cyan transition-colors"
          >
            ← back_to_projects
          </Link>
        </div>
      </div>
    </div>
  );
}