import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signup/signupSlice';

const store = configureStore({
  reducer: {
    signup: signupSlice,
  },
});

export default store;
