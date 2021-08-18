import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestPayload } from '../modules/auth';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api'
    : 'https://paysys.shop/api';
axios.defaults.withCredentials = true;

export type AuthResponse = {
  id: string;
  username: string;
  admin: boolean;
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: RequestPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/login', data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const me = createAsyncThunk('auth/me', async () => {
  const response = await axios.get('/auth/me');

  return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/auth/logout');

  return response.data;
});

export const register = createAsyncThunk(
  'auth/register',
  async (data: RequestPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post('/auth/register', data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
