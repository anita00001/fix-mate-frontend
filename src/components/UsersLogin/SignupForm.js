import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { signupDetails } from '../../redux/signup/signupSlice';
import SignUp from '../../assets/signup.jpeg';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setSignupError(true);
      return;
    }
    setSignupError(false);
    setIsLoading(true);

    if (password === confirmPassword) {
      setPasswordMatch(true);
      dispatch(signupDetails({ name, email, password }));
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSignupSuccess(true);
      setIsLoading(true);
      setTimeout(() => {
        navigate('/login');
      }, 5000);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${SignUp})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition:
          windowWidth >= 640 ? 'center' : 'center',
      }}
    >
      <motion.div
        className="flex h-screen items-center justify-center bg-gradient-to-r"
        initial={{ opacity: 0, y: 2 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
      >
        <motion.div
          className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          transition={{
            type: 'tween',
            ease: 'anticipate',
            duration: 2,
          }}
        >
          <h2 className="mb-5 text-center text-2xl font-bold">
            User Registration
          </h2>
          <form onSubmit={handleSubmit}>
            {signupError && (
              <p className="mb-3 bg-red-50 p-2 text-red-700">
                Passwords cannot be less than six(6) characters.
              </p>
            )}
            {!passwordMatch && (
              <p className="mb-3 bg-red-50 p-2 text-red-700">
                Passwords do not match.
              </p>
            )}
            {signupSuccess && (
              <p className="mb-3 bg-green-100 p-2 text-green-500">
                Signup successful! You can login now
              </p>
            )}
            <div className="mb-4">
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-md border px-3 py-2"
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
                className="w-full rounded-md border px-3 py-2"
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
                className="w-full rounded-md border px-3 py-2"
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
                className="w-full rounded-md border px-3 py-2"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:bg-blue-700 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </motion.button>
            <p className="mt-3 text-sm font-light text-gray-500">
              Have an account already?
              <Link to="/login" className="font-bold hover:text-primary">
                {' '}
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupForm;
