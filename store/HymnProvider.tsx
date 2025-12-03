import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { Category, HymnType, Nullable, Optional } from "../typings";
import allHymns from "../assets/hymns/index.json";

type ValueType = {
    hymns: HymnType[], 
    selectedHymn: Optional<HymnType>, 
    setHymn: Dispatch<SetStateAction<HymnType>>,
    category: Nullable<Category>, 
    setCategory: Dispatch<SetStateAction<Nullable<Category>>>
};

export const HymnContext = createContext<ValueType>({
    hymns: [],
    selectedHymn: undefined,
    setHymn: () => {},
    category: null,
    setCategory: () => {}
});

const HymnProvider = ({ children }: { children: ReactNode }) => {
    const [hymn, setHymn] = useState(undefined);
    const [category, setCategory] = useState(null);

    //@ts-ignore
    return <HymnContext.Provider value={{ hymns: allHymns, selectedHymn: hymn, setHymn, category, setCategory }}>
        {children}
    </HymnContext.Provider>
}

export const useHymns = () => {
    return useContext(HymnContext);
}

export default HymnProvider;