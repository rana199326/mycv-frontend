export interface ProfileFormData {
  id: number;
  email: string;
  password: string; // Optional for profile retrieval
  identity?: {
    first_name?: string;
    last_name?: string;
    about_me?: string;
  };
}

export interface LoginFormData {
  email: string; 
  password: string;
}