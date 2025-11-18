import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  qty: number;
  sum: number;
  price: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    //  addItemToCart
    addItemsTocart: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      console.log('existingItem', existingItem);

      if (existingItem) {
        (existingItem.qty += 1), (existingItem.sum += action.payload.price);
      } else {
        state.items.push({
          ...action.payload,
          qty: 1,
          sum: action.payload.price,
        });
      }
    },
    // remove item from cart
    removeItemFromCart: (state, action) => {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );

      if (existingItem && existingItem.qty != 1) {
        existingItem.qty -= 1;
        existingItem.sum -= action.payload.price;
      } else {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      }
    },
    // removeProductFromCart
    removeProductFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },

    // emptyCart
    emptyCart: state => {
      state.items = [];
    },
  },
});

export const { addItemsTocart, removeItemFromCart, removeProductFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
