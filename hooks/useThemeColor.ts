import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';

export function useThemeColor() {
  const theme = useColorScheme() ?? 'light';

  return {
    colors: Colors[theme]
  }
}
