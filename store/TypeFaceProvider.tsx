import { STORAGE_KEY_PREFIX } from '@/constants/app';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useState, createContext, ReactNode, useEffect, useContext } from 'react';

const TYPEFACE_STORAGE_KEY = "_typeface";

const DEFAULT_FONT_SIZE = 16;

type Props = {
  fontSize: number;
  saveFontSize: Function;
};

const TypeFaceContext = createContext<Props>({ fontSize: DEFAULT_FONT_SIZE, saveFontSize: () => {} });

const KEY = STORAGE_KEY_PREFIX + TYPEFACE_STORAGE_KEY;

export default function TypeFaceProvider({ children }: { children: ReactNode }) {
    const [fontSize, setFontSize] = useState<number>(DEFAULT_FONT_SIZE);
    const { getItem, setItem } = useAsyncStorage(KEY);

    useEffect(() => {
      const getFontSize = async () => {
        const size = await getItem();

        setFontSize(Number(size) || DEFAULT_FONT_SIZE);
      }

      getFontSize();
    }, []);

    const saveFontSize = async (fontSize: number) => {    
      setFontSize(fontSize);
      await setItem(fontSize.toString());
    }

    return (
    <TypeFaceContext.Provider value={{ fontSize, saveFontSize }}>{children}</TypeFaceContext.Provider>
  );
}

export function useTypeFace() {
  const { fontSize, ...rest } = useContext(TypeFaceContext);

  if (!fontSize) {
    throw new Error(
      "Couldn't find a font size. Is your component inside TypeFaceContext?"
    );
  }

  return { fontSize, ...rest };
}
