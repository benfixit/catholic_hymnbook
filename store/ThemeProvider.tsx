import * as React from 'react';
import { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { useColorScheme } from 'react-native';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Colors } from '@/constants/theme';

const STORAGE_KEY = "theme_store"

type Props = {
  isDark: boolean;
  colors: Record<string, string>;
  theme: string;
  toggleTheme: Dispatch<SetStateAction<string>>;
};

const ThemeContext = createContext<Props>({ isDark: false, colors: {}, theme: "", toggleTheme: () => {}});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState(useColorScheme() ?? 'light');
    const { getItem, setItem } = useAsyncStorage(STORAGE_KEY);

    const isDark = theme === "dark";
    const colors = Colors[theme];

    useEffect(() => {
      const getTheme = async () => {
        const data = await getItem() || 'light';

        // @ts-ignore
        setTheme(data);
      }

      getTheme();
    }, []);



    const toggleTheme = async () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);

      setItem(newTheme);
    }

    return (
    <ThemeContext.Provider value={{ isDark, colors, theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const { isDark, colors } = React.useContext(ThemeContext);

  if (colors == null) {
    throw new Error(
      "Couldn't find a theme. Is your component inside NavigationContainer or does it have a theme?"
    );
  }

  return { isDark, colors };
}
