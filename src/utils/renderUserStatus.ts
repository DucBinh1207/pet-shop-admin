export function RenderUserStatus(status: number) {
  if (status === 0) {
    return "Đã bị khóa";
  } else {
    return "Hoạt động";
  }
}
