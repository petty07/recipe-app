import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { darkColors, lightColors, type AppColors } from './colors';

interface ThemeContextValue { theme: AppColors; isDark: boolean; }
const ThemeContext = createContext<ThemeContextValue>({ theme: lightColors, isDark: false });
export function ThemeProvider({ children }: React.PropsWithChildren) {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const value = useMemo(() => ({ theme: isDark ? darkColors : lightColors, isDark }), [isDark]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export function useAppTheme() { return useContext(ThemeContext); }
