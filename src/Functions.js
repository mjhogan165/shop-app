export function filterByCategory(arr, string) {
  let newArr = [];
  for (let obj of arr) {
    for (let property of obj.categories) {
      if (property.slug === string) {
        newArr.push(obj);
      }
    }
  }
  return newArr;
}

export function filterById(arr, id) {
  for (const elm of arr) {
    if (elm.id === id) {
      return elm;
    }
  }
}
export const checkStringForNum = (e) => {
  const string = e;
  let hasNum = false;
  if (string.length) {
    for (let i = 0; i < string.length; i++) {
      if (!isNaN(string.charAt(i)) && !(string.charAt(i) === " ")) {
        hasNum = true;
      }
    }
  }
  return hasNum;
};
export function sortArrayBy(arr, typeStr) {
  switch (typeStr) {
    case "titleAZ":
      console.log('called titleAZ')
      return arr.sort((a, b) => (a.name < b.name ? -1 : 1));
    case "titleZA":
      console.log('called titleZA')
      return arr.sort((a, b) => (a.name > b.name ? -1 : 1));
    case "priceHighLow":
      console.log('called priceHighLow')
      return arr.sort((a, b) => parseInt(b.price.raw) - parseInt(a.price.raw));
    case "priceLowHigh":
      console.log('called priceLowHigh')
      return arr.sort((a, b) => parseInt(a.price.raw) - parseInt(b.price.raw));
    default:
  }
}

export function removeCommas(string){
  return string.split(',').join("")
}
