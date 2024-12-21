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

  return `${dayOfWeek}, ngày ${day},  ${month} năm ${year}`;
}
