import { createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';
import client from './client';

type ItemsPayload = {
  cursor?: string;
  name?: string;
  divide?: string;
  native?: string;
};

export const listItems = createAsyncThunk(
  'items/listItems',
  async (data: ItemsPayload, { rejectWithValue }) => {
    try {
      const queryString = qs.stringify({
        cursor: data.cursor,
        name: data.name,
        divide: data.divide,
        native: data.native,
      });

      const response = await client.get<ItemType[]>(`/items?${queryString}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

type ItemPayload = {
  id: string;
};

export const readItem = createAsyncThunk(
  'items/readItem',
  async (data: ItemPayload, { rejectWithValue }) => {
    try {
      const response = await client.get<ItemType>(`/items/${data.id}`);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
