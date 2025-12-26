import { CategoryType, HymnType } from "./typings";

export const searchFilterCallback = (hymn: HymnType, searchTerm: string) => {
    if (isStringNumeric(searchTerm)) {
      return hymn.id.toString().includes(searchTerm);
    }

    const lowerCaseTerm = searchTerm.toLowerCase();

    return hymn.title.toLowerCase().includes(lowerCaseTerm) || 
            hymn.content.toLowerCase().includes(lowerCaseTerm) ||
            splitSearch(hymn, searchTerm);
}

const splitSearch = (hymn: HymnType, searchTerm: string) => {
  const terms = searchTerm.split(" ");

  return terms.every(term => hymn.content.includes(term));
}

export const truncateString = (str: string, maxLength: number) => {
  const ending = '...';
  // Check if the string is already shorter than or equal to the max length
  if (str.length <= maxLength) {
    return str;
  }

  // Calculate the length for the slice, ensuring the ending fits within maxLength
  const truncatedLength = maxLength - ending.length;

  // Use slice() to get the truncated part and append the ellipsis
  // The result will have a total length of exactly maxLength
  return str.slice(0, truncatedLength) + ending;
}

export const formatRomcalId = (id: string) => {
  return id.split('_').map(word => {
    // Handle small words that shouldn't be capitalized unless first
    const smallWords = ['of', 'the', 'and', 'in', 'a', 'to'];
    if (smallWords.includes(word.toLowerCase())) {
      return word.toLowerCase();
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
    
  }).join(' ').replace(/^\w/, c => c.toUpperCase()); // Ensure first letter is always caps
}

export const formatRomcalColors = (colors: string[]): string => {
  if (colors.includes("PURPLE")) {
    return "purple";
  }

  const item = (colors.at(0) as string).toLowerCase();

  if (item === "white") {
    return "gold";
  }

  return item;
}

export const formatRomcalSeasons = (seasons: string[]): string => {
  if (seasons.includes("EASTER_TIME")) {
    return "EASTER_TIME";
  }

  return (seasons.at(0) as string);
}

//@ts-ignore
export const isStringNumeric = (str) => {
  // Global isFinite performs type coercion, unlike the static Number.isFinite
  return isFinite(str) && !isNaN(parseFloat(str));
}

export const fetchHymnCategories = (categories: CategoryType[], hymn: HymnType): CategoryType[] => {
  return categories.filter(category => category.hymns.includes(hymn.id)).map(item => item);
}