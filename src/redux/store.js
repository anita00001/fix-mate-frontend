import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import expertsSlice from './Experts/expertsSlice';
import reservationsSlice from './Reservations/reservationsSlice';
import signupSlice from './signup/signupSlice';
import loginSlice from './login/loginSlice';
import specialitiesSlice from './Specializations/specialitiesSlice';
import queryExpertsSlice from './QueryExperts/queryExpertsSlice';
import sendReservationSlice from './Reservations/sendReservationSlice';
import logoutSlice from './logout/logoutSlice';

const store = configureStore({
  reducer: {
    queryexperts: queryExpertsSlice,
    specialization: specialitiesSlice,
    signup: signupSlice,
    login: loginSlice,
    logout: logoutSlice,
    experts: expertsSlice,
    sendreservation: sendReservationSlice,
    reservations: reservationsSlice,
  },
  middleware: [thunk],
});

export default store;
