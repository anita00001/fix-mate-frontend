import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Experts from './components/Experts';
import SignupForm from './components/SignupForm';
import LoginForm from './components/loginForm';

const isUserLoggedIn = () => {
  const userPassport = localStorage.getItem('userPassport');
  return !!userPassport;
};

const CheckAuthentication = ({ element }) => {
  if (isUserLoggedIn()) {
    return element;
  }
  return <Navigate to="/login" />;
};

function App() {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/"
          element={<CheckAuthentication element={<Experts />} />}
        />
      </Routes>
    </div>
  );
}

export default App;

CheckAuthentication.propTypes = {
  element: PropTypes.node.isRequired,
};
