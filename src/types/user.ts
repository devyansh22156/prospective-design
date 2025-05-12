export interface User {
  id: number;
  username: string;
  name: string;
  role: 'ADMIN' | 'HR' | 'EMPLOYEE';
  email: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}