import { createAsyncThunk } from '@reduxjs/toolkit';
import client from './client';

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
      const response = await client.post<AuthResponse>('/auth/login', data);

      localStorage.setItem('paysys_user', JSON.stringify(response.data));

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const me = createAsyncThunk('auth/me', async () => {
  const response = await client.get<AuthResponse>('/auth/me');

  return response.data;
});

export const register = createAsyncThunk(
  'auth/register',
  async (data: AuthPayload, { rejectWithValue }) => {
    try {
      const response = await client.post<AuthResponse>('/auth/register', data);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  const response = await client.post('/auth/logout');

  localStorage.removeItem('paysys_user');

  return response.data;
});
