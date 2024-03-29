export function removeDuplicates(arr: string[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

export const capitalizeFirstLetter = (text: string) => {
  return text?.charAt(0)?.toUpperCase() + text?.slice(1);
};
