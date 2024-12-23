export function renderProductType(productType: string) {
  if (productType === "pets") {
    return "Thú cưng";
  } else if (productType === "foods") {
    return "Thức ăn";
  } else if (productType === "supplies") {
    return "Đồ dùng khác";
  }
}
