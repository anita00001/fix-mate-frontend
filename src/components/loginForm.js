import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-4 bg-white shadow-lg rounded-lg w-full">
        <h1 className="font-bold text-gray-500 text-2xl mb-4">Login</h1>
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
              placeholder="Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white rounded-md py-2">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
