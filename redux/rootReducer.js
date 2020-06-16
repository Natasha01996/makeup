import { ADD, REMOVE, RESET } from './actionType';
const initialState = {
  counter: 0,
  price: 0,
  item: [],
};
let id = 0;
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return {
        counter: state.counter + 1,
        price: state.price + parseFloat(action.price),
        item: [
          ...state.item,
          {
            id: ++id,
            name: action.name,
            brand: action.brand,
            image_link: action.image_link,
            price: action.price,
            product_colors: action.product_colors,
            description: action.description,
          },
        ],
      };
    case REMOVE:
      return {
        item: state.item.filter((item) => item.id !== action.payload),
        price: state.price - parseFloat(action.price),
      };
    case RESET:
      return initialState;
  }
  return state;
}
