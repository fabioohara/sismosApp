import { configureStore } from '@reduxjs/toolkit';
import element1Reducer from './element1Slice';
import element2Reducer from './element2Slice';
import element3Reducer from './element3Slice';

const store = configureStore({
  reducer: {
    element1: element1Reducer,
    element2: element2Reducer,
    element3: element3Reducer
  },
});

export default store;