import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Experts from './components/Experts';
import CreateExpert from './components/CreateExpert';
import Reservations from './components/Reservations';
import SignupForm from './components/SignupForm';
import LoginForm from './components/loginForm';
import Authenticate from './components/Authenticate';
import DeleteExpert from './components/DeleteExpert';
import ExpertDetails from './components/ExpertDetails';

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

function App() {
  return (
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
      </Routes>
    </>
  );
}

export default App;

CheckAuthentication.propTypes = {
  element: PropTypes.node.isRequired,
};
