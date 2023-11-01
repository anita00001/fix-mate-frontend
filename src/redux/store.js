import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './signup/signupSlice';
import loginSlice from './login/loginSlice';

const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
  },
});

export default store;
