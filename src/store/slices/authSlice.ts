import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  authenticated: boolean;
}

const tokenFromLocalStorage = localStorage.getItem('token');
const initiationState: AuthState = {
  token: tokenFromLocalStorage,
  authenticated: !!tokenFromLocalStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initiationState,
  reducers: {
    login(state: AuthState, action: PayloadAction<{ token: string }>) {
      state.authenticated = true;
      state.token = action.payload.token;
      localStorage.setItem('token', state.token);
    },
    logout(state: AuthState) {
      localStorage.removeItem('token');
      state.authenticated = false;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
