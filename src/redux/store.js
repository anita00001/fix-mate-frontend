import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import expertsSlice from './Experts/expertsSlice';
import signupSlice from './signup/signupSlice';
import loginSlice from './login/loginSlice';

const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    experts: expertsSlice,
  },
  middleware: [thunk],
});

export default store;
