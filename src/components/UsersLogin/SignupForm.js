import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signupDetails } from '../../redux/signup/signupSlice';

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div className="bg-lime-100">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="font-bold text-gray-500 text-2xl mb-4">User Registration</h1>
            <form onSubmit={handleSubmit}>
              {signupError && <p className="text-red-700 bg-red-50 p-2 mb-3">Passwords cannot be less than six(6) characters.</p>}
              {!passwordMatch && <p className="text-red-700 bg-red-50 p-2 mb-3">Passwords do not match.</p>}
              {signupSuccess && (
                <p className="text-green-500 bg-green-100 p-2 mb-3">Signup successful! You can now</p>
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
              <button type="submit" className="w-full bg-lime-300 hover:bg-lime-600 text-white rounded-md py-2">
                Register
              </button>
              <p className="text-sm font-light text-gray-500 mt-3">
                Have an account already?
                <Link to="/login" className="font-bold hover:text-lime-600"> Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
