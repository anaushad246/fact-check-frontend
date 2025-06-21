export interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface FactCheckResult {
  id: string;
  content: string;
  type: 'text' | 'image';
  verdict: 'real' | 'fake' | 'uncertain';
  confidence: number;
  explanation: string;
  timestamp: number;
  userId: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}