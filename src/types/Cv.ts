// --- Basic CV type (matches Prisma Cv model but simplified for frontend) ---
export type Cv = {
  id: number;
  numero?: number;
  title?: string;
  created_at?: string;   // we use string for dates in frontend
  updated_at?: string;
  template_id: number;
  cvidentitydisplaychoices_id: number;
  identity_id: number;
  profile_id: number;
};

// --- Relation types ---
export type CvEducationChoice = {
  cv_id: number;
  education_id: number;
  created_at?: string;
};

export type CvExperienceChoice = {
  cv_id: number;
  experience_id: number;
  created_at?: string;
};

export type CvLanguageChoice = {
  cv_id: number;
  languages_id: number;
  created_at?: string;
};

export type CvSkillChoice = {
  cv_id: number;
  skills_id: number;
  created_at?: string;
};

// --- Display choices for Identity ---
export type Cvidentitydisplaychoice = {
  id: number;
  birth_date?: boolean;
  phone_number?: boolean;
  street?: boolean;
  zip_code?: boolean;
  city?: boolean;
  about_me?: boolean;
  created_at?: string;
};
