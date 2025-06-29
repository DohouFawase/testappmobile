// types/translation.ts
// export interface Translation {
//   id: string;
//   text: string;
//   gestureImage: string;
//   language: 'fr' | 'en';
//   timestamp: Date;
// }

export type Language = 'fr' | 'en';


export interface HistoryItemProps {
  item: Translation;
  onPress: (translation: Translation) => void;
}





// Types pour l'authentification
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
}

// Types pour les traductions
export interface Translation {
  id: string;
  text: string;
  language: 'fr' | 'en';
  result: TranslationResult;
  timestamp: number;
}

export interface TranslationResult {
  emoji: string;
  animation?: string;
  description: string;
  gestures?: string[];
}

// Types pour le thème
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
}

export type ColorScheme = 'light' | 'dark';

// Types pour les paramètres
export interface AppSettings {
  language: 'fr' | 'en';
  colorScheme: ColorScheme;
  hapticsEnabled: boolean;
  animationsEnabled: boolean;
}






export interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}



export interface TranslationContextType {
  translations: Translation[];
  isLoading: boolean;
  translate: (text: string, language: 'fr' | 'en') => Promise<Translation>;
  getHistory: () => Translation[];
  clearHistory: () => Promise<void>;
  removeTranslation: (id: string) => Promise<void>;
}

