import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import ExpertsSlice from './Experts/ExpertsSlice';

const store = configureStore({
  reducer: {
    experts: ExpertsSlice,
  },
  middleware: [thunk],
});

export default store;
