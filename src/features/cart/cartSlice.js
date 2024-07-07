import { createSlice } from "@reduxjs/toolkit";
import data from "../../data";
const initialState = {
  cartItems: [],
  cartNumbers: { subtotal: 0, shipping: 0, tax: 0, total: 0 },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let { payload: item } = action;
      state.cartItems.push({ ...item, quantity: 1 });
    },
    removeFromCart: (state, action) => {
      let { payload: item } = action;
      let index = state.cartItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      state.cartItems.splice(index, 1);
    },
    setQuantity: (state, action) => {
      let { item, qty } = action.payload;
      state.cartItems = state.cartItems.map((cartItem) => {
        return cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + qty }
          : cartItem;
      });
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.quantity > 0
      );
    },
    setCartNumbers: (state) => {
      let subtotal = 0,
        shipping = 0,
        tax = 0,
        total = 0;
      for (let item of state.cartItems) {
        subtotal += item.price * item.quantity;
        shipping += 40 * item.quantity;
      }
      tax = (subtotal * 18) / 100;
      total = subtotal + shipping + tax;
      state.cartNumbers = { subtotal, shipping, tax, total };
    },
  },
});

export const { addToCart, removeFromCart, setQuantity, setCartNumbers } =
  cartSlice.actions;
export default cartSlice.reducer;
