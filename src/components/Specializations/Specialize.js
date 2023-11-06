import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';
import Sidebar from '../Navigation/Sidebar';
import { specialDetails } from '../../redux/Specializations/specialitiesSlice';

export default function Specialize() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const error = useSelector((state) => state.login.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(specialDetails({ name, description }));
    setName('');
    setDescription('');
  };

  return (
    <>
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex h-screen w-screen items-center justify-center text-center"
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-md p-4"
        >
          <h1 className="mb-4 text-2xl font-bold text-gray-500">
            Add New Specialization
          </h1>
          {error && (
            <p className="mb-3 bg-red-50 p-2 text-red-700">
              Failed to create specialization
            </p>
          )}
          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder="Write name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <textarea
              id="description"
              placeholder="Write description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-32 w-full rounded-md border px-3 py-2"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-md bg-lime-300 py-2 text-white hover:bg-lime-500"
          >
            Submit
          </motion.button>
        </form>
      </motion.div>
    </>
  );
}
