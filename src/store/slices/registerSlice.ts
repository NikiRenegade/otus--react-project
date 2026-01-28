import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface RegisterState {
  error: string | null;
}

const initialState: RegisterState = { error: null };

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    signupRequest(state, action: PayloadAction<{ email: string; password: string; commandId: string }>) {
      state.error = null;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { signupRequest, signupFailure } = registerSlice.actions;
export default registerSlice.reducer;
