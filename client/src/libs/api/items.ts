import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';
import client from './client';

type ItemPayload = {
  cursor?: string;
  name?: string;
  divide?: string;
  native?: string;
};

export const listItems = createAsyncThunk(
  'items/listItems',
  async (data: ItemPayload, { rejectWithValue }) => {
    try {
      const queryString = qs.stringify({
        cursor: data.cursor,
        name: data.name,
        divide: data.divide,
        native: data.native,
      });

      const response = await client.get(`/items?${queryString}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
