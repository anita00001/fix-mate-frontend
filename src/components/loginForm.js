import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginDetails } from '../redux/login/loginSlice';

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login.userData);
  const error = useSelector((state) => state.login.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginDetails({ email, password }));
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (loginData) {
      navigate('/');
    }
  }, [loginData, navigate]);

  return (
    <div className="bg-lime-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="font-bold text-gray-500 text-2xl mb-4">Login your account</h1>
            <form onSubmit={handleSubmit}>
              {error && <p className="text-red-700 bg-red-50 p-2 mb-3">Login failed. Kindly check your credentials</p>}
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <button type="submit" className="w-full bg-lime-300 text-white hover:bg-lime-600 rounded-md py-2">
                Login
              </button>
              <p className="text-sm font-light text-gray-500 mt-3">
                Don’t have an account yet?
                <Link to="/signup" className="font-bold hover:text-lime-600"> Register</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
