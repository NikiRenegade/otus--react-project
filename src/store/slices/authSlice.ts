import { User, users } from '../../entities/User';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  authenticated: boolean;
  user: User | null;
}

const tokenFromLocalStorage = localStorage.getItem('token');

const initionalState: AuthState = {
  token: tokenFromLocalStorage,
  user: tokenFromLocalStorage ? users[0] : null,
  authenticated: !!tokenFromLocalStorage,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initionalState,
  reducers: {
    login(state: AuthState, action: PayloadAction<{ email: string; password: string }>) {
      state.authenticated = action.payload.email === users[0].email && action.payload.password == users[0].password;
      if (state.authenticated) {
        state.token = 'tokentoken';
        state.user = users[0];
        localStorage.setItem('token', state.token);
      }
    },
    logout(state: AuthState) {
      state.authenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
