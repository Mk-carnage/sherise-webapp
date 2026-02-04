import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  avatar: string;
  interests: string[];
  language: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  user: User | null;
  language: string;
  darkMode: boolean;
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  hasCompletedOnboarding: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  signup: (name: string, email: string, password: string) => void;
  setLanguage: (lang: string) => void;
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  completeOnboarding: (interests: string[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguageState] = useState('en');
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  // Apply theme classes to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    root.classList.remove('font-size-large', 'font-size-extra-large');
    if (fontSize === 'large') {
      root.classList.add('font-size-large');
    } else if (fontSize === 'extra-large') {
      root.classList.add('font-size-extra-large');
    }
  }, [darkMode, highContrast, fontSize]);

  const login = (email: string, _password: string) => {
    // Mock login
    setUser({
      name: email.split('@')[0],
      email,
      avatar: email.substring(0, 2).toUpperCase(),
      interests: [],
      language: 'en',
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
  };

  const signup = (name: string, email: string, _password: string) => {
    setUser({
      name,
      email,
      avatar: name.substring(0, 2).toUpperCase(),
      interests: [],
      language: 'en',
    });
    setIsAuthenticated(true);
  };

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const toggleHighContrast = () => {
    setHighContrast(prev => !prev);
  };

  const setFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSizeState(size);
  };

  const completeOnboarding = (interests: string[]) => {
    if (user) {
      setUser({ ...user, interests });
    }
    setHasCompletedOnboarding(true);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        language,
        darkMode,
        highContrast,
        fontSize,
        hasCompletedOnboarding,
        login,
        logout,
        signup,
        setLanguage,
        toggleDarkMode,
        toggleHighContrast,
        setFontSize,
        completeOnboarding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
