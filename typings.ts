export type HymnType = {
    id: number,
    slug: string,
    title: string,
    content: string
}

export type CategoryType = {
    id: number,
    slug: Category,
    title: string,
    hymns: Array<HymnType["id"]>
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
    EASTER = "easter",
    PENTECOST = "pentecost",
    LATIN = "latin",
    FUNERAL = "funeral",
    MASS_DEAD = "funeral",
    ORDINATION = "ordination",
    PRIESTHOOD = "priesthood",
    OUR_LORD = "our lord",
    BVM = "blessed virgin mary",
    GENERAL = "general",
    BENEDICTION = "benediction",
    RECOLLECTION = "recollection",
    THANKSGIVING = "thanksgiving",
    PSALMS = "psalms"
}

export type ThemeType = "light" | "dark";

export type OrientationType = "PORTRAIT" | "LANDSCAPE";

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;