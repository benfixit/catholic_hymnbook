import { HymnType } from "./typings";

export const searchFilterCallback = (hymn: HymnType, searchTerm: string) => {
    const lowerCaseTerm = searchTerm.toLowerCase();

    return hymn.id.toString().includes(lowerCaseTerm) || hymn.title.toLowerCase().includes(lowerCaseTerm) || hymn.content.toLowerCase().includes(lowerCaseTerm);
}