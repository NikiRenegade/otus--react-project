import { createSlice } from '@reduxjs/toolkit';
interface AppState {
  initialized: boolean;
}

const initionalState: AppState = {
  initialized: false,
};

const appSlica = createSlice({
  name: 'app',
  initialState: initionalState,
  reducers: {
    setInitialized(state: AppState) {
      state.initialized = true;
    },
  },
});

export const { setInitialized } = appSlica.actions;
export default appSlica.reducer;
