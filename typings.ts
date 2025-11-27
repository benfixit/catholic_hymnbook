export type HymnType = {
    id: number,
    slug: string,
    title: string,
    content: string,
    category: Category
}

export type CategoryType = {
    id: number,
    slug: Category,
    title: string,
    hymns: Set<HymnType["id"]>
}

export type ColorsType = Record<string, string>

export enum Category {
    ENTRANCE = "entrance",
    OFFERTORY = "offertory",
    COMMUNION = "communion",
    RECESSIONAL = "recessional",
    ADVENT = "advent",
    CHRISTMAS = "christmas",
    LENT = "lent",
    EASTER = "easter_pentecost",
    LATIN = "latin",
    FUNERAL = "funeral",
    MASS_DEAD = "mass_dead",
    ORDINATION = "ordination_priesthood",
    OUR_LORD = "our_lord",
    BVM = "blessed_virgin_mary",
    GENERAL = "general",
    BENEDICTION = "benediction",
    RECOLLECTION = "recollection",
    THANKSGIVING = "thanksgiving",
    PSALMS = "psalms"
}

export type ThemeType = "light" | "dark"

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;