import { Routes, Route, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SignupForm from './components/SignupForm';
import LoginForm from './components/loginForm';
import Home from './components/Home';

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
        <Route
          path="/"
          element={<CheckAuthentication element={<Home />} />}
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}

export default App;

CheckAuthentication.propTypes = {
  element: PropTypes.node.isRequired,
};
