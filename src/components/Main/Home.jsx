import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Experts from '../Experts/Experts&Details/Expert';
import CreateExpert from '../Experts/CreateExpert/CreateExpert';
import Reservations from '../Reservations/Reservations';
import SignupForm from '../UsersLogin/SignupForm';
import LoginForm from '../UsersLogin/loginForm';
import Authenticate from '../UsersLogin/Authenticate';
import DeleteExpert from '../Experts/DeleteExpert/DeleteExpert';
import ExpertDetails from '../Experts/Experts&Details/ExpertDetails';
import Specialize from '../Specializations/Specialize';

const isUserLoggedIn = () => {
  const userPassport = localStorage.getItem('userPassport');
  return !!userPassport;
};

const CheckAuthentication = ({ element }) => {
  if (isUserLoggedIn()) {
    return element;
  }
  return <Navigate to="/authenticate" />;
};

const Home = () => (
  <>
    <Routes>
      <Route path="/authenticate" element={<Authenticate />} />
      <Route path="*" element={<Authenticate />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={<CheckAuthentication element={<Experts />} />}
      />
      <Route
        path="/reservations"
        element={<CheckAuthentication element={<Reservations />} />}
      />
      <Route
        path="/experts"
        element={<CheckAuthentication element={<CreateExpert />} />}
      />
      <Route
        path="/experts/:id"
        element={<CheckAuthentication element={<ExpertDetails />} />}
      />
      <Route
        path="/delete"
        element={<CheckAuthentication element={<DeleteExpert />} />}
      />
      <Route
        path="/specializations"
        element={<CheckAuthentication element={<Specialize />} />}
      />
    </Routes>
  </>
);

export default Home;

CheckAuthentication.propTypes = {
  element: PropTypes.node.isRequired,
};
