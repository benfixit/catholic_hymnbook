import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Category, HymnType, Nullable } from "../typings";
import allHymns from "../assets/hymns/index.json";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

type FavoritesType = number[];

type ValueType = {
    hymns: HymnType[], 
    selectedHymn: Nullable<HymnType>, 
    setHymn: Dispatch<SetStateAction<Nullable<HymnType>>>,
    category: Nullable<Category>, 
    setCategory: Dispatch<SetStateAction<Nullable<Category>>>,
    favorites: number[],
    toggleFavorites: Dispatch<SetStateAction<number>>,
};

export const HymnContext = createContext<ValueType>({
    hymns: [],
    selectedHymn: null,
    setHymn: () => {},
    category: null,
    setCategory: () => {},
    favorites: [],
    toggleFavorites: () => {},
});

const STORAGE_KEY = `hymbook_settings`;

const HymnProvider = ({ children }: { children: ReactNode }) => {
    const [hymn, setHymn] = useState<Nullable<HymnType>>(null);
    const [category, setCategory] = useState<Nullable<Category>>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const { getItem, setItem } = useAsyncStorage(STORAGE_KEY);

    useEffect(() => {
        const fetchFavorites = async () => {
            const data = await getItem();

            if (data) {
                const favorites = JSON.parse(data) as FavoritesType;
                setFavorites(favorites);
            }
        }

        fetchFavorites();

    }, []);

    const updateFavorites = async (id: number) => {
        const newFavorites = favorites.includes(id) ? favorites.filter(item => item !== id) : [...favorites, id];
        console.log(newFavorites, favorites);

        setFavorites(newFavorites);
        await setItem(JSON.stringify(newFavorites));
    }

    // remove hymns with 0 as id - They are extra hymns
    const hymns = allHymns.filter(hymn => hymn.id.toString() !== "0");

    return (
        <HymnContext.Provider value={{ 
            hymns, 
            selectedHymn: hymn, 
            setHymn, 
            category, 
            setCategory,
            favorites,
            //@ts-ignore
            toggleFavorites: updateFavorites
        }}
        >
        {children}
    </HymnContext.Provider>
    )
}

export const useHymns = () => {
    return useContext(HymnContext);
}

export default HymnProvider;