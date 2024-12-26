export const PetsCategoryType = {
  DOG: "Chó",
  CAT: "Mèo",
} as const;

export type PetsCategoryTypes =
  (typeof PetsCategoryType)[keyof typeof PetsCategoryType];
