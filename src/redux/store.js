import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import expertsSlice from './experts/expertsSlice';

const store = configureStore({
  reducer: {
    experts: expertsSlice,
  },
  middleware: [thunk],
});

export default store;
