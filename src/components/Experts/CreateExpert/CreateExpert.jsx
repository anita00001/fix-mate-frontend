import React, { useState } from 'react';
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
        throw new Error('Something went wrong');
      }
    } catch (error) {
      throw new Error('Error occurred while sending data:');
    }
  };

  return (
    <section className="create-expert-page">
      <Sidebar />
      <h1>Create an Expert</h1>
      <CreateExpertForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default CreateExpert;
