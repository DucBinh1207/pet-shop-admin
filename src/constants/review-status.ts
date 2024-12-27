export const ReviewStatus = {
  ALL: 3,
  VIEWED: 1,
  NOT_VIEWED: 2,
  DELETED: 0,
};

export type ReviewStatusType = (typeof ReviewStatus)[keyof typeof ReviewStatus];

export const ReviewStatusLabel = {
  [ReviewStatus.DELETED]: "Đã xóa",
  [ReviewStatus.VIEWED]: "Đã xem",
  [ReviewStatus.NOT_VIEWED]: "Chưa xem",
  [ReviewStatus.ALL]: "Tất cả trạng thái",
};
