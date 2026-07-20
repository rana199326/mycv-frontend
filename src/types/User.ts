export interface User {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'User' | 'Editor';
    status: 'Active' | 'Inactive';
    department: string;
    title: string;
    lastLogin: string;
  }
  
  export interface UserFormData {
    name: string;
    email: string;
    role: 'Admin' | 'User' | 'Editor';
    department: string;
    title: string;
  }
  