export const SizeType = {
  SMALL: "Nhỏ",
  MEDIUM: "Vừa",
  BIG: "Lớn",
} as const;

export type SizeTypes = (typeof SizeType)[keyof typeof SizeType];
