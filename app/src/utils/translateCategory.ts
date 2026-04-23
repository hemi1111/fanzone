import type { TFunction } from "i18next";

export const translateCategory = (t: TFunction, category: string): string => {
  const key = `categoryMap.${category}`;
  const translated = t(key, { defaultValue: "" });
  return translated || category;
};
