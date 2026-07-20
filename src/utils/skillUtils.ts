import { SkillLevel, RawSkillLevel } from "src/types/Skill";
import { LevelCategoryName, levelMapDBToFT, levelMapFTToDB } from "src/types/level";

export function transformSkills(data: RawSkillLevel[]): SkillLevel[] {
  return data.map(({level, ...rest }) => ({
    ...rest,
    level: levelMapDBToFT[level] || "1",  // Défaut à "1" si absent
  }));
}

export function untransformSkills(data: SkillLevel[]): RawSkillLevel[] {
  return data.map(({ level, ...rest }) => ({
    ...rest,
    level: levelMapFTToDB[level] as LevelCategoryName
  }));
}
