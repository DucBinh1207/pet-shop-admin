export const PetGender = {
  MALE: 1,
  FEMALE: 2,
} as const;

export const PetGenderLabel = {
  [PetGender.MALE]: "Đực",
  [PetGender.FEMALE]: "Cái",
};

export type PetGenderTypes = (typeof PetGender)[keyof typeof PetGender];
