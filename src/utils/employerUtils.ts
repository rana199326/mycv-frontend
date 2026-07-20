import { EmployerSize, RawEmployerSize } from "src/types/Employer";
import { SizeCategoryName, sizeMapDBToFT, sizeMapFTToDB } from "src/types/Size";

export function transformEmployers(data: RawEmployerSize[]): EmployerSize[] {
  return data.map(({size, ...rest }) => ({
    ...rest,
    size: sizeMapDBToFT[size] || "1",  // Défaut à "1" si absent
  }));
}

export function untransformEmployers(data: EmployerSize[]): RawEmployerSize[] {
  return data.map(({ size, ...rest }) => ({
    ...rest,
    size: sizeMapFTToDB[size] as SizeCategoryName
  }));
}
