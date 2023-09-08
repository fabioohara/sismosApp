// elementSlice.js
import { createSlice } from '@reduxjs/toolkit';

const element1Slice = createSlice({
  name: 'sideBar',
  initialState: true, // Initially visible
  reducers: {
    toggleElement1: (state) => !state,
  },
});

export const { toggleElement1 } = element1Slice.actions;

export default element1Slice.reducer;
