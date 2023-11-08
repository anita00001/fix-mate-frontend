import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import baseURL from '../../../redux/apiConfig';
import Sidebar from '../../Navigation/Sidebar';
import '../../../styles/Experts.css';
import CreateExpertForm from './CreateExpertForm';

const CreateExpert = () => {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

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
      return true;
    } catch (error) {
      throw new Error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <motion.div
          animate={{ x: ['-100%', '100%', '-100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            backgroundColor: '#98bf11',
          }}
        />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="flex h-screen w-screen flex-col items-center justify-center bg-gray-100 lg:ml-32"
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
