import type { SkillObject } from '@/types';
import { getMetafieldValue, getProficiencyPercent } from '@/types';

interface SkillBarProps {
  skill: SkillObject;
}

export default function SkillBar({ skill }: SkillBarProps) {
  const proficiencyLabel = getMetafieldValue(skill.metadata?.proficiency);
  const proficiencyPercent = getProficiencyPercent(skill.metadata?.proficiency);

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-sm text-cyber-text">{skill.title}</span>
        <span className="font-mono text-[10px] text-cyber-muted uppercase tracking-wider">
          {proficiencyLabel || 'N/A'}
        </span>
      </div>
      <div className="proficiency-bar-bg rounded-full h-2 overflow-hidden">
        <div
          className="proficiency-bar-fill h-full rounded-full"
          style={{ width: `${proficiencyPercent}%` }}
        />
      </div>
    </div>
  );
}