import React, { createContext, useContext, useEffect, useState } from 'react';

type AccentColor = {
  h: number;
  s: string;
  l: string;
  name: string;
};

const colors: AccentColor[] = [
  { h: 210, s: '100%', l: '55%', name: 'Blue' },
  { h: 220, s: '100%', l: '60%', name: 'Electric Blue' },
  { h: 200, s: '95%', l: '55%', name: 'Sky' },
  { h: 190, s: '90%', l: '50%', name: 'Cyan' },
  { h: 175, s: '85%', l: '40%', name: 'Teal' },
  { h: 160, s: '90%', l: '40%', name: 'Green' },
  { h: 150, s: '90%', l: '45%', name: 'Emerald' },
  { h: 150, s: '80%', l: '55%', name: 'Mint' },
  { h: 140, s: '85%', l: '50%', name: 'Spring Green' },
  { h: 120, s: '85%', l: '45%', name: 'Neon Green' },

  { h: 90, s: '90%', l: '50%', name: 'Lime' },
  { h: 75, s: '95%', l: '55%', name: 'Chartreuse' },
  { h: 60, s: '95%', l: '55%', name: 'Neon Yellow' },
  { h: 45, s: '100%', l: '50%', name: 'Gold' },
  { h: 40, s: '100%', l: '55%', name: 'Sun Gold' },
  { h: 30, s: '100%', l: '55%', name: 'Amber' },
  { h: 25, s: '95%', l: '55%', name: 'Sunset Orange' },
  { h: 20, s: '95%', l: '60%', name: 'Tangerine' },
  { h: 10, s: '90%', l: '60%', name: 'Coral' },
  { h: 0, s: '85%', l: '60%', name: 'Rose' },

  { h: 350, s: '85%', l: '60%', name: 'Hot Pink' },
  { h: 330, s: '85%', l: '60%', name: 'Pink' },
  { h: 320, s: '85%', l: '55%', name: 'Magenta' },
  { h: 300, s: '90%', l: '60%', name: 'Fuchsia' },
  { h: 290, s: '90%', l: '60%', name: 'Orchid' },
  { h: 280, s: '90%', l: '60%', name: 'Purple' },
  { h: 270, s: '90%', l: '65%', name: 'Neon Purple' },
  { h: 260, s: '90%', l: '65%', name: 'Violet' },
  { h: 250, s: '90%', l: '65%', name: 'Lavender' },
  { h: 230, s: '90%', l: '60%', name: 'Indigo' }
];
interface ThemeContextType {
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
  colors: AccentColor[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accentColor, setAccentColorState] = useState<AccentColor>(() => {
    const saved = localStorage.getItem('accent-color');
    return saved ? JSON.parse(saved) : colors[0];
  });

  const setAccentColor = (color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem('accent-color', JSON.stringify(color));
  };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-h', accentColor.h.toString());
    root.style.setProperty('--primary-s', accentColor.s);
    root.style.setProperty('--primary-l', accentColor.l);
  }, [accentColor]);

  return (
    <ThemeContext.Provider value={{ accentColor, setAccentColor, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
