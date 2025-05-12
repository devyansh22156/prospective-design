export interface Notice {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  priority?: 'low' | 'normal' | 'high';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'EMPLOYEE';
}