export interface User {
  id: string;  // Changed from number to string to match implementation
  username: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'EMPLOYEE';  // Removed 'Management' as it's not in the allowed roles
}

export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  priority?: 'low' | 'normal' | 'high';
}