export type SizeCategory = "1" | "2" | "3" | "4";

export const sizeMapDBToFT: Record<string, "1" | "2" | "3" | "4"> = {
  MICRO: "1",
  SMALL: "2",
  MID: "3",
  LARGE: "4",
};

export const sizeMapFTToDB: Record<"1" | "2" | "3" | "4", string> = {
  "1": "MICRO",
  "2": "SMALL",
  "3": "MID",
  "4": "LARGE",
};

export type SizeCategoryName =
  | "MICRO"
  | "SMALL"
  | "MID"
  | "LARGE";