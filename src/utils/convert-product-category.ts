export function ConvertProductCategory(category: string) {
  if (category === "pets") {
    return "Thú cưng";
  } else if (category === "foods") return "Thức ăn";
  else return "Đồ dùng khác";
}
