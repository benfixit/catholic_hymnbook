import * as React from 'react';
import { useState, useEffect, createContext, ReactNode } from 'react';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Colors, LIGHT_THEME, THEME_STORAGE_KEY } from '@/constants/theme';
import { ThemeType } from '@/typings';

type Props = {
  colors: Record<string, string>;
  theme: ThemeType;
  toggleTheme: Function;
};

const ThemeContext = createContext<Props>({ colors: {}, theme: LIGHT_THEME, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>(LIGHT_THEME);
    const { getItem, setItem } = useAsyncStorage(THEME_STORAGE_KEY);

    // if it is automatic, use the system value
    const colors = Colors[theme];

    useEffect(() => {
      const getTheme = async () => {
        const data = await getItem() as ThemeType;

        setTheme(data ?? LIGHT_THEME);
      }

      getTheme();
    }, []);



    const toggleTheme = async (theme: ThemeType) => {
      setTheme(theme);
      setItem(theme);
    }

    return (
    <ThemeContext.Provider value={{ colors, theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const { theme, ...rest } = React.useContext(ThemeContext);

  if (theme == null) {
    throw new Error(
      "Couldn't find a theme. Is your component inside NavigationContainer or does it have a theme?"
    );
  }

  return { theme, ...rest };
}
