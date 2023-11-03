import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import expertsSlice from './Experts/expertsSlice';
import reservationsSlice from './Reservations/reservationsSlice';
import signupSlice from './signup/signupSlice';
import loginSlice from './login/loginSlice';

const store = configureStore({
  reducer: {
    signup: signupSlice,
    login: loginSlice,
    experts: expertsSlice,
    reservations: reservationsSlice,
  },
  middleware: [thunk],
});

export default store;
