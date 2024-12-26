export const ColorType = {
  LIGHT: "Sáng",
  DARK: "Tối",
} as const;

export type ColorTypes = (typeof ColorType)[keyof typeof ColorType];

export const ColorMapping = {
  [ColorType.LIGHT]: "light",
  [ColorType.DARK]: "black",
};
