import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';

const CreateExpertForm = ({ formData, handleChange, handleSubmit }) => (
  <form
    onSubmit={handleSubmit}
    className="mx-auto mt-5 flex h-full w-[100%] flex-col items-center rounded px-4 py-3 shadow-md md:grid md:grid-cols-2 md:items-start md:gap-10"
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
      className="focus:shadow-outline mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none sm:w-full"
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
      className="focus:shadow-outline mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none sm:w-full"
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
      className="focus:shadow-outline mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none sm:w-full"
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
      className="focus:shadow-outline mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none sm:w-full"
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
      className="focus:shadow-outline mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none sm:w-full"
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
      className="focus:shadow-outline mb-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none sm:w-full"
    />
    <label htmlFor="status" className="flex items-center">
      Availability:
      <input
        type="checkbox"
        name="status"
        checked={formData.status}
        onChange={handleChange}
        className="focus:shadow-outline mr-28 mt-4 w-11/12 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none sm:w-full"
      />
    </label>
    <motion.select
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2 }}
      name="specialization_id"
      required
      value={formData.specialization_id}
      onChange={handleChange}
      className="focus:shadow-outline mb-4 w-full rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors hover:bg-green-200 focus:outline-none"
    >
      <option value="">Select Specialization</option>
      <option value="1">Electrical Engineer</option>
      <option value="2">Plumber</option>
      <option value="3">Carpenter</option>
      <option value="4">Painter</option>
      <option value="5">Mechanic</option>
      <option value="6">Architect</option>
      <option value="7">Interior Designer</option>
      <option value="8">Civil Engineer</option>
      <option value="9">Gardener</option>
    </motion.select>
    <motion.button
      whileHover={{ scale: 1.1 }}
      type="submit"
      className="mt-4 w-full rounded bg-green-500 px-8 py-2 font-bold text-white transition-colors hover:bg-green-700"
    >
      Create Expert
    </motion.button>
  </form>
);

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
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
