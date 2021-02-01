export function checkProperties(itemsArray) {
  return itemsArray.every((item) => item.name && item.price && item.quantity);
}
