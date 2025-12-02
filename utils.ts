import { HymnType } from "./typings";

export const searchFilterCallback = (hymn: HymnType, searchTerm: string) => {
    const lowerCaseTerm = searchTerm.toLowerCase();

    return hymn.id.toString().includes(lowerCaseTerm) || hymn.title.toLowerCase().includes(lowerCaseTerm) || hymn.content.toLowerCase().includes(lowerCaseTerm);
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