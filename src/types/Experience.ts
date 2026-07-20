import { Responsibility } from "./Responsibility";
export interface Experience {
  id: number;
  name: string;
  employer_id: number;
  start_date: Date;
  end_date: Date;
  created_At: Date;
  updated_At?: Date | null;
  userResponsibilitys: Responsibility[];  
}


