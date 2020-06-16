import { ADD, REMOVE, RESET } from './actionType';

export const add = (item) => ({
  type: ADD,
  name: item.name,
  brand: item.brand,
  image_link: item.image_link,
  price: item.price,
  product_colors: item.product_colors,
  description: item.description,
});
export const remove = (id, item) => ({
  type: REMOVE,
  payload: id,
  price: item.price,
});
export const reset = () => ({ type: RESET });
