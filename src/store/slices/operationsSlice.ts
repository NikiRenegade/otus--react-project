import { Operation, operations as initialOperations } from '../../entities/Operation';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const operationsSlice = createSlice({
  name: 'operations',
  initialState: initialOperations,
  reducers: {
    addOperation(state, action: PayloadAction<Operation>) {
      state.push(action.payload);
    },
    deleteOperation(state, action: PayloadAction<string>) {
      return state.filter((op) => op.id !== action.payload);
    },
    updateOperation(state, action: PayloadAction<Operation>) {
      state[state.findIndex((op) => op.id === action.payload.id)] = action.payload;
    },
  },
});

export const { addOperation, deleteOperation, updateOperation } = operationsSlice.actions;
export default operationsSlice.reducer;
