import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { DARK_THEME, LIGHT_THEME, THEME_STORAGE_KEY, makeThemeColor } from '@/constants/theme';
import { ThemeType } from '@/typings';
import { STORAGE_KEY_PREFIX } from '@/constants/app';
import { useCalendar } from './SeasonProvider';

type Props = {
  colors: Record<string, string>;
  theme: ThemeType;
  toggleTheme: Function;
};

const KEY = STORAGE_KEY_PREFIX + THEME_STORAGE_KEY;

const ThemeContext = createContext<Props>({ colors: {}, theme: LIGHT_THEME, toggleTheme: () => {} });

export default function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<ThemeType>(LIGHT_THEME);
    const { getItem, setItem } = useAsyncStorage(KEY);
    const { calendar } = useCalendar();

    // if it is automatic, use the system value
    const colors = makeThemeColor(calendar.color)[theme];

    useEffect(() => {
      const getTheme = async () => {
        const data = await getItem() as ThemeType;

        setTheme(data ?? LIGHT_THEME);
      }

      getTheme();
    }, []);



    const toggleTheme = async () => {
      const newTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
      
      setTheme(newTheme);
      await setItem(newTheme);
    }

    return (
    <ThemeContext.Provider value={{ colors, theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const { theme, ...rest } = useContext(ThemeContext);

  if (theme == null) {
    throw new Error(
      "Couldn't find a theme. Is your component inside ThemeContext or does it have a theme?"
    );
  }

  return { theme, ...rest };
}
