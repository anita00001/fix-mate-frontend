import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpecializationDropdown from '../../Specializations/SpecializationDropdown';

const CreateExpertForm = ({ formData, handleChange, handleSubmit }) => {
  const navigate = useNavigate();
  const [workingTime, setWorkingTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const success = await handleSubmit(event, formData);
    setIsLoading(false);
    if (success) {
      navigate('/');
    }
  };

  useEffect(() => {
    const checkWorkingTime = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 9 && currentHour <= 17) {
        setWorkingTime(true);
      } else {
        setWorkingTime(false);
      }
    };
    checkWorkingTime();

    const intervalId = setInterval(checkWorkingTime, 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-5 flex h-full w-[100%] flex-col items-center rounded bg-white px-4 py-7 shadow-md md:grid md:grid-cols-2 md:items-start md:gap-10"
    >
      <motion.input
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        type="text"
        name="first_name"
        required
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        className="mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 sm:w-full"
      />
      <motion.input
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        type="text"
        name="last_name"
        required
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        className="mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 sm:w-full"
      />
      <motion.input
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        type="text"
        name="address"
        required
        placeholder="Address"
        value={formData.address}
        onChange={handleChange}
        className="mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 sm:w-full"
      />
      <motion.input
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        type="email"
        name="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 sm:w-full"
      />
      <motion.input
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        type="number"
        name="experience"
        required
        placeholder="Experience (Years)"
        value={formData.experience}
        onChange={handleChange}
        className="mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 sm:w-full"
      />
      <motion.input
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        type="number"
        name="fee"
        required
        placeholder="Visit Fee ($)"
        value={formData.fee}
        onChange={handleChange}
        className="mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 sm:w-full"
      />

      <label htmlFor="status" className="flex items-center">
        Availability:
        <div className="relative ml-2">
          <input
            type="checkbox"
            id="status"
            name="status"
            checked={workingTime && formData.status}
            onChange={handleChange}
            className="hidden"
          />
          <div
            className={`toggle__line h-4 w-10 rounded-full shadow-inner ${
              formData.status ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <div
            className="toggle__dot absolute inset-y-0 left-0 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 ease-in-out"
            style={{
              transform: formData.status
                ? 'translateX(1.5rem)'
                : 'translateX(0)',
            }}
          />
        </div>
      </label>

      <SpecializationDropdown formData={formData} onChange={handleChange} />

      <motion.input
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        type="file"
        name="image"
        required
        placeholder="Image"
        onChange={handleChange}
        className="mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500 sm:w-full"
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        type="submit"
        className="mt-4 w-full rounded bg-primary px-8 py-2 font-bold text-white transition-colors hover:bg-primary"
      >
        {isLoading ? 'Creating...' : 'Create an Expert'}
      </motion.button>
    </form>
  );
};

export default CreateExpertForm;

CreateExpertForm.propTypes = {
  formData: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    fee: PropTypes.number.isRequired,
    status: PropTypes.bool.isRequired,
    specialization_id: PropTypes.string.isRequired,
    image: PropTypes.instanceOf(File),
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
