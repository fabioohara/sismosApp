import { createSlice } from '@reduxjs/toolkit';

const element2Slice = createSlice({
  name: 'map',
  initialState: true, // Initially visible
  reducers: {
    toggleElement2: (state) => !state,
  },
});

export const { toggleElement2 } = element2Slice.actions;

export default element2Slice.reducer;