import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, login, logout, me, register } from '../api/auth';

export type AuthState = {
  auth: AuthResponse | null;
  authError: Error | null;
  loginLoading: boolean;
  loginSuccess: boolean;
  loginError: string | null;
  meLoading: boolean;
  meSuccess: boolean;
  meError: string | null;
  logoutLoading: boolean;
  logoutSuccess: boolean;
  logoutError: string | null;
  registerLoading: boolean;
  registerSuccess: boolean;
  registerError: string | null;
};

export type RequestPayload = {
  username: string;
  password: string;
};

export type AuthPayload = {
  id: string;
  username: string;
  admin: boolean;
};

const initialState: AuthState = {
  auth: null,
  authError: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
  meLoading: false,
  meSuccess: false,
  meError: null,
  logoutLoading: false,
  logoutSuccess: false,
  logoutError: null,
  registerLoading: false,
  registerSuccess: false,
  registerError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state: AuthState) => {
        state.loginLoading = true;
        state.loginSuccess = false;
        state.loginError = null;
      })
      .addCase(
        login.fulfilled,
        (state: AuthState, action: PayloadAction<AuthPayload>) => {
          state.loginLoading = false;
          state.auth = action.payload;
          state.loginSuccess = true;
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
        state.meSuccess = false;
        state.meError = null;
      })
      .addCase(
        me.fulfilled,
        (state: AuthState, action: PayloadAction<AuthPayload>) => {
          state.meLoading = false;
          state.auth = action.payload;
          state.meSuccess = true;
        }
      )
      .addCase(me.rejected, (state: AuthState, action: PayloadAction<any>) => {
        state.meLoading = false;
        state.authError = action.payload;
      })
      .addCase(logout.pending, (state: AuthState) => {
        state.logoutLoading = true;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state: AuthState) => {
        state.logoutLoading = false;
        state.auth = null;
        state.logoutSuccess = true;
      })
      .addCase(
        logout.rejected,
        (state: AuthState, action: PayloadAction<any>) => {
          state.logoutLoading = false;
          state.logoutError = action.payload;
        }
      )
      .addCase(register.pending, (state: AuthState) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(
        register.fulfilled,
        (state: AuthState, action: PayloadAction<AuthPayload>) => {
          state.registerLoading = false;
          state.auth = action.payload;
          state.registerSuccess = true;
        }
      )
      .addCase(
        register.rejected,
        (state: AuthState, action: PayloadAction<any>) => {
          state.registerLoading = false;
          state.registerError = action.payload;
        }
      ),
});

const { reducer } = authSlice;

export default reducer;
