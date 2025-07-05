import { ICartObj } from "@/services/cart/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  carts: ICartObj[] | null;
}

const initialState: CartState = {
  carts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts(state, action: PayloadAction<ICartObj[]>) {
      state.carts = action.payload;
    },
    clearCarts(state) {
      state.carts = [];
    },
  },
});

export const { setCarts, clearCarts } = cartSlice.actions;
export default cartSlice.reducer;
