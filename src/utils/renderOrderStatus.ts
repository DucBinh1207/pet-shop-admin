export function RenderOrderStatus(status: number) {
  if (status === 0) {
    return "Đã bị hủy";
  } else if (status === 1) {
    return "Đã giao thành công";
  } else if (status === 2) {
    return "Đang được giao tới bạn";
  } else if (status === 3) {
    return "Đang được vận chuyển";
  } else if (status === 4) {
    return "Đang được chuẩn bị";
  } else if (status === 5) {
    return "Đã được đặt";
  } else {
    return "Đang chờ xác nhận";
  }
}
