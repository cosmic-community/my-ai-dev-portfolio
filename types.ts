export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface ProjectObject extends CosmicObject {
  type: 'projects';
  metadata: {
    description?: string;
    screenshots?: {
      url: string;
      imgix_url: string;
    }[];
    tech_stack?: string;
    live_url?: string;
    source_code_url?: string;
    featured?: boolean;
  };
}

export interface SkillObject extends CosmicObject {
  type: 'skills';
  metadata: {
    category?: unknown;
    proficiency?: unknown;
  };
}

export interface WorkExperienceObject extends CosmicObject {
  type: 'work-experience';
  metadata: {
    company?: string;
    role?: string;
    start_date?: string;
    end_date?: string;
    description?: string;
    company_logo?: {
      url: string;
      imgix_url: string;
    };
  };
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export function getProficiencyPercent(proficiency: unknown): number {
  const val = getMetafieldValue(proficiency).toLowerCase();
  switch (val) {
    case 'expert':
      return 95;
    case 'advanced':
      return 80;
    case 'intermediate':
      return 60;
    case 'beginner':
      return 35;
    default:
      return 50;
  }
}