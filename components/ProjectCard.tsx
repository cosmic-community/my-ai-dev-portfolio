import Link from 'next/link';
import type { ProjectObject } from '@/types';

interface ProjectCardProps {
  project: ProjectObject;
}

// Changed: Added helper function to safely parse tech_stack regardless of its type (string, array, or object)
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
  // Handle object-shaped values (e.g., {key, value})
  if (typeof techStack === 'object' && techStack !== null && 'value' in techStack) {
    const val = String((techStack as { value: unknown }).value);
    return val.split(',').map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

export default function ProjectCard({ project }: ProjectCardProps) {
  // Changed: Use safe parseTechStack helper instead of direct .split()
  const allTechItems = parseTechStack(project.metadata?.tech_stack);
  const techItems = allTechItems.slice(0, 4);

  const screenshots = project.metadata?.screenshots;
  const firstScreenshot = screenshots && screenshots.length > 0 ? screenshots[0] : null;
  const liveUrl = project.metadata?.live_url;
  const sourceUrl = project.metadata?.source_code_url;

  return (
    <div className="cyber-card rounded-lg overflow-hidden group">
      {/* Image */}
      {firstScreenshot && (
        <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden">
          <img
            src={`${firstScreenshot.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={project.title}
            width={400}
            height={225}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      )}

      {/* Content */}
      <div className="p-5">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="font-display text-lg font-bold text-cyber-text group-hover:text-cyber-cyan transition-colors mb-2">
            {project.title}
          </h3>
        </Link>

        {project.metadata?.description && (
          <p className="font-mono text-xs text-cyber-muted leading-relaxed mb-4 line-clamp-2">
            {project.metadata.description}
          </p>
        )}

        {/* Tech Stack Tags */}
        {techItems.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techItems.map((tech: string, i: number) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-mono bg-cyber-cyan/10 border border-cyber-cyan/20 text-cyber-cyan rounded"
              >
                {tech}
              </span>
            ))}
            {/* Changed: Use allTechItems.length instead of splitting raw value again */}
            {allTechItems.length > 4 && (
              <span className="px-2 py-0.5 text-[10px] font-mono text-cyber-muted">
                +{allTechItems.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Action Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-cyber-border/30">
          <Link
            href={`/projects/${project.slug}`}
            className="font-mono text-xs text-cyber-cyan hover:text-cyber-text transition-colors"
          >
            details →
          </Link>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyber-green hover:text-cyber-text transition-colors"
            >
              live ↗
            </a>
          )}
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-cyber-magenta hover:text-cyber-text transition-colors ml-auto"
            >
              {'</>'} code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}