import { LanguageLevel, RawLanguageLevel } from "src/types/Language";
import { LevelCategoryName, levelMapDBToFT, levelMapFTToDB } from "src/types/level";

export function transformLanguages(data: RawLanguageLevel[]): LanguageLevel[] {
  return data.map(({level, ...rest }) => ({
    ...rest,
    level: levelMapDBToFT[level] || "1",  // Défaut à "1" si absent
  }));
}

export function untransformLanguages(data: LanguageLevel[]): RawLanguageLevel[] {
  return data.map(({ level, ...rest }) => ({
    ...rest,
    level: levelMapFTToDB[level] as LevelCategoryName
  }));
}
