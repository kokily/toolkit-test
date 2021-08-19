import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api'
    : 'https://paysys.kr/api';
axios.defaults.withCredentials = true;

export type AuthPayload = {
  username: string;
  password: string;
};

export type AuthResponse = {
  id: string;
  username: string;
  admin: boolean;
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: AuthPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>('/auth/login', data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const me = createAsyncThunk('auth/me', async () => {
  const response = await axios.get<AuthResponse>('/auth/me');

  return response.data;
});
