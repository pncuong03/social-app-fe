export const LANGUAGES = {
  VIETNAMESE: "vi",
  ENGLISH: "en",
};

export const getName = (fullName: string) => {
  const nameParts = fullName.split(" ");

  return nameParts[nameParts.length - 1];
};
