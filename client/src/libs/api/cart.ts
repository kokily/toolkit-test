import { createAsyncThunk } from '@reduxjs/toolkit';
import client from './client';

type CartPayload = {
  item_id: string;
  count: number;
  price: number;
};

export const addCart = createAsyncThunk(
  'cart/addCart',
  async (data: CartPayload, { rejectWithValue }) => {
    try {
      const response = await client.post<CartType>('/cart', data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
