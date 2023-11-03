import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signupDetails } from '../redux/signup/signupSlice';

function SignupForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setSignupError(true);
      return;
    }
    setSignupError(false);

    if (password === confirmPassword) {
      setPasswordMatch(true);
      dispatch(signupDetails({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSignupSuccess(true);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-4 bg-white shadow-lg rounded-lg w-full">
        <h1 className="font-bold text-gray-500 text-2xl mb-4">User Registration</h1>
        <form onSubmit={handleSubmit}>
          {signupError && <p className="text-red-700 bg-red-50 p-2 mb-3">Passwords cannot be less than six(6) characters.</p>}
          {!passwordMatch && <p className="text-red-700 bg-red-50 p-2 mb-3">Passwords do not match.</p>}
          {signupSuccess && (
            <p className="text-green-500 bg-green-100 p-2 mb-3">
              Signup successful! You can now
              <Link to="/login" className="text-green-900"> proceed to the home page</Link>
            </p>
          )}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
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
          <div className="mb-4">
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button type="submit" className="w-full bg-purple-500 text-white rounded-md py-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
