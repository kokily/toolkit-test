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

      localStorage.setItem('paysys_user', JSON.stringify(response.data));

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

export const register = createAsyncThunk(
  'auth/register',
  async (data: AuthPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post<AuthResponse>('/auth/register', data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await axios.post('/auth/logout');

  localStorage.removeItem('paysys_user');

  return response.data;
});
