import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loginDetails } from '../../redux/login/loginSlice';
import Login from '../../assets/login.jpeg';

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login.userData);
  const error = useSelector((state) => state.login.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(false);
    dispatch(loginDetails({ email, password }));
    setIsLoading(true);
    setEmail('');
    setPassword('');
  };

  useEffect(() => {
    if (loginData) {
      const authorizationToken = {
        token: sessionStorage.getItem('userPassport'),
        id: loginData.status.data.id,
        name: loginData.status.data.name,
      };
      sessionStorage.setItem('userPassport', JSON.stringify(authorizationToken));
      navigate('/');
    }
  }, [loginData, navigate]);

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-lime-100"
        style={{
          backgroundImage: `url(${Login})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition:
            windowWidth >= 640 ? 'center' : 'center',
        }}
      />
      <div className="relative mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
        <motion.div
          className="w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0"
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="mb-4 text-2xl font-bold text-gray-500">
              Login your account
            </h1>
            <form onSubmit={handleSubmit}>
              {error && (
                <p className="mb-3 bg-red-50 p-2 text-red-700">
                  Login failed. Kindly check your credentials
                </p>
              )}
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
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border px-3 py-2"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full rounded-md bg-lime-300 py-2 text-white hover:bg-lime-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? 'logging...' : 'Log in'}
              </motion.button>
              <p className="mt-3 text-sm font-light text-gray-500">
                Don’t have an account yet?
                <Link to="/signup" className="font-bold hover:text-primary">
                  {' '}
                  Register
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
