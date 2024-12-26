export const BreedOrigin = {
  PUREBRED: 1,
  MIXED_BREED: 2,
} as const;

export const BreedOriginLabel = {
  [BreedOrigin.PUREBRED]: "Thuần chủng",
  [BreedOrigin.MIXED_BREED]: "Không thuần chủng",
};

export type BreedOriginType = (typeof BreedOrigin)[keyof typeof BreedOrigin];
