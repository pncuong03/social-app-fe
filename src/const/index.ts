export const LANGUAGES = {
  VIETNAMESE: "vi",
  ENGLISH: "en",
};

export function getName(fullName: string) {
  const nameParts = fullName.split(" ");

  return nameParts[nameParts.length - 1];
}

export function truncateString(text: string): string {
  const words = text?.split(" ");

  if (words.length > 5) {
    return words.slice(0, 5).join(" ") + "...";
  }

  return text;
}
