import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { HymnType, Optional } from "../typings";
import hymns from "../assets/hymns/index.json";

const HymnContext = createContext<{ hymns: HymnType[], selectedHymn: Optional<HymnType>, setHymn: Dispatch<SetStateAction<HymnType>> }>({
    hymns: [],
    selectedHymn: undefined,
    setHymn: () => {}
});

const HymnProvider = ({ children }: { children: ReactNode }) => {
    const [hymn, setHymn] = useState(undefined);

    //@ts-ignore
    return <HymnContext.Provider value={{ hymns, selectedHymn: hymn, setHymn }}>
        {children}
    </HymnContext.Provider>
}

export const useHymns = () => {
    return useContext(HymnContext);
}

export default HymnProvider;