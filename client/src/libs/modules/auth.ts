import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, login, me } from '../api/auth';

export type AuthState = {
  user: AuthResponse | null;
  loginLoading: boolean;
  loginSuccess: boolean;
  loginError: string | null;
  meLoading: boolean;
  meSuccess: boolean;
  meError: string | null;
};

const initialState: AuthState = {
  user: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  meLoading: false,
  meSuccess: false,
  meError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(
        login.fulfilled,
        (state: AuthState, action: PayloadAction<AuthResponse>) => {
          state.loginLoading = false;
          state.loginSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(
        login.rejected,
        (state: AuthState, action: PayloadAction<any>) => {
          state.loginLoading = false;
          state.loginError = action.payload;
        }
      )
      .addCase(me.pending, (state: AuthState) => {
        state.meLoading = true;
        state.meError = null;
      })
      .addCase(
        me.fulfilled,
        (state: AuthState, action: PayloadAction<AuthResponse>) => {
          state.meLoading = false;
          state.meSuccess = true;
          state.user = action.payload;
        }
      )
      .addCase(me.rejected, (state: AuthState, action: PayloadAction<any>) => {
        state.meLoading = false;
        state.meError = action.payload;
      }),
});

export const { reducer } = authSlice;

export default reducer;
