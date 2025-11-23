export type HymnType = {
    id: number,
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

export type Nullable<T> = HymnType | null;

export type Optional<T> = HymnType | undefined;