import type { WorkExperienceObject } from '@/types';

interface ExperienceCardProps {
  experience: WorkExperienceObject;
  index?: number;
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return 'Present';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return dateStr;
  }
}

export default function ExperienceCard({ experience, index = 0 }: ExperienceCardProps) {
  const isEven = index % 2 === 0;
  const startDate = formatDate(experience.metadata?.start_date);
  const endDate = formatDate(experience.metadata?.end_date);
  const company = experience.metadata?.company || '';
  const role = experience.metadata?.role || experience.title;
  const description = experience.metadata?.description || '';
  const companyLogo = experience.metadata?.company_logo;

  return (
    <div
      className={`relative flex flex-col md:flex-row items-start gap-6 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Timeline dot */}
      <div
        className="absolute left-[20px] md:left-1/2 top-6 w-4 h-4 rounded-full border-2 border-cyber-cyan bg-cyber-bg z-10 -translate-x-1/2"
        style={{ boxShadow: '0 0 10px rgba(0, 240, 255, 0.5)' }}
      />

      {/* Date label (visible on mobile) */}
      <div className="md:hidden pl-12 font-mono text-xs text-cyber-cyan mb-1">
        {startDate} — {endDate}
      </div>

      {/* Content */}
      <div
        className={`w-full md:w-[calc(50%-2rem)] ${
          isEven ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
        } pl-12 md:pl-0`}
      >
        {/* Date (desktop only) */}
        <div className="hidden md:block font-mono text-xs text-cyber-cyan mb-2">
          {startDate} — {endDate}
        </div>

        <div className="cyber-card rounded-lg p-6">
          <div
            className={`flex items-center gap-3 mb-3 ${
              isEven ? 'md:flex-row-reverse' : ''
            }`}
          >
            {companyLogo && (
              <img
                src={`${companyLogo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={company}
                width={40}
                height={40}
                className="w-10 h-10 rounded border border-cyber-border/30 object-cover"
              />
            )}
            <div className={isEven ? 'md:text-right' : ''}>
              <h3 className="font-display text-base font-bold text-cyber-text">
                {role}
              </h3>
              {company && (
                <p className="font-mono text-xs text-cyber-magenta">{company}</p>
              )}
            </div>
          </div>

          {description && (
            <p
              className={`font-mono text-xs text-cyber-muted leading-relaxed ${
                isEven ? 'md:text-right' : ''
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </div>
  );
}