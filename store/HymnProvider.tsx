import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { HymnType, Optional } from "../typings";
import allHymns from "../assets/hymns/index.json";

type Props = {
    hymns: HymnType[], 
    selectedHymn: Optional<HymnType>, 
    setHymn: Dispatch<SetStateAction<HymnType>>
};

export const HymnContext = createContext<Props>({
    hymns: [],
    selectedHymn: undefined,
    setHymn: () => {}
});

const HymnProvider = ({ children }: { children: ReactNode }) => {
    const [hymn, setHymn] = useState(undefined);

    //@ts-ignore
    return <HymnContext.Provider value={{ hymns: allHymns, selectedHymn: hymn, setHymn }}>
        {children}
    </HymnContext.Provider>
}

export const useHymns = () => {
    return useContext(HymnContext);
}

export default HymnProvider;