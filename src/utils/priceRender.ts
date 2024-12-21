export function priceRender(price: number) {
  const priceData: string[] = [];
  let dot = 0;
  const priceString = price.toString();
  for (let i = priceString.length - 1; i >= 0; i--) {
    if (dot === 3) {
      priceData.unshift(".");
      priceData.unshift(priceString[i]);
      dot = 1;
    } else {
      priceData.unshift(priceString[i]);
      dot += 1;
    }
  }

  return priceData.join("");
}
