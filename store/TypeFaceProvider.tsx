import * as React from 'react';
import { useState, createContext, ReactNode } from 'react';

type Props = {
  fontSize: number;
  setFontSize: Function;
};

const TypeFaceContext = createContext<Props>({ fontSize: 16, setFontSize: () => {} });

export default function TypeFaceProvider({ children }: { children: ReactNode }) {
    const [fontSize, setFontSize] = useState<number>(16);

    return (
    <TypeFaceContext.Provider value={{ fontSize, setFontSize }}>{children}</TypeFaceContext.Provider>
  );
}

export function useTypeFace() {
  const { fontSize, ...rest } = React.useContext(TypeFaceContext);

  if (!fontSize) {
    throw new Error(
      "Couldn't find a font size. Is your component inside TypeFaceContext?"
    );
  }

  return { fontSize, ...rest };
}
