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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'fee' || name === 'experience' ? Math.max(0, parseFloat(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}api/v1/experts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({
          first_name: '',
          last_name: '',
          address: '',
          email: '',
          experience: '',
          fee: '',
          status: true,
          specialization_id: '',
        });
      } else {
        //     throw new Error('Something went wrong');
        //   }
        // } catch (error) {
        //   throw new Error('Error occurred while sending data:');
        // }
        // } else {
        const errorData = await response.json();
        console.error(`Server responded with an error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error occurred while sending data:', error);
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
