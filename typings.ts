import { LIGHT_THEME, DARK_THEME, AUTO_THEME } from "@/constants/theme";

export type HymnType = {
    id: number,
    slug: string,
    title: string,
    subtitle?: string,
    content: string,
    category: Category
}

export enum Category {
    ENTRANCE = 1,
    OFFERTORY,
    COMMUNION,
    RECESSIONAL,
    ADVENT
}

export type ThemeType = "light" | "dark"

export type Nullable<T> = HymnType | null;

export type Optional<T> = HymnType | undefined;