import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addCart } from '../api/cart';

type CartState = {
  cart: CartType | null;
  addCartLoading: boolean;
  addCartSuccess: boolean;
  addCartError: string | null;
};

const initialState: CartState = {
  cart: null,
  addCartLoading: false,
  addCartSuccess: false,
  addCartError: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(addCart.pending, (state: CartState) => {
        state.addCartLoading = true;
        state.addCartError = null;
      })
      .addCase(
        addCart.fulfilled,
        (state: CartState, action: PayloadAction<CartType>) => {
          state.addCartLoading = false;
          state.addCartSuccess = true;
          state.cart = action.payload;
        }
      )
      .addCase(
        addCart.rejected,
        (state: CartState, action: PayloadAction<any>) => {
          state.addCartLoading = false;
          state.addCartError = action.payload;
        }
      ),
});

export const { reducer } = cartSlice;

export default reducer;
