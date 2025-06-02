
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light' | 'system' | 'colorBlind';

interface ThemeSettings {
  brightness: number;
  contrast: number;
  saturation: number;
}

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  settings: ThemeSettings;
  updateSettings: (settings: Partial<ThemeSettings>) => void;
  resetSettings: () => void;
  saveSettings: () => void;
  isPropertiesOpen: boolean;
  toggleProperties: () => void;
  closeProperties: () => void;
}

const defaultSettings: ThemeSettings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [isPropertiesOpen, setIsPropertiesOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode;
    const savedSettings = localStorage.getItem('theme-settings');
    
    if (savedMode) {
      setMode(savedMode);
    }
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme mode
    if (mode === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else if (mode === 'colorBlind') {
      root.classList.add('dark');
      root.classList.add('color-blind');
    } else {
      root.classList.toggle('dark', mode === 'dark');
      root.classList.remove('color-blind');
    }

    // Apply custom CSS variables
    root.style.setProperty('--brightness', `${settings.brightness}%`);
    root.style.setProperty('--contrast', `${settings.contrast}%`);
    root.style.setProperty('--saturation', `${settings.saturation}%`);
  }, [mode, settings]);

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const saveSettings = () => {
    localStorage.setItem('theme-mode', mode);
    localStorage.setItem('theme-settings', JSON.stringify(settings));
    setIsPropertiesOpen(false);
  };

  const toggleProperties = () => {
    setIsPropertiesOpen(!isPropertiesOpen);
  };

  const closeProperties = () => {
    setIsPropertiesOpen(false);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        settings,
        updateSettings,
        resetSettings,
        saveSettings,
        isPropertiesOpen,
        toggleProperties,
        closeProperties,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
