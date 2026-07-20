import { SizeCategory, SizeCategoryName } from "./Size";
export interface Employer {
  id: number;
  name: string;
  business_activity: string;
  city: string;
  zip_code: string;
  country: string;
  size: SizeCategory;
  created_At: Date;
  updated_At?: Date | null;
}
export interface EmployerSize {
  id?: number;
  name: string;
  business_activity: string;
  city: string;
  zip_code: string;
  country: string;
  size: SizeCategory;
  created_At: Date;
  updated_At?: Date | null;
  profile_id?: number;
}
// Données brutes de la DB
export interface RawEmployerSize {
  id?: number;
  name: string;
  business_activity: string;
  city: string;
  zip_code: string;
  country: string;
  size: SizeCategoryName;
  created_At: Date;
  updated_At?: Date | null;
  profile_id?: number;
}
