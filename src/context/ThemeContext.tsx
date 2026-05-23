import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export const COLORS = [
  {
    name: 'Champagne',
    bg: 'bg-yellow-600',
    hover: 'hover:bg-yellow-700',
    border: 'border-yellow-600',
    text: 'text-yellow-600',
    value: '#C9A84C',
    rgb: '201, 168, 76',
    ceremonyText: 'Ceremony',
  },
  {
    name: 'Noir Black',
    bg: 'bg-gray-900',
    hover: 'hover:bg-gray-800',
    border: 'border-gray-900',
    text: 'text-gray-900',
    value: '#1A1A1A',
    rgb: '26, 26, 26',
    ceremonyText: 'Ceremony',
  },
  {
    name: 'Chocolate',
    bg: 'bg-amber-900',
    hover: 'hover:bg-amber-800',
    border: 'border-amber-900',
    text: 'text-amber-900',
    value: '#6B4226',
    rgb: '107, 66, 38',
    ceremonyText: 'Ceremony',
  },
];

interface ThemeContextType {
  selectedTheme: number;
  setSelectedTheme: (index: number) => void;
  currentColor: (typeof COLORS)[0];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'pc2026-theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Restore persisted theme; default to Champagne Gold (index 0)
  const [selectedTheme, setSelectedTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === null) return 0;
      const idx = parseInt(saved, 10);
      return Number.isFinite(idx) && idx >= 0 && idx < COLORS.length ? idx : 0;
    } catch {
      return 0;
    }
  });

  const setThemeColor = (color: string, rgb: string) => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', color);
    root.style.setProperty('--theme-r', rgb.split(',')[0].trim());
    root.style.setProperty('--theme-g', rgb.split(',')[1].trim());
    root.style.setProperty('--theme-b', rgb.split(',')[2].trim());
  };

  useEffect(() => {
    const color = COLORS[selectedTheme];
    setThemeColor(color.value, color.rgb);
    try { localStorage.setItem(STORAGE_KEY, String(selectedTheme)); } catch { /* storage unavailable */ }
  }, [selectedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        selectedTheme,
        setSelectedTheme,
        currentColor: COLORS[selectedTheme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
