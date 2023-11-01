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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div>
      <h1 className="font-bold text-slate-900">User Registration</h1>
      <form onSubmit={handleSubmit}>
        {!passwordMatch && <p>Passwords do not match.</p>}
        {signupSuccess && (
          <p>
            Signup successful! You can now
            <Link to="/login"> proceed to the home page</Link>
          </p>
        )}
        <div>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            placeholder="Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;
