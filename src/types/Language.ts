// Keep it identical to backend expectations.
export type LanguageLevelName = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface LanguagePayload {
  id: number | string; // API can return string IDs, but we normalize to number
  name: string;
  level: LanguageLevelName;
}

export interface Language extends LanguagePayload {
  id: number;
}

// Map 1..4 stars to enum text
export function starsToLangLevel(stars: number): LanguageLevelName {
  switch (stars) {
    case 1: return 'BEGINNER';
    case 2: return 'INTERMEDIATE';
    case 3: return 'ADVANCED';
    case 4: return 'EXPERT';
    default: return 'BEGINNER';
  }
}

export const langLevelTextToStars: Record<LanguageLevelName, number> = {
  BEGINNER: 1,
  INTERMEDIATE: 2,
  ADVANCED: 3,
  EXPERT: 4,
};
