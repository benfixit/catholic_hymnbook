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

// // --- LITURGICAL ENGINE LOGIC ---
// // In a production app, you might use a library like 'romcal', 
// // but for a lightweight mobile app, we can use logic to determine the season.
// const getLiturgicalState = (date = new Date()) => {
//   const year = date.getFullYear();
//   const month = date.getMonth(); // 0-indexed
//   const day = date.getDate();

//   // Helper: Get Easter Sunday (Meeus/Jones/Butcher algorithm)
//   const getEaster = (y) => {
//     const a = y % 19, b = Math.floor(y / 100), c = y % 100;
//     const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
//     const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
//     const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
//     const m = Math.floor((a + 11 * h + 22 * l) / 451);
//     const n = Math.floor((h + l - 7 * m + 114) / 31), p = (h + l - 7 * m + 114) % 31;
//     return new Date(y, n - 1, p + 1);
//   };

//   const easter = getEaster(year);
//   const ashWednesday = new Date(easter);
//   ashWednesday.setDate(easter.getDate() - 46);
  
//   const pentecost = new Date(easter);
//   pentecost.setDate(easter.getDate() + 49);

//   const christmas = new Date(year, 11, 25);
//   const adventStart = new Date(year, 11, 25);
//   adventStart.setDate(25 - (christmas.getDay() || 7) - 21); // 4th Sunday before Christmas

//   // Logic to determine season
//   if (date >= adventStart && date < christmas) return { name: "Advent", color: "bg-purple-700", text: "text-white", tag: "Advent" };
//   if (date >= christmas || month === 0 && day <= 10) return { name: "Christmas Season", color: "bg-yellow-500", text: "text-black", tag: "Christmas" };
//   if (date >= ashWednesday && date < easter) return { name: "Lent", color: "bg-purple-800", text: "text-white", tag: "Lenten" };
//   if (date >= easter && date < pentecost) return { name: "Easter Season", color: "bg-white", text: "text-amber-600", tag: "Easter" };
  
//   return { name: "Ordinary Time", color: "bg-green-700", text: "text-white", tag: "General" };
// };
