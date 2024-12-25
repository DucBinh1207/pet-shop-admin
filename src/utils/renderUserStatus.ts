export function RenderUserStatus(status: number) {
  if (status === 2) {
    return "Đã bị khóa";
  } else {
    return "Hoạt động";
  }
}
