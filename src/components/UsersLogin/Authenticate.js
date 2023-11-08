import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';

const Authenticate = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 2 }}
    >
      <div className="backgroundImage flex h-screen flex-col items-center justify-center bg-cover bg-center">
        <div className="mt-96 rounded-2xl bg-black bg-opacity-50 p-4 text-center shadow-lg">
          <div className="mb-2 text-3xl font-bold text-white">
            Welcome to FIX-MATE
          </div>
          <p className="text-lg text-white">
            <span className="font-bold text-green-500">Fix-Mate</span>
            {' '}
            - Your
            one-stop platform for trusted services. Connect, discuss, book, and
            review - all from the comfort of your home.
          </p>
          <div className="mt-4 flex justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="mr-2 rounded-full border-2 border-blue-500 bg-white px-4 py-2 font-bold text-blue-500 transition duration-200 hover:bg-blue-500 hover:bg-transparent hover:text-white"
              type="button"
              onClick={() => navigate('/login')}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="rounded-full border-2 border-green-500 bg-white px-4 py-2 font-bold text-green-500 transition duration-200 hover:bg-green-500 hover:bg-transparent hover:text-white"
              type="button"
              onClick={() => navigate('/signup')}
            >
              Signup
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Authenticate;
