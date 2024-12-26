export const FoodsCategoryType = {
  ALL: "all",
  DRY: "dry",
  WET: "wet",
  RAW: "raw",
  FREEZE: "freeze",
} as const;

export type FoodsCategoryTypes =
  (typeof FoodsCategoryType)[keyof typeof FoodsCategoryType];
