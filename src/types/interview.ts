export type InterviewStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'NO_RESPONSE';
export type InterviewMode   = 'IN_PERSON' | 'ONLINE' | 'TELEPHONE';

export interface InterviewFormData {
  id: number;
  position: string | null;
  company?: string | null;
  status?: InterviewStatus | null;
  date_interview?: string | null;      // ISO أو "YYYY-MM-DD"
  is_closed?: boolean | null;          // ← بدال Boolean
  location_of_interview?: string | null;
  interview_mode?: InterviewMode | null;
}
