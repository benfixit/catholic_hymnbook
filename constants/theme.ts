/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const THEME_STORAGE_KEY = "_theme"

export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

export const borderBottomColor = '#dddddd';
export const linkColor = '#0078d7';

export const makeThemeColor = (seasonColor: string) => {
  let primaryColor = "";
  let secondaryColor = "";

  switch (seasonColor) {
    case "purple":
      primaryColor = "#65c99aff",
      secondaryColor = "#e4ccfcff"
      break;
    case "gold":
    case "white":
      primaryColor = "#AE8625",
      secondaryColor = "#F7EF8A"
      break;
    case "green":
      primaryColor = "#186420",
      secondaryColor = "#b3f9ba"
      break;
    case "red":
      primaryColor = "#C41E3A",
      secondaryColor = "#f8c5ce"
      break;
  }

  return {
    light: {
      text: '#11181C',
      secondaryText: '#5c676dff',
      background: '#F7F9FB',
      secondaryBackground: "#ffffff",
      primaryColor,
      secondaryColor,
      icon: '#687076'
    },
    dark: {
      text: '#ECEDEE',
      secondaryText: '#8898AE',
      background: '#151718',
      secondaryBackground: "#000000",
      primaryColor,
      secondaryColor,
      icon: '#9BA1A6'
    },
  }

}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
