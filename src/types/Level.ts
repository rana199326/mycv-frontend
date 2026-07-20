export type LevelCategory = "1" | "2" | "3" | "4";

export const levelMapDBToFT: Record<string, "1" | "2" | "3" | "4"> = {
  BEGINNER: "1",
  INTERMEDIATE: "2",
  ADVANCED: "3",
  NATIVE: "4",
};

export const levelMapFTToDB: Record<"1" | "2" | "3" | "4", string> = {
  "1": "BEGINNER",
  "2": "INTERMEDIATE",
  "3": "ADVANCED",
  "4": "NATIVE",
};

export type LevelCategoryName =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "NATIVE";