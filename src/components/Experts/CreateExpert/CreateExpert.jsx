import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { motion } from 'framer-motion';
import baseURL from '../../../redux/apiConfig';
import Sidebar from '../../Navigation/Sidebar';
import '../../../styles/Experts.css';
import CreateExpertForm from './CreateExpertForm';

const CreateExpert = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    experience: '',
    fee: '',
    status: true,
    specialization_id: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      // handle the image file
      setFormData({ ...formData, [name]: e.target.files });
    } else {
      setFormData({
        ...formData,
        [name]:
          name === 'fee' || name === 'experience'
            ? Math.max(0, parseFloat(value))
            : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'image') {
        // append the image file
        data.append(`expert[${key}]`, formData[key][0]);
      } else {
        data.append(`expert[${key}]`, formData[key]);
      }
    });

    try {
      const response = await fetch(`${baseURL}api/v1/experts`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const responseBody = await response.json();
        throw new Error(responseBody.error);
      }

      setFormData({
        first_name: '',
        last_name: '',
        address: '',
        email: '',
        experience: '',
        fee: '',
        status: true,
        specialization_id: '',
        image: null,
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Sidebar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="flex h-screen w-screen items-center flex-col justify-center bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/images/bg.jpg')",
        }}
      >
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="mb-4 text-2xl font-bold"
        >
          Create an Expert
        </motion.h1>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="mt-5 flex items-center justify-center"
        >
          <CreateExpertForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </motion.div>
      </motion.section>
    </>
  );
};

export default CreateExpert;
