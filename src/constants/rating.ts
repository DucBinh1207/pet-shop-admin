export const Rating = {
  ALL: 6,
  ONE: 1,
  TW0: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export const RatingLabel = {
  [Rating.ONE]: "1 sao",
  [Rating.TW0]: "2 sao",
  [Rating.THREE]: "3 sao",
  [Rating.FOUR]: "4 sao",
  [Rating.FIVE]: "5 sao",
  [Rating.ALL]: "Tất cả các sao",
};

export type RatingType = (typeof Rating)[keyof typeof Rating];
