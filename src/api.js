export const fetchCosmetics = async () => {
  const url = `https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline`;
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (err) {
    return console.log(err);
  }
};
export const fetchCosmeticsType = async (type) => {
  const url = `https://makeup-api.herokuapp.com/api/v1/products.json?product_type=${type}`;
  try {
    const response = await fetch(url);
    const results = await response.json();
    return results;
  } catch (err) {
    return console.log(err);
  }
};
