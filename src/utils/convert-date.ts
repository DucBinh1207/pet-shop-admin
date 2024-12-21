export default function convertDate(dateString: string) {
  const date = new Date(dateString);

  const dayOfWeek = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
  }).format(date);

  const day = new Intl.DateTimeFormat("vi-VN", { day: "2-digit" }).format(date);

  const month = new Intl.DateTimeFormat("vi-VN", { month: "long" }).format(
    date,
  );

  const year = new Intl.DateTimeFormat("vi-VN", { year: "numeric" }).format(
    date,
  );

  // Đảm bảo giờ được tính đúng múi giờ Việt Nam (UTC+7)
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh", // Đảm bảo múi giờ đúng
  };

  const time = new Intl.DateTimeFormat("vi-VN", options).format(date);

  return `${dayOfWeek}, ngày ${day}, tháng ${month} năm ${year}, ${time}`;
}
