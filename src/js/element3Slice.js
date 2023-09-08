import { createSlice } from '@reduxjs/toolkit';

const element3Slice = createSlice({
  name: 'mapa',
  initialState: true, // Initially visible
  reducers: {
    toggleElement3: (state) => !state,
  },
});

export const { toggleElement3 } = element3Slice.actions;

export default element3Slice.reducer;