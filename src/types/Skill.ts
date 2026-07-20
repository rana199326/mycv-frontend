// types/Skill.ts
export type SkillLevelName = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface SkillPayload {
  id: number;
  name: string;
  
  level: SkillLevelName;
}

// Helper: stars (1..4) -> enum text
export function starsToLevel(stars: number): SkillLevelName {
  switch (stars) {
    case 1: return "BEGINNER";
    case 2: return "INTERMEDIATE";
    case 3: return "ADVANCED";
    case 4: return "EXPERT";
    default: return "BEGINNER";
  }
}

// Helper: enum text -> stars 
export function levelToStars(level: SkillLevelName): number {
  switch (level) {
    case "BEGINNER": return 1;
    case "INTERMEDIATE": return 2;
    case "ADVANCED": return 3;
    case "EXPERT": return 4;
    default: return 1;
  }
}
