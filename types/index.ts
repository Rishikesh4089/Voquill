export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  romanizedContent: string;
  language: Language;
  createdAt: string;
  updatedAt: string;
}

export interface Language {
  id: string;
  name: string;
  code: string;
  nativeName: string;
}

export enum RecordingStatus {
  IDLE = 'idle',
  RECORDING = 'recording',
  PAUSED = 'paused',
  STOPPED = 'stopped',
  PROCESSING = 'processing',
  ERROR = 'error',
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}