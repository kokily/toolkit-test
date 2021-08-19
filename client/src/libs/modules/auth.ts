import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponse, login } from '../api/auth';

export type AuthState = {
  me: AuthResponse | null;
  loginLoading: boolean;
  loginSuccess: boolean;
  loginError: string | null;
};

const initialState: AuthState = {
  me: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: null,
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
          state.me = action.payload;
        }
      )
      .addCase(
        login.rejected,
        (state: AuthState, action: PayloadAction<any>) => {
          state.loginLoading = false;
          state.loginError = action.payload;
        }
      ),
});

export const { reducer } = authSlice;

export default reducer;
